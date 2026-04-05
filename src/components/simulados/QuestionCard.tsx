"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Trash2, User, Calendar, Eye, BarChart3, GraduationCap } from "lucide-react";
import { useState } from "react";
import type { Question } from "@/types/simulados";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteQuestion } from "@/hooks/useQuestions";

interface QuestionCardProps {
  question: Question;
  onDelete?: (id: string) => void;
  selectable?: boolean;
  selected?: boolean;
  onSelect?: (q: Question) => void;
  questionNumber?: number;
}

const AREA_COLORS: Record<string, string> = {
  "Linguagens, Códigos e suas Tecnologias": "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  "Ciências Humanas e suas Tecnologias": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "Ciências da Natureza e suas Tecnologias": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Matemática e suas Tecnologias": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "Médio": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  "Difícil": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const OPTION_KEYS = ["option_a", "option_b", "option_c", "option_d", "option_e"] as const;
const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export function QuestionCard({
  question,
  onDelete,
  selectable = false,
  selected = false,
  onSelect,
  questionNumber,
}: QuestionCardProps) {
  const { mutateAsync: deleteQuestion, isPending: deleting } = useDeleteQuestion();

  async function handleDelete() {
    try {
      await deleteQuestion(question.id);
      onDelete?.(question.id);
      toast.success("Questão excluída.");
    } catch (e: any) {
      toast.error(e.message || "Erro ao excluir questão.");
    }
  }

  const areaColor = AREA_COLORS[question.knowledge_area] ?? "bg-gray-100 text-gray-700";
  const preview = question.statement.slice(0, 160) + (question.statement.length > 160 ? "…" : "");

  return (
    <Card
      className={`flex flex-col transition-all ${
        selected ? "border-primary bg-primary/5 shadow-sm" : "hover:border-primary/50 hover:shadow-sm"
      } ${selectable ? "cursor-pointer" : ""}`}
      onClick={selectable && onSelect ? () => onSelect(question) : undefined}
    >
      <CardHeader className="pb-2 space-y-2">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex flex-wrap gap-1.5">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${areaColor}`}>
              {question.knowledge_area.split(" ")[0]}
            </span>
            <Badge variant="outline" className="text-xs">
              {question.subject}
            </Badge>
            {question.difficulty && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[question.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                {question.difficulty}
              </span>
            )}
            {question.level && (
              <Badge variant="secondary" className="text-xs">
                {question.level}
              </Badge>
            )}
          </div>
          {questionNumber !== undefined && (
            <span className="text-xs font-mono text-muted-foreground">#{questionNumber}</span>
          )}
        </div>

        <p className="text-sm text-foreground line-clamp-3 leading-relaxed">{preview}</p>
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {question.teacher_name && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {question.teacher_name}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(question.created_at).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 gap-2 flex-wrap">
        {/* Visualizar completo */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={(e) => e.stopPropagation()}>
              <Eye className="w-3.5 h-3.5" /> Ver Questão
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${areaColor}`}>
                  {question.knowledge_area}
                </span>
                <Badge variant="outline">{question.subject}</Badge>
                {question.difficulty && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[question.difficulty] ?? "bg-gray-100 text-gray-700"}`}>
                    <BarChart3 className="w-3 h-3 inline mr-0.5" />
                    {question.difficulty}
                  </span>
                )}
                {question.level && (
                  <Badge variant="secondary" className="text-xs">
                    <GraduationCap className="w-3 h-3 mr-0.5" />
                    {question.level}
                  </Badge>
                )}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <div className="prose prose-sm dark:prose-invert max-w-none text-[0.82rem] leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {question.statement}
                </ReactMarkdown>
              </div>

              {question.image_url && (
                <Image
                  src={question.image_url}
                  alt="Imagem da questão"
                  width={500}
                  height={300}
                  unoptimized
                  className="max-h-56 object-contain rounded border"
                />
              )}

              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {OPTION_KEYS.map((key, i) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        question.answer === OPTION_LABELS[i]
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {OPTION_LABELS[i]}
                    </span>
                    <span className="flex-1 mt-[2px] text-sm break-words prose prose-sm dark:prose-invert">
                      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {String(question[key])}
                      </ReactMarkdown>
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-xs text-muted-foreground border-t pt-2">
                Gabarito: <strong className="text-foreground">{question.answer}</strong>
                {question.teacher_name && ` · Prof. ${question.teacher_name}`}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Selecionar para simulado */}
        {selectable && (
          <Button
            variant={selected ? "default" : "secondary"}
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(question);
            }}
          >
            {selected ? "Remover" : "Adicionar"}
          </Button>
        )}

        {/* Excluir */}
        {onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                disabled={deleting}
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir questão?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. A questão será removida permanentemente do banco.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
