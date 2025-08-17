"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Hello, world! Este é o FelixHub.</h1>
        {user ? (
          <>
            <p>Bem-vindo, {user.email}!</p>
            <button onClick={logout} className="m-auto cursor-pointer">Logout</button>
            <p>Seu papel é: {user.role}</p>
          </>
        ) : (
          <Button onClick={() => router.push("/login")} size={"lg"} className="m-auto cursor-pointer">Login</Button>
        )}
      </main>
    </div>
  );
}
