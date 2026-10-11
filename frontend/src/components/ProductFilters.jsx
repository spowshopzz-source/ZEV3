import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/* Styles pills unifiés — blanc cassé (idle), rouge grenat #8E1721 pour les
   filtres actifs (couleur d'accent ZEV SHOP), panneau rosé #F5F1F1. */
const PILL_BASE =
  "inline-flex items-center justify-center font-tech font-semibold tracking-[0.1em] rounded-full transition-colors duration-200 cursor-pointer select-none";
const PILL_IDLE =
  "bg-white text-black/60 border border-black/5 hover:bg-[#EFE6E6] hover:text-black";
const PILL_ACTIVE = "bg-[#8E1721] text-white border border-[#8E1721] hover:bg-[#761019]";

const SORTS = [
  { id: "pertinence", label: "Pertinence" },
  { id: "nouveautes", label: "Nouveautés" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
  { id: "ventes", label: "Meilleures ventes" },
];

/*
 * Barre de filtres partagée — Catalogue + pages de catégories.
 * Props :
 *   brands   : marques réellement présentes dans la liste affichée
 *   value    : { brands: string[], avail: boolean, sort: string }
 *   onChange : (next) => void
 *   hasProducts : masque la note de tri quand la liste est vide
 */
export default function ProductFilters({ brands, value, onChange, hasProducts }) {
  const [showFilters, setShowFilters] = useState(false);
  const activeFilterCount = value.brands.length + (value.avail ? 1 : 0);
  const priceSortInactive =
    value.sort === "prix-asc" || value.sort === "prix-desc" || value.sort === "ventes";

  const toggleBrand = (brand) =>
    onChange({
      ...value,
      brands: value.brands.includes(brand)
        ? value.brands.filter((b) => b !== brand)
        : [...value.brands, brand],
    });

  return (
    <>
      {/* barre filtres + tri */}
      <div className="flex items-center justify-between gap-4 mt-10 border-y border-black/10 py-4">
        <button
          type="button"
          onClick={() => setShowFilters((s) => !s)}
          data-testid="filters-toggle"
          aria-expanded={showFilters}
          className="inline-flex items-center gap-2.5 font-tech text-[11px] font-semibold tracking-[0.14em] text-black/70 hover:text-black px-3 py-2.5 -ml-3 rounded-lg hover:bg-black/[0.03] active:bg-black/[0.06] transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" strokeWidth={1.9} />
          FILTRES
          {activeFilterCount > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#8E1721] text-white text-[9px] font-bold tracking-normal"
              data-testid="filters-active-count"
            >
              {activeFilterCount}
            </span>
          )}
        </button>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-tech text-[9px] tracking-[0.3em] text-black/35">
            TRI&nbsp;—
          </span>
          <select
            value={value.sort}
            onChange={(e) => onChange({ ...value, sort: e.target.value })}
            data-testid="sort-select"
            className="font-tech text-[10px] tracking-[0.2em] text-black/70 border border-transparent bg-[#F3F4F6] rounded-full px-4 py-2 hover:bg-[#E5E7EB] focus:outline-none focus:border-black cursor-pointer transition-colors"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="grid sm:grid-cols-2 gap-8 mt-8 bg-[#F5F1F1] rounded-3xl p-6"
          data-testid="filters-panel"
        >
          <div>
            <p className="font-tech text-[10px] font-semibold tracking-[0.2em] text-black/50 mb-3">MARQUES</p>
            <div className="flex items-center gap-2 flex-wrap">
              {brands.map((b) => {
                const active = value.brands.includes(b);
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBrand(b)}
                    data-testid={`filter-brand-${b.toLowerCase()}`}
                    aria-pressed={active}
                    className={`${PILL_BASE} text-[10px] px-4 py-1.5 ${active ? PILL_ACTIVE : PILL_IDLE}`}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <p className="font-tech text-[10px] font-semibold tracking-[0.2em] text-black/50 mb-3">DISPONIBILITÉ</p>
            <button
              type="button"
              onClick={() => onChange({ ...value, avail: !value.avail })}
              data-testid="filter-availability"
              aria-pressed={value.avail}
              className={`${PILL_BASE} text-[10px] px-4 py-1.5 ${value.avail ? PILL_ACTIVE : PILL_IDLE}`}
            >
              EN&nbsp;STOCK&nbsp;UNIQUEMENT
            </button>
            <p className="font-tech text-[9px] tracking-[0.2em] text-black/30 mt-4 leading-relaxed">
              Filtres prix &amp; matière : à définir (à la connexion Shopify).
            </p>
          </div>
        </motion.div>
      )}

      {priceSortInactive && hasProducts && (
        <p className="font-tech text-[9px] tracking-[0.25em] text-black/35 mt-4 text-center" data-testid="sort-note">
          Tri par prix / ventes : à définir — les prix ne le sont pas encore.
        </p>
      )}
    </>
  );
}

/*
 * Applique les filtres à une liste de groupes (modèles + variantes).
 * On garde un groupe si au moins une variante satisfait les filtres actifs.
 */
export function applyProductFilters(groups, value) {
  let list = [...groups];
  if (value.brands.length > 0) {
    list = list.filter((g) => g.brand && value.brands.includes(g.brand));
  }
  if (value.avail) {
    list = list
      .map((g) => {
        const matches = g.variants.filter((v) => v.available);
        return matches.length ? { ...g, variants: matches } : null;
      })
      .filter(Boolean);
  }
  // tri par prix / ventes : inactif tant que les prix ne sont pas définis
  return list;
}
