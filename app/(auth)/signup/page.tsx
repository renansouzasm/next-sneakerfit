"use client";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { displayErrorToast } from "@/utils/displayToast";

export default function SignupPage({}: React.ComponentProps<"div">) {
  const backgroundImg =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/background.jpg";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      displayErrorToast(error.message || "Ocorreu um erro ao cadastrar.");
      setIsSubmitting(false);
      return;
    }

    setFormData({ email: "", password: "" });
    setIsSubmitting(false);

    router.push("/login");
  }

  return (
    <Card className="bg-background border-none h-screen w-full overflow-hidden p-0">
      <CardContent className="h-full grid p-0 md:grid-cols-2">
        <form
          className="px-8 sm:px-12 md:px-16 my-auto"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <h1 className="text-2xl text-center font-bold">Cadastro</h1>

            <Field>
              <FieldLabel htmlFor="email">E-mail</FieldLabel>
              <Input
                placeholder="exemplo@email.com"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                placeholder="********"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </Field>

            <Field>
              <Button
                className="font-bold cursor-pointer tracking-wider text-md"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Já possui possui uma conta?
              <Link href={"/login"}>
                <Button className="cursor-pointer" variant="link">
                  Login
                </Button>
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>

        <div className="relative hidden md:block">
          <Image
            src={backgroundImg}
            alt="Hero image"
            className="absolute object-cover"
            fill
          />
        </div>
      </CardContent>
    </Card>
  );
}
