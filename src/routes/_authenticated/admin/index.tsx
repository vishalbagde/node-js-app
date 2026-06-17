import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, BookOpen, CalendarDays, IndianRupee, MessagesSquare, Award } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

async function fetchStats() {
  const [students, courses, batches, fees, inquiries, certs] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }),
    supabase.from("batches").select("*", { count: "exact", head: true }),
    supabase.from("fees").select("amount, status"),
    supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
  ]);
  const feesRows = fees.data ?? [];
  const collected = feesRows.filter((f) => f.status === "paid").reduce((s, f) => s + Number(f.amount), 0);
  const pending = feesRows.filter((f) => f.status !== "paid").reduce((s, f) => s + Number(f.amount), 0);
  return {
    students: students.count ?? 0,
    courses: courses.count ?? 0,
    batches: batches.count ?? 0,
    inquiries: inquiries.count ?? 0,
    certificates: certs.count ?? 0,
    collected,
    pending,
  };
}

function Dashboard() {
  const { data } = useQuery({ queryKey: ["dashboard-stats"], queryFn: fetchStats });
  const stats = data ?? { students: 0, courses: 0, batches: 0, inquiries: 0, certificates: 0, collected: 0, pending: 0 };
  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
  const cards = [
    { label: "Total Students", value: stats.students, icon: GraduationCap, accent: "from-blue-500/15 to-blue-500/5" },
    { label: "Courses", value: stats.courses, icon: BookOpen, accent: "from-indigo-500/15 to-indigo-500/5" },
    { label: "Batches", value: stats.batches, icon: CalendarDays, accent: "from-sky-500/15 to-sky-500/5" },
    { label: "Fees Collected", value: inr(stats.collected), icon: IndianRupee, accent: "from-emerald-500/15 to-emerald-500/5" },
    { label: "Fees Pending", value: inr(stats.pending), icon: IndianRupee, accent: "from-amber-500/15 to-amber-500/5" },
    { label: "New Inquiries", value: stats.inquiries, icon: MessagesSquare, accent: "from-violet-500/15 to-violet-500/5" },
    { label: "Certificates Issued", value: stats.certificates, icon: Award, accent: "from-rose-500/15 to-rose-500/5" },
  ];
  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label} className={`relative overflow-hidden bg-gradient-to-br ${c.accent} p-5`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium text-muted-foreground">{c.label}</div>
                <div className="mt-2 text-2xl font-bold tracking-tight">{c.value}</div>
              </div>
              <c.icon className="h-5 w-5 text-primary" />
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6 p-6">
        <h2 className="font-semibold">Welcome to Smart Anonymous Computer Class</h2>
        <p className="mt-2 text-sm text-muted-foreground">Use the sidebar to manage students, batches, attendance, fees, certificates and inquiries. The first user to sign up is automatically given admin access.</p>
      </Card>
    </AdminLayout>
  );
}
