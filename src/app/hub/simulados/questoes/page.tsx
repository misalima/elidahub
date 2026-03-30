"use client";

import { useEffect, useState, useCallback } from "react";
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
import type { Question } from "@/types/simulados";
import { KNOWLEDGE_AREAS } from "@/types/simulados";

export default function QuestoesPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterArea, setFilterArea] = useState("all");
  const [filterSearch, setFilterSearch] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterArea && filterArea !== "all") params.set("area", filterArea);
      if (filterSearch) params.set("search", filterSearch);
      const res = await window.fetch(`/api/questions?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setQuestions(data);
    } catch {
      toast.error("Erro ao carregar questões.");
    } finally {
      setLoading(false);
    }
  }, [filterArea, filterSearch]);

  useEffect(() => {
    const timer = setTimeout(fetch, 300);
    return () => clearTimeout(timer);
  }, [fetch]);

  function handleDelete(id: string) {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
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
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar no enunciado..."
            value={filterSearch}
            onChange={(e) => setFilterSearch(e.target.value)}
          />
        </div>
        <Select value={filterArea} onValueChange={setFilterArea}>
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

        <div className="flex items-center">
          <Badge variant="secondary" className="text-sm px-3 py-1.5">
            {loading ? "…" : questions.length} quest{questions.length !== 1 ? "ões" : "ão"}
          </Badge>
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
          {filterSearch || filterArea ? (
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
