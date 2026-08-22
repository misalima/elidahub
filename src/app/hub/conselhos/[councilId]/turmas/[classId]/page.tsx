"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { ClassWorkspace, type ClassWorkspaceData } from "@/components/class-council/ClassWorkspace";
import { councilFetch } from "@/lib/class-council/client";

export default function CouncilClassPage() {
  const { councilId, classId } = useParams<{ councilId: string; classId: string }>();
  const [data,setData]=useState<ClassWorkspaceData|null>(null); const [error,setError]=useState("");
  const reload=useCallback(async()=>{try{setData(await councilFetch(`/api/class-councils/${councilId}/classes/${classId}`));setError("");}catch(err){setError(err instanceof Error?err.message:"Falha ao carregar.");}},[classId,councilId]);
  useEffect(()=>{void reload();},[reload]);
  if(error&&!data)return <main className="mx-auto max-w-4xl p-8"><div className="flex items-center gap-2 text-destructive"><AlertCircle className="h-5 w-5"/>{error}</div></main>;
  if(!data)return <div className="grid min-h-[70vh] place-items-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  return <ClassWorkspace initialData={data} councilId={councilId} classId={classId} reload={reload}/>;
}
