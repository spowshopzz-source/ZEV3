import black from "../assets/sneaker-black.png";
import white from "../assets/sneaker-white.png";
import aqua from "../assets/sneaker-aqua.png";
import burgundy from "../assets/sneaker-burgundy.png";
import asicsA from "../assets/asics-a.png";
import asicsB from "../assets/asics-b.png";
import asicsC from "../assets/asics-c.png";
import sauconyNoir from "../assets/saucony-noir.png";
import sauconyBlanc from "../assets/saucony-blanc.png";
import sauconyGris from "../assets/saucony-gris.png";
import sauconyBleu from "../assets/saucony-bleu.png";
import sauconyBordeaux from "../assets/saucony-bordeaux.png";

/*
 * ZEV SHOP — Shopify-shaped product schema.
 * CATALOG liste les produits dans l'ordre d'affichage (ASICS GEL-NYC = nouveau
 * modèle, mise en avant en premier). PRODUCTS est la liste plate de TOUTES les
 * variantes (toutes confondues) utilisée par les grilles, la recherche et le
 * panier. Field names mirror the Shopify Storefront API so the catalog can
 * later be swapped for a live Shopify fetch without touching the UI:
 *
 *  PRODUCT.title / description / vendor / availableForSale / priceRange
 *  PRODUCT.variants[] -> id, title, selectedOptions, image, price, available
 *
 * PRICE: intentionally left null — it renders as "Prix à définir" everywhere
 * and is meant to be filled from Shopify. Do NOT hardcode a price.
 *
 * `scale` / `shiftY` only compensate the baked-in glow halos / tighter crops
 * so all variants render perfectly aligned at identical size/position.
 * Glow/spotlight/shadow/Z-tint stay very subtle and neutral-leaning.
 *
 * gallery: presentation slots (main view, profil, arrière, détails,
 * lifestyle, portée). Only 'main' has an image today — map the remaining
 * slots to Shopify product images when connecting the store.
 */
const gallery = (main) => [
  { type: "main", label: "VUE PRINCIPALE", src: main },
  { type: "profil", label: "PROFIL", src: null },
  { type: "arriere", label: "ARRIÈRE", src: null },
  { type: "details", label: "DÉTAILS", src: null },
  { type: "lifestyle", label: "LIFESTYLE", src: null },
  { type: "portee", label: "PORTÉE", src: null },
];

export const CATALOG = [
  {
    handle: "asics-gel-nyc",
    title: "ASICS GEL-NYC",
    vendor: "ZEV SHOP",
    brand: "ASICS",
    productType: "SNEAKERS",
    description: "ASICS GEL-NYC — sneaker ZEV SHOP, trois coloris.",
    availableForSale: true,
    currencyCode: null, // set when Shopify connects
    priceRange: { min: null, max: null }, // set when Shopify connects
    options: [{ name: "Color", values: ["Coloris 1", "Coloris 2", "Coloris 3"] }],
    variants: [
      {
        id: "asics-01",
        title: "ASICS GEL-NYC — COLORIS 1",
        selectedOptions: { Color: "Coloris 1" },
        image: asicsA,
        price: null, // DÉFINI VIA SHOPIFY
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #F3E7EA, #C99AA9)",
        swatchFlat: "linear-gradient(135deg, #F3E7EA 0%, #F3E7EA 50%, #C99AA9 50%, #C99AA9 100%)",
        glow: "rgba(0, 0, 0, 0.24)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.26)",
        zTint: "rgba(190, 120, 145, 0.15)",
        scale: 0.657,
        shiftY: "0%",
        gallery: gallery(asicsA),
      },
      {
        id: "asics-02",
        title: "ASICS GEL-NYC — COLORIS 2",
        selectedOptions: { Color: "Coloris 2" },
        image: asicsB,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #EDF1F6, #7E9CC6)",
        swatchFlat: "linear-gradient(135deg, #EDF1F6 0%, #EDF1F6 50%, #7E9CC6 50%, #7E9CC6 100%)",
        glow: "rgba(0, 0, 0, 0.22)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.26)",
        zTint: "rgba(85, 115, 175, 0.16)",
        scale: 0.596,
        shiftY: "0.3%",
        gallery: gallery(asicsB),
      },
      {
        id: "asics-03",
        title: "ASICS GEL-NYC — COLORIS 3",
        selectedOptions: { Color: "Coloris 3" },
        image: asicsC,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #E7CBD3, #B27E8E)",
        swatchFlat: "linear-gradient(135deg, #E8DED0 0%, #E8DED0 50%, #B27E8E 50%, #B27E8E 100%)",
        glow: "rgba(0, 0, 0, 0.24)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.26)",
        zTint: "rgba(165, 105, 120, 0.14)",
        scale: 0.56,
        shiftY: "-0.6%",
        gallery: gallery(asicsC),
      },
    ],
  },
  {
    handle: "tn-sneaker",
    title: "TN",
    vendor: "ZEV SHOP",
    brand: "Nike",
    productType: "SNEAKERS",
    description: "TN — sneaker ZEV SHOP, quatre coloris.",
    availableForSale: true,
    currencyCode: null, // set when Shopify connects
    priceRange: { min: null, max: null }, // set when Shopify connects
    options: [{ name: "Color", values: ["Noir", "Blanche", "Cyan", "Rouge"] }],
    variants: [
      {
        id: "noir",
        title: "TN NOIR",
        selectedOptions: { Color: "Noir" },
        image: black,
        price: null, // DÉFINI VIA SHOPIFY
        oldPrice: null, // ancien prix (affiché barré si défini)
        discountPercent: null, // % promotion (affiché si défini)
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #2E2E2E, #050505)",
        swatchFlat: "#0A0A0A",
        glow: "rgba(0, 0, 0, 0.30)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.28)",
        zTint: "rgba(0, 0, 0, 0.16)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(black),
      },
      {
        id: "blanche",
        title: "TN BLANCHE",
        selectedOptions: { Color: "Blanche" },
        image: white,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #FFFFFF, #D8DEE6)",
        swatchFlat: "#F2F2F2",
        glow: "rgba(0, 0, 0, 0.14)",
        spotlight: "rgba(0, 0, 0, 0.04)",
        shadowTint: "rgba(10, 10, 10, 0.20)",
        zTint: "rgba(0, 0, 0, 0.055)",
        scale: 0.955,
        shiftY: "0%",
        gallery: gallery(white),
      },
      {
        id: "cyan",
        title: "TN CYAN",
        selectedOptions: { Color: "Cyan" },
        image: aqua,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "linear-gradient(160deg, #F4F4F4 45%, #19C8DC 100%)",
        swatchFlat: "linear-gradient(135deg, #F2F2F2, #19C8DC)",
        glow: "rgba(0, 0, 0, 0.24)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.26)",
        zTint: "rgba(0, 145, 185, 0.19)",
        scale: 0.601,
        shiftY: "2%",
        gallery: gallery(aqua),
      },
      {
        id: "rouge",
        title: "TN ROUGE",
        selectedOptions: { Color: "Rouge" },
        image: burgundy,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "linear-gradient(160deg, #7A1230 55%, #0A0A0A 100%)",
        swatchFlat: "linear-gradient(135deg, #7A1230, #0A0A0A)",
        glow: "rgba(0, 0, 0, 0.28)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(10, 10, 10, 0.27)",
        zTint: "rgba(165, 25, 50, 0.18)",
        scale: 0.557,
        shiftY: "6%",
        gallery: gallery(burgundy),
      },
    ],
  },
  {
    handle: "saucony-progrid-omni-9",
    title: "SAUCONY PROGRID OMNI 9",
    vendor: "ZEV SHOP",
    brand: "Saucony",
    productType: "SNEAKERS",
    description: "Saucony ProGrid Omni 9 — sneaker ZEV SHOP, cinq coloris.",
    availableForSale: true,
    currencyCode: null, // set when Shopify connects
    priceRange: { min: null, max: null }, // set when Shopify connects
    options: [{ name: "Color", values: ["Noir", "Blanc", "Gris / Argent", "Blanc / Bleu", "Blanc / Bordeaux"] }],
    // Grand logo ZEV SHOP (Z) en filigrane derrière la chaussure, comme les
    // TN — sa couleur = zTint, adaptée à chaque coloris.
    // Ombres déjà intégrées aux visuels → shadowTint transparent ; images
    // normalisées sur le même canevas 1200×800 que la TN noire → scale 1.0.
    variants: [
      {
        id: "saucony-noir",
        title: "SAUCONY PROGRID OMNI 9 — NOIR",
        selectedOptions: { Color: "Noir" },
        image: sauconyNoir,
        price: null, // DÉFINI VIA SHOPIFY
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "#141414",
        swatchFlat: "#141414",
        glow: "rgba(0, 0, 0, 0)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(0, 0, 0, 0)",
        zTint: "rgba(52, 56, 61, 0.16)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(sauconyNoir),
      },
      {
        id: "saucony-blanc",
        title: "SAUCONY PROGRID OMNI 9 — BLANC",
        selectedOptions: { Color: "Blanc" },
        image: sauconyBlanc,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "radial-gradient(circle at 35% 35%, #FFFFFF, #D8DEE6)",
        swatchFlat: "#F4F4F4",
        glow: "rgba(0, 0, 0, 0)",
        spotlight: "rgba(0, 0, 0, 0.04)",
        shadowTint: "rgba(0, 0, 0, 0)",
        zTint: "rgba(126, 132, 140, 0.22)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(sauconyBlanc),
      },
      {
        id: "saucony-gris",
        title: "SAUCONY PROGRID OMNI 9 — GRIS / ARGENT",
        selectedOptions: { Color: "Gris / Argent" },
        image: sauconyGris,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "linear-gradient(160deg, #ECECEC 45%, #9AA0A6 100%)",
        swatchFlat: "linear-gradient(135deg, #ECECEC, #9AA0A6)",
        glow: "rgba(0, 0, 0, 0)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(0, 0, 0, 0)",
        zTint: "rgba(128, 134, 142, 0.20)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(sauconyGris),
      },
      {
        id: "saucony-bleu",
        title: "SAUCONY PROGRID OMNI 9 — BLANC / BLEU",
        selectedOptions: { Color: "Blanc / Bleu" },
        image: sauconyBleu,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "linear-gradient(160deg, #F4F4F4 45%, #5FA8D3 100%)",
        swatchFlat: "linear-gradient(135deg, #F4F4F4, #5FA8D3)",
        glow: "rgba(0, 0, 0, 0)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(0, 0, 0, 0)",
        zTint: "rgba(95, 168, 211, 0.22)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(sauconyBleu),
      },
      {
        id: "saucony-bordeaux",
        title: "SAUCONY PROGRID OMNI 9 — BLANC / BORDEAUX",
        selectedOptions: { Color: "Blanc / Bordeaux" },
        image: sauconyBordeaux,
        price: null,
        oldPrice: null,
        discountPercent: null,
        available: true,
        swatch: "linear-gradient(160deg, #F4F4F4 45%, #7A1E2B 100%)",
        swatchFlat: "linear-gradient(135deg, #F4F4F4, #7A1E2B)",
        glow: "rgba(0, 0, 0, 0)",
        spotlight: "rgba(0, 0, 0, 0.05)",
        shadowTint: "rgba(0, 0, 0, 0)",
        zTint: "rgba(122, 30, 43, 0.22)",
        scale: 1.0,
        shiftY: "0%",
        gallery: gallery(sauconyBordeaux),
      },
    ],
  },
];
export const PRODUCT = CATALOG.find((p) => p.handle === "tn-sneaker");

/* Flat variant list used across pages — with UI aliases (name/index). */
export const PRODUCTS = CATALOG.flatMap((prod) =>
  prod.variants.map((v) => ({
    ...v,
    productHandle: prod.handle,
    watermark: prod.watermark || null,
    productTitle: prod.title,
    productType: prod.productType,
    name: v.title,
  }))
).map((v, i) => ({ ...v, index: String(i + 1).padStart(2, "0") }));
export const PRODUCT_COUNT = PRODUCTS.length;

/*
 * GROUPED_PRODUCTS — liste groupée par modèle (vendor + handle) pour les
 * grilles du catalogue. Chaque entrée expose son tableau `variants` prêt pour
 * la sélection de coloris directement depuis la carte. Dérivé de CATALOG
 * (source unique de vérité) — aucun produit n'est perdu, le regroupement
 * s'effectue uniquement au niveau de l'affichage. `siblings` est également
 * ajouté à chaque variante pour qu'une variante seule puisse retrouver ses
 * cousins (utilisé par la page produit).
 */
export const GROUPED_PRODUCTS = CATALOG.map((prod) => {
  const variants = prod.variants.map((v) => {
    const flat = PRODUCTS.find((p) => p.id === v.id);
    return {
      ...v,
      productHandle: prod.handle,
      productTitle: prod.title,
      productType: prod.productType,
      vendor: prod.vendor,
      name: v.title,
      index: flat ? flat.index : "01",
      // index local au groupe (01/03 pour ASICS, 01/04 pour TN)
      groupIndex: String(prod.variants.indexOf(v) + 1).padStart(2, "0"),
      groupCount: String(prod.variants.length).padStart(2, "0"),
    };
  });
  // enrichissement croisé : chaque variante connait ses cousins
  variants.forEach((v) => {
    v.siblings = variants;
  });
  return {
    handle: prod.handle,
    productTitle: prod.title,
    productType: prod.productType,
    vendor: prod.vendor,
    brand: prod.brand || null,
    variants,
    variantCount: variants.length,
  };
});

/* Marques disponibles — construit depuis CATALOG. Extensible : il suffit
   d'ajouter `brand: "..."` à une nouvelle entrée du catalogue. */
export const BRANDS = Array.from(
  new Set(CATALOG.map((p) => p.brand).filter(Boolean)),
).sort();

/*
 * Helper : retourne le groupe contenant une variante donnée, ou null.
 */
export function findGroup(variantId) {
  return GROUPED_PRODUCTS.find((g) => g.variants.some((v) => v.id === variantId)) || null;
}

export const SIZES = ["40", "41", "42", "43", "44", "45", "46"];

/*
 * Price rendering. Accepts:
 *   null / undefined            -> "Prix à définir" (editable placeholder)
 *   { amount, currencyCode }    -> Shopify price object, formatted
 *   string / number             -> rendered as given
 */
export function priceLabel(variant) {
  const price = variant && variant.price;
  if (price === null || price === undefined || price === "") return "Prix à définir";
  if (typeof price === "object" && price.amount !== undefined && price.amount !== null) {
    try {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: price.currencyCode || "EUR",
        minimumFractionDigits: Number(price.amount) % 1 === 0 ? 0 : 2,
      }).format(Number(price.amount));
    } catch (e) {
      return `${price.currencyCode || ""} ${price.amount}`.trim();
    }
  }
  return String(price);
}

/*
 * Frais de livraison — calculés sur le sous-total des produits (après
 * réductions éventuelles), avant les frais de livraison.
 * Délai standard estimé : 7 à 12 jours.
 */
export const SHIPPING_DELAY = "7 à 12 jours";
export const SHIPPING_RULES_LABEL = "5 € · 2,50 € dès 50 € · offerte dès 100 €";
export function shippingCost(subtotal) {
  if (subtotal === null || subtotal === undefined) return null;
  if (subtotal >= 100) return 0;
  if (subtotal >= 50) return 2.5;
  return 5;
}
export function eurLabel(amount) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}
