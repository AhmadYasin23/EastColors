import { NextResponse } from "next/server"
import { getTestimonials } from "@/lib/database"

export async function GET() {
  try {
    const testimonials = await getTestimonials(true) // Get featured testimonials
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
  }
}
