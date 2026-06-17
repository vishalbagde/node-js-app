import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import {
  LayoutDashboard, Users, UserCog, GraduationCap, BookOpen, CalendarDays,
  ClipboardCheck, IndianRupee, Award, MessagesSquare, LogOut, Menu, X,
  FileText, Settings, ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/use-auth";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const NAV: NavItem[] = [
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
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout({ children, title, action }: { children: ReactNode; title: string; action?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(true)}><Menu className="h-5 w-5" /></Button>
          <h1 className="text-base font-semibold">{title}</h1>
          <div className="ml-auto flex items-center gap-2">{action}</div>
        </header>
        <main className="min-w-0 flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { pathname } = useLocation();
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-white/10"><GraduationCap className="h-4 w-4" /></div>
            <div className="leading-tight">
              <div className="text-xs font-bold">Smart Anonymous</div>
              <div className="text-[10px] opacity-70">Admin Panel</div>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-white/10 lg:hidden" onClick={onClose}><X className="h-4 w-4" /></Button>
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          {NAV.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link key={n.to} to={n.to as any} onClick={onClose}
                className={cn(
                  "mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                  active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-white/10"
                )}>
                <Icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <button onClick={() => signOut()} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
