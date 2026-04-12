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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Printer, Pencil, Trash2, Loader2, FileText, BookOpen, ClipboardCheck } from "lucide-react";
import { useExams, useCreateExam, useDeleteExam } from "@/hooks/useExams";
import { EXAM_STATUS_LABELS, EXAM_STATUS_BADGE_VARIANT } from "@/types/simulados";

export default function SimuladosPage() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [newExam, setNewExam] = useState({
    title: "",
    grade: "",
    date_label: "",
    duration: "",
    school_year: "",
    instructions: "Leia atentamente cada questão. Assinale apenas uma alternativa. Não é permitido o uso de corretivo.",
  });

  const { data: exams = [], isLoading: loading } = useExams();
  const { mutateAsync: createExamMutation, isPending: creating } = useCreateExam();
  const { mutateAsync: deleteExamMutation } = useDeleteExam();

  async function createExam() {
    if (!newExam.title.trim()) {
      setTitleError(true);
      toast.error("O título é obrigatório.");
      return;
    }
    
    try {
      const data = await createExamMutation(newExam);
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

  return (
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
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Turma</Label>
                  <Input
                    placeholder="9º Ano B"
                    value={newExam.grade}
                    onChange={(e) => setNewExam((m) => ({ ...m, grade: e.target.value }))}
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
              className="flex flex-col cursor-pointer sm:flex-row sm:items-center items-start gap-4 p-4 rounded-xl border border-border/40 bg-white dark:bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
            >
              <div className="flex-1 min-w-0 w-full">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground truncate">{exam.title}</h3>
                  <Badge variant={EXAM_STATUS_BADGE_VARIANT[exam.status]} className="text-xs">
                    {EXAM_STATUS_LABELS[exam.status]}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{exam.questions_count ?? 0} questões</span>
                  {exam.questions_count && <span className="text-muted-foreground/30">•</span>}
                  {exam.grade && <span>Turma: {exam.grade}</span>}
                  {exam.date_label && <span>Data: {exam.date_label}</span>}
                  {exam.duration && <span>Duração: {exam.duration}</span>}
                  <span>
                    Criado em: {new Date(exam.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 flex-1 sm:flex-none active:scale-95 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/hub/simulados/${exam.id}/imprimir`, "_blank");
                  }}
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir
                </Button>
                {exam.status === "ready" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 flex-1 sm:flex-none border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400 active:scale-95 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`/hub/simulados/${exam.id}/gabarito`, "_blank");
                    }}
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    Gabarito
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1.5 flex-1 sm:flex-none active:scale-95 transition-transform" 
                  onClick={(e) => e.stopPropagation()} 
                  asChild
                >
                  <Link href={`/hub/simulados/${exam.id}`}>
                    <Pencil className="w-3.5 h-3.5" />
                    Editar
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 active:scale-95 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir simulado?</AlertDialogTitle>
                      <AlertDialogDescription>
                         O simulado &quot;{exam.title}&quot; será excluído permanentemente, incluindo todas as questões vinculadas.
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
          ))}
        </div>
      )}
    </div>
  );
}
