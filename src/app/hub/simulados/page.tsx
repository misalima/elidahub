"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Plus, Printer, Pencil, Trash2, Loader2, BookOpen, FileCheck2, Copy, Filter, FileText, Users } from "lucide-react";
import { 
  useExams, 
  useCreateExam, 
  useDeleteExam, 
  useDuplicateExam,
  useExamFilters 
} from "@/hooks/useExams";
import { EXAM_STATUS_LABELS, EXAM_STATUS_BADGE_VARIANT, KNOWLEDGE_AREAS, formatAreaSelect, LEVELS } from "@/types/simulados";
import { useDebounce } from "@/hooks/useDebounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SimuladosPage() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleError, setTitleError] = useState(false);
  
  // Filter state
  const [filterSearch, setFilterSearch] = useState("");
  const [filterArea, setFilterArea] = useState("all");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const debouncedSearch = useDebounce(filterSearch, 300);

  const [newExam, setNewExam] = useState({
    title: "",
    description: "",
    grade: "",
    school_class: "",
    date_label: "",
    duration: "",
    school_year: "",
    instructions: "Leia atentamente cada questão. Assinale apenas uma alternativa. Não é permitido o uso de corretivo.",
  });

  const { data: exams = [], isLoading: loading } = useExams({
    search: debouncedSearch || null,
    area: filterArea !== "all" ? filterArea : null,
    grade: filterGrade !== "all" ? filterGrade : null,
    school_class: filterClass !== "all" ? filterClass : null,
  });
  
  const { data: filterOptions } = useExamFilters();
  const { mutateAsync: createExamMutation, isPending: creating } = useCreateExam();
  const { mutateAsync: deleteExamMutation } = useDeleteExam();
  const { mutateAsync: duplicateExamMutation } = useDuplicateExam();
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);

  async function createExam() {
    if (!newExam.title.trim()) {
      setTitleError(true);
      toast.error("O título é obrigatório.");
      return;
    }
    
    try {
      const payload: any = {
        ...newExam,
        grade: newExam.grade || null,
      };
      const data = await createExamMutation(payload);
      setDialogOpen(false);
      toast.success("Simulado criado!");
      router.push(`/hub/simulados/${data.id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao criar.";
      toast.error(message);
    }
  }

  async function deleteExam(id: string) {
    try {
      await deleteExamMutation(id);
      toast.success("Simulado excluído.");
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  async function duplicateExam(id: string) {
    try {
      setDuplicatingId(id);
      await duplicateExamMutation(id);
      toast.success("Simulado duplicado com sucesso.");
    } catch {
      toast.error("Erro ao duplicar o simulado.");
    } finally {
      setDuplicatingId(null);
    }
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="p-6 max-w-6xl mx-auto min-h-[100dvh]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Simulados
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Crie e gerencie simulados para impressão.
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 active:scale-95 transition-transform">
              <Plus className="w-4 h-4" />
              Novo Simulado
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar Novo Simulado</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Título *</Label>
                <Input
                  placeholder="Ex: Simulado ENEM — Ciências da Natureza"
                  value={newExam.title}
                  onChange={(e) => {
                    setNewExam((m) => ({ ...m, title: e.target.value }));
                    if (e.target.value.trim()) setTitleError(false);
                  }}
                  className={titleError ? "border-destructive focus-visible:ring-destructive" : ""}
                />
                {titleError && (
                  <p className="text-xs text-destructive">O título é obrigatório.</p>
                )}
              </div>
              <div className="space-y-1">
                <Label>Descrição <span className="text-muted-foreground font-normal">(opcional)</span></Label>
                <Input
                  placeholder="Ex: Prova bimestral de Ciências da Natureza"
                  value={newExam.description}
                  onChange={(e) => setNewExam((m) => ({ ...m, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Série</Label>
                  <Select value={newExam.grade} onValueChange={(val) => setNewExam((m) => ({ ...m, grade: val }))}>
                    <SelectTrigger className="h-10 bg-white dark:bg-card">
                      <SelectValue placeholder="Selecione a série" />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label>Turma</Label>
                  <Input
                    placeholder="9º Ano B"
                    value={newExam.school_class}
                    onChange={(e) => setNewExam((m) => ({ ...m, school_class: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Data</Label>
                  <Input
                    placeholder="Junho/2025"
                    value={newExam.date_label}
                    onChange={(e) => setNewExam((m) => ({ ...m, date_label: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Duração</Label>
                  <Input
                    placeholder="3h"
                    value={newExam.duration}
                    onChange={(e) => setNewExam((m) => ({ ...m, duration: e.target.value }))}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Ano Letivo</Label>
                  <Input
                    placeholder="2025"
                    value={newExam.school_year}
                    onChange={(e) => setNewExam((m) => ({ ...m, school_year: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>Instruções</Label>
                <Textarea
                  className="min-h-[70px] resize-none text-sm"
                  value={newExam.instructions}
                  onChange={(e) => setNewExam((m) => ({ ...m, instructions: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={createExam} disabled={creating}>
                {creating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Criar Simulado
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          <div className="relative w-full md:w-auto md:flex-1 md:max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9 h-10 rounded-xl bg-white dark:bg-card border-border/40 focus-visible:ring-primary/20"
              placeholder="Buscar por título ou descrição..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto md:min-w-[180px]">
            <Select value={filterArea} onValueChange={setFilterArea}>
              <SelectTrigger className="h-10 rounded-xl bg-white dark:bg-card border-border/40 w-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por Área" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Áreas</SelectItem>
                {KNOWLEDGE_AREAS.map((area) => (
                  <SelectItem key={area} value={area}>
                    {formatAreaSelect(area)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto md:min-w-[150px]">
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="h-10 rounded-xl bg-white dark:bg-card border-border/40 w-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por Série" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Séries</SelectItem>
                {LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full md:w-auto md:min-w-[150px]">
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="h-10 rounded-xl bg-white dark:bg-card border-border/40 w-full">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Filtrar por Turma" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Turmas</SelectItem>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(filterOptions as any)?.school_classes?.map((c: string) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-end md:ml-auto">
          <Badge variant="secondary" className="px-3 py-1.5 h-10 min-w-[40px] justify-center rounded-xl bg-muted/50 text-muted-foreground font-medium border-none shrink-0">
            {loading ? "…" : exams.length}
          </Badge>
        </div>
      </div>

      {/* Lista de simulados */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-7 h-7 animate-spin text-muted-foreground" />
        </div>
      ) : exams.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-2xl">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">Nenhum simulado criado ainda.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Clique em &quot;Novo Simulado&quot; para começar.
          </p>
        </div>
      ) : (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {exams.map((exam) => (
            <div
              key={exam.id}
              onClick={() => router.push(`/hub/simulados/${exam.id}`)}
              className="group flex flex-col cursor-pointer rounded-2xl border border-border/40 bg-white dark:bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/20 overflow-hidden"
            >
              <div className="p-5 flex-1 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-col gap-2">
                      {exam.grade && (
                        <span className="text-[11px] font-black uppercase tracking-[0.15em] text-primary/80 bg-primary/5 w-fit px-2 py-0.5 rounded">
                          {exam.grade}
                        </span>
                      )}
                      <h3 className="text-xl font-extrabold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {exam.title}
                      </h3>
                    </div>
                    {exam.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {exam.description}
                      </p>
                    )}
                  </div>
                  <Badge variant={EXAM_STATUS_BADGE_VARIANT[exam.status]} className="shrink-0 shadow-sm px-2.5 py-0.5 border-none">
                    {EXAM_STATUS_LABELS[exam.status]}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-4 pt-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="w-3.5 h-3.5 text-primary/60" />
                    <span className="font-medium text-foreground/80">{exam.questions_count ?? 0}</span> questões
                  </div>
                  {exam.school_class && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3.5 h-3.5 text-primary/60" />
                      <span className="truncate">
                        Turma: <span className="font-semibold text-foreground/80">{exam.school_class}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FileCheck2 className="w-3.5 h-3.5 text-primary/60" />
                    <span>Criado em {new Date(exam.created_at).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 bg-muted/20 border-t border-border/40 flex flex-wrap items-center gap-2 justify-end">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2 px-4 rounded-lg bg-white dark:bg-background hover:bg-primary/5 active:scale-95 transition-all text-xs font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/hub/simulados/${exam.id}/imprimir`, "_blank");
                      }}
                    >
                      <Printer className="w-4 h-4" />
                      <span>Imprimir Caderno</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Visualizar para impressão</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 gap-2 px-4 rounded-lg border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-950/20 dark:border-violet-900/50 dark:text-violet-400 active:scale-95 transition-all text-xs font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/hub/simulados/${exam.id}/folha-resposta`, "_blank");
                      }}
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Gabarito/Respostas</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Gerar folha de respostas</TooltipContent>
                </Tooltip>

                <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 gap-2 px-3 hover:bg-primary/5 active:scale-95 transition-all" 
                        onClick={(e) => e.stopPropagation()} 
                        asChild
                      >
                        <Link href={`/hub/simulados/${exam.id}`}>
                          <Pencil className="w-4 h-4" />
                          <span className="hidden sm:inline text-xs font-medium">Editar</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Editar configurações</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateExam(exam.id);
                        }}
                        disabled={duplicatingId === exam.id}
                      >
                        {duplicatingId === exam.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Duplicar</TooltipContent>
                  </Tooltip>

                  <AlertDialog>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10 active:scale-95 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Excluir permanentemente</TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir simulado?</AlertDialogTitle>
                        <AlertDialogDescription>
                           O simulado &quot;{exam.title}&quot; será removido. Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={(e) => { e.stopPropagation(); deleteExam(exam.id); }}
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </TooltipProvider>
  );
}
