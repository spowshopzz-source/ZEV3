import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { toast } from "sonner";
import { Images, Heart, Share2, X, Truck, RotateCcw } from "lucide-react";
import { PRODUCTS, CATALOG, GROUPED_PRODUCTS, SIZES, priceLabel, findGroup } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import ProductStage from "@/components/ProductStage";
import ProductGallery from "@/components/ProductGallery";
import ColorSelectors from "@/components/ColorSelectors";
import Accordion from "@/components/Accordion";
import Reviews from "@/components/Reviews";
import QA from "@/components/QA";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const EASE = [0.65, 0, 0.35, 1];

/* VOUS AIMEREZ AUSSI — recommandations automatiques issues du catalogue réel :
   même catégorie d'abord, même marque privilégiée, produit courant exclu,
   une seule carte par modèle (les coloris restent dans la carte). Fonctionne
   pour tous les visiteurs, connectés ou non. */
function SimilarProducts({ current }) {
  const group = findGroup(current.id);
  const list = GROUPED_PRODUCTS.filter((g) => g.handle !== current.productHandle)
    .map((g) => ({
      g,
      s:
        (g.productType === (group && group.productType) ? 2 : 0) +
        (group && group.brand && g.brand === group.brand ? 3 : 0),
    }))
    .sort((a, b) => b.s - a.s)
    .map((x) => x.g)
    .filter((g) => g.variants.some((v) => v.available))
    .slice(0, 4);
  if (list.length === 0) return null;
  return (
    <section className="relative z-20 bg-white border-t border-black/10" data-testid="similar-products">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-16">
        <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">
          SÉLECTION&nbsp;AUTOMATIQUE
        </p>
        <h2 className="font-display font-extrabold uppercase text-2xl sm:text-4xl mt-3 text-black">
          Vous aimerez aussi
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-10">
          {list.map((g) => (
            <ProductCard key={g.handle} group={g} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SizeGuide({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="size-guide-modal"
        >
          <motion.div
            className="w-full max-w-md bg-white border border-black/10 rounded-3xl p-8"
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 12 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="font-display text-sm font-extrabold tracking-[0.25em] text-black">
                GUIDE&nbsp;DES&nbsp;TAILLES
              </p>
              <button
                type="button"
                onClick={onClose}
                data-testid="size-guide-close"
                aria-label="Fermer le guide"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-black/15 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((s) => (
                <div key={s} className="border border-black/10 rounded-xl py-3 text-center font-tech text-[11px] text-black/70">
                  EU&nbsp;{s}
                </div>
              ))}
            </div>
            <p className="font-tech text-[10px] tracking-[0.2em] text-black/40 mt-6 leading-relaxed">
              Correspondances détaillées : à définir.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Product() {
  const { id } = useParams();
  const idx = PRODUCTS.findIndex((p) => p.id === id);
  const [size, setSize] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const { add } = useCart();
  const { user, wishlist, toggleWishlist } = useAuth();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18 });
  const sy = useSpring(my, { stiffness: 55, damping: 18 });
  const shoeX = useTransform(sx, (v) => v * 16);
  const shoeY = useTransform(sy, (v) => v * 10);

  // Le logo Z pulse très légèrement à chaque changement de coloris
  const zControls = useAnimation();
  useEffect(() => {
    zControls.start({
      scale: [1, 0.985, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.8, ease: EASE },
    });
  }, [idx]);

  // Historique de consultation local, rattaché au compte connecté (identifiants
  // produits uniquement — aucune donnée personnelle supplémentaire).
  useEffect(() => {
    if (!user || idx < 0) return;
    try {
      const key = `zev_views_${user.id}`;
      const arr = JSON.parse(localStorage.getItem(key) || "[]").filter(
        (id) => id !== PRODUCTS[idx].id,
      );
      arr.unshift(PRODUCTS[idx].id);
      localStorage.setItem(key, JSON.stringify(arr.slice(0, 50)));
    } catch (e) {}
  }, [idx, user]);

  if (idx < 0) return <Navigate to="/catalogue" replace />;
  const p = PRODUCTS[idx];
  const siblings = PRODUCTS.filter((v) => v.productHandle === p.productHandle);
  const activeIdx = siblings.findIndex((v) => v.id === p.id);
  const wished = wishlist.includes(p.id);

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const requireSize = () => {
    if (!size) {
      toast.error("Choisissez d'abord une taille");
      return false;
    }
    return true;
  };

  const onAdd = () => {
    if (!requireSize()) return;
    add(p.id, size);
    toast.success(`${p.name} — EU ${size} ajouté au panier`);
  };

  const onWish = () => {
    if (!user) {
      toast("Créez un compte pour sauvegarder vos produits favoris.");
      return;
    }
    toggleWishlist(p.id).catch(() => toast.error("Erreur — réessayez"));
  };

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Lien copié — partagez-le où vous voulez");
    } catch (e) {
      toast.error("Copie impossible sur ce navigateur");
    }
  };

  return (
    <main className="relative bg-white" data-testid="product-page" onMouseMove={onMouseMove}>
      {/* ---------- fiche 2 zones : scène (gauche) + informations (droite) ---------- */}
      <div className="relative lg:grid lg:grid-cols-2">
        {/* ZONE GAUCHE — visuel : lévitation, logo de marque en fond, transitions coloris */}
        <div
          className="relative h-[64svh] lg:h-[100svh] lg:sticky lg:top-0 overflow-hidden"
          data-testid="product-scene"
        >
          {/* teinte ambiante neutre, fondu au changement */}
          <AnimatePresence>
            <motion.div
              key={p.id}
              aria-hidden="true"
              className="absolute inset-0 z-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              style={{
                background: `radial-gradient(65% 55% at 50% 52%, ${p.spotlight} 0%, transparent 100%)`,
              }}
            />
          </AnimatePresence>

          {/* logo de marque en filigrane — conteneur fixe centré ; la couleur
              change progressivement selon le coloris */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div animate={zControls}>
                <motion.div
                  className={`${p.watermark ? "" : "z-watermark"} w-[64vmin] h-[64vmin]`}
                  initial={false}
                  animate={{ backgroundColor: p.zTint }}
                  transition={{ duration: 0.8, ease: EASE }}
                  data-testid="z-watermark"
                  style={
                    p.watermark
                      ? {
                          WebkitMaskImage: `url(${p.watermark})`,
                          maskImage: `url(${p.watermark})`,
                          WebkitMaskSize: "contain",
                          maskSize: "contain",
                          WebkitMaskRepeat: "no-repeat",
                          maskRepeat: "no-repeat",
                          WebkitMaskPosition: "center",
                          maskPosition: "center",
                        }
                      : undefined
                  }
                />
              </motion.div>
            </div>
          </div>

          {/* breadcrumb */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="absolute z-30 top-[7.5rem] left-6 sm:left-10 font-tech text-[10px] tracking-[0.4em] text-black/40"
          >
            <Link to="/catalogue" className="hover:text-black transition-colors">
              CATALOGUE
            </Link>
            <span className="mx-2">/</span>
            <span className="text-black/70">{p.title}</span>
          </motion.p>

          {/* scène carrousel — uniquement les variantes du même produit */}
          <ProductStage products={siblings} active={activeIdx} shoeX={shoeX} shoeY={shoeY} />

          {/* Plus de photos — bas gauche de la scène */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="absolute z-30 left-6 sm:left-10 bottom-6"
          >
            <button
              type="button"
              onClick={() => setGalleryOpen(true)}
              data-testid="gallery-open-button"
              className="inline-flex items-center gap-2 font-tech text-[10px] tracking-[0.3em] text-black/70 bg-white/70 backdrop-blur-sm border border-black/20 rounded-full px-5 py-2.5 hover:border-black hover:text-black transition-colors duration-300 cursor-pointer"
            >
              <Images className="w-3.5 h-3.5" />
              Plus de photos
            </button>
          </motion.div>
        </div>

        {/* ZONE DROITE — informations d'achat, regroupées et ordonnées */}
        <div
          className="relative z-20 bg-white px-6 sm:px-10 lg:px-14 pt-10 lg:pt-44 pb-16"
          data-testid="product-info"
        >
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="max-w-md flex flex-col gap-7"
          >
            {/* marque + modèle */}
            <div>
              <p className="font-tech text-[10px] tracking-[0.45em] text-black/45" data-testid="product-brand">
                {(findGroup(p.id) && findGroup(p.id).brand ? findGroup(p.id).brand : p.productType).toUpperCase()}
              </p>
              <h1
                className="font-display text-2xl sm:text-3xl font-bold text-black leading-snug mt-3"
                data-testid="product-variant-name"
              >
                {p.name}
              </h1>
            </div>

            {/* prix + disponibilité */}
            <div>
              <div className="flex items-baseline gap-3">
                <p className="font-display font-bold text-xl sm:text-2xl text-black" data-testid="product-price">
                  {priceLabel(p)}
                </p>
                {p.oldPrice && (
                  <p className="font-tech text-[11px] text-black/40 line-through" data-testid="product-old-price">
                    {priceLabel(p.oldPrice)}
                  </p>
                )}
                {p.discountPercent && (
                  <p className="font-tech text-[10px] text-black bg-black/[0.06] rounded-full px-2.5 py-1" data-testid="product-discount">
                    -{p.discountPercent}%
                  </p>
                )}
              </div>
              <p
                className={`flex items-center gap-2 font-tech text-[10px] tracking-[0.3em] mt-2.5 ${
                  p.available ? "text-black/60" : "text-black/35"
                }`}
              >
                {p.available ? (
                  <>
                    <span className="relative flex w-2 h-2">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-black/30 opacity-60 animate-ping" />
                      <span className="relative inline-flex w-2 h-2 rounded-full bg-black" />
                    </span>
                    EN&nbsp;STOCK
                  </>
                ) : (
                  <>ÉPUISÉ</>
                )}
              </p>
            </div>

            {/* coloris */}
            <div className="border-t border-black/10 pt-7">
              <p className="font-tech text-[10px] tracking-[0.4em] text-black/40">
                COLORIS&nbsp;—&nbsp;<span className="text-black/70">{p.selectedOptions.Color.toUpperCase()}</span>
              </p>
              <div className="mt-4">
                <ColorSelectors products={siblings} active={activeIdx} idPrefix="info-" />
              </div>
            </div>

            {/* tailles */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="font-tech text-[10px] tracking-[0.4em] text-black/40">TAILLE</p>
                <button
                  type="button"
                  onClick={() => setGuideOpen(true)}
                  data-testid="size-guide-open"
                  className="font-tech text-[9px] tracking-[0.25em] text-black/45 underline underline-offset-4 hover:text-black cursor-pointer"
                >
                  Guide des tailles
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    data-testid={`size-chip-${s}`}
                    className={`w-11 h-11 font-tech text-[11px] tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
                      size === s
                        ? "border-black bg-black text-white"
                        : "border-black/20 text-black/60 hover:border-black/60 hover:text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* actions principales */}
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={onAdd}
                data-testid="add-to-cart-button"
                className="flex-1 font-tech text-[12px] tracking-[0.2em] text-white bg-black rounded-full px-6 py-4 hover:bg-black/85 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Ajouter au panier
              </button>
              <button
                type="button"
                onClick={onWish}
                data-testid="wishlist-button"
                aria-label="Ajouter à la wishlist"
                className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-black/20 hover:border-black transition-colors cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${wished ? "fill-black text-black" : "text-black/60"}`} />
              </button>
              <button
                type="button"
                onClick={onShare}
                data-testid="share-button"
                aria-label="Partager"
                className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full border border-black/20 hover:border-black transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-black/60" />
              </button>
            </div>

            {/* livraison + retours — informations réelles du site */}
            <div className="border-t border-black/10 pt-6 flex flex-col gap-3.5">
              <p className="flex items-start gap-3 font-tech text-[10px] tracking-[0.15em] leading-relaxed text-black/60">
                <Truck className="w-4 h-4 shrink-0 mt-px text-black/50" strokeWidth={1.6} />
                <span>
                  Livraison standard estimée : 7 à 12 jours — offerte dès 100&nbsp;€.{" "}
                  <Link to="/livraison" className="underline underline-offset-4 hover:text-black">
                    Détails
                  </Link>
                </span>
              </p>
              <p className="flex items-start gap-3 font-tech text-[10px] tracking-[0.15em] leading-relaxed text-black/60">
                <RotateCcw className="w-4 h-4 shrink-0 mt-px text-black/50" strokeWidth={1.6} />
                <span>
                  Rétractation sous 14 jours après réception.{" "}
                  <Link to="/retours" className="underline underline-offset-4 hover:text-black">
                    Conditions de retour
                  </Link>
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- informations complémentaires (accordéons) ---------- */}
      <div className="relative z-20 bg-white border-t border-black/10">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Accordion title="Description" defaultOpen>
            <p>
              {(CATALOG.find((c) => c.handle === p.productHandle) || {}).description || p.name}
            </p>
          </Accordion>
          <Accordion title="Livraison">
            <p>
              Délai standard estimé : 7 à 12 jours. Frais : 5&nbsp;€ (panier inférieur à 50&nbsp;€),
              2,50&nbsp;€ (de 50&nbsp;€ à 99,99&nbsp;€), offerte dès 100&nbsp;€.{" "}
              <Link to="/livraison" className="underline underline-offset-4">
                Page livraison
              </Link>
            </p>
          </Accordion>
          <Accordion title="Retours et échanges">
            <p>
              14 jours après réception pour exercer votre rétractation. En cas de simple
              rétractation, les frais de retour sont à votre charge ; retour possible via
              Chronopost. Produit non conforme ou défectueux : garanties légales applicables,
              frais de retour pris en charge.{" "}
              <Link to="/retours" className="underline underline-offset-4">
                Page retours
              </Link>
            </p>
          </Accordion>
          <div className="pt-12">
            <Reviews productId={p.id} />
          </div>
          <div className="pt-12">
            <QA productId={p.id} />
          </div>
        </div>
      </div>

      {/* ---------- vous aimerez aussi ---------- */}
      <SimilarProducts current={p} />

      {/* galerie + guide des tailles */}
      <ProductGallery open={galleryOpen} onClose={() => setGalleryOpen(false)} variant={p} />
      <SizeGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </main>
  );
}
