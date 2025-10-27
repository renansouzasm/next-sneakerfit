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
import { ProductBrand } from "@prisma/client";
import { displayErrorToast } from "@/utils/displayToast";

interface ProductCreationFormProps {
  isCreating: boolean;
  setIsCreating: Dispatch<SetStateAction<boolean>>;
}

export function ProductCreationForm({
  isCreating,
  setIsCreating,
}: ProductCreationFormProps) {
  const { createProduct } = useProductContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultForm = {
    name: "",
    brand: "NIKE" as ProductBrand,
    price: 1,
    stock: 0,
    thumbUrl: "/placeholder.svg",
  };
  const [form, setForm] = useState(defaultForm);

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
      await createProduct(form);
      setForm(defaultForm);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
      setIsCreating(false);
    }
  }

  return (
    <Dialog open={isCreating} onOpenChange={setIsCreating}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Produto</DialogTitle>
          <DialogDescription>
            Adicione um novo sneaker ao catálogo
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
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
              onClick={() => setIsCreating(false)}
            >
              Cancelar
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
