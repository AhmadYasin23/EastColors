import { ServiceDetails, ServiceData } from "@/components/ServiceDetails";
// … same imports as before …
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type Props = { params: { slug: string } };

export async function generateStaticParams(): Promise<Props["params"][]> {
  const slugs: { slug: string }[] = await client.fetch(
    groq`*[_type=="project" && defined(slug.current)]{ "slug": slug.current }`
  );
  return slugs;
}

export default async function ServicePage({ params: { slug } }: Props) {
  // fetch service from Sanity as before …
  const query = groq`
  *[_type == "service" && slug.current == $slug][0] {
    title { ar, en },
    slug,
    description { ar, en },
    icon,
    features { ar[], en[] },
    detailedDescription { ar[]{...,}, en[]{...,} },
    "image": image.asset->url,
    "gallery": gallery[].asset->url,
    order,
    featured
  }
`;

  const service = await client.fetch<ServiceData>(query, { slug });
  if (!service) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ServiceDetails service={service as ServiceData} />
      </main>
      <Footer />
    </div>
  );
}
