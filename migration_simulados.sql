-- ============================================================
-- MIGRAÇÃO: Módulo de Simulados Escolares — FelixHub
-- Execute este script no Supabase SQL Editor
-- ============================================================

-- 1. Trigger helper (reutilizado para ambas as tabelas)
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- 2. Tabela: questions (banco de questões)
-- ============================================================
create table if not exists public.questions (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),

  -- Identificação pedagógica
  knowledge_area text not null,
  subject        text not null,

  -- Conteúdo
  statement      text not null,
  image_url      text,

  -- Alternativas (A–E)
  option_a       text not null,
  option_b       text not null,
  option_c       text not null,
  option_d       text not null,
  option_e       text not null,

  -- Gabarito
  answer         char(1) not null check (answer in ('A','B','C','D','E')),

  -- Rastreabilidade
  teacher_name   text
);

drop trigger if exists questions_updated_at on public.questions;
create trigger questions_updated_at
  before update on public.questions
  for each row execute procedure public.set_updated_at();

-- RLS: service role bypassa, anon pode ler (coordenador via API Route)
alter table public.questions enable row level security;

drop policy if exists "questions_select_all" on public.questions;
create policy "questions_select_all" on public.questions
  for select using (true);

-- ============================================================
-- 3. Tabela: exams (simulados montados pelo coordenador)
-- ============================================================
create table if not exists public.exams (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  created_by   uuid references public.profiles(id),

  title        text not null,
  description  text,
  instructions text,

  -- Metadados do cabeçalho para impressão
  school_name  text not null default 'ESCOLA ESTADUAL PROFESSOR JOSÉ FÉLIX DE CARVALHO ALVES',
  school_year  text,
  grade        text,
  date_label   text,
  duration     text,

  status       text not null default 'draft'
                 check (status in ('draft','published'))
);

drop trigger if exists exams_updated_at on public.exams;
create trigger exams_updated_at
  before update on public.exams
  for each row execute procedure public.set_updated_at();

alter table public.exams enable row level security;

drop policy if exists "exams_auth_only" on public.exams;
create policy "exams_auth_only" on public.exams
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- 4. Tabela: exam_questions (junção com ordem)
-- ============================================================
create table if not exists public.exam_questions (
  id          uuid primary key default gen_random_uuid(),
  exam_id     uuid not null references public.exams(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  position    int  not null default 0,
  unique(exam_id, question_id)
);

alter table public.exam_questions enable row level security;

drop policy if exists "exam_questions_auth_only" on public.exam_questions;
create policy "exam_questions_auth_only" on public.exam_questions
  for all using (auth.role() = 'authenticated');

-- ============================================================
-- Fim da migração
-- ============================================================
