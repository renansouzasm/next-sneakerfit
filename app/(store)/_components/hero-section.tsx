import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./review-card";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-balance font-sans text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
              O seu estilo começa pelos pés
            </h1>
            <p className="mb-8 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Descubra os tênis exclusivos das principais marcas do mundo.
              Edições limitadas, qualidade premium, estilo incomparável.
            </p>

            <div>
              <Link href={"#collection"}>
                <Button className="rounded-full cursor-pointer">
                  Explorar
                  <ArrowUpRight />
                </Button>
              </Link>
            </div>
          </div>

          <ReviewCard />
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute flex items-center justify-center inset-0">
            <span className="text-muted text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[14rem] font-bold tracking-tight">
              SNEAKERFIT
            </span>
          </div>

          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src="/placeholderThumb.png"
              alt="Featured sneaker with distinctive sole design"
              width={1400}
              height={600}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
