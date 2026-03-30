"use client";

import { useState, useEffect, useCallback } from "react";
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
import { ChevronUp, ChevronDown, X, Loader2, Plus, Search } from "lucide-react";
import type { Exam, Question, ExamWithQuestions } from "@/types/simulados";
import { KNOWLEDGE_AREAS } from "@/types/simulados";
import { Badge } from "@/components/ui/badge";

interface ExamBuilderProps {
  exam: Exam;
  initialQuestions: ExamWithQuestions["exam_questions"];
}

export function ExamBuilder({ exam, initialQuestions }: ExamBuilderProps) {
  const [examQuestions, setExamQuestions] = useState(
    [...initialQuestions].sort((a, b) => a.position - b.position)
  );
  const [bankQuestions, setBankQuestions] = useState<Question[]>([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [filterArea, setFilterArea] = useState("");
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

  const fetchBank = useCallback(async () => {
    setLoadingBank(true);
    try {
      const params = new URLSearchParams();
      if (filterArea) params.set("area", filterArea);
      if (filterSearch) params.set("search", filterSearch);
      const res = await fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setBankQuestions(data);
    } catch {
      toast.error("Erro ao carregar banco de questões.");
    } finally {
      setLoadingBank(false);
    }
  }, [filterArea, filterSearch]);

  useEffect(() => {
    fetchBank();
  }, [fetchBank]);

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

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* ── COLUNA ESQUERDA: Meta + Questões do simulado ── */}
      <div className="space-y-6">
        {/* Dados do simulado */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <h3 className="font-semibold text-foreground">Dados do Simulado</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Título</Label>
              <Input
                value={meta.title}
                onChange={(e) => setMeta((m) => ({ ...m, title: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Turma / Série</Label>
              <Input
                placeholder="Ex: 9º Ano B"
                value={meta.grade}
                onChange={(e) => setMeta((m) => ({ ...m, grade: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Data</Label>
              <Input
                placeholder="Ex: Junho/2025"
                value={meta.date_label}
                onChange={(e) => setMeta((m) => ({ ...m, date_label: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Duração</Label>
              <Input
                placeholder="Ex: 3h"
                value={meta.duration}
                onChange={(e) => setMeta((m) => ({ ...m, duration: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label>Ano Letivo</Label>
              <Input
                placeholder="Ex: 2025"
                value={meta.school_year}
                onChange={(e) => setMeta((m) => ({ ...m, school_year: e.target.value }))}
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Instruções</Label>
              <Textarea
                placeholder="Leia atentamente..."
                className="min-h-[70px] resize-none"
                value={meta.instructions}
                onChange={(e) => setMeta((m) => ({ ...m, instructions: e.target.value }))}
              />
            </div>
          </div>
          <Button onClick={saveMeta} disabled={saving} size="sm" className="w-full">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Salvar Dados
          </Button>
        </div>

        {/* Questões selecionadas */}
        <div className="rounded-xl border bg-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              Questões do Simulado
            </h3>
            <Badge variant="secondary">{examQuestions.length} questões</Badge>
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
                    <p className="text-sm font-medium truncate">{eq.question.subject}</p>
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
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => move(index, "down")}
                      disabled={index === examQuestions.length - 1}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => removeQuestion(eq.question_id)}
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
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas as áreas</SelectItem>
              {KNOWLEDGE_AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area.split(" ")[0]}…
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
                onSelect={addQuestion}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Small icon for add action
function PlusIcon() {
  return <Plus className="w-4 h-4" />;
}

void PlusIcon;
