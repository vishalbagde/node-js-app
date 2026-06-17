import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/certificates")({ component: Page });
type Cert = { id: string; student_id: string; course_id?: string; certificate_no: string; issue_date: string; grade?: string; marks_obtained?: number; total_marks?: number; remarks?: string };

function Page() {
  const { data: students = [] } = useQuery({ queryKey: ["students-min"], queryFn: async () => (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? [] });
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: async () => (await supabase.from("courses").select("id, name")).data ?? [] });
  return (
    <AdminLayout title="Certificates">
      <CrudTable<Cert>
        table="certificates"
        title="certificate"
        orderBy={{ column: "issue_date" }}
        searchFields={["certificate_no", "grade"]}
        emptyForm={{ certificate_no: "CERT" + Date.now().toString().slice(-6), issue_date: new Date().toISOString().slice(0, 10) }}
        beforeSave={(s) => ({ ...s, course_id: s.course_id || null } as any)}
        columns={[
          { key: "certificate_no", label: "Cert #" },
          { key: "student_id", label: "Student", render: (r) => students.find((s) => s.id === r.student_id)?.full_name ?? "—" },
          { key: "course_id", label: "Course", render: (r) => courses.find((c) => c.id === r.course_id)?.name ?? "—" },
          { key: "grade", label: "Grade" },
          { key: "issue_date", label: "Issued" },
        ]}
        renderForm={(s, set) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Certificate #"><Input value={s.certificate_no ?? ""} onChange={(e) => set({ certificate_no: e.target.value })} /></Field>
            <Field label="Issue date"><Input type="date" value={s.issue_date ?? ""} onChange={(e) => set({ issue_date: e.target.value })} /></Field>
            <Field label="Student">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.student_id ?? ""} onChange={(e) => set({ student_id: e.target.value })}>
                <option value="">Select…</option>{students.map((st) => <option key={st.id} value={st.id}>{st.enrollment_no} · {st.full_name}</option>)}
              </select>
            </Field>
            <Field label="Course">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.course_id ?? ""} onChange={(e) => set({ course_id: e.target.value })}>
                <option value="">—</option>{courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Grade"><Input value={s.grade ?? ""} onChange={(e) => set({ grade: e.target.value })} /></Field>
            <Field label="Marks"><Input type="number" value={s.marks_obtained ?? 0} onChange={(e) => set({ marks_obtained: Number(e.target.value) })} /></Field>
            <Field label="Total"><Input type="number" value={s.total_marks ?? 100} onChange={(e) => set({ total_marks: Number(e.target.value) })} /></Field>
            <Field label="Remarks"><Input value={s.remarks ?? ""} onChange={(e) => set({ remarks: e.target.value })} /></Field>
          </div>
        )}
      />
    </AdminLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
