import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { Database } from "@/types/database";
import EditBookForm from "./form";

type Props = {
  params: { id: string };
};

export default async function EditBookPage({ params }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book) return notFound();

  return <EditBookForm book={book} />;
}
