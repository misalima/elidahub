// ============================================================
// Constantes centralizadas para o site institucional
// Escola Estadual Professor José Félix de Carvalho Alves
// ============================================================

export const SCHOOL_NAME =
  "Escola Estadual Professor José Félix de Carvalho Alves";
export const SCHOOL_SHORT_NAME = "E.E. Prof. José Félix";
export const SCHOOL_LOCATION = "São Sebastião – AL";
export const SCHOOL_MOTTO = "Scientia Potentia Est";

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

// ── Equipe ───────────────────────────────────────────────────
// TODO: Substituir pelos nomes, cargos e fotos reais da equipe
export const SCHOOL_TEAM = [
  {
    id: "gestor-1",
    name: "Nome do Gestor",
    role: "Gestor(a) Escolar",
    avatarInitials: "GE",
  },
  {
    id: "gestor-2",
    name: "Nome do Gestor",
    role: "Gestor(a) Adjunto(a)",
    avatarInitials: "GA",
  },
  {
    id: "coord-1",
    name: "Nome do Coordenador",
    role: "Coordenador(a) Pedagógico(a)",
    avatarInitials: "CP",
  },
  {
    id: "coord-2",
    name: "Nome do Coordenador",
    role: "Coordenador(a) Pedagógico(a)",
    avatarInitials: "CP",
  },
  {
    id: "articuladora",
    name: "Nome da Articuladora",
    role: "Articuladora de Ensino",
    avatarInitials: "AE",
  },
  {
    id: "secretaria",
    name: "Nome da Secretária",
    role: "Secretária Escolar",
    avatarInitials: "SE",
  },
] as const;

// ── Contato ───────────────────────────────────────────────────
export const SCHOOL_CONTACT = {
  address: "Rua Pedro Vieira de Barros, S/N, Centro — Próximo à Prefeitura Municipal, São Sebastião – AL",
  // TODO: Inserir telefone real
  phone: "(82) 0000-0000",
  email: "ee.josefelix@educ.al.gov.br",
  instagramUrl: "https://instagram.com/eeprofjosefelix",
  // TODO: Inserir número real do WhatsApp (formato: 5582900000000)
  whatsappUrl: "https://wa.me/5582900000000",
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
