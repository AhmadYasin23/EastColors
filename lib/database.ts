import { neon } from "@neondatabase/serverless"

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(process.env.DATABASE_URL)

// Contact form types
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  service_type?: string
  message: string
  language: "ar" | "en"
}

// Database functions
export async function createContact(data: ContactFormData) {
  const result = await sql`
    INSERT INTO contacts (name, email, phone, company, service_type, message, language)
    VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.company || null}, ${data.service_type || null}, ${data.message}, ${data.language})
    RETURNING id, created_at
  `
  return result[0]
}

export async function subscribeToNewsletter(email: string, language: "ar" | "en" = "ar") {
  try {
    const result = await sql`
      INSERT INTO newsletter_subscribers (email, language)
      VALUES (${email}, ${language})
      ON CONFLICT (email) DO UPDATE SET
        language = ${language},
        subscribed_at = CURRENT_TIMESTAMP,
        status = 'active'
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    throw error
  }
}

export async function getTestimonials(featured = true) {
  const result = await sql`
    SELECT * FROM testimonials 
    WHERE featured = ${featured}
    ORDER BY created_at DESC
  `
  return result
}

export async function getProjects(category?: string, featured = false) {
  let query = sql`SELECT * FROM projects WHERE 1=1`

  if (category && category !== "all") {
    query = sql`SELECT * FROM projects WHERE category = ${category}`
  }

  if (featured) {
    query = sql`SELECT * FROM projects WHERE featured = true`
  }

  const result = await query
  return result
}
