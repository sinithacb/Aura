import FadeIn from "@/components/animations/FadeIn";
import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Product, Category } from "@/types/content";
import ProductGrid from "@/components/ProductGrid";
import ProductFilters from "@/components/ProductFilters";

type ProductsResponse = {
  data: Product[];
};

type CategoriesResponse = {
  data: Category[];
};

type SearchParams = {
  search?: string;
  category?: string;
  sort?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

// Expanded mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    attributes: {
      name: "Carrara White",
      slug: "carrara-white",
      description: "Classic Italian marble-inspired quartz with subtle gray veining.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 2,
    attributes: {
      name: "Calacatta Gold",
      slug: "calacatta-gold",
      description: "Luxurious white quartz with bold gold veining patterns.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 3,
    attributes: {
      name: "Nero Marquina",
      slug: "nero-marquina",
      description: "Striking black quartz with white veining for dramatic contrast.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 4,
    attributes: {
      name: "Statuario",
      slug: "statuario",
      description: "Elegant white quartz with dramatic gray veining.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 5,
    attributes: {
      name: "Concrete Gray",
      slug: "concrete-gray",
      description: "Industrial-inspired gray quartz with subtle texture.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 6,
    attributes: {
      name: "Aurora Borealis",
      slug: "aurora-borealis",
      description: "Unique quartz with iridescent blue and green tones.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 3, attributes: { name: "Premium", slug: "premium" } } }
    }
  },
  {
    id: 7,
    attributes: {
      name: "Bianco Venatino",
      slug: "bianco-venatino",
      description: "Soft white quartz with delicate gray veining.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 8,
    attributes: {
      name: "Midnight Black",
      slug: "midnight-black",
      description: "Deep black quartz with a sleek, polished finish.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 9,
    attributes: {
      name: "Rose Quartz",
      slug: "rose-quartz",
      description: "Soft pink quartz with a warm, inviting tone.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 4, attributes: { name: "Luxury", slug: "luxury" } } }
    }
  },
  {
    id: 10,
    attributes: {
      name: "Ocean Blue",
      slug: "ocean-blue",
      description: "Vibrant blue quartz reminiscent of tropical waters.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 3, attributes: { name: "Premium", slug: "premium" } } }
    }
  },
  {
    id: 11,
    attributes: {
      name: "Emperador Dark",
      slug: "emperador-dark",
      description: "Rich brown quartz with golden veining accents.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 4, attributes: { name: "Luxury", slug: "luxury" } } }
    }
  },
  {
    id: 12,
    attributes: {
      name: "Ice White",
      slug: "ice-white",
      description: "Pure white quartz with a crisp, clean appearance.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 13,
    attributes: {
      name: "Charcoal Slate",
      slug: "charcoal-slate",
      description: "Dark gray quartz with natural stone texture.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 14,
    attributes: {
      name: "Diamond White",
      slug: "diamond-white",
      description: "Brilliant white quartz with subtle sparkle.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 3, attributes: { name: "Premium", slug: "premium" } } }
    }
  },
  {
    id: 15,
    attributes: {
      name: "Terra Cotta",
      slug: "terra-cotta",
      description: "Warm terracotta-toned quartz with earthy appeal.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 4, attributes: { name: "Luxury", slug: "luxury" } } }
    }
  },
  {
    id: 16,
    attributes: {
      name: "Silver Mist",
      slug: "silver-mist",
      description: "Light gray quartz with silvery undertones.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 17,
    attributes: {
      name: "Pearl Beige",
      slug: "pearl-beige",
      description: "Elegant beige quartz with a soft, warm glow.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 18,
    attributes: {
      name: "Emerald Green",
      slug: "emerald-green",
      description: "Luxurious green quartz with deep, rich tones.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 3, attributes: { name: "Premium", slug: "premium" } } }
    }
  },
  {
    id: 19,
    attributes: {
      name: "Copper Vein",
      slug: "copper-vein",
      description: "Unique quartz with copper-colored veining patterns.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1451472/pexels-photo-1451472.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 4, attributes: { name: "Luxury", slug: "luxury" } } }
    }
  },
  {
    id: 20,
    attributes: {
      name: "Arctic White",
      slug: "arctic-white",
      description: "Pure white quartz with a cool, crisp finish.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  },
  {
    id: 21,
    attributes: {
      name: "Storm Gray",
      slug: "storm-gray",
      description: "Dramatic gray quartz with dynamic veining.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/271795/pexels-photo-271795.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 2, attributes: { name: "Modern", slug: "modern" } } }
    }
  },
  {
    id: 22,
    attributes: {
      name: "Royal Gold",
      slug: "royal-gold",
      description: "Opulent gold-toned quartz with luxurious appeal.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 4, attributes: { name: "Luxury", slug: "luxury" } } }
    }
  },
  {
    id: 23,
    attributes: {
      name: "Mint Fresh",
      slug: "mint-fresh",
      description: "Cool mint-green quartz with a refreshing appearance.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/1030915/pexels-photo-1030915.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 3, attributes: { name: "Premium", slug: "premium" } } }
    }
  },
  {
    id: 24,
    attributes: {
      name: "Sahara Beige",
      slug: "sahara-beige",
      description: "Warm desert-toned quartz with natural texture.",
      images: { data: [{ attributes: { url: "https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200&h=800" } }] },
      category: { data: { id: 1, attributes: { name: "Classic", slug: "classic" } } }
    }
  }
];

export default async function CollectionPage({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.search || "";
  const categoryFilter = params.category || "";
  const sortBy = params.sort || "name-asc";

  let products: Product[] = [] as unknown as Product[];
  let categories: Category[] = [] as unknown as Category[];

  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetchFromStrapi<ProductsResponse>(
        "/api/products?populate=images,category&sort=name:asc"
      ),
      fetchFromStrapi<CategoriesResponse>(
        "/api/categories?populate=heroImage&sort=order:asc"
      )
    ]);
    products = productsRes.data;
    categories = categoriesRes.data;
  } catch {
    products = mockProducts;
    categories = [
      { id: 1, attributes: { name: "Classic", slug: "classic" } },
      { id: 2, attributes: { name: "Modern", slug: "modern" } },
      { id: 3, attributes: { name: "Premium", slug: "premium" } },
      { id: 4, attributes: { name: "Luxury", slug: "luxury" } }
    ] as Category[];
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

      <ProductFilters 
        categories={categories}
        selectedCategory={categoryFilter}
        sortBy={sortBy}
      />

      <ProductGrid
        products={products}
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
        sortBy={sortBy}
      />
    </main>
  );
}
