"use client";


import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  LayoutDashboard,
  FileBarChart2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import Image from "next/image";


const sidebarMenu = [
  { label: "Dashboard", href: "/vqdt/dashboard", icon: LayoutDashboard },
  { label: "Relatórios", href: "/vqdt/dashboard/reports", icon: FileBarChart2 },
  { label: "Configurações", href: "/vqdt/dashboard/settings", icon: Settings },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const [sidebarMobile, setSidebarMobile] = useState(false);
  const [sidebarHover, setSidebarHover] = useState(false);
  const [showMenuText, setShowMenuText] = useState(false);
  const [showLogo, setShowLogo] = useState(true);
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Variável para controlar se a sidebar está expandida ou em transição
  const isSidebarExpanded = sidebarOpen || sidebarHover || sidebarMobile || showMenuText;

  // Controla o delay para mostrar o texto do menu
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if ((sidebarHover || sidebarOpen || sidebarMobile)) {
      timeout = setTimeout(() => setShowMenuText(true), 180); // espera a animação
    } else {
      setShowMenuText(false);
    }
    return () => clearTimeout(timeout);
  }, [sidebarHover, sidebarOpen, sidebarMobile]);

  // Controla o delay para esconder a logo só após a animação
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (sidebarOpen || sidebarHover || sidebarMobile) {
      setShowLogo(true);
    } else {
      timeout = setTimeout(() => setShowLogo(false), 200); // igual ao duration da animação
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
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 md:hidden ${sidebarMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarMobile(false)}
      />
      {/* Sidebar */}
      <aside
        className={`
          bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-r border-[var(--sidebar-border)] flex flex-col shadow-sm h-screen
          fixed z-50 top-0 left-0 w-56 px-0
          transition-transform duration-300 ease-in-out
          md:static md:z-auto md:flex md:translate-x-0 md:opacity-100 md:pointer-events-auto
          ${sidebarMobile ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}
          md:transition-all md:duration-300 md:ease-in-out
          ${(sidebarOpen || sidebarHover) && !sidebarMobile ? 'md:w-56 md:px-0' : 'md:w-16 md:px-2'}
        `}
        aria-hidden={false}
        style={{
          minWidth: sidebarMobile ? '14rem' : undefined,
          width: sidebarMobile ? undefined : ((sidebarOpen || sidebarHover) ? '14rem' : '4rem'),
          transitionProperty: sidebarMobile ? undefined : 'width, padding',
        }}
      >
        {/* Logo and Toggle button in the same row */}
  <div className={`flex items-center h-16 border-b border-[var(--sidebar-border)] ${(sidebarOpen || sidebarHover || sidebarMobile || showMenuText || showLogo) ? 'justify-between px-4' : 'justify-end px-2'}`}>
          <span
            className={`flex items-center transition-all duration-200 ease-in-out
              ${(sidebarOpen || sidebarHover || sidebarMobile) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
            `}
            style={{
              width: sidebarOpen || sidebarHover || sidebarMobile ? 72 : 40,
              justifyContent: 'flex-start',
              transitionProperty: 'opacity, transform, width',
            }}
          >
            <Image
              src="/vqdt.png"
              alt="VQDT Logo"
              width={sidebarOpen || sidebarHover || sidebarMobile ? 72 : 40}
              height={sidebarOpen || sidebarHover || sidebarMobile ? 72 : 40}
              className={`object-contain ${(sidebarOpen || sidebarHover || sidebarMobile) ? 'max-h-14' : 'max-h-10'}`}
              priority
            />
          </span>
          <Button
            variant="ghost"
            size="icon"
            aria-label={sidebarOpen || sidebarMobile ? 'Retract sidebar' : 'Expand sidebar'}
            onClick={() => {
              if (window.innerWidth < 768) {
                setSidebarMobile(false);
              } else {
                setSidebarOpen((v) => !v);
              }
            }}
            className="ml-2"
          >
            {(sidebarOpen || sidebarHover || sidebarMobile)
              ? <ChevronLeft className="size-5" />
              : <ChevronRight className="size-5" />}
          </Button>
        </div>
        {/* Menu + Logout hover region */}
        <div
          className="flex flex-col flex-1"
          onMouseEnter={() => { if (window.innerWidth >= 768 && !sidebarOpen) setSidebarHover(true); }}
          onMouseLeave={() => { if (window.innerWidth >= 768 && !sidebarOpen) setSidebarHover(false); }}
        >
          <nav className="flex flex-col gap-2 mt-4 flex-1">
            {sidebarMenu.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`flex items-center w-full gap-3 py-3 rounded-md text-base transition-colors pr-4
                    ${isSidebarExpanded ? 'md:justify-start md:pl-4 justify-end pl-4' : 'justify-center pl-2'}
                    text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]`}
                  onClick={() => {
                    router.push(item.href);
                    setSidebarMobile(false);
                  }}
                  tabIndex={0}
                >
                  <Icon className={`size-6 ${!sidebarOpen && !sidebarHover ? 'mx-2' : ''}`} />
                  {showMenuText && (sidebarOpen || sidebarHover || sidebarMobile) && <span>{item.label}</span>}
                </Button>
              );
            })}
          </nav>
          {/* Logout at bottom, com espaçamento inferior agradável */}
          <div className={`flex pb-4 ${isSidebarExpanded ? 'md:justify-start md:px-4 justify-end px-4' : 'justify-center'}`}>
            <Button
              variant="destructive"
              className={`flex items-center gap-2 transition-all duration-150 hover:text-white w-full ${sidebarOpen || sidebarHover || sidebarMobile ? 'px-0' : ''}`}
              style={{ transition: 'all 0.15s cubic-bezier(.4,0,.2,1)' }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-logout-hover');
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.transform = '';
              }}
              onClick={logout}
            >
              <LogOut className="size-5" />
              {showMenuText && (sidebarOpen || sidebarHover || sidebarMobile) && <span className="text-white">Sair</span>}
            </Button>
          </div>
        </div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-b border-[var(--sidebar-border)] flex items-center px-2 md:px-8 shadow-sm gap-2 justify-between sticky top-0 z-30">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menu"
            onClick={() => setSidebarMobile(true)}
          >
            <ChevronRight className="size-6" />
          </Button>
          <span className="text-base md:text-lg font-semibold truncate">Olá, {user.email} ({user.role})</span>
          <ThemeToggleButton />
        </header>
        {/* Page Content */}
        <main className="flex-1 p-2 md:p-8 bg-muted/50 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Selecione uma opção no menu lateral para começar.</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
