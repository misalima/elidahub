"use client";

import { usePathname } from "next/navigation";
import { LANDING_PAGE_UNDER_CONSTRUCTION } from "@/constants/main/school";
import { Footer } from "@/components/main/Footer";
import { Header } from "@/components/main/Header";

export function MainShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || pathname === "/main";
  const hideInstitutionalChrome =
    LANDING_PAGE_UNDER_CONSTRUCTION && isLandingPage;

  return (
    <>
      {!hideInstitutionalChrome && <Header />}
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      {!hideInstitutionalChrome && <Footer />}
    </>
  );
}
