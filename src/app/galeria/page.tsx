import { Catalog } from "@/components/catalog";
export const metadata = {
  title: "Galeria de inspirações",
  description:
    "Referências florais, vintage e de celebração, a partir dos registros fornecidos pela BêCake.",
};
export default function Page() {
  return (
    <section className="wrap section page-section">
      <p className="eyebrow">DETALHES QUE CONTAM HISTÓRIAS</p>
      <h1>
        Um olhar para <em>celebrar.</em>
      </h1>
      <p className="intro">
        Registros da marca para inspirar. Cada decoração é uma referência
        visual, sujeita à confirmação de disponibilidade.
      </p>
      <Catalog gallery />
    </section>
  );
}
