"use client";
import { useMemo, useRef, useState } from "react";
import { bebidas, categorias, CategoriaId, eur, Item, itens } from "@/data/cardapio";
import { negocio } from "@/data/negocio";

type Linha = { chave: string; nome: string; variante: string; valor: number; qtd: number };
type Modo = "entrega" | "takeaway";

const semAcentos = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function Cardapio() {
  const [cat, setCat] = useState<CategoriaId | "todas">("todas");
  const [q, setQ] = useState("");
  const [carrinho, setCarrinho] = useState<Linha[]>([]);
  const [aberto, setAberto] = useState(false);
  const [modo, setModo] = useState<Modo>("entrega");
  const [nome, setNome] = useState("");
  const [morada, setMorada] = useState("");
  const [obs, setObs] = useState("");
  const [aviso, setAviso] = useState("");
  const dialogo = useRef<HTMLDialogElement>(null);

  const filtrados = useMemo(() => {
    const t = semAcentos(q.trim());
    return itens.filter(
      (i) => (cat === "todas" || i.categoria === cat) && (!t || semAcentos(`${i.nome} ${i.descricao ?? ""} ${i.numero ?? ""}`).includes(t)),
    );
  }, [cat, q]);

  const total = carrinho.reduce((s, l) => s + l.valor * l.qtd, 0);
  const qtdTotal = carrinho.reduce((s, l) => s + l.qtd, 0);

  function adicionar(i: Item, rotulo: string, valor: number) {
    const chave = `${i.id}|${rotulo}`;
    const variante = i.precos.length > 1 ? rotulo : "";
    setCarrinho((c) => {
      const ex = c.find((l) => l.chave === chave);
      return ex
        ? c.map((l) => (l.chave === chave ? { ...l, qtd: l.qtd + 1 } : l))
        : [...c, { chave, nome: i.numero ? `${i.numero}. ${i.nome}` : i.nome, variante, valor, qtd: 1 }];
    });
    setAviso(`${i.nome} ${variante} adicionado ao pedido`);
  }

  function alterar(chave: string, d: number) {
    setCarrinho((c) => c.flatMap((l) => (l.chave !== chave ? [l] : l.qtd + d > 0 ? [{ ...l, qtd: l.qtd + d }] : [])));
  }

  function abrir() {
    setAberto(true);
    dialogo.current?.showModal();
  }
  function fechar() {
    setAberto(false);
    dialogo.current?.close();
  }

  const msg = useMemo(() => {
    const linhas = carrinho.map((l) => `• ${l.qtd}x ${l.nome}${l.variante ? ` (${l.variante})` : ""} — ${eur(l.valor * l.qtd)}`);
    return [
      `Olá, iFome! Gostaria de fazer um pedido para ${modo === "entrega" ? "ENTREGA" : "TAKE-AWAY"}:`,
      "",
      ...linhas,
      "",
      `Total: ${eur(total)}`,
      nome ? `Nome: ${nome}` : null,
      modo === "entrega" && morada ? `Morada: ${morada}` : null,
      obs ? `Observações: ${obs}` : null,
    ]
      .filter((x): x is string => x !== null)
      .join("\n");
  }, [carrinho, modo, nome, morada, obs, total]);

  const urlZap = `https://wa.me/${negocio.whatsapp}?text=${encodeURIComponent(msg)}`;
  const abaixoMinimo = modo === "entrega" && total < negocio.entregaMinima;
  const pronto = carrinho.length > 0 && !abaixoMinimo && (modo === "takeaway" || morada.trim().length > 3);

  return (
    <section id="cardapio" className="seccao" aria-labelledby="t-cardapio">
      <div className="contentor">
        <p className="sobretitulo">Cardápio 2026</p>
        <h2 id="t-cardapio">Escolha, junte ao pedido e envie por WhatsApp</h2>

        <div className="barra-filtros">
          <label className="pesquisa">
            <span className="sr-only">Pesquisar no cardápio</span>
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
            <input type="search" placeholder="Pesquisar: frango, camarão, nutella, 17…" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="chips" role="group" aria-label="Filtrar por categoria">
            {[{ id: "todas" as const, nome: "Tudo" }, ...categorias].map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
                {c.nome}
              </button>
            ))}
          </div>
        </div>

        <div role="status" aria-live="polite" className="sr-only">{aviso}</div>

        {filtrados.length === 0 && (
          <p className="vazio">Não encontrámos nada para «{q}». Experimente outro ingrediente ou <button className="link" onClick={() => { setQ(""); setCat("todas"); }}>limpe a pesquisa</button>.</p>
        )}

        {categorias.map((c) => {
          const lista = filtrados.filter((i) => i.categoria === c.id);
          if (!lista.length) return null;
          return (
            <div key={c.id} className="grupo">
              <h3>{c.nome}</h3>
              {c.nota && <p className="nota">{c.nota}</p>}
              <ul className="lista">
                {lista.map((i) => (
                  <li key={i.id} className="prato">
                    <div className="prato__texto">
                      <p className="prato__nome">
                        {i.numero && <span className="num">{String(i.numero).padStart(2, "0")}</span>}
                        {i.nome}
                      </p>
                      {i.descricao && <p className="prato__desc">{i.descricao}</p>}
                    </div>
                    <div className="precos">
                      {i.precos.map((pr) => (
                        <button
                          key={pr.rotulo}
                          type="button"
                          className="preco"
                          onClick={() => adicionar(i, pr.rotulo, pr.valor)}
                          aria-label={`Adicionar ${i.nome}${i.precos.length > 1 ? `, ${pr.rotulo}` : ""}, ${eur(pr.valor)}`}
                        >
                          <span className="txt">
                            {i.precos.length > 1 && <small>{pr.rotulo}</small>}
                            <b>{eur(pr.valor)}</b>
                          </span>
                          <span aria-hidden="true" className="mais">+</span>
                        </button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {(cat === "todas" || cat === "extras") && !q && (
          <p className="nota nota--bebidas">Bebidas: {bebidas.join(" · ")}. Consulte os preços por telefone ou WhatsApp.</p>
        )}
        <p className="nota">Preços e disponibilidade conforme o cardápio em vigor. <a href="/menu-2026.pdf" target="_blank" rel="noopener">Ver o cardápio original (PDF)</a>.</p>
      </div>

      {qtdTotal > 0 && (
        <div className="carrinho-barra">
          <button type="button" className="btn btn--zap carrinho-barra__btn" onClick={abrir}>
            <span>Ver pedido ({qtdTotal})</span>
            <b>{eur(total)}</b>
          </button>
        </div>
      )}

      <dialog ref={dialogo} data-lenis-prevent className="gaveta" onClose={() => setAberto(false)} onClick={(e) => e.target === e.currentTarget && fechar()} aria-labelledby="t-pedido">
        {aberto && (
          <div className="gaveta__corpo">
            <div className="gaveta__topo">
              <h3 id="t-pedido">O seu pedido</h3>
              <button type="button" className="icone-btn" onClick={fechar} aria-label="Fechar pedido">
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <ul className="linhas">
              {carrinho.map((l) => (
                <li key={l.chave}>
                  <div>
                    <p>{l.nome}</p>
                    <small>{l.variante} {eur(l.valor)}</small>
                  </div>
                  <div className="qtd">
                    <button type="button" onClick={() => alterar(l.chave, -1)} aria-label={`Menos um ${l.nome}`}>−</button>
                    <output>{l.qtd}</output>
                    <button type="button" onClick={() => alterar(l.chave, 1)} aria-label={`Mais um ${l.nome}`}>+</button>
                  </div>
                </li>
              ))}
              {carrinho.length === 0 && <li className="vazio">O pedido está vazio.</li>}
            </ul>

            <fieldset className="modo">
              <legend>Como quer receber?</legend>
              <label><input type="radio" name="modo" checked={modo === "entrega"} onChange={() => setModo("entrega")} /> Entrega ao domicílio</label>
              <label><input type="radio" name="modo" checked={modo === "takeaway"} onChange={() => setModo("takeaway")} /> Take-away</label>
            </fieldset>

            <label className="campo">O seu nome
              <input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" />
            </label>
            {modo === "entrega" && (
              <label className="campo">Morada de entrega
                <input value={morada} onChange={(e) => setMorada(e.target.value)} autoComplete="street-address" aria-invalid={!morada.trim()} />
              </label>
            )}
            <label className="campo">Observações (ex.: ingredientes de «Você decide», sem cebola…)
              <textarea rows={2} value={obs} onChange={(e) => setObs(e.target.value)} />
            </label>

            {abaixoMinimo && <p className="erro" role="alert">Valor mínimo para entrega: {eur(negocio.entregaMinima)}. Faltam {eur(negocio.entregaMinima - total)}.</p>}
            {modo === "entrega" && !morada.trim() && carrinho.length > 0 && !abaixoMinimo && <p className="erro">Indique a morada para a entrega.</p>}

            <div className="gaveta__total"><span>Total</span><b>{eur(total)}</b></div>
            <a
              className={`btn btn--zap btn--cheio ${pronto ? "" : "btn--off"}`}
              href={pronto ? urlZap : undefined}
              aria-disabled={!pronto}
              target="_blank"
              rel="noopener"
              onClick={(e) => !pronto && e.preventDefault()}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12Z" /></svg>
              Enviar pedido por WhatsApp
            </a>
            <p className="nota">O pedido abre no WhatsApp para o {negocio.telemovel}. A pizzaria confirma o pedido e o tempo de entrega.</p>
          </div>
        )}
      </dialog>
    </section>
  );
}
