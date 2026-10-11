import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, ShieldCheck, CreditCard, Gift, Mail, LayoutGrid, Shirt, Footprints } from "lucide-react";
import { api } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import LogoMark from "@/components/LogoMark";
import introCampaign from "@/assets/intro-campaign.jpg";
import introExtLeft from "@/assets/intro-ext-left.jpg";
import introExtRight from "@/assets/intro-ext-right.jpg";
import ProductCard from "@/components/ProductCard";
import Marquee from "@/components/Marquee";
import { PRODUCTS, GROUPED_PRODUCTS } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

/* 1 — Écran d'introduction : campagne plein écran (100vw × 100svh, aucun bord vide) */
function Intro() {
  const onDiscover = () => {
    // Défilement fluide vers NOTRE SÉLECTION, avec compensation du header
    const el = document.querySelector("[data-testid=selection-section]");
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2, offset: -72 });
    else {
      const y = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden bg-[#220407]"
      data-testid="intro-section"
    >
      {/* extensions latérales — fond de la photo prolongé (miroir fondu), invisibles
          à la jonction ; largeur variable continue, disparaissent sur les formats verticaux */}
      <div
        className="absolute left-0 top-0 h-full w-[max(0px,calc((100%-56.25svh)/2))] overflow-hidden"
        aria-hidden="true"
        data-testid="intro-ext-left"
      >
        <img
          src={introExtLeft}
          alt=""
          draggable="false"
          className="absolute right-0 top-0 h-full w-auto max-w-none select-none pointer-events-none"
        />
      </div>
      <div
        className="absolute right-0 top-0 h-full w-[max(0px,calc((100%-56.25svh)/2))] overflow-hidden"
        aria-hidden="true"
        data-testid="intro-ext-right"
      >
        <img
          src={introExtRight}
          alt=""
          draggable="false"
          className="absolute left-0 top-0 h-full w-auto max-w-none select-none pointer-events-none"
        />
      </div>

      {/* photo plein cadre — hauteur 100%, cadrage focus personnage (recadrage
          latéral automatique sur les formats verticaux). La marque est assurée
          par le header transparent au-dessus de l'image — aucun texte ajouté. */}
      <img
        src={introCampaign}
        alt="ZEV SHOP — campagne éditoriale"
        draggable="false"
        className="absolute left-1/2 top-0 h-full w-auto max-w-none -translate-x-1/2 select-none"
        data-testid="intro-campaign"
      />

      {/* CTA découverte — bas d'écran, zone noire de la photo */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 inset-x-0 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
      >
        <button
          type="button"
          onClick={onDiscover}
          data-testid="intro-discover-button"
          className="font-tech text-[11px] tracking-[0.35em] text-white border border-white/40 rounded-full px-10 py-3.5 hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer"
        >
          DÉCOUVRIR
        </button>
      </motion.div>
    </section>
  );
}

/* 2 — [SECTION SUPPRIMÉE] Ancienne section "NEW ARRIVALS" avec image éditoriale
   verte retirée à la demande du client — seule l'image rouge d'intro est conservée. */

/* Sections produit génériques — fonctionnent automatiquement avec de vraies données.
   `items` peut être soit une liste de groupes (nouveau format, GROUPED_PRODUCTS), soit
   une liste plate de variantes (compat ascendante). La carte sait traiter les deux. */
function ProductSection({ id, eyebrow, title, items, emptyNote, testid }) {
  const list = items || [];
  const isGrouped = list.length > 0 && Array.isArray(list[0].variants);
  return (
    <section id={id} className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-[1400px] mx-auto" data-testid={testid}>
      <div className="flex items-end justify-between mb-10 sm:mb-14">
        <div>
          <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">{eyebrow}</p>
          <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
            {title}
          </h2>
        </div>
        <Link
          to="/catalogue"
          className="hidden sm:flex items-center gap-2 font-tech text-[11px] tracking-[0.25em] text-black/55 hover:text-black transition-colors"
        >
          VOIR&nbsp;TOUT
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {list.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {list.map((p) =>
            isGrouped ? (
              <ProductCard key={p.handle} group={p} />
            ) : (
              <ProductCard key={p.id} product={p} />
            ),
          )}
        </div>
      ) : (
        <div className="border border-dashed border-black/15 rounded-3xl py-16 px-8 text-center">
          <p className="font-tech text-[11px] tracking-[0.25em] text-black/45">
            {emptyNote}
          </p>
        </div>
      )}
    </section>
  );
}

/* 4 — Catégories */
const CATEGORIES = [
  { slug: "chaussures", label: "CHAUSSURES", img: true },
  { slug: "vetements", label: "VÊTEMENTS", img: false },
  { slug: "accessoires", label: "ACCESSOIRES", img: false },
];

function Categories() {
  return (
    <section className="relative px-6 sm:px-10 pb-24 sm:pb-32 max-w-[1400px] mx-auto" data-testid="categories-section">
      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {CATEGORIES.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
          >
            <Link to={`/categorie/${c.slug}`} className="group block" data-testid={`category-card-${c.slug}`}>
              <div className="relative aspect-[4/5] bg-[#F6F6F5] border border-black/5 overflow-hidden flex items-center justify-center">
                {c.img ? (
                  <img
                    src={PRODUCTS.find((p) => p.id === "cyan").image}
                    alt={`ZEV SHOP — ${c.label}`}
                    draggable="false"
                    loading="lazy"
                    decoding="async"
                    className="w-[78%] object-contain select-none transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "drop-shadow(0 26px 24px rgba(0,0,0,0.18))" }}
                  />
                ) : (
                  <div className="z-watermark w-[58%] aspect-square bg-black/[0.055] transition-colors duration-500 group-hover:bg-black/[0.09]" />
                )}
              </div>
              <div className="flex items-center justify-between pt-5">
                <h3 className="font-display font-bold text-base sm:text-lg text-black tracking-wide">
                  {c.label}
                </h3>
                <span className="font-tech text-[10px] tracking-[0.3em] border border-black/20 rounded-full px-4 py-2 text-black/70 group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors duration-300">
                  VOIR
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* 5 — Notre histoire + arguments de marque */
function Story() {
  const args = [
    { icon: ShieldCheck, title: "QUALITÉ", text: "Des produits conçus pour une excellente expérience." },
    { icon: Truck, title: "LIVRAISON", text: "Délai standard estimé : 7 à 12 jours." },
    { icon: CreditCard, title: "PAIEMENTS", text: "De nouveaux moyens de paiement ajoutés progressivement." },
    { icon: Gift, title: "RÉCOMPENSE", text: "1 000 € d'achats → coupon de 100 €." },
  ];
  return (
    <section className="relative px-6 sm:px-10 py-24 sm:py-32 max-w-[1400px] mx-auto" data-testid="story-section">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">NOTRE&nbsp;HISTOIRE</p>
          <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-4 text-black leading-snug">
            C'est seulement le début de l'aventure ZEV SHOP.
          </h2>
          <p className="font-tech text-[11px] leading-loose tracking-[0.1em] text-black/55 mt-6 max-w-xl">
            Nous voulons constamment améliorer la qualité de nos produits — déjà conçus
            pour offrir une excellente expérience — mais surtout nos délais de livraison,
            pour rendre chaque commande plus rapide et plus agréable.
          </p>
          <Link
            to="/a-propos"
            data-testid="story-about-link"
            className="inline-flex items-center gap-2 mt-8 font-tech text-[11px] tracking-[0.3em] text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
          >
            À&nbsp;PROPOS&nbsp;DE&nbsp;NOUS
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {args.map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="border border-black/10 rounded-3xl p-6 bg-white"
            >
              <Icon className="w-5 h-5 text-black/70" strokeWidth={1.5} />
              <p className="font-display text-[11px] font-bold tracking-[0.25em] text-black mt-4">
                {title}
              </p>
              <p className="font-tech text-[10px] leading-relaxed tracking-[0.08em] text-black/50 mt-2">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Avis clients — vrais avis uniquement */
function HomeReviews() {
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    api("/reviews-summary").then(setSummary).catch(() => setSummary({ count: 0, average: null, latest: [] }));
  }, []);

  return (
    <section className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-[1400px] mx-auto border-t border-black/10" data-testid="home-reviews">
      <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">AVIS&nbsp;CLIENTS</p>
      <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
        Ce qu'ils en disent
      </h2>
      {summary && summary.count > 0 ? (
        <>
          <div className="flex items-center gap-3 mt-6" data-testid="home-reviews-average">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`w-4 h-4 ${summary.average && s <= Math.round(summary.average) ? "fill-black text-black" : "text-black/20"}`} />
              ))}
            </div>
            <p className="font-tech text-[11px] tracking-[0.25em] text-black/55">
              {summary.average}/5 — {summary.count} AVIS
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-8">
            {summary.latest.map((r) => (
              <div key={r.id} className="border border-black/10 rounded-3xl p-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? "fill-black text-black" : "text-black/20"}`} />
                  ))}
                </div>
                <p className="font-tech text-[11px] leading-relaxed tracking-[0.08em] text-black/65 mt-4">
                  {r.text}
                </p>
                <p className="font-tech text-[9px] tracking-[0.25em] text-black/35 mt-4">
                  {r.author} — {new Date(r.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="font-tech text-[11px] tracking-[0.15em] text-black/45 mt-8 border border-dashed border-black/15 rounded-3xl py-14 text-center">
          Aucun avis pour le moment. Les avis clients s'afficheront ici automatiquement.
        </p>
      )}
      <div className="mt-10 text-center">
        <p className="font-tech text-[10px] tracking-[0.25em] text-black/45 mb-5">
          REJOIGNEZ&nbsp;LA&nbsp;COMMUNAUTÉ&nbsp;ZEV&nbsp;SHOP
        </p>
        <a
          href="https://www.instagram.com/zzevshop/"
          target="_blank"
          rel="noreferrer"
          data-testid="reviews-instagram-cta"
          className="inline-flex items-center gap-2.5 font-tech text-[11px] tracking-[0.3em] text-white bg-[#8E1721] rounded-full px-8 py-4 hover:bg-[#761019] active:scale-[0.98] transition-all duration-200"
        >
          RETROUVEZ-NOUS&nbsp;SUR&nbsp;INSTAGRAM
        </a>
      </div>
    </section>
  );
}

/* UGC — emplacements Instagram / TikTok à remplir */
function UGC() {
  return (
    <section className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-[1400px] mx-auto border-t border-black/10" data-testid="ugc-section">
      <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">COMMUNAUTÉ</p>
      <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
        Portez&nbsp;ZEV,&nbsp;taguez-nous
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {["Instagram", "TikTok", "Instagram", "TikTok"].map((label, i) => (
          <a
            key={i}
            href={label === "Instagram" ? "https://www.instagram.com/zzevshop/" : "#"}
            target={label === "Instagram" ? "_blank" : undefined}
            rel={label === "Instagram" ? "noreferrer" : undefined}
            title={label === "Instagram" ? "ZEV SHOP sur Instagram" : `Ajouter le lien ${label}`}
            className="relative aspect-square bg-[#F6F6F5] border border-black/5 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-black/20 transition-colors duration-300"
            data-testid={`ugc-slot-${i}`}
          >
            <div className="z-watermark w-14 h-14 bg-black/[0.07]" />
            <p className="font-tech text-[9px] tracking-[0.25em] text-black/40 px-4 text-center">
              {label === "Instagram" ? "@ZZEVSHOP" : `AJOUTER LE LIEN ${label.toUpperCase()}`}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

/* Newsletter */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api("/newsletter", { method: "POST", body: { email } });
      setDone(true);
    } catch (error) {
      setErr(error.message || "Erreur — réessayez");
    }
  };

  return (
    <section id="newsletter" className="relative px-6 py-24 sm:py-32 border-t border-black/10 text-center" data-testid="newsletter-section">
      <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">NEWSLETTER</p>
      <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
        Rejoignez&nbsp;ZEV&nbsp;SHOP
      </h2>
      {done ? (
        <p className="font-tech text-[11px] tracking-[0.25em] text-black/60 mt-8" data-testid="newsletter-success">
          Inscription enregistrée. Merci.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-10" data-testid="newsletter-form">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            data-testid="newsletter-email-input"
            className="flex-1 h-14 px-6 font-tech text-[11px] tracking-[0.15em] border border-black/15 rounded-full text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
          />
          <button
            type="submit"
            data-testid="newsletter-submit-button"
            className="h-14 px-9 font-tech text-[10px] tracking-[0.3em] text-white bg-black rounded-full hover:bg-black/85 transition-colors cursor-pointer"
          >
            S'INSCRIRE
          </button>
        </form>
      )}
      {err && <p className="font-tech text-[10px] text-red-600 mt-4">{err}</p>}
    </section>
  );
}

/* Bandeau d'avantages — grenat signature, compact */
function BenefitsBar() {
  const items = [
    { icon: Truck, label: "LIVRAISON STANDARD ESTIMÉE : 7 À 12 JOURS" },
    { icon: Gift, label: "LIVRAISON OFFERTE DÈS 100 € D'ACHAT" },
    { icon: Mail, label: "CONTACT DIRECT AVEC ZEV SHOP" },
  ];
  return (
    <section className="bg-[#8E1721]" data-testid="benefits-bar">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="w-4 h-4 text-white/80" strokeWidth={1.5} />
            <p className="font-tech text-[9px] sm:text-[10px] tracking-[0.25em] text-white/90">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Nos recommandations — réservées aux comptes connectés. Basées sur les vraies
   interactions locales de l'utilisateur : produits consultés (zev_views_<id>,
   enregistrés sur la fiche produit) et contenu du panier (poids supérieur).
   Aucune donnée ni aucun produit inventé. */
function Recommendations() {
  const { user } = useAuth();
  const { items } = useCart();
  const [tab, setTab] = useState("all");

  if (!user) return null;

  let views = [];
  try {
    views = JSON.parse(localStorage.getItem(`zev_views_${user.id}`) || "[]");
  } catch (e) {
    views = [];
  }

  // poids : ajout au panier ×3, simple consultation ×1
  const weights = {};
  items.forEach((i) => { weights[i.variantId] = (weights[i.variantId] || 0) + 3; });
  views.forEach((id) => { weights[id] = (weights[id] || 0) + 1; });
  const hasHistory = Object.keys(weights).length > 0;

  const likedTitles = new Set();
  const likedTypes = new Set();
  Object.keys(weights).forEach((id) => {
    const v = PRODUCTS.find((x) => x.id === id);
    if (v) {
      likedTitles.add(v.productTitle);
      likedTypes.add(v.productType);
    }
  });

  const scored = GROUPED_PRODUCTS.map((g) => {
    let s = 0;
    g.variants.forEach((v) => { s += weights[v.id] || 0; });
    if (hasHistory) {
      if (likedTitles.has(g.productTitle)) s += 1;
      if (likedTypes.has(g.productType)) s += 1;
    }
    return { g, s };
  }).sort((a, b) => b.s - a.s);

  const base = hasHistory ? scored.filter((x) => x.s > 0) : scored;
  const list = (base.length > 0 ? base : scored).map((x) => x.g);

  const filtered =
    tab === "vetements"
      ? list.filter((g) => g.productType === "VETEMENTS")
      : tab === "accessoires"
        ? list.filter((g) => g.productType !== "VETEMENTS") // chaussures ∈ accessoires
        : list;

  const TABS = [
    { id: "all", label: "Voir tout", icon: LayoutGrid },
    { id: "vetements", label: "Vêtements", icon: Shirt },
    { id: "accessoires", label: "Accessoires", icon: Footprints },
  ];

  return (
    <section className="relative px-6 sm:px-10 py-20 sm:py-28 max-w-[1400px] mx-auto" data-testid="recommendations-section">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">SÉLECTION&nbsp;POUR&nbsp;VOUS</p>
          <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
            Nos recommandations
          </h2>
        </div>
        <Link
          to="/catalogue"
          className="hidden sm:flex items-center gap-2 font-tech text-[11px] tracking-[0.25em] text-black/55 hover:text-black transition-colors"
        >
          VOIR&nbsp;LE&nbsp;CATALOGUE
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* trois choix : Voir tout / Vêtements / Accessoires */}
      <div className="flex items-center gap-2 flex-wrap mb-10" data-testid="recommendations-tabs">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            data-testid={`reco-tab-${id}`}
            aria-pressed={tab === id}
            className={`inline-flex items-center gap-2 font-tech text-[10px] font-semibold tracking-[0.15em] uppercase rounded-full px-5 py-2.5 border transition-colors duration-200 cursor-pointer ${
              tab === id
                ? "bg-[#8E1721] text-white border-[#8E1721]"
                : "bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black"
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={1.8} />
            {label}
          </button>
        ))}
      </div>

      {!hasHistory && (
        <p className="font-tech text-[9px] tracking-[0.2em] text-black/35 mb-6" data-testid="reco-note">
          Sélection du catalogue — elle s'affinera au fil de vos visites et de votre panier.
        </p>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {filtered.map((g) => (
            <ProductCard key={g.handle} group={g} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-black/15 rounded-3xl py-14 px-8 text-center" data-testid="reco-empty">
          <p className="font-tech text-[11px] tracking-[0.25em] text-black/45">
            Aucun produit dans cette catégorie pour le moment.
          </p>
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <Marquee />
      <BenefitsBar />
      <ProductSection
        testid="selection-section"
        eyebrow="BOUTIQUE ZEV SHOP"
        title="Notre sélection"
        items={GROUPED_PRODUCTS}
      />
      <Recommendations />
      {/* Section catégories masquée temporairement — réactiver en décommentant
          <Categories /> (composant conservé tel quel, pages catégories inchangées) */}
      <Story />
      <HomeReviews />
      <UGC />
      <Newsletter />
    </>
  );
}
