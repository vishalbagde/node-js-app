import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { I as Input, L as Label } from "./label-4pBKAOFV.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
  const {
    data
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => (await supabase.from("settings").select("*").limit(1).maybeSingle()).data
  });
  const [form, setForm] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (data) setForm(data);
  }, [data]);
  const save = async () => {
    if (!form?.id) return;
    const {
      id,
      ...rest
    } = form;
    const {
      error
    } = await supabase.from("settings").update(rest).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Settings saved.");
    qc.invalidateQueries({
      queryKey: ["settings"]
    });
  };
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: "Loading…" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Institute Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "grid gap-4 p-6 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Institute name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.institute_name ?? "", onChange: (e) => setForm({
      ...form,
      institute_name: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Logo URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.logo_url ?? "", onChange: (e) => setForm({
      ...form,
      logo_url: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Primary color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "color", value: form.primary_color ?? "#2563eb", onChange: (e) => setForm({
      ...form,
      primary_color: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Secondary color", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "color", value: form.secondary_color ?? "#06b6d4", onChange: (e) => setForm({
      ...form,
      secondary_color: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Theme mode", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: form.theme_mode ?? "light", onChange: (e) => setForm({
      ...form,
      theme_mode: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "light", children: "Light" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "dark", children: "Dark" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Contact phone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.contact_phone ?? "", onChange: (e) => setForm({
      ...form,
      contact_phone: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Contact email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.contact_email ?? "", onChange: (e) => setForm({
      ...form,
      contact_email: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(F, { label: "Address", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.address ?? "", onChange: (e) => setForm({
      ...form,
      address: e.target.value
    }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: save, children: "Save settings" }) })
  ] }) });
}
function F({
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
