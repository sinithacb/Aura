import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import Image from "next/image";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import type { GalleryItem } from "@/types/content";

type GalleryResponse = { data: GalleryItem[] };

export default async function InspirationPage() {
  let items: GalleryItem[] = [] as unknown as GalleryItem[];
  try {
    const res = await fetchFromStrapi<GalleryResponse>(
      "/api/gallery-items?populate=image&sort=id:desc"
    );
    items = res.data;
  } catch {
    items = [] as unknown as GalleryItem[];
  }

  const sampleImages = [
    "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800",
    "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800",
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20">
      <FadeIn>
        <div className="mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white-900 mb-4">
            Inspiration
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Discover stunning design possibilities with our premium quartz surfaces.
            Explore real-world applications and transform your space.
          </p>
        </div>
      </FadeIn>
      
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6">
        {items.map((g, idx) => {
          const media = g.attributes.image?.data?.attributes;
          const src = getMediaUrl(media?.formats?.large?.url ?? media?.url);
          if (!src) return null;
          return (
            <FadeIn key={g.id} delay={idx * 0.05} y={20}>
              <Link 
                href={`/inspiration/${g.id}`} 
                className="group block mb-5 sm:mb-6 break-inside-avoid"
              >
                <div className="relative overflow-hidden rounded-xl bg-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={src}
                      alt={media?.alternativeText ?? g.attributes.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-5">
                      <div className="text-white text-sm sm:text-base font-medium leading-snug">
                        {g.attributes.title}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          );
        })}
        {items.length === 0 && sampleImages.map((src, i) => (
          <FadeIn key={i} delay={i * 0.05} y={20}>
            <Link 
              href="/inspiration/sample" 
              className="group block mb-5 sm:mb-6 break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={src} 
                    alt="Inspiration Sample" 
                    fill
                    unoptimized 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-5">
                    <div className="text-white text-sm sm:text-base font-medium leading-snug">
                      Inspiration Sample
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}


