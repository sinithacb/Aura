import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Category } from "@/types/content";
import Button from "@/components/Button";

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
              <Button href="/collection" variant="solid" className="bg-white text-black hover:bg-white/90">
                View Collection
              </Button>
              <Button href="/inspiration" variant="outline" className="border-white/80 text-white hover:border-white hover:bg-white/10">
                Find Inspiration
              </Button>
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

      {/* Collection teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200">
              <Image
                src="https://images.pexels.com/photos/373548/pexels-photo-373548.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200"
                alt="Curated quartz collection"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Our Curated Collection</h2>
              <p className="mt-4 text-zinc-600">Elegant marbles, deep charcoals, and contemporary concretes—carefully selected to elevate residential and commercial spaces alike.</p>
              <div className="mt-6 flex gap-3">
                <Button href="/collection" variant="solid">Explore Collection</Button>
                <Button href="/inspiration" variant="link">View Inspirations</Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Brand/process highlight */}
      <section className="bg-zinc-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <FadeIn>
              <div>
                <div className="text-xs font-semibold tracking-widest text-zinc-500">OUR APPROACH</div>
                <h3 className="mt-2 text-2xl font-semibold">Beauty That Endures</h3>
                <p className="mt-3 text-zinc-600">Global sourcing, strict quality, and timeless design ensure each slab meets the demands of modern living.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <div>
                <div className="text-xs font-semibold tracking-widest text-zinc-500">RESPONSIVE SERVICE</div>
                <h3 className="mt-2 text-2xl font-semibold">From Quote to Delivery</h3>
                <p className="mt-3 text-zinc-600">A dedicated team helps you specify, source, and install—on time and on budget.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <div className="text-xs font-semibold tracking-widest text-zinc-500">RELIABLE SUPPLY</div>
                <h3 className="mt-2 text-2xl font-semibold">Diversified Network</h3>
                <p className="mt-3 text-zinc-600">A robust multi-region supply chain keeps projects moving, with confidence in every order.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900"
            alt="Quartz background"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="mx-auto max-w-6xl px-6 py-16 text-center text-white">
          <FadeIn>
            <h2 className="text-3xl font-semibold tracking-tight">Ready to Transform Your Space?</h2>
          </FadeIn>
          <FadeIn delay={0.05}>
            <p className="mx-auto mt-3 max-w-2xl text-zinc-200">Our team can help you select the perfect surface for your project. Get a tailored quote and samples.</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Button href="/contact" variant="solid" className="bg-white text-black hover:bg-white/90">Request a Quote</Button>
              <Button href="/collection" variant="ghost">Browse Collection</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

 
