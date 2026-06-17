
-- Exams
CREATE TABLE public.exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  exam_type text NOT NULL DEFAULT 'unit_test',
  exam_date date NOT NULL DEFAULT CURRENT_DATE,
  course_id uuid,
  batch_id uuid,
  max_marks numeric NOT NULL DEFAULT 100,
  remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exams TO authenticated;
GRANT ALL ON public.exams TO service_role;
ALTER TABLE public.exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff manage exams" ON public.exams FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff') OR has_role(auth.uid(),'teacher'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff') OR has_role(auth.uid(),'teacher'));
CREATE POLICY "auth read exams" ON public.exams FOR SELECT TO authenticated USING (true);
CREATE TRIGGER exams_updated_at BEFORE UPDATE ON public.exams FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- Exam marks
CREATE TABLE public.exam_marks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES public.exams(id) ON DELETE CASCADE,
  student_id uuid NOT NULL,
  subject text NOT NULL DEFAULT 'Overall',
  max_marks numeric NOT NULL DEFAULT 100,
  marks_obtained numeric NOT NULL DEFAULT 0,
  remarks text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.exam_marks TO authenticated;
GRANT ALL ON public.exam_marks TO service_role;
ALTER TABLE public.exam_marks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff manage marks" ON public.exam_marks FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff') OR has_role(auth.uid(),'teacher'))
  WITH CHECK (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'staff') OR has_role(auth.uid(),'teacher'));
CREATE POLICY "student read own marks" ON public.exam_marks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.students s WHERE s.id = exam_marks.student_id AND s.user_id = auth.uid()));
CREATE POLICY "parent read child marks" ON public.exam_marks FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.parents p WHERE p.student_id = exam_marks.student_id AND p.user_id = auth.uid()));
CREATE TRIGGER exam_marks_updated_at BEFORE UPDATE ON public.exam_marks FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX exam_marks_exam_idx ON public.exam_marks(exam_id);
CREATE INDEX exam_marks_student_idx ON public.exam_marks(student_id);

-- Audit logs
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  entity text,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admin read logs" ON public.audit_logs FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'));
CREATE POLICY "auth insert logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Settings
CREATE TABLE public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institute_name text NOT NULL DEFAULT 'Smart Anonymous Computer Class',
  logo_url text,
  primary_color text DEFAULT '#2563eb',
  secondary_color text DEFAULT '#06b6d4',
  theme_mode text DEFAULT 'light',
  contact_phone text,
  contact_email text,
  address text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO authenticated, anon;
GRANT INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "admin update settings" ON public.settings FOR ALL TO authenticated
  USING (has_role(auth.uid(),'admin')) WITH CHECK (has_role(auth.uid(),'admin'));
INSERT INTO public.settings (institute_name) VALUES ('Smart Anonymous Computer Class');

-- New user trigger: first user becomes admin, subsequent users become student
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles(user_id, role) VALUES (NEW.id, 'student')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $$;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Seed default Super Admin
DO $$
DECLARE new_uid uuid := gen_random_uuid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@smartanonymous.com') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data, is_super_admin,
      confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', new_uid, 'authenticated', 'authenticated',
      'admin@smartanonymous.com', crypt('Admin@123', gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, false,
      '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), new_uid,
      jsonb_build_object('sub', new_uid::text, 'email', 'admin@smartanonymous.com'),
      'email', new_uid::text, now(), now(), now());
    INSERT INTO public.user_roles(user_id, role) VALUES (new_uid, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
END $$;
