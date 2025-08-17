import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');

  if (host?.startsWith('vqdt.')) {
    return NextResponse.rewrite(new URL('/(vqdt)', request.url));
  }

  if (host?.startsWith('hub.')) {
    return NextResponse.rewrite(new URL('/(hub)', request.url));
  }

  // Fallback para ambiente de desenvolvimento
  if (host?.includes('localhost') || host?.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  // Caso nenhum host seja reconhecido, retornar 404
  return NextResponse.rewrite(new URL('/404', request.url));
}

export const config = {
  matcher: ['/:path*'],
};
