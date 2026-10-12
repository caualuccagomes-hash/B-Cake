import Link from "next/link";
export default function NotFound() {
  return (
    <section className="wrap section centered">
      <p className="eyebrow">404</p>
      <h1>
        Essa página saiu
        <br />
        <em>da receita.</em>
      </h1>
      <Link href="/" className="button">
        Voltar ao início
      </Link>
    </section>
  );
}
