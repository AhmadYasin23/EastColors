import app from "vinext/server/fetch-handler";

const STATIC_ASSET_PATH =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp4|png|svg|webm|webp|woff2?)$/i;

const worker: ExportedHandler<Env> = {
  async fetch(request, env, ctx) {
    const pathname = new URL(request.url).pathname;

    if (pathname.startsWith("/_next/static/") || STATIC_ASSET_PATH.test(pathname)) {
      return env.ASSETS.fetch(request);
    }

    if (!app.fetch) {
      return new Response("Worker fetch handler is unavailable", { status: 500 });
    }

    return app.fetch(request, env, ctx);
  },
};

export default worker;
