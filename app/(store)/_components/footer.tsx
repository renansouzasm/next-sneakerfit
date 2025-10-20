import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zinc-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-sm font-bold uppercase mb-4">
              Informações da empresa
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Últimas notícias
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Contate-nos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase mb-4">Links de ajuda</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Monitorando
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Status do pedido
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Entrega
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Informações de envio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase mb-4">Links úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Ofertas Especiais
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Cartões-presente
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Anúncio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-text-light hover:text-primary text-sm"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-text-light mb-4 md:mb-0">
            Copyright 2025 © renansouzasm, Todos os direitos reservados
          </div>

          <div className="text-xs text-text-light">
            <Link href="#" className="hover:text-primary">
              Política de Privacidade
            </Link>
            <br />

            <Link href="#" className="hover:text-primary">
              Termos e Condições
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
