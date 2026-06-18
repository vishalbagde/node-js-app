import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as CrudTable } from "./CrudTable-BMa4WaXK.mjs";
import { I as Input, L as Label } from "./label-4pBKAOFV.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
import "./card-RGlIzTYo.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
function Page() {
  const {
    data: courses = []
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => (await supabase.from("courses").select("id, name")).data ?? []
  });
  const {
    data: batches = []
  } = useQuery({
    queryKey: ["batches"],
    queryFn: async () => (await supabase.from("batches").select("id, name")).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Exams", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CrudTable, { table: "exams", title: "exam", orderBy: {
      column: "exam_date"
    }, searchFields: ["name"], emptyForm: {
      name: "",
      exam_type: "unit_test",
      exam_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      max_marks: 100
    }, beforeSave: (s) => ({
      ...s,
      course_id: s.course_id || null,
      batch_id: s.batch_id || null
    }), columns: [{
      key: "name",
      label: "Name"
    }, {
      key: "exam_type",
      label: "Type",
      render: (r) => r.exam_type.replace(/_/g, " ")
    }, {
      key: "exam_date",
      label: "Date"
    }, {
      key: "max_marks",
      label: "Max"
    }, {
      key: "batch_id",
      label: "Batch",
      render: (r) => batches.find((b) => b.id === r.batch_id)?.name ?? "—"
    }], renderForm: (s, set) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.name ?? "", onChange: (e) => set({
        name: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.exam_type ?? "unit_test", onChange: (e) => set({
        exam_type: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monthly_test", children: "Monthly Test" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unit_test", children: "Unit Test" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "internal", children: "Internal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "practical", children: "Practical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "final", children: "Final" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.exam_date ?? "", onChange: (e) => set({
        exam_date: e.target.value
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Max marks", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.max_marks ?? 100, onChange: (e) => set({
        max_marks: Number(e.target.value)
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Course", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.course_id ?? "", onChange: (e) => set({
        course_id: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
        courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Batch", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.batch_id ?? "", onChange: (e) => set({
        batch_id: e.target.value
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "—" }),
        batches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b.id, children: b.name }, b.id))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Remarks", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.remarks ?? "", onChange: (e) => set({
        remarks: e.target.value
      }) }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
      "Tip: open the ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "Marks" }),
      " module to enter subject-wise marks per student for an exam."
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: label }),
    children
  ] });
}
export {
  Page as component
};
