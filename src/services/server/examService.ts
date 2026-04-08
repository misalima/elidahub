import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Exam } from '@/types/simulados';
import type { TablesInsert, TablesUpdate } from '@/types/database.types';

export async function getExams() {
  const { data, error } = await supabaseAdmin
    .from('exams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Exam[];
}

export async function getExamById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('exams')
    .select('*, exam_questions(*, question:questions(*))')
    .eq('id', id)
    .order('position', { referencedTable: 'exam_questions', ascending: true })
    .single();

  if (error) throw new Error(error.message);
  return data as Exam;
}

export async function createExam(payload: TablesInsert<'exams'>) {
  const {
    title,
    description,
    school_name,
    school_year,
    grade,
    date_label,
    duration,
    instructions,
  } = payload;

  if (!title) {
    throw new Error('Título é obrigatório.');
  }

  const { data, error } = await supabaseAdmin
    .from('exams')
    .insert({
      title,
      description: description || null,
      school_name: school_name || 'ESCOLA ESTADUAL PROFESSOR JOSÉ FÉLIX DE CARVALHO ALVES',
      school_year: school_year || null,
      grade: grade || null,
      date_label: date_label || null,
      duration: duration || null,
      instructions: instructions || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Exam;
}

export async function updateExam(id: string, payload: TablesUpdate<'exams'> & { title: string }) {
  const { data, error } = await supabaseAdmin
    .from('exams')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Exam;
}

export async function deleteExam(id: string) {
  const { error } = await supabaseAdmin.from('exams').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}
