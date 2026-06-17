import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/marks")({ component: Page });

function Page() {
  const qc = useQueryClient();
  const [examId, setExamId] = useState("");
  const [subject, setSubject] = useState("Overall");
  const [maxMarks, setMaxMarks] = useState(100);
  const { data: exams = [] } = useQuery({ queryKey: ["exams"], queryFn: async () => (await supabase.from("exams").select("id, name, exam_date, batch_id, max_marks").order("exam_date", { ascending: false })).data ?? [] });
  const exam = exams.find((e: any) => e.id === examId);

  const { data: students = [] } = useQuery({
    queryKey: ["batch-students", exam?.batch_id],
    queryFn: async () => {
      if (!exam?.batch_id) return (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? [];
      return (await supabase.from("students").select("id, full_name, enrollment_no").eq("batch_id", exam.batch_id)).data ?? [];
    },
    enabled: !!examId,
  });

  const { data: existing = [] } = useQuery({
    queryKey: ["marks", examId, subject],
    queryFn: async () => (await supabase.from("exam_marks").select("*").eq("exam_id", examId).eq("subject", subject)).data ?? [],
    enabled: !!examId,
  });

  const [marks, setMarks] = useState<Record<string, number>>({});
  const get = (sid: string) => marks[sid] ?? existing.find((m: any) => m.student_id === sid)?.marks_obtained ?? "";

  const save = async () => {
    if (!examId) return toast.error("Pick an exam first.");
    const rows = students
      .filter((s: any) => marks[s.id] != null && !Number.isNaN(marks[s.id]))
      .map((s: any) => {
        const ex = existing.find((m: any) => m.student_id === s.id);
        return { id: ex?.id, exam_id: examId, student_id: s.id, subject, max_marks: maxMarks, marks_obtained: marks[s.id] };
      });
    if (rows.length === 0) return toast.error("Enter at least one mark.");
    const { error } = await supabase.from("exam_marks").upsert(rows.map(({ id, ...r }) => id ? { id, ...r } : r) as any);
    if (error) return toast.error(error.message);
    toast.success("Marks saved.");
    setMarks({});
    qc.invalidateQueries({ queryKey: ["marks", examId, subject] });
  };

  return (
    <AdminLayout title="Marks Entry">
      <Card className="grid gap-3 p-4 sm:grid-cols-4">
        <div className="grid gap-1.5"><Label>Exam</Label>
          <select className="h-10 rounded-md border bg-background px-3 text-sm" value={examId} onChange={(e) => { setExamId(e.target.value); const ex = exams.find((x: any) => x.id === e.target.value); if (ex) setMaxMarks(Number(ex.max_marks)); }}>
            <option value="">— select exam —</option>
            {exams.map((e: any) => <option key={e.id} value={e.id}>{e.name} ({e.exam_date})</option>)}
          </select>
        </div>
        <div className="grid gap-1.5"><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
        <div className="grid gap-1.5"><Label>Max marks</Label><Input type="number" value={maxMarks} onChange={(e) => setMaxMarks(Number(e.target.value))} /></div>
        <div className="flex items-end"><Button className="w-full" onClick={save} disabled={!examId}>Save marks</Button></div>
      </Card>
      {examId && (
        <Card className="mt-4 overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-2">Enroll #</th><th className="px-4 py-2">Student</th><th className="px-4 py-2">Marks (of {maxMarks})</th></tr></thead>
            <tbody>
              {students.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">No students for this batch.</td></tr>}
              {students.map((s: any) => (
                <tr key={s.id} className="border-t">
                  <td className="px-4 py-2">{s.enrollment_no}</td>
                  <td className="px-4 py-2">{s.full_name}</td>
                  <td className="px-4 py-2"><Input type="number" className="max-w-[120px]" value={get(s.id)} onChange={(e) => setMarks({ ...marks, [s.id]: Number(e.target.value) })} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </AdminLayout>
  );
}
