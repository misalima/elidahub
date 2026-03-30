import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Question } from "@/types/simulados";

interface QuestionPrintCardProps {
  question: Question;
  number: number;
}

const OPTION_KEYS = ["option_a", "option_b", "option_c", "option_d", "option_e"] as const;
const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export function QuestionPrintCard({ question, number }: QuestionPrintCardProps) {
  return (
    <div className="question-block">
      {/* Número + área */}
      <div className="question-meta">
        <span className="question-number">{number}.</span>
        <span className="question-area">{question.subject}</span>
      </div>

      {/* Enunciado */}
      <div className="statement">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{question.statement}</ReactMarkdown>
      </div>

      {/* Imagem */}
      {question.image_url && (
        <div className="question-image-wrapper">
          <Image
            src={question.image_url}
            alt={`Imagem da questão ${number}`}
            width={400}
            height={250}
            className="question-image"
            unoptimized
          />
        </div>
      )}

      {/* Alternativas em 2 colunas */}
      <div className="options-grid">
        {OPTION_KEYS.map((key, i) => (
          <div key={key} className="option-item">
            <span className="option-label">{OPTION_LABELS[i]})</span>
            <span className="option-text">{question[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
