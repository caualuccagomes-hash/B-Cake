"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Search, Plus, Flower2, ArrowLeft, ArrowRight } from "lucide-react";
import { products, type Product } from "@/lib/content";
import { Modal, useCart } from "./shell";
import { ReferencePhoto } from "./visuals";
export function Catalog({ gallery = false }: { gallery?: boolean }) {
  const [query, setQuery] = useState(""),
    [filter, setFilter] = useState("Todos"),
    [current, setCurrent] = useState(0);
  const { add } = useCart();
  const reduce = useReducedMotion();
  const categories = gallery
    ? ["Todos", "Floral", "Vintage", "Celebração"]
    : ["Todos", "Bolos decorados", "Doces", "Cupcakes"];
  const visible = products.filter(
    (p) =>
      (!gallery || p.photo !== undefined) &&
      (filter === "Todos" || (gallery ? p.style : p.category) === filter) &&
      p.name
        .toLocaleLowerCase("pt-BR")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          query
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        ),
  );
  const photo = (p: Product) =>
    p.photo !== undefined ? (
      <ReferencePhoto index={p.photo} label={p.description} />
    ) : (
      <div className="no-photo">
        <Flower2 size={50} strokeWidth={0.7} />
        <span>Um doce convite</span>
        <small>Fotografia em breve</small>
      </div>
    );
  return (
    <>
      <div className="catalog-toolbar">
        <div className="filters" aria-label="Filtrar criações">
          {categories.map((c) => (
            <button
              aria-pressed={filter === c}
              key={c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Buscar por nome"
            placeholder="Encontre uma inspiração"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="fine" role="status">
        {visible.length}{" "}
        {visible.length === 1
          ? "inspiração encontrada"
          : "inspirações encontradas"}
      </p>
      <motion.div layout={!reduce} className="catalog-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <motion.article
              layout={!reduce}
              key={p.id}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Modal
                title={gallery ? "Galeria de inspirações" : p.name}
                trigger={
                  <button
                    className="photo-button"
                    aria-label={`Ver detalhes de ${p.name}`}
                    onClick={() => setCurrent(visible.indexOf(p))}
                  >
                    {photo(p)}
                    <span className="photo-tag">
                      {p.reference ? "Referência visual" : "Destaque citado"}
                    </span>
                  </button>
                }
              >
                <div className="detail-photo">
                  {photo(gallery ? visible[current] || p : p)}
                </div>
                {gallery && (
                  <div className="gallery-nav">
                    <button
                      className="icon"
                      aria-label="Imagem anterior"
                      onClick={() =>
                        setCurrent(
                          (current - 1 + visible.length) % visible.length,
                        )
                      }
                    >
                      <ArrowLeft />
                    </button>
                    <span>
                      {current + 1} / {visible.length}
                    </span>
                    <button
                      className="icon"
                      aria-label="Próxima imagem"
                      onClick={() => setCurrent((current + 1) % visible.length)}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                )}
                <h3>{gallery ? (visible[current] || p).name : p.name}</h3>
                <p>{(gallery ? visible[current] || p : p).description}</p>
                <p className="fine">
                  Referência sujeita à confirmação. Sabores, tamanhos e valores
                  sob consulta.
                </p>
                <AddButton
                  id={gallery ? (visible[current] || p).id : p.id}
                  add={add}
                />
              </Modal>
              <div className="product-meta">
                <span>{gallery ? p.style : p.category}</span>
                <span>Sob consulta</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <AddButton id={p.id} add={add} />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && (
        <div className="empty">
          <Flower2 />
          <h3>Ainda não encontramos essa inspiração.</h3>
          <p>Tente outro nome ou explore todas as criações.</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setFilter("Todos");
            }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </>
  );
}
function AddButton({ id, add }: { id: string; add: (id: string) => void }) {
  const [added, setAdded] = useState(false);
  return (
    <button
      className="add-button"
      onClick={() => {
        add(id);
        setAdded(true);
      }}
    >
      <Plus size={16} />
      {added ? "Adicionado · adicionar mais" : "Adicionar à solicitação"}
    </button>
  );
}
