import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { applyProductFilters } from "@/components/ProductFilters";
import { GROUPED_PRODUCTS } from "@/data/products";
import { VETEMENTS, ACCESSOIRES } from "@/components/Header";

const EASE = [0.16, 1, 0.3, 1];

const TITLES = Object.fromEntries(
  [...VETEMENTS, ...ACCESSOIRES].map((c) => [c.slug, c.label]),
);

export default function CategoryPage() {
  const { slug } = useParams();
  const title = (TITLES[slug] || slug).toUpperCase();
  const isChaussures = slug === "chaussures";
  const [filters, setFilters] = useState({ brands: [], avail: false, sort: "pertinence" });

  // Produits de la catégorie visitée uniquement — les options de filtres
  // (marques) sont dérivées de cette liste, rien n'est inventé.
  const categoryGroups = useMemo(
    () => (isChaussures ? GROUPED_PRODUCTS.filter((g) => g.productType === "SNEAKERS") : []),
    [isChaussures],
  );
  const brands = useMemo(
    () => Array.from(new Set(categoryGroups.map((g) => g.brand).filter(Boolean))).sort(),
    [categoryGroups],
  );
  const groups = useMemo(
    () => applyProductFilters(categoryGroups, filters),
    [categoryGroups, filters],
  );

  return (
    <div className="min-h-screen">
      {/* bandeau grenat sombre — harmonisé avec la page Catalogue */}
      <div className="bg-[#64111B] pt-32 sm:pt-36 pb-10 sm:pb-12 px-6">
        <header className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-tech text-[11px] font-semibold tracking-[0.3em] text-[#F5F1F1]/70"
          >
            ZEV&nbsp;SHOP&nbsp;—&nbsp;CATÉGORIE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="font-display font-extrabold uppercase text-[2.25rem] sm:text-5xl lg:text-6xl mt-4 text-white leading-[0.95]"
            data-testid="category-title"
          >
            {title}
          </motion.h1>
          {isChaussures && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-tech text-[10px] tracking-[0.35em] text-[#F5F1F1]/60 mt-5"
            >
              COLLECTION&nbsp;SNEAKERS&nbsp;//&nbsp;TOUS&nbsp;LES&nbsp;MODÈLES
            </motion.p>
          )}
        </header>
      </div>

      <div className="px-6 sm:px-10 max-w-[1100px] mx-auto pb-24">
        {categoryGroups.length > 0 ? (
          <>
            <ProductFilters
              brands={brands}
              value={filters}
              onChange={setFilters}
              hasProducts={groups.length > 0}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-12" data-testid="category-grid">
              {groups.map((g, i) => (
                <motion.div
                  key={g.handle}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: EASE }}
                >
                  <ProductCard group={g} />
                </motion.div>
              ))}
            </div>
            {groups.length === 0 && (
              <div className="mt-16 border border-dashed border-black/15 rounded-3xl py-20 px-8 text-center" data-testid="category-no-result">
                <p className="font-tech text-[11px] tracking-[0.25em] text-black/45">
                  Aucun produit ne correspond aux filtres actuellement sélectionnés.
                </p>
                <button
                  type="button"
                  onClick={() => setFilters({ brands: [], avail: false, sort: "pertinence" })}
                  className="mt-8 font-tech text-[10px] font-semibold tracking-[0.2em] text-[#8E1721] border-b border-[#8E1721] pb-1 hover:opacity-70 transition-opacity cursor-pointer"
                >
                  RÉINITIALISER&nbsp;LES&nbsp;FILTRES
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mt-12 border border-black/10 rounded-3xl py-24 px-8 text-center"
            data-testid="category-empty"
          >
            <p className="font-tech text-[11px] tracking-[0.35em] text-black/50">
              CETTE&nbsp;CATÉGORIE&nbsp;ARRIVE&nbsp;BIENTÔT.
            </p>
            <Link
              to="/catalogue"
              className="inline-block mt-8 font-tech text-[11px] tracking-[0.3em] text-black border-b border-black pb-1 hover:opacity-60 transition-opacity"
            >
              VOIR&nbsp;LE&nbsp;CATALOGUE
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
