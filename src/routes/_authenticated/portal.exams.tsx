import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getMyStudent } from "@/lib/portal-data";

export const Route = createFileRoute("/_authenticated/portal/exams")({ component: Page });

function Page() {
  const { data: marks = [], isLoading } = useQuery({
    queryKey: ["my-marks"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const { data } = await supabase.from("exam_marks").select("*, exam:exams(name, exam_date, exam_type)").eq("student_id", s.id);
      return data ?? [];
    },
  });

  const grouped = marks.reduce((acc: Record<string, any>, m: any) => {
    const key = m.exam_id;
    if (!acc[key]) acc[key] = { exam: m.exam, rows: [] as any[], total: 0, max: 0 };
    acc[key].rows.push(m);
    acc[key].total += Number(m.marks_obtained);
    acc[key].max += Number(m.max_marks);
    return acc;
  }, {});
  const exams = Object.values(grouped) as any[];

  if (isLoading) return <Card className="p-6">Loading…</Card>;
  if (exams.length === 0) return <Card className="p-6">No exam results published yet.</Card>;
  return (
    <div className="grid gap-4">
      {exams.map((g, i) => {
        const pct = g.max ? Math.round((g.total / g.max) * 100) : 0;
        const grade = pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";
        return (
          <Card key={i} className="p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-lg font-semibold">{g.exam?.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{g.exam?.exam_type?.replace(/_/g, " ")} · {g.exam?.exam_date}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{g.total}/{g.max}</div>
                <div className="text-xs text-muted-foreground">{pct}% · Grade {grade}</div>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left"><tr><th className="px-3 py-1.5">Subject</th><th className="px-3 py-1.5">Marks</th><th className="px-3 py-1.5">Remarks</th></tr></thead>
              <tbody>{g.rows.map((r: any) => (
                <tr key={r.id} className="border-t"><td className="px-3 py-1.5">{r.subject}</td><td className="px-3 py-1.5">{r.marks_obtained}/{r.max_marks}</td><td className="px-3 py-1.5">{r.remarks || "—"}</td></tr>
              ))}</tbody>
            </table>
          </Card>
        );
      })}
    </div>
  );
}
