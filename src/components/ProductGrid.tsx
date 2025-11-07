"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import type { Product } from "@/types/content";

function getMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  return `${baseUrl}${url}`;
}

type ProductGridProps = {
  products: Product[];
  searchQuery?: string;
  categoryFilter?: string;
  sortBy?: string;
};

export default function ProductGrid({ 
  products, 
  searchQuery = "",
  categoryFilter,
  sortBy = "name-asc"
}: ProductGridProps) {
  // Filter products
  let filteredProducts = [...products];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter((p) => {
      const name = p.attributes.name?.toLowerCase() || "";
      const description = p.attributes.description?.toLowerCase() || "";
      const category = p.attributes.category?.data?.attributes?.name?.toLowerCase() || "";
      return name.includes(query) || description.includes(query) || category.includes(query);
    });
  }

  // Apply category filter
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter((p) => {
      return p.attributes.category?.data?.attributes?.slug === categoryFilter;
    });
  }

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return (a.attributes.name || "").localeCompare(b.attributes.name || "");
      case "name-desc":
        return (b.attributes.name || "").localeCompare(a.attributes.name || "");
      case "newest":
        return (b.id || 0) - (a.id || 0);
      case "oldest":
        return (a.id || 0) - (b.id || 0);
      default:
        return 0;
    }
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-zinc-400 mb-2">No products found</p>
        <p className="text-sm text-zinc-500">
          {searchQuery || categoryFilter
            ? "Try adjusting your search or filters"
            : "No products available"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 text-sm text-zinc-400">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
        {searchQuery && ` for "${searchQuery}"`}
      </div>
      <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((p, idx) => {
          const cover = p.attributes.images?.data?.[0]?.attributes;
          const img = getMediaUrl(cover?.formats?.medium?.url ?? cover?.url);
          return (
            <FadeIn key={p.id} delay={idx * 0.05}>
              <Link
                href={`/product/${p.attributes.slug}`}
                className="group block rounded-2xl border border-zinc-200/80 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-50">
                  {img ? (
                    <Image
                      src={img}
                      alt={cover?.alternativeText ?? p.attributes.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent p-5 sm:p-6">
                    <h2 className="text-white text-xl font-semibold tracking-tight mb-1.5">
                      {p.attributes.name}
                    </h2>
                    {p.attributes.category?.data?.attributes?.name && (
                      <p className="text-zinc-300 text-sm font-medium">
                        {p.attributes.category.data.attributes.name}
                      </p>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg">
                      <svg
                        className="w-5 h-5 text-zinc-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </>
  );
}

