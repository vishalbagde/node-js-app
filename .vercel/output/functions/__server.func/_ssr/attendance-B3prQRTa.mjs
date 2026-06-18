import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { L as Label, I as Input } from "./label-4pBKAOFV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "./use-auth-C1_fEVOJ.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
  const qc = useQueryClient();
  const [date, setDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [batchId, setBatchId] = reactExports.useState("");
  const {
    data: batches = []
  } = useQuery({
    queryKey: ["batches-min"],
    queryFn: async () => (await supabase.from("batches").select("id, name")).data ?? []
  });
  const {
    data: students = []
  } = useQuery({
    queryKey: ["students-att", batchId],
    queryFn: async () => {
      let q = supabase.from("students").select("id, full_name, enrollment_no, batch_id").order("full_name");
      if (batchId) q = q.eq("batch_id", batchId);
      return (await q).data ?? [];
    }
  });
  const {
    data: existing = []
  } = useQuery({
    queryKey: ["attendance", date],
    queryFn: async () => (await supabase.from("attendance").select("id, student_id, status").eq("date", date)).data ?? []
  });
  const map = reactExports.useMemo(() => new Map(existing.map((a) => [a.student_id, a.status])), [existing]);
  const mark = async (student_id, status) => {
    const {
      error
    } = await supabase.from("attendance").upsert({
      student_id,
      date,
      status
    }, {
      onConflict: "student_id,date"
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    qc.invalidateQueries({
      queryKey: ["attendance", date]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Attendance", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mb-4 flex flex-wrap items-end gap-3 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Batch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: batchId, onChange: (e) => setBatchId(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All batches" }),
          batches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.name }, b.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto text-sm text-muted-foreground", children: [
        existing.length,
        " marked · ",
        students.length,
        " students"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5", children: "Enroll #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right", children: "Mark" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-10 text-center text-muted-foreground", children: "No students found." }) }),
        students.map((s) => {
          const st = map.get(s.id);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: s.enrollment_no }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium", children: s.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: st ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: st === "present" ? "default" : st === "late" ? "secondary" : "destructive", children: st }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "—" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: st === "present" ? "default" : "outline", onClick: () => mark(s.id, "present"), children: "P" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: st === "late" ? "secondary" : "outline", onClick: () => mark(s.id, "late"), children: "L" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: st === "absent" ? "destructive" : "outline", onClick: () => mark(s.id, "absent"), children: "A" })
            ] }) })
          ] }, s.id);
        })
      ] })
    ] }) }) })
  ] });
}
export {
  Page as component
};
