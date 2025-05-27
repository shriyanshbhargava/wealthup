import {
  BlogContentType,
  ContentType,
  CTAType,
  MediaContentType,
  MediaType,
  QuoteType,
  SpacerType,
} from "./block";

export type Layout =
  | ContentType
  | BlogContentType
  | MediaType
  | MediaContentType
  | QuoteType
  | SpacerType
  | CTAType;

export type PostType = {
  title: string;
  description: string;
  layout: Layout[];
  // heroImage: Omit<MediaType, "blockType">; // except blockType
  heroImage?: {
    url: string;
  };
  slug: string;
  category: {
    name: string;
  }[];
  _status: string;
  updatedAt: string;
  meta: {
    title: string;
    description: string;
    keywords: string;
  };
  author: {
    name: string;
    profile?: {
      url: string;
    };
    linkedinUrl?: string;
  };
};

export type PageType = {
  title: string;
  slug: string;
  image?: MediaType;
  layout: Layout[];
  meta: {
    title?: string;
    description?: string;
    keywords?: string;
  };
};
