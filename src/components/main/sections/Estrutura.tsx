import type React from "react";
import {
  DoorOpen,
  BookOpen,
  Accessibility,
  Users,
  Laptop,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_FACILITIES } from "@/constants/main/school";

// Map icon string names to Lucide components
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: "true" }>> = {
  DoorOpen,
  BookOpen,
  Accessibility,
  Users,
  Laptop,
};

export function Estrutura() {
  return (
    <section
      id="estrutura"
      aria-labelledby="estrutura-heading"
      className="bg-slate-50 py-20 dark:bg-slate-900 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-sm font-semibold uppercase tracking-wider px-3 py-1 mb-4">
            Infraestrutura
          </Badge>
          <h2
            id="estrutura-heading"
            className="mb-4 text-3xl font-extrabold text-secondary dark:text-slate-50 sm:text-4xl"
          >
            Nossa <span className="text-primary">estrutura</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500 dark:text-slate-300">
            Espaços pensados para o aprendizado, o convívio e o desenvolvimento
            integral dos estudantes.
          </p>
        </div>

        {/* Facility grid: 3 na primeira linha, 2 centralizados na segunda */}
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Linha 1 – 3 itens */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SCHOOL_FACILITIES.slice(0, 3).map((facility) => {
              const Icon = ICON_MAP[facility.icon];
              return (
                <div
                  key={facility.id}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-white/10 dark:bg-card dark:hover:border-primary/40"
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors flex-shrink-0"
                    aria-hidden="true"
                  >
                    {Icon && (
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    )}
                  </div>
                  <span className="text-sm font-medium leading-snug text-gray-700 dark:text-slate-200">
                    {facility.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Linha 2 – 2 itens centralizados */}
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            {SCHOOL_FACILITIES.slice(3).map((facility) => {
              const Icon = ICON_MAP[facility.icon];
              return (
                <div
                  key={facility.id}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md dark:border-white/10 dark:bg-card dark:hover:border-primary/40 sm:w-[calc(33.333%-10px)]"
                >
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors flex-shrink-0"
                    aria-hidden="true"
                  >
                    {Icon && (
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                    )}
                  </div>
                  <span className="text-sm font-medium leading-snug text-gray-700 dark:text-slate-200">
                    {facility.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
