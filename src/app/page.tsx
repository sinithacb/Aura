import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Category } from "@/types/content";

type CategoriesResponse = { data: Category[] };

export default async function HomePage(): Promise<JSX.Element> {
  let categories: Category[] = [] as unknown as Category[];
  try {
    const res = await fetchFromStrapi<CategoriesResponse>(
      "/api/categories?populate=heroImage&sort=order:asc"
    );
    categories = res.data;
  } catch (err) {
    // Swallow fetch errors so the page can render without Strapi
    categories = [] as unknown as Category[];
  }

  return (
    <main>
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900"
          alt="Quartz surface"
          fill
          priority
          unoptimized
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative px-6 text-white">
          <FadeIn>
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">Beauty That Endures</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-zinc-200 max-w-2xl mx-auto">
              Premium quartz collection engineered for daily life.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/collection" className="rounded-md bg-white px-6 py-3 text-black">
                View Collection
              </Link>
              <Link href="/inspiration" className="rounded-md border border-white/70 px-6 py-3 hover:bg-white/10">
                Find Inspiration
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, idx) => {
            const media = c.attributes.heroImage?.data?.attributes;
            const src = getMediaUrl(media?.formats?.large?.url ?? media?.url);
            return (
              <FadeIn key={c.id} delay={idx * 0.05}>
                <Link
                  key={c.id}
                  href={`/collection?category=${c.attributes.slug}`}
                  className="group block rounded-xl border border-zinc-200 overflow-hidden bg-white"
                >
                  <div className="relative h-48 overflow-hidden">
                    {src ? (
                      <img
                        src={src}
                        alt={media?.alternativeText ?? c.attributes.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-zinc-100" />
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                      <h3 className="text-white text-lg font-medium">{c.attributes.name}</h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
          {categories.length === 0 && (
            <div className="col-span-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
                "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
                "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
                "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
                "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
                "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800",
              ].map((src, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="relative rounded-xl border border-zinc-200 overflow-hidden">
                    <Image src={src} alt="Inspiration" width={800} height={600} unoptimized className="h-48 w-full object-cover transition-transform duration-500 ease-out hover:scale-105" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">Why Aura</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FadeIn>
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="text-lg font-medium">Extreme Durability</div>
              <p className="mt-2 text-sm text-zinc-600">Resists scratches, chips, and cracks for high-traffic spaces.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="text-lg font-medium">Stain Resistant</div>
              <p className="mt-2 text-sm text-zinc-600">Non-porous surface blocks wine, coffee, and oil stains.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="text-lg font-medium">Low Maintenance</div>
              <p className="mt-2 text-sm text-zinc-600">No sealing required. Wipes clean with soap and water.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="text-lg font-medium">Hygienic Surface</div>
              <p className="mt-2 text-sm text-zinc-600">Non-porous nature prevents bacteria growth.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

 
