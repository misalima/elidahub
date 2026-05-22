"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // List of public paths that do not require any Supabase network/auth operations
    const PUBLIC_PATHS = [
      '/hub/professor-mentor/gerar-folha-de-frequencia',
      '/hub/professor-mentor/recomposicao'
    ];

    const isPublic = PUBLIC_PATHS.some(path => pathname === path || pathname?.startsWith(`${path}/`));

    if (isPublic) {
      setLoading(false);
      return;
    }

    const getSession = async () => {
      setLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          document.cookie = `sb_access_token=${session.access_token}; path=/; max-age=${session.expires_in}; samesite=lax`;
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();
          
          setUser({ 
            id: session.user.id, 
            email: session.user.email || '', 
            role: data?.role || 'coordenador' 
          });
        } else {
          document.cookie = `sb_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          setUser(null);
        }
      } catch (err) {
        console.error("Erro ao carregar sessão do Supabase (offline ou pausado):", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          document.cookie = `sb_access_token=${session.access_token}; path=/; max-age=${session.expires_in}; samesite=lax`;
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          setUser({ 
            id: session.user.id, 
            email: session.user.email || '', 
            role: data?.role || 'coordenador' 
          });
        } else {
          document.cookie = `sb_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
          setUser(null);
        }
      } catch (err) {
        console.error("Erro ao escutar mudanças de autenticação Supabase:", err);
        setUser(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [pathname]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message || null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
