import "../imprimir/print.css";
import { HUB_NAME } from "@/constants/main/school";

export const metadata = {
  title: `Folha de Respostas | ${HUB_NAME}`,
};

export default function FolhaRespostaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
