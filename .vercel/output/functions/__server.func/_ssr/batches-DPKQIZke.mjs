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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Batches", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CrudTable, { table: "batches", title: "batch", orderBy: {
    column: "start_date"
  }, searchFields: ["name", "timing"], emptyForm: {
    name: "",
    start_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
    capacity: 30,
    course_id: ""
  }, columns: [{
    key: "name",
    label: "Batch"
  }, {
    key: "course_id",
    label: "Course",
    render: (r) => courses.find((c) => c.id === r.course_id)?.name ?? "—"
  }, {
    key: "start_date",
    label: "Start"
  }, {
    key: "timing",
    label: "Timing"
  }, {
    key: "capacity",
    label: "Capacity"
  }], renderForm: (s, set) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Batch name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.name ?? "", onChange: (e) => set({
      name: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Course", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.course_id ?? "", onChange: (e) => set({
      course_id: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select course" }),
      courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Start date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.start_date ?? "", onChange: (e) => set({
      start_date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "End date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.end_date ?? "", onChange: (e) => set({
      end_date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Timing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. 10:00 AM - 12:00 PM", value: s.timing ?? "", onChange: (e) => set({
      timing: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Capacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.capacity ?? 30, onChange: (e) => set({
      capacity: Number(e.target.value)
    }) }) })
  ] }) }) });
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
