import { useAuth } from '../providers/AuthProvider';

export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading, role: user?.role };
}
