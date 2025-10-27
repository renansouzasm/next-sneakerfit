"use client";

import { HeroSection } from "./_components/hero-section";
import { Footer } from "./_components/footer";
import { ProductCard } from "./_components/product-card";
import { useProductContext } from "./_context/ProductContext";

export default function StorePage() {
  const { products } = useProductContext();

  return (
    <main className="min-h-screen">
      <HeroSection />

      <section
        className="bg-background px-6 py-16 md:px-12 lg:px-16"
        id="collection"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
