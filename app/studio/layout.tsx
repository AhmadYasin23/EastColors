"use client";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  // full-height so Studio chrome fills the viewport
  return (
    <div dir="ltr" style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
