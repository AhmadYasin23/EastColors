import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export default async function ServicesPage() {
  const query = groq`
    {
      "production": *[_type == "service" && category == "production"] | order(order asc),
      "promotions": *[_type == "service" && category == "promotions"] | order(order asc)
    }
  `;

  const { production, promotions } = await client.fetch(query);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-6 py-12 space-y-16">
        {/* Production */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Production Services</h2>
          <p className="text-gray-600 mb-6">
            High-quality production solutions for your brand.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {production.map((service: any) => (
              <Link key={service._id} href={`/services/${service.slug.current}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition">
                  <h3 className="font-semibold">{service.title.en}</h3>
                  <p className="text-gray-500">{service.description.en}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services/production"
              className="text-pink-600 font-medium hover:underline"
            >
              View All Production Services →
            </Link>
          </div>
        </section>

        {/* Promotions */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Promotions Services</h2>
          <p className="text-gray-600 mb-6">
            Creative promotional solutions to boost your reach.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {promotions.map((service: any) => (
              <Link key={service._id} href={`/services/${service.slug.current}`}>
                <div className="bg-white rounded-lg shadow hover:shadow-lg p-6 transition">
                  <h3 className="font-semibold">{service.title.en}</h3>
                  <p className="text-gray-500">{service.description.en}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/services/promotions"
              className="text-pink-600 font-medium hover:underline"
            >
              View All Promotions Services →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
