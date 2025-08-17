// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/;
const PREFIXES = ['/main', '/hub', '/vqdt'];

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const { pathname, search } = url;

  // 1) Ignora assets e internos do Next
  if (PUBLIC_FILE.test(pathname) || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  // 2) Evita reescrever novamente se já estamos num prefixo conhecido
  if (PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  // 3) Hostname sem porta
  const hostHeader = req.headers.get('host') ?? '';
  const hostname = hostHeader.split(':')[0].toLowerCase();

  // 4) Descobre subdomínio
  let sub = '';
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]') {
    // Dev helper: permite forçar subdomínio com ?sub=hub
    if (url.searchParams.has('sub')) sub = url.searchParams.get('sub') ?? '';
  } else if (hostname.endsWith('.nip.io') || hostname.endsWith('.sslip.io')) {
    // Ex.: hub.127.0.0.1.nip.io -> 'hub'
    sub = hostname.split('.')[0];
  } else {
    // Produção: dominio.com (sem sub) ou hub.dominio.com (com sub)
    const parts = hostname.split('.');
    sub = parts[0] === 'www' ? '' : (parts.length > 2 ? parts[0] : '');
  }

  // 5) Mapeia subdomínio -> prefixo
  const prefix =
    sub === 'hub' ? '/hub' :
    sub === 'vqdt' ? '/vqdt' :
    '/main'; // raiz (dominio.com) cai aqui

  // Se você QUER 404 para subdomínios desconhecidos, use este bloco em vez do default acima:
  // if (!['', 'hub', 'vqdt'].includes(sub)) {
  //   return new NextResponse('Not Found', { status: 404 });
  // }

  // 6) Reescreve preservando caminho e querystring
  return NextResponse.rewrite(new URL(`${prefix}${pathname}${search}`, req.url));
}

export const config = {
  matcher: [
    // Roda em tudo, exceto internos do Next e arquivos com extensão
    '/((?!_next/|.*\\..*).*)',
  ],
};
