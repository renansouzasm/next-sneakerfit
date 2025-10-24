"use client";

import { formatCurrencyBrl } from "@/utils/formatCurrencyBrl";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useStoreContext } from "../../_context/StoreContext";
import { Product } from "@prisma/client";
import { getProductByIdAction } from "@/app/dashboard/products/_actions/product-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { getLabelFormat } from "@/utils/label";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: Props) {
  const { id } = use(params);
  const { addToCart } = useStoreContext();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const response = await getProductByIdAction(id);

      if (response.data) {
        setProduct(response.data);
      }

      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading || !product) {
    return ProductPageSkeleton();
  }

  return (
    <main className="layout-size relative py-8 h-screen">
      <h1 className="text-foreground/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20em] font-extrabold uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap rotate-y-180 rotate-90 md:rotate-0 md:rotate-y-0">
        {getLabelFormat(product.brand)}
      </h1>

      <button
        onClick={() => router.back()}
        className="text-foreground/50 hover:text-primary tracking-wider font-bold absolute top-4 left-0 z-20 flex items-center gap-2 transition-colors cursor-pointer uppercase"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      <section className="grid md:grid-cols-2 md:gap-8 items-center">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.thumbUrl ?? "/placeholderThumb.png"}
            alt={product.name}
            fill
            className="object-contain p-8 -rotate-y-180 rotate-12"
            priority
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">
              {getLabelFormat(product.brand)}
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              {product.name}
            </h2>

            <p className="text-foreground/50 text-lg leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque
              accusamus sit dolore deleniti sed debitis corporis officia
              reiciendis iusto at.
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {formatCurrencyBrl(product.price)}
            </p>
          </div>

          <Button
            className="text-foreground w-full rounded-none py-8 font-bold tracking-wider text-md transition-all cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingBag />
            Adicionar ao Carrinho
          </Button>
        </div>
      </section>
    </main>
  );
}

function ProductPageSkeleton() {
  return (
    <section className="relative min-h-full bg-zinc-950 text-gray-300 overflow-hidden">
      <div className="layout-size relative z-10 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Skeleton className="aspect-square rounded-2xl" />

          <div className="space-y-6">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
