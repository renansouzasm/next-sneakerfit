import Image from "next/image";
import Link from "next/link";

import hero from "../public/hero1.jpg";

const Hero = () => {
  return (
    <section className="relative h-[500px]">
      <Image
        src={hero}
        alt="Stylist picks fashion"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="container-custom relative h-full flex flex-col justify-center items-end text-white">
        <div className="max-w-md text-right">
          <h1 className="text-4xl md:text-5xl font-bold header-font mb-4 uppercase">
            sneakerfit, seu sneaker seu estilo
          </h1>

          <Link href="#" className="btn-outline">
            entre em contato
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
