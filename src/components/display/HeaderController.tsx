import { Metadata } from 'next';
import { baseUrl } from "@/utils/constants";

export function generateMetadata({
  title,
  description,
  embed,
}: {
  title?: string;
  description?: string;
  embed?: { 
    hexColor?: string; 
    image?: string; 
    url?: string; 
    type?: string 
  };
}): Metadata {
  const defaultTitle = "Wealth Management | Investment Planning | Financial Freedom";
  const titlePrefix = " | wealthup";
  const defaultDescription = "Wealthup uses SALECOIN framework to build & manage your wealth. Our team of financial experts offers customized solutions for investment planning, portfolio management & more.";
  const defaultKeywords = "wealthup, wealthup.me, finance, money, money management, investment";

  return {
    title: title ? title + titlePrefix : defaultTitle,
    description: description || defaultDescription,
    keywords: defaultKeywords,
    themeColor: embed?.hexColor || "#EFE7DD",
    applicationName: "wealthup",
    openGraph: {
      title: title || "wealthup",
      description: description || defaultDescription,
      images: [{
        url: embed?.image || `${baseUrl}/img/og-image.jpg`,
        width: 1200,
        height: 630,
      }],
      locale: "en-IN",
      type: "website",
      url: embed?.url,
      siteName: "wealthup",
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDescription,
      images: [embed?.image || `${baseUrl}/img/og-image.jpg`],
      site: "@syedmuzamilm",
    },
    icons: {
      icon: "/wealthup_favicon.png",
      apple: `${baseUrl}/img/wealthup_favicon.png`,
    },
    manifest: "/manifest.json",
    viewport: "width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
  };
}

// If you need a component version for dynamic pages
export const HeaderController = ({
  title,
  description,
  additionalKeywords,
  embed,
}: {
  title?: string;
  description?: string;
  additionalKeywords?: string;
  embed?: { 
    hexColor?: string; 
    image?: string; 
    url?: string; 
    type?: string 
  };
}) => {
  return null;
};

export default HeaderController;