-- ============================================================
-- MIGRAÇÃO: Adicionar colunas difficulty e level à tabela questions
-- Execute este script no Supabase SQL Editor
-- ============================================================

ALTER TABLE public.questions
  ADD COLUMN IF NOT EXISTS difficulty text CHECK (difficulty IN ('Fácil', 'Médio', 'Difícil')),
  ADD COLUMN IF NOT EXISTS level text CHECK (level IN ('1ª Série', '2ª Série', '3ª Série', 'EJA'));

-- ============================================================
-- Fim da migração
-- ============================================================
