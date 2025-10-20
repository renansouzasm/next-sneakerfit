import Link from "next/link";

const News = () => {
  return (
    <section>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 text-white p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold header-font mb-4">
              Esta semana na SNKRS.
            </h3>

            <p className="mb-6 max-w-xs mx-auto">
              Tudo o que você precisa saber sobre a colaboração @DevinBook x
              Chevy. Confira o que está rolando de 15 a 19 de abril na SNKRS 🇺🇸
            </p>

            <Link
              href="https://x.com/nikestore/status/1912559113181016210"
              target="_blank"
              className="btn-outline"
            >
              Saiba mais
            </Link>
          </div>

          <div className="bg-zinc-900 text-white p-12 text-center flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold header-font mb-4">Não pisque.</h3>

            <p className="mb-6 max-w-xs mx-auto">
              O elétrico @JeremieFrimpong se junta à família New Balance.
            </p>

            <Link
              href="https://x.com/newbalance/status/1883802125488320787"
              target="_blank"
              className="btn-outline"
            >
              Saiba mais
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
