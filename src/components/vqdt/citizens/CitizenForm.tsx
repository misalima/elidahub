"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2 } from "lucide-react";


export function CitizenForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  isBusy,
  phoneError,
}: {
  form: { full_name: string; phone: string; email?: string; observations?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isBusy: boolean;
  phoneError: string | null;
}) {
  return (
  <form onSubmit={onSubmit} className="mb-4 bg-card border rounded-xl p-6 shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className="text-sm font-medium">Nome completo</label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Nome completo"
            value={form.full_name}
            onChange={onChange}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
          <Input
            id="phone"
            name="phone"
            placeholder="Telefone (ex: 11987654321)"
            value={form.phone}
            onChange={onChange}
            required
            maxLength={11}
            pattern="\d{11}"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">Email <span className="text-muted-foreground">(opcional)</span></label>
          <Input
            id="email"
            name="email"
            placeholder="Email (opcional)"
            value={form.email ?? ""}
            onChange={onChange}
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="observations" className="text-sm font-medium">Observações <span className="text-muted-foreground">(opcional)</span></label>
          <Textarea
            id="observations"
            name="observations"
            placeholder="Observações (opcional)"
            value={form.observations ?? ""}
            onChange={onChange}
            className="resize-y min-h-[48px]"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-6 justify-end">
        <Button type="submit" disabled={isBusy} className="flex items-center gap-1">
          <UserPlus className="w-4 h-4" />
          Salvar
          {isBusy && <Loader2 className="w-4 h-4 animate-spin" />}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isBusy}>
          Cancelar
        </Button>
      </div>
      {phoneError && <div className="text-red-500 mt-2">{phoneError}</div>}
    </form>
  );
}
