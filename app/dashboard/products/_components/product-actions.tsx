"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductContext } from "../../_context/ProductContext";
import { displayErrorToast } from "@/utils/displayToast";
import { Product, ProductBrand } from "@prisma/client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Pencil, Trash } from "lucide-react";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { updateProduct, deleteProduct } = useProductContext();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: product.name,
    brand: product.brand,
    price: product.price / 100,
    stock: product.stock,
  });

  const [preview, setPreview] = useState<string>(
    product.thumbUrl || "/placeholderThumb.jpg"
  );

  const supabase = createSupabaseBrowserClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) : value,
    }));
  }

  function handleSelect(value: string) {
    setForm((prev) => ({ ...prev, brand: value as ProductBrand }));
  }

  function handleFileChange() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function uploadImage(): Promise<string | null> {
    const file = fileRef.current?.files?.[0];

    if (!file) {
      return null;
    }

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const bucket = "product-thumbs";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw new Error(`Erro no upload da imagem: ${error.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(data.path);

    return publicUrl;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newImageUrl = await uploadImage();

      const finalImageUrl = newImageUrl ?? product.thumbUrl ?? null;

      await updateProduct({
        id: product.id,
        name: form.name,
        brand: form.brand,
        stock: form.stock,
        price: form.price,
        thumbUrl: finalImageUrl,
      });

      setIsOpen(false);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(product.id);
    } catch (error) {
      displayErrorToast(String(error));
    }
  }

  return (
    <div className="space-x-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="text-foreground cursor-pointer" onClick={() => setIsOpen(true)}>
            <Pencil />
          </Button>
        </SheetTrigger>

        <SheetContent className="p-4 overflow-y-auto">
          <SheetHeader className="p-0">
            <SheetTitle>Editar produto</SheetTitle>
            <SheetDescription>
              Atualize os dados do produto e clique em salvar.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid gap-4">
              <Label htmlFor="thumbUrl">Imagem</Label>
              <Image
                src={preview}
                alt="Produto"
                width={80}
                height={80}
                unoptimized
                className="aspect-square w-20 rounded-md object-cover"
              />
              <Input
                ref={fileRef}
                id="thumbUrl"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Marca</Label>
              <Select onValueChange={handleSelect} value={form.brand}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Marcas</SelectLabel>
                    <SelectItem value="NIKE">Nike</SelectItem>
                    <SelectItem value="ADIDAS">Adidas</SelectItem>
                    <SelectItem value="NEW_BALANCE">New Balance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  pattern="^\d+(\.\d{1,2})?$"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <SheetFooter className="p-0 flex justify-between">
              <SheetClose asChild>
                <Button variant="outline">Cancelar</Button>
              </SheetClose>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <Button
        className="text-foreground/ cursor-pointer"
        variant="destructive"
        onClick={handleDelete}
      >
        <Trash />
      </Button>
    </div>
  );
}
