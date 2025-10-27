import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { FolderOpen } from "lucide-react";
import Link from "next/link";

interface EmptyDataProps {
  children?: React.ReactNode;
  title: string;
  message: string;
}

export function EmptyData({ children, title, message }: EmptyDataProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>

        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <div className="flex gap-2">
          {children}

          <Link href={"/dashboard"}>
            <Button className="cursor-pointer" variant="outline">
              Home
            </Button>
          </Link>
        </div>
      </EmptyContent>
    </Empty>
  );
}
