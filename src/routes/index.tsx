import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  GraduationCap, BookOpen, Award, Users, ArrowRight, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Anonymous Computer Class — Modern Computer Training Institute" },
      { name: "description", content: "Industry-ready computer training: programming, office automation, accounting, web design & more. Join 1000+ alumni." },
      { property: "og:title", content: "Smart Anonymous Computer Class" },
      { property: "og:description", content: "Modern computer training institute. Admissions open." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Courses />
      <InquirySection />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">Smart Anonymous</div>
            <div className="text-xs text-muted-foreground">Computer Class</div>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#courses" className="text-muted-foreground hover:text-foreground">Courses</a>
          <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <a href="#inquiry" className="text-muted-foreground hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth"><Button variant="ghost" size="sm" className="hidden sm:inline-flex">Student / Parent</Button></Link>
          <Link to="/auth"><Button size="sm">Sign in</Button></Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-50" style={{ background: "radial-gradient(ellipse at top, oklch(0.93 0.06 245), transparent 60%)" }} />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> Admissions open · New batch this month
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Build a career in <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-brand)" }}>computers</span>.
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Industry-grade training in programming, office automation, accounting, and design — taught by experienced instructors at Smart Anonymous Computer Class.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#inquiry"><Button size="lg" className="gap-2">Enquire now <ArrowRight className="h-4 w-4" /></Button></a>
            <a href="#courses"><Button size="lg" variant="outline">Browse courses</Button></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: BookOpen, title: "20+ courses", desc: "From basic computing to advanced programming and design." },
    { icon: Users, title: "Expert faculty", desc: "Industry-experienced instructors and small batch sizes." },
    { icon: Award, title: "Certification", desc: "Get a recognised certificate on course completion." },
    { icon: CheckCircle2, title: "Job assistance", desc: "Resume workshops and placement support." },
  ];
  return (
    <section id="features" className="border-y bg-card/50 py-16">
      <div className="container mx-auto grid gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="p-6">
            <Icon className="mb-3 h-6 w-6 text-primary" />
            <h3 className="mb-1 font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Courses() {
  const list = [
    { name: "Diploma in Computer Application", duration: "6 months", topics: "Office, Internet, Tally" },
    { name: "Web Development", duration: "4 months", topics: "HTML, CSS, JS, React" },
    { name: "Python Programming", duration: "3 months", topics: "Basics → Data Science" },
    { name: "Tally with GST", duration: "2 months", topics: "Accounting + GST" },
    { name: "Graphic Design", duration: "3 months", topics: "Photoshop, Illustrator" },
    { name: "MS Office Advanced", duration: "2 months", topics: "Word, Excel, PowerPoint" },
  ];
  return (
    <section id="courses" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Popular courses</h2>
          <p className="mt-2 text-muted-foreground">Choose a path that matches your goals.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Card key={c.name} className="p-6 transition hover:shadow-md">
              <div className="mb-3 text-xs font-medium text-primary">{c.duration}</div>
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.topics}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquirySection() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ full_name: "", mobile: "", email: "", course_interest: "", message: "" });
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.full_name.trim().length < 2 || form.mobile.trim().length < 7) {
      toast.error("Please enter your name and a valid mobile number.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({ ...form, status: "new" });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Thanks! We'll contact you shortly.");
    setForm({ full_name: "", mobile: "", email: "", course_interest: "", message: "" });
  };
  return (
    <section id="inquiry" className="bg-card/50 py-20">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
          <p className="mt-2 text-muted-foreground">Drop your details — our counsellor will call you back with course details, fees and batch timings.</p>
        </div>
        <Card className="p-6">
          <form onSubmit={submit} className="grid gap-4">
            <div className="grid gap-2"><Label>Full name</Label><Input value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} required /></div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="grid gap-2"><Label>Mobile</Label><Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required /></div>
              <div className="grid gap-2"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            </div>
            <div className="grid gap-2"><Label>Course interested in</Label><Input value={form.course_interest} onChange={(e) => setForm({ ...form, course_interest: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Message</Label><Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <Button type="submit" disabled={submitting}>{submitting ? "Sending…" : "Submit inquiry"}</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row">
        <div>© {new Date().getFullYear()} Smart Anonymous Computer Class</div>
        <div>Modern computer training · India</div>
      </div>
    </footer>
  );
}
