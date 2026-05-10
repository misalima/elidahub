import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Exam, ExamWithQuestions } from '@/types/simulados';
import type { TablesInsert, TablesUpdate } from '@/types/database.types';

export function useExams(filters?: { 
  search?: string | null; 
  grade?: string | null; 
  school_class?: string | null; 
  area?: string | null; 
  status?: string | null;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ['exams', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.search) params.append('search', filters.search);
      if (filters?.grade) params.append('grade', filters.grade);
      if (filters?.school_class) params.append('school_class', filters.school_class);
      if (filters?.area) params.append('area', filters.area);
      if (filters?.status) params.append('status', filters.status);
      if (filters?.page !== undefined && filters?.page !== null) params.append('page', filters.page.toString());
      if (filters?.pageSize !== undefined && filters?.pageSize !== null) params.append('pageSize', filters.pageSize.toString());

      const queryString = params.toString();
      const res = await fetch(`/api/exams${queryString ? `?${queryString}` : ''}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao carregar simulados');
      }
      return res.json() as Promise<{ data: Exam[]; total: number }>;
    }
  });
}

export function useExamFilters() {
  return useQuery({
    queryKey: ['exams', 'filters'],
    queryFn: async () => {
      const res = await fetch('/api/exams/filters');
      if (!res.ok) {
        throw new Error('Erro ao carregar filtros');
      }
      return res.json() as Promise<{ school_classes: string[] }>;
    }
  });
}

export function useExam(id: string | null) {
  return useQuery({
    queryKey: ['exams', id],
    queryFn: async () => {
      const res = await fetch(`/api/exams/${id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao carregar simulado');
      }
      return res.json() as Promise<ExamWithQuestions>;
    },
    enabled: !!id,
  });
}

export function useCreateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TablesInsert<'exams'>) => {
      const res = await fetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao criar simulado');
      }
      return res.json() as Promise<Exam>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
  });
}

export function useUpdateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: TablesUpdate<'exams'> & { title: string } }) => {
      const res = await fetch(`/api/exams/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao atualizar simulado');
      }
      return res.json() as Promise<Exam>;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      queryClient.invalidateQueries({ queryKey: ['exams', id] });
    },
  });
}

export function useDeleteExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/exams/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao excluir simulado');
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
  });
}

export function useUpdateExamStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'draft' | 'ready' | 'editing' | 'applied' }) => {
      const res = await fetch(`/api/exams/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao atualizar status');
      }
      return res.json() as Promise<import('@/types/simulados').Exam>;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
      queryClient.invalidateQueries({ queryKey: ['exams', id] });
    },
  });
}

export function useDuplicateExam() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/exams/${id}/duplicate`, {
        method: 'POST',
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao duplicar simulado');
      }
      return res.json() as Promise<Exam>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] });
    },
  });
}

