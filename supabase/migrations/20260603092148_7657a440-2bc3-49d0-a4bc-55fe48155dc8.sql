
-- Lock down trigger functions
REVOKE ALL ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_first_user() FROM PUBLIC, anon, authenticated;
-- has_role stays callable by authenticated (used inside RLS) but not anon
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

-- Tighten inquiry insert: only require non-empty name/mobile so bots can't flood empties
DROP POLICY IF EXISTS "anyone create inquiry" ON public.inquiries;
CREATE POLICY "anyone create inquiry" ON public.inquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (length(full_name) > 1 AND length(mobile) >= 7 AND status = 'new');
