// fetch.ts
import { groq } from "next-sanity";
import { client } from "./client";
import {
  projectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  // removed servicesQuery/serviceBySlugQuery on purpose since we inline normalized queries
  blogPostsQuery,
  featuredBlogPostsQuery,
  blogPostBySlugQuery,
  categoriesQuery,
  jobsQuery,
  jobBySlugQuery,
  featuredJobsQuery,
} from "./queries";

// ---- Types (optional but recommended)
export type Lang = "ar" | "en";

export type Service = {
  _id: string;
  slug: string; // <-- flat string (normalized)
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  icon?: string | null;
  features?: { ar?: string[]; en?: string[] } | null;
  image?: any;
  featured?: boolean;
  category?: string;
};

// Projects
export async function getProjects() {
  return client.fetch(projectsQuery);
}

export async function getFeaturedProjects() {
  return client.fetch(featuredProjectsQuery);
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(projectBySlugQuery, { slug });
}

// Services (NORMALIZED SHAPE)
export async function getServices(category?: string): Promise<Service[]> {
  const filter = category ? " && category == $category" : "";
  const query = groq`*[
    _type == "service" 
    && defined(slug.current)
    ${filter}
  ] | order(order asc) {
    _id,
    icon,
    image,
    featured,
    category,
    "slug": slug.current,                               // <-- FLAT
    "title": {
      "en": coalesce(title.en, ""),
      "ar": coalesce(title.ar, "")
    },
    "description": {
      "en": coalesce(description.en, ""),
      "ar": coalesce(description.ar, "")
    },
    "features": {
      "en": coalesce(features.en, []),
      "ar": coalesce(features.ar, [])
    }
  }`;

  const params = category ? { category } : {};
  const data = await client.fetch<Service[]>(query, params);

  // belt & suspenders: drop any rogue items with empty slug
  return (Array.isArray(data) ? data : []).filter((s) => typeof s.slug === "string" && s.slug.trim().length > 0);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const query = groq`*[
    _type == "service" 
    && slug.current == $slug
  ][0]{
    _id,
    icon,
    image,
    featured,
    category,
    "slug": slug.current,                               // <-- FLAT
    "title": {
      "en": coalesce(title.en, ""),
      "ar": coalesce(title.ar, "")
    },
    "description": {
      "en": coalesce(description.en, ""),
      "ar": coalesce(description.ar, "")
    },
    "features": {
      "en": coalesce(features.en, []),
      "ar": coalesce(features.ar, [])
    }
  }`;
  const doc = await client.fetch<Service | null>(query, { slug });
  return doc && typeof doc.slug === "string" ? { ...doc, slug: doc.slug.trim() } : null;
}

// Blog
export async function getBlogPosts() {
  return client.fetch(blogPostsQuery);
}

export async function getFeaturedBlogPosts() {
  return client.fetch(featuredBlogPostsQuery);
}

export async function getBlogPostBySlug(slug: string) {
  return client.fetch(blogPostBySlugQuery, { slug });
}

// Categories
export async function getCategories() {
  return client.fetch(categoriesQuery);
}

// Jobs
export async function getJobs() {
  return client.fetch(jobsQuery);
}

export async function getJobBySlug(slug: string) {
  return client.fetch(jobBySlugQuery, { slug });
}

export async function getFeaturedJobs() {
  return client.fetch(featuredJobsQuery);
}
