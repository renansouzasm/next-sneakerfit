"use client";

import { CustomerAdd } from "./_components/customer-add";

interface CustomerLayoutProps {
  children: React.ReactNode;
}

export default function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <section className="p-4 space-y-8">
      <header className="flex justify-between">
        <h1 className="font-bold">Clientes</h1>

        <CustomerAdd />
      </header>

      <main>{children}</main>
    </section>
  );
}
