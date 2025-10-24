"use client";

import { ItemGroup } from "@/components/ui/item";
import { useStoreContext } from "./_context/StoreContext";
import { ProductCarousel } from "./_components/carousel";
import { ProductCard } from "./_components/product-card";
import { Button } from "@/components/ui/button";

export default function StorePage() {
  const { products } = useStoreContext();

  return (
    <main className="py-8">
      <div className="layout-size">
        <ProductCarousel />

        <section>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Coleção de Sneakers</h1>

            <Button
              className="text-foreground/50 font-bold hover:text-primary transition-colors uppercase tracking-wider cursor-pointer"
              variant="link"
            >
              Show All
            </Button>
          </div>

          <ItemGroup className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </ItemGroup>
        </section>
      </div>
    </main>
  );
}
