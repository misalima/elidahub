# ÉlidaHub

Plataforma de apoio à gestão pedagógica da Escola Estadual Profª. Maria Élida Dias Carvalho Pereira.

## Funcionalidades

- Diretório e prontuário de estudantes, com ocorrências e situação escolar atual.
- Dashboard pedagógico e indicadores de risco.
- Conselho de Classe, importação de desempenho, intervenções e documentos em PDF.
- Gestão de usuários, papéis de acesso e auditoria administrativa.
- Perfil do usuário com atualização de nome, senha e avatar.
- Criação, gestão e impressão de simulados e banco de questões.
- Folhas de frequência e recursos do Professor Mentor.
- Site institucional e consulta de boletins.

## Tecnologias

- Next.js 15 com App Router e React 19.
- TypeScript e Tailwind CSS.
- Supabase para PostgreSQL, autenticação e armazenamento.
- TanStack Query, Radix UI e shadcn/ui.
- Vitest para testes automatizados.

## Configuração local

Pré-requisitos: Node.js 20 ou superior, npm e um projeto Supabase compatível.

```bash
git clone git@github.com:misalima/elidahub.git
cd elidahub
npm ci
cp .env.example .env.local
npm run dev
```

Preencha em `.env.local` as seguintes variáveis:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_SUPABASE_SERVICE_ROLE_KEY`
- `TEACHER_ACCESS_PASSWORD`

A aplicação local estará disponível em [http://localhost:3000](http://localhost:3000).

## Banco de dados

As migrations versionadas estão em `supabase/migrations`. Antes de aplicá-las, confira se o Supabase CLI está conectado ao projeto da Escola Maria Élida e faça um backup do banco.

```bash
supabase db push --dry-run
supabase db push
```

Nunca reutilize as credenciais ou o vínculo do projeto Supabase do FelixHub.

## Validação

```bash
npm run type-check
npm test
npm run build
```

## Identidade da escola

Nome do Hub, dados institucionais, contatos, equipe e navegação ficam centralizados em `src/constants/main/school.ts`. As cores globais ficam em `src/app/globals.css`.
