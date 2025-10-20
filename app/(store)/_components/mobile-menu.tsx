import { useMobileMenu } from "@/context/menu-context";
import { X, Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const MobileMenu = () => {
  const { setIsMenuOpen } = useMobileMenu();

  return (
    <div className="bg-zinc-950 fixed inset-0 z-[60] flex flex-col">
      <div className="flex justify-end p-4">
        <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <nav className="text-center">
          <ul className="space-y-6">
            <li>
              <Link
                href="/"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categorias
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Coleção
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Promoções
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-xl font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-6 flex justify-center space-x-8 text-gray-500">
        <Link href="#" aria-label="Facebook">
          <Facebook size={20} />
        </Link>
        <Link href="#" aria-label="Instagram">
          <Instagram size={20} />
        </Link>
        <Link href="#" aria-label="Twitter">
          <Twitter size={20} />
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
