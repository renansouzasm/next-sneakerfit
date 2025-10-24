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
import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomerContext } from "../../_context/CustomerContext";
import { displayErrorToast } from "@/utils/displayToast";
import { Customer } from "@prisma/client";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface CustomerActionsProps {
  customer: Customer;
}

export function CustomerActions({ customer }: CustomerActionsProps) {
  const { updateCustomer, deleteCustomer } = useCustomerContext();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: customer.name,
    email: customer.email,
  });

  const [preview, setPreview] = useState<string>(
    customer.avatarUrl || "/placeholderThumb.jpg"
  );

  const supabase = createSupabaseBrowserClient();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
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
    if (!file) return null;

    const fileName = `${crypto.randomUUID()}-${file.name}`;
    const bucket = "user-avatars";

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
      const finalImageUrl = newImageUrl ?? customer.avatarUrl ?? null;

      await updateCustomer({
        id: customer.id,
        name: form.name,
        email: form.email,
        avatarUrl: finalImageUrl,
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
      await deleteCustomer(customer.id);
    } catch (error) {
      displayErrorToast(String(error));
    }
  }

  return (
    <div className="space-x-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Editar</Button>
        </SheetTrigger>

        <SheetContent className="p-4 overflow-y-auto">
          <SheetHeader className="p-0">
            <SheetTitle>Editar cliente</SheetTitle>
            <SheetDescription>
              Atualize os dados do cliente e clique em salvar.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="grid gap-6 py-4">
            <div className="grid gap-4">
              <Label htmlFor="avatarUrl">Avatar</Label>
              <Image
                src={preview}
                alt="Cliente"
                width={80}
                height={80}
                unoptimized
                className="aspect-square w-20 rounded-md object-cover"
              />
              <Input
                ref={fileRef}
                id="avatarUrl"
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
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

      <Button variant="destructive" onClick={handleDelete}>
        Deletar
      </Button>
    </div>
  );
}
