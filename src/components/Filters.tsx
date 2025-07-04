"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type FiltersProps = {
  categories: string[];
  conditions: string[];
  onChange: (filters: {
    category: string;
    condition: string;
    sort: string;
  }) => void;
};

export default function Filters({
  categories,
  conditions,
  onChange,
}: FiltersProps) {
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    onChange({ category, condition, sort });
  }, [category, condition, sort]);

  const baseStyle =
    "appearance-none px-4 py-2 w-full rounded-lg border border-[#ccc] bg-white text-gray-700 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c4a484] focus:border-transparent";

  const wrapperStyle =
    "relative w-full max-w-xs md:max-w-[200px] flex items-center";

  const chevronIcon =
    "pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400";

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-8 flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
      {/* Catégories */}
      <div className={wrapperStyle}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={baseStyle}
        >
          <option value="">📁 Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown className={chevronIcon} size={16} />
      </div>

      {/* États */}
      <div className={wrapperStyle}>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className={baseStyle}
        >
          <option value="">📦 Tous les états</option>
          {conditions.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
        <ChevronDown className={chevronIcon} size={16} />
      </div>

      {/* Tri */}
      <div className={wrapperStyle}>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={baseStyle}
        >
          <option value="recent">📅 Les plus récents</option>
          <option value="price_asc">💰 Prix croissant</option>
          <option value="price_desc">💸 Prix décroissant</option>
        </select>
        <ChevronDown className={chevronIcon} size={16} />
      </div>
    </div>
  );
}
