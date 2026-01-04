export const revalidate = 60; // rebuild at most once per minute

import { ProjectDetails, ProjectData } from "@/components/ProjectDetails";
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const query = groq`
    *[_type=="project" && slug.current == $slug][0] {
      title{ ar, en },
      slug,
      description{ ar, en },
      category,
      "mainImage": mainImage.asset->url,
      "gallery": gallery[].asset->url,
      client{ name, industry, website },
      completionDate,
      featured,
      technologies,
      challenges{ ar[]{...,}, en[]{...,} },
      solution{ ar[]{...,}, en[]{...,} },
      results{ ar[]{...,}, en[]{...,} },
      publishedAt
    }
  `;

  const project = await client.fetch<ProjectData>(query, { slug });
  if (!project) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <ProjectDetails project={project} />
      </main>
      <Footer />
    </div>
  );
}
