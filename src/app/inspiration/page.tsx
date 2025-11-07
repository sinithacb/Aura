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
    { title: "Modern Kitchen Design", image: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Elegant Bathroom Vanity", image: "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Luxury Living Space", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Contemporary Countertops", image: "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Industrial Style Kitchen", image: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Minimalist Design", image: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Classic Marble Look", image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Sleek Modern Island", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Premium Finish", image: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Natural Stone Aesthetic", image: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Elegant Dining Area", image: "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Luxury Master Bathroom", image: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Contemporary Style", image: "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Open Concept Living", image: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Designer Kitchen", image: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Timeless Elegance", image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Modern Minimalism", image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
    { title: "Premium Quality", image: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" },
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
        {items.length === 0 && sampleImages.map((item, i) => (
          <FadeIn key={i} delay={i * 0.05} y={20}>
            <Link 
              href="/inspiration/sample" 
              className="group block mb-5 sm:mb-6 break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-xl bg-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    unoptimized 
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 sm:p-5">
                    <div className="text-white text-sm sm:text-base font-medium leading-snug">
                      {item.title}
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


