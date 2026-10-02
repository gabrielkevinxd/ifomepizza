"use client";
import { useEffect, useRef, useState } from "react";
import type { HeroManifest } from "@/lib/media";
import { EstadoBadge } from "./Estado";
import { negocio } from "@/data/negocio";

type Fase = { de: number; ate: number; node: React.ReactNode; classe?: string };

const Zap = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12Z" /></svg>
);
const Fone = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const pad = (n: number) => String(n).padStart(4, "0");

const FASES: Fase[] = [
  {
    de: 0, ate: 0.24, classe: "fase--abertura",
    node: (
      <>
        <EstadoBadge />
        <h1>Pizzas de São Paulo,<br /><span>agora em Braga.</span></h1>
        <p className="hero__lead">Mais de 20 anos de experiência. A melhor pizzaria e esfiharia brasileira de Ferreiros — para comer cá, levar ou receber em casa.</p>
        <div className="hero__cta">
          <a className="btn btn--zap" href="#cardapio"><Zap />Pedir agora</a>
          <a className="btn btn--ghost" href={`tel:${negocio.telemovelTel}`}><Fone />Ligar {negocio.telemovel}</a>
        </div>
      </>
    ),
  },
  { de: 0.28, ate: 0.5, node: (<><p className="sobretitulo">01 · A massa</p><h2>Massa feita com tempo.<br />Queijo à séria.</h2><p className="fase__txt">Mais de 40 sabores, desde a pizza À Moda Portuguesa até à Calacatu — do clássico ao inesperado.</p></>) },
  { de: 0.54, ate: 0.76, node: (<><p className="sobretitulo">02 · A casa</p><h2>Pizza, esfiha<br />e hambúrguer.</h2><p className="fase__txt">Esfihas salgadas e doces, combos até 30 unidades e hambúrgueres artesanais de 130 g.</p></>) },
  {
    de: 0.8, ate: 1.01,
    node: (
      <>
        <p className="sobretitulo">03 · A mesa</p>
        <h2>Fome? Peça já.</h2>
        <div className="hero__cta">
          <a className="btn btn--zap" href="#cardapio"><Zap />Ver cardápio e pedir</a>
          <a className="btn btn--ghost" href={`tel:${negocio.telemovelTel}`}><Fone />Ligar</a>
        </div>
      </>
    ),
  },
];

export default function ScrollHero({ hero }: { hero: HeroManifest | null }) {
  const secao = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const fasesRef = useRef<(HTMLDivElement | null)[]>([]);
  const barra = useRef<HTMLDivElement>(null);
  const [carregado, setCarregado] = useState(0);
  const [pronto, setPronto] = useState(false);
  const [estatico, setEstatico] = useState(!hero);

  useEffect(() => {
    const sec = secao.current, cv = canvas.current;
    if (!hero || !sec || !cv) { setEstatico(true); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setEstatico(true); return; }
    const ctx = cv.getContext("2d");
    if (!ctx) { setEstatico(true); return; }

    const movel = window.matchMedia("(max-width: 768px)").matches && !!hero.mobileFrameDir && !!hero.mobileFrameCount;
    const dir = movel ? hero.mobileFrameDir! : hero.frameDir;
    const total = movel ? hero.mobileFrameCount! : hero.frameCount;
    const frames: (HTMLImageElement | undefined)[] = new Array(total);
    let vivo = true, feitos = 0, atual = 0, alvo = 0, desenhado = -1, raf = 0, dpr = 1;

    const carregar = (i: number) =>
      new Promise<void>((ok) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => { frames[i] = img; ok(); };
        img.onerror = () => ok();
        img.src = `${dir}/${pad(i + 1)}.${hero.ext}`;
      });

    const medir = () => {
      dpr = Math.min(window.devicePixelRatio || 1, movel ? 1.5 : 2);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
      desenhado = -1;
    };

    const desenhar = (i: number) => {
      let img = frames[i];
      for (let d = 1; !img && d < total; d++) img = frames[i - d] ?? frames[i + d];
      if (!img) return;
      const cw = cv.width, ch = cv.height;
      const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight); // cover-fit
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const progresso = () => {
      const r = sec.getBoundingClientRect();
      const max = r.height - window.innerHeight;
      return max > 0 ? clamp(-r.top / max) : 0;
    };

    const atualizarFases = (p: number) => {
      FASES.forEach((f, k) => {
        const el = fasesRef.current[k];
        if (!el) return;
        const f1 = 0.035;
        const entra = k === 0 ? 1 : clamp((p - f.de) / f1);
        const sai = k === FASES.length - 1 ? 1 : clamp((f.ate - p) / f1);
        const o = Math.min(entra, sai);
        el.style.opacity = String(o);
        el.style.transform = `translate3d(0, ${(1 - entra) * 28 - (1 - sai) * 20}px, 0)`;
        el.style.visibility = o > 0.01 ? "visible" : "hidden";
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      });
      if (barra.current) barra.current.style.transform = `scaleY(${p})`;
    };

    const loop = () => {
      const p = progresso();
      alvo = p * (total - 1);
      atual += (alvo - atual) * 0.14; // lerp do índice
      if (Math.abs(alvo - atual) < 0.01) atual = alvo;
      const i = Math.round(atual);
      if (i !== desenhado) { desenhar(i); desenhado = i; }
      atualizarFases(p);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => medir();
    medir();
    window.addEventListener("resize", onResize);

    // Preload: 1.º frame já (desenha logo), restantes em paralelo limitado.
    (async () => {
      await carregar(0);
      if (!vivo) return;
      feitos = 1; setCarregado(1 / total);
      desenhar(0); desenhado = 0;
      let prox = 1;
      const worker = async () => {
        while (vivo && prox < total) {
          const i = prox++;
          await carregar(i);
          feitos++;
          if (feitos % 4 === 0 || feitos === total) setCarregado(feitos / total);
        }
      };
      await Promise.all(Array.from({ length: movel ? 4 : 6 }, worker));
      if (!vivo) return;
      setCarregado(1); setPronto(true);
    })();
    raf = requestAnimationFrame(loop);

    return () => { vivo = false; cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [hero]);

  const comCanvas = !estatico && !!hero;

  return (
    <section ref={secao} className={`hero ${comCanvas ? "hero--scrub" : "hero--estatico"}`} id="inicio" aria-label="Apresentação da iFome Pizzaria">
      <div className="hero__pin">
        <div className="hero__fundo" aria-hidden="true">
          {hero?.poster && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero.poster} alt="" className="hero__poster" fetchPriority="high" style={{ opacity: comCanvas && carregado > 0 ? 0 : 1 }} />
          )}
          {comCanvas && <canvas ref={canvas} className="hero__canvas" />}
          <div className="hero__veu" />
        </div>

        {comCanvas && !pronto && (
          <div className="hero__load" role="progressbar" aria-label="A carregar a animação" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(carregado * 100)}>
            <span style={{ transform: `scaleX(${carregado})` }} />
          </div>
        )}

        <div className="contentor hero__fases">
          {comCanvas ? (
            FASES.map((f, k) => (
              <div key={k} ref={(el) => { fasesRef.current[k] = el; }} className={`fase ${f.classe ?? ""}`} style={{ opacity: k === 0 ? 1 : 0, visibility: k === 0 ? "visible" : "hidden" }}>
                {f.node}
              </div>
            ))
          ) : (
            <div className="fase fase--fixa">{FASES[0].node}</div>
          )}
        </div>

        {comCanvas && (
          <div className="hero__dica" aria-hidden="true">
            <span>Role para ver</span>
            <i><b /></i>
            <div className="hero__prog"><div ref={barra} /></div>
          </div>
        )}
      </div>
    </section>
  );
}
