import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getMyStudent } from "@/lib/portal-data";

export const Route = createFileRoute("/_authenticated/portal/attendance")({ component: Page });

function Page() {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["my-attendance"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const { data } = await supabase.from("attendance").select("*").eq("student_id", s.id).order("date", { ascending: false });
      return data ?? [];
    },
  });
  const present = rows.filter((r: any) => r.status === "present").length;
  const total = rows.length;
  const pct = total ? Math.round((present / total) * 100) : 0;
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card className="p-5"><div className="text-xs text-muted-foreground">Total days</div><div className="text-2xl font-bold">{total}</div></Card>
        <Card className="p-5"><div className="text-xs text-muted-foreground">Present</div><div className="text-2xl font-bold text-success">{present}</div></Card>
        <Card className="p-5"><div className="text-xs text-muted-foreground">Attendance %</div><div className="text-2xl font-bold">{pct}%</div></Card>
      </div>
      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Status</th><th className="px-4 py-2">Remarks</th></tr></thead>
          <tbody>
            {isLoading && <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">Loading…</td></tr>}
            {!isLoading && rows.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">No attendance recorded yet.</td></tr>}
            {rows.map((r: any) => (
              <tr key={r.id} className="border-t"><td className="px-4 py-2">{r.date}</td><td className="px-4 py-2 capitalize">{r.status}</td><td className="px-4 py-2">{r.remarks || "—"}</td></tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
