"use client";

import { ItemGroup } from "@/components/ui/item";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { useStoreContext } from "./_context/StoreContext";
import { ProductCard } from "./_components/product-card";

export default function HomePage() {
  const { products } = useStoreContext();

  return (
    <div>
      <Hero />

      <main className="layout-size py-16 bg-gradient-to-tr from-background via-background to-primary/25">
        <ItemGroup className="grid grid-cols-2 md:grif-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.length > 0 &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </ItemGroup>
      </main>

      <Footer />
    </div>
  );
}
