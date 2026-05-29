"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SCHOOL_NAME } from "@/constants/main/school";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Smooth scroll with offset for fixed header
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -72;
      const y =
        target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-secondary/95 backdrop-blur-md shadow-lg"
          : "bg-secondary"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo + Nome */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#inicio");
            }}
            className="flex items-center gap-3 group"
            aria-label={`${SCHOOL_NAME} – Página inicial`}
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-white group-hover:ring-2 group-hover:ring-gold transition-all">
              <Image
                src="/logo_escola.png"
                alt="Logo da Escola Estadual Profª. Maria Élida Dias Carvalho Pereira"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">
                {SCHOOL_NAME}
              </p>
              <p className="text-white/70 text-xs leading-tight">
                São Sebastião – AL
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/10"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-secondary border-white/10 w-72"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-white">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full overflow-hidden bg-white">
                    <Image
                      src="/logo_escola.png"
                      alt="Logo da escola"
                      width={28}
                      height={28}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs leading-tight">{SCHOOL_NAME}</span>
                </SheetTitle>
              </SheetHeader>
              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-1 mt-6"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 text-base font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
