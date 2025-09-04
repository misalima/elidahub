"use client";
import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/vqdt/Sidebar";
import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileBarChart2,
  Settings,
  ChevronRight,
  Users,
} from "lucide-react";

interface VqdtLayoutProps {
  children: React.ReactNode;
}

export default function VqdtLayout({ children }: VqdtLayoutProps) {
  const pathname = usePathname();

  let pageTitle = "";
  if (pathname?.startsWith("/vqdt/dashboard")) {
    pageTitle = "Visão Geral";
  } else if (pathname?.startsWith("/vqdt/reports")) {
    pageTitle = "Relatórios";
  } else if (pathname?.startsWith("/vqdt/citizens")) {
    pageTitle = "Cidadãos";
  } else if (pathname?.startsWith("/vqdt/settings")) {
    pageTitle = "Configurações";
  }
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  const [sidebarMobile, setSidebarMobile] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const [showMenuText, setShowMenuText] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const sidebarMenu = [
    { label: "Visão Geral", href: "/vqdt/dashboard", icon: LayoutDashboard },
    { label: "Cidadãos", href: "/vqdt/citizens", icon: Users },
    { label: "Relatórios", href: "/vqdt/reports", icon: FileBarChart2 },
    { label: "Configurações", href: "/vqdt/settings", icon: Settings },
  ];

  const isSidebarExpanded =
    sidebarOpen || sidebarHover || sidebarMobile || showMenuText;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sidebarHover || sidebarOpen || sidebarMobile) {
      timeout = setTimeout(() => setShowMenuText(true), 180);
    } else {
      setShowMenuText(false);
    }
    return () => clearTimeout(timeout);
  }, [sidebarHover, sidebarOpen, sidebarMobile]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sidebarOpen || sidebarHover || sidebarMobile) {
      setShowLogo(true);
    } else {
      timeout = setTimeout(() => setShowLogo(false), 200);
    }
    return () => clearTimeout(timeout);
  }, [sidebarOpen, sidebarHover, sidebarMobile]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/vqdt/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex min-h-screen bg-muted">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${
          sidebarMobile
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarMobile(false)}
      />
      <Sidebar
        sidebarOpen={sidebarOpen}
        sidebarMobile={sidebarMobile}
        sidebarHover={sidebarHover}
        showMenuText={showMenuText}
        showLogo={showLogo}
        isSidebarExpanded={isSidebarExpanded}
        sidebarMenu={sidebarMenu}
        onSidebarToggle={() => {
          if (typeof window !== "undefined" && window.innerWidth < 768) {
            setSidebarMobile(false);
          } else {
            setSidebarOpen((v) => !v);
          }
        }}
        onSidebarMobileClose={() => setSidebarMobile(false)}
        onSidebarHover={(hover) => setSidebarHover(hover)}
        logout={logout}
        router={router}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-b border-[var(--sidebar-border)] flex items-center px-2 md:px-8 shadow-sm gap-2 justify-between top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menu"
            onClick={() => setSidebarMobile(true)}
          >
            <ChevronRight className="size-6" />
          </Button>
          <div className="flex flex-col items-center justify-center md:items-start">
            <h1 className="text-sm md:text-2xl font-bold">{pageTitle}</h1>
          </div>
          <ThemeToggleButton />
        </header>
        <main className="flex-1 min-w-0 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
