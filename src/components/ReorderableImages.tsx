"use client";

import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  onChange: (newImages: string[]) => void;
  onDelete?: (img: string) => void;
};

export default function ReorderableImages({
  images,
  onChange,
  onDelete,
}: Props) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    setItems(images);
  }, [images]);

  const handleReorder = (newOrder: string[]) => {
    setItems(newOrder);
    onChange(newOrder);
  };

  const handleDelete = (img: string) => {
    const updated = items.filter((i) => i !== img);
    setItems(updated);
    onChange(updated);
    if (onDelete) onDelete(img);
  };

  return (
    <Reorder.Group
      axis="x"
      values={items}
      onReorder={handleReorder}
      className="flex gap-4 overflow-x-auto"
    >
      {items.map((img) => (
        <Reorder.Item
          key={img}
          value={img}
          whileDrag={{ scale: 1.05, zIndex: 10 }}
          className="relative w-28 h-28 flex-shrink-0 rounded overflow-hidden border bg-white cursor-grab active:cursor-grabbing"
        >
          <img
            src={img}
            alt="Image"
            className="w-full h-full object-cover pointer-events-none"
          />

          {onDelete && (
            <button
              onClick={() => handleDelete(img)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center hover:bg-red-600"
              title="Supprimer"
            >
              ✕
            </button>
          )}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
