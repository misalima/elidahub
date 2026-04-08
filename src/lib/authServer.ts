import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { validateTeacherSession } from "@/lib/authTeacherEdge";

export async function verifyApiAuth(req: NextRequest): Promise<boolean> {
  const teacherToken = req.cookies.get('teacher_session')?.value;
  if (await validateTeacherSession(teacherToken)) return true;
  
  const sbToken = req.cookies.get('sb_access_token')?.value;
  if (!sbToken) return false;
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(sbToken);
  return !error && !!user;
}
