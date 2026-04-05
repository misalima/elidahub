import Image from "next/image";
import type { Exam } from "@/types/simulados";

interface ExamHeaderProps {
  exam: Exam;
}

export function ExamHeader({ exam }: ExamHeaderProps) {
  return (
    <div className="exam-header">
      {/* Caixa principal do cabeçalho */}
      <div className="exam-header-box">

        {/* Topo: Logo + Nome da escola */}
        <div className="exam-header-top">
          <div className="exam-logo-wrapper">
            <Image
              src="/logo_escola.png"
              alt="Logo da Escola"
              width={70}
              height={70}
              className="exam-logo"
              unoptimized
            />
          </div>
          <div className="exam-school-info">
            <p className="exam-school-name">{exam.school_name}</p>
            {exam.school_year && (
              <p className="exam-school-year">Ano Letivo: {exam.school_year}</p>
            )}
          </div>
        </div>

        {/* Divisor interno */}
        <div className="exam-header-inner-divider" />

        {/* Linha de dados do simulado */}
        <div className="exam-info-row">
          <div className="exam-info-cell exam-info-cell--grow">
            <span className="exam-info-label">Simulado</span>
            <span className="exam-info-value">{exam.title}</span>
          </div>
          {exam.date_label && (
            <div className="exam-info-cell">
              <span className="exam-info-label">Data</span>
              <span className="exam-info-value">{exam.date_label}</span>
            </div>
          )}
          {exam.duration && (
            <div className="exam-info-cell">
              <span className="exam-info-label">Duração</span>
              <span className="exam-info-value">{exam.duration}</span>
            </div>
          )}
        </div>

        {/* Linha: Turma + Aluno */}
        <div className="exam-info-row">
          {exam.grade && (
            <div className="exam-info-cell exam-info-cell--fixed">
              <span className="exam-info-label">Turma</span>
              <span className="exam-info-value">{exam.grade}</span>
            </div>
          )}
          <div className="exam-info-cell exam-info-cell--grow">
            <span className="exam-info-label">Aluno(a)</span>
            <span className="exam-info-value exam-info-underline">&nbsp;</span>
          </div>
          <div className="exam-info-cell exam-info-cell--fixed">
            <span className="exam-info-label">Nota</span>
            <span className="exam-info-value exam-info-underline">&nbsp;</span>
          </div>
        </div>

        {/* Instruções */}
        {exam.instructions && (
          <div className="exam-instructions">
            <strong>Instruções:</strong> {exam.instructions}
          </div>
        )}
      </div>
    </div>
  );
}
