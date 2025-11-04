import { fetchFromStrapi, getMediaUrl } from "@/lib/api";
import type { Product } from "@/types/content";

type ProductResponse = {
  data: Product[];
};

type Params = {
  params: { slug: string };
};

export default async function ProductPage({ params }: Params): Promise<JSX.Element> {
  let product: Product | undefined;
  try {
    const res = await fetchFromStrapi<ProductResponse>(
      `/api/products?filters[slug][$eq]=${params.slug}&populate=images,category`
    );
    product = res.data[0];
  } catch {
    product = undefined;
  }
  if (!product) {
    return <main className="mx-auto max-w-5xl px-6 py-16"><p>Not found.</p></main>;
  }
  const images = product.attributes.images?.data?.map((i) => i.attributes) ?? [];

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{product.attributes.name}</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          {images.map((m, i) => {
            const src = getMediaUrl(m.formats?.large?.url ?? m.url);
            return (
              <img key={i} src={src} alt={m.alternativeText ?? ""} className="w-full rounded-md object-cover" />
            );
          })}
        </div>
        <div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.attributes.description ?? "" }} />
        </div>
      </div>
    </main>
  );
}


