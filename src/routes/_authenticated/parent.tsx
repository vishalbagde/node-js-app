import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { getMyChildren } from "@/lib/portal-data";
import { signOut } from "@/lib/use-auth";
import { GraduationCap, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/parent")({ component: Page });

const inr = (n: number) => "₹" + Number(n).toLocaleString("en-IN");

function Page() {
  const { data: parents = [], isLoading } = useQuery({ queryKey: ["my-children"], queryFn: getMyChildren });

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-14 items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="text-sm font-bold">Parent Portal</div>
          </Link>
          <Button variant="ghost" size="sm" className="ml-auto gap-1" onClick={() => signOut()}><LogOut className="h-4 w-4" /> Sign out</Button>
        </div>
      </header>
      <main className="container mx-auto p-4 lg:p-6">
        {isLoading && <Card className="p-6">Loading…</Card>}
        {!isLoading && parents.length === 0 && <Card className="p-6">No children linked to your account. Please contact the institute.</Card>}
        <div className="grid gap-4">
          {parents.map((p) => <ChildCard key={p.id} student={p.student} />)}
        </div>
      </main>
    </div>
  );
}

function ChildCard({ student }: { student: any }) {
  const { data } = useQuery({
    queryKey: ["child", student?.id],
    queryFn: async () => {
      if (!student?.id) return null;
      const [att, fees, marks] = await Promise.all([
        supabase.from("attendance").select("status").eq("student_id", student.id),
        supabase.from("fees").select("amount, status").eq("student_id", student.id),
        supabase.from("exam_marks").select("*, exam:exams(name, exam_date)").eq("student_id", student.id),
      ]);
      const a = att.data ?? [];
      const f = fees.data ?? [];
      return {
        total: a.length,
        present: a.filter((x: any) => x.status === "present").length,
        paid: f.filter((x: any) => x.status === "paid").reduce((s: number, x: any) => s + Number(x.amount), 0),
        pending: f.filter((x: any) => x.status !== "paid").reduce((s: number, x: any) => s + Number(x.amount), 0),
        marks: marks.data ?? [],
      };
    },
    enabled: !!student?.id,
  });
  if (!student) return null;
  const pct = data?.total ? Math.round((data.present / data.total) * 100) : 0;
  return (
    <Card className="p-5">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="text-lg font-semibold">{student.full_name}</div>
          <div className="text-xs text-muted-foreground">Enrollment {student.enrollment_no}</div>
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Attendance" value={`${pct}%`} sub={`${data?.present ?? 0} / ${data?.total ?? 0} days`} />
        <Stat label="Fees Paid" value={inr(data?.paid ?? 0)} />
        <Stat label="Fees Pending" value={inr(data?.pending ?? 0)} accent={(data?.pending ?? 0) > 0 ? "text-destructive" : ""} />
      </div>
      {data?.marks && data.marks.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-sm font-medium">Recent exam results</div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left"><tr><th className="px-3 py-1.5">Exam</th><th className="px-3 py-1.5">Subject</th><th className="px-3 py-1.5">Marks</th></tr></thead>
            <tbody>{data.marks.slice(0, 8).map((m: any) => (
              <tr key={m.id} className="border-t"><td className="px-3 py-1.5">{m.exam?.name}</td><td className="px-3 py-1.5">{m.subject}</td><td className="px-3 py-1.5">{m.marks_obtained}/{m.max_marks}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="rounded-md border bg-muted/30 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={`text-xl font-bold ${accent || ""}`}>{value}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
