import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";

export function LoadingData() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>

        <EmptyTitle>Carregando Informações</EmptyTitle>

        <EmptyDescription>
          Aguarde enquanto processamos sua solicitação. Não atualize a página.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
