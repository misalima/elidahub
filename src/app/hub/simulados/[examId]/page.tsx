"use client";

import { ExamBuilder } from "@/components/simulados/ExamBuilder";
import { Loader2, ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { use } from "react";
import { useExam, useUpdateExamStatus } from "@/hooks/useExams";
import { EXAM_STATUS_LABELS, EXAM_STATUS_BADGE_VARIANT } from "@/types/simulados";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipboardCheck } from "lucide-react";


interface ExamEditPageProps {
  params: Promise<{ examId: string }>;
}

export default function ExamEditPage({ params }: ExamEditPageProps) {
  const { examId } = use(params);

  const { data, isLoading: _isLoading, isError } = useExam(examId);
  const { mutateAsync: updateStatus, isPending: updatingStatus } = useUpdateExamStatus();

  if (isError) {
    return (
      <div className="p-6">
        <p className="text-destructive">Erro ao carregar simulado.</p>
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
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-xl font-bold text-foreground">{data.title}</h1>
              <Badge variant={EXAM_STATUS_BADGE_VARIANT[data.status]} className="text-[10px] h-4.5 px-1.5 font-bold uppercase tracking-wider">
                {EXAM_STATUS_LABELS[data.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Monte o simulado selecionando e ordenando as questões
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="inline-block">
                  <Button
                    variant="outline"
                    className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-emerald-900/50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 disabled:opacity-50"
                    disabled={data.status !== "ready"}
                    onClick={() =>
                      window.open(`/hub/simulados/${examId}/gabarito`, "_blank")
                    }
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    Imprimir Gabarito
                  </Button>
                </div>
              </TooltipTrigger>
              {data.status !== "ready" && (
                <TooltipContent side="bottom" className="max-w-xs text-center border-emerald-100 bg-white dark:bg-emerald-950 dark:border-emerald-900">
                  <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
                    O gabarito poderá ser impresso quando a edição do simulado for concluída.
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

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
      </div>

      <ExamBuilder
        exam={data}
        initialQuestions={data.exam_questions}
        onStatusChange={(status) => updateStatus({ id: examId, status })}
        isUpdatingStatus={updatingStatus}
      />
    </div>
  );
}

