"use client";

interface OrderLayoutProps {
  children: React.ReactNode;
}

export default function OrderLayout({ children }: OrderLayoutProps) {
  return (
    <section className="p-4 space-y-8">
      <header className="flex justify-between">
        <h1 className="font-bold">Pedidos</h1>
      </header>

      <main>{children}</main>
    </section>
  );
}
