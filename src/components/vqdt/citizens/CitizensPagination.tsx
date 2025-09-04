"use client";
import { Button } from "@/components/ui/button";

export function CitizensPagination({
  page,
  count,
  isBusy,
  onPageChange,
}: {
  page: number;
  count: number;
  isBusy: boolean;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(count / 30));
  return (
    <div className="flex justify-between items-center mt-4">
      <Button variant="outline" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1 || isBusy}>
        Página anterior
      </Button>
      <span className="text-muted-foreground text-sm">
        Página {page} de {totalPages}
      </span>
      <Button variant="outline" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages || isBusy}>
        Próxima página
      </Button>
    </div>
  );
}
