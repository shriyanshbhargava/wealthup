import { ContentType } from "@/types/block";

export type Layout = Omit<ContentType, "content"> & {
  richText: unknown;
};

export type FinancialGlossary = {
  slug: string;
  term: string;
  layout: Layout[];
};
