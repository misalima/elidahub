import type React from "react";
import { FlaskConical, Users2, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_PROJECTS } from "@/constants/main/school";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; "aria-hidden"?: "true" }>> = {
  FlaskConical,
  Users2,
  Heart,
};

export function Projetos() {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-heading"
      className="bg-white py-20 dark:bg-slate-950 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-4">
            Iniciativas
          </Badge>
          <h2
            id="projetos-heading"
            className="mb-4 text-3xl font-extrabold text-secondary dark:text-slate-50 sm:text-4xl"
          >
            Nossos <span className="text-primary">projetos</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500 dark:text-slate-300">
            Ações que promovem protagonismo, ciência, inclusão e a valorização
            da cultura local.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHOOL_PROJECTS.map((project) => {
            const Icon = ICON_MAP[project.icon];
            return (
              <Card
                key={project.id}
                className="group overflow-hidden border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:border-white/10 dark:hover:border-primary/40"
              >
                {/* Top accent bar */}
                <div
                  className="h-1.5 bg-gradient-to-r from-secondary to-primary"
                  aria-hidden="true"
                />

                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 group-hover:bg-primary/10 transition-colors"
                      aria-hidden="true"
                    >
                      {Icon && (
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-secondary/5 text-xs font-semibold text-secondary dark:bg-white/10 dark:text-slate-200"
                    >
                      {project.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-secondary dark:text-slate-50">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-primary font-medium text-sm">
                    {project.subtitle}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-slate-300">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
