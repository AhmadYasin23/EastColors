import { client } from "./client"
import {
  projectsQuery,
  featuredProjectsQuery,
  projectBySlugQuery,
  servicesQuery,
  serviceBySlugQuery,
  blogPostsQuery,
  featuredBlogPostsQuery,
  blogPostBySlugQuery,
  categoriesQuery,
} from "./queries"

// Projects
export async function getProjects() {
  return await client.fetch(projectsQuery)
}

export async function getFeaturedProjects() {
  return await client.fetch(featuredProjectsQuery)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(projectBySlugQuery, { slug })
}

// Services
export async function getServices() {
  return await client.fetch(servicesQuery)
}

export async function getServiceBySlug(slug: string) {
  return await client.fetch(serviceBySlugQuery, { slug })
}

// Blog
export async function getBlogPosts() {
  return await client.fetch(blogPostsQuery)
}

export async function getFeaturedBlogPosts() {
  return await client.fetch(featuredBlogPostsQuery)
}

export async function getBlogPostBySlug(slug: string) {
  return await client.fetch(blogPostBySlugQuery, { slug })
}

// Categories
export async function getCategories() {
  return await client.fetch(categoriesQuery)
}
