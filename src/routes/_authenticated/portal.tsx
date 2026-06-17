import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { GraduationCap, User, ClipboardCheck, IndianRupee, Award, BookOpen, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/use-auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/portal")({
  component: PortalLayout,
});

const NAV = [
  { to: "/portal", label: "Profile", icon: User, exact: true },
  { to: "/portal/attendance", label: "Attendance", icon: ClipboardCheck },
  { to: "/portal/fees", label: "Fees", icon: IndianRupee },
  { to: "/portal/exams", label: "Exam Results", icon: BookOpen },
  { to: "/portal/certificates", label: "Certificates", icon: Award },
];

function PortalLayout() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-14 items-center gap-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="text-sm font-bold">Student Portal</div>
          </Link>
          <Button variant="ghost" size="sm" className="ml-auto gap-1" onClick={() => signOut()}><LogOut className="h-4 w-4" /> Sign out</Button>
        </div>
        <nav className="container mx-auto flex gap-1 overflow-x-auto px-4 pb-2">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link key={n.to} to={n.to as any} className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm",
                active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              )}><Icon className="h-4 w-4" />{n.label}</Link>
            );
          })}
        </nav>
      </header>
      <main className="container mx-auto p-4 lg:p-6"><Outlet /></main>
    </div>
  );
}
