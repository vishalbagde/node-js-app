import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — Smart Anonymous" }] }),
  component: Page,
});

function Page() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/reset-password",
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Reset link sent. Check your email.");
  };
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background via-accent/30 to-background px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Forgot your password?</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your email — we'll send a reset link.</p>
        {sent ? (
          <p className="mt-6 rounded-md border bg-muted/40 p-4 text-sm">If an account exists for <b>{email}</b>, a reset link is on its way.</p>
        ) : (
          <form onSubmit={submit} className="mt-6 grid gap-3">
            <div className="grid gap-2"><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <Button type="submit" disabled={busy}>{busy ? "Sending…" : "Send reset link"}</Button>
          </form>
        )}
        <div className="mt-4 text-center text-sm"><Link to="/auth" className="text-primary hover:underline">Back to sign in</Link></div>
      </Card>
    </div>
  );
}
