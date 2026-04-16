import { NextRequest, NextResponse } from 'next/server';
import { duplicateExam } from '@/services/server/examService';
import { verifyApiAuth } from '@/lib/authServer';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const isAuth = await verifyApiAuth(req);
    if (!isAuth) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    const { examId } = await params;
    const newExam = await duplicateExam(examId);

    return NextResponse.json(newExam, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
