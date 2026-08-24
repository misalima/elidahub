import { Hero } from "@/components/main/sections/Hero";
import { Sobre } from "@/components/main/sections/Sobre";
import { Numeros } from "@/components/main/sections/Numeros";
import { Estrutura } from "@/components/main/sections/Estrutura";
import { Projetos } from "@/components/main/sections/Projetos";
import { Equipe } from "@/components/main/sections/Equipe";
import { Contato } from "@/components/main/sections/Contato";
import { UnderConstruction } from "@/components/main/UnderConstruction";
import { LANDING_PAGE_UNDER_CONSTRUCTION } from "@/constants/main/school";

export default function MainPage() {
  if (LANDING_PAGE_UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return (
    <>
      <Hero />
      <Sobre />
      <Numeros />
      <Estrutura />
      <Projetos />
      <Equipe />
      <Contato />
    </>
  );
}
