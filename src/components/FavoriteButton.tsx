"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { clsx } from "yet-another-react-lightbox";

export default function FavoriteButton({ bookId }: { bookId: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(stored.includes(bookId));
  }, [bookId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updated = stored.includes(bookId)
      ? stored.filter((id: string) => id !== bookId)
      : [...stored, bookId];

    localStorage.setItem("favorites", JSON.stringify(updated));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={clsx(
        "absolute top-2 right-2 p-1 rounded-full shadow transition",
        isFavorite
          ? "bg-red-100 text-red-600 hover:bg-red-200"
          : "bg-white text-gray-400 hover:text-red-500 hover:bg-gray-100"
      )}
    >
      <Heart className="w-4 h-4 fill-current" />
    </button>
  );
}
