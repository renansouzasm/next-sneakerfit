"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductContext } from "../_context/ProductContext";
import { Product, ProductBrand } from "@prisma/client";
import { displayErrorToast } from "@/utils/displayToast";

interface ProductUpdateFormProps {
  product: Product;
  isUpdating: boolean;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
}

export function ProductUpdateForm({
  product,
  isUpdating,
  setIsUpdating,
}: ProductUpdateFormProps) {
  const { updateProduct } = useProductContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState(product);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value, type } = event.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) : value,
    }));
  }

  function handleSelect(value: string) {
    setForm((prev) => ({ ...prev, brand: value as ProductBrand }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProduct(form);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
      setIsUpdating(false);
    }
  }

  return (
    <Dialog open={isUpdating} onOpenChange={setIsUpdating}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto abaixo
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Air Jordan 1 Retro High"
              minLength={3}
              onChange={handleChange}
              value={form.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Marca</Label>
            <Select value={form.brand} onValueChange={handleSelect}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Selecione a marca" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ProductBrand.NIKE}>Nike</SelectItem>
                <SelectItem value={ProductBrand.ADIDAS}>Adidas</SelectItem>
                <SelectItem value={ProductBrand.NEW_BALANCE}>
                  New Balance
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <div className="space-y-2 w-1/2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                type="number"
                placeholder="899.99"
                min={1}
                onChange={handleChange}
                value={form.price}
                required
              />
            </div>
            <div className="space-y-2 w-1/2">
              <Label htmlFor="stock">Estoque</Label>
              <Input
                id="stock"
                type="number"
                placeholder="0"
                min={0}
                onChange={handleChange}
                value={form.stock}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              className="cursor-pointer"
              type="button"
              variant="outline"
              onClick={() => setIsUpdating(false)}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Atualizar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
