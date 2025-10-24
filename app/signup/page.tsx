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

export default function SignUpPage({}: React.ComponentProps<"div">) {
  const placeholderHero =
    "https://twftinvtkstgcriamblf.supabase.co/storage/v1/object/public/placeholders/hero.jpg";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? parseFloat(value) : value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setFormData({
      email: "",
      password: "",
    });

    router.push("/");
  }

  return (
    <Card className="bg-background border-none h-screen w-full rounded-none overflow-hidden p-0">
      <CardContent className="h-full grid p-0 md:grid-cols-2">
        <form
          className="px-8 sm:px-12 md:px-16 my-auto"
          onSubmit={handleSubmit}
        >
          <FieldGroup>
            <h1 className="text-foreground/50 text-2xl text-center font-bold uppercase">
              Cadastre-se
            </h1>

            <Field>
              <FieldLabel
                className="text-foreground/50 font-bold"
                htmlFor="email"
              >
                Email
              </FieldLabel>
              <Input
                className="bg-card/25 text-foreground rounded-none border-card"
                placeholder="exemplo@email.com"
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <FieldLabel
                className="text-foreground/50 font-bold"
                htmlFor="password"
              >
                Password
              </FieldLabel>
              <Input
                className="bg-card/25 text-foreground rounded-none border-card"
                placeholder="********"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Field>

            <Field>
              <Button
                className="text-foreground font-bold cursor-pointer rounded-none tracking-wider text-md"
                type="submit"
              >
                Cadastrar
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Já possui uma conta?
              <Link href={"/login"}>
                <Button className="cursor-pointer uppercase" variant="link">
                  Login
                </Button>
              </Link>
            </FieldDescription>
          </FieldGroup>
        </form>

        <div className="relative hidden md:block">
          <Image
            src={placeholderHero}
            alt="Hero image"
            className="absolute object-cover"
            fill
          />
        </div>
      </CardContent>
    </Card>
  );
}
