"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../_components/AppLayout";
import MainHeader from "../../_components/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { useCustomerActions } from "@/lib/hooks/useCurtomerActions";

interface CustomerForm {
  name: string;
  email: string;
  avatarUrl?: string;
}

export default function NewCustomerPage() {
  const router = useRouter();
  const { createCustomer, loading } = useCustomerActions();

  const [form, setForm] = useState<CustomerForm>({
    name: "",
    email: "",
    avatarUrl: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, email, avatarUrl } = form;

    if (!name || !email) {
      alert("Preencha o nome e o e-mail.");
      return;
    }

    const newCustomer = await createCustomer({ name, email, avatarUrl });

    if (newCustomer) router.push("/dashboard/customers");
  }

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

        <MainHeader title="Novo Cliente" />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Informações do Cliente</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome
              </Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-[#0d1117] border-[#21262d] text-white"
                placeholder="Ex: João Silva"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-[#0d1117] border-[#21262d] text-white"
                placeholder="Ex: joao@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl" className="text-white">
                Avatar (opcional)
              </Label>
              <Input
                id="avatarUrl"
                type="url"
                value={form.avatarUrl}
                onChange={(e) =>
                  setForm({ ...form, avatarUrl: e.target.value })
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
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Criando..." : "Criar Cliente"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
