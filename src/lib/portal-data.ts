import { supabase } from "@/integrations/supabase/client";

export async function getMyStudent() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("students").select("*").eq("user_id", user.id).maybeSingle();
  return data;
}

export async function getMyChildren() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data: parents = [] } = await supabase.from("parents").select("*, student:students(*)").eq("user_id", user.id);
  return (parents ?? []) as any[];
}
