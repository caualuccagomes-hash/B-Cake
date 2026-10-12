"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="wrap section centered">
      <h1>
        Vamos tentar <em>novamente?</em>
      </h1>
      <p>Não foi possível carregar esta parte do site.</p>
      <button className="button" onClick={reset}>
        Tentar novamente
      </button>
    </section>
  );
}
