"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { BookOpen, Database, FileText, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SimuladosLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Rotas do professor usam autenticação por cookie — sem Supabase Auth
  const isProfessorRoute = pathname.includes("/professor");

  useEffect(() => {
    if (isProfessorRoute) return; // professor não precisa de Supabase auth
    if (!loading && !user) {
      router.replace("/hub");
    }
  }, [user, loading, router, isProfessorRoute]);

  // Professor: sem sidebar, sem auth guard — só renderiza os filhos
  if (isProfessorRoute) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-white dark:bg-card flex flex-col">
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
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
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

        <div className="p-3 border-t">
          <Link
            href="/hub"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Settings className="w-4 h-4" />
            Voltar ao Hub
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
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
