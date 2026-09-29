"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "light";
      size: "flexible";
      "response-field": boolean;
      "response-field-name": string;
    },
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileProps = {
  action: "contact" | "job_application" | "newsletter";
  resetSignal?: number;
};

export function Turnstile({ action, resetSignal = 0 }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!siteKey || !isReady || !containerRef.current || !window.turnstile) {
      return;
    }

    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action,
      theme: "light",
      size: "flexible",
      "response-field": true,
      "response-field-name": "cf-turnstile-response",
    });

    return () => {
      window.turnstile?.remove(widgetId);
    };
  }, [action, isReady, resetSignal, siteKey]);

  if (!siteKey) {
    return (
      <p role="alert" className="text-sm text-red-700">
        Form protection is not configured. Please contact us directly.
      </p>
    );
  }

  return (
    <>
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setIsReady(true)}
        onReady={() => setIsReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px]" />
    </>
  );
}
