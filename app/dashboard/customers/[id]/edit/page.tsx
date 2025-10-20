"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "../../../_components/AppLayout";
import MainHeader from "../../../_components/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Customer } from "@/app.types";
import { useCustomerActions } from "@/lib/hooks/useCurtomerActions";

export default function EditCustomerPage() {
  const router = useRouter();
  const params = useParams();
  const { updateCustomer, loading } = useCustomerActions();

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    async function fetchCustomer() {
      const res = await fetch(`/api/customers/${params.id}`);
      const data = await res.json();
      setCustomer(data);
    }
    fetchCustomer();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!customer) return;

    const updated = await updateCustomer(customer.id, customer);
    if (updated) router.push("/dashboard/customers");
  }

  if (!customer) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          className="text-muted-foreground hover:text-white"
          variant="ghost"
          size="icon"
        >
          <Link href="/dashboard/customers">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <MainHeader title={`Editar: ${customer.name}`} />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Editar Cliente</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome
              </Label>
              <Input
                id="name"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                className="bg-[#0d1117] border-[#21262d] text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                className="bg-[#0d1117] border-[#21262d] text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-white">
                Avatar (opcional)
              </Label>
              <Input
                id="avatarUrl"
                type="url"
                value={
                  typeof customer.avatarUrl === "string"
                    ? customer.avatarUrl
                    : customer.avatarUrl?.src || ""
                }
                onChange={(e) =>
                  setCustomer({ ...customer, avatarUrl: e.target.value })
                }
                className="bg-[#0d1117] border-[#21262d] text-white"
                placeholder="URL da imagem do cliente"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-transparent border-[#21262d] text-white hover:bg-[#0d1117]"
                variant="outline"
                onClick={() => router.push("/dashboard/customers")}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange text-white hover:bg-orange/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
