import { s as supabase } from "./client-SJLpyyNw.mjs";
async function getMyStudent() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("students").select("*").eq("user_id", user.id).maybeSingle();
  return data;
}
async function getMyChildren() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data: parents = [] } = await supabase.from("parents").select("*, student:students(*)").eq("user_id", user.id);
  return parents ?? [];
}
export {
  getMyStudent as a,
  getMyChildren as g
};
