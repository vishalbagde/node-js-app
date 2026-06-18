import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as CrudTable } from "./CrudTable-BMa4WaXK.mjs";
import { I as Input, L as Label } from "./label-4pBKAOFV.mjs";
import "../_libs/sonner.mjs";
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
import "./client-SJLpyyNw.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-label.mjs";
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Staff", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CrudTable, { table: "staff", title: "staff", orderBy: {
    column: "created_at"
  }, searchFields: ["full_name", "mobile", "designation"], emptyForm: {
    full_name: ""
  }, columns: [{
    key: "full_name",
    label: "Name"
  }, {
    key: "designation",
    label: "Designation"
  }, {
    key: "mobile",
    label: "Mobile"
  }, {
    key: "joining_date",
    label: "Joined"
  }, {
    key: "salary",
    label: "Salary",
    render: (r) => r.salary ? "₹" + Number(r.salary).toLocaleString("en-IN") : "—"
  }], renderForm: (s, set) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.full_name ?? "", onChange: (e) => set({
      full_name: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Designation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.designation ?? "", onChange: (e) => set({
      designation: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Mobile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.mobile ?? "", onChange: (e) => set({
      mobile: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.email ?? "", onChange: (e) => set({
      email: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Joining date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.joining_date ?? "", onChange: (e) => set({
      joining_date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Salary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.salary ?? 0, onChange: (e) => set({
      salary: Number(e.target.value)
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
