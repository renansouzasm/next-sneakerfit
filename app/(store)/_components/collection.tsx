"use client";

import { Product } from "@/app.types";
import { ProductCard } from "./product-card";
import { useProducts } from "@/lib/hooks/useProducts";

const Collection = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <section>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold header-font mb-2">Coleção</h2>

          <p className="text-text-light">Conheça nosso estoque de sneakers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.length > 0 &&
            products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
