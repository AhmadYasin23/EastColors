import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";

const shouldPrerender = process.env.SKIP_PRERENDER !== "true";

export default defineConfig({
  preview: {
    allowedHosts: [
      "alwanalsharq.com",
      "www.alwanalsharq.com",
      ".trycloudflare.com",
    ],
  },
  plugins: [
    vinext({
      cache: { cdn: staticAssetsAdapter() },
      ...(shouldPrerender ? { prerender: { routes: "*" } } : {}),
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
