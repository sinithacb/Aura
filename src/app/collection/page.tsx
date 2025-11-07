import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import Image from "next/image";
import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Product } from "@/types/content";

type ProductsResponse = {
  data: Product[];
};

export default async function CollectionPage() {
  let products: Product[] = [] as unknown as Product[];
  try {
    const res = await fetchFromStrapi<ProductsResponse>(
      "/api/products?populate=images,category&sort=name:asc"
    );
    products = res.data;
  } catch {
    products = [] as unknown as Product[];
  }

  return (
    <main className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20">
      <FadeIn>
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white-900 mb-3">
            Collection
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl">
            Discover our curated selection of premium quartz surfaces, each crafted to elevate your space.
          </p>
        </div>
      </FadeIn>
      <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, idx) => {
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
        {products.length === 0 && (
          <>
            {[
              "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800",
            ].map((src, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link
                  href="/product/sample"
                  className="group block rounded-2xl border border-zinc-200/80 overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-50">
                    <Image
                      src={src}
                      alt="Product"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent p-5 sm:p-6">
                      <h3 className="text-white text-xl font-semibold tracking-tight mb-1.5">
                        Quartz Sample
                      </h3>
                      <p className="text-zinc-300 text-sm font-medium">Premium finish</p>
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
            ))}
          </>
        )}
      </div>
    </main>
  );
}


