"use client";

import { useEffect, useState } from "react";
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
import { Plus, Printer, Pencil, Trash2, Loader2, FileText, BookOpen } from "lucide-react";
import type { Exam } from "@/types/simulados";

export default function SimuladosPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newExam, setNewExam] = useState({
    title: "",
    grade: "",
    date_label: "",
    duration: "",
    school_year: "",
    instructions: "Leia atentamente cada questão. Assinale apenas uma alternativa. Não é permitido o uso de corretivo.",
  });

  async function fetchExams() {
    setLoading(true);
    try {
      const res = await fetch("/api/exams");
      const data = await res.json();
      if (!res.ok) throw new Error();
      setExams(data);
    } catch {
      toast.error("Erro ao carregar simulados.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchExams();
  }, []);

  async function createExam() {
    if (!newExam.title.trim()) {
      toast.error("O título é obrigatório.");
      return;
    }
    setCreating(true);
    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExam),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setExams((prev) => [data, ...prev]);
      setDialogOpen(false);
      setNewExam({ title: "", grade: "", date_label: "", duration: "", school_year: "", instructions: "Leia atentamente cada questão. Assinale apenas uma alternativa. Não é permitido o uso de corretivo." });
      toast.success("Simulado criado!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Erro ao criar.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteExam(id: string) {
    try {
      const res = await fetch(`/api/exams/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setExams((prev) => prev.filter((e) => e.id !== id));
      toast.success("Simulado excluído.");
    } catch {
      toast.error("Erro ao excluir.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
            <Button className="gap-2">
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
                  onChange={(e) => setNewExam((m) => ({ ...m, title: e.target.value }))}
                />
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
        <div className="space-y-3">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="flex items-center gap-4 p-4 rounded-xl border bg-white dark:bg-card hover:shadow-sm transition-shadow"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground truncate">{exam.title}</h3>
                  <Badge variant={exam.status === "published" ? "default" : "secondary"} className="text-xs">
                    {exam.status === "published" ? "Publicado" : "Rascunho"}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-3 mt-1 text-xs text-muted-foreground">
                  {exam.grade && <span>Turma: {exam.grade}</span>}
                  {exam.date_label && <span>Data: {exam.date_label}</span>}
                  {exam.duration && <span>Duração: {exam.duration}</span>}
                  <span>
                    Criado em: {new Date(exam.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => window.open(`/hub/simulados/${exam.id}/imprimir`, "_blank")}
                >
                  <Printer className="w-3.5 h-3.5" />
                  Imprimir
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5" asChild>
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
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
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
                        onClick={() => deleteExam(exam.id)}
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
