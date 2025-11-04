import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import Image from "next/image";
import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Product } from "@/types/content";

type ProductsResponse = {
  data: Product[];
};

export default async function CollectionPage(): Promise<JSX.Element> {
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
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Collection</h1>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, idx) => {
          const cover = p.attributes.images?.data?.[0]?.attributes;
          const img = getMediaUrl(cover?.formats?.medium?.url ?? cover?.url);
          return (
            <FadeIn key={p.id} delay={idx * 0.05}>
              <Link
                href={`/product/${p.attributes.slug}`}
                className="group block rounded-xl border border-zinc-200 overflow-hidden bg-white"
              >
                <div className="relative h-56 overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={cover?.alternativeText ?? p.attributes.name}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-zinc-100" />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                    <h2 className="text-white text-lg font-medium">{p.attributes.name}</h2>
                    {p.attributes.category?.data?.attributes?.name && (
                      <p className="mt-1 text-zinc-200 text-sm">
                        {p.attributes.category.data.attributes.name}
                      </p>
                    )}
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
                <a href="/product/sample" className="group block rounded-xl border border-zinc-200 overflow-hidden bg-white">
                  <div className="relative h-56 overflow-hidden">
                    <Image src={src} alt="Product" width={800} height={600} unoptimized className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                      <h3 className="text-white text-lg font-medium">Quartz Sample</h3>
                      <p className="mt-1 text-zinc-200 text-sm">Premium finish</p>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </>
        )}
      </div>
    </main>
  );
}


