"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { negocio } from "@/data/negocio";

const Fone = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);

/** Cabeçalho fixo: transparente sobre o hero, sólido com blur depois de rolar. */
export default function Topo() {
  const [solido, setSolido] = useState(false);
  useEffect(() => {
    const f = () => setSolido(window.scrollY > 40);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`topo ${solido ? "topo--solido" : ""}`}>
      <div className="contentor topo__in">
        <a href="#inicio" className="marca" aria-label="iFome Pizzaria — início">
          <Image src="/logo-round.png" alt="" width={44} height={44} priority />
          <span>iFome <em>Pizzaria</em></span>
        </a>
        <nav aria-label="Principal" className="nav">
          <a href="#cardapio">Cardápio</a>
          <a href="#sabores">Sabores</a>
          <a href="#promocoes">Promoções</a>
          <a href="#sobre">Sobre</a>
          <a href="#visite">Onde estamos</a>
        </nav>
        <a className="btn btn--pequeno" href={`tel:${negocio.telemovelTel}`}>
          <Fone /><span className="so-desktop">{negocio.telemovel}</span><span className="so-mobile">Ligar</span>
        </a>
      </div>
    </header>
  );
}
