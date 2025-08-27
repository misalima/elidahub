import { CalendarDays, ClipboardList } from "lucide-react";
import Link from "next/link";

// Exemplo de dados estáticos
const agendamentos = [
  {
    tipo: "curso",
    nome: "João Silva",
    data: "2025-08-28",
    horario: "09:00",
  },
  {
    tipo: "prova",
    nome: "Maria Souza",
    data: "2025-08-29",
    horario: "14:00",
  },
  {
    tipo: "curso",
    nome: "Carlos Lima",
    data: "2025-08-30",
    horario: "10:30",
  },
  {
    tipo: "prova",
    nome: "Ana Paula",
    data: "2025-09-01",
    horario: "16:00",
  },
  {
    tipo: "curso",
    nome: "Fernanda Dias",
    data: "2025-09-02",
    horario: "08:00",
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
  const cursos = agendamentos.filter((a) => a.tipo === "curso");
  const provas = agendamentos.filter((a) => a.tipo === "prova");

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
            {cursos.length > 0 ? cursos.map((ag, idx) => {
              const { weekday, dayMonth } = formatDate(ag.data);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/60 cursor-pointer group"
                >
                  <span className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                    <CalendarDays className="text-blue-600 dark:text-blue-300" size={20} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{ag.nome}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-semibold text-blue-700 dark:text-blue-200 group-hover:underline">
                        {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{dayMonth} &bull; {ag.horario}</span>
                    </div>
                  </div>
                </div>
              );
            }) : (
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
            {provas.length > 0 ? provas.map((ag, idx) => {
              const { weekday, dayMonth } = formatDate(ag.data);
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-accent/60 cursor-pointer group"
                >
                  <span className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                    <ClipboardList className="text-green-600 dark:text-green-300" size={20} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{ag.nome}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm font-semibold text-green-700 dark:text-green-200 group-hover:underline">
                        {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">{dayMonth} &bull; {ag.horario}</span>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className="px-4 py-6 text-center text-muted-foreground text-sm">Nenhuma prova agendada.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
