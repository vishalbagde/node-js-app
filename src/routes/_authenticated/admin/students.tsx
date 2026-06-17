import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/students")({ component: Page });

type Student = {
  id: string; enrollment_no: string; full_name: string; mobile: string; email?: string;
  dob?: string; gender?: string; address?: string;
  course_id?: string; batch_id?: string; admission_date: string; status: string;
};

function Page() {
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: async () => (await supabase.from("courses").select("id, name")).data ?? [] });
  const { data: batches = [] } = useQuery({ queryKey: ["batches"], queryFn: async () => (await supabase.from("batches").select("id, name")).data ?? [] });

  return (
    <AdminLayout title="Students">
      <CrudTable<Student>
        table="students"
        title="student"
        orderBy={{ column: "created_at" }}
        searchFields={["full_name", "mobile", "enrollment_no", "email"]}
        emptyForm={{
          enrollment_no: "SACC" + Date.now().toString().slice(-6),
          full_name: "", mobile: "", admission_date: new Date().toISOString().slice(0, 10), status: "active",
        }}
        beforeSave={(s) => ({ ...s, course_id: s.course_id || null, batch_id: s.batch_id || null } as any)}
        columns={[
          { key: "enrollment_no", label: "Enroll #" },
          { key: "full_name", label: "Name" },
          { key: "mobile", label: "Mobile" },
          { key: "course_id", label: "Course", render: (r) => courses.find((c) => c.id === r.course_id)?.name ?? "—" },
          { key: "batch_id", label: "Batch", render: (r) => batches.find((b) => b.id === r.batch_id)?.name ?? "—" },
          { key: "status", label: "Status" },
        ]}
        renderForm={(s, set) => (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Enrollment #"><Input value={s.enrollment_no ?? ""} onChange={(e) => set({ enrollment_no: e.target.value })} /></Field>
              <Field label="Full name"><Input value={s.full_name ?? ""} onChange={(e) => set({ full_name: e.target.value })} /></Field>
              <Field label="Mobile"><Input value={s.mobile ?? ""} onChange={(e) => set({ mobile: e.target.value })} /></Field>
              <Field label="Email"><Input type="email" value={s.email ?? ""} onChange={(e) => set({ email: e.target.value })} /></Field>
              <Field label="DOB"><Input type="date" value={s.dob ?? ""} onChange={(e) => set({ dob: e.target.value })} /></Field>
              <Field label="Gender">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.gender ?? ""} onChange={(e) => set({ gender: e.target.value })}>
                  <option value="">—</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </Field>
              <Field label="Course">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.course_id ?? ""} onChange={(e) => set({ course_id: e.target.value })}>
                  <option value="">—</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Batch">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.batch_id ?? ""} onChange={(e) => set({ batch_id: e.target.value })}>
                  <option value="">—</option>{batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </Field>
              <Field label="Admission date"><Input type="date" value={s.admission_date ?? ""} onChange={(e) => set({ admission_date: e.target.value })} /></Field>
              <Field label="Status">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.status ?? "active"} onChange={(e) => set({ status: e.target.value })}>
                  <option>active</option><option>inactive</option><option>graduated</option>
                </select>
              </Field>
            </div>
            <Field label="Address"><Input value={s.address ?? ""} onChange={(e) => set({ address: e.target.value })} /></Field>
          </>
        )}
      />
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
