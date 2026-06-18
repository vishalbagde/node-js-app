import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { G as GraduationCap, B as BookOpen, e as CalendarDays, I as IndianRupee, M as MessagesSquare, a as Award } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./button-BC9oXVxV.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./use-auth-C1_fEVOJ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
async function fetchStats() {
  const [students, courses, batches, fees, inquiries, certs] = await Promise.all([supabase.from("students").select("*", {
    count: "exact",
    head: true
  }), supabase.from("courses").select("*", {
    count: "exact",
    head: true
  }), supabase.from("batches").select("*", {
    count: "exact",
    head: true
  }), supabase.from("fees").select("amount, status"), supabase.from("inquiries").select("*", {
    count: "exact",
    head: true
  }).eq("status", "new"), supabase.from("certificates").select("*", {
    count: "exact",
    head: true
  })]);
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
    pending
  };
}
function Dashboard() {
  const {
    data
  } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchStats
  });
  const stats = data ?? {
    students: 0,
    courses: 0,
    batches: 0,
    inquiries: 0,
    certificates: 0,
    collected: 0,
    pending: 0
  };
  const inr = (n) => "₹" + n.toLocaleString("en-IN");
  const cards = [{
    label: "Total Students",
    value: stats.students,
    icon: GraduationCap,
    accent: "from-blue-500/15 to-blue-500/5"
  }, {
    label: "Courses",
    value: stats.courses,
    icon: BookOpen,
    accent: "from-indigo-500/15 to-indigo-500/5"
  }, {
    label: "Batches",
    value: stats.batches,
    icon: CalendarDays,
    accent: "from-sky-500/15 to-sky-500/5"
  }, {
    label: "Fees Collected",
    value: inr(stats.collected),
    icon: IndianRupee,
    accent: "from-emerald-500/15 to-emerald-500/5"
  }, {
    label: "Fees Pending",
    value: inr(stats.pending),
    icon: IndianRupee,
    accent: "from-amber-500/15 to-amber-500/5"
  }, {
    label: "New Inquiries",
    value: stats.inquiries,
    icon: MessagesSquare,
    accent: "from-violet-500/15 to-violet-500/5"
  }, {
    label: "Certificates Issued",
    value: stats.certificates,
    icon: Award,
    accent: "from-rose-500/15 to-rose-500/5"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: `relative overflow-hidden bg-gradient-to-br ${c.accent} p-5`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-bold tracking-tight", children: c.value })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-5 w-5 text-primary" })
    ] }) }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: "Welcome to Smart Anonymous Computer Class" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Use the sidebar to manage students, batches, attendance, fees, certificates and inquiries. The first user to sign up is automatically given admin access." })
    ] })
  ] });
}
export {
  Dashboard as component
};
