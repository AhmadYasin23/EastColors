import { NextResponse } from "next/server";
import { getServices } from "@/sanity/lib/fetch";

// while debugging prod, force dynamic to avoid serving a stale cached JSON
export const dynamic = "force-dynamic"; // remove later and use revalidate if you like
// export const revalidate = 60;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as "production" | "promotions" | null;

    const services = await getServices(category ?? undefined);

    // extra safety in case some document sneaks in without slug
    const normalized = services
      .map(s => ({ ...s, slug: typeof s.slug === "string" ? s.slug.trim() : "" }))
      .filter(s => s.slug.length > 0);

    return NextResponse.json(normalized, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
