import { NextResponse } from "next/server"
import { getJobs, getFeaturedJobs } from "@/sanity/lib/fetch"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured") === "true"

    const jobs = featured ? await getFeaturedJobs() : await getJobs()
    return NextResponse.json(jobs)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
