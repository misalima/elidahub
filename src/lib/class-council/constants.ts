import type { BehaviorCategory } from "@/types/class-council";

export const COUNCIL_CRITERIA = {
  lowGradeThreshold: 6,
  lowGradeSubjectAlertCount: 4,
  lowAttendanceThreshold: 80,
} as const;

export const MAX_IMPORT_BYTES = 25 * 1024 * 1024;
export const IMPORT_BUCKET = "class-council-imports";
export const XLSX_MIME = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
export const RESULT_BATCH_SIZE = 500;

export const BEHAVIOR_LABELS: Record<BehaviorCategory, string> = {
  excessive_talking: "Conversas excessivas",
  inappropriate_phone_use: "Uso inadequado de celular",
  peer_conflicts: "Conflitos com colegas",
  disrespect_or_coexistence_difficulty: "Dificuldade de convivência",
  low_participation: "Baixa participação",
  recurring_lateness: "Atrasos recorrentes",
  activities_not_completed: "Não realização de atividades",
  other: "Outro",
};
