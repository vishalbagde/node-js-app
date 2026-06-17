import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/admin/staff")({ component: Page });
type Staff = { id: string; full_name: string; mobile?: string; email?: string; designation?: string; joining_date?: string; salary?: number };

function Page() {
  return (
    <AdminLayout title="Staff">
      <CrudTable<Staff>
        table="staff"
        title="staff"
        orderBy={{ column: "created_at" }}
        searchFields={["full_name", "mobile", "designation"]}
        emptyForm={{ full_name: "" }}
        columns={[
          { key: "full_name", label: "Name" },
          { key: "designation", label: "Designation" },
          { key: "mobile", label: "Mobile" },
          { key: "joining_date", label: "Joined" },
          { key: "salary", label: "Salary", render: (r) => r.salary ? "₹" + Number(r.salary).toLocaleString("en-IN") : "—" },
        ]}
        renderForm={(s, set) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Full name"><Input value={s.full_name ?? ""} onChange={(e) => set({ full_name: e.target.value })} /></Field>
            <Field label="Designation"><Input value={s.designation ?? ""} onChange={(e) => set({ designation: e.target.value })} /></Field>
            <Field label="Mobile"><Input value={s.mobile ?? ""} onChange={(e) => set({ mobile: e.target.value })} /></Field>
            <Field label="Email"><Input value={s.email ?? ""} onChange={(e) => set({ email: e.target.value })} /></Field>
            <Field label="Joining date"><Input type="date" value={s.joining_date ?? ""} onChange={(e) => set({ joining_date: e.target.value })} /></Field>
            <Field label="Salary"><Input type="number" value={s.salary ?? 0} onChange={(e) => set({ salary: Number(e.target.value) })} /></Field>
          </div>
        )}
      />
    </AdminLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
