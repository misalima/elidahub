export async function bulkDeleteCitizens(ids: string[]) {
  if (!ids.length) return true;
  const { error } = await supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .update({ is_active: false })
    .in('id', ids);
  if (error) throw error;
  return true;
}
import { supabase } from '../lib/supabaseClient';
import { Tables, TablesInsert, TablesUpdate } from '../types/database.types';

export type Citizen = Tables<{ schema: 'vqdt' }, 'citizens'>;
export type CitizenInsert = TablesInsert<{ schema: 'vqdt' }, 'citizens'>;
export type CitizenUpdate = TablesUpdate<{ schema: 'vqdt' }, 'citizens'>;

const CITIZENS_TABLE = 'citizens';
const CITIZENS_SCHEMA = 'vqdt';
const PAGE_SIZE = 30;



export async function getCitizens(page = 1, search = "", orderBy: string = "created_at", orderDir: 'asc' | 'desc' = 'desc') {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  let query = supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order(orderBy, { ascending: orderDir === 'asc' })
    .range(from, to);

  if (search.trim()) {
    query = query.or(`full_name.ilike.%${search}%,phone.ilike.%${search}%`)
  }

  const { data, error, count } = await query;
  if (error) throw error;
  return { data, count };
}


export async function getCitizenById(id: string) {
  const { data, error } = await supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}


export async function createCitizen(payload: CitizenInsert) {
  const { data, error } = await supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .insert([payload])
    .select()
    .single();
  if (error) throw error;
  return data;
}


export async function updateCitizen(id: string, payload: CitizenUpdate) {
  const { data, error } = await supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}


export async function deleteCitizen(id: string) {
  const { error } = await supabase
    .schema(CITIZENS_SCHEMA)
    .from(CITIZENS_TABLE)
    .update({ is_active: false })
    .eq('id', id);
  if (error) throw error;
  return true;
}
