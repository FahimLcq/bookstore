import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Book } from "@/types/book";
import BookClient from "@/components/BookClient";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BookPage({ params }: any) {
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!book || error) {
    notFound();
  }

  return (
    <main className="bg-[#fdf6ec] min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-[#fffaf4] rounded-xl shadow p-6">
        <BookClient book={book as Book} />
      </div>
    </main>
  );
}
