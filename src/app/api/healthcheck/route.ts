import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_req: Request) {
  const { error } = await supabaseAdmin.from('profiles').select('id').limit(1);

  if (error) {
    return new Response(JSON.stringify({ status: 'error', message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ status: 'connected' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
