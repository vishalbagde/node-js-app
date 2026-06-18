import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { a as getMyStudent } from "./portal-data-BBKxYORx.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
function Page() {
  const {
    data: s,
    isLoading
  } = useQuery({
    queryKey: ["my-student"],
    queryFn: getMyStudent
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "Loading…" });
  if (!s) return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "No student profile is linked to your account. Please ask the institute to link your enrollment." });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-lg font-semibold", children: "My Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-3 gap-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Enrollment #", value: s.enrollment_no }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Name", value: s.full_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Mobile", value: s.mobile }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Email", value: s.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "DOB", value: s.dob }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Gender", value: s.gender }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Admission", value: s.admission_date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Status", value: s.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Address", value: s.address })
    ] })
  ] }) });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "col-span-2 font-medium", children: value || "—" })
  ] });
}
export {
  Page as component
};
