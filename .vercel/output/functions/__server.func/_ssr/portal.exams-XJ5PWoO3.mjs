import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { a as getMyStudent } from "./portal-data-BBKxYORx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function Page() {
  const {
    data: marks = [],
    isLoading
  } = useQuery({
    queryKey: ["my-marks"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const {
        data
      } = await supabase.from("exam_marks").select("*, exam:exams(name, exam_date, exam_type)").eq("student_id", s.id);
      return data ?? [];
    }
  });
  const grouped = marks.reduce((acc, m) => {
    const key = m.exam_id;
    if (!acc[key]) acc[key] = {
      exam: m.exam,
      rows: [],
      total: 0,
      max: 0
    };
    acc[key].rows.push(m);
    acc[key].total += Number(m.marks_obtained);
    acc[key].max += Number(m.max_marks);
    return acc;
  }, {});
  const exams = Object.values(grouped);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "Loading…" });
  if (exams.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "No exam results published yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: exams.map((g, i) => {
    const pct = g.max ? Math.round(g.total / g.max * 100) : 0;
    const grade = pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: g.exam?.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground capitalize", children: [
            g.exam?.exam_type?.replace(/_/g, " "),
            " · ",
            g.exam?.exam_date
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
            g.total,
            "/",
            g.max
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            pct,
            "% · Grade ",
            grade
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Subject" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Marks" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-3 py-1.5", children: "Remarks" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: g.rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5", children: r.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-3 py-1.5", children: [
            r.marks_obtained,
            "/",
            r.max_marks
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-1.5", children: r.remarks || "—" })
        ] }, r.id)) })
      ] })
    ] }, i);
  }) });
}
export {
  Page as component
};
