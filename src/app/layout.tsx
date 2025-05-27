import "@/styles/globals.css";
import "@/styles/phone-input.css";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from './client-layout';
import {
  FeedBack,
  FeedBackForm,
  FeedbackProvider,
} from "@/components/FeedBack";
import { Fragment, ReactNode } from "react";
import { SidebarProvider } from '@/components/ui/Sidebar/sidebar-context';
import { ToastContainer } from './toast-container';
import { HeaderController } from "@/components/display/HeaderController";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL('https://wealthup-frontend-copy.vercel.app/'),
  title: 'Wealth Management | Investment Planning | Financial Freedom',
  description: 'Wealthup uses SALECOIN framework to build & manage your wealth. Our team of financial experts offers customized solutions for investment planning, portfolio management & more.',
  keywords:['Finance', 'wealth', 'wealthup','wealthup.me','money management', 'investment']
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeaderController />
        {/* <!-- Google Tag Manager --> */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5MF3NPV');
          `}
        </Script>
        <Script src="https://sdk.cashfree.com/js/v3/cashfree.js"/>
        <Script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.sandbox.js"/>
        <Script src="https://sdk.cashfree.com/js/ui/2.0.0/cashfree.prod.js"/>
        {/* HubSpot Embed Code */}
        <Script
          strategy="lazyOnload"
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js-na1.hs-scripts.com/20022484.js"
        />
        {/* Clarity */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "gjuz1yao7d");
          `}
        </Script>
        {/* Schema.org Organization */}
        <Script id="schema-org" type="application/ld+json">
          {`
          {
          "@context": "https://schema.org",
           "@type": "Organization",
           "name": "Wealthup",
           "url": "https://www.wealthup.me/",
           "logo": "https://www.wealthup.me/assets/img/wealthup-purple.png",
           "sameAs": [
            "https://www.instagram.com/wealthup.me/",
            "https://www.linkedin.com/company/wealthup-me/",
            "https://www.youtube.com/channel/UCZbkPE02-FQ5m_AiD-ZTObQ"
           ]
          }
          `}
        </Script>
        {/* Schema.org WebSite */}
        <Script id="schema-website" type="application/ld+json">
          {`
          {
           "@context": "https://schema.org/",
           "@type": "WebSite",
           "name": "Wealthup",
           "url": "https://www.wealthup.me/",
           "potentialAction": {
            "@type": "SearchAction",
            "target": "{search_term_string}",
            "query-input": "required name=search_term_string"
           }
          }
          `}
        </Script>
      </head>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}