import { Hero } from "@/components/main/sections/Hero";
import { Sobre } from "@/components/main/sections/Sobre";
import { Numeros } from "@/components/main/sections/Numeros";
import { Estrutura } from "@/components/main/sections/Estrutura";
import { Projetos } from "@/components/main/sections/Projetos";
import { Equipe } from "@/components/main/sections/Equipe";
import { Contato } from "@/components/main/sections/Contato";

export default function MainPage() {
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
