export type KnowledgeArea =
  | 'Linguagens, Códigos e suas Tecnologias'
  | 'Ciências Humanas e suas Tecnologias'
  | 'Ciências da Natureza e suas Tecnologias'
  | 'Matemática e suas Tecnologias'
  | 'Interdisciplinar';

export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export const DIFFICULTIES: Difficulty[] = ['Fácil', 'Médio', 'Difícil'];

export type Level = '1ª Série' | '2ª Série' | '3ª Série' | 'EJA';

export const LEVELS: Level[] = ['1ª Série', '2ª Série', '3ª Série', 'EJA'];

export const KNOWLEDGE_AREAS: KnowledgeArea[] = [
  'Linguagens, Códigos e suas Tecnologias',
  'Ciências Humanas e suas Tecnologias',
  'Ciências da Natureza e suas Tecnologias',
  'Matemática e suas Tecnologias',
  'Interdisciplinar',
];

export const formatAreaBadge = (area: string) => {
  if (area === "Ciências Humanas e suas Tecnologias") return "Humanas";
  if (area === "Ciências da Natureza e suas Tecnologias") return "Natureza";
  if (area === "Linguagens, Códigos e suas Tecnologias") return "Linguagens";
  if (area === "Matemática e suas Tecnologias") return "Matemática";
  if (area === "Interdisciplinar") return "Interdisciplinar";
  return area.split(" ")[0] || area;
};

export const formatAreaSelect = (area: string) => {
  if (area === "Ciências Humanas e suas Tecnologias") return "C. Humanas";
  if (area === "Ciências da Natureza e suas Tecnologias") return "C. da Natureza";
  if (area === "Linguagens, Códigos e suas Tecnologias") return "Linguagens";
  if (area === "Matemática e suas Tecnologias") return "Matemática";
  if (area === "Interdisciplinar") return "Interdisciplinar";
  return area;
};

export const DISCIPLINES_BY_AREA: Record<KnowledgeArea, string[]> = {
  'Linguagens, Códigos e suas Tecnologias': [
    'Língua Portuguesa',
    'Educação Física',
    'Arte',
    'Língua Inglesa',
    'Temas de Aprofundamento em LGG e CH',
    'Práticas de LGG e CH',
  ],
  'Ciências Humanas e suas Tecnologias': [
    'História',
    'Geografia',
    'Filosofia',
    'Sociologia',
    'Temas de Aprofundamento em LGG e CH',
    'Práticas de LGG e CH',
  ],
  'Ciências da Natureza e suas Tecnologias': [
    'Biologia',
    'Física',
    'Química',
    'Temas de Aprofundamento em MAT e CNT',
    'Práticas de MAT e CNT',
  ],
  'Matemática e suas Tecnologias': [
    'Matemática',
    'Temas de Aprofundamento em MAT e CNT',
    'Práticas de MAT e CNT',
  ],
  'Interdisciplinar': [
    'PIT - Práticas de Integração no Território',
    'TAC - Temas de Aprofundamento Curricular',
    'Projeto de Vida',
  ],
};

export type AnswerOption = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Question {
  id: string;
  created_at: string;
  updated_at: string;
  knowledge_area: KnowledgeArea;
  subject: string;
  statement: string;
  image_url: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  answer: AnswerOption;
  teacher_name: string | null;
  topic: string | null;
  difficulty: Difficulty | null;
  level: Level | null;
  deleted_at: string | null;
}

export type ExamStatus = 'draft' | 'ready' | 'editing';

export const EXAM_STATUS_LABELS: Record<ExamStatus, string> = {
  draft: 'Rascunho',
  editing: 'Em Edição',
  ready: 'Concluído',
};

export const EXAM_STATUS_BADGE_VARIANT: Record<ExamStatus, 'secondary' | 'warning' | 'success'> = {
  draft: 'secondary',
  editing: 'warning',
  ready: 'success',
};

export interface Exam {
  id: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  title: string;
  description: string | null;
  school_name: string;
  school_year: string | null;
  grade: string | null;
  date_label: string | null;
  duration: string | null;
  instructions: string | null;
  status: ExamStatus;
  questions_count?: number;
}

export interface ExamQuestion {
  id: string;
  exam_id: string;
  question_id: string;
  position: number;
}

export interface ExamWithQuestions extends Exam {
  exam_questions: (ExamQuestion & { question: Question })[];
}

export interface CreateQuestionPayload {
  knowledge_area: KnowledgeArea;
  subject: string;
  statement: string;
  image_url?: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  option_e: string;
  answer: AnswerOption;
  topic?: string | null;
  teacher_name?: string;
  difficulty?: Difficulty | null;
  level?: Level | null;
}

export interface CreateExamPayload {
  title: string;
  description?: string;
  school_name?: string;
  school_year?: string;
  grade?: string;
  date_label?: string;
  duration?: string;
  instructions?: string;
}
