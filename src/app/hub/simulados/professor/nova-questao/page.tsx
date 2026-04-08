"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { QuestionForm } from "@/components/simulados/QuestionForm";
import { TeacherBankModal } from "@/components/simulados/TeacherBankModal";
import { Plus, Database } from "lucide-react";

export default function NovaQuestaoPage() {
  const [bankOpen, setBankOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-card/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <Image
            src="/logo_escola.png"
            alt="Logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground leading-none truncate">
              Escola Estadual Prof. José Félix de Carvalho Alves
            </p>
            <h1 className="text-sm font-semibold text-foreground flex items-center gap-1.5 mt-0.5">
              <Plus className="w-3.5 h-3.5" />
              Nova Questão
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 shrink-0"
            onClick={() => setBankOpen(true)}
          >
            <Database className="w-3.5 h-3.5" />
            Ver Banco de Questões
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Instruções */}
        <div className="mb-8 p-5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
          <h2 className="font-semibold text-blue-900 dark:text-blue-200 mb-1.5">
            Como preencher
          </h2>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-disc list-inside">
            <li>Selecione a <strong>Área de Conhecimento</strong> e preencha a <strong>Disciplina</strong>.</li>
            <li>Escreva o <strong>enunciado</strong> completo no campo de texto. O preview ao lado mostrará como ficará.</li>
            <li>Anexe uma <strong>imagem</strong> se necessário (opcional, máx. 5 MB).</li>
            <li>Preencha as <strong>5 alternativas</strong> (A a E) e indique o <strong>gabarito</strong>.</li>
            <li>Clique em <strong>Enviar Questão</strong>. Você pode enviar quantas questões quiser.</li>
          </ul>
        </div>

        <QuestionForm />
      </main>

      <TeacherBankModal open={bankOpen} onOpenChange={setBankOpen} />
    </div>
  );
}
