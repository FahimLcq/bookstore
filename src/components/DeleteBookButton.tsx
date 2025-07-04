"use client";

import { supabase } from "@/lib/supabase";
import { Book } from "@/types/book";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteBookButton({ book }: { book: Book }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Confirmer la suppression du livre ?");
    if (!confirmDelete) return;

    const toastId = toast.loading("Suppression en cours...");

    try {
      // Supprime les images du bucket
      const imagePaths = (book.images || []).map((url: string) =>
        url.split("/").pop()
      );

      if (imagePaths.length) {
        const { error: imageError } = await supabase.storage
          .from("book-images")
          .remove(imagePaths.filter((path): path is string => !!path));

        if (imageError) throw imageError;
      }

      // Supprime le livre
      const { error: deleteError } = await supabase
        .from("books")
        .delete()
        .eq("id", book.id);

      if (deleteError) throw deleteError;

      toast.success("Livre supprimé avec succès ✅", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression ❌", { id: toastId });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-600 hover:underline text-sm"
    >
      🗑️ Supprimer
    </button>
  );
}
