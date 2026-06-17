import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/parents")({ component: Page });
type Parent = { id: string; student_id?: string; full_name: string; relation?: string; mobile: string; email?: string; occupation?: string };

function Page() {
  const { data: students = [] } = useQuery({
    queryKey: ["students-min"],
    queryFn: async () => (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? [],
  });
  return (
    <AdminLayout title="Parents">
      <CrudTable<Parent>
        table="parents"
        title="parent"
        orderBy={{ column: "created_at" }}
        searchFields={["full_name", "mobile"]}
        emptyForm={{ full_name: "", mobile: "", relation: "Father" }}
        beforeSave={(s) => ({ ...s, student_id: s.student_id || null } as any)}
        columns={[
          { key: "full_name", label: "Name" },
          { key: "relation", label: "Relation" },
          { key: "mobile", label: "Mobile" },
          { key: "student_id", label: "Student", render: (r) => students.find((s) => s.id === r.student_id)?.full_name ?? "—" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Full name"><Input value={s.full_name ?? ""} onChange={(e) => set({ full_name: e.target.value })} /></Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Relation">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.relation ?? "Father"} onChange={(e) => set({ relation: e.target.value })}>
                  <option>Father</option><option>Mother</option><option>Guardian</option>
                </select>
              </Field>
              <Field label="Mobile"><Input value={s.mobile ?? ""} onChange={(e) => set({ mobile: e.target.value })} /></Field>
              <Field label="Email"><Input value={s.email ?? ""} onChange={(e) => set({ email: e.target.value })} /></Field>
              <Field label="Occupation"><Input value={s.occupation ?? ""} onChange={(e) => set({ occupation: e.target.value })} /></Field>
            </div>
            <Field label="Linked student">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.student_id ?? ""} onChange={(e) => set({ student_id: e.target.value })}>
                <option value="">—</option>
                {students.map((st) => <option key={st.id} value={st.id}>{st.enrollment_no} · {st.full_name}</option>)}
              </select>
            </Field>
          </>
        )}
      />
    </AdminLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
