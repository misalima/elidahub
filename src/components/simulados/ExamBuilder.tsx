"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { QuestionCard } from "@/components/simulados/QuestionCard";
import { toast } from "sonner";
import { ChevronUp, ChevronDown, X, Loader2, Search, ClipboardCheck, Pencil } from "lucide-react";
import type { Exam, Question, ExamWithQuestions } from "@/types/simulados";
import { KNOWLEDGE_AREAS, LEVELS, formatAreaSelect } from "@/types/simulados";
import { Badge } from "@/components/ui/badge";
import { useQuestions } from "@/hooks/useQuestions";
import { useDebounce } from "@/hooks/useDebounce";

interface ExamBuilderProps {
  exam: Exam;
  initialQuestions: ExamWithQuestions["exam_questions"];
  onStatusChange?: (status: "draft" | "ready" | "editing") => void;
  isUpdatingStatus?: boolean;
}

export function ExamBuilder({ 
  exam, 
  initialQuestions, 
  onStatusChange, 
  isUpdatingStatus 
}: ExamBuilderProps) {
  const [examQuestions, setExamQuestions] = useState(
    [...initialQuestions].sort((a, b) => a.position - b.position)
  );
  const [filterArea, setFilterArea] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  const [saving, setSaving] = useState(false);

  // Exam meta editing
  const [meta, setMeta] = useState({
    title: exam.title,
    grade: exam.grade ?? "",
    date_label: exam.date_label ?? "",
    duration: exam.duration ?? "",
    school_year: exam.school_year ?? "",
    instructions: exam.instructions ?? "",
  });
  
  const debouncedSearch = useDebounce(filterSearch, 300);

  const { data: bankQuestions = [], isLoading: loadingBank, isError, refetch } = useQuestions({
    area: filterArea !== "all" ? filterArea : null,
    level: filterLevel !== "all" ? filterLevel : null,
    search: debouncedSearch || null,
  });

  const selectedIds = new Set(examQuestions.map((eq) => eq.question_id));

  async function addQuestion(question: Question) {
    if (selectedIds.has(question.id)) {
      await removeQuestion(question.id);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/exams/${exam.id}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: question.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setExamQuestions((prev) => [
        ...prev,
        { ...data, question },
      ]);
      toast.success(`Questão adicionada.`);
    } catch {
      toast.error("Erro ao adicionar questão.");
    } finally {
      setSaving(false);
    }
  }

  async function removeQuestion(questionId: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/exams/${exam.id}/questions`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: questionId }),
      });
      if (!res.ok) throw new Error();
      setExamQuestions((prev) => prev.filter((eq) => eq.question_id !== questionId));
      toast.success("Questão removida.");
    } catch {
      toast.error("Erro ao remover questão.");
    } finally {
      setSaving(false);
    }
  }

  async function move(index: number, direction: "up" | "down") {
    const newList = [...examQuestions];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= newList.length) return;
    [newList[index], newList[target]] = [newList[target], newList[index]];
    const reordered = newList.map((item, i) => ({ ...item, position: i }));
    setExamQuestions(reordered);
    // Persist positions
    try {
      await fetch(`/api/exams/${exam.id}/questions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          positions: reordered.map(({ id, position }) => ({ id, position })),
        }),
      });
    } catch {
      toast.error("Erro ao salvar ordem.");
    }
  }

  async function saveMeta() {
    setSaving(true);
    try {
      const res = await fetch(`/api/exams/${exam.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      });
      if (!res.ok) throw new Error();
      toast.success("Simulado atualizado.");
    } catch {
      toast.error("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  }

  const isReady = exam.status === "ready";

  async function handleStatusChange(newStatus: "draft" | "ready" | "editing") {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  }

  return (
    <div className={cn("grid grid-cols-1 gap-8", isReady ? "max-w-4xl mx-auto" : "xl:grid-cols-2")}>
      {/* ── COLUNA ESQUERDA: Meta + Questões do simulado ── */}
      <div className="space-y-6">
        {/* Dados do simulado */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Dados do Simulado</h3>
            {isReady && (
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 gap-1.5"
                onClick={() => handleStatusChange("editing")}
                disabled={isUpdatingStatus}
              >
                <Pencil className="w-3.5 h-3.5" />
                Editar Dados
              </Button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Título</Label>
              <Input
                value={meta.title}
                onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
                disabled={isReady}
              />
            </div>
            <div className="space-y-1">
              <Label>Turma / Série</Label>
              <Input
                placeholder="Ex: 9º Ano B"
                value={meta.grade}
                onChange={(e) => setMeta((m) => ({ ...m, grade: e.target.value }))}
                disabled={isReady}
              />
            </div>
            <div className="space-y-1">
              <Label>Data</Label>
              <Input
                placeholder="Ex: Junho/2025"
                value={meta.date_label}
                onChange={(e) => setMeta((m) => ({ ...m, date_label: e.target.value }))}
                disabled={isReady}
              />
            </div>
            <div className="space-y-1">
              <Label>Duração</Label>
              <Input
                placeholder="Ex: 3h"
                value={meta.duration}
                onChange={(e) => setMeta((m) => ({ ...m, duration: e.target.value }))}
                disabled={isReady}
              />
            </div>
            <div className="space-y-1">
              <Label>Ano Letivo</Label>
              <Input
                placeholder="Ex: 2025"
                value={meta.school_year}
                onChange={(e) => setMeta((m) => ({ ...m, school_year: e.target.value }))}
                disabled={isReady}
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Instruções</Label>
              <Textarea
                placeholder="Leia atentamente..."
                className="min-h-[70px] resize-none"
                value={meta.instructions}
                onChange={(e) => setMeta((m) => ({ ...m, instructions: e.target.value }))}
                disabled={isReady}
              />
            </div>
          </div>
          {!isReady && (
            <Button onClick={saveMeta} disabled={saving} size="sm" className="w-full">
              {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Salvar Dados
            </Button>
          )}
        </div>

        {/* Questões selecionadas */}
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Questões do Simulado
            </h3>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{examQuestions.length} questões</Badge>
              {isReady ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-1.5 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-400"
                  onClick={() => handleStatusChange("editing")}
                  disabled={isUpdatingStatus}
                >
                  {isUpdatingStatus ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Pencil className="w-3.5 h-3.5" />}
                  Editar Questões
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleStatusChange("ready")}
                  disabled={isUpdatingStatus || examQuestions.length === 0}
                >
                  {isUpdatingStatus ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
                  Concluir Simulado
                </Button>
              )}
            </div>
          </div>

          {examQuestions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhuma questão adicionada. Selecione do banco ao lado.
            </p>
          ) : (
            <div className="space-y-2">
              {examQuestions.map((eq, index) => (
                <div
                  key={eq.id}
                  className="flex items-center gap-2 p-3 rounded-lg border bg-muted/30 group"
                >
                  <span className="text-sm font-mono text-muted-foreground w-6 shrink-0">
                    {index + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{eq.question.subject}</p>
                      {eq.question.deleted_at && (
                        <Badge 
                          variant="outline" 
                          className="h-4 text-[9px] px-1.5 uppercase font-bold tracking-tighter border-red-200 bg-red-50 text-red-600 dark:bg-red-950/20 dark:border-red-900/50 dark:text-red-400"
                        >
                          Excluída do Banco
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {eq.question.statement.slice(0, 70)}…
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => move(index, "up")}
                      disabled={isReady || index === 0}
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => move(index, "down")}
                      disabled={isReady || index === examQuestions.length - 1}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeQuestion(eq.question_id)}
                      disabled={isReady}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {examQuestions.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => window.open(`/hub/simulados/${exam.id}/imprimir`, "_blank")}
            >
              Visualizar Impressão →
            </Button>
          )}
        </div>
      </div>

      {/* ── COLUNA DIREITA: Banco de questões ── */}
      {!isReady && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar no enunciado..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>
            <Select value={filterArea} onValueChange={setFilterArea}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Filtrar por área" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as áreas</SelectItem>
                {KNOWLEDGE_AREAS.map((area) => (
                  <SelectItem key={area} value={area}>
                    {formatAreaSelect(area)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterLevel} onValueChange={setFilterLevel}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                {LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {loadingBank ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <p className="text-sm text-destructive font-medium mb-3">Erro ao carregar o banco de questões.</p>
              <Button variant="outline" size="sm" onClick={() => refetch?.()}>
                Tentar novamente
              </Button>
            </div>
          ) : bankQuestions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Nenhuma questão encontrada.
            </p>
          ) : (
            <div className="grid gap-3 max-h-[700px] overflow-y-auto pr-1">
              {bankQuestions.map((q, i) => (
                <QuestionCard
                  key={q.id}
                  question={q}
                  questionNumber={i + 1}
                  selectable
                  selected={selectedIds.has(q.id)}
                  onSelect={isReady ? undefined : addQuestion}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Small icon for add action
function ClipboardCheckIcon() {
  return <ClipboardCheck className="w-4 h-4" />;
}
void ClipboardCheckIcon;
