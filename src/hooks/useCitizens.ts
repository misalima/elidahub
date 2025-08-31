import { useCallback, useEffect, useState } from 'react';
import {
  getCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  Citizen,
  CitizenInsert,
  CitizenUpdate,
} from '@/services/citizenService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useCitizens(page: number, search: string) {
  return useQuery({
    queryKey: ['citizens', page, search],
    queryFn: () => getCitizens(page, search),
    placeholderData: keepPreviousData
  });
}

export function useCreateCitizen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async (payload: CitizenInsert) => {
    setLoading(true);
    setError(null);
    try {
      const citizen = await createCitizen(payload);
      return citizen;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { create, loading, error };
}

export function useUpdateCitizen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback(async (id: string, payload: CitizenUpdate) => {
    setLoading(true);
    setError(null);
    try {
      const citizen = await updateCitizen(id, payload);
      return citizen;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { update, loading, error };
}

export function useDeleteCitizen() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteCitizen(id);
      return true;
    } catch (e: any) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { remove, loading, error };
}

export function useCitizen(id: string | null) {
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getCitizenById(id)
      .then(setCitizen)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { citizen, loading, error };
}
