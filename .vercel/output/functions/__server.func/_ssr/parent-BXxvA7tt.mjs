import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { g as getMyChildren } from "./portal-data-BBKxYORx.mjs";
import { s as signOut } from "./use-auth-C1_fEVOJ.mjs";
import { G as GraduationCap, L as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
function Page() {
  const {
    data: parents = [],
    isLoading
  } = useQuery({
    queryKey: ["my-children"],
    queryFn: getMyChildren
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-14 items-center gap-3 px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-md text-primary-foreground", style: {
          background: "var(--gradient-brand)"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Parent Portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "ml-auto gap-1", onClick: () => signOut(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign out"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "container mx-auto p-4 lg:p-6", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "Loading…" }),
      !isLoading && parents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "No children linked to your account. Please contact the institute." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: parents.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChildCard, { student: p.student }, p.id)) })
    ] })
  ] });
}
function ChildCard({
  student
}) {
  const {
    data
  } = useQuery({
    queryKey: ["child", student?.id],
    queryFn: async () => {
      if (!student?.id) return null;
      const [att, fees, marks] = await Promise.all([supabase.from("attendance").select("status").eq("student_id", student.id), supabase.from("fees").select("amount, status").eq("student_id", student.id), supabase.from("exam_marks").select("*, exam:exams(name, exam_date)").eq("student_id", student.id)]);
      const a = att.data ?? [];
      const f = fees.data ?? [];
      return {
        total: a.length,
        present: a.filter((x) => x.status === "present").length,
        paid: f.filter((x) => x.status === "paid").reduce((s, x) => s + Number(x.amount), 0),
        pending: f.filter((x) => x.status !== "paid").reduce((s, x) => s + Number(x.amount), 0),
        marks: marks.data ?? []
      };
    },
    enabled: !!student?.id
  });
  if (!student) return null;
  const pct = data?.total ? Math.round(data.present / data.total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 flex flex-wrap items-baseline justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: student.full_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        "Enrollment ",
        student.enrollment_no
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Attendance", value: `${pct}%`, sub: `${data?.present ?? 0} / ${data?.total ?? 0} days` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Fees Paid", value: inr(data?.paid ?? 0) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Fees Pending", value: inr(data?.pending ?? 0), accent: (data?.pending ?? 0) > 0 ? "text-destructive" : "" })
    ] }),
    data?.marks && data.marks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-sm font-medium", children: "Recent exam results" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Exam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Marks" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data.marks.slice(0, 8).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5", children: m.exam?.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5", children: m.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-1.5", children: [
            m.marks_obtained,
            "/",
            m.max_marks
          ] })
        ] }, m.id)) })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value,
  sub,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border bg-muted/30 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xl font-bold ${accent || ""}`, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: sub })
  ] });
}
export {
  Page as component
};
