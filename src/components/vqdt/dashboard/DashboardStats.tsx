import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CalendarDays, ClipboardList, CheckCircle2, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DashboardStats() {
  // Exemplo de dados estáticos
  const agendamentosCursoHoje = 12;
  const agendamentosProvaHoje = 8;
  const confirmados = 15;
  const metaAtual = 24;
  const metaTotal = 33;
  const progresso = (metaAtual / metaTotal) * 100;

  return (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-2">
      {/* Cursos hoje */}
      <Card className="flex flex-col h-full shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-5">
          <span className="rounded-full bg-blue-100 dark:bg-blue-900 p-2 mb-2">
            <CalendarDays className="text-blue-600 dark:text-blue-300" size={26} />
          </span>
          <span className="text-3xl font-extrabold text-primary dark:text-blue-200 mb-1">{agendamentosCursoHoje}</span>
          <CardTitle className="text-base font-semibold text-center mb-0.5">Cursos agendados hoje</CardTitle>
          <span className="text-sm text-muted-foreground text-center">Total de agendamentos de curso para hoje</span>
        </CardContent>
      </Card>
      {/* Provas hoje */}
      <Card className="flex flex-col h-full shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-5">
          <span className="rounded-full bg-green-100 dark:bg-green-900 p-2 mb-2">
            <ClipboardList className="text-green-600 dark:text-green-300" size={26} />
          </span>
          <span className="text-3xl font-extrabold text-primary dark:text-green-200 mb-1">{agendamentosProvaHoje}</span>
          <CardTitle className="text-base font-semibold text-center mb-0.5">Provas agendadas hoje</CardTitle>
          <span className="text-sm text-muted-foreground text-center">Total de agendamentos de prova para hoje</span>
        </CardContent>
      </Card>
      {/* Confirmados */}
      <Card className="flex flex-col h-full shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-5">
          <span className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-2 mb-2">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-300" size={26} />
          </span>
          <span className="text-3xl font-extrabold text-primary dark:text-emerald-200 mb-1">{confirmados}</span>
          <CardTitle className="text-base font-semibold text-center mb-0.5">Confirmados</CardTitle>
          <span className="text-sm text-muted-foreground text-center">Cursos e provas confirmados</span>
        </CardContent>
      </Card>
      {/* Meta mensal */}
      <Card className="flex flex-col h-full shadow-md">
        <CardContent className="flex flex-col items-center justify-center py-5 w-full">
          <span className="rounded-full bg-purple-100 dark:bg-purple-900 p-2 mb-2">
            <Target className="text-purple-600 dark:text-purple-300" size={26} />
          </span>
          <span className="text-xl font-bold text-primary dark:text-purple-200 mb-0.5">Meta mensal</span>
          <div className="flex items-center gap-1 mb-1">
            <span className="text-lg font-semibold">{metaAtual}</span>
            <span className="text-sm text-muted-foreground">/ {metaTotal}</span>
          </div>
          <Progress value={progresso} className="h-2 w-full mb-1" />
          <span className="text-xs text-muted-foreground">{Math.round(progresso)}% da meta atingida</span>
        </CardContent>
      </Card>
    </section>
  );
}
