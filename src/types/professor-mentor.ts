export interface MentorTeacher {
  id: string;
  teacherName: string;
  studentName: string;
  mentoringClass: string;
}

export interface FormState {
  schoolName: string;
  schoolAddress?: string;
  schoolLogo?: string;
  months: string[];
  year: string;
  coordinatorName: string;
  teachers: MentorTeacher[];
}

export const MONTH_OPTIONS = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
] as const;

export function createMentorTeacher(): MentorTeacher {
  return {
    id: crypto.randomUUID(),
    teacherName: '',
    studentName: '',
    mentoringClass: '',
  };
}

export function createDefaultFormState(): FormState {
  return {
    schoolName: '',
    schoolAddress: '',
    schoolLogo: '',
    months: [],
    year: '',
    coordinatorName: '',
    teachers: [createMentorTeacher()],
  };
}

export function getMonthLabel(month: string) {
  return MONTH_OPTIONS.find((option) => option.value === month)?.label ?? month;
}

function normalizeTeacher(teacher?: Partial<MentorTeacher> | null): MentorTeacher {
  return {
    id: teacher?.id || crypto.randomUUID(),
    teacherName: teacher?.teacherName ?? '',
    studentName: teacher?.studentName ?? '',
    mentoringClass: teacher?.mentoringClass ?? '',
  };
}

export function normalizeFormState(raw?: Partial<FormState> | null): FormState {
  const teachers = Array.isArray(raw?.teachers) && raw?.teachers.length > 0
    ? raw!.teachers.map((teacher) => normalizeTeacher(teacher))
    : [createMentorTeacher()];

  return {
    schoolName: raw?.schoolName ?? '',
    schoolAddress: raw?.schoolAddress ?? '',
    schoolLogo: raw?.schoolLogo ?? '',
    months: Array.isArray(raw?.months) ? raw.months : [],
    year: raw?.year ?? '',
    coordinatorName: raw?.coordinatorName ?? '',
    teachers,
  };
}