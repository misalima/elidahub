import type { Metadata } from "next";
import { Header } from "@/components/main/Header";
import { Footer } from "@/components/main/Footer";
import {
  SCHOOL_NAME,
  SCHOOL_LOCATION,
  SCHOOL_MOTTO,
} from "@/constants/main/school";

export const metadata: Metadata = {
  title: `${SCHOOL_NAME} | ${SCHOOL_LOCATION}`,
  description: `Site oficial da ${SCHOOL_NAME}, localizada em ${SCHOOL_LOCATION}. "${SCHOOL_MOTTO}" — Ensino Médio Regular e EJA nos turnos matutino, vespertino e noturno.`,
  keywords: [
    "Escola Estadual",
    "Professor José Félix",
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
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
