import { Catalog } from "@/components/catalog";
export const metadata = {
  title: "Nossas criações",
  description:
    "Explore referências de bolos decorados, doces e cupcakes da BêCake. Valores e disponibilidade sob consulta.",
};
export default function Page() {
  return (
    <section className="wrap section page-section">
      <p className="eyebrow">ESCOLHA O QUE FAZ SEUS OLHOS BRILHAREM</p>
      <h1>
        Nossas <em>criações.</em>
      </h1>
      <p className="intro">
        Um começo para imaginar a sua celebração. Escolha referências e consulte
        as possibilidades com a BêCake.
      </p>
      <Catalog />
    </section>
  );
}
