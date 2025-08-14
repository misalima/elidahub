import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data: faq_entries, error } = await supabase.from("faq_entries").select();
  if (error) {
    console.error(error);
  }
  console.log(faq_entries);
  
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Hello, world! Este é o FelixHub.</h1>
        <Button size={"lg"} className="m-auto cursor-pointer">Botão de teste</Button>
      </main>
    </div>
  );
}
