import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CrudTable } from "@/components/admin/CrudTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/fees")({ component: Page });
type Fee = { id: string; student_id: string; receipt_no?: string; amount: number; fee_type: string; payment_mode: string; due_date?: string; paid_date?: string; status: string; remarks?: string };

function Page() {
  const { data: students = [] } = useQuery({
    queryKey: ["students-min"],
    queryFn: async () => (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? [],
  });
  return (
    <AdminLayout title="Fees">
      <CrudTable<Fee>
        table="fees"
        title="fee record"
        orderBy={{ column: "created_at" }}
        searchFields={["receipt_no", "fee_type"]}
        emptyForm={{ amount: 0, fee_type: "monthly", payment_mode: "cash", status: "pending", receipt_no: "RC" + Date.now().toString().slice(-6) }}
        columns={[
          { key: "receipt_no", label: "Receipt" },
          { key: "student_id", label: "Student", render: (r) => students.find((s) => s.id === r.student_id)?.full_name ?? "—" },
          { key: "fee_type", label: "Type" },
          { key: "amount", label: "Amount", render: (r) => "₹" + Number(r.amount).toLocaleString("en-IN") },
          { key: "status", label: "Status", render: (r) => <Badge variant={r.status === "paid" ? "default" : r.status === "overdue" ? "destructive" : "secondary"}>{r.status}</Badge> },
          { key: "paid_date", label: "Paid on" },
        ]}
        renderForm={(s, set) => (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Student">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.student_id ?? ""} onChange={(e) => set({ student_id: e.target.value })}>
                <option value="">Select…</option>
                {students.map((st) => <option key={st.id} value={st.id}>{st.enrollment_no} · {st.full_name}</option>)}
              </select>
            </Field>
            <Field label="Receipt #"><Input value={s.receipt_no ?? ""} onChange={(e) => set({ receipt_no: e.target.value })} /></Field>
            <Field label="Amount (₹)"><Input type="number" value={s.amount ?? 0} onChange={(e) => set({ amount: Number(e.target.value) })} /></Field>
            <Field label="Type">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.fee_type ?? "monthly"} onChange={(e) => set({ fee_type: e.target.value })}>
                <option>monthly</option><option>installment</option><option>admission</option><option>exam</option>
              </select>
            </Field>
            <Field label="Payment mode">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.payment_mode ?? "cash"} onChange={(e) => set({ payment_mode: e.target.value })}>
                <option>cash</option><option>upi</option><option>card</option><option>bank</option>
              </select>
            </Field>
            <Field label="Status">
              <select className="h-10 rounded-md border bg-background px-3 text-sm" value={s.status ?? "pending"} onChange={(e) => set({ status: e.target.value })}>
                <option>pending</option><option>paid</option><option>overdue</option>
              </select>
            </Field>
            <Field label="Due date"><Input type="date" value={s.due_date ?? ""} onChange={(e) => set({ due_date: e.target.value })} /></Field>
            <Field label="Paid date"><Input type="date" value={s.paid_date ?? ""} onChange={(e) => set({ paid_date: e.target.value })} /></Field>
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
