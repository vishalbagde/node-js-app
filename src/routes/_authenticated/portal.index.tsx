import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { getMyStudent } from "@/lib/portal-data";

export const Route = createFileRoute("/_authenticated/portal/")({ component: Page });

function Page() {
  const { data: s, isLoading } = useQuery({ queryKey: ["my-student"], queryFn: getMyStudent });
  if (isLoading) return <Card className="p-6">Loading…</Card>;
  if (!s) return <Card className="p-6">No student profile is linked to your account. Please ask the institute to link your enrollment.</Card>;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">My Profile</h2>
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <Row label="Enrollment #" value={s.enrollment_no} />
          <Row label="Name" value={s.full_name} />
          <Row label="Mobile" value={s.mobile} />
          <Row label="Email" value={s.email} />
          <Row label="DOB" value={s.dob} />
          <Row label="Gender" value={s.gender} />
          <Row label="Admission" value={s.admission_date} />
          <Row label="Status" value={s.status} />
          <Row label="Address" value={s.address} />
        </dl>
      </Card>
    </div>
  );
}
function Row({ label, value }: { label: string; value?: string | null }) {
  return (<><dt className="text-muted-foreground">{label}</dt><dd className="col-span-2 font-medium">{value || "—"}</dd></>);
}
