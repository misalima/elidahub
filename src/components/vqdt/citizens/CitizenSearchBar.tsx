"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

export function CitizenSearchBar({
  search,
  setSearch
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center">
      <div className="relative w-full md:w-[400px] lg:w-[480px]">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </span>
        <Input
          type="text"
          placeholder="Buscar por nome ou telefone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
    </div>
  );
}
