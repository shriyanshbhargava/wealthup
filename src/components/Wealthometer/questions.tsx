import { AnalysisApi } from "@/api/services/analytics/AnalysisApi";
import Script from "next/script";
import { WealthoMeterQuestions } from "@/components/MyAccount/Dashboard/WealthoMeterQuestions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const { query, pathname } = useRouter();

    useEffect(() => {
        const searchQuery = query as {
            utm_source: string;
            utm_medium: string;
            utm_campaign: string;
        };

        (async () => {
            if (Object.keys(query).length) {
                const res = await AnalysisApi.urlAnalysis({
                    utm_source: searchQuery.utm_source ?? "",
                    utm_campaign: searchQuery.utm_campaign ?? "",
                    utm_medium: searchQuery.utm_medium ?? "",
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
    }, [query]);

    return (
        <>
            {/* <!-- Meta Pixel Code --> */}
            <script id="pixel" type="text/javascript" dangerouslySetInnerHTML={{
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
            </script>
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
            <WealthoMeterQuestions />
        </>
    )
}

export default Page;
