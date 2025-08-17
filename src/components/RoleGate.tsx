import React from 'react';
import { useUser } from '@/hooks/useUser';

interface RoleGateProps {
  allowed: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ allowed, children, fallback = null }: RoleGateProps) {
  const { user, loading } = useUser();
  if (loading) return null;
  if (!user || !allowed.includes(user.role)) return <>{fallback}</>;
  return <>{children}</>;
}
