'use client';

import "../styles/globals.css";
import "../styles/phone-input.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, Fragment, useState, useEffect } from "react";
import {
  FeedBack,
  FeedBackForm,
  FeedbackProvider,
} from "../components/FeedBack";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeaderController } from "../components/display/HeaderController";
import { NextPage } from "next";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import Storage from "../utils/storage";
import Head from 'next/head'
import GoogleTagManager from "../components/GoogleTagManager";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function WealthupWebApp({ Component, pageProps }: AppPropsWithLayout) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryValue = searchParams.get('yourQueryParameterName');

    if (queryValue) {
      Storage.storeReferral(queryValue);
    }
  }, [searchParams]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <Fragment>
      <HeaderController />
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5MF3NPV');
        `}
      </Script>
      {/* <GoogleTagManager gtmId="GTM-5MF3NPV" /> */}
      {/* start google analytics */}
      {/*<script async src="https://www.googletagmanager.com/gtag/js?id=G-JP2HQP38E1"></script>
      <script
        // strategy="lazyOnload"
        // id="gtag-base"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JP2HQP38E1');
          `,
        }}
      />*/}
      {/* End google Analytics */}
      {/* <!-- Start of HubSpot Embed Code --> */}
      <Script
        strategy="lazyOnload"
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js-na1.hs-scripts.com/20022484.js"
      />
      {/* Clarity */}
      <script type="text/javascript" dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "gjuz1yao7d");
      `}} />
      {/* <!-- End of HubSpot Embed Code --> */}
      {/* <!-- Begin Inspectlet Asynchronous Code --> */}
      {/* <Script
        type="text/javascript"
        id="insp"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              window.__insp = window.__insp || [];
              __insp.push(['wid', 447569252]);
              var ldinsp = function(){
              if(typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=447569252&r=' + Math.floor(new Date().getTime()/3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); };
              setTimeout(ldinsp, 0);
              })();
        `,
        }}
        onLoad={() => {
          console.log("Loaded Inspectlet");
        }}
      /> */}
      {/* <!-- End Inspectlet Asynchronous Code --> */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `
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
      `}}>
      </script>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `
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
      `}}>
      </script>
      <FeedbackProvider.Provider value={{ show, setShow }}>
        <HeaderController />
        {/* <FeedBack onOpen={() => setIsOpen(true)} /> */}
        {isOpen && <FeedBackForm onClose={() => setIsOpen(false)} />}
        <Component {...pageProps} />
        <ToastContainer position="bottom-center" transition={Slide} />
      </FeedbackProvider.Provider>
    </Fragment>
  );
}

export default WealthupWebApp;
