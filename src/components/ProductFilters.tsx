"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { Category } from "@/types/content";

type ProductFiltersProps = {
  categories: Category[];
  selectedCategory?: string;
  sortBy?: string;
};

type SortOption = {
  value: string;
  label: string;
};

const sortOptions: SortOption[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

export default function ProductFilters({ 
  categories, 
  selectedCategory,
  sortBy = "name-asc"
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const updateFilters = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Preserve search query
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }

    const newUrl = params.toString() 
      ? `/collection?${params.toString()}`
      : "/collection";
    
    router.push(newUrl);
  };

  const handleCategoryChange = (categorySlug: string | null) => {
    updateFilters("category", categorySlug);
  };

  const handleSortChange = (sortValue: string) => {
    updateFilters("sort", sortValue);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    if (search) {
      params.set("search", search);
    }
    const newUrl = params.toString() 
      ? `/collection?${params.toString()}`
      : "/collection";
    router.push(newUrl);
  };

  const hasActiveFilters = selectedCategory || sortBy !== "name-asc";

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 transition-colors text-sm font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-zinc-900 text-white rounded-full">
                {[selectedCategory, sortBy !== "name-asc" ? "1" : null].filter(Boolean).length}
              </span>
            )}
          </button>

          {selectedCategory && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-sm">
              <span className="text-zinc-600">Category:</span>
              <span className="font-medium text-zinc-900">
                {categories.find(c => c.attributes.slug === selectedCategory)?.attributes.name || selectedCategory}
              </span>
              <button
                onClick={() => handleCategoryChange(null)}
                className="ml-1 text-zinc-500 hover:text-zinc-900"
                aria-label="Remove category filter"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-zinc-600 hover:text-zinc-900 underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-zinc-300 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-zinc-300 bg-white text-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isOpen && (
        <div className="p-4 bg-white rounded-lg border border-zinc-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-900 mb-2">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    !selectedCategory
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.attributes.slug)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.attributes.slug
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                    }`}
                  >
                    {category.attributes.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

