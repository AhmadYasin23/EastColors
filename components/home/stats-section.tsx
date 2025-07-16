// components/home/StatsSection.tsx
export const revalidate = 60;
import { groq } from "next-sanity"
import { client } from "@/sanity/lib/client"
import StatsClient from "./stats-client"

export default async function StatsSection() {
  // Fetch only plain data: name & URL
  const logos: Array<{ name: string; logoUrl: string }> = await client.fetch(
    groq`*[_type == "clientLogo"] | order(orderAsc){
      name,
      "logoUrl": logo.asset->url
    }`
  )

  // Pass only that array into the client
  return <StatsClient logos={logos} />
}
