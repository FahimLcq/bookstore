"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/book";
import Filters from "@/components/Filters";
import BookRowCarousel from "@/components/BookRowCarousel";

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [categories, setCategories] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur de chargement des livres :", error.message);
      } else {
        setBooks(data || []);
        setFiltered(data || []);

        const cats = [...new Set(data?.map((b) => b.category).filter(Boolean))];
        const conds = [
          ...new Set(data?.map((b) => b.condition).filter(Boolean)),
        ];
        setCategories(cats);
        setConditions(conds);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(books.filter((b) => b.title.toLowerCase().includes(lower)));
  }, [search, books]);

  const handleFilterChange = ({
    category,
    condition,
    sort,
  }: {
    category: string;
    condition: string;
    sort: string;
  }) => {
    let result = [...books];

    if (category) {
      result = result.filter((b) => b.category === category);
    }

    if (condition) {
      result = result.filter((b) => b.condition === condition);
    }

    if (sort === "price_asc") {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      result = result.sort((a, b) => b.price - a.price);
    } else {
      result = result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // Appliquer aussi la recherche si elle est active
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(lower));
    }

    setFiltered(result);
  };

  return (
    <main className="p-8 bg-[#fdf6ec] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-center font-bold text-[#4e4039] mb-6">
          📚 Livres d’occasion disponibles
        </h1>

        <input
          type="text"
          placeholder="🔍 Rechercher un livre par son titre..."
          className="w-full mb-4 px-4 py-2 border rounded shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#3b3028]">
            Nouveautés
          </h2>
          <BookRowCarousel books={books.slice(0, 10)} />
        </div>

        {/* Filtres */}
        <Filters
          categories={categories}
          conditions={conditions}
          onChange={handleFilterChange}
        />

        {/* Liste des livres */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filtered.length > 6 && !showAll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-2 bg-[#c4a484] text-white rounded shadow hover:bg-[#b8926f] transition"
            >
              Voir tous les livres
            </button>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-gray-500 mt-8 text-center">
            Aucun livre ne correspond à la recherche.
          </p>
        )}
      </div>
    </main>
  );
}
