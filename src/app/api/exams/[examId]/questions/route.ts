import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { verifyApiAuth } from '@/lib/authServer';

// POST: add question to exam
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const { question_id, position } = await req.json();

  const isAuth = await verifyApiAuth(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  if (!question_id) {
    return NextResponse.json({ error: 'question_id é obrigatório.' }, { status: 400 });
  }

  // Get current max position if not provided
  let pos = position;
  if (pos === undefined || pos === null) {
    const { data: existing } = await supabaseAdmin
      .from('exam_questions')
      .select('position')
      .eq('exam_id', examId)
      .order('position', { ascending: false })
      .limit(1);
    pos = existing && existing.length > 0 ? existing[0].position + 1 : 0;
  }

  const { data, error } = await supabaseAdmin
    .from('exam_questions')
    .insert({ exam_id: examId, question_id, position: pos })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

// DELETE: remove question from exam
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const { question_id } = await req.json();

  const isAuth = await verifyApiAuth(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const { error } = await supabaseAdmin
    .from('exam_questions')
    .delete()
    .eq('exam_id', examId)
    .eq('question_id', question_id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// PATCH: reorder questions (update positions)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  // positions: Array<{ id: string; position: number }>
  const { positions } = await req.json();

  const isAuth = await verifyApiAuth(req);
  if (!isAuth) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  if (!Array.isArray(positions)) {
    return NextResponse.json({ error: 'positions deve ser um array.' }, { status: 400 });
  }

  const updates = positions.map(({ id, position }: { id: string; position: number }) =>
    supabaseAdmin
      .from('exam_questions')
      .update({ position })
      .eq('id', id)
      .eq('exam_id', examId)
  );

  await Promise.all(updates);

  return NextResponse.json({ ok: true });
}
