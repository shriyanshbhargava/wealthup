"use client";
import { AnalysisApi } from "@/api/services/analytics/AnalysisApi";
import LandingPage from "@/components/MyAccount/Dashboard/LandingPage";
import Script from "next/script";
import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const WealthomMeterPage = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    useEffect(() => {
        const utm_source = searchParams.get('utm_source') ?? "";
        const utm_medium = searchParams.get('utm_medium') ?? "";
        const utm_campaign = searchParams.get('utm_campaign') ?? "";

        (async () => {
            if (utm_source || utm_medium || utm_campaign) {
                const res = await AnalysisApi.urlAnalysis({
                    utm_source,
                    utm_campaign,
                    utm_medium,
                    route: pathname,
                });

                if (!res.error) {
                    localStorage.setItem(
                        "analysisId",
                        JSON.stringify({
                            id: res.id,
                            date: Date.now(),
                        })
                    );
                }
            }
        })();
    }, [searchParams, pathname]);

    return (
        <>
            {/* <!-- Meta Pixel Code --> */}
            <Script id="pixel" type="text/javascript" dangerouslySetInnerHTML={{
                __html:
                    `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '605131524819632');
            fbq('track', 'PageView');
          `
            }}>
            </Script>
            <noscript><img height="1" width="1" style={{ display: "none" }}
                src="https://www.facebook.com/tr?id=605131524819632&ev=PageView&noscript=1"
            /></noscript>
            {/* <!-- End Meta Pixel Code --> */}
            <script type="text/javascript" dangerouslySetInnerHTML={{
                __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "gjuz1yao7d");
      `}} />
            <LandingPage />
        </>
    );
};

export default WealthomMeterPage;

