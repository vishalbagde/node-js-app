import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getMyStudent } from "@/lib/portal-data";

export const Route = createFileRoute("/_authenticated/portal/fees")({ component: Page });

const inr = (n: number) => "₹" + Number(n).toLocaleString("en-IN");

function Page() {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["my-fees"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const { data } = await supabase.from("fees").select("*").eq("student_id", s.id).order("created_at", { ascending: false });
      return data ?? [];
    },
  });
  const paid = rows.filter((r: any) => r.status === "paid").reduce((s: number, r: any) => s + Number(r.amount), 0);
  const pending = rows.filter((r: any) => r.status !== "paid").reduce((s: number, r: any) => s + Number(r.amount), 0);
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Card className="p-5"><div className="text-xs text-muted-foreground">Paid</div><div className="text-2xl font-bold text-success">{inr(paid)}</div></Card>
        <Card className="p-5"><div className="text-xs text-muted-foreground">Pending</div><div className="text-2xl font-bold text-destructive">{inr(pending)}</div></Card>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-2">Receipt #</th><th className="px-4 py-2">Type</th><th className="px-4 py-2">Amount</th><th className="px-4 py-2">Due</th><th className="px-4 py-2">Paid on</th><th className="px-4 py-2">Status</th></tr></thead>
          <tbody>
            {isLoading && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && rows.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">No fees recorded.</td></tr>}
            {rows.map((r: any) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2">{r.receipt_no || "—"}</td>
                <td className="px-4 py-2 capitalize">{r.fee_type}</td>
                <td className="px-4 py-2">{inr(r.amount)}</td>
                <td className="px-4 py-2">{r.due_date || "—"}</td>
                <td className="px-4 py-2">{r.paid_date || "—"}</td>
                <td className="px-4 py-2"><span className={`rounded-full px-2 py-0.5 text-xs ${r.status === "paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
