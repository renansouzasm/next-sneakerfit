import { ArrowUpRight, Award, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t" id="footer">
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-16 flex flex-col md:flex-row gap-8">
        <section className="flex flex-col space-y-8 w-full md:w-1/2">
          <div className="flex gap-4">
            <div className="bg-foreground rounded-full p-4 size-fit">
              <Award className="text-background" />
            </div>

            <div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Conforto e durabilidade incomparáveis
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Sinta o conforto de materiais premium e um design pensado para
                acompanhar o seu ritmo, dia após dia.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-foreground rounded-full p-4 size-fit">
              <Layers className="text-background" />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold text-foreground">
                Estilo e desempenho em harmonia
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">
                Combine visual moderno com performance superior, o equilíbrio
                perfeito para quem vive em movimento.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-8 w-full md:w-1/2">
          <div>
            <p className="text-5xl font-bold text-foreground md:text-6xl">
              © 2025
            </p>
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              SNEAKERFIT
            </p>
            <p className="text-xl font-medium text-muted-foreground">
              Todos os direitos reservados.
            </p>
          </div>

          <Link href={"#hero"}>
            <Button className="cursor-pointer rounded-full mb-8">
              <ArrowUpRight />
              Voltar ao topo
            </Button>
          </Link>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Minha conta
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Meus pedidos
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Entregas e devoluções
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de privacidade
              </Link>
            </div>

            <div className="space-y-2">
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Fale conosco
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Trabalhe conosco
              </Link>
              <Link
                href="#"
                className="block text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Instagram
              </Link>
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
}
