import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { A as AdminLayout } from "./AdminLayout-Y09fCHzq.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { L as Label, I as Input } from "./label-4pBKAOFV.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
  const [examId, setExamId] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("Overall");
  const [maxMarks, setMaxMarks] = reactExports.useState(100);
  const {
    data: exams = []
  } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => (await supabase.from("exams").select("id, name, exam_date, batch_id, max_marks").order("exam_date", {
      ascending: false
    })).data ?? []
  });
  const exam = exams.find((e) => e.id === examId);
  const {
    data: students = []
  } = useQuery({
    queryKey: ["batch-students", exam?.batch_id],
    queryFn: async () => {
      if (!exam?.batch_id) return (await supabase.from("students").select("id, full_name, enrollment_no")).data ?? [];
      return (await supabase.from("students").select("id, full_name, enrollment_no").eq("batch_id", exam.batch_id)).data ?? [];
    },
    enabled: !!examId
  });
  const {
    data: existing = []
  } = useQuery({
    queryKey: ["marks", examId, subject],
    queryFn: async () => (await supabase.from("exam_marks").select("*").eq("exam_id", examId).eq("subject", subject)).data ?? [],
    enabled: !!examId
  });
  const [marks, setMarks] = reactExports.useState({});
  const get = (sid) => marks[sid] ?? existing.find((m) => m.student_id === sid)?.marks_obtained ?? "";
  const save = async () => {
    if (!examId) return toast.error("Pick an exam first.");
    const rows = students.filter((s) => marks[s.id] != null && !Number.isNaN(marks[s.id])).map((s) => {
      const ex = existing.find((m) => m.student_id === s.id);
      return {
        id: ex?.id,
        exam_id: examId,
        student_id: s.id,
        subject,
        max_marks: maxMarks,
        marks_obtained: marks[s.id]
      };
    });
    if (rows.length === 0) return toast.error("Enter at least one mark.");
    const {
      error
    } = await supabase.from("exam_marks").upsert(rows.map(({
      id,
      ...r
    }) => id ? {
      id,
      ...r
    } : r));
    if (error) return toast.error(error.message);
    toast.success("Marks saved.");
    setMarks({});
    qc.invalidateQueries({
      queryKey: ["marks", examId, subject]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { title: "Marks Entry", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "grid gap-3 p-4 sm:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Exam" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "h-10 rounded-md border bg-background px-3 text-sm", value: examId, onChange: (e) => {
          setExamId(e.target.value);
          const ex = exams.find((x) => x.id === e.target.value);
          if (ex) setMaxMarks(Number(ex.max_marks));
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— select exam —" }),
          exams.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: e.id, children: [
            e.name,
            " (",
            e.exam_date,
            ")"
          ] }, e.id))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subject, onChange: (e) => setSubject(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Max marks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: maxMarks, onChange: (e) => setMaxMarks(Number(e.target.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: save, disabled: !examId, children: "Save marks" }) })
    ] }),
    examId && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4 overflow-x-auto p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/50 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Enroll #" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2", children: "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "px-4 py-2", children: [
          "Marks (of ",
          maxMarks,
          ")"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "px-4 py-6 text-center text-muted-foreground", children: "No students for this batch." }) }),
        students.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: s.enrollment_no }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: s.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", className: "max-w-[120px]", value: get(s.id), onChange: (e) => setMarks({
            ...marks,
            [s.id]: Number(e.target.value)
          }) }) })
        ] }, s.id))
      ] })
    ] }) })
  ] });
}
export {
  Page as component
};
