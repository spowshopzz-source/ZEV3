import { Link } from "react-router-dom";

/*
 * Pages légales ZEV SHOP — brouillons conformes au droit français.
 * Toutes les informations non fournies (identité juridique, SIRET, adresse,
 * médiateur…) apparaissent comme [À compléter : …] — rien n'est inventé.
 */

function LegalPage({ title, children, testid }) {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 max-w-3xl mx-auto" data-testid={testid}>
      <header className="text-center mb-14">
        <p className="font-tech text-[10px] tracking-[0.45em] text-black/45">
          ZEV&nbsp;SHOP&nbsp;—&nbsp;INFORMATIONS&nbsp;LÉGALES
        </p>
        <h1
          className="font-display font-extrabold uppercase text-3xl sm:text-5xl mt-4 text-black"
          data-testid="page-title"
        >
          {title}
        </h1>
      </header>
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}

function Sec({ title, children }) {
  return (
    <section className="border border-black/10 rounded-3xl p-7">
      <h2 className="font-display text-xs font-bold tracking-[0.2em] uppercase text-black">
        {title}
      </h2>
      <div className="font-tech text-[11px] leading-relaxed tracking-[0.08em] text-black/60 mt-4 flex flex-col gap-3">
        {children}
      </div>
    </section>
  );
}

const Todo = ({ children }) => (
  <span className="text-[#8E1721] font-bold">[À compléter : {children}]</span>
);

export function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" testid="legal-mentions">
      <Sec title="Éditeur du site">
        <p>ZEV SHOP — <Todo>forme juridique (ex. entreprise individuelle, SAS…)</Todo></p>
        <p>SIRET : <Todo>numéro SIRET</Todo> — TVA intracommunautaire : <Todo>le cas échéant</Todo></p>
        <p>Adresse du siège : <Todo>adresse postale</Todo></p>
        <p>
          Contact :{" "}
          <a href="mailto:zzevshop@gmail.com" className="underline underline-offset-4 hover:text-black">
            zzevshop@gmail.com
          </a>{" "}
          — Instagram :{" "}
          <a href="https://www.instagram.com/zzevshop/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-black">
            @zzevshop
          </a>
        </p>
        <p>Directeur de la publication : <Todo>nom du responsable</Todo></p>
      </Sec>
      <Sec title="Hébergement">
        <p>Hébergeur du site : <Todo>nom et coordonnées de l'hébergeur</Todo></p>
      </Sec>
      <Sec title="Propriété intellectuelle">
        <p>
          L'ensemble des contenus du site (logo ZEV SHOP, visuels, textes, design) est protégé.
          Toute reproduction sans autorisation est interdite.
        </p>
      </Sec>
    </LegalPage>
  );
}

export function CGV() {
  return (
    <LegalPage title="Conditions générales de vente" testid="legal-cgv">
      <Sec title="1 — Objet">
        <p>
          Les présentes conditions régissent les ventes de produits ZEV SHOP conclues sur ce site
          avec tout consommateur. Vendeur : ZEV SHOP — <Todo>identité juridique, SIRET, adresse</Todo>.
        </p>
      </Sec>
      <Sec title="2 — Prix">
        <p>
          Les prix sont indiqués en euros. <Todo>préciser TTC / TVA applicable selon votre régime</Todo>.
          ZEV SHOP se réserve le droit de modifier ses prix à tout moment ; les produits sont
          facturés au prix en vigueur lors de la commande.
        </p>
      </Sec>
      <Sec title="3 — Commande et paiement">
        <p>
          La commande est ferme après validation du paiement. Les moyens de paiement acceptés
          sont ceux affichés lors du règlement. <Todo>préciser les moyens de paiement activés</Todo>.
        </p>
      </Sec>
      <Sec title="4 — Livraison">
        <p>Délai standard estimé : 7 à 12 jours.</p>
        <p>
          Frais de livraison (calculés sur le sous-total des produits après réductions
          éventuelles) : 5 € pour un panier inférieur à 50 € ; 2,50 € pour un panier de 50 € à
          moins de 100 € ; livraison offerte à partir de 100 €.
        </p>
      </Sec>
      <Sec title="5 — Droit de rétractation">
        <p>
          Vous disposez de 14 jours à compter de la réception pour exercer votre droit de
          rétractation, sans justification, sauf exceptions légales (art. L221-28 du Code de la
          consommation : produits personnalisés, produits descellés ne pouvant être renvoyés pour
          des raisons d'hygiène…). Le formulaire type est disponible sur la page{" "}
          <Link to="/retractation" className="underline underline-offset-4 hover:text-black">Rétractation</Link>.
          En cas de simple rétractation, les frais directs de retour sont à votre charge, cette
          information vous ayant été préalablement communiquée.
        </p>
      </Sec>
      <Sec title="6 — Garanties légales">
        <p>
          Les produits bénéficient de la garantie légale de conformité (art. L217-4 et suivants)
          et de la garantie contre les vices cachés (art. 1641 et suivants du Code civil) —
          détails sur la page{" "}
          <Link to="/garanties" className="underline underline-offset-4 hover:text-black">Garanties légales</Link>.
        </p>
      </Sec>
      <Sec title="7 — Médiation de la consommation">
        <p>
          En cas de litige non résolu, vous pouvez recourir gratuitement à un médiateur de la
          consommation : <Todo>nom et coordonnées du médiateur à désigner avant mise en ligne</Todo> —
          voir la page <Link to="/mediation" className="underline underline-offset-4 hover:text-black">Médiation</Link>.
        </p>
      </Sec>
      <Sec title="8 — Données personnelles et droit applicable">
        <p>
          Voir la <Link to="/confidentialite" className="underline underline-offset-4 hover:text-black">Politique de confidentialité</Link>.
          Les présentes CGV sont soumises au droit français.
        </p>
      </Sec>
    </LegalPage>
  );
}

export function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" testid="legal-confidentialite">
      <Sec title="Responsable de traitement">
        <p>ZEV SHOP — <Todo>identité juridique et adresse</Todo> — contact : zzevshop@gmail.com.</p>
      </Sec>
      <Sec title="Données collectées et finalités">
        <p>
          Compte client (nom, email, mot de passe chiffré) : gestion du compte, de la wishlist et
          du programme de récompense. Commandes et messages (formulaire de contact) : traitement
          des demandes. Newsletter : envoi d'actualités avec votre consentement.
        </p>
      </Sec>
      <Sec title="Durées et destinataires">
        <p>
          Les données sont conservées le temps nécessaire aux finalités décrites, puis supprimées.
          Elles ne sont ni vendues ni transmises à des tiers à des fins commerciales.{" "}
          <Todo>préciser les sous-traitants éventuels (hébergeur, paiement, transporteur)</Todo>.
        </p>
      </Sec>
      <Sec title="Vos droits">
        <p>
          Vous disposez de droits d'accès, de rectification, d'effacement, de portabilité,
          d'opposition et de limitation. Exercez-les à zzevshop@gmail.com. Vous pouvez introduire
          une réclamation auprès de la CNIL (cnil.fr).
        </p>
      </Sec>
      <Sec title="Cookies">
        <p>
          Voir la <Link to="/cookies" className="underline underline-offset-4 hover:text-black">Politique de cookies</Link>.
        </p>
      </Sec>
    </LegalPage>
  );
}

export function Cookies() {
  return (
    <LegalPage title="Politique de cookies" testid="legal-cookies">
      <Sec title="Cookies utilisés">
        <p>
          Le site utilise uniquement des cookies strictement nécessaires à son fonctionnement :
          session de connexion (cookies d'authentification) et contenu du panier (stockage local
          de votre navigateur). Ils ne nécessitent pas de consentement préalable.
        </p>
      </Sec>
      <Sec title="Cookies tiers">
        <p>
          Aucun cookie publicitaire ou de mesure d'audience tiers n'est déposé à ce jour.{" "}
          <Todo>mettre à jour si des outils tiers sont ajoutés</Todo>.
        </p>
      </Sec>
      <Sec title="Gestion">
        <p>
          Vous pouvez supprimer ou bloquer les cookies depuis les réglages de votre navigateur ;
          la connexion et le panier pourraient alors ne plus fonctionner.
        </p>
      </Sec>
    </LegalPage>
  );
}

export function Retractation() {
  return (
    <LegalPage title="Rétractation" testid="legal-retractation">
      <Sec title="Votre droit">
        <p>
          Vous disposez de 14 jours à compter de la réception de votre commande pour vous
          rétracter, sans avoir à justifier votre décision (art. L221-18 du Code de la
          consommation).
        </p>
        <p>
          Exceptions légales (art. L221-28) : notamment les produits personnalisés et les produits
          descellés après livraison ne pouvant être renvoyés pour des raisons d'hygiène ou de
          protection de la santé.
        </p>
      </Sec>
      <Sec title="Comment procéder">
        <p>
          Envoyez le formulaire type ci-dessous (ou toute déclaration dénuée d'ambiguïté) à{" "}
          <a href="mailto:zzevshop@gmail.com" className="underline underline-offset-4 hover:text-black">zzevshop@gmail.com</a>{" "}
          ou via la page <Link to="/contact" className="underline underline-offset-4 hover:text-black">Contact</Link>.
          Nous vous communiquerons alors les instructions de retour. En cas de simple
          rétractation, les frais directs de retour restent à votre charge, cette information vous
          ayant été communiquée préalablement. Vous pouvez utiliser le transporteur de votre
          choix, par exemple Chronopost.
        </p>
        <p>
          Remboursement : au plus tard 14 jours après réception de votre décision, sous réserve du
          retour ou de la preuve d'expédition des produits.
        </p>
      </Sec>
      <Sec title="Formulaire type de rétractation">
        <div className="border border-dashed border-black/20 rounded-2xl p-5 flex flex-col gap-2" data-testid="retractation-form-model">
          <p>À l'attention de ZEV SHOP — <Todo>adresse postale de retour</Todo> — zzevshop@gmail.com,</p>
          <p>
            Je/nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du
            contrat portant sur la vente du bien (*) ci-dessous :
          </p>
          <p>Commandé le (*) : ________</p>
          <p>Numéro de commande : ________</p>
          <p>Nom du (des) consommateur(s) : ________</p>
          <p>Adresse du (des) consommateur(s) : ________</p>
          <p>Signature (uniquement en cas de notification papier) : ________</p>
          <p>Date : ________</p>
          <p className="text-black/40">(*) Rayez la mention inutile.</p>
        </div>
      </Sec>
    </LegalPage>
  );
}

export function Garanties() {
  return (
    <LegalPage title="Garanties légales" testid="legal-garanties">
      <Sec title="Garantie légale de conformité">
        <p>
          Tout produit non conforme (défectueux, endommagé ou ne correspondant pas à la
          description) peut être remplacé ou remboursé dans le cadre de la garantie légale de
          conformité (art. L217-4 et suivants du Code de la consommation), pendant 2 ans à compter
          de la délivrance. Dans ce cas, les frais de retour sont pris en charge par ZEV SHOP.
        </p>
      </Sec>
      <Sec title="Garantie des vices cachés">
        <p>
          Vous pouvez également agir au titre de la garantie des vices cachés (art. 1641 et
          suivants du Code civil) et choisir entre le remboursement intégral ou une réduction du
          prix.
        </p>
      </Sec>
      <Sec title="Comment faire jouer la garantie">
        <p>
          Contactez-nous à{" "}
          <a href="mailto:zzevshop@gmail.com" className="underline underline-offset-4 hover:text-black">zzevshop@gmail.com</a>{" "}
          ou via la page <Link to="/contact" className="underline underline-offset-4 hover:text-black">Contact</Link>{" "}
          avec votre numéro de commande et une description (idéalement photos) du problème. Nous
          vous indiquerons la marche à suivre.
        </p>
      </Sec>
    </LegalPage>
  );
}

export function Mediation() {
  return (
    <LegalPage title="Médiation de la consommation" testid="legal-mediation">
      <Sec title="Règlement amiable des litiges">
        <p>
          En cas de litige, contactez d'abord ZEV SHOP à{" "}
          <a href="mailto:zzevshop@gmail.com" className="underline underline-offset-4 hover:text-black">zzevshop@gmail.com</a>{" "}
          pour rechercher une solution amiable.
        </p>
        <p>
          Si le litige n'est pas résolu, vous pouvez recourir gratuitement à un médiateur de la
          consommation (art. L612-1 et suivants du Code de la consommation).
        </p>
        <p>
          Médiateur compétent : <Todo>nom, site et coordonnées du médiateur à désigner avant la mise en ligne — obligation légale</Todo>.
        </p>
      </Sec>
    </LegalPage>
  );
}
