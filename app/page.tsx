"use client";

import Header from "../components/header";
import Hero from "../components/hero";
import Categories from "../components/categories";
import Collection from "../components/collection";
import News from "../components/news";
import Footer from "../components/footer";

export default function Home() {
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
