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
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          <ProductAdd />
          <Link href={"/"}>
            <Button className="cursor-pointer" variant="outline">
              Voltar Para a Home
            </Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
}
