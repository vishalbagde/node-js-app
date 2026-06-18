import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useLocation, L as Link, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { s as signOut } from "./use-auth-C1_fEVOJ.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { G as GraduationCap, L as LogOut, c as User, d as ClipboardCheck, I as IndianRupee, B as BookOpen, a as Award } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
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
import "../_libs/tailwind-merge.mjs";
const NAV = [{
  to: "/portal",
  label: "Profile",
  icon: User,
  exact: true
}, {
  to: "/portal/attendance",
  label: "Attendance",
  icon: ClipboardCheck
}, {
  to: "/portal/fees",
  label: "Fees",
  icon: IndianRupee
}, {
  to: "/portal/exams",
  label: "Exam Results",
  icon: BookOpen
}, {
  to: "/portal/certificates",
  label: "Certificates",
  icon: Award
}];
function PortalLayout() {
  const {
    pathname
  } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-14 items-center gap-3 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-md text-primary-foreground", style: {
            background: "var(--gradient-brand)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Student Portal" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "ml-auto gap-1", onClick: () => signOut(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          " Sign out"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "container mx-auto flex gap-1 overflow-x-auto px-4 pb-2", children: NAV.map((n) => {
        const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
        const Icon = n.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: cn("flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm", active ? "bg-primary text-primary-foreground" : "hover:bg-muted"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          n.label
        ] }, n.to);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto p-4 lg:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  PortalLayout as component
};
