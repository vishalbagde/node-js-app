import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/batches")({ component: Page });

type Batch = { id: string; course_id: string; name: string; start_date: string; end_date?: string; timing?: string; capacity: number };

function Page() {
  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => (await supabase.from("courses").select("id, name")).data ?? [],
  });
  return (
    <AdminLayout title="Batches">
      <CrudTable<Batch>
        table="batches"
        title="batch"
        orderBy={{ column: "start_date" }}
        searchFields={["name", "timing"]}
        emptyForm={{ name: "", start_date: new Date().toISOString().slice(0, 10), capacity: 30, course_id: "" }}
        columns={[
          { key: "name", label: "Batch" },
          { key: "course_id", label: "Course", render: (r) => courses.find((c) => c.id === r.course_id)?.name ?? "—" },
          { key: "start_date", label: "Start" },
          { key: "timing", label: "Timing" },
          { key: "capacity", label: "Capacity" },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Batch name"><Input value={s.name ?? ""} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Course">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.course_id ?? ""} onChange={(e) => set({ course_id: e.target.value })}>
                <option value="">Select course</option>
                {courses.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Start date"><Input type="date" value={s.start_date ?? ""} onChange={(e) => set({ start_date: e.target.value })} /></Field>
            <Field label="End date"><Input type="date" value={s.end_date ?? ""} onChange={(e) => set({ end_date: e.target.value })} /></Field>
            <Field label="Timing"><Input placeholder="e.g. 10:00 AM - 12:00 PM" value={s.timing ?? ""} onChange={(e) => set({ timing: e.target.value })} /></Field>
            <Field label="Capacity"><Input type="number" value={s.capacity ?? 30} onChange={(e) => set({ capacity: Number(e.target.value) })} /></Field>
          </>
        )}
      />
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
