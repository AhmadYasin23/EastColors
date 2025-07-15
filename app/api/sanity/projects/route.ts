import { NextResponse } from "next/server"
import { getProjects, getFeaturedProjects } from "@/sanity/lib/fetch"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    const projects = featured ? await getFeaturedProjects() : await getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}
