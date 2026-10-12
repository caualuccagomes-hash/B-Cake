"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Dialog } from "@base-ui/react/dialog";
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import {
  business,
  products,
  sanitizeCart,
  orderMessage,
  whatsappUrl,
  type CartItem,
} from "@/lib/content";
type Context = { items: CartItem[]; add: (id: string) => void };
const Cart = createContext<Context>({ items: [], add: () => {} });
export const useCart = () => useContext(Cart);
const links = [
  ["/catalogo", "Nossas criações"],
  ["/galeria", "Galeria"],
  ["/sobre", "A BêCake"],
  ["/contato", "Contato"],
];
export function Modal({
  trigger,
  title,
  children,
  className = "",
}: {
  trigger: React.ReactElement;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger render={trigger} />
      <Dialog.Portal>
        <Dialog.Backdrop className="backdrop" />
        <Dialog.Popup className={`modal ${className}`}>
          <Dialog.Title className="modal-title">{title}</Dialog.Title>
          <Dialog.Close className="icon close" aria-label="Fechar">
            <X />
          </Dialog.Close>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function CopyMessage({ message }: { message: string }) {
  const [status, setStatus] = useState("");
  return (
    <>
      <button
        className="button secondary"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(message);
            setStatus("Mensagem copiada.");
          } catch {
            setStatus("Selecione e copie a mensagem abaixo.");
          }
        }}
      >
        Copiar mensagem
      </button>
      <span role="status">{status}</span>
      <details>
        <summary>Ver mensagem</summary>
        <textarea
          aria-label="Mensagem para copiar"
          readOnly
          value={message}
          rows={8}
        />
      </details>
    </>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]),
    [ready, setReady] = useState(false),
    [notice, setNotice] = useState(""),
    [note, setNote] = useState("");
  const path = usePathname();
  useEffect(() => {
    try {
      setItems(
        sanitizeCart(
          JSON.parse(localStorage.getItem("becake-request") || "[]"),
        ),
      );
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem("becake-request", JSON.stringify(items));
      } catch {}
  }, [items, ready]);
  const add = (id: string) => {
    setItems((old) => {
      const found = old.find((x) => x.id === id);
      return found
        ? old.map((x) =>
            x.id === id ? { ...x, quantity: Math.min(99, x.quantity + 1) } : x,
          )
        : [...old, { id, quantity: 1 }];
    });
    setNotice(
      `${products.find((p) => p.id === id)?.name} adicionado à solicitação.`,
    );
  };
  const change = (id: string, n: number) =>
    setItems((old) =>
      old.map((x) =>
        x.id === id
          ? { ...x, quantity: Math.min(99, Math.max(1, x.quantity + n)) }
          : x,
      ),
    );
  const message = orderMessage(items, { Observações: note });
  return (
    <MotionConfig reducedMotion="user">
      <Cart.Provider value={{ items, add }}>
        <a className="skip" href="#conteudo">
          Pular para o conteúdo
        </a>
        <div className="topbar">
          FEITO COM CARINHO, EM TIANGUÁ — CE <span>DESDE 2020</span>
        </div>
        <header>
          <Link href="/" className="wordmark" aria-label="BêCake — início">
            BêCake<small>CONFEITARIA ARTESANAL</small>
          </Link>
          <nav aria-label="Principal" className="desktop-nav">
            {links.map(([href, label]) => (
              <Link
                aria-current={path === href ? "page" : undefined}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Modal
              title="Sua solicitação"
              className="request-panel"
              trigger={
                <button
                  className="bag"
                  aria-label={`Sua solicitação, ${items.reduce((n, i) => n + i.quantity, 0)} itens`}
                >
                  <ShoppingBag size={19} />
                  <span>{items.reduce((n, i) => n + i.quantity, 0)}</span>
                </button>
              }
            >
              <p>Suas ideias para um momento especial. Valor a confirmar.</p>
              {items.length === 0 ? (
                <p className="empty">
                  Sua solicitação está vazia. Explore nossas criações e escolha
                  uma referência.
                </p>
              ) : (
                items.map((i) => (
                  <div className="cart-row" key={i.id}>
                    <strong>{products.find((p) => p.id === i.id)?.name}</strong>
                    <div className="quantity">
                      <button
                        className="icon"
                        aria-label={`Diminuir ${i.id}`}
                        disabled={i.quantity === 1}
                        onClick={() => change(i.id, -1)}
                      >
                        <Minus size={15} />
                      </button>
                      <span>{i.quantity}</span>
                      <button
                        className="icon"
                        aria-label={`Aumentar ${i.id}`}
                        disabled={i.quantity === 99}
                        onClick={() => change(i.id, 1)}
                      >
                        <Plus size={15} />
                      </button>
                      <button
                        className="icon"
                        aria-label={`Remover ${i.id}`}
                        onClick={() =>
                          setItems((old) => old.filter((x) => x.id !== i.id))
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
              <label className="field">
                Observações
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  maxLength={1500}
                />
              </label>
              <a
                className="button"
                target="_blank"
                rel="noreferrer"
                href={whatsappUrl(message)}
              >
                Consultar pelo WhatsApp <ArrowUpRight size={17} />
              </a>
              <CopyMessage message={message} />
              <p className="fine">
                Enviar uma solicitação não confirma compra ou reserva.
              </p>
              <Link href="/encomenda" className="text-link">
                Preencher encomenda personalizada →
              </Link>
            </Modal>
            <Link className="button header-cta" href="/encomenda">
              Vamos celebrar <ArrowUpRight size={16} />
            </Link>
            <div className="mobile-menu">
              <Modal
                title="Explore a BêCake"
                trigger={
                  <button className="icon" aria-label="Abrir menu">
                    <Menu />
                  </button>
                }
              >
                <nav className="mobile-links">
                  {[
                    ["/", "Início"],
                    ...links,
                    ["/encomenda", "Encomenda personalizada"],
                  ].map(([href, label]) => (
                    <Dialog.Close render={<Link href={href} />} key={href}>
                      {label}
                    </Dialog.Close>
                  ))}
                </nav>
              </Modal>
            </div>
          </div>
        </header>
        <main id="conteudo">{children}</main>
        <footer>
          <div className="footer-main">
            <Link className="wordmark" href="/">
              BêCake<small>CONFEITARIA ARTESANAL</small>
            </Link>
            <p>
              Pequenos detalhes.
              <br />
              Doces memórias.
            </p>
            <div>
              <a href={business.instagram} target="_blank" rel="noreferrer">
                Instagram ↗
              </a>
              <a href={business.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp ↗
              </a>
            </div>
            <p>
              Tianguá — Ceará
              <br />
              <span className="fine">Artesanal desde 2020</span>
            </p>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} BêCake</span>
            <Link href="/privacidade">Privacidade</Link>
            <span>Feito para celebrar.</span>
          </div>
        </footer>
        <div className="sr-only" aria-live="polite">
          {notice}
        </div>
      </Cart.Provider>
    </MotionConfig>
  );
}
