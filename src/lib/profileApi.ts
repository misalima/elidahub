import { supabase } from "./supabaseClient";
import type { Tables, TablesInsert, TablesUpdate } from "../types/database.types";

// Fetch all profiles
export async function getProfiles() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*");
  if (error) throw error;
  return data as Tables<"profiles">[];
}

// Fetch a single profile by id
export async function getProfileById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Tables<"profiles">;
}

// Create a new profile
export async function createProfile(profile: TablesInsert<"profiles">) {
  const { data, error } = await supabase
    .from("profiles")
    .insert([profile])
    .select()
    .single();
  if (error) throw error;
  return data as Tables<"profiles">;
}

// Update a profile
export async function updateProfile(id: string, updates: TablesUpdate<"profiles">) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Tables<"profiles">;
}

// Delete a profile
export async function deleteProfile(id: string) {
  const { error } = await supabase
    .from("profiles")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}
