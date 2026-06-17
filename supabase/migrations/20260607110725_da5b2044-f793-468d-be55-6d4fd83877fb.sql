-- Restrict settings table reads to authenticated users (contact info no longer anon-readable)
DROP POLICY IF EXISTS "anyone read settings" ON public.settings;
CREATE POLICY "authenticated read settings" ON public.settings FOR SELECT TO authenticated USING (true);
REVOKE SELECT ON public.settings FROM anon;

-- Lock down SECURITY DEFINER trigger/helper functions: revoke EXECUTE from public roles.
-- Triggers run with definer privileges regardless of grants; has_role is left callable
-- because RLS policies invoke it for every authenticated request.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_first_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;