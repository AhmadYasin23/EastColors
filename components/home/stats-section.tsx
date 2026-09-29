// components/home/StatsSection.tsx
export const revalidate = 60;
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"
import StatsClient from "./stats-client"

export default async function StatsSection() {
  let logos: Array<{ name: string; logoUrl: string }> = []

  try {
    logos = await client.fetch(
      groq`*[_type == "clientLogo"] | order(orderAsc){
        name,
        "logoUrl": logo.asset->url
      }`
    )
  } catch (error) {
    console.error("Unable to load client logos", error)
  }

  return <StatsClient logos={logos} />
}
