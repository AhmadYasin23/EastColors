import { bindings, defineConfig, defineWorker, triggers } from "cf/config";

const publicValue = (name: string) => process.env[name] ?? "";

export default defineConfig({
  worker: defineWorker({
    name: "eastcolors-v1-0",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-09-29",
    compatibilityFlags: ["nodejs_compat"],
    workersDev: true,
    previewUrls: false,
    triggers: [
      triggers.fetch({
        pattern: "alwanalsharq.com/*",
        zone: "alwanalsharq.com",
      }),
      triggers.fetch({
        pattern: "www.alwanalsharq.com/*",
        zone: "alwanalsharq.com",
      }),
    ],
    assets: {
      notFoundHandling: "none",
      runWorkerFirst: true,
    },
    observability: {
      enabled: true,
      redactQueryString: true,
      logs: {
        enabled: true,
        headSamplingRate: 0.1,
        invocationLogs: true,
        persist: true,
      },
      traces: {
        enabled: true,
        headSamplingRate: 0.01,
        persist: true,
      },
    },
    env: {
      ASSETS: bindings.assets(),
      MAILJET_TO_NAME: bindings.text("East Colors Team"),
      TURNSTILE_ALLOWED_HOSTNAMES: bindings.text(
        "alwanalsharq.com,www.alwanalsharq.com",
      ),
      NEXT_PUBLIC_SANITY_PROJECT_ID: bindings.text(
        publicValue("NEXT_PUBLIC_SANITY_PROJECT_ID"),
      ),
      NEXT_PUBLIC_SANITY_DATASET: bindings.text(
        publicValue("NEXT_PUBLIC_SANITY_DATASET") || "production",
      ),
      NEXT_PUBLIC_SANITY_API_VERSION: bindings.text("2024-01-01"),
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: bindings.text(
        publicValue("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
      ),
    },
  }),
});
