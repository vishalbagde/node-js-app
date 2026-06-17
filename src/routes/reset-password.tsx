import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — Smart Anonymous" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters.");
    if (password !== confirm) return toast.error("Passwords don't match.");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. Please sign in.");
    await supabase.auth.signOut();
    nav({ to: "/auth", replace: true });
  };

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-background via-accent/30 to-background px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Choose a strong password you haven't used before.</p>
        <form onSubmit={submit} className="mt-6 grid gap-3">
          <div className="grid gap-2"><Label>New password</Label><Input type="password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <div className="grid gap-2"><Label>Confirm password</Label><Input type="password" minLength={8} required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
          <Button type="submit" disabled={busy}>{busy ? "Updating…" : "Update password"}</Button>
        </form>
      </Card>
    </div>
  );
}
