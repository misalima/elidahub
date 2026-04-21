import Image from "next/image";
import type { Exam } from "@/types/simulados";

interface ExamHeaderProps {
  exam: Exam;
  customInstructions?: string;
}

export function ExamHeader({ exam, customInstructions }: ExamHeaderProps) {
  const instructions = customInstructions || exam.instructions;
  return (
    <div className="exam-header">
      {/* 1. Barra de Identidade (Escola e Logo) */}
      <div className="exam-header-identity">
        <div className="exam-identity-logo">
          <Image
            src="/logo_escola.png"
            alt="Logo da Escola"
            width={60}
            height={60}
            className="exam-logo"
            unoptimized
          />
        </div>
        <div className="exam-identity-info">
          <p className="exam-school-name">{exam.school_name}</p>
          {exam.school_year && (
            <p className="exam-school-year">Ano Letivo {exam.school_year}</p>
          )}
        </div>
      </div>

      {/* 2. Seção do Título (Protagonista e Centralizado) */}
      <div className="exam-header-main">
        <h1 className="exam-main-title">{exam.title}</h1>
        {exam.description && (
          <p className="exam-main-description">{exam.description}</p>
        )}
      </div>

      {/* 3. Metadados e Aluno (Grid Limpo) */}
      <div className="exam-header-metadata">
        <div className="metadata-row">
          <div className="metadata-item">
            <span className="metadata-label">Série:</span>
            <span className="metadata-value flex-1 px-4">
              {exam.grade || <div className="border-b border-black w-full h-[14pt]" />}
            </span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">Turma:</span>
            <span className="metadata-value flex-1 px-4">
              {exam.school_class || <div className="border-b border-black w-full h-[14pt]" />}
            </span>
          </div>
          {exam.date_label && (
            <div className="metadata-item">
              <span className="metadata-label">Data:</span>
              <span className="metadata-value">{exam.date_label}</span>
            </div>
          )}
          {exam.duration && (
            <div className="metadata-item">
              <span className="metadata-label">Duração:</span>
              <span className="metadata-value">{exam.duration}</span>
            </div>
          )}
        </div>

        <div className="metadata-row student-row">
          <div className="metadata-item metadata-item--grow">
            <span className="metadata-label">Aluno(a):</span>
            <span className="metadata-line"></span>
          </div>
          <div className="metadata-item metadata-item--nota">
            <span className="metadata-label">Nota:</span>
            <span className="metadata-line metadata-line--short"></span>
          </div>
        </div>
      </div>

      {/* 4. Instruções (Opcional, discreto) */}
      {instructions && (
        <div className="exam-header-instructions">
          <strong>Instruções:</strong> {instructions}
        </div>
      )}
    </div>
  );
}
