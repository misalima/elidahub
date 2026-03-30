"use client";

import { useEffect, useState } from "react";
import { ExamBuilder } from "@/components/simulados/ExamBuilder";
import { Loader2, ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ExamWithQuestions } from "@/types/simulados";
import { use } from "react";

interface ExamEditPageProps {
  params: Promise<{ examId: string }>;
}

export default function ExamEditPage({ params }: ExamEditPageProps) {
  const { examId } = use(params);
  const [data, setData] = useState<ExamWithQuestions | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/exams/${examId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Erro ao carregar simulado."));
  }, [examId]);

  if (error) {
    return (
      <div className="p-6">
        <p className="text-destructive">{error}</p>
        <Link href="/hub/simulados" className="text-sm text-primary mt-2 inline-block">
          ← Voltar aos simulados
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/hub/simulados">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">{data.title}</h1>
            <p className="text-sm text-muted-foreground">
              Monte o simulado selecionando e ordenando as questões
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() =>
            window.open(`/hub/simulados/${examId}/imprimir`, "_blank")
          }
        >
          <Printer className="w-4 h-4" />
          Visualizar Impressão
        </Button>
      </div>

      <ExamBuilder
        exam={data}
        initialQuestions={data.exam_questions}
      />
    </div>
  );
}
