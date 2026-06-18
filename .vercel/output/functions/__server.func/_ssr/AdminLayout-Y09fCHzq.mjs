import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useLocation, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { s as signOut } from "./use-auth-C1_fEVOJ.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { f as Menu, G as GraduationCap, X, g as LayoutDashboard, U as Users, h as UserCog, B as BookOpen, e as CalendarDays, d as ClipboardCheck, F as FileText, i as ClipboardList, I as IndianRupee, a as Award, M as MessagesSquare, S as Settings, L as LogOut } from "../_libs/lucide-react.mjs";
const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/students", label: "Students", icon: GraduationCap },
  { to: "/admin/parents", label: "Parents", icon: Users },
  { to: "/admin/staff", label: "Staff", icon: UserCog },
  { to: "/admin/courses", label: "Courses", icon: BookOpen },
  { to: "/admin/batches", label: "Batches", icon: CalendarDays },
  { to: "/admin/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/admin/exams", label: "Exams", icon: FileText },
  { to: "/admin/marks", label: "Marks Entry", icon: ClipboardList },
  { to: "/admin/fees", label: "Fees", icon: IndianRupee },
  { to: "/admin/certificates", label: "Certificates", icon: Award },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessagesSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings }
];
function AdminLayout({ children, title, action }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-muted/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, { open, onClose: () => setOpen(false) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "lg:hidden", onClick: () => setOpen(true), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: action })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-w-0 flex-1 p-4 lg:p-6", children })
    ] })
  ] });
}
function Sidebar({ open, onClose }) {
  const { pathname } = useLocation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 bg-black/40 lg:hidden", onClick: onClose }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: cn(
      "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
      open ? "translate-x-0" : "-translate-x-full"
    ), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-14 items-center justify-between border-b border-sidebar-border px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-md bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold", children: "Smart Anonymous" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] opacity-70", children: "Admin Panel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "text-sidebar-foreground hover:bg-white/10 lg:hidden", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto p-2", children: NAV.map((n) => {
        const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
        const Icon = n.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: n.to,
            onClick: onClose,
            className: cn(
              "mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
              active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-white/10"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
              " ",
              n.label
            ]
          },
          n.to
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-sidebar-border p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => signOut(), className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sign out"
      ] }) })
    ] })
  ] });
}
export {
  AdminLayout as A
};
