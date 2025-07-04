"use client";

import { Book } from "@/types/book";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import FavoriteButton from "./FavoriteButton";
import Link from "next/link";

type Props = {
  books: Book[];
};

export default function BookRowCarousel({ books }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mb-8">
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#fdf6ec] border rounded-full p-2 shadow hover:bg-[#eee7dd]"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-6 pl-10 pr-10 hide-scrollbar"
      >
        {books.map((book) => (
          <Link
            key={book.id}
            href={`/books/${book.id}`}
            className="min-w-[180px] flex-shrink-0 text-center relative"
          >
            <div className="relative mb-2 h-[220px] w-[140px] mx-auto">
              {book.images?.[0] ? (
                <img
                  src={book.images[0]}
                  alt={book.title}
                  className="h-full w-full object-cover rounded shadow"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center text-sm text-gray-500">
                  Image
                </div>
              )}

              <div className="absolute -top-1 -right-1">
                <FavoriteButton bookId={book.id} />
              </div>
            </div>

            <div className="text-sm font-medium text-[#3b3028] truncate">
              {book.title}
            </div>
            <div className="text-sm text-[#b44a1c] font-semibold">
              {book.price?.toFixed(2)} €
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#fdf6ec] border rounded-full p-2 shadow hover:bg-[#eee7dd]"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
