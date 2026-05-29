"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

interface Aluno {
  id: string;
  nome_completo: string;
}

export default function PaginaBoletim() {
  const [turmas, setTurmas] = useState<string[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const [selectedTurma, setSelectedTurma] = useState("");
  const [selectedAlunoId, setSelectedAlunoId] = useState("");
  const [dataNascExibicao, setDataNascExibicao] = useState(""); // Para o input com máscara (DD/MM/AAAA)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTurmas() {
      const { data } = await supabase.from("alunos_boletins").select("turma");
      const uniqueTurmas = Array.from(new Set(data?.map((d) => d.turma)));
      setTurmas(uniqueTurmas.sort());
    }
    getTurmas();
  }, []);

  useEffect(() => {
    if (!selectedTurma) {
      setAlunos([]);
      return;
    }
    async function getAlunos() {
      const { data } = await supabase
        .from("alunos_boletins")
        .select("id, nome_completo")
        .eq("turma", selectedTurma)
        .order("nome_completo");
      setAlunos(data || []);
    }
    getAlunos();
    setSelectedAlunoId("");
    setError("");
  }, [selectedTurma]);

  // Função para aplicar máscara de data (DD/MM/AAAA)
  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (value.length > 8) value = value.slice(0, 8); // Limita a 8 dígitos

    // Aplica a máscara
    if (value.length >= 5) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4)}`;
    } else if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setDataNascExibicao(value);
  };

  const handleDownload = async () => {
    setLoading(true);
    setError("");

    // Converte DD/MM/AAAA para YYYY-MM-DD para a API
    const partes = dataNascExibicao.split("/");
    if (partes.length !== 3 || dataNascExibicao.length !== 10) {
      setError("Por favor, digite a data completa (DD/MM/AAAA)");
      setLoading(false);
      return;
    }
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;

    try {
      const res = await fetch("/api/boletim/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alunoId: selectedAlunoId,
          dataNascimento: dataFormatada,
        }),
      });

      const result = await res.json();

      if (res.ok && result.url) {
        window.location.href = result.url;
      } else {
        setError(
          result.error ||
            "Dados incorretos. Verifique se a data de nascimento está certa."
        );
      }
    } catch {
      setError("Ocorreu um erro ao processar sua solicitação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* Header com Logo */}
        <div
          className="p-8 text-white text-center"
          style={{ backgroundColor: "#3e4095" }}
        >
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo_escola.png"
              alt="Logo da Escola"
              width={80}
              height={80}
              className="rounded-full bg-white p-2"
            />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            Portal do Aluno
          </h1>
          <p className="text-blue-200 text-sm mt-2 font-medium">
            E. E. Professora Maria Élida Dias Carvalho Pereira
          </p>
        </div>

        {/* Form */}
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900">
              Acesso ao Boletim 2025
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Siga os passos abaixo para baixar seu documento
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 text-red-800 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-5">
            {/* Passo 1: Turma */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                1. Selecione sua Turma
              </label>
              <select
                className="w-full p-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl outline-none transition-all appearance-none cursor-pointer font-medium"
                onChange={(e) => setSelectedTurma(e.target.value)}
                value={selectedTurma}
                style={{ color: "black" }}
              >
                <option value="" className="text-gray-500">
                  Clique para escolher a turma...
                </option>
                {turmas.map((t) => (
                  <option key={t} value={t} className="text-black">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Passo 2: Aluno */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                2. Selecione seu Nome
              </label>
              <select
                className="w-full p-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl outline-none transition-all disabled:opacity-40 disabled:bg-gray-100 cursor-pointer font-medium"
                disabled={!selectedTurma}
                onChange={(e) => setSelectedAlunoId(e.target.value)}
                value={selectedAlunoId}
                style={{ color: "black" }}
              >
                <option value="" className="text-gray-500">
                  Agora, escolha seu nome na lista...
                </option>
                {alunos.map((a) => (
                  <option key={a.id} value={a.id} className="text-black">
                    {a.nome_completo}
                  </option>
                ))}
              </select>
            </div>

            {/* Passo 3: Data de Nascimento */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                3. Informe sua Data de Nascimento
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Ex: 15/04/2008"
                className="w-full p-4 bg-white border-2 border-gray-200 text-gray-900 rounded-xl outline-none transition-all font-medium"
                value={dataNascExibicao}
                onChange={handleDataChange}
              />
              <p className="text-[10px] text-gray-400 mt-1 ml-1 italic">
                * Digite apenas os números da sua data de nascimento.
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={
                loading || !selectedAlunoId || dataNascExibicao.length < 10
              }
              className="w-full cursor-pointer text-white font-black py-5 rounded-xl shadow-lg transform transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none mt-4 flex items-center justify-center text-lg tracking-wider hover:shadow-2xl hover:-translate-y-1"
              style={{
                backgroundColor:
                  loading || !selectedAlunoId || dataNascExibicao.length < 10
                    ? "#d1d5db"
                    : "#3e4095",
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (
                  !loading &&
                  selectedAlunoId &&
                  dataNascExibicao.length === 10
                ) {
                  e.currentTarget.style.backgroundColor = "#2f3270"; // Azul mais escuro no hover
                }
              }}
              onMouseLeave={(e) => {
                if (
                  !loading &&
                  selectedAlunoId &&
                  dataNascExibicao.length === 10
                ) {
                  e.currentTarget.style.backgroundColor = "#3e4095"; // Volta ao azul original
                }
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  VERIFICANDO...
                </>
              ) : (
                "BAIXAR MEU BOLETIM"
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
            Coordenação Pedagógica
          </p>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Desenvolvido por{" "}
            <span className="font-bold" style={{ color: "#3e4095" }}>
              Misael Lima
            </span>
          </p>
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-[10px] font-medium uppercase tracking-widest">
        © 2025 - Escola Professora Maria Élida Dias Carvalho Pereira - Todos os direitos reservados
      </p>
    </div>
  );
}
