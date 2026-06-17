import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/admin/courses")({ component: Page });

type Course = { id: string; name: string; code: string; duration_months: number; fees: number; description?: string };

function Page() {
  return (
    <AdminLayout title="Courses">
      <CrudTable<Course>
        table="courses"
        title="course"
        orderBy={{ column: "created_at" }}
        searchFields={["name", "code"]}
        emptyForm={{ name: "", code: "", duration_months: 3, fees: 0, description: "" }}
        columns={[
          { key: "name", label: "Name" },
          { key: "code", label: "Code" },
          { key: "duration_months", label: "Duration (mo)" },
          { key: "fees", label: "Fees", render: (r) => "₹" + Number(r.fees).toLocaleString("en-IN") },
        ]}
        renderForm={(s, set) => (
          <>
            <Field label="Name"><Input value={s.name ?? ""} onChange={(e) => set({ name: e.target.value })} /></Field>
            <Field label="Code"><Input value={s.code ?? ""} onChange={(e) => set({ code: e.target.value })} /></Field>
            <Field label="Duration (months)"><Input type="number" value={s.duration_months ?? 3} onChange={(e) => set({ duration_months: Number(e.target.value) })} /></Field>
            <Field label="Fees (₹)"><Input type="number" value={s.fees ?? 0} onChange={(e) => set({ fees: Number(e.target.value) })} /></Field>
            <Field label="Description"><Input value={s.description ?? ""} onChange={(e) => set({ description: e.target.value })} /></Field>
          </>
        )}
      />
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
