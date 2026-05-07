"use client";
import dynamic from "next/dynamic";

const NextStudio = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import("next-sanity/studio"),
      import("../../../sanity.config"),
    ]);
    return function StudioComponent() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio />;
}
