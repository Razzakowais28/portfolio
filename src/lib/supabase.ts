import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://mbsutriudvxfrilprapb.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ic3V0cml1ZHZ4ZnJpbHByYXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NTg3MzMsImV4cCI6MjEwNTAzNDczM30.zenzw89YQyP34QVFVdY_WH86a8IzT8k-EwOv7jwWsUI";

let client: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  client ??= createClient(supabaseUrl, supabaseAnonKey);
  return client;
}
