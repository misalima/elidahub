"use client";

import { ExamHeader } from "@/components/simulados/ExamHeader";
import { QuestionPrintCard } from "@/components/simulados/QuestionPrintCard";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";
import { use } from "react";
import { useExam } from "@/hooks/useExams";

interface PrintPageProps {
  params: Promise<{ examId: string }>;
}

export default function PrintPage({ params }: PrintPageProps) {
  const { examId } = use(params);
  
  const { data, isLoading: _isLoading, isError } = useExam(examId);

  if (isError) {
    return (
      <div className="print-page">
        <p style={{ color: "red", fontFamily: "sans-serif" }}>Erro ao carregar simulado.</p>
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
          <div className="questions-columns">
            {(() => {
              const half = Math.ceil(orderedQuestions.length / 2);
              const left = orderedQuestions.slice(0, half);
              const right = orderedQuestions.slice(half);
              return (
                <>
                  {/* Coluna esquerda: Q1 → Qn/2 */}
                  <div className="questions-col">
                    {left.map((eq, i) => (
                      <QuestionPrintCard
                        key={eq.id}
                        question={eq.question}
                        number={i + 1}
                      />
                    ))}
                  </div>
                  {/* Coluna direita: Qn/2+1 → Qn */}
                  <div className="questions-col">
                    {right.map((eq, i) => (
                      <QuestionPrintCard
                        key={eq.id}
                        question={eq.question}
                        number={half + i + 1}
                      />
                    ))}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </>
  );
}
