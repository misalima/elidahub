import Image from "next/image";
import { Construction } from "lucide-react";
import {
  SCHOOL_LOCATION,
  SCHOOL_NAME,
} from "@/constants/main/school";

export function UnderConstruction() {
  return (
    <section
      aria-labelledby="under-construction-heading"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-[#11182a] px-4 py-12 text-white dark:bg-[#080b13] sm:px-6"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/4 size-80 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-1/4 size-80 rounded-full bg-gold/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%)]"
      />

      <div className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-10 text-center shadow-2xl shadow-black/25 backdrop-blur-xl sm:px-10 sm:py-12">
        <div className="mx-auto mb-6 size-20 overflow-hidden rounded-full border-4 border-white/90 bg-white shadow-xl shadow-primary/10">
          <Image
            src="/logo_escola.png"
            alt={`Logo da ${SCHOOL_NAME}`}
            width={80}
            height={80}
            className="size-full object-cover"
            priority
          />
        </div>

        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          <Construction className="size-4" aria-hidden="true" />
          Novidades em breve
        </div>

        <h1
          id="under-construction-heading"
          className="text-3xl font-extrabold tracking-tight sm:text-5xl"
        >
          Site em <span className="text-primary">construção</span>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-300 sm:text-lg">
          Estamos preparando o novo site da escola. Em breve, você encontrará
          todas as informações por aqui.
        </p>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold text-white/90">{SCHOOL_NAME}</p>
          <p className="mt-1 text-xs text-slate-400">{SCHOOL_LOCATION}</p>
        </div>
      </div>
    </section>
  );
}
