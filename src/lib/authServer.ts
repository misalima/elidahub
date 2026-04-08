import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function validateTeacherSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const password = process.env.TEACHER_ACCESS_PASSWORD;
  if (!password) return false;
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expected = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return token === expected;
}

export async function verifyApiAuth(req: any): Promise<boolean> {
  const teacherToken = req.cookies.get('teacher_session')?.value;
  if (await validateTeacherSession(teacherToken)) return true;
  
  const sbToken = req.cookies.get('sb_access_token')?.value;
  if (!sbToken) return false;
  
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(sbToken);
  return !error && !!user;
}
