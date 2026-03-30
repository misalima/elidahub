import Image from "next/image";
import type { Exam } from "@/types/simulados";

interface ExamHeaderProps {
  exam: Exam;
}

export function ExamHeader({ exam }: ExamHeaderProps) {
  return (
    <div className="exam-header">
      {/* Linha 1: Logo + Nome da escola */}
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

      {/* Linha 2: Dados do simulado */}
      <div className="exam-header-row">
        <span>
          <strong>Simulado:</strong> {exam.title}
        </span>
        {exam.date_label && (
          <span>
            <strong>Data:</strong> {exam.date_label}
          </span>
        )}
        {exam.duration && (
          <span>
            <strong>Duração:</strong> {exam.duration}
          </span>
        )}
      </div>

      {/* Linha 3: Turma + Aluno */}
      <div className="exam-header-row">
        {exam.grade && (
          <span>
            <strong>Turma:</strong> {exam.grade}
          </span>
        )}
        <span className="exam-student-field">
          <strong>Aluno(a):</strong>{" "}
          <span className="underline-field">______________________________________________</span>
        </span>
      </div>

      {/* Linha 4: Instruções */}
      {exam.instructions && (
        <div className="exam-instructions">
          <strong>Instruções:</strong> {exam.instructions}
        </div>
      )}

      <div className="exam-header-divider" />
    </div>
  );
}
