import { CalendarDays, ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

// Exemplo de dados estáticos
const agendamentos = [
  {
    tipo: "curso",
    nome: "João Silva",
    data: "2025-08-28",
    horario: "09:00",
    status: "confirmado",
  },
  {
    tipo: "prova",
    nome: "Maria Souza",
    data: "2025-08-29",
    horario: "14:00",
    status: "não confirmado",
  },
  {
    tipo: "curso",
    nome: "Carlos Lima",
    data: "2025-08-30",
    horario: "10:30",
    status: "cancelado",
  },
  {
    tipo: "prova",
    nome: "Ana Paula",
    data: "2025-09-01",
    horario: "16:00",
    status: "confirmado",
  },
  {
    tipo: "curso",
    nome: "Fernanda Dias",
    data: "2025-09-02",
    horario: "08:00",
    status: "não confirmado",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  // Exemplo: quinta-feira, 28/08
  const weekday = date.toLocaleDateString("pt-BR", { weekday: "long" });
  const dayMonth = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  return { weekday, dayMonth };
}

export default function UpcomingSchedules() {
  // Prepara os dados para exibição
  const cursos = agendamentos
    .filter((a) => a.tipo === "curso")
    .map((ag) => {
      const { weekday, dayMonth } = formatDate(ag.data);
      let statusColor = "#b45309", statusBg = "#fef9c3", statusIcon = <XCircle className="inline-block" size={14} />;
      if (ag.status === "confirmado") {
        statusColor = "#059669";
        statusBg = "#d1fae5";
        statusIcon = <CheckCircle2 className="inline-block" size={14} />;
      } else if (ag.status === "cancelado") {
        statusColor = "#dc2626";
        statusBg = "#fee2e2";
        statusIcon = <XCircle className="inline-block" size={14} />;
      }
      return { ...ag, weekday, dayMonth, statusColor, statusBg, statusIcon };
    });

  const provas = agendamentos
    .filter((a) => a.tipo === "prova")
    .map((ag) => {
      const { weekday, dayMonth } = formatDate(ag.data);
      let statusColor = "#b45309", statusBg = "#fef9c3", statusIcon = <XCircle className="inline-block" size={14} />;
      if (ag.status === "confirmado") {
        statusColor = "#059669";
        statusBg = "#d1fae5";
        statusIcon = <CheckCircle2 className="inline-block" size={14} />;
      } else if (ag.status === "cancelado") {
        statusColor = "#dc2626";
        statusBg = "#fee2e2";
        statusIcon = <XCircle className="inline-block" size={14} />;
      }
      return { ...ag, weekday, dayMonth, statusColor, statusBg, statusIcon };
    });

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Agendamentos para os próximos 7 dias</h2>
        <Link
          href="/vqdt/schedules"
          className="text-sm font-medium text-primary hover:underline px-3 py-1.5 rounded transition-colors hover:bg-accent"
        >
          Ver todos
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna Cursos */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <CalendarDays className="text-blue-600 dark:text-blue-300" size={18} /> Curso
          </h3>
          <div className="bg-card rounded-lg shadow divide-y divide-border">
            {cursos.length > 0 ? cursos.map((ag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/60 cursor-pointer group"
              >
                <span className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                  <CalendarDays className="text-blue-600 dark:text-blue-300" size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate flex items-center gap-2">
                    {ag.nome}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-200 group-hover:underline">
                      {ag.weekday.charAt(0).toUpperCase() + ag.weekday.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">{ag.dayMonth} &bull; {ag.horario}</span>
                  </div>
                </div>
                <span
                  className="text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full ml-2"
                  style={{ backgroundColor: ag.statusBg, color: ag.statusColor }}
                >
                  {ag.statusIcon}
                  {ag.status.charAt(0).toUpperCase() + ag.status.slice(1)}
                </span>
              </div>
            )) : (
              <div className="px-4 py-6 text-center text-muted-foreground text-sm">Nenhum curso agendado.</div>
            )}
          </div>
        </div>
        {/* Coluna Provas */}
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <ClipboardList className="text-green-600 dark:text-green-300" size={18} /> Prova
          </h3>
          <div className="bg-card rounded-lg shadow divide-y divide-border">
            {provas.length > 0 ? provas.map((ag, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/60 cursor-pointer group"
              >
                <span className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                  <ClipboardList className="text-green-600 dark:text-green-300" size={20} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate flex items-center gap-2">
                    {ag.nome}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-sm font-semibold text-green-700 dark:text-green-200 group-hover:underline">
                      {ag.weekday.charAt(0).toUpperCase() + ag.weekday.slice(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">{ag.dayMonth} &bull; {ag.horario}</span>
                  </div>
                </div>
                <span
                  className="text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full ml-2"
                  style={{ backgroundColor: ag.statusBg, color: ag.statusColor }}
                >
                  {ag.statusIcon}
                  {ag.status.charAt(0).toUpperCase() + ag.status.slice(1)}
                </span>
              </div>
            )) : (
              <div className="px-4 py-6 text-center text-muted-foreground text-sm">Nenhuma prova agendada.</div>
            )}
          </div>
        </div>
      </div>
    </section>
                          );
                        }
