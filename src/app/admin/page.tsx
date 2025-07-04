import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Database } from "@/types/database";
import DeleteBookButton from "@/components/DeleteBookButton";

export default async function AdminDashboard() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect("/");
  }

  const { data: books } = await supabase.from("books").select("*");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Admin — Gestion des livres</h1>

      <Link
        href="/admin/new"
        className="inline-block mb-6 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        ➕ Ajouter un livre
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {books?.map((book) => (
          <div key={book.id} className="border p-4 rounded bg-white">
            <h2 className="font-bold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.price} €</p>
            <div className="flex gap-2 mt-4">
              <Link
                href={`/admin/edit/${book.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                ✏️ Modifier
              </Link>
              <DeleteBookButton book={book} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
