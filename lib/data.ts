export type Pizza = {
  slug: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  tag?: string;
};

// OFFICIAL pizza shots from NYP CDN — mirrored locally
export const PIZZAS: Pizza[] = [
  {
    slug: "pepperoni-hot-honey",
    name: "Pepperoni Hot Honey",
    desc: "Pepperoni, hot honey, mozzarella en parmezaan.",
    price: "€13,99",
    image: "/assets/products/Pepperoni_Hot_honey_-10539.png",
    tag: "Nieuw",
  },
  {
    slug: "loaded-pepperoni",
    name: "Loaded Pepperoni",
    desc: "Dubbele pepperoni, extra kaas, oregano.",
    price: "€13,49",
    image: "/assets/products/Loaded_pepperoni_-10531.png",
    tag: "Populair",
  },
  {
    slug: "bbq-bacon-chicken",
    name: "BBQ Bacon & Chicken",
    desc: "100% kip-bacon, BBQ-saus, mozzarella, ui.",
    price: "€13,99",
    image: "/assets/products/BBQ_Bacon-8045.png",
  },
  {
    slug: "korean-chicken",
    name: "Korean Chicken Pizza",
    desc: "Krokante kip, Koreaanse gochujang-saus, lente-ui.",
    price: "€14,49",
    image: "/assets/products/dt_chicken_piri-9905.png",
    tag: "Nieuw",
  },
  {
    slug: "margherita",
    name: "Margherita",
    desc: "Tomatensaus, mozzarella, basilicum.",
    price: "€10,49",
    image: "/assets/products/Margherita-8046.png",
  },
  {
    slug: "salami",
    name: "Salami Pizza",
    desc: "Italiaanse salami, mozzarella, oregano.",
    price: "€11,99",
    image: "/assets/products/salami-10629.png",
  },
  {
    slug: "hawaii",
    name: "Hawai pizza",
    desc: "Ham, ananas, mozzarella — knapperig en fris.",
    price: "€11,99",
    image: "/assets/products/Hawaii-8059.png",
  },
  {
    slug: "4-cheese",
    name: "4 Cheese",
    desc: "Mozzarella, gouda, gorgonzola, parmezaan.",
    price: "€12,49",
    image: "/assets/products/4_cheese-8058.png",
  },
  {
    slug: "bbq-meatlovers",
    name: "BBQ Meatlovers",
    desc: "Voor échte vleesliefhebbers — BBQ, kip, bacon, salami.",
    price: "€13,99",
    image: "/assets/products/BBQ_meatlovers-8053.png",
  },
  {
    slug: "brooklyn-style",
    name: "Brooklyn Style",
    desc: "Pepperoni, salami, ham, kip, paprika.",
    price: "€13,49",
    image: "/assets/products/Brooklyn-8047.png",
  },
  {
    slug: "caprese",
    name: "Caprese",
    desc: "Mozzarella, tomaten, basilicum, balsamico.",
    price: "€12,49",
    image: "/assets/products/caprese-9548.png",
  },
  {
    slug: "teriyaki-chicken",
    name: "Teriyaki Chicken",
    desc: "Kip, teriyaki-saus, lente-ui, sesamzaad.",
    price: "€13,49",
    image: "/assets/products/Teriyaki-8044.png",
  },
];

// OFFICIAL deal banners from NYP
export const DEAL_BANNERS = [
  {
    coupon: "Coupon 1172",
    title: "50% korting op je 2e pizza",
    sub: "Geldig ma t/m do · alle bodems",
    big: "50%",
    label: "OP JE 2E PIZZA",
    badge: "OP ALLE BODEMS",
    image: "/assets/products/large_Member_pizza_frisdrank_be747d959b.jpg",
    valid: "Eindigt do 23:59",
  },
  {
    coupon: "Combideal",
    title: "11,49 per pizza bij 2× 25cm NY style",
    sub: "Bezorgen of afhalen · was €15,99 p.s.",
    big: "11.49",
    label: "P.P. BIJ 2 PIZZA'S",
    badge: "BIJ BEZORGEN & AFHALEN",
    image: "/assets/products/large_31024_Dessert_breads_v4_1134_x_1402_32548944d1.png",
    valid: "Iedere dag",
  },
  {
    coupon: "Coupon 181",
    title: "Pizza + 6 dough dippers",
    sub: "25cm NY-style + 6 dippers + saus",
    big: "14.99",
    label: "PIZZA + DIPPERS",
    badge: "MET GRATIS SAUS",
    image: "/assets/products/large_Advertisement_card_1134x754_dough_dippers_571680cfda.png",
    valid: "Tot zo 23:59",
  },
];

export const REWARDS = [
  { points: 50, name: "Gratis cookie", image: "/assets/products/large_gratiscookie_locked_4efa7b6a21.png" },
  { points: 100, name: "Dough Dippers", image: "/assets/products/large_Advertisement_card_1134x754_4_member_doughdippers_locked_b982393ca6.jpg" },
  { points: 200, name: "Chicken Fingers", image: "/assets/products/large_Advertisement_card_1134x754_4_member_chickenfingers_locked_8ff6b1e38a.jpg" },
  { points: 500, name: "Gratis pizza", image: "/assets/products/Margherita-8046.png" },
];

export const STATS = [
  { n: "200+", label: "Vestigingen" },
  { n: "1993", label: "Sinds" },
  { n: "30cm", label: "NY-style" },
  { n: "~28 min", label: "Bezorging" },
];

export const STORES_PREVIEW = [
  "Amsterdam", "Amersfoort", "Utrecht", "Rotterdam", "Den Haag",
  "Eindhoven", "Groningen", "Tilburg", "Almere", "Nijmegen",
  "Breda", "Apeldoorn",
];

export const BRAND = {
  name: "New York Pizza",
  tagline: "It's the dough.",
  founded: 1993,
  headOffice: "Amstelveen",
  appIos: "https://apps.apple.com/nl/app/new-york-pizza/id1481173283",
  appAndroid: "https://play.google.com/store/apps/details?id=com.mediabunker.nyp&hl=nl",
};
