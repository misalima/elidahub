# FelixHub

O FelixHub é uma plataforma abrangente desenvolvida para centralizar e otimizar a comunicação entre a escola e toda a comunidade escolar. Nosso objetivo é criar um ambiente unificado onde informações, agendamentos e interações fluam de forma eficiente e transparente.

## Módulo Inicial: Vem que Dá Tempo (VQDT)

O módulo "Vem que Dá Tempo" (VQDT) é dedicado ao gerenciamento de agendamentos e à comunicação direta entre os bolsistas do programa (coordenadora e professores) e os cidadãos participantes.

### Funcionalidades Principais do VQDT:

*   **Gerenciamento de Agendamentos:** Criação, visualização, edição e controle de agendamentos para cursos e provas.
*   **Comunicação via WhatsApp:** Envio automático de mensagens de confirmação, avisos em massa, e reagendamentos para os cidadãos inscritos.
*   **Bot Automatizado:** Bot que responde dúvidas frequentes por texto, interpreta respostas simples dos cidadãos e encaminha casos complexos para atendimento humano.
*   **Painel de Gestão:** Interface web para a equipe gestora acompanhar agendamentos, histórico de mensagens, status de atendimento e enviar mensagens diretamente.
*   **Controle de Presença e Metas:** Acompanhamento do status de comparecimento e definição de metas mensais de agendamento.
*   **Relatórios e Exportação:** Geração de relatórios básicos e exportação de dados em formatos CSV ou Excel.

### Tecnologias Utilizadas:

*   **Frontend:** [Next.js](https://nextjs.org/) com App Router.
*   **Banco de Dados e Autenticação:** [Supabase](https://supabase.com/) (PostgreSQL e Supabase Auth).
*   **Componentes UI:** [Shadcn UI](https://ui.shadcn.com/) e Tailwind CSS.
*   **Integração WhatsApp:** Provavelmente API Z-API para envio e recebimento de mensagens (ainda analisando outras possíveis soluções).
*   **Bot:** Implementação própria com possibilidade de integração opcional com OpenAI GPT.

### Estrutura do Banco de Dados (Schemas `public` e `vqdt`):

O banco de dados é dividido em dois schemas principais para organizar as informações:

*   **`public`:** Tabelas gerais como perfis de usuários (`profiles`), mensagens (`messages`) e FAQ (`faq_entries`).
*   **`vqdt`:** Tabelas específicas do módulo, incluindo cidadãos (`citizens`), agendamentos (`schedules`), agendamentos de cidadãos (`citizen_schedules`), metas mensais (`monthly_targets`) e lotes de mensagens em massa (`bulk_message_batches`).

### Diagramas do banco
O primeiro é o diagrama do schema "public". O segundo, do schema "vqdt": 
<figure>
  <img width="589" height="639" alt="public_erd" src="https://github.com/user-attachments/assets/0ba61d2d-2c03-4575-a92c-b51a24d1309d" />
</figure> 


<figure>
  <img width="655" height="695" alt="vqdt_erd" src="https://github.com/user-attachments/assets/1ba3e65f-e8af-4bad-8110-fe91aa739d1b" />
</figure>

## Como rodar o projeto

### Pré-requisitos

1. **Node.js**: Certifique-se de ter o Node.js instalado (versão recomendada: 18 ou superior).
2. **Gerenciador de pacotes**: Utilize o `npm` ou `yarn` para instalar as dependências.
3. **Variáveis de ambiente**: Configure as variáveis de ambiente conforme o arquivo `.env.example`.

### Passos para rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/misalima/felixhub.git
   cd felixhub
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Edite o arquivo `.env.local` e preencha os valores necessários.

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Acesse o projeto no navegador:
   - O projeto estará disponível em [http://localhost:3000](http://localhost:3000).

### Comandos úteis

- **Iniciar o servidor de desenvolvimento**:
  ```bash
  npm run dev
  ```
- **Build para produção**:
  ```bash
  npm run build
  ```
- **Iniciar o servidor em produção**:
  ```bash
  npm run start
  ```
- **Verificar erros de lint**:
  ```bash
  npm run lint
  ```
- **Corrigir erros de lint**:
  ```bash
  npm run lint:fix
  ```
- **Checar tipos TypeScript**:
  ```bash
  npm run type-check
  ```

### Fluxo de login

1. Acesse a página de login em `/vqdt/login`.
2. Insira suas credenciais.
3. Após o login, você será redirecionado para o dashboard.



