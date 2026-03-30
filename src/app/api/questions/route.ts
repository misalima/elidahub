import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const area = searchParams.get('area');
  const subject = searchParams.get('subject');
  const search = searchParams.get('search');
  const difficulty = searchParams.get('difficulty');
  const level = searchParams.get('level');

  let query = supabaseAdmin
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (area) query = query.eq('knowledge_area', area);
  if (subject) query = query.ilike('subject', `%${subject}%`);
  if (search) query = query.ilike('statement', `%${search}%`);
  if (difficulty) query = query.eq('difficulty', difficulty);
  if (level) query = query.eq('level', level);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    } = body;

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
      return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 });
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

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
