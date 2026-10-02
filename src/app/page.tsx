import Image from "next/image";
import Cardapio from "@/components/Cardapio";
import { PromoCard } from "@/components/Estado";
import Foto from "@/components/Foto";
import ScrollHero from "@/components/ScrollHero";
import SmoothScroll from "@/components/SmoothScroll";
import Topo from "@/components/Topo";
import { negocio, promocoes } from "@/data/negocio";
import { lerManifest } from "@/lib/media";

const diaNum: Record<string, number> = { Segunda: 1, Quarta: 3, Quinta: 4, Domingo: 0 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: negocio.nome,
  description: negocio.slogan,
  url: negocio.dominio,
  image: `${negocio.dominio}/og.jpg`,
  logo: `${negocio.dominio}/logo-round.png`,
  telephone: [negocio.telemovelTel, negocio.fixoTel],
  servesCuisine: ["Pizza", "Esfiha", "Brasileira", "Hambúrgueres"],
  priceRange: "€€",
  hasMenu: `${negocio.dominio}/#cardapio`,
  acceptsReservations: false,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Dr. Fialho de Almeida, 20",
    addressLocality: "Braga",
    addressRegion: "Ferreiros",
    addressCountry: "PT",
  },
  sameAs: [negocio.instagram, negocio.facebook],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Wednesday", "Thursday"], opens: "18:00", closes: "22:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday", "Saturday"], opens: "18:00", closes: "23:45" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "23:30" },
  ],
};

const Zap = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M20 12a8 8 0 0 1-11.9 7L4 20l1.1-4A8 8 0 1 1 20 12Z" /></svg>
);
const Fone = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);

const sabores = [
  { chave: "pizza-classica", titulo: "Pizzas clássicas", texto: "Marguerita, Fiambre, Cheddar, Havaí… a partir de 9,90 €." },
  { chave: "pizza-especial", titulo: "Pizzas especiais", texto: "Camarão, Carne seca, Mata fome, À moda da casa." },
  { chave: "pizza-doce", titulo: "Pizzas doces", texto: "Nutella, morango, banana e chocolate." },
  { chave: "esfihas", titulo: "Esfihas", texto: "Salgadas e doces, ao preço por unidade." },
  { chave: "hamburguer", titulo: "Hambúrgueres", texto: "Artesanais de 130 g, a partir de 5,50 €." },
] as const;

export default function Home() {
  const { hero, images } = lerManifest();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SmoothScroll />
      <a className="salto" href="#cardapio">Saltar para o cardápio</a>
      <Topo />

      <main>
        <ScrollHero hero={hero} />

        <section id="sabores" className="seccao" aria-labelledby="t-sabores">
          <div className="contentor">
            <p className="sobretitulo">Do forno para a mesa</p>
            <h2 id="t-sabores">Cinco maneiras de matar a fome</h2>
            <ul className="sabores">
              {sabores.map((s) => (
                <li key={s.chave} className="sabor">
                  <a href="#cardapio">
                    <Foto img={images[s.chave]} legenda={s.titulo} sizes="(min-width: 900px) 33vw, 100vw" />
                    <div className="sabor__txt">
                      <h3>{s.titulo}</h3>
                      <p>{s.texto}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="promocoes" className="seccao seccao--escura" aria-labelledby="t-promo">
          <div className="contentor">
            <p className="sobretitulo">Promoções da semana</p>
            <h2 id="t-promo">Todos os dias há um motivo para pedir</h2>
            <ul className="promos">
              {promocoes.map((p) => (
                <li key={p.dia}>
                  <PromoCard dia={p.dia} diaSemana={diaNum[p.dia]} titulo={p.titulo} texto={p.texto} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Cardapio />

        <section id="sobre" className="seccao seccao--escura" aria-labelledby="t-sobre">
          <div className="contentor sobre">
            <div>
              <p className="sobretitulo">Sobre nós</p>
              <h2 id="t-sobre">Um cardápio luso-brasileiro pensado para si</h2>
              <p>A iFome traz a pizza ao estilo de São Paulo para Braga: massa feita com tempo, queijo à séria e sabores que misturam o melhor de Portugal e do Brasil — desde a pizza À Moda Portuguesa até à Calacatu, de calabresa com catupiry.</p>
              <p>Somos também esfiharia: as esfihas brasileiras, de carne, queijo, frango com catupiry ou doces com Nutella, são a casa. Para quem tem fome a sério, há combos até 30 esfihas e hambúrgueres artesanais de 130 g.</p>
              <ul className="selos">
                <li>Pizzas e pizzas doces</li><li>Esfihas salgadas e doces</li><li>Hambúrgueres artesanais</li><li>Entrega e take-away</li>
              </ul>
            </div>
            <div className="sobre__fotos">
              {images["ambiente"] || images["forno"] ? (
                <>
                  <Foto img={images["ambiente"]} legenda="A nossa casa" sizes="(min-width: 900px) 40vw, 100vw" className="foto--ambiente" />
                  <Foto img={images["forno"]} legenda="O forno" sizes="(min-width: 900px) 20vw, 50vw" className="foto--forno" />
                </>
              ) : (
                <Image src="/logo-round.png" alt="Logótipo iFome Pizzas, Esfihas e Lanches" width={320} height={320} className="sobre__logo" />
              )}
            </div>
          </div>
        </section>

        <section id="visite" className="seccao" aria-labelledby="t-visite">
          <div className="contentor visite">
            <div>
              <p className="sobretitulo">Onde estamos</p>
              <h2 id="t-visite">Visite-nos em Ferreiros</h2>
              <address>
                {negocio.moradaLinha}<br />{negocio.localidade}
              </address>
              <h3 className="h-pequeno">Horário de funcionamento</h3>
              <dl className="horario">
                {negocio.horario.map((h) => (
                  <div key={h.dias}><dt>{h.dias}</dt><dd>{h.horas}</dd></div>
                ))}
              </dl>
              <div className="visite__cta">
                <a className="btn btn--zap" href={`https://wa.me/${negocio.whatsapp}`} target="_blank" rel="noopener"><Zap />WhatsApp {negocio.telemovel}</a>
                <a className="btn btn--ghost-claro" href={`tel:${negocio.telemovelTel}`}><Fone />Telemóvel {negocio.telemovel}</a>
                <a className="btn btn--ghost-claro" href={`tel:${negocio.fixoTel}`}><Fone />Fixo {negocio.fixo}</a>
                <a className="btn btn--ghost-claro" href={negocio.mapaUrl} target="_blank" rel="noopener">Como chegar</a>
              </div>
            </div>
            <div className="mapa">
              <iframe title="Mapa da iFome Pizzaria, Rua Dr. Fialho de Almeida 20, Braga" src={negocio.mapaEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </section>
      </main>

      <footer className="rodape">
        <div className="contentor rodape__in">
          <p><b>iFome Pizzaria</b> · {negocio.slogan}</p>
          <p className="rodape__links">
            <a href={negocio.instagram} target="_blank" rel="noopener">Instagram @ifomepizzaria.pt</a>
            <a href={negocio.facebook} target="_blank" rel="noopener">Facebook</a>
            <a href={negocio.linktree} target="_blank" rel="noopener">Linktree</a>
            <a href="/menu-2026.pdf" target="_blank" rel="noopener">Cardápio em PDF</a>
          </p>
          <p className="rodape__peq">© {new Date().getFullYear()} iFome Pizzaria · ifomepizzaria.pt</p>
        </div>
      </footer>
    </>
  );
}
