"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "../../_components/AppLayout";
import MainHeader from "../../_components/MainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";
import { ProductBrand } from "@/app.types";
import Link from "next/link";
import { useProductActions } from "@/lib/hooks/useProductActions";
import { handleSuccessToast } from "@/utils/handleToast";

interface ProductForm {
  name: string;
  brand: ProductBrand;
  price: string;
  stock: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { createProduct, loading } = useProductActions();

  const [form, setForm] = useState<ProductForm>({
    name: "",
    brand: "nike",
    price: "",
    stock: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { name, brand, price, stock } = form;

    const stockInNumber = stock ? Number(stock) : 0;

    if (isNaN(Number(price)) || Number(price) <= 0) {
      alert("Preço inválido.");
      return;
    }

    const priceInCents = Math.round(Number(price) * 100);

    const newProduct = await createProduct({
      name,
      brand,
      price: priceInCents,
      stock: stockInNumber,
    });

    if (newProduct) {
      handleSuccessToast("Produto adicionado com sucesso!");
      router.push("/dashboard/products");
    }
  }

  return (
    <AppLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button
          className="text-muted-foreground hover:text-white"
          variant="ghost"
          size="icon"
        >
          <Link href="/dashboard/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        <MainHeader title="Novo Produto" />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Informações do Produto</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome do Produto
              </Label>
              <Input
                id="name"
                placeholder="Ex: Nike Air Max 270"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-[#0d1117] border-[#21262d] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Marca</Label>
              <Select
                value={form.brand}
                onValueChange={(value) =>
                  setForm({ ...form, brand: value as ProductBrand })
                }
              >
                <SelectTrigger className="bg-[#0d1117] border-[#21262d] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nike">Nike</SelectItem>
                  <SelectItem value="adidas">Adidas</SelectItem>
                  <SelectItem value="new-balance">New Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Preço (R$)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-white">
                  Estoque
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  className="bg-[#0d1117] border-[#21262d] text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                className="flex-1 bg-transparent border-[#21262d] text-white hover:bg-[#0d1117]"
                variant="outline"
                onClick={() => router.push("/dashboard/products")}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange text-white hover:bg-orange/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Criando..." : "Criar Produto"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
