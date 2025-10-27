import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export function ReviewCard() {
  return (
    <div className="flex items-center justify-end">
      <div className="bg-card border relative w-full max-w-md rounded-xl p-8 space-y-4">
        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="fill-foreground" />
          ))}
          <span className="text-sm">5 / 399 Review</span>
        </div>

        <div>
          <p>Conforto, Estilo, Versatilidade e Qualidade</p>
        </div>

        <p className="text-muted-foreground text-sm">
          “Esses tênis são incrivelmente confortáveis e estilosos. Perfeitos
          para qualquer ocasião. Uso todos os dias!”
        </p>

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            className="hover:bg-muted flex items-center justify-center rounded-full border transition-colors cursor-pointer"
            aria-label="Previous review"
          >
            <ChevronLeft />
          </Button>
          <Button
            className="hover:bg-muted flex items-center justify-center rounded-full border transition-colors cursor-pointer"
            aria-label="Next review"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
