import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, XCircle, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/verify/$code")({
  head: ({ params }) => ({ meta: [{ title: `Verify certificate ${params.code}` }] }),
  component: Page,
});

function Page() {
  const { code } = useParams({ from: "/verify/$code" });
  const { data, isLoading } = useQuery({
    queryKey: ["verify", code],
    queryFn: async () => {
      const { data } = await supabase.from("certificates").select("*, student:students(full_name, enrollment_no), course:courses(name)").eq("certificate_no", code).maybeSingle();
      return data;
    },
  });
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background via-accent/30 to-background px-4 py-10">
      <Card className="w-full max-w-lg p-8 text-center">
        <Link to="/" className="mb-6 inline-flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-brand)" }}><GraduationCap className="h-5 w-5" /></div>
          <span className="text-sm font-bold">Smart Anonymous Computer Class</span>
        </Link>
        {isLoading && <p className="text-muted-foreground">Verifying…</p>}
        {!isLoading && !data && (
          <div className="grid gap-3"><XCircle className="mx-auto h-10 w-10 text-destructive" /><h1 className="text-xl font-bold">Certificate not found</h1><p className="text-sm text-muted-foreground">No record matches <b>{code}</b>.</p></div>
        )}
        {!isLoading && data && (
          <div className="grid gap-3">
            <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
            <h1 className="text-xl font-bold">Certificate verified</h1>
            <dl className="mx-auto grid max-w-sm grid-cols-2 gap-y-2 text-left text-sm">
              <dt className="text-muted-foreground">Certificate #</dt><dd className="font-medium">{data.certificate_no}</dd>
              <dt className="text-muted-foreground">Student</dt><dd className="font-medium">{(data as any).student?.full_name}</dd>
              <dt className="text-muted-foreground">Enrollment</dt><dd className="font-medium">{(data as any).student?.enrollment_no}</dd>
              <dt className="text-muted-foreground">Course</dt><dd className="font-medium">{(data as any).course?.name || "—"}</dd>
              <dt className="text-muted-foreground">Issued</dt><dd className="font-medium">{data.issue_date}</dd>
              <dt className="text-muted-foreground">Grade</dt><dd className="font-medium">{data.grade || "—"}</dd>
            </dl>
          </div>
        )}
      </Card>
    </div>
  );
}
