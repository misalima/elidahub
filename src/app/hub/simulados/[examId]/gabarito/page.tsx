"use client";

import { use } from "react";
import { useExam } from "@/hooks/useExams";
import { ExamHeader } from "@/components/simulados/ExamHeader";
import { Printer, ArrowLeft, Loader2 } from "lucide-react";
import "../imprimir/print.css";

interface GabaritoPageProps {
  params: Promise<{ examId: string }>;
}

const GABARITO_INSTRUCTIONS = "Verifique se seus dados estão corretos. Use caneta esferográfica azul ou preta. Preencha completamente o círculo da alternativa escolhida, sem ultrapassar os limites. Não rasure, não use corretivo e não dobre esta folha de respostas.";

export default function GabaritoPage({ params }: GabaritoPageProps) {
  const { examId } = use(params);
  const { data: exam, isLoading, isError } = useExam(examId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !exam) {
    return (
      <div className="p-8 text-center">
        <p className="text-destructive font-medium">Erro ao carregar o simulado.</p>
        <a href={`/hub/simulados/${examId}`} className="text-primary hover:underline mt-4 inline-block text-sm">
          Voltar ao simulado
        </a>
      </div>
    );
  }

  const orderedQuestions = [...exam.exam_questions].sort((a, b) => a.position - b.position);
  
  // Dividir questões em colunas (blocos de 15) para garantir centralização e fluxo vertical
  const ITEMS_PER_COLUMN = 15;
  const columnChunks = [];
  for (let i = 0; i < orderedQuestions.length; i += ITEMS_PER_COLUMN) {
    columnChunks.push(orderedQuestions.slice(i, i + ITEMS_PER_COLUMN));
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 print:bg-white print:py-0">
      {/* Controles de tela — ocultos na impressão */}
      <div className="print-controls no-print">
        <button className="btn-print" onClick={() => window.print()}>
          <Printer size={16} />
          Imprimir Folha de Respostas
        </button>
        <a href={`/hub/simulados/${examId}`} className="btn-back">
          <ArrowLeft size={14} />
          Voltar ao Simulado
        </a>
      </div>

      <div className="print-page bg-white mx-auto shadow-lg print:shadow-none p-[10mm] w-[210mm] min-h-[297mm]">
        <ExamHeader exam={exam} customInstructions={GABARITO_INSTRUCTIONS} />

        <div className="mt-8 w-full">
          <h2 className="text-center font-bold text-lg uppercase border-b-2 border-black pb-2 mb-8 w-full block">
            GABARITO (FOLHA DE RESPOSTAS)
          </h2>

          <div className="bubble-sheet-container">
            {columnChunks.map((chunk, colIndex) => (
              <div key={colIndex} className="bubble-column">
                {chunk.map((eq, itemIndex) => {
                  const questionNumber = colIndex * ITEMS_PER_COLUMN + itemIndex + 1;
                  return (
                    <div key={eq.id} className="bubble-row">
                      <span className="question-number-bubble">{String(questionNumber).padStart(2, '0')}</span>
                      <div className="bubbles-container">
                        {['A', 'B', 'C', 'D', 'E'].map((letter) => {
                          const isCorrect = eq.question.answer.toUpperCase() === letter;
                          return (
                            <div key={letter} className="bubble-item">
                              <span className="bubble-letter">{letter}</span>
                              <div className={`bubble-circle ${isCorrect ? 'bubble-circle--filled' : ''}`} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Sobrescreve print.css para evitar que o navegador divida a folha automaticamente */
        .print-page {
          column-count: 1 !important;
          display: block !important;
        }

        .bubble-sheet-container {
          display: flex;
          justify-content: center;
          gap: 30pt;
          padding-top: 10pt;
          width: 100%;
        }

        .bubble-column {
          display: flex;
          flex-direction: column;
        }

        .bubble-row {
          display: flex;
          align-items: center;
          gap: 8pt;
          border-bottom: 0.5pt solid #eee;
          padding-bottom: 3pt;
          margin-bottom: 5pt;
          break-inside: avoid;
        }

        .question-number-bubble {
          font-weight: bold;
          font-size: 11pt;
          min-width: 18pt;
          font-family: monospace;
        }

        .bubbles-container {
          display: flex;
          gap: 4pt;
        }

        .bubble-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1pt;
        }

        .bubble-letter {
          font-size: 8pt;
          font-weight: bold;
          color: #666;
        }

        .bubble-circle {
          width: 14pt;
          height: 14pt;
          border: 1pt solid #000;
          border-radius: 50%;
          background: #fff;
        }

        .bubble-circle--filled {
          background: #000;
        }

        @media print {
          .bubble-letter {
            color: #000;
          }
          .bubble-circle--filled {
            background-color: #000 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
