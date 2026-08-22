"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { ClassWorkspace, type ClassWorkspaceData } from "@/components/class-council/ClassWorkspace";
import { ClassWorkspaceSkeleton } from "@/components/class-council/LoadingSkeletons";
import { councilFetch } from "@/lib/class-council/client";

export default function CouncilClassPage() {
  const { councilId, classId } = useParams<{ councilId: string; classId: string }>();
  const [data,setData]=useState<ClassWorkspaceData|null>(null); const [error,setError]=useState("");
  const loadSequenceRef = useRef(0);
  const reload=useCallback(async()=>{
    const sequence = ++loadSequenceRef.current;
    try {
      const nextData = await councilFetch<ClassWorkspaceData>(`/api/class-councils/${councilId}/classes/${classId}`);
      if (sequence === loadSequenceRef.current) { setData(nextData); setError(""); }
    } catch(err) {
      if (sequence === loadSequenceRef.current) setError(err instanceof Error?err.message:"Falha ao carregar.");
    }
  },[classId,councilId]);
  useEffect(()=>{
    setData(null);
    setError("");
    void reload();
    return () => { loadSequenceRef.current += 1; };
  },[reload]);
  const hasCurrentClassData = data?.class.id === classId;
  if(error&&!hasCurrentClassData)return <main className="mx-auto max-w-4xl p-8"><div className="flex items-center gap-2 text-destructive"><AlertCircle className="h-5 w-5"/>{error}</div></main>;
  if(!data||!hasCurrentClassData)return <ClassWorkspaceSkeleton />;
  return <ClassWorkspace key={classId} initialData={data} councilId={councilId} classId={classId} reload={reload}/>;
}
