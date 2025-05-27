export type CTAType = {
  blockType: "cta";
  blockName?: string;
  buttons: {
    label: string;
    type: string;
    url?: string;
    newTab: boolean;
  }[];
  richText: unknown;
};

export type ContentType = {
  blockType: "content";
  blockName?: string;
  content: unknown;
};

export type BlogContentType = {
  blockType: "content";
  blockName?: string;
  richText: unknown;
}

export type MediaType = {
  blockType: "media";
  blockName?: string;
  media?: {
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    url: string;
    sizes:
      | {
          square?: {
            width: number;
            height: number;
            mimeType: string;
            filesize: number;
            filename: string;
            url: string;
          };
          sixteenByNineMedium?: {
            width: number;
            height: number;
            mimeType: string;
            filesize: number;
            filename: string;
            url: string;
          };
        }
      | {}
      | undefined;
  };
  useYoutube: boolean;
  youtubeLink: string;
  size: string;
  caption: unknown;
};

export type MediaContentType = {
  blockType: "mediaContent";
  blockName?: string;
  alignment: "contentOnLeft" | "contentOnRight";
  media: {
    url: string;
  };
  embeddedVideo?: {
    embed: boolean;
    videoUrl: string;
  };
  richText: unknown;
};

export type QuoteType = {
  blockType: "quote";
  blockName?: string;
  content: string;
  author: string;
};

export type SpacerType = {
  blockType: "spacer";
  blockName?: string;
  size: "tiny" | "small" | "medium" | "large";
};
