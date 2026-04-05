"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import type { Question } from "@/types/simulados";

interface QuestionPrintCardProps {
  question: Question;
  number: number;
}

const OPTION_KEYS = ["option_a", "option_b", "option_c", "option_d", "option_e"] as const;
const OPTION_LABELS = ["A", "B", "C", "D", "E"];

// Alternativas ficam lado a lado apenas se todas forem curtas (≤ 40 chars)
const MAX_INLINE_LENGTH = 40;

export function QuestionPrintCard({ question, number }: QuestionPrintCardProps) {
  const maxOptionLength = Math.max(
    ...OPTION_KEYS.map((k) => String(question[k]).length)
  );
  const inlineOptions = maxOptionLength <= MAX_INLINE_LENGTH;

  return (
    <div className="question-block">
      {/* Disciplina + Tópico acima — nunca se separa do número/enunciado abaixo */}
      <p className="question-discipline">
        {question.subject}
        {question.topic && <span className="question-topic"> — {question.topic}</span>}
      </p>

      {/* Número inline com o enunciado */}
      <div className="question-statement-wrap">
        <span className="question-number">{number}.</span>
        <div className="statement">
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
            {question.statement}
          </ReactMarkdown>
        </div>
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

      {/* Alternativas */}
      <div className={inlineOptions ? "options-grid options-grid--inline" : "options-grid"}>
        {OPTION_KEYS.map((key, i) => (
          <div key={key} className="option-item">
            <span className="option-label">{OPTION_LABELS[i]})</span>
            <span className="option-text prose prose-sm dark:prose-invert break-words">
              <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                {String(question[key])}
              </ReactMarkdown>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
