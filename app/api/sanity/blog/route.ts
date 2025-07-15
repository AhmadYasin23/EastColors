import { NextResponse } from "next/server"
import { getBlogPosts, getFeaturedBlogPosts } from "@/sanity/lib/fetch"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    const posts = featured ? await getFeaturedBlogPosts() : await getBlogPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
