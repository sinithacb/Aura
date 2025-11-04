import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import type { GalleryItem } from "@/types/content";

type GalleryResponse = { data: GalleryItem[] };

export default async function InspirationPage(): Promise<JSX.Element> {
  let items: GalleryItem[] = [] as unknown as GalleryItem[];
  try {
    const res = await fetchFromStrapi<GalleryResponse>(
      "/api/gallery-items?populate=image&sort=id:desc"
    );
    items = res.data;
  } catch {
    items = [] as unknown as GalleryItem[];
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold">Inspiration</h1>
      <div className="mt-8 columns-1 sm:columns-2 lg:columns-3 gap-4 [&>img:not(:first-child)]:mt-4">
        {items.map((g) => {
          const media = g.attributes.image?.data?.attributes;
          const src = getMediaUrl(media?.formats?.large?.url ?? media?.url);
          if (!src) return null;
          return (
            <FadeIn key={g.id}>
              <Link href={`/inspiration/${g.id}`} className="group block">
                <div className="relative overflow-hidden rounded-md">
                  <img
                    src={src}
                    alt={media?.alternativeText ?? g.attributes.title}
                    className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="text-white text-sm">{g.attributes.title}</div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
        {items.length === 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
              "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800",
            ].map((src, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <a href="/inspiration/sample" className="group block">
                  <div className="relative overflow-hidden rounded-md">
                    <Image src={src} alt="Inspiration" width={1200} height={800} unoptimized className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <div className="text-white text-sm">Inspiration Sample</div>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


