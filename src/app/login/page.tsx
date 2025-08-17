"use client";

import { useAuth } from "../providers/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const { error } = await login(email, password);
    if (error) {
      alert(`Erro: ${error}`);
    } else {
      window.location.href = "/"; 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 border rounded">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
