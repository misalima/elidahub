import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(_req: Request) {

  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("Key exists:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  const { error } = await supabaseAdmin.from('profiles').select('id').limit(1);

  if (error) {
    console.error('Healthcheck failed:', error);
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

