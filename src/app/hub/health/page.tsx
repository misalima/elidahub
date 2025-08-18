"use client";
import { API_BASE_URL } from "@/config";
import { useEffect, useState } from "react";

export default function Health() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function checkHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/healthcheck`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return data.status === "connected";
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
      return false;
    }
  }

  useEffect(() => {
    async function verify() {
      const result = await checkHealth();
      setIsConnected(result);
    }
    verify();
  }, []);

  if (isConnected === null) return <p className="w-full text-center h-36 flex items-center justify-center text-2xl">Verificando conexão...</p>;
  if (isConnected) return <p className="w-full text-center h-36 flex items-center justify-center text-green-400 font-bold text-2xl">Supabase conectado!</p>;
  return <p className="text-red-400">Falha na conexão com Supabase. {error}</p>;
}
