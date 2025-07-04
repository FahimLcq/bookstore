import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Database } from "@/types/database";
import EditBookForm from "./form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function EditBookPage({ params }: any) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book) return notFound();

  return <EditBookForm book={book} />;
}
