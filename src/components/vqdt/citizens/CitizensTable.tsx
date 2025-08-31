"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { formatPhoneDisplay } from "@/lib/formatPhoneDisplay";

export function CitizensTable({
  citizens,
  loading,
  isBusy,
  onEdit,
  onDelete
}: {
  citizens: any[];
  loading: boolean;
  isBusy: boolean;
  onEdit: (citizen: any) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto bg-card rounded-xl border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 min-w-[180px] w-[30%]">Nome</TableHead>
            <TableHead className="min-w-[160px] w-[20%]">Telefone</TableHead>
            <TableHead className="min-w-[180px] w-[25%]">Email</TableHead>
            <TableHead className="min-w-[220px] w-[25%]">Observações</TableHead>
            <TableHead className="text-center min-w-[120px] w-[15%]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 min-w-[480px]">
                <Loader2 className="w-6 h-6 mx-auto animate-spin" />
              </TableCell>
            </TableRow>
          ) : (
            <AnimatePresence initial={false}>
              {citizens.map(citizen => (
                <motion.tr
                  key={citizen.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell className="px-4 min-w-[180px] w-[30%]">{citizen.full_name}</TableCell>
                  <TableCell className="min-w-[160px] w-[20%]">{formatPhoneDisplay(citizen.phone)}</TableCell>
                  <TableCell className="min-w-[180px] w-[25%]">{citizen.email ? citizen.email : <span className="text-muted-foreground">Sem email informado</span>}</TableCell>
                  <TableCell className="min-w-[220px] w-[25%]">
                    {citizen.observations ? (
                      <span>{citizen.observations}</span>
                    ) : (
                      <span className="text-muted-foreground">Nenhuma observação</span>
                    )}
                  </TableCell>
                  <TableCell className="min-w-[120px] w-[15%] text-center">
                    <div className="flex gap-2 justify-center">
                      <Button size="icon" variant="outline" onClick={() => onEdit(citizen)} disabled={isBusy} aria-label="Editar">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="destructive" onClick={() => onDelete(citizen.id)} disabled={isBusy} aria-label="Excluir">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
