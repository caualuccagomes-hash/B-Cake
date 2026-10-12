"use client";
import { useState } from "react";
import { useCart, CopyMessage } from "./shell";
import { orderMessage, whatsappUrl, products } from "@/lib/content";
export function OrderForm() {
  const { items } = useCart();
  const [message, setMessage] = useState(""),
    [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
  return (
    <form
      className="order-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const data = Object.fromEntries(
          new FormData(e.currentTarget).entries(),
        ) as Record<string, string>;
        const next: Record<string, string> = {};
        if (!data.Nome.trim()) next.Nome = "Informe seu nome.";
        if (!data.Data) next.Data = "Escolha a data desejada.";
        else if (data.Data < today)
          next.Data = "Escolha uma data a partir de hoje.";
        if (
          !data.Pessoas ||
          Number(data.Pessoas) < 1 ||
          Number(data.Pessoas) > 10000
        )
          next.Pessoas = "Informe uma quantidade entre 1 e 10.000 pessoas.";
        setErrors(next);
        if (Object.keys(next).length) {
          document.getElementById(Object.keys(next)[0])?.focus();
          setMessage("");
          return;
        }
        const [y, m, d] = data.Data.split("-");
        data.Data = `${d}/${m}/${y}`;
        const text = orderMessage(items, data);
        setMessage(text);
      }}
      onChange={() => setMessage("")}
    >
      <div className="form-grid">
        {[
          ["Nome", "Seu nome *", "text"],
          ["Data", "Data desejada *", "date"],
          ["Pessoas", "Quantidade aproximada de pessoas *", "number"],
        ].map(([name, label, type]) => (
          <label className="field" htmlFor={name} key={name}>
            {label}
            <input
              id={name}
              name={name}
              type={type}
              required
              min={type === "date" ? today : type === "number" ? 1 : undefined}
              max={type === "number" ? 10000 : undefined}
              maxLength={100}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {errors[name] && (
              <span className="error-text" id={`${name}-error`}>
                {errors[name]}
              </span>
            )}
          </label>
        ))}
        <label className="field">
          Tipo de celebração
          <select name="Celebração">
            <option>Aniversário</option>
            <option>Casamento</option>
            <option>Mesversário</option>
            <option>Presente</option>
            <option>Outra celebração</option>
          </select>
        </label>
        <label className="field">
          Produto ou estilo de interesse
          <input
            name="Interesse"
            placeholder="Ex.: bolo floral com laços"
            maxLength={200}
          />
        </label>
        <label className="field">
          Como gostaria de receber?
          <select name="Recebimento">
            <option>Retirada — a confirmar</option>
            <option>Entrega — consultar região e taxa</option>
            <option>Ainda não sei</option>
          </select>
        </label>
        <label className="field full">
          Preferências de decoração
          <textarea
            name="Decoração"
            placeholder="Cores, tema e detalhes que você imaginou…"
            maxLength={1500}
          />
        </label>
        <label className="field full">
          Observações
          <textarea
            name="Observações"
            placeholder="Conte o que mais precisamos saber para conversar sobre a sua ideia."
            maxLength={1500}
          />
        </label>
      </div>
      {items.length > 0 && (
        <aside className="form-summary">
          <h3>Na sua solicitação</h3>
          {items.map((i) => (
            <p key={i.id}>
              {i.quantity} × {products.find((p) => p.id === i.id)?.name}
            </p>
          ))}
          <p>Valor a confirmar.</p>
        </aside>
      )}
      <p className="fine">
        * Campos obrigatórios. Seus dados não são armazenados neste site. A
        mensagem será compartilhada com o WhatsApp somente quando você abrir a
        conversa.
      </p>
      <button type="submit" className="button">
        Preparar solicitação ↗
      </button>
      {message && (
        <div className="message-result" role="status">
          <h3>Sua mensagem está pronta.</h3>
          <p>
            Confira os detalhes abaixo e continue a conversa. A confeitaria
            precisa confirmar disponibilidade, valores e condições.
          </p>
          <pre>{message}</pre>
          <a
            className="button"
            href={whatsappUrl(message)}
            target="_blank"
            rel="noreferrer"
          >
            Abrir WhatsApp com a solicitação ↗
          </a>
          <CopyMessage message={message} />
        </div>
      )}
    </form>
  );
}
