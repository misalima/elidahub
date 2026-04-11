import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Exam, ExamWithQuestions } from '@/types/simulados';
import type { TablesInsert, TablesUpdate } from '@/types/database.types';

export function useExams() {
  return useQuery({
    queryKey: ['exams'],
    queryFn: async () => {
      const res = await fetch('/api/exams');
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erro ao carregar simulados');
      }
      return res.json() as Promise<Exam[]>;
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
    mutationFn: async ({ id, status }: { id: string; status: 'draft' | 'ready' | 'editing' }) => {
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

