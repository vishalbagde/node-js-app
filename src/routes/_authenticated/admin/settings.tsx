import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/settings")({ component: Page });

function Page() {
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ["settings"], queryFn: async () => (await supabase.from("settings").select("*").limit(1).maybeSingle()).data });
  const [form, setForm] = useState<any>({});
  useEffect(() => { if (data) setForm(data); }, [data]);

  const save = async () => {
    if (!form?.id) return;
    const { id, ...rest } = form;
    const { error } = await supabase.from("settings").update(rest).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Settings saved.");
    qc.invalidateQueries({ queryKey: ["settings"] });
  };

  if (!data) return <AdminLayout title="Settings"><Card className="p-6">Loading…</Card></AdminLayout>;
  return (
    <AdminLayout title="Institute Settings">
      <Card className="grid gap-4 p-6 sm:grid-cols-2">
        <F label="Institute name"><Input value={form.institute_name ?? ""} onChange={(e) => setForm({ ...form, institute_name: e.target.value })} /></F>
        <F label="Logo URL"><Input value={form.logo_url ?? ""} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} /></F>
        <F label="Primary color"><Input type="color" value={form.primary_color ?? "#2563eb"} onChange={(e) => setForm({ ...form, primary_color: e.target.value })} /></F>
        <F label="Secondary color"><Input type="color" value={form.secondary_color ?? "#06b6d4"} onChange={(e) => setForm({ ...form, secondary_color: e.target.value })} /></F>
        <F label="Theme mode">
          <select className="h-10 rounded-md border bg-background px-3 text-sm" value={form.theme_mode ?? "light"} onChange={(e) => setForm({ ...form, theme_mode: e.target.value })}>
            <option value="light">Light</option><option value="dark">Dark</option>
          </select>
        </F>
        <F label="Contact phone"><Input value={form.contact_phone ?? ""} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></F>
        <F label="Contact email"><Input value={form.contact_email ?? ""} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} /></F>
        <div className="sm:col-span-2"><F label="Address"><Input value={form.address ?? ""} onChange={(e) => setForm({ ...form, address: e.target.value })} /></F></div>
        <div className="sm:col-span-2"><Button onClick={save}>Save settings</Button></div>
      </Card>
    </AdminLayout>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="grid gap-1.5"><Label>{label}</Label>{children}</div>;
}
