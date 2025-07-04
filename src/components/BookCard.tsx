"use client";

import Link from "next/link";
import { Book } from "@/types/book";
import FavoriteButton from "./FavoriteButton";

export default function BookCard({ book }: { book: Book }) {
  const image = book.images?.[0] || "/placeholder.jpg";

  return (
    <Link href={`/books/${book.id}`}>
      <div className="bg-white border border-[#e7ddd0] rounded-lg shadow hover:shadow-md transition overflow-hidden hover:-translate-y-1 hover:scale-[1.01] duration-200 relative">
        <img
          src={image}
          alt={book.title}
          className="h-[220px] w-full object-cover object-top rounded"
        />

        <FavoriteButton bookId={book.id} />

        <div className="p-4">
          <h3 className="font-serif text-lg font-semibold text-[#4e4039]">
            {book.title}
          </h3>
          <p className="text-sm text-[#7d6a58] italic mt-1">{book.author}</p>
          <p className="text-sm text-[#7d6a58] mt-1">{book.price} €</p>
        </div>
      </div>
    </Link>
  );
}
