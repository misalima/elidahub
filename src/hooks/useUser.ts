import { useAuth } from '../providers/AuthProvider';

export function useUser() {
  const { user, loading, logout } = useAuth();
  return { user, loading, logout, role: user?.role };
}
