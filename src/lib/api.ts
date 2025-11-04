export type StrapiResponse<T> = {
  data: T;
  meta?: unknown;
};

const baseUrl: string = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function fetchFromStrapi<T>(path: string, init?: RequestInit): Promise<T> {
  const url: string = `${baseUrl}${path}`;
  const response: Response = await fetch(url, {
    next: { revalidate: 60 },
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }
  return (await response.json()) as T;
}

export function getMediaUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  return `${baseUrl}${url}`;
}


