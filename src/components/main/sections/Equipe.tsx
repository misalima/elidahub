import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SCHOOL_TEAM } from "@/constants/main/school";

export function Equipe() {
  return (
    <section
      id="equipe"
      aria-labelledby="equipe-heading"
      className="py-20 lg:py-28 bg-slate-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-[#1a3a6b] hover:bg-blue-100 text-xs font-semibold uppercase tracking-wider px-3 py-1 mb-4">
            Gestão
          </Badge>
          <h2
            id="equipe-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#1a3a6b] mb-4"
          >
            Nossa <span className="text-blue-500">equipe</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Equipe comprometida com gestão participativa e transparente.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SCHOOL_TEAM.map((member) => (
            <Card
              key={member.id}
              className="border-slate-200 hover:border-blue-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group text-center"
            >
              <CardContent className="pt-6 pb-5 px-3">
                {/* Avatar */}
                {/* TODO: Substituir pelo src de uma foto real do membro */}
                {/* <Image src={member.avatarSrc} alt={`Foto de ${member.name}`} width={80} height={80} className="rounded-full mx-auto mb-3 object-cover" /> */}
                <div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1a3a6b] to-blue-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform"
                  aria-hidden="true"
                >
                  <span className="text-white font-bold text-lg select-none">
                    {member.avatarInitials}
                  </span>
                </div>

                {/* Name */}
                {/* TODO: Substituir pelo nome real do membro */}
                <p className="text-[#1a3a6b] font-semibold text-xs leading-snug mb-1">
                  {member.name}
                </p>

                {/* Role */}
                <p className="text-gray-500 text-xs leading-snug">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
