import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/attendance")({ component: Page });

type Student = { id: string; full_name: string; enrollment_no: string; batch_id?: string };
type Attn = { id: string; student_id: string; status: string };

function Page() {
  const qc = useQueryClient();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [batchId, setBatchId] = useState<string>("");

  const { data: batches = [] } = useQuery({ queryKey: ["batches-min"], queryFn: async () => (await supabase.from("batches").select("id, name")).data ?? [] });
  const { data: students = [] } = useQuery({
    queryKey: ["students-att", batchId],
    queryFn: async () => {
      let q = supabase.from("students").select("id, full_name, enrollment_no, batch_id").order("full_name");
      if (batchId) q = q.eq("batch_id", batchId);
      return ((await q).data ?? []) as Student[];
    },
  });
  const { data: existing = [] } = useQuery({
    queryKey: ["attendance", date],
    queryFn: async () => ((await supabase.from("attendance").select("id, student_id, status").eq("date", date)).data ?? []) as Attn[],
  });
  const map = useMemo(() => new Map(existing.map((a) => [a.student_id, a.status])), [existing]);

  const mark = async (student_id: string, status: string) => {
    const { error } = await supabase.from("attendance").upsert({ student_id, date, status }, { onConflict: "student_id,date" });
    if (error) { toast.error(error.message); return; }
    qc.invalidateQueries({ queryKey: ["attendance", date] });
  };

  return (
    <AdminLayout title="Attendance">
      <Card className="mb-4 flex flex-wrap items-end gap-3 p-4">
        <div className="grid gap-1.5"><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
        <div className="grid gap-1.5"><Label>Batch</Label>
          <select className="h-10 rounded-md border bg-background px-3 text-sm" value={batchId} onChange={(e) => setBatchId(e.target.value)}>
            <option value="">All batches</option>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
        <div className="ml-auto text-sm text-muted-foreground">{existing.length} marked · {students.length} students</div>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr className="text-left"><th className="px-4 py-2.5">Enroll #</th><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Status</th><th className="px-4 py-2.5 text-right">Mark</th></tr></thead>
            <tbody>
              {students.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-muted-foreground">No students found.</td></tr>}
              {students.map((s) => {
                const st = map.get(s.id);
                return (
                  <tr key={s.id} className="border-t">
                    <td className="px-4 py-2.5">{s.enrollment_no}</td>
                    <td className="px-4 py-2.5 font-medium">{s.full_name}</td>
                    <td className="px-4 py-2.5">{st ? <Badge variant={st === "present" ? "default" : st === "late" ? "secondary" : "destructive"}>{st}</Badge> : <span className="text-muted-foreground">—</span>}</td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="inline-flex gap-1">
                        <Button size="sm" variant={st === "present" ? "default" : "outline"} onClick={() => mark(s.id, "present")}>P</Button>
                        <Button size="sm" variant={st === "late" ? "secondary" : "outline"} onClick={() => mark(s.id, "late")}>L</Button>
                        <Button size="sm" variant={st === "absent" ? "destructive" : "outline"} onClick={() => mark(s.id, "absent")}>A</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </AdminLayout>
  );
}
