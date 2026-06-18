import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { C as Card } from "./card-RGlIzTYo.mjs";
import { L as Label, I as Input } from "./label-4pBKAOFV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { s as supabase } from "./client-SJLpyyNw.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { G as GraduationCap, A as ArrowRight, B as BookOpen, U as Users, a as Award, C as CircleCheck } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
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
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Features, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Courses, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InquirySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Header() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex h-16 items-center justify-between px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-md text-primary-foreground", style: {
        background: "var(--gradient-brand)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: "Smart Anonymous" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Computer Class" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden gap-6 text-sm md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#courses", className: "text-muted-foreground hover:text-foreground", children: "Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "text-muted-foreground hover:text-foreground", children: "Features" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#inquiry", className: "text-muted-foreground hover:text-foreground", children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "hidden sm:inline-flex", children: "Student / Parent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "Sign in" }) })
    ] })
  ] }) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 opacity-50", style: {
      background: "radial-gradient(ellipse at top, oklch(0.93 0.06 245), transparent 60%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20 md:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
        " Admissions open · New batch this month"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-balance text-4xl font-bold tracking-tight md:text-6xl", children: [
        "Build a career in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent", style: {
          backgroundImage: "var(--gradient-brand)"
        }, children: "computers" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-pretty text-lg text-muted-foreground", children: "Industry-grade training in programming, office automation, accounting, and design — taught by experienced instructors at Smart Anonymous Computer Class." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#inquiry", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", children: [
          "Enquire now ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#courses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", children: "Browse courses" }) })
      ] })
    ] }) })
  ] });
}
function Features() {
  const items = [{
    icon: BookOpen,
    title: "20+ courses",
    desc: "From basic computing to advanced programming and design."
  }, {
    icon: Users,
    title: "Expert faculty",
    desc: "Industry-experienced instructors and small batch sizes."
  }, {
    icon: Award,
    title: "Certification",
    desc: "Get a recognised certificate on course completion."
  }, {
    icon: CircleCheck,
    title: "Job assistance",
    desc: "Resume workshops and placement support."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "border-y bg-card/50 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4", children: items.map(({
    icon: Icon,
    title,
    desc
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-3 h-6 w-6 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 font-semibold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: desc })
  ] }, title)) }) });
}
function Courses() {
  const list = [{
    name: "Diploma in Computer Application",
    duration: "6 months",
    topics: "Office, Internet, Tally"
  }, {
    name: "Web Development",
    duration: "4 months",
    topics: "HTML, CSS, JS, React"
  }, {
    name: "Python Programming",
    duration: "3 months",
    topics: "Basics → Data Science"
  }, {
    name: "Tally with GST",
    duration: "2 months",
    topics: "Accounting + GST"
  }, {
    name: "Graphic Design",
    duration: "3 months",
    topics: "Photoshop, Illustrator"
  }, {
    name: "MS Office Advanced",
    duration: "2 months",
    topics: "Word, Excel, PowerPoint"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "courses", className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Popular courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Choose a path that matches your goals." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: list.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 transition hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 text-xs font-medium text-primary", children: c.duration }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: c.topics })
    ] }, c.name)) })
  ] }) });
}
function InquirySection() {
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    full_name: "",
    mobile: "",
    email: "",
    course_interest: "",
    message: ""
  });
  const submit = async (e) => {
    e.preventDefault();
    if (form.full_name.trim().length < 2 || form.mobile.trim().length < 7) {
      toast.error("Please enter your name and a valid mobile number.");
      return;
    }
    setSubmitting(true);
    const {
      error
    } = await supabase.from("inquiries").insert({
      ...form,
      status: "new"
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Thanks! We'll contact you shortly.");
    setForm({
      full_name: "",
      mobile: "",
      email: "",
      course_interest: "",
      message: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "inquiry", className: "bg-card/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto grid gap-10 px-4 lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Get in touch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Drop your details — our counsellor will call you back with course details, fees and batch timings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "grid gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name, onChange: (e) => setForm({
          ...form,
          full_name: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Mobile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.mobile, onChange: (e) => setForm({
            ...form,
            mobile: e.target.value
          }), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", value: form.email, onChange: (e) => setForm({
            ...form,
            email: e.target.value
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Course interested in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.course_interest, onChange: (e) => setForm({
          ...form,
          course_interest: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, value: form.message, onChange: (e) => setForm({
          ...form,
          message: e.target.value
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, children: submitting ? "Sending…" : "Submit inquiry" })
    ] }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto flex flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Smart Anonymous Computer Class"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Modern computer training · India" })
  ] }) });
}
export {
  Landing as component
};
