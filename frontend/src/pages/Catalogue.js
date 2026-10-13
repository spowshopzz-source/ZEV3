import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { applyProductFilters } from "@/components/ProductFilters";
import { GROUPED_PRODUCTS, BRANDS } from "@/data/products";

const EASE = [0.16, 1, 0.3, 1];

export default function Catalogue() {
  const [filters, setFilters] = useState({ brands: [], avail: false, sort: "pertinence" });

  // Grouped products — chaque entrée = un modèle avec toutes ses variantes de coloris.
  const groups = useMemo(() => applyProductFilters(GROUPED_PRODUCTS, filters), [filters]);

  return (
    <div className="min-h-screen">
      {/* bandeau grenat sombre — titre de la boutique */}
      <div className="bg-[#64111B] pt-32 sm:pt-36 pb-10 sm:pb-12 px-6">
        <header className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-tech text-[11px] font-semibold tracking-[0.3em] text-[#F5F1F1]/70"
          >
            BOUTIQUE&nbsp;ZEV&nbsp;SHOP
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="font-display font-extrabold uppercase text-[2.25rem] sm:text-5xl lg:text-6xl mt-4 text-white leading-[0.95]"
            data-testid="catalogue-title"
          >
            NOTRE<br className="sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">&nbsp;</span>SÉLECTION
          </motion.h1>
        </header>
      </div>

      <div className="px-6 sm:px-10 max-w-[1100px] mx-auto pb-24">
        <ProductFilters
          brands={BRANDS}
          value={filters}
          onChange={setFilters}
          hasProducts={groups.length > 0}
        />

        {/* grille produits — groupés par modèle, swatches dans chaque carte */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-12" data-testid="catalogue-grid">
          {groups.map((g, i) => (
            <motion.div
              key={g.handle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              <ProductCard group={g} />
            </motion.div>
          ))}
        </div>

        {groups.length === 0 && (
          <div className="mt-16 border border-dashed border-black/15 rounded-3xl py-20 px-8 text-center" data-testid="catalogue-empty">
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
      </div>
    </div>
  );
}
