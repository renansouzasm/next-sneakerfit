"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppLayout from "../../../_components/AppLayout";
import MainHeader from "../../../_components/MainHeader";
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
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

import { Product, ProductBrand } from "@/app.types";
import { useProductActions } from "@/lib/hooks/useProductActions";
import { handleSuccessToast } from "@/utils/handleToast";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { updateProduct, deleteProduct, loading } = useProductActions();

  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    brand: "nike" as ProductBrand,
    price: "",
    stock: "",
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          throw new Error("Produto não encontrado.");
        }

        const data: Product = await response.json();

        setProduct(data);
        setForm({
          name: data.name,
          brand: data.brand,
          price: (data.price / 100).toFixed(2),
          stock: String(data.stock),
        });
      } catch (err) {
        console.error(err);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!product) return;

    const priceInCents = Math.round(Number(form.price) * 100);
    const stockInNumber = form.stock ? Number(form.stock) : 0;

    const updated = await updateProduct(String(id), {
      name: form.name,
      brand: form.brand,
      price: priceInCents,
      stock: stockInNumber,
    });

    if (updated) {
      handleSuccessToast("Produto atualizado com sucesso!");
      router.push("/dashboard/products");
    }
  }

  async function handleDelete() {
    if (!product) return;
    const confirmed = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmed) return;

    const success = await deleteProduct(String(id));
    if (success) {
      handleSuccessToast("Produto deletado com sucesso!");
      router.push("/dashboard/products");
    }
  }

  if (!product) {
    return (
      <AppLayout>
        <p className="text-gray-400">Carregando produto...</p>
      </AppLayout>
    );
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

        <MainHeader title={`Editar Produto`} />
      </div>

      <Card className="bg-[#161b22] border-[#21262d] max-w-2xl rounded-md">
        <CardHeader>
          <CardTitle className="text-white">Editar informações</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nome do Produto
              </Label>
              <Input
                id="name"
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
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Salvando..." : "Salvar Alterações"}
              </Button>

              <Button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600/30 text-red-400 hover:bg-red-600/20 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
