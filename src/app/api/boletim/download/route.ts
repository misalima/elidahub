import { NextResponse } from "next/server";
import { generateBoletimDownloadUrl } from "@/services/server/boletimService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { alunoId, dataNascimento } = body;

    const url = await generateBoletimDownloadUrl(alunoId, dataNascimento);
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Erro na API de download:", err);
    if (err.message === 'Dados incompletos') {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }
    if (err.message === 'Aluno não encontrado') {
      return NextResponse.json({ error: "Aluno não encontrado" }, { status: 404 });
    }
    if (err.message === 'Data de nascimento incorreta') {
      return NextResponse.json({ error: "Data de nascimento incorreta" }, { status: 401 });
    }
    return NextResponse.json({ error: err.message || "Erro interno no servidor" }, { status: 500 });
  }
}
