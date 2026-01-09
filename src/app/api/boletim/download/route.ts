import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    
    const body = await req.json();
    const { alunoId, dataNascimento } = body;

    if (!alunoId || !dataNascimento) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // 1. Busca o aluno e valida a data
    const { data: aluno, error: dbError } = await supabaseAdmin
      .from("alunos_boletins")
      .select("data_nascimento, storage_path")
      .eq("id", alunoId)
      .single();

    if (dbError || !aluno) {
      return NextResponse.json(
        { error: "Aluno não encontrado" },
        { status: 404 }
      );
    }

    // Validação da data (comparando strings YYYY-MM-DD)
    if (aluno.data_nascimento !== dataNascimento) {
      return NextResponse.json(
        { error: "Data de nascimento incorreta" },
        { status: 401 }
      );
    }

    // 2. Gera Signed URL (expira em 60 segundos)
    const { data: signedData, error: storageError } =
      await supabaseAdmin.storage
        .from("boletins")
        .createSignedUrl(aluno.storage_path, 60);

    if (storageError || !signedData) {
      return NextResponse.json(
        { error: "Erro ao gerar link de download" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: signedData.signedUrl });
  } catch (err) {
    console.error("Erro na API de download:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
