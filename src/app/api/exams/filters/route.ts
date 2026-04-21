import { NextResponse } from 'next/server';
import { getExamFilters } from '@/services/server/examService';

export async function GET() {
  try {
    const filters = await getExamFilters();
    return NextResponse.json(filters);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Desconhecido";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
