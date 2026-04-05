"use client";

import { useState } from "react";
import { QuestionCard } from "@/components/simulados/QuestionCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Database } from "lucide-react";
import { toast } from "sonner";
import { KNOWLEDGE_AREAS, DISCIPLINES_BY_AREA, DIFFICULTIES, LEVELS, type KnowledgeArea } from "@/types/simulados";
import { useQuestions } from "@/hooks/useQuestions";
import { useDebounce } from "@/hooks/useDebounce";

export default function QuestoesPage() {
  const [filterArea, setFilterArea] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");
  const debouncedSearch = useDebounce(filterSearch, 300);

  const { data: questions = [], isLoading: loading, isError } = useQuestions({
    area: filterArea !== "all" ? filterArea : null,
    subject: filterSubject !== "all" ? filterSubject : null,
    difficulty: filterDifficulty !== "all" ? filterDifficulty : null,
    level: filterLevel !== "all" ? filterLevel : null,
    search: debouncedSearch || null,
  });

  if (isError) {
    toast.error("Erro ao carregar questões.");
  }

  // When area changes, reset discipline filter
  function handleAreaChange(value: string) {
    setFilterArea(value);
    setFilterSubject("all");
  }

  // Get available disciplines based on selected area
  const availableDisciplines =
    filterArea && filterArea !== "all"
      ? DISCIPLINES_BY_AREA[filterArea as KnowledgeArea] ?? []
      : Object.values(DISCIPLINES_BY_AREA).flat().filter((v, i, a) => a.indexOf(v) === i);

  function handleDelete(_id: string) {
    // The visual deletion is now handled by optimistic UI or React Query invalidation in QuestionCard
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-1">
          <Database className="w-6 h-6" />
          Banco de Questões
        </h1>
        <p className="text-muted-foreground text-sm">
          Visualize, filtre e exclua questões enviadas pelos professores.
        </p>
      </div>

      {/* Filtros */}
      <div className="space-y-3 mb-6">
        {/* Linha 1: Busca + Área */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Buscar no enunciado..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>
          <Select value={filterArea} onValueChange={handleAreaChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Filtrar por área" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as áreas</SelectItem>
              {KNOWLEDGE_AREAS.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Linha 2: Disciplina + Dificuldade + Nível + Counter */}
        <div className="flex flex-wrap gap-3">
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as disciplinas</SelectItem>
              {availableDisciplines.map((disc) => (
                <SelectItem key={disc} value={disc}>
                  {disc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              {DIFFICULTIES.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os níveis</SelectItem>
              {LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center">
            <Badge variant="secondary" className="text-sm px-3 py-1.5">
              {loading ? "…" : questions.length} quest{questions.length !== 1 ? "ões" : "ão"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <Database className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Nenhuma questão encontrada.</p>
          {filterSearch || filterArea !== "all" || filterSubject !== "all" || filterDifficulty !== "all" || filterLevel !== "all" ? (
            <p className="text-sm text-muted-foreground mt-1">
              Tente ajustar os filtros de busca.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1">
              As questões enviadas pelos professores aparecerão aqui.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, i) => (
            <QuestionCard
              key={q.id}
              question={q}
              questionNumber={i + 1}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
