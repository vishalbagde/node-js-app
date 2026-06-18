import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as CrudTable } from "./CrudTable-BMa4WaXK.mjs";
import { I as Input, L as Label } from "./label-4pBKAOFV.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
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
    data: students = []
  } = useQuery({
    queryKey: ["students-min"],
    queryFn: async () => (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Fees", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CrudTable, { table: "fees", title: "fee record", orderBy: {
    column: "created_at"
  }, searchFields: ["receipt_no", "fee_type"], emptyForm: {
    amount: 0,
    fee_type: "monthly",
    payment_mode: "cash",
    status: "pending",
    receipt_no: "RC" + Date.now().toString().slice(-6)
  }, columns: [{
    key: "receipt_no",
    label: "Receipt"
  }, {
    key: "student_id",
    label: "Student",
    render: (r) => students.find((s) => s.id === r.student_id)?.full_name ?? "—"
  }, {
    key: "fee_type",
    label: "Type"
  }, {
    key: "amount",
    label: "Amount",
    render: (r) => "₹" + Number(r.amount).toLocaleString("en-IN")
  }, {
    key: "status",
    label: "Status",
    render: (r) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: r.status === "paid" ? "default" : r.status === "overdue" ? "destructive" : "secondary", children: r.status })
  }, {
    key: "paid_date",
    label: "Paid on"
  }], renderForm: (s, set) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Student", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.student_id ?? "", onChange: (e) => set({
      student_id: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select…" }),
      students.map((st) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: st.id, children: [
        st.enrollment_no,
        " · ",
        st.full_name
      ] }, st.id))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Receipt #", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.receipt_no ?? "", onChange: (e) => set({
      receipt_no: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Amount (₹)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: s.amount ?? 0, onChange: (e) => set({
      amount: Number(e.target.value)
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Type", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.fee_type ?? "monthly", onChange: (e) => set({
      fee_type: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "monthly" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "installment" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "admission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "exam" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Payment mode", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.payment_mode ?? "cash", onChange: (e) => set({
      payment_mode: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "cash" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "upi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "bank" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Status", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: s.status ?? "pending", onChange: (e) => set({
      status: e.target.value
    }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "pending" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "paid" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "overdue" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Due date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.due_date ?? "", onChange: (e) => set({
      due_date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Paid date", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: s.paid_date ?? "", onChange: (e) => set({
      paid_date: e.target.value
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Remarks", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: s.remarks ?? "", onChange: (e) => set({
      remarks: e.target.value
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
