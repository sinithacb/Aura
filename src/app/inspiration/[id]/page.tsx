import { fetchFromStrapi, getMediaUrl } from "@/lib/api";

type Params = { params: { id: string } };

type GalleryItemResponse = {
  data: {
    id: number;
    attributes: {
      title: string;
      image?: { data?: { attributes: { url: string; alternativeText?: string; formats?: { large?: { url: string } } } } };
    };
  };
};

export default async function InspirationDetailPage({ params }: Params): Promise<JSX.Element> {
  const res = await fetchFromStrapi<GalleryItemResponse>(
    `/api/gallery-items/${params.id}?populate=image`
  );
  const item = res.data;
  const media = item.attributes.image?.data?.attributes;
  const src = getMediaUrl(media?.formats?.large?.url ?? media?.url);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">{item.attributes.title}</h1>
      {src ? (
        <img src={src} alt={media?.alternativeText ?? item.attributes.title} className="mt-6 w-full rounded-md object-cover" />
      ) : (
        <div className="mt-6 h-96 w-full rounded-md bg-zinc-100" />
      )}
    </main>
  );
}


