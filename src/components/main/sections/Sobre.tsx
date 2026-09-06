import { BookOpen, Award, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="bg-white py-20 dark:bg-slate-950 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-sm font-semibold uppercase tracking-wider px-3 py-1">
                Sobre nós
              </Badge>
            </div>
            <h2
              id="sobre-heading"
              className="mb-6 text-3xl font-extrabold leading-tight text-secondary dark:text-slate-50 sm:text-4xl"
            >
              Uma história de{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent dark:from-gold dark:to-primary">
                mais de 75 anos
              </span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600 dark:text-slate-300">
              Fundada entre 1948 e 1950 e oficializada em 1989, somos referência
              no município de São Sebastião – AL. Vinculada à SEDUC/AL e à 5ª
              GEE (Arapiraca), somos a principal oferta de Ensino Médio da
              cidade, atendendo estudantes do Ensino Médio Regular e da EJA nos
              turnos matutino, vespertino e noturno. Nossa missão é promover a
              formação integral dos estudantes, articulando aprendizagem
              acadêmica, desenvolvimento socioemocional e preparo para o mundo do
              trabalho.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border border-secondary/10 bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                Ensino Médio Regular
              </div>
              <div className="flex items-center gap-2 rounded-full border border-secondary/10 bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <Award className="w-4 h-4 text-primary" aria-hidden="true" />
                EJA – Educação de Jovens e Adultos
              </div>
              <div className="flex items-center gap-2 rounded-full border border-secondary/10 bg-secondary/5 px-4 py-2 text-sm font-medium text-secondary dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                <Building2 className="w-4 h-4 text-primary" aria-hidden="true" />
                3 Turnos de atendimento
              </div>
            </div>
          </div>

          {/* Image column */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gradient-to-br from-secondary to-secondary/80">
              {/* TODO: Substituir pelo src de uma imagem real da escola */}
              {/* <Image src="/images/escola.jpg" alt="Fachada da Escola Estadual Profª. Maria Élida Dias Carvalho Pereira" fill className="object-cover" /> */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <Building2
                  className="w-24 h-24 text-white/30 mb-4"
                  aria-hidden="true"
                />
                <p className="text-white/50 text-sm font-medium">
                  {/* TODO: Adicionar foto real da escola */}
                  Foto da escola em breve
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -left-4 bg-gold rounded-xl shadow-lg px-5 py-3"
              aria-hidden="true"
            >
              <p className="text-secondary font-extrabold text-2xl leading-none">
                75+
              </p>
              <p className="text-secondary text-sm font-semibold mt-0.5">
                Anos de história
              </p>
            </div>

            {/* Decorative dot pattern */}
            <div
              className="absolute -top-4 -right-4 w-24 h-24 opacity-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--gold) 1.5px, transparent 1.5px)",
                backgroundSize: "8px 8px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
