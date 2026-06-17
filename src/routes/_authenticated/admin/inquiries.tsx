import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({ component: Page });
type Inq = { id: string; full_name: string; mobile: string; email?: string; course_interest?: string; message?: string; status: string; follow_up_date?: string; source?: string };

function Page() {
  return (
    <AdminLayout title="Inquiries">
      <CrudTable<Inq>
        table="inquiries"
        title="inquiry"
        orderBy={{ column: "created_at" }}
        searchFields={["full_name", "mobile", "course_interest"]}
        emptyForm={{ full_name: "", mobile: "", status: "new" }}
        columns={[
          { key: "full_name", label: "Name" },
          { key: "mobile", label: "Mobile" },
          { key: "course_interest", label: "Course" },
          { key: "status", label: "Status", render: (r) => <Badge variant={r.status === "converted" ? "default" : r.status === "dropped" ? "destructive" : "secondary"}>{r.status}</Badge> },
          { key: "follow_up_date", label: "Follow-up" },
        ]}
        renderForm={(s, set) => (
          <div className="grid gap-3">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Full name"><Input value={s.full_name ?? ""} onChange={(e) => set({ full_name: e.target.value })} /></Field>
              <Field label="Mobile"><Input value={s.mobile ?? ""} onChange={(e) => set({ mobile: e.target.value })} /></Field>
              <Field label="Email"><Input value={s.email ?? ""} onChange={(e) => set({ email: e.target.value })} /></Field>
              <Field label="Course"><Input value={s.course_interest ?? ""} onChange={(e) => set({ course_interest: e.target.value })} /></Field>
              <Field label="Source"><Input value={s.source ?? ""} onChange={(e) => set({ source: e.target.value })} /></Field>
              <Field label="Status">
                <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.status ?? "new"} onChange={(e) => set({ status: e.target.value })}>
                  <option>new</option><option>contacted</option><option>converted</option><option>dropped</option>
                </select>
              </Field>
              <Field label="Follow-up"><Input type="date" value={s.follow_up_date ?? ""} onChange={(e) => set({ follow_up_date: e.target.value })} /></Field>
            </div>
            <Field label="Message"><Textarea rows={3} value={s.message ?? ""} onChange={(e) => set({ message: e.target.value })} /></Field>
          </div>
        )}
      />
    </AdminLayout>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
