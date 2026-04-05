import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Question } from '@/types/simulados';
import type { TablesInsert } from '@/types/database.types';

interface FetchQuestionsParams {
  area?: string | null;
  subject?: string | null;
  search?: string | null;
  difficulty?: string | null;
  level?: string | null;
}

export function useQuestions(filters: FetchQuestionsParams) {
  return useQuery({
    queryKey: ['questions', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.area) params.set('area', filters.area);
      if (filters.subject) params.set('subject', filters.subject);
      if (filters.search) params.set('search', filters.search);
      if (filters.difficulty) params.set('difficulty', filters.difficulty);
      if (filters.level) params.set('level', filters.level);

      const res = await fetch(`/api/questions?${params.toString()}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao carregar questões');
      }
      return res.json() as Promise<Question[]>;
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TablesInsert<'questions'>) => {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao criar questão');
      }
      return res.json() as Promise<Question>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/questions/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Erro ao excluir questão');
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });
}
