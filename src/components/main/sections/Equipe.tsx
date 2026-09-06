import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_TEAM } from "@/constants/main/school";

export function Equipe() {
  return (
    <section
      id="equipe"
      aria-labelledby="equipe-heading"
      className="bg-slate-50 py-20 dark:bg-slate-900 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-sm font-semibold uppercase tracking-wider px-3 py-1 mb-4">
            Gestão
          </Badge>
          <h2
            id="equipe-heading"
            className="mb-4 text-3xl font-extrabold text-secondary dark:text-slate-50 sm:text-4xl"
          >
            Nossa <span className="text-primary">equipe</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-500 dark:text-slate-300">
            Equipe comprometida com gestão participativa e transparente.
          </p>
        </div>

        {/* Team grid */}
        <div className="flex flex-wrap justify-center gap-4">
          {SCHOOL_TEAM.map((member) => (
            <Card
              key={member.id}
              className="group w-[calc(50%-8px)] border-slate-200 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:shadow-md dark:border-white/10 dark:hover:border-primary/40 sm:w-40 md:w-44 lg:w-48"
            >
              <CardContent className="pt-6 pb-5 px-3">
                {/* Avatar with Initials */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div
                    className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-secondary to-primary shadow-md transition-all duration-300 group-hover:scale-110 dark:border-slate-700 dark:from-slate-700 dark:to-primary"
                  >
                    <span className="text-white font-bold text-2xl select-none">
                      {member.avatarInitials}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <p className="mb-1 text-sm font-bold leading-tight text-secondary dark:text-slate-50">
                  {member.name}
                </p>

                {/* Role */}
                <p className="text-sm font-semibold uppercase leading-snug tracking-wider text-gray-500 dark:text-slate-400">
                  {member.role}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
