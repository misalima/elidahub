"use client";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Loader2, Check, X } from "lucide-react";
import { formatPhoneDisplay } from "@/lib/formatPhoneDisplay";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Citizen } from "@/services/citizenService";

export function CitizensTable({
  citizens,
  loading,
  isBusy,
  onEdit,
  onDelete,
  editId,
  editForm,
  onEditFormChange,
  onSaveEdit,
  onCancelEdit
}: {
  citizens: Citizen[];
  loading: boolean;
  isBusy: boolean;
  onEdit: (citizen: Citizen) => void;
  onDelete: (id: string) => void;
  editId: string | null;
  editForm: { full_name: string; phone: string; email: string; observations: string };
  onEditFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}) {
  return (
  <TooltipProvider delayDuration={700}>
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
                {citizens.map(citizen => {
                  const isEditing = editId === citizen.id;
                  return (
                    <motion.tr
                      key={citizen.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={isEditing ? "bg-muted" : undefined}
                    >
                      <TableCell className="px-4 min-w-[180px] w-[30%]">
                        {isEditing ? (
                          <input
                            name="full_name"
                            value={editForm.full_name}
                            onChange={onEditFormChange}
                            className="w-full px-2 py-1 rounded border focus:outline-none focus:ring"
                            disabled={isBusy}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                onSaveEdit();
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                onCancelEdit();
                              }
                            }}
                          />
                        ) : (
                          <span className="font-semibold">{citizen.full_name}</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[160px] w-[20%]">
                        {isEditing ? (
                          <input
                            name="phone"
                            value={editForm.phone}
                            onChange={onEditFormChange}
                            className="w-full px-2 py-1 rounded border focus:outline-none focus:ring"
                            disabled={isBusy}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                onSaveEdit();
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                onCancelEdit();
                              }
                            }}
                          />
                        ) : (
                          formatPhoneDisplay(citizen.phone)
                        )}
                      </TableCell>
                      <TableCell className="min-w-[180px] w-[25%]">
                        {isEditing ? (
                          <input
                            name="email"
                            value={editForm.email}
                            onChange={onEditFormChange}
                            className="w-full px-2 py-1 rounded border focus:outline-none focus:ring"
                            disabled={isBusy}
                            onKeyDown={e => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                onSaveEdit();
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                onCancelEdit();
                              }
                            }}
                          />
                        ) : (
                          citizen.email ? citizen.email : <span className="text-muted-foreground">Sem email informado</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[220px] w-[25%]">
                        {isEditing ? (
                          <textarea
                            name="observations"
                            value={editForm.observations}
                            onChange={onEditFormChange}
                            className="w-full px-2 py-1 rounded border focus:outline-none focus:ring resize-none"
                            rows={1}
                            disabled={isBusy}
                            onKeyDown={e => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                onSaveEdit();
                              } else if (e.key === "Escape") {
                                e.preventDefault();
                                onCancelEdit();
                              }
                            }}
                          />
                        ) : citizen.observations ? (
                          citizen.observations.length > 50 ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="cursor-pointer">
                                  {citizen.observations.slice(0, 50) + '...'}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                {citizen.observations}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            <span>{citizen.observations}</span>
                          )
                        ) : (
                          <span className="text-muted-foreground">Nenhuma observação</span>
                        )}
                      </TableCell>
                      <TableCell className="min-w-[120px] w-[15%] text-center">
                        <div className="flex gap-2 justify-center">
                          {isEditing ? (
                            <>
                              <Button size="icon" variant="default" onClick={onSaveEdit} disabled={isBusy} aria-label="Salvar">
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="outline" onClick={onCancelEdit} disabled={isBusy} aria-label="Cancelar">
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button size="icon" variant="outline" onClick={() => onEdit(citizen)} disabled={isBusy} aria-label="Editar">
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="destructive" onClick={() => onDelete(citizen.id)} disabled={isBusy} aria-label="Excluir">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
