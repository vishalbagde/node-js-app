import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-AdAqaBtK.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$r = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "theme-color", content: "#2563eb" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/favicon.ico" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$r.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$q = () => import("./reset-password-DFkAsJaY.mjs");
const Route$q = createFileRoute("/reset-password")({
  head: () => ({
    meta: [{
      title: "Reset password — Smart Anonymous"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./forgot-password-DFsDtwYj.mjs");
const Route$p = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Forgot password — Smart Anonymous"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./auth-DS9g7bTs.mjs");
const Route$o = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in — Smart Anonymous Computer Class"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./route-BFsOu0JM.mjs");
const Route$n = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const {
      data,
      error
    } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({
      to: "/auth"
    });
    return {
      user: data.user
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./index-B8oojgAx.mjs");
const Route$m = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Smart Anonymous Computer Class — Modern Computer Training Institute"
    }, {
      name: "description",
      content: "Industry-ready computer training: programming, office automation, accounting, web design & more. Join 1000+ alumni."
    }, {
      property: "og:title",
      content: "Smart Anonymous Computer Class"
    }, {
      property: "og:description",
      content: "Modern computer training institute. Admissions open."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./verify._code-BcCgFSO1.mjs");
const Route$l = createFileRoute("/verify/$code")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Verify certificate ${params.code}`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./portal-Bs-rLDMe.mjs");
const Route$k = createFileRoute("/_authenticated/portal")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./parent-BXxvA7tt.mjs");
const Route$j = createFileRoute("/_authenticated/parent")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./route-DWQrCpgz.mjs");
const Route$i = createFileRoute("/_authenticated/admin")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./portal.index-DaX8VCIt.mjs");
const Route$h = createFileRoute("/_authenticated/portal/")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./index-CFFVvJw8.mjs");
const Route$g = createFileRoute("/_authenticated/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./portal.fees-DTUFZTPB.mjs");
const Route$f = createFileRoute("/_authenticated/portal/fees")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./portal.exams-XJ5PWoO3.mjs");
const Route$e = createFileRoute("/_authenticated/portal/exams")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./portal.certificates-Ba1wt6-7.mjs");
const Route$d = createFileRoute("/_authenticated/portal/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./portal.attendance-Bbif_C9i.mjs");
const Route$c = createFileRoute("/_authenticated/portal/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./students-Dj4E0KoJ.mjs");
const Route$b = createFileRoute("/_authenticated/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./staff-BZyOGWjs.mjs");
const Route$a = createFileRoute("/_authenticated/admin/staff")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./settings-Bh1EUaRX.mjs");
const Route$9 = createFileRoute("/_authenticated/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./parents-iebD2mjk.mjs");
const Route$8 = createFileRoute("/_authenticated/admin/parents")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./marks-DPxLHOBu.mjs");
const Route$7 = createFileRoute("/_authenticated/admin/marks")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./inquiries-Bs2No6tW.mjs");
const Route$6 = createFileRoute("/_authenticated/admin/inquiries")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./fees-YanZZf9X.mjs");
const Route$5 = createFileRoute("/_authenticated/admin/fees")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./exams-CnCE3oAg.mjs");
const Route$4 = createFileRoute("/_authenticated/admin/exams")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./courses-LIv4xvj3.mjs");
const Route$3 = createFileRoute("/_authenticated/admin/courses")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./certificates-DbiaoJrK.mjs");
const Route$2 = createFileRoute("/_authenticated/admin/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./batches-DPKQIZke.mjs");
const Route$1 = createFileRoute("/_authenticated/admin/batches")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./attendance-B3prQRTa.mjs");
const Route = createFileRoute("/_authenticated/admin/attendance")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResetPasswordRoute = Route$q.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$r
});
const ForgotPasswordRoute = Route$p.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$r
});
const AuthRoute = Route$o.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$r
});
const AuthenticatedRouteRoute = Route$n.update({
  id: "/_authenticated",
  getParentRoute: () => Route$r
});
const IndexRoute = Route$m.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$r
});
const VerifyCodeRoute = Route$l.update({
  id: "/verify/$code",
  path: "/verify/$code",
  getParentRoute: () => Route$r
});
const AuthenticatedPortalRoute = Route$k.update({
  id: "/portal",
  path: "/portal",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedParentRoute = Route$j.update({
  id: "/parent",
  path: "/parent",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedAdminRouteRoute = Route$i.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => AuthenticatedRouteRoute
});
const AuthenticatedPortalIndexRoute = Route$h.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedPortalRoute
});
const AuthenticatedAdminIndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedPortalFeesRoute = Route$f.update({
  id: "/fees",
  path: "/fees",
  getParentRoute: () => AuthenticatedPortalRoute
});
const AuthenticatedPortalExamsRoute = Route$e.update({
  id: "/exams",
  path: "/exams",
  getParentRoute: () => AuthenticatedPortalRoute
});
const AuthenticatedPortalCertificatesRoute = Route$d.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => AuthenticatedPortalRoute
});
const AuthenticatedPortalAttendanceRoute = Route$c.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => AuthenticatedPortalRoute
});
const AuthenticatedAdminStudentsRoute = Route$b.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminStaffRoute = Route$a.update({
  id: "/staff",
  path: "/staff",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminSettingsRoute = Route$9.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminParentsRoute = Route$8.update({
  id: "/parents",
  path: "/parents",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminMarksRoute = Route$7.update({
  id: "/marks",
  path: "/marks",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminInquiriesRoute = Route$6.update({
  id: "/inquiries",
  path: "/inquiries",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminFeesRoute = Route$5.update({
  id: "/fees",
  path: "/fees",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminExamsRoute = Route$4.update({
  id: "/exams",
  path: "/exams",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminCoursesRoute = Route$3.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminCertificatesRoute = Route$2.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminBatchesRoute = Route$1.update({
  id: "/batches",
  path: "/batches",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminAttendanceRoute = Route.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => AuthenticatedAdminRouteRoute
});
const AuthenticatedAdminRouteRouteChildren = {
  AuthenticatedAdminAttendanceRoute,
  AuthenticatedAdminBatchesRoute,
  AuthenticatedAdminCertificatesRoute,
  AuthenticatedAdminCoursesRoute,
  AuthenticatedAdminExamsRoute,
  AuthenticatedAdminFeesRoute,
  AuthenticatedAdminInquiriesRoute,
  AuthenticatedAdminMarksRoute,
  AuthenticatedAdminParentsRoute,
  AuthenticatedAdminSettingsRoute,
  AuthenticatedAdminStaffRoute,
  AuthenticatedAdminStudentsRoute,
  AuthenticatedAdminIndexRoute
};
const AuthenticatedAdminRouteRouteWithChildren = AuthenticatedAdminRouteRoute._addFileChildren(
  AuthenticatedAdminRouteRouteChildren
);
const AuthenticatedPortalRouteChildren = {
  AuthenticatedPortalAttendanceRoute,
  AuthenticatedPortalCertificatesRoute,
  AuthenticatedPortalExamsRoute,
  AuthenticatedPortalFeesRoute,
  AuthenticatedPortalIndexRoute
};
const AuthenticatedPortalRouteWithChildren = AuthenticatedPortalRoute._addFileChildren(AuthenticatedPortalRouteChildren);
const AuthenticatedRouteRouteChildren = {
  AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRouteWithChildren,
  AuthenticatedParentRoute,
  AuthenticatedPortalRoute: AuthenticatedPortalRouteWithChildren
};
const AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
  AuthRoute,
  ForgotPasswordRoute,
  ResetPasswordRoute,
  VerifyCodeRoute
};
const routeTree = Route$r._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
