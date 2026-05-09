"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, Database, FileText, LogOut, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/useUser";

export function SimuladosSidebarContent() {
  const { user, logout } = useUser();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-card">
      <div className="p-4 flex items-center gap-3 border-b">
        <Image
          src="/logo_escola.png"
          alt="Logo"
          width={32}
          height={32}
          className="object-contain"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground leading-tight truncate">
            Módulo de Simulados
          </p>
          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <NavLink href="/hub/simulados" icon={<FileText className="w-4 h-4" />} label="Simulados" />
        <NavLink href="/hub/simulados/questoes" icon={<Database className="w-4 h-4" />} label="Banco de Questões" />
        <Separator className="my-2" />
        <NavLink
          href="/hub/simulados/professor"
          icon={<BookOpen className="w-4 h-4" />}
          label="Link do Professor"
          external
        />
      </nav>

      <div className="p-3 border-t space-y-1">
        <Link
          href="/hub"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Hub
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </div>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}
