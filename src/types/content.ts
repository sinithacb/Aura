export type MediaFormat = {
  url: string;
  width?: number;
  height?: number;
};

export type Media = {
  url: string;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    large?: MediaFormat;
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    order?: number;
    heroImage?: { data?: { attributes: Media } };
  };
};

export type Product = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    specs?: unknown;
    images?: { data?: Array<{ attributes: Media }> };
    category?: { data?: Category };
  };
};

export type GalleryItem = {
  id: number;
  attributes: {
    title: string;
    tags?: string[];
    image?: { data?: { attributes: Media } };
  };
};


