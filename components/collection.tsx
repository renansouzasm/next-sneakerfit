"use client";

import type { Product } from "@/types";
import ProductCard from "./product-card";
import sneaker1 from "../public/sneakers-thumbs/sneaker-1.png";
import sneaker2 from "../public/sneakers-thumbs/sneaker-2.png";
import sneaker3 from "../public/sneakers-thumbs/sneaker-3.png";
import sneaker4 from "../public/sneakers-thumbs/sneaker-4.png";
import sneaker5 from "../public/sneakers-thumbs/sneaker-5.png";
import sneaker6 from "../public/sneakers-thumbs/sneaker-6.png";
import sneaker7 from "../public/sneakers-thumbs/sneaker-7.png";
import sneaker8 from "../public/sneakers-thumbs/sneaker-8.png";

const Collection = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Adidas Yeezy Boost 350 V1",
      price: 2274.31,
      image: sneaker1,
    },
    {
      id: 2,
      name: "Air Jordan 4 Bred (2019)",
      price: 2900,
      image: sneaker2,
    },
    {
      id: 3,
      name: "Air More Uptempo",
      price: 2940.74,
      image: sneaker3,
    },
    {
      id: 4,
      name: "Tênis Air Jordan 11 Retro Concord Masculino - Branco/Preto",
      price: 949.9,
      image: sneaker4,
    },
    {
      id: 5,
      name: "Air Jordan 5 Retro Supreme Desert Camo",
      price: 17050,
      image: sneaker5,
    },
    {
      id: 6,
      name: "Yeezy Boost 350 v2 Semi Frozen",
      price: 3299,
      image: sneaker6,
    },
    {
      id: 7,
      name: "Tênis Nike Air Force 1 - Travis Scott",
      price: 789.9,
      image: sneaker7,
    },
    {
      id: 8,
      name: "Tênis Levi’s x Air Jordan 4 Retro ‘Denim’",
      price: 2199.9,
      image: sneaker8,
    },
  ];

  return (
    <section>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold header-font mb-2">Coleção</h2>

          <p className="text-text-light">Conheça nosso estoque de sneakers</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
