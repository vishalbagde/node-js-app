import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { GraduationCap } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Smart Anonymous Computer Class" }] }),
  component: AuthPage,
});

async function routeByRole(navigate: ReturnType<typeof useNavigate>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: roles = [] } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  const r = (roles ?? []).map((x: any) => x.role);
  if (r.includes("admin") || r.includes("staff") || r.includes("teacher") || r.includes("accountant") || r.includes("receptionist")) {
    navigate({ to: "/admin", replace: true });
  } else if (r.includes("parent")) {
    navigate({ to: "/parent", replace: true });
  } else {
    navigate({ to: "/portal", replace: true });
  }
}

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => { if (s?.user) routeByRole(navigate); });
    supabase.auth.getUser().then(({ data }) => { if (data.user) routeByRole(navigate); });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Welcome back!");
  };
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/portal" } });
    setBusy(false);
    if (error) toast.error(error.message); else toast.success("Account created.");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background via-accent/30 to-background px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-md text-primary-foreground" style={{ background: "var(--gradient-brand)" }}>
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold">Smart Anonymous</div>
            <div className="text-xs text-muted-foreground">Computer Class</div>
          </div>
        </Link>
        <Card className="p-6">
          <h1 className="mb-1 text-2xl font-bold">Sign in</h1>
          <p className="mb-6 text-sm text-muted-foreground">Admin, Staff, Student or Parent — sign in with your email.</p>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2"><TabsTrigger value="signin">Sign in</TabsTrigger><TabsTrigger value="signup">Create account</TabsTrigger></TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="mt-4 grid gap-3">
                <div className="grid gap-2"><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between"><Label>Password</Label><Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link></div>
                  <Input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
                <p className="text-center text-xs text-muted-foreground">Default admin: <code>admin@smartanonymous.com</code> / <code>Admin@123</code></p>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="mt-4 grid gap-3">
                <div className="grid gap-2"><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div className="grid gap-2"><Label>Password</Label><Input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <Button type="submit" disabled={busy}>{busy ? "Creating…" : "Create account"}</Button>
                <p className="text-xs text-muted-foreground">New accounts default to <b>Student</b>. The institute admin links you to a student record.</p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
