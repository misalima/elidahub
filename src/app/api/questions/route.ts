import { NextRequest, NextResponse } from 'next/server';
import { getQuestions, createQuestion } from '@/services/server/questionService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  try {
    const data = await getQuestions({
      area: searchParams.get('area'),
      subject: searchParams.get('subject'),
      search: searchParams.get('search'),
      difficulty: searchParams.get('difficulty'),
      level: searchParams.get('level'),
    });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await createQuestion(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Preencha todos os campos obrigatórios.') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
