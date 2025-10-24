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
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function CustomerAdd() {
  const { createCustomer } = useCustomerContext();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isOpen, setisOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultForm = {
    name: "",
    email: "",
  };

  const [form, setForm] = useState(defaultForm);
  const [preview, setPreview] = useState("/placeholderThumb.jpg");

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
    const bucket = "customer-avatars";

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
      const imageUrl = await uploadImage();
      await createCustomer({ ...form, avatarUrl: imageUrl });

      setForm(defaultForm);
      setPreview("/placeholderThumb.jpg");
      if (fileRef.current) fileRef.current.value = "";
      setisOpen(false);
    } catch (error) {
      displayErrorToast(String(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setisOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setisOpen(true)}>Adicionar Cliente</Button>
      </SheetTrigger>

      <SheetContent className="p-4 overflow-y-auto">
        <SheetHeader className="p-0">
          <SheetTitle>Adicionar cliente</SheetTitle>
          <SheetDescription>
            Preencha os dados do cliente e clique em salvar.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-4">
            <Label htmlFor="avatarUrl">Avatar</Label>
            <Image
              src={preview}
              alt="Preview do cliente"
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
              placeholder="Ex: João da Silva"
              minLength={3}
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
              placeholder="Ex: joao.silva@email.com"
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
  );
}
