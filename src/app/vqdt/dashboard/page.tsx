"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Olá, {user.email}. Papel: {user.role}</h1>
      <button onClick={logout} className="ml-4 px-4 py-2 bg-red-500 text-white rounded">
        Sair
      </button>
    </div>
  );
}
