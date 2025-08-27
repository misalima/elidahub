"use server";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import type { Tables, TablesInsert, TablesUpdate } from "../../types/database.types";

export async function getProfiles(): Promise<Tables<"profiles">[]> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*");
  if (error) throw error;
  return data || [];
}

export async function getProfileById(id: string): Promise<Tables<"profiles"> | null> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data || null;
}

/**
 * Creates a Supabase Auth user and a profile linked to that user.
 * @param profile Profile data (email, full_name, etc.)
 * @param password Password for the new user
 */
export async function createProfile(
  profile: TablesInsert<"profiles"> & { password?: string }
): Promise<Tables<"profiles">> {
  if (!profile.email || !profile.password) {
    throw new Error("Email and password are required");
  }

  // Create user in Supabase Auth
  const authRes = await supabaseAdmin.auth.admin.createUser({
    email: profile.email,
    password: profile.password,
    email_confirm: true,
  });
  if (authRes.error || !authRes.data?.user?.id) {
    throw new Error(authRes.error?.message || "Failed to create user in Auth");
  }
  const userId = authRes.data.user.id;

  // Create profile with the same id as the Auth user
  const { ...profileData } = profile;
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .insert([{ ...profileData, id: userId }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProfile(id: string, updates: TablesUpdate<"profiles">): Promise<Tables<"profiles">> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProfile(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("profiles")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
