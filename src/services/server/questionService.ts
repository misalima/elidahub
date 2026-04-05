import { supabaseAdmin } from '@/lib/supabaseAdmin';
import type { Question } from '@/types/simulados';
import type { TablesInsert, TablesUpdate } from '@/types/database.types';

export async function getQuestions(filters: {
  area?: string | null;
  subject?: string | null;
  search?: string | null;
  difficulty?: string | null;
  level?: string | null;
}) {
  let query = supabaseAdmin
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.area) query = query.eq('knowledge_area', filters.area);
  if (filters.subject) query = query.ilike('subject', `%${filters.subject}%`);
  if (filters.search) query = query.or(`statement.ilike.%${filters.search}%,topic.ilike.%${filters.search}%`);
  if (filters.difficulty) query = query.eq('difficulty', filters.difficulty);
  if (filters.level) query = query.eq('level', filters.level);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data as Question[];
}

export async function getQuestionById(id: string) {
  const { data, error } = await supabaseAdmin
    .from('questions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data as Question;
}

export async function createQuestion(payload: TablesInsert<'questions'>) {
  const {
    knowledge_area,
    subject,
    statement,
    image_url,
    option_a,
    option_b,
    option_c,
    option_d,
    option_e,
    answer,
    teacher_name,
    difficulty,
    level,
  } = payload;

  if (
    !knowledge_area ||
    !subject ||
    !statement ||
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !option_e ||
    !answer
  ) {
    throw new Error('Preencha todos os campos obrigatórios.');
  }

  const { data, error } = await supabaseAdmin
    .from('questions')
    .insert({
      knowledge_area,
      subject,
      statement,
      image_url: image_url || null,
      option_a,
      option_b,
      option_c,
      option_d,
      option_e,
      answer,
      teacher_name: teacher_name || null,
      difficulty: difficulty || null,
      level: level || null,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Question;
}

export async function updateQuestion(id: string, payload: TablesUpdate<'questions'>) {
  const { data, error } = await supabaseAdmin
    .from('questions')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Question;
}

export async function deleteQuestion(id: string) {
  const { error } = await supabaseAdmin.from('questions').delete().eq('id', id);
  if (error) throw new Error(error.message);
  return true;
}
