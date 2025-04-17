import Image from "next/image";
import Link from "next/link";

import categoryKidsBanner from "../public/category-kids-banner.jpg";
import categoryMensBanner from "../public/category-mens-banner.jpg";
import categoryWomansBanner from "../public/category-womans-banner.jpg";

const Categories = () => {
  const categories = [
    {
      name: "MULHERES",
      image: categoryWomansBanner,
      link: "#",
    },
    {
      name: "HOMENS",
      image: categoryMensBanner,
      link: "#",
    },
    {
      name: "CRIANÇAS",
      image: categoryKidsBanner,
      link: "#",
    },
  ];

  return (
    <section>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold header-font mb-2">Categorias</h2>
          <p className="text-text-light">
            Encontre o estilo perfeito para todos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative h-[500px] overflow-hidden block"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <div className="bg-zinc-900 py-3 px-10 font-bold text-2xl">
                  {category.name}
                </div>
              </div>

              <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
