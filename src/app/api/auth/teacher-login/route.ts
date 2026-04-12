import { NextRequest, NextResponse } from 'next/server';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expectedPassword = process.env.TEACHER_ACCESS_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json({ error: 'Configuração inválida no servidor.' }, { status: 500 });
    }

    if (!password || password !== expectedPassword) {
      return NextResponse.json({ error: 'Senha incorreta.' }, { status: 401 });
    }

    const token = await hashPassword(password);

    const response = NextResponse.json({ ok: true });
    
    // Main session cookie (secure and HttpOnly)
    response.cookies.set('teacher_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    // Client-side flag (not HttpOnly)
    response.cookies.set('teacher_logged_in', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
