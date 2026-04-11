"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { SimuladosSidebarContent } from "@/components/simulados/SimuladosSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SimuladosLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Rotas do professor usam autenticação por cookie — sem Supabase Auth
  const isProfessorRoute = pathname.includes("/professor");
  const isPrintRoute = pathname.includes("/imprimir");
  const isGabaritoRoute = pathname.includes("/gabarito");

  useEffect(() => {
    if (isProfessorRoute) return;
    if (!loading && !user) {
      router.replace("/hub/login");
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

  // Print ou Gabarito: sem sidebar, mas mantém auth guard
  if (isPrintRoute || isGabaritoRoute) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900">
      {/* Mobile Top Header */}
      <header className="flex md:hidden items-center justify-between p-4 border-b bg-white dark:bg-card">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span className="font-bold text-sm">Simulados</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <SimuladosSidebarContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 border-r bg-white dark:bg-card flex-col">
        <SimuladosSidebarContent />
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
