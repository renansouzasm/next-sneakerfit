import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="layout-size bg-gradient-to-br from-background via-background to-primary/25 py-16">
      <div className="container space-y-8">
        <div className="inline-block">
          <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
            Nova Coleção 2025
          </span>
        </div>

        <h1 className="text-foreground text-5xl md:text-7xl lg:text-8xl text-balance uppercase leading-none">
          O seu estilo
          <span className="text-primary block uppercase">começa pelos pés</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-lg text-pretty">
          Descubra os tênis exclusivos das principais marcas do mundo. Edições
          limitadas, qualidade premium, estilo incomparável.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="text-foreground bg-primary hover:bg-primary/90 group font-bold tracking-wider cursor-pointer"
            size="lg"
          >
            Encomendar Agora
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            className="text-foreground border-border/50 hover:border-primary/50 bg-transparent font-bold tracking-wider cursor-pointer"
            size="lg"
            variant="outline"
            disabled
          >
            SNEAKERFIT
          </Button>
        </div>
      </div>

      <div className="relative size-16">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
      </div>
    </section>
  );
}
