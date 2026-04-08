import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function generateBoletimDownloadUrl(alunoId: string, dataNascimento: string) {
  if (!alunoId || !dataNascimento) {
    throw new Error('Dados incompletos');
  }

  // 1. Busca o aluno e valida a data
  const { data: aluno, error: dbError } = await supabaseAdmin
    .from('alunos_boletins')
    .select('data_nascimento, storage_path')
    .eq('id', alunoId)
    .single();

  if (dbError || !aluno) {
    throw new Error('Aluno não encontrado');
  }

  // Validação da data (comparando strings YYYY-MM-DD)
  if (aluno.data_nascimento !== dataNascimento) {
    throw new Error('Data de nascimento incorreta');
  }

  // 2. Gera Signed URL (expira em 60 segundos)
  const { data: signedData, error: storageError } = await supabaseAdmin.storage
    .from('boletins')
    .createSignedUrl(aluno.storage_path, 60);

  if (storageError || !signedData) {
    throw new Error('Erro ao gerar link de download');
  }

  return signedData.signedUrl;
}
