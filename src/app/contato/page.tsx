import { business } from "@/lib/content";
export const metadata = {
  title: "Contato e localização",
  description:
    "Fale com a BêCake em Tianguá. Consulte horários, entrega e encomendas pelo WhatsApp.",
};
export default function Page() {
  return (
    <section className="wrap section page-section">
      <p className="eyebrow">ESTAMOS POR AQUI</p>
      <h1>
        Um olá já é um
        <br />
        <em>doce começo.</em>
      </h1>
      <div className="contact-grid">
        <div>
          <h2>Vamos conversar?</h2>
          <a
            className="button"
            target="_blank"
            rel="noreferrer"
            href={business.whatsapp}
          >
            Conversar pelo WhatsApp ↗
          </a>
          <p>
            <a href={`tel:${business.tel}`}>{business.phone}</a>
          </p>
          <a
            href={business.instagram}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            @becakeconfeitaria_ ↗
          </a>
        </div>
        <div>
          <h3>Encontre a BêCake</h3>
          <p>{business.address}</p>
          <a
            className="text-link"
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}`}
            target="_blank"
            rel="noreferrer"
          >
            Traçar rota no Google Maps ↗
          </a>
          <h3>Horários</h3>
          <p>{business.hours}.</p>
          <h3>Retirada ou entrega</h3>
          <p>
            Consulte regiões atendidas, taxas e condições com a confeitaria.
          </p>
        </div>
      </div>
    </section>
  );
}
