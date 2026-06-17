import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ReactNode } from "react";

export type Column<T> = { key: keyof T | string; label: string; render?: (row: T) => ReactNode };

type Props<T extends { id: string }> = {
  table: string;
  columns: Column<T>[];
  searchFields?: (keyof T)[];
  orderBy?: { column: string; ascending?: boolean };
  renderForm: (state: Partial<T>, set: (s: Partial<T>) => void) => ReactNode;
  emptyForm: Partial<T>;
  title: string;
  beforeSave?: (s: Partial<T>) => Partial<T>;
};

export function CrudTable<T extends { id: string }>(p: Props<T>) {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<T> | null>(null);

  const sb = supabase as any;
  const { data: rows = [], isLoading } = useQuery({
    queryKey: [p.table],
    queryFn: async () => {
      let q = sb.from(p.table).select("*");
      if (p.orderBy) q = q.order(p.orderBy.column, { ascending: p.orderBy.ascending ?? false });
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as T[];
    },
  });

  const filtered = rows.filter((r) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (p.searchFields ?? []).some((f) => String((r as any)[f] ?? "").toLowerCase().includes(s));
  });

  const save = async () => {
    if (!editing) return;
    const payload: any = p.beforeSave ? p.beforeSave(editing) : editing;
    const { id, ...rest } = payload;
    const op = id
      ? sb.from(p.table).update(rest).eq("id", id)
      : sb.from(p.table).insert(rest);
    const { error } = await op;
    if (error) { toast.error(error.message); return; }
    toast.success(id ? "Updated" : "Created");
    setOpen(false); setEditing(null);
    qc.invalidateQueries({ queryKey: [p.table] });
    qc.invalidateQueries({ queryKey: ["dashboard-stats"] });
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this record?")) return;
    const { error } = await sb.from(p.table).delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: [p.table] });
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-wrap items-center gap-2 p-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditing({ ...p.emptyForm })} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing && (editing as any).id ? "Edit" : "New"} {p.title}</DialogTitle></DialogHeader>
            <div className="grid gap-3 py-2">{editing && p.renderForm(editing, (s) => setEditing({ ...editing, ...s }))}</div>
            <DialogFooter><Button onClick={save}>Save</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                {p.columns.map((c) => <th key={String(c.key)} className="px-4 py-2.5 font-medium">{c.label}</th>)}
                <th className="px-4 py-2.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={p.columns.length + 1} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={p.columns.length + 1} className="px-4 py-10 text-center text-muted-foreground">No records yet.</td></tr>
              )}
              {filtered.map((row) => (
                <tr key={row.id} className="border-t hover:bg-muted/30">
                  {p.columns.map((c) => (
                    <td key={String(c.key)} className="px-4 py-2.5">
                      {c.render ? c.render(row) : String((row as any)[c.key] ?? "—")}
                    </td>
                  ))}
                  <td className="px-4 py-2.5 text-right">
                    <Button size="icon" variant="ghost" onClick={() => { setEditing(row); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(row.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
