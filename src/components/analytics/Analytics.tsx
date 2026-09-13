import Script from "next/script";

/**
 * Analytics is opt-in and entirely environment driven — nothing loads until a
 * key is present, so the site ships with zero third-party requests by default.
 *
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN   e.g. fndrs-society.com
 *   NEXT_PUBLIC_PLAUSIBLE_SRC      optional, for self-hosted Plausible
 *   NEXT_PUBLIC_POSTHOG_KEY        project API key
 *   NEXT_PUBLIC_POSTHOG_HOST       defaults to https://eu.i.posthog.com
 *   NEXT_PUBLIC_GA_ID              G-XXXXXXXXXX
 */
export function Analytics() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.i.posthog.com";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <>
      {plausibleDomain ? (
        <Script defer data-domain={plausibleDomain} src={plausibleSrc} strategy="afterInteractive" />
      ) : null}

      {posthogKey ? (
        <Script id="posthog-init" strategy="afterInteractive">
          {`(function(){var h=${JSON.stringify(posthogHost)},k=${JSON.stringify(posthogKey)};
var s=document.createElement("script");s.src=h+"/static/array.js";s.async=true;
s.onload=function(){window.posthog&&window.posthog.init(k,{api_host:h,person_profiles:"identified_only",capture_pageview:true})};
document.head.appendChild(s)})();`}
        </Script>
      ) : null}

      {gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag("js",new Date());gtag("config",${JSON.stringify(gaId)});`}
          </Script>
        </>
      ) : null}
    </>
  );
}
