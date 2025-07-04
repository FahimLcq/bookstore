"use client";

import Link from "next/link";
import BookCarousel from "./BookCarousel";
import { Book } from "@/types/book";

export default function BookClient({ book }: { book: Book }) {
  function getBadgeColor(condition: string) {
    switch (condition.toLowerCase()) {
      case "comme neuf":
        return "bg-green-100 text-green-800";
      case "bon état":
        return "bg-yellow-100 text-yellow-800";
      case "usé":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <>
      <Link
        href="/"
        className="inline-block mb-4 text-sm text-[#c4a484] hover:underline"
      >
        ← Retour à l’accueil
      </Link>
      <h1 className="text-4xl font-bold text-[#5c4433] mb-6 text-center">
        {book.title}
      </h1>

      {book.images?.length > 0 && (
        <div className="mb-6">
          <BookCarousel images={book.images} />
        </div>
      )}

      <p className="text-lg text-gray-700 mb-8 text-center">
        {book.description}
      </p>

      <div className="text-center space-y-2 text-sm text-gray-600 mb-6">
        <p>
          💰 <span className="font-semibold text-[#5c4433]">Prix :</span>{" "}
          <span className="text-base">{book.price} €</span>
        </p>
        <p>
          📚 <span className="font-semibold text-[#5c4433]">Catégorie :</span>{" "}
          <span className="px-2 py-1 bg-[#c4a484] text-white rounded text-sm">
            {book.category}
          </span>
        </p>
        <p>
          📦 <span className="font-semibold text-[#5c4433]">État :</span>{" "}
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded ${getBadgeColor(
              book.condition
            )}`}
          >
            {book.condition}
          </span>
        </p>
      </div>

      <div className="text-center mt-6">
        <a
          href={`mailto:leclercq.fahim@gmail.com?subject=Intéressé par "${book.title}"`}
          className="inline-block bg-[#c4a484] hover:bg-[#b8926f] text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          📩 Contacter par email
        </a>
      </div>
    </>
  );
}
