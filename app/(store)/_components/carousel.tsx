import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function ProductCarousel() {
  const placeholderHero =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/hero.jpg";

  return (
    <Carousel className="w-full mb-12 overflow-hidden">
      <CarouselContent>
        <CarouselItem className="relative overflow-hidden">
          <Image
            className="absolute object-cover"
            src={placeholderHero}
            alt="Hero image"
            fill
          />

          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br bg-zinc-950/10 to-zinc-900 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

            <div className="relative z-10 text-center px-6">
              <p className="text-sm uppercase tracking-widest mb-4 text-primary-foreground/80">
                Sport Collection
              </p>
              <h2 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
                20% OFF
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                For Selected Sport Styles
              </p>
              <button className="bg-primary-foreground text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Shop Now
              </button>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-muted to-background flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="text-5xl md:text-7xl font-bold mb-4">
                New Arrivals
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Discover the latest trends
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Explore Now
              </button>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-background to-muted flex items-center justify-center">
            <div className="text-center px-6">
              <h2 className="text-5xl md:text-7xl font-bold mb-4">
                Summer Sale
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Up to 50% off selected items
              </p>
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Shop Sale
              </button>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm border-0 hover:bg-primary hover:text-primary-foreground" />
      <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm border-0 hover:bg-primary hover:text-primary-foreground" />
    </Carousel>
  );
}
