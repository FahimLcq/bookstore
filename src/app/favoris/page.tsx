"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Book } from "@/types/book";
import BookCard from "@/components/BookCard";

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids: string[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );

      if (!ids.length) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .in("id", ids);

      if (error) {
        console.error("Erreur chargement favoris :", error.message);
      } else {
        setFavorites(data || []);
      }

      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <main className="p-8 bg-[#fdf6ec] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold text-[#4e4039] mb-6">
          ❤️ Mes livres favoris
        </h1>

        {loading ? (
          <p>Chargement...</p>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favorites.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun favori pour le moment.</p>
        )}
      </div>
    </main>
  );
}
