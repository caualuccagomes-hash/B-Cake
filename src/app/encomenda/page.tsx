import { OrderForm } from "@/components/order-form";
export const metadata = {
  title: "Encomenda personalizada",
  description:
    "Conte sua ideia de encomenda para a BêCake e prepare uma solicitação pelo WhatsApp.",
};
export default function Page() {
  return (
    <section className="wrap section page-section narrow">
      <p className="eyebrow">CADA CELEBRAÇÃO COMEÇA COM UMA IDEIA</p>
      <h1>
        Vamos imaginar
        <br />
        <em>o seu momento?</em>
      </h1>
      <p className="intro">
        Conte um pouquinho do que você sonhou. Preparamos uma mensagem para
        continuar a conversa pelo WhatsApp.
      </p>
      <OrderForm />
    </section>
  );
}
