import { NextRequest, NextResponse } from 'next/server';
import { getExams, createExam } from '@/services/server/examService';
import { verifyApiAuth } from '@/lib/authServer';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const grade = searchParams.get('grade');
    const school_class = searchParams.get('school_class');
    const area = searchParams.get('area');
    const status = searchParams.get('status');

    const data = await getExams({ 
      search, 
      grade, 
      school_class, 
      area, 
      status,
      page: parseInt(searchParams.get('page') || '1'),
      pageSize: parseInt(searchParams.get('pageSize') || '12'),
    });
    return NextResponse.json(data);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Desconhecido";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = await verifyApiAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const body = await req.json();
    const data = await createExam(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Título é obrigatório.') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
