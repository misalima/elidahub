"use client";
import { useState } from "react";
import {
  useCitizens,
  useCreateCitizen,
  useUpdateCitizen,
  useDeleteCitizen,
} from "@/hooks/useCitizens";
import { formatBrazilianPhoneNumber } from "@/lib/formatBrazilianPhoneNumber";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { CitizensTable } from "@/components/vqdt/citizens/CitizensTable";
import { CitizenSearchBar } from "@/components/vqdt/citizens/CitizenSearchBar";
import { CitizenForm } from "@/components/vqdt/citizens/CitizenForm";
import { AnimatePresence, motion } from "motion/react";
import { CitizensPagination } from "@/components/vqdt/citizens/CitizensPagination";
import { NoCitizensMessage } from "@/components/vqdt/citizens/NoCitizensMessage";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Plus, Users } from "lucide-react";
import { Citizen } from "@/services/citizenService";

export default function CitizensPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useCitizens(page, debouncedSearch);
  const count = data?.count ?? 0;
  const { create, loading: creating } = useCreateCitizen();
  const { update, loading: updating } = useUpdateCitizen();
  const { remove, loading: deleting } = useDeleteCitizen();
  const [form, setForm] = useState({ full_name: "", phone: "", email: "", observations: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ full_name: "", phone: "", email: "", observations: "" });
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const isBusy = loading || creating || updating || deleting;

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    let formattedPhone = "";
    try {
      formattedPhone = formatBrazilianPhoneNumber(form.phone);
    } catch (err) {
      setPhoneError((err as Error).message);
      return;
    }
    try {
      await create({
        full_name: form.full_name,
        phone: formattedPhone,
        email: form.email?.trim() || null,
        observations: form.observations?.trim() || null,
        is_active: true,
      });
      setForm({ full_name: "", phone: "", email: "", observations: "" });
      setShowAddForm(false);
      toast.success("Cidadão criado com sucesso!");
      refetch();
    } catch {}
  };

  const handleEdit = (citizen: Citizen) => {
    setEditId(citizen.id);
    setEditForm({
      full_name: citizen.full_name,
      phone: citizen.phone.replace(/^\+55/, ""),
      email: citizen.email || "",
      observations: citizen.observations || "",
    });
    setPhoneError(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    setPhoneError(null);
    let formattedPhone = "";
    try {
      formattedPhone = formatBrazilianPhoneNumber(editForm.phone);
    } catch (err) {
      setPhoneError((err as Error).message);
      return;
    }
    try {
      await update(editId, { ...editForm, phone: formattedPhone });
      setEditId(null);
      setEditForm({ full_name: "", phone: "", email: "", observations: "" });
      toast.success("Cidadão atualizado!");
      refetch();
    } catch {}
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setPendingDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await remove(pendingDeleteId);
      toast.success("Cidadão excluído!");
      refetch();
    } catch {}
    setDeleteDialogOpen(false);
    setPendingDeleteId(null);
  };

  const citizens = data?.data || [];

  return (
  <motion.div layout className="w-full min-h-[calc(100vh-120px)] flex flex-col bg-background py-10 px-4 rounded-2xl">
      <Toaster />
  <div className="flex flex-col gap-8 px-4 flex-1">
        <div className="flex items-center gap-2 text-2xl font-semibold mb-6">
          <Users className="w-6 h-6" />
          Gerenciar Cidadãos
        </div>
        <div className="flex justify-between">
          <CitizenSearchBar search={search} setSearch={setSearch} />
          <Button
            type="button"
            onClick={() => setShowAddForm((v) => !v)}
            variant="default"
            className="flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Novo cidadão
          </Button>
        </div>
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -32, scaleY: 0.8 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -32, scaleY: 0.8 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{ originY: 0 }}
            >
              <CitizenForm
                form={form}
                onChange={handleFormChange}
                onSubmit={handleCreate}
                onCancel={() => {
                  setShowAddForm(false);
                  setForm({ full_name: "", phone: "", email: "", observations: "" });
                  setPhoneError(null);
                }}
                isBusy={isBusy}
                phoneError={phoneError}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {phoneError && !showAddForm && (
          <div className="text-red-500 mb-4">{phoneError}</div>
        )}
        {error && <div className="text-red-500 mb-2">{error.message}</div>}
        <CitizensTable
          citizens={citizens}
          loading={loading}
          isBusy={isBusy}
          onEdit={handleEdit}
          onDelete={handleDelete}
          editId={editId}
          editForm={editForm}
          onEditFormChange={(e) => {
            setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
          }}
          onSaveEdit={() => {
            // Create a synthetic event to satisfy handleUpdate signature
            const event = { preventDefault: () => {} } as React.FormEvent;
            handleUpdate(event);
          }}
          onCancelEdit={() => {
            setEditId(null);
            setEditForm({ full_name: "", phone: "", email: "", observations: "" });
            setPhoneError(null);
          }}
        />
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir cidadão?</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este cidadão? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} autoFocus>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {!loading && citizens.length === 0 && <NoCitizensMessage />}
        <div />
        {citizens.length > 0 && (
          <div className="mt-auto">
            <CitizensPagination
              page={page}
              count={count}
              isBusy={isBusy}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
  </motion.div>
  );
}
