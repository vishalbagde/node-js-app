import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/exams")({ component: Page });

type Exam = { id: string; name: string; exam_type: string; exam_date: string; course_id?: string; batch_id?: string; max_marks: number; remarks?: string };

function Page() {
  const { data: courses = [] } = useQuery({ queryKey: ["courses"], queryFn: async () => (await supabase.from("courses").select("id, name")).data ?? [] });
  const { data: batches = [] } = useQuery({ queryKey: ["batches"], queryFn: async () => (await supabase.from("batches").select("id, name")).data ?? [] });
  return (
    <AdminLayout title="Exams">
      <CrudTable<Exam>
        table="exams"
        title="exam"
        orderBy={{ column: "exam_date" }}
        searchFields={["name"]}
        emptyForm={{ name: "", exam_type: "unit_test", exam_date: new Date().toISOString().slice(0, 10), max_marks: 100 }}
        beforeSave={(s) => ({ ...s, course_id: s.course_id || null, batch_id: s.batch_id || null } as any)}
        columns={[
          { key: "name", label: "Name" },
          { key: "exam_type", label: "Type", render: (r) => r.exam_type.replace(/_/g, " ") },
          { key: "exam_date", label: "Date" },
          { key: "max_marks", label: "Max" },
          { key: "batch_id", label: "Batch", render: (r) => batches.find((b) => b.id === r.batch_id)?.name ?? "—" },
        ]}
        renderForm={(s, set) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Name"><Input value={s.name ?? ""} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Type">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.exam_type ?? "unit_test"} onChange={(e) => set({ exam_type: e.target.value })}>
                <option value="monthly_test">Monthly Test</option>
                <option value="unit_test">Unit Test</option>
                <option value="internal">Internal</option>
                <option value="practical">Practical</option>
                <option value="final">Final</option>
              </select>
            </Field>
            <Field label="Date"><Input type="date" value={s.exam_date ?? ""} onChange={(e) => set({ exam_date: e.target.value })} /></Field>
            <Field label="Max marks"><Input type="number" value={s.max_marks ?? 100} onChange={(e) => set({ max_marks: Number(e.target.value) })} /></Field>
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
            <div className="sm:col-span-2"><Field label="Remarks"><Input value={s.remarks ?? ""} onChange={(e) => set({ remarks: e.target.value })} /></Field></div>
          </div>
        )}
      />
      <p className="mt-3 text-xs text-muted-foreground">Tip: open the <b>Marks</b> module to enter subject-wise marks per student for an exam.</p>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
