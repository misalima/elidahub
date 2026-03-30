"use client";

import { useEffect, useState } from "react";
import { ExamHeader } from "@/components/simulados/ExamHeader";
import { QuestionPrintCard } from "@/components/simulados/QuestionPrintCard";
import type { ExamWithQuestions } from "@/types/simulados";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface PrintPageProps {
  params: Promise<{ examId: string }>;
}

export default function PrintPage({ params }: PrintPageProps) {
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
      <div className="print-page">
        <p style={{ color: "red", fontFamily: "sans-serif" }}>Erro: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <Loader2 style={{ animation: "spin 1s linear infinite", width: 32, height: 32 }} />
      </div>
    );
  }

  const orderedQuestions = [...data.exam_questions].sort(
    (a, b) => a.position - b.position
  );

  return (
    <>
      {/* Controles de tela — ocultos na impressão */}
      <div className="print-controls no-print">
        <button className="btn-print" onClick={() => window.print()}>
          <Printer size={16} />
          Imprimir / Salvar PDF
        </button>
        <a href={`/hub/simulados/${examId}`} className="btn-back">
          <ArrowLeft size={14} />
          Voltar ao Simulado
        </a>
      </div>

      <div className="print-page">
        <ExamHeader exam={data} />

        {orderedQuestions.length === 0 ? (
          <p style={{ fontFamily: "sans-serif", color: "#666", textAlign: "center", marginTop: "40pt" }}>
            Este simulado não possui questões.
          </p>
        ) : (
          orderedQuestions.map((eq, index) => (
            <QuestionPrintCard
              key={eq.id}
              question={eq.question}
              number={index + 1}
            />
          ))
        )}
      </div>
    </>
  );
}
