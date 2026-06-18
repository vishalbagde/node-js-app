import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useParams, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { G as GraduationCap, b as CircleX, C as CircleCheck } from "../_libs/lucide-react.mjs";
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
    code
  } = useParams({
    from: "/verify/$code"
  });
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["verify", code],
    queryFn: async () => {
      const {
        data: data2
      } = await supabase.from("certificates").select("*, student:students(full_name, enrollment_no), course:courses(name)").eq("certificate_no", code).maybeSingle();
      return data2;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center bg-gradient-to-br from-background via-accent/30 to-background px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg p-8 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-6 inline-flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-md text-primary-foreground", style: {
        background: "var(--gradient-brand)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: "Smart Anonymous Computer Class" })
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Verifying…" }),
    !isLoading && !data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "mx-auto h-10 w-10 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Certificate not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "No record matches ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: code }),
        "."
      ] })
    ] }),
    !isLoading && data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-10 w-10 text-success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold", children: "Certificate verified" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mx-auto grid max-w-sm grid-cols-2 gap-y-2 text-left text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Certificate #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.certificate_no }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.student?.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Enrollment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.student?.enrollment_no }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.course?.name || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Issued" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.issue_date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Grade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-medium", children: data.grade || "—" })
      ] })
    ] })
  ] }) });
}
export {
  Page as component
};
