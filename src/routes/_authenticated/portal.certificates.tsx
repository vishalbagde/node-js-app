import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { getMyStudent } from "@/lib/portal-data";

export const Route = createFileRoute("/_authenticated/portal/certificates")({ component: Page });

function Page() {
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["my-certs"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const { data } = await supabase.from("certificates").select("*, course:courses(name)").eq("student_id", s.id);
      return data ?? [];
    },
  });
  if (isLoading) return <Card className="p-6">Loading…</Card>;
  if (rows.length === 0) return <Card className="p-6">No certificates issued yet.</Card>;
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {rows.map((c: any) => (
        <Card key={c.id} className="p-5">
          <div className="text-xs text-muted-foreground">Certificate #</div>
          <div className="text-lg font-semibold">{c.certificate_no}</div>
          <div className="mt-1 text-sm">{c.course?.name}</div>
          <div className="mt-2 text-xs text-muted-foreground">Issued: {c.issue_date} · Grade: {c.grade || "—"}</div>
          {c.marks_obtained != null && <div className="text-xs">Marks: {c.marks_obtained}/{c.total_marks}</div>}
          <a className="mt-3 inline-block text-sm text-primary hover:underline" href={`/verify/${c.certificate_no}`} target="_blank" rel="noreferrer">View verification page →</a>
        </Card>
      ))}
    </div>
  );
}
