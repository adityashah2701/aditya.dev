"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "keydown",
  "scroll",
  "touchstart",
] as const;

/**
 * Loads Google Analytics on the visitor's first interaction instead of at
 * page load. gtag.js is ~175 KB and runs ~200 ms of main-thread work, which
 * otherwise lands inside Total Blocking Time. Real visitors interact almost
 * immediately; only sessions with zero interaction (mostly bots) are missed.
 */
export function DeferredGoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const load = () => {
      setShouldLoad(true);
      removeListeners();
    };
    const removeListeners = () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, load);
      }
    };

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, load, { once: true, passive: true });
    }
    return removeListeners;
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
