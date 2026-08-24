import type { Metadata } from "next";
import { MainShell } from "@/components/main/MainShell";
import {
  SCHOOL_NAME,
  SCHOOL_LOCATION,
} from "@/constants/main/school";

export const metadata: Metadata = {
  title: `${SCHOOL_NAME} | ${SCHOOL_LOCATION}`,
  description: `Site oficial da ${SCHOOL_NAME}, localizada em ${SCHOOL_LOCATION}. Ensino Médio Regular e EJA nos turnos matutino, vespertino e noturno.`,
  keywords: [
    "Escola Estadual",
    "Professora Maria Élida",
    "São Sebastião",
    "Alagoas",
    "Ensino Médio",
    "EJA",
    "SEDUC/AL",
  ],
  openGraph: {
    title: SCHOOL_NAME,
    description: `Formando cidadãos, transformando realidades. ${SCHOOL_LOCATION}.`,
    type: "website",
    locale: "pt_BR",
  },
};

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainShell>{children}</MainShell>;
}
