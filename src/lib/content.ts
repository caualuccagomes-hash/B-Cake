export const business = {
  name: "BêCake",
  phone: "(88) 98119-6996",
  tel: "+5588981196996",
  whatsapp: "https://wa.me/5588981196996",
  instagram: "https://www.instagram.com/becakeconfeitaria_/",
  address: "R. Luiz Pinto de Mesquita — Centro, Tianguá — CE, 62320-000",
  hours: "Confirme os horários pelo WhatsApp",
  since: "2020",
  pending: [
    "Horários regulares e de sábado",
    "Sabores, tamanhos, preços e antecedência",
    "Regiões, taxas e condições de entrega",
    "Fotos originais em alta resolução e autorização de uso",
    "Domínio de produção",
  ],
};
export type Product = {
  id: string;
  name: string;
  category: string;
  style: string;
  description: string;
  photo?: number;
  reference: boolean;
};
export const products: Product[] = [
  {
    id: "floral",
    name: "Delicadeza floral",
    category: "Bolos decorados",
    style: "Floral",
    description:
      "Flores em rosa e detalhes dourados em uma referência delicada de decoração.",
    photo: 1,
    reference: true,
  },
  {
    id: "jardim",
    name: "Um pequeno jardim",
    category: "Bolos decorados",
    style: "Floral",
    description:
      "Flores e folhas coloridas dão o tom desta referência de celebração.",
    photo: 2,
    reference: true,
  },
  {
    id: "vintage",
    name: "Laços & suspiros",
    category: "Bolos decorados",
    style: "Vintage",
    description:
      "Laços suaves e acabamento vintage para inspirar a sua conversa com a BêCake.",
    photo: 4,
    reference: true,
  },
  {
    id: "doces",
    name: "Doces de celebração",
    category: "Doces",
    style: "Celebração",
    description:
      "Uma composição de doces em tons de rosa, branco e chocolate. Consulte as opções.",
    photo: 3,
    reference: true,
  },
  {
    id: "ferrero",
    name: "Ferrero Rocher",
    category: "Doces",
    style: "Destaques",
    description:
      "Destaque citado no material da marca. Apresentação, composição e disponibilidade sob consulta.",
    reference: false,
  },
  {
    id: "cupcake",
    name: "Cupcake",
    category: "Cupcakes",
    style: "Destaques",
    description:
      "Destaque citado no material da marca. Consulte sabores, decoração e disponibilidade.",
    reference: false,
  },
];
export type CartItem = { id: string; quantity: number };
export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  return products.flatMap((p) => {
    const i = value.find((v) => v?.id === p.id);
    return i && Number.isInteger(i.quantity) && i.quantity > 0
      ? [{ id: p.id, quantity: Math.min(99, i.quantity) }]
      : [];
  });
}
export function orderMessage(
  items: CartItem[],
  fields: Record<string, string> = {},
) {
  return [
    "Olá, BêCake! Gostaria de consultar uma encomenda.",
    ...Object.entries(fields)
      .filter(([, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v.trim()}`),
    items.length ? "\nReferências e interesses:" : "",
    ...items.map(
      (i) =>
        `${i.quantity} × ${products.find((p) => p.id === i.id)?.name ?? i.id}`,
    ),
    "\nGostaria de confirmar disponibilidade, valores e condições.",
  ]
    .filter(Boolean)
    .join("\n");
}
export const whatsappUrl = (message: string) =>
  `${business.whatsapp}?text=${encodeURIComponent(message)}`;
