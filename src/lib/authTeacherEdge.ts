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
