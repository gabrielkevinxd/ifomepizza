"use client";
import { useEffect, useState } from "react";
import { negocio } from "@/data/negocio";

function agoraEmLisboa() {
  const partes = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Lisbon", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => partes.find((x) => x.type === t)?.value ?? "";
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { dia, minutos: Number(get("hour")) * 60 + Number(get("minute")) };
}

export function useAberto() {
  const [aberto, setAberto] = useState<boolean | null>(null);
  useEffect(() => {
    const calc = () => {
      const { dia, minutos } = agoraEmLisboa();
      const h = negocio.horario.find((x) => x.abre.includes(dia));
      if (!h) return setAberto(false);
      const [fh, fm] = h.fecha.split(":").map(Number);
      setAberto(minutos >= 18 * 60 && minutos < fh * 60 + fm);
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, []);
  return aberto;
}

export function EstadoBadge() {
  const aberto = useAberto();
  if (aberto === null) return <span className="badge badge--neutro">&nbsp;</span>;
  return (
    <span className={`badge ${aberto ? "badge--aberto" : "badge--fechado"}`}>
      <i aria-hidden="true" />
      {aberto ? "Aberto agora" : "Fechado — abrimos às 18h00"}
    </span>
  );
}

export function PromoCard({ dia, diaSemana, titulo, texto }: { dia: string; diaSemana: number; titulo: string; texto: string }) {
  const [hoje, setHoje] = useState(false);
  useEffect(() => setHoje(agoraEmLisboa().dia === diaSemana), [diaSemana]);
  return (
    <article className={`promo ${hoje ? "promo--hoje" : ""}`}>
      <p className="promo__dia">{dia}{hoje && <span> · hoje</span>}</p>
      <h3>{titulo}</h3>
      <p>{texto}</p>
    </article>
  );
}
