// ============================================================
// Constantes centralizadas para o site institucional
// Escola Estadual Profª. Maria Élida Dias Carvalho Pereira
// ============================================================

export const SCHOOL_NAME =
  "Escola Estadual Profª. Maria Élida Dias Carvalho Pereira";
export const SCHOOL_SHORT_NAME = "E.E. Profª. Maria Élida";
export const HUB_NAME = "ÉlidaHub";
export const HUB_USER_CACHE_KEY = "elidahub_user";
export const SCHOOL_LOCATION = "São Sebastião – AL";
export const LANDING_PAGE_UNDER_CONSTRUCTION = true;
export const STUDENT_REPORTS_ENABLED = false;

// ── Números ──────────────────────────────────────────────────
export const SCHOOL_STATS = [
  { id: "alunos", value: 800, suffix: "+", label: "Alunos" },
  { id: "professores", value: 30, suffix: "+", label: "Professores" },
  { id: "historia", value: 75, suffix: "+", label: "Anos de história" },
  { id: "turnos", value: 3, suffix: "", label: "Turnos" },
] as const;

// ── Estrutura ─────────────────────────────────────────────────
export const SCHOOL_FACILITIES = [
  { id: "salas", label: "9 Salas de aula climatizadas", icon: "DoorOpen" },
  { id: "biblioteca", label: "Biblioteca", icon: "BookOpen" },
  { id: "aee", label: "Sala de AEE", icon: "Accessibility" },
  { id: "gremio", label: "Sala do Grêmio", icon: "Users" },
  { id: "lab", label: "Laboratório de Informática Móvel", icon: "Laptop" },
] as const;

// ── Projetos ─────────────────────────────────────────────────
export const SCHOOL_PROJECTS = [
  {
    id: "fesmatecc",
    title: "FESMATECC",
    subtitle: "Feira de Ciências e Cultura",
    description:
      "Interdisciplinaridade e protagonismo estudantil através da investigação científica e expressão cultural.",
    icon: "FlaskConical",
    badge: "Ciência & Cultura",
  },
  {
    id: "protagonismo",
    title: "Protagonismo Juvenil",
    subtitle: "Grêmio Estudantil",
    description:
      "Fortalecimento da liderança e participação democrática dos estudantes na vida escolar.",
    icon: "Users2",
    badge: "Liderança",
  },
  {
    id: "inclusao",
    title: "Inclusão e Diversidade",
    subtitle: "Educação Especial e Cultura Local",
    description:
      "Valorização da educação especial e das tradições regionais como a renda de bilro.",
    icon: "Heart",
    badge: "Inclusão",
  },
] as const;

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarInitials: string;
  avatarSrc: string;
}

export const SCHOOL_TEAM: readonly TeamMember[] = [
  {
    id: "gestor-1",
    name: "Genilson da Silva",
    role: "Gestor Geral",
    avatarInitials: "GS",
    avatarSrc: "/team/gestor-geral.png",
  },
  {
    id: "gestor-2",
    name: "Antônia da Silva Santos",
    role: "Gestora Adjunta",
    avatarInitials: "AS",
    avatarSrc: "/team/gestor-adjunto.png",
  },
  {
    id: "coord-1",
    name: "Cryslene Ferreira",
    role: "Coordenadora Pedagógica",
    avatarInitials: "CF",
    avatarSrc: "/team/coordenador-1.png",
  },
  {
    id: "coord-2",
    name: "Jhonatan Pinheiro",
    role: "Coordenador Pedagógico",
    avatarInitials: "JP",
    avatarSrc: "/team/coordenador-2.png",
  },
  {
    id: "articulador",
    name: "Eudes Pereira",
    role: "Articulador de Ensino",
    avatarInitials: "EP",
    avatarSrc: "/team/articulador.png",
  },
] as const;

// ── Contato ───────────────────────────────────────────────────
export const SCHOOL_CONTACT = {
  address: "Rua Pedro Vieira de Barros, S/N, Centro — Próximo à Prefeitura Municipal, São Sebastião – AL",
  phone: "(82) 99913-7086",
  email: "ee.mariaelida@educ.al.gov.br",
  instagramUrl: "#",
  whatsappUrl: "https://wa.me/558281239131",
} as const;

// ── Navegação ─────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Números", href: "#numeros" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Projetos", href: "#projetos" },
  { label: "Equipe", href: "#equipe" },
  { label: "Contato", href: "#contato" },
] as const;
