import { NextResponse } from "next/server"
import { getServices } from "@/sanity/lib/fetch"

export async function GET() {
  try {
    const services = await getServices()
    return NextResponse.json(services)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 })
  }
}
