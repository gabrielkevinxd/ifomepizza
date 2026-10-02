// Fonte: MENU 2026 (PDF da pizzaria). Preços em euros.
export type CategoriaId = "pizzas" | "doces" | "esfihas" | "combos" | "hamburgueres" | "extras";
export type Preco = { rotulo: string; valor: number };
export type Item = {
  id: string;
  categoria: CategoriaId;
  numero?: number;
  nome: string;
  descricao?: string;
  precos: Preco[];
};

export const categorias: { id: CategoriaId; nome: string; nota?: string }[] = [
  { id: "pizzas", nome: "Pizzas", nota: "Todas as pizzas levam molho de tomate, orégano e azeitonas, exceto a Carbonara. Pizzas individuais acompanham refrigerante 33cl." },
  { id: "doces", nome: "Pizzas doces" },
  { id: "esfihas", nome: "Esfihas", nota: "Preço por unidade." },
  { id: "combos", nome: "Combos de esfihas" },
  { id: "hamburgueres", nome: "Hambúrgueres", nota: "Todos os hambúrgueres são fabricados com carne bovina." },
  { id: "extras", nome: "Extras" },
];

const T = ["Individual", "Média", "Grande"];
const p = (a: number, b: number, c: number): Preco[] => [
  { rotulo: T[0], valor: a },
  { rotulo: T[1], valor: b },
  { rotulo: T[2], valor: c },
];

type P = [number, string, string, number, number, number];
const pizzas: P[] = [
  [1, "À moda da casa", "Frango desfiado com mozzarella e catupiry", 13.9, 24.4, 29.4],
  [2, "À moda portuguesa", "Mozzarella, cogumelo, chouriço, fiambre e bacon", 11.9, 19.9, 24.9],
  [3, "Atum", "Atum e cebola", 9.9, 15.9, 20.9],
  [4, "Bacon", "Mozzarella e bacon", 9.9, 15.9, 20.9],
  [5, "Brasileira", "Atum, palmito, camarão, ovos e mozzarella", 14.9, 21.9, 26.9],
  [6, "Brócolis", "Brócolis, queijo mozzarella e bacon", 11.9, 19.9, 24.9],
  [7, "Caipira", "Frango desfiado, milho e catupiry", 13.4, 22.4, 27.4],
  [8, "Calabacon", "Calabresa, mozzarella e bacon", 11.9, 19.9, 24.9],
  [9, "Calabresa", "Queijo mozzarella, calabresa e cebola", 10.9, 19.4, 24.4],
  [10, "Calacatu", "Calabresa e catupiry", 12.9, 22.4, 27.4],
  [11, "Camarão", "Queijo mozzarella, camarão e cebola", 13.9, 23.9, 28.9],
  [12, "Carbonara", "Molho carbonara, mozzarella, bacon, ovo picado e cebola", 10.9, 19.9, 24.9],
  [13, "Carne seca", "Queijo mozzarella, carne seca e cebola", 13.9, 24.4, 29.4],
  [14, "Carne seca com catupiry", "Queijo mozzarella, carne seca e catupiry", 13.9, 24.4, 29.4],
  [15, "Catumarão", "Camarão e catupiry", 13.9, 23.9, 28.9],
  [16, "Cheddar", "Queijo mozzarella e cheddar", 9.9, 15.9, 20.9],
  [17, "Pernil com catupiry", "Mozzarella e pernil desfiado com catupiry ou cebola", 10.9, 19.4, 24.4],
  [18, "Cogumelo", "Queijo mozzarella e cogumelo fresco", 9.9, 15.9, 20.9],
  [19, "Cogumelo especial", "Queijo mozzarella, cogumelo fresco, pepperoni, pimento, ervilha e azeitonas fatiadas", 11.9, 20.9, 25.9],
  [20, "Crocante", "Mozzarella, milho, catupiry e batata palha", 12.9, 20.9, 25.9],
  [21, "Dois queijos", "Mozzarella e catupiry", 12.9, 20.9, 25.9],
  [22, "Fiambre", "Fiambre, queijo mozzarella e tomate", 9.9, 15.9, 20.9],
  [23, "Frango com catupiry ou cheddar", "Frango desfiado com catupiry", 12.9, 22.4, 27.4],
  [24, "Havaí", "Queijo mozzarella, fiambre e ananás", 9.9, 15.9, 20.9],
  [26, "La Grazia", "Frango desfiado, queijo mozzarella e bacon", 11.9, 20.9, 25.9],
  [27, "Lombo", "Lombinho, queijo mozzarella e cebola", 10.9, 19.9, 24.9],
  [28, "Madri", "Mozzarella, palmito, cogumelo, pepperoni e pimentos", 11.9, 20.9, 25.9],
  [29, "Mata fome", "Calabresa, fiambre, milho, ovo, cogumelo fresco, ervilha, queijo mozzarella e bacon", 13.9, 22.9, 27.9],
  [30, "Marguerita", "Mozzarella, parmesão ralado e manjericão", 9.9, 15.9, 20.9],
  [31, "Milho", "Milho coberto com mozzarella", 9.9, 15.9, 20.9],
  [32, "Modinha", "Fiambre, azeitonas picadas, catupiry, mozzarella e ovos", 11.9, 20.9, 25.9],
  [33, "Mozzarella", "Queijo mozzarella", 9.9, 15.9, 20.9],
  [34, "Napolitana", "Mozzarella, tomate fatiado e parmesão ralado", 9.9, 15.9, 20.9],
  [35, "Palmito", "Palmito picado e mozzarella", 11.9, 20.9, 25.9],
  [36, "Pepperoni", "Pepperoni e queijo mozzarella", 9.9, 15.9, 20.9],
  [37, "Peruana", "Atum e queijo mozzarella", 11.9, 20.9, 25.9],
  [38, "Portuguesa", "Fiambre, cebola, ervilha, ovos e mozzarella", 11.9, 20.9, 25.9],
  [39, "Quatro queijos", "Queijo mozzarella, catupiry, cheddar e parmesão ralado", 11.9, 20.9, 25.9],
  [40, "Rúcula", "Queijo mozzarella, tomate seco e rúcula", 11.9, 20.9, 25.9],
  [41, "Siciliana", "Bacon, cogumelo, mozzarella e parmesão ralado", 11.9, 20.9, 25.9],
];

const doces: [string, string, number, number, number][] = [
  ["Banana", "Chocolate, banana e canela", 11.9, 19.9, 24.9],
  ["Maluca", "Chocolate e chocolate granulado", 11.9, 19.9, 24.9],
  ["M&M's", "Chocolate com M&M's", 11.9, 19.9, 24.9],
  ["Sensação", "Chocolate, morango e leite condensado", 11.9, 19.9, 24.9],
  ["Nutella I", "Nutella e 1 fruta (banana ou morango)", 12.4, 20.4, 25.4],
  ["Nutella II", "Nutella com M&M's", 13.9, 21.9, 26.9],
  ["Prestígio", "Chocolate, chocolate granulado e coco ralado", 11.9, 19.9, 24.9],
  ["Romeu e Julieta", "Goiabada coberta com mozzarella", 11.9, 19.9, 24.9],
  ["KitKat", "Nutella e KitKat", 11.9, 20.9, 25.9],
  ["Dois amores", "Chocolate branco e Nutella", 11.9, 19.9, 24.9],
];

const esfihas: [string, number, string?][] = [
  ["Carne", 1.9], ["Queijo", 1.9], ["Calabresa", 1.9], ["Milho", 1.9], ["Frango", 1.9], ["Atum", 1.9],
  ["Atum com mozzarella", 2.1], ["Atum com catupiry", 2.1], ["Bacon com mozzarella", 2.1],
  ["Fiambre com mozzarella", 2.1], ["Brócolis", 2.1], ["Caipira", 2.1], ["Camarão com mozzarella", 2.4],
  ["Pernil com catupiry", 2.2], ["Carne seca com mozzarella", 2.4], ["Carne seca com catupiry", 2.7],
  ["Dois queijos", 2.1], ["Frango com mozzarella", 2.1], ["Frango com catupiry", 2.1],
  ["Palmito com mozzarella", 2.1], ["Camarão com catupiry", 2.7],
  ["Romeu e Julieta", 2.1, "Goiabada e mozzarella"], ["Nutella I", 2.1, "Nutella, banana e canela"],
  ["Nutella II", 2.1, "Nutella com morango"], ["Nutella III", 2.1, "Nutella com M&M's"],
  ["KitKat", 2.5], ["Chocolate", 1.9, "Chocolate ou chocolate branco + 1 ingrediente"],
];

const combos: [string, string, number][] = [
  ["Combo I", "12 esfihas: 6 carne, 6 queijo", 17],
  ["Combo II", "15 esfihas: 5 carne, 5 queijo, 5 calabresa", 20.5],
  ["Combo III", "20 esfihas: 5 carne, 5 calabresa, 5 queijo, 5 frango com catupiry", 28],
  ["Combo IV", "30 esfihas: 10 carne, 10 queijo, 5 bacon, 5 frango com catupiry", 40],
];

const hamb: [string, string, number][] = [
  ["X-Burguer", "Pão de hambúrguer, maionese, hambúrguer artesanal (130 g) e queijo mozzarella", 5.5],
  ["X-Salada", "Pão de hambúrguer, maionese, hambúrguer artesanal (130 g), queijo mozzarella, alface iceberg, tomate e cebola", 6.5],
  ["X-Bacon", "Pão de hambúrguer, maionese, hambúrguer artesanal (130 g), queijo mozzarella, bacon, alface iceberg, tomate e cebola", 7.5],
  ["X-Frango", "Pão de hambúrguer, maionese, frango filetado (130 g) e queijo mozzarella", 6.5],
  ["Burguer Monstro", "Pão de hambúrguer, maionese, 2 hambúrgueres artesanais (130 g), queijo mozzarella, alface iceberg, tomate e cebola", 9.5],
];

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const itens: Item[] = [
  ...pizzas.map(([n, nome, d, a, b, c]): Item => ({ id: `pizza-${n}`, categoria: "pizzas", numero: n, nome, descricao: d, precos: p(a, b, c) })),
  {
    id: "pizza-voce-decide", categoria: "pizzas", nome: "Você decide",
    descricao: "Escolha até 4 ingredientes e monte a sua pizza personalizada (indique-os nas observações)",
    precos: p(14.9, 23.9, 28.9),
  },
  ...doces.map(([nome, d, a, b, c]): Item => ({ id: `doce-${slug(nome)}`, categoria: "doces", nome, descricao: d, precos: p(a, b, c) })),
  ...esfihas.map(([nome, v, d]): Item => ({ id: `esfiha-${slug(nome)}`, categoria: "esfihas", nome, descricao: d, precos: [{ rotulo: "Unidade", valor: v }] })),
  ...combos.map(([nome, d, v]): Item => ({ id: `combo-${slug(nome)}`, categoria: "combos", nome, descricao: d, precos: [{ rotulo: "Combo", valor: v }] })),
  ...hamb.map(([nome, d, v]): Item => ({ id: `hamb-${slug(nome)}`, categoria: "hamburgueres", nome, descricao: d, precos: [{ rotulo: "Unidade", valor: v }] })),
  { id: "extra-batatas", categoria: "extras", nome: "Batatas fritas", descricao: "Acompanham bacon e cheddar", precos: [{ rotulo: "½ dose", valor: 4 }, { rotulo: "Dose", valor: 6.5 }] },
  { id: "extra-borda-cheddar-catupiry", categoria: "extras", nome: "Borda recheada — Cheddar ou Catupiry", precos: [{ rotulo: "Borda", valor: 4 }] },
  { id: "extra-borda-nutella", categoria: "extras", nome: "Borda recheada — Nutella", precos: [{ rotulo: "Borda", valor: 4 }] },
  { id: "extra-borda-chocolate", categoria: "extras", nome: "Borda recheada — Chocolate", precos: [{ rotulo: "Borda", valor: 4 }] },
];

export const bebidas = ["Cervejas", "Refrigerantes", "Compal", "Ice Tea", "Energético", "Vinhos"];

export const eur = (v: number) => v.toLocaleString("pt-PT", { style: "currency", currency: "EUR" });
