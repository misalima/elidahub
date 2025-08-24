import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface SidebarMenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  sidebarOpen: boolean;
  sidebarMobile: boolean;
  sidebarHover: boolean;
  showMenuText: boolean;
  showLogo: boolean;
  isSidebarExpanded: boolean;
  sidebarMenu: SidebarMenuItem[];
  onSidebarToggle: () => void;
  onSidebarMobileClose: () => void;
  onSidebarHover: (hover: boolean) => void;
  logout: () => void;
  router: { push: (href: string) => void };
}

export const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  sidebarMobile,
  sidebarHover,
  showMenuText,
  showLogo,
  isSidebarExpanded,
  sidebarMenu,
  onSidebarToggle,
  onSidebarMobileClose,
  onSidebarHover,
  logout,
  router,
}) => {
  return (
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
            width: sidebarOpen || sidebarHover || sidebarMobile ? 86 : 40,
            justifyContent: 'flex-start',
            transitionProperty: 'opacity, transform, width',
          }}
        >
          <Image
            src="/vqdt.png"
            alt="VQDT Logo"
            width={sidebarOpen || sidebarHover || sidebarMobile ? 86 : 40}
            height={sidebarOpen || sidebarHover || sidebarMobile ? 86 : 40}
            className={`object-contain ${(sidebarOpen || sidebarHover || sidebarMobile) ? 'max-h-14' : 'max-h-10'}`}
            priority
          />
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={sidebarOpen || sidebarMobile ? 'Retract sidebar' : 'Expand sidebar'}
          onClick={onSidebarToggle}
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
        onMouseEnter={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768 && !sidebarOpen) onSidebarHover(true); }}
        onMouseLeave={() => { if (typeof window !== 'undefined' && window.innerWidth >= 768 && !sidebarOpen) onSidebarHover(false); }}
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
                  onSidebarMobileClose();
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
  );
};
