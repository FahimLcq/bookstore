// components/HeroCarousel.tsx
"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";
import { Book } from "@/types/book";

export default function HeroCarousel({ books }: { books: Book[] }) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({ loop: true });

  return (
    <div
      className="keen-slider max-w-4xl mx-auto rounded overflow-hidden shadow mb-6"
      ref={sliderRef}
    >
      {books.map((book) => (
        <div
          key={book.id}
          className="keen-slider__slide bg-white p-4 flex flex-col items-center"
        >
          <Link href={`/books/${book.id}`}>
            <img
              src={book.images?.[0] || "/placeholder.jpg"}
              className="object-cover h-64 rounded shadow mb-4"
              alt={book.title}
            />
            <h3 className="text-xl font-semibold text-center">{book.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}
