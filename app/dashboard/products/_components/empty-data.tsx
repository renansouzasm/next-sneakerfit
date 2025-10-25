import { FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ProductAdd } from "@/app/dashboard/products/_components/product-add";
import Link from "next/link";

export function EmptyData() {
  return (
    <Empty className="text-foreground">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>

        <EmptyTitle>Sem produtos cadastrados</EmptyTitle>
        <EmptyDescription>
          Você ainda não cadastrou nenhum produto. Comece adicionando um, ou
          continue navegando pelo dashboard.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          <ProductAdd />
          <Link href={"/dashboard"}>
            <Button className="cursor-pointer" variant="outline">
              Voltar Para a Home
            </Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
}
