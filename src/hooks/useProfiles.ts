import { useCallback, useState } from "react";
import { profileService } from "../services/profileService";
import type { Tables } from "../types/database.types";

export function useProfiles() {
  const [profiles, setProfiles] = useState<Tables<"profiles">[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Call the server action via the service
      const data = await profileService.getProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { profiles, loading, error, fetchProfiles };
}

export function useProfile(id: string) {
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Call the server action via the service
      const data = await profileService.getProfileById(id);
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { profile, loading, error, fetchProfile };
}
