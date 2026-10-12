import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "A BêCake",
  description:
    "Conheça a BêCake, confeitaria artesanal em Tianguá, Ceará, com atuação desde 2020.",
};
export default function Page() {
  return (
    <section className="wrap section about-page">
      <div>
        <p className="eyebrow">DE TIANGUÁ, COM CARINHO</p>
        <h1>
          Doçura que faz parte
          <br />
          <em>dos seus momentos.</em>
        </h1>
        <p>
          Somos a BêCake, uma confeitaria artesanal em Tianguá, no Ceará, com
          atuação desde 2020.
        </p>
        <p>
          Flores, laços e detalhes delicados aparecem nas nossas criações e
          convidam a celebrar com personalidade. Aqui, cada referência é um
          ponto de partida para conversar sobre o que você imagina.
        </p>
        <Link href="/encomenda" className="button">
          Conte sua ideia ↗
        </Link>
      </div>
      <Image
        src="/images/atelier.webp"
        width={506}
        height={863}
        alt="Registro da BêCake fornecido para apresentação da confeitaria"
      />
    </section>
  );
}
