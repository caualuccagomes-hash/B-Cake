"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useState, type ReactNode } from "react";
const Scene = dynamic(() => import("./cake-scene"), {
  ssr: false,
  loading: () => (
    <p className="scene-loading" role="status">
      Preparando sua inspiração em 3D…
    </p>
  ),
});
class Boundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
export function CakeExperience() {
  const [active, setActive] = useState(false),
    [supported, setSupported] = useState(true);
  const activate = () => {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl2");
    setSupported(!!gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    setActive(true);
  };
  const fallback = (
    <div className="scene-fallback">
      <Image
        src="/images/hero.webp"
        alt="Inspiração ilustrativa de bolo floral"
        fill
        sizes="(max-width:760px) 90vw, 45vw"
      />
      <span>
        {active
          ? "Seu navegador não disponibilizou o 3D. A inspiração continua aqui."
          : "Uma ideia, muitas possibilidades."}
      </span>
    </div>
  );
  return (
    <div className="experience">
      <div>
        <p className="eyebrow">UM TOQUE DE IMAGINAÇÃO</p>
        <h2>
          Gire. Explore.
          <br />
          <em>Imagine o seu.</em>
        </h2>
        <p>
          Brinque com as cores e descubra cada ângulo de uma doce ideia para a
          sua celebração.
        </p>
        <p className="fine">
          Visualização ilustrativa. Cores, decoração e possibilidades reais
          precisam ser confirmadas com a confeitaria.
        </p>
        <a className="text-link" href="/encomenda">
          Contar minha ideia ↗
        </a>
      </div>
      <div className="scene-card">
        {active && supported ? (
          <Boundary fallback={fallback}>
            <Scene />
          </Boundary>
        ) : (
          fallback
        )}
        {!active && (
          <button className="button scene-activate" onClick={activate}>
            Explorar bolo em 3D ↗
          </button>
        )}
      </div>
    </div>
  );
}
