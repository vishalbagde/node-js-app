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
    data: rows = [],
    isLoading
  } = useQuery({
    queryKey: ["my-certs"],
    queryFn: async () => {
      const s = await getMyStudent();
      if (!s) return [];
      const {
        data
      } = await supabase.from("certificates").select("*, course:courses(name)").eq("student_id", s.id);
      return data ?? [];
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "Loading…" });
  if (rows.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "No certificates issued yet." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: rows.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Certificate #" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold", children: c.certificate_no }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: c.course?.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: [
      "Issued: ",
      c.issue_date,
      " · Grade: ",
      c.grade || "—"
    ] }),
    c.marks_obtained != null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
      "Marks: ",
      c.marks_obtained,
      "/",
      c.total_marks
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "mt-3 inline-block text-sm text-primary hover:underline", href: `/verify/${c.certificate_no}`, target: "_blank", rel: "noreferrer", children: "View verification page →" })
  ] }, c.id)) });
}
export {
  Page as component
};
