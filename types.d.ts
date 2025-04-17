import { StaticImageData } from "next/image";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

type Product = {
  id: number;
  name: string;
  price: number;
  image?: StaticImageData;
};

interface ProductCardProps {
  product: Product;
}
