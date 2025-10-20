"use client";

import Header from "./_components/header";
import Hero from "./_components/hero";
import Categories from "./_components/categories";
import Collection from "./_components/collection";
import News from "./_components/news";
import Footer from "./_components/footer";

export default function StorePage() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <Collection />
      <News />
      <Footer />
    </main>
  );
}
