import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flower2, Heart, Sparkles } from "lucide-react";
import { business, products } from "@/lib/content";
import { Reveal, ReferencePhoto, Parallax } from "@/components/visuals";
import { CakeExperience } from "@/components/cake-experience";
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> CONFEITARIA ARTESANAL · TIANGUÁ
          </div>
          <h1>
            Há momentos
            <br />
            que merecem
            <br />
            um <em>doce encanto.</em>
          </h1>
          <p>
            Bolos, detalhes e afeto. Um convite para transformar
            <br className="desktop-only" /> a sua próxima celebração em uma doce
            memória.
          </p>
          <div className="hero-buttons">
            <a
              className="button"
              href={business.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Encomendar pelo WhatsApp <ArrowUpRight size={18} />
            </a>
            <Link className="text-link" href="/catalogo">
              Explorar nossas criações <span>↗</span>
            </Link>
          </div>
          <div className="hero-note">
            <Flower2 size={30} strokeWidth={1} />
            <span>
              De Tianguá, com carinho.
              <br />
              <b>Artesanal desde 2020.</b>
            </span>
          </div>
        </div>
        <div className="hero-art">
          <Parallax>
            <div className="hero-arch">
              <Image
                src="/images/hero.webp"
                alt="Conceito ilustrativo de bolo marfim com flores e decoração rosa delicada"
                fill
                sizes="(max-width: 760px) 90vw, 48vw"
                priority
              />
            </div>
          </Parallax>
          <div className="round-seal">
            FEITO PARA
            <br />
            <Heart size={24} strokeWidth={1} />
            <span>celebrar</span>
          </div>
          <span className="image-caption">
            Uma inspiração de doçura · imagem ilustrativa
          </span>
          <span className="art-star" aria-hidden="true">
            ✳
          </span>
        </div>
      </section>
      <div className="ribbon">
        <span>AFETO EM CADA DETALHE</span>
        <Flower2 />
        <span>CELEBRAÇÕES COM PERSONALIDADE</span>
        <Flower2 />
        <span>DOÇURA FEITA À MÃO</span>
        <Flower2 />
      </div>
      <section className="section wrap">
        <Reveal>
          <div className="section-heading">
            <div>
              <p className="eyebrow">O ENCANTO ESTÁ NOS DETALHES</p>
              <h2>
                Para cada momento,
                <br />
                uma <em>doce inspiração.</em>
              </h2>
            </div>
            <Link className="text-link" href="/catalogo">
              Conhecer as criações ↗
            </Link>
          </div>
        </Reveal>
        <div className="featured">
          {products.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} className={`feature feature-${i}`}>
              <Link href={`/catalogo?interesse=${p.id}`}>
                <ReferencePhoto index={p.photo!} label={p.description} />
                <div className="feature-title">
                  <h3>{p.name}</h3>
                  <span>↗</span>
                </div>
                <p>{p.style} · Referência de decoração</p>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="fine centered">
          Registros fornecidos pela marca. Estilos, valores e disponibilidade
          sob consulta.
        </p>
      </section>
      <section className="about-strip">
        <div className="wrap about-grid">
          <div className="about-photo">
            <Image
              src="/images/atelier.webp"
              alt="Registro fornecido da confeitaria BêCake"
              width={506}
              height={863}
              sizes="(max-width: 760px) 75vw, 300px"
            />
          </div>
          <Reveal>
            <p className="eyebrow">MUITO PRAZER, SOMOS A BÊCAKE</p>
            <h2>
              A beleza de celebrar
              <br />
              está nas <em>pequenas coisas.</em>
            </h2>
            <p>
              Desde 2020, a BêCake faz parte dos momentos doces em Tianguá, no
              Ceará. Uma confeitaria artesanal com um olhar delicado para os
              detalhes de cada celebração.
            </p>
            <Link className="text-link" href="/sobre">
              Conheça a BêCake ↗
            </Link>
          </Reveal>
          <Flower2 className="about-flower" strokeWidth={0.65} />
        </div>
      </section>
      <section className="section wrap">
        <CakeExperience />
      </section>
      <section className="steps section wrap">
        <p className="eyebrow">DO PRIMEIRO OLÁ À SUA CELEBRAÇÃO</p>
        <h2>
          Sua ideia. Nosso <em>próximo encontro.</em>
        </h2>
        <div className="steps-grid">
          {[
            [
              "01",
              "Encontre sua inspiração",
              "Explore as criações e salve suas referências favoritas.",
            ],
            [
              "02",
              "Conte a sua ideia",
              "Compartilhe a data, a ocasião e os detalhes que imaginou.",
            ],
            [
              "03",
              "Converse com a BêCake",
              "Confirme disponibilidade, valores e condições pelo WhatsApp.",
            ],
          ].map(([n, t, d]) => (
            <Reveal key={n}>
              <span className="step-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap home-contact">
        <div>
          <p className="eyebrow">ENCONTRE A BÊCAKE</p>
          <h2>
            Nosso cantinho
            <br />
            em <em>Tianguá.</em>
          </h2>
        </div>
        <div>
          <p>{business.address}</p>
          <p className="fine">
            {business.hours}. Entrega e condições sob consulta.
          </p>
          <Link href="/contato" className="text-link">
            Contato e como chegar ↗
          </Link>
        </div>
      </section>
      <section className="closing">
        <Sparkles size={27} strokeWidth={1} />
        <p className="eyebrow">VAMOS CRIAR UMA DOCE MEMÓRIA?</p>
        <h2>
          O seu próximo momento especial
          <br />
          começa com um <em>olá.</em>
        </h2>
        <Link href="/encomenda" className="button">
          Planejar minha encomenda <ArrowUpRight size={18} />
        </Link>
        <p className="fine">Tianguá — CE · {business.hours}</p>
      </section>
    </>
  );
}
