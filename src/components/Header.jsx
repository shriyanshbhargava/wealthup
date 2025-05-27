'use client'

import { baseUrl } from "@/utils/constants";
import { usePathname } from 'next/navigation';

export const HeaderController= ({
  title,
  description = "Wealthup uses SALECOIN framework to build & manage your wealth. Our team of financial experts offers customized solutions for investment planning, portfolio management & more.",
  additionalKeywords = "",
  canonicalUrl,
  embed,
}) => {
  const pathname  = usePathname();
  const defaultTitle = "Wealth Management | Investment Planning | Financial Freedom";
  const titlePrefix = " | wealthup";
  const defaultKeywords =
    "wealthup, wealthup.me, finance, money, money management, investment";

  function getTitle() {
    if (title) return title + titlePrefix;
    return defaultTitle;
  }

  return (
    <>
      {/* <title>{getTitle()}</title> */}
      {/* <meta name="description" content={description} /> */}
      <meta name="keywords" content={defaultKeywords + additionalKeywords} />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      <link rel="icon" href="/wealthup_favicon.png" type="image/png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      <link rel="apple-touch-icon" href={`${baseUrl}/img/wealthup_favicon.png`}></link>
      <link
        rel="apple-touch-startup-image"
        href={`${baseUrl}/img/wealthup_favicon.png`}
      />
      <meta name="og:site_name" content="wealthup" />
      <meta name="og:locale" content="en-IN" />

      {pathname?.startsWith("blog") ? (
        <link rel="canonical" href={canonicalUrl} />
      ) : (
        <link rel="canonical" href={`${baseUrl}${pathname}`} />
      )}

      <meta name="title" property="og:title" content={title || "wealthup"} />
      {/* <meta property="og:type" content={embed?.type ? embed?.type : "website"} /> */}
      <meta
        name="description"
        property="og:description"
        content={description}
      />
      <meta
        name="image"
        property="og:image"
        content={embed?.image ? embed?.image : `${baseUrl}/img/og-image.jpg`}
      />

      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content={embed?.image ? embed?.image : `${baseUrl}/img/og-image.jpg`}
      />
      {embed?.url && <meta name="og:url" content={embed?.url} />}
      <meta name="twitter:site" content="@syedmuzamilm" />
      <meta name="twitter:app:name:googleplay" content="wealthup" />
    </>
  );
};

// Check Financial Health
// Wealthometer: Is your financial health good enough?

// How It Works
// Learn how we help you level-up your wealth

// Tools &  Calculators
// Risk Profiler, Tax Saver, Rent Receipts Generator and more

// Talk to Us
// Get in touch for free exploratory call
