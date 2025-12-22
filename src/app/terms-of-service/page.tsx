import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | 47Gear",
  description: "Read the terms and conditions that govern your use of 47Gear's services.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Header with gradient effect */}
      <div className="mb-8 pt-20 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Terms of Service
        </h1>
        <h4>
          <span className="text-accent-yellow">(Termeni și Condiții)</span>
        </h4>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          Ultima actualizare: 18.11.2025
        </p>
      </div>

      {/* Main content */}
      <div className="glass-card p-6 border border-accent-primary/20 shadow-neon mb-8">
        <div className="prose prose-invert prose-headings:text-accent-secondary prose-a:text-accent-secondary max-w-none">
          
          <h2 className="text-xl font-bold text-gradient-purple mb-4">Comerciant</h2>
          <div className="glass-card p-4 bg-black/40 border border-accent-primary/20 mb-6">
            <p className="text-white/90 text-sm mb-1"><strong>47GEAR S.R.L.</strong></p>
            <p className="text-white/80 text-sm mb-1">Sediu: Jud. Timiș, Mun. Timișoara, Bulevardul G-ral Ion Dragalina, Nr. 19, Etaj Parter, Ap. SAD 3</p>
            <p className="text-white/80 text-sm mb-1">CUI: 52528638</p>
            <p className="text-white/80 text-sm mb-1">Nr. ONRC: J2025071076004</p>
            <p className="text-white/80 text-sm mb-1">EUID: ROONRC.J2025071076004</p>
            <p className="text-white/80 text-sm mb-1">Contact: <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a></p>
            <p className="text-white/80 text-sm">Telefon: 0766053447</p>
          </div>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Acceptarea termenilor</h2>
          <p className="text-white/80 text-sm mb-6">
            Prin accesarea site-ului și/sau plasarea unei comenzi, confirmi că ai citit și accepți acești Termeni și Condiții.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Produse, prețuri și disponibilitate</h2>
          <p className="text-white/80 text-sm mb-6">
            Produsele sunt prezentate cu descrieri și prețuri în [RON/EUR]. Ne rezervăm dreptul de a corecta erori de afișare (preț, stoc, descriere). Prețul final este cel confirmat în comanda plasată.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Comanda și încheierea contractului</h2>
          <p className="text-white/80 text-sm mb-6">
            Contractul la distanță se consideră încheiat în momentul confirmării comenzii de către noi (de regulă prin e-mail). Putem refuza/anula comenzi în cazuri justificate (stoc epuizat, suspiciuni de fraudă, erori evidente).
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Plata</h2>
          <p className="text-white/80 text-sm mb-6">
            Plata se face prin Shopify (checkout/procesare plăți). Nu stocăm date complete de card.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Livrarea</h2>
          <p className="text-white/80 text-sm mb-6">
            Livrarea se face prin curier la adresa indicată de client. Termenele sunt estimative și pot varia în funcție de perioade aglomerate și de timpii de tranzit.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Dreptul de retragere (retur în 14 zile)</h2>
          <p className="text-white/80 text-sm mb-4">
            Dacă ești consumator, ai dreptul să te retragi din contract în termen de 14 zile de la primirea produselor, fără a invoca un motiv, cu excepțiile prevăzute de lege.
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-white/80 text-sm">
              <strong>Cum faci returul:</strong> trimiți o solicitare la <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a> cu numărul comenzii și produsele pe care vrei să le returnezi.
            </li>
            <li className="text-white/80 text-sm">
              <strong>Condiții:</strong> produsele trebuie returnate în aceeași stare în care au fost primite, cu toate accesoriile incluse.
            </li>
            <li className="text-white/80 text-sm">
              <strong>Cost retur:</strong> costul direct al returnării este suportat de client.
            </li>
            <li className="text-white/80 text-sm">
              <strong>Rambursare:</strong> în cel mult 14 zile de la data la care ne-ai informat despre retragere (putem amâna rambursarea până la primirea produselor sau dovada expedierii, după caz).
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Conformitate și garanții</h2>
          <p className="text-white/80 text-sm mb-6">
            Produsele beneficiază de drepturile legale privind conformitatea. Pentru sesizări de neconformitate (defecte, probleme de fabricație), scrie-ne la <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a> cu numărul comenzii și descrierea problemei.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Utilizarea site-ului</h2>
          <p className="text-white/80 text-sm mb-6">
            Este interzisă folosirea site-ului în scopuri ilegale sau abuzive (tentative de fraudă, acces neautorizat, atacuri, extragere automată neautorizată de conținut).
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Proprietate intelectuală</h2>
          <p className="text-white/80 text-sm mb-6">
            Conținutul site-ului (texte, imagini, logo, design) este protejat. Nu poate fi copiat sau folosit fără acordul nostru scris.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Răspundere</h2>
          <p className="text-white/80 text-sm mb-6">
            Depunem eforturi pentru ca informațiile să fie corecte și site-ul să funcționeze în parametri, dar pot exista erori sau întreruperi temporare. În măsura permisă de lege, nu răspundem pentru prejudicii indirecte rezultate din utilizarea site-ului.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Legea aplicabilă și litigii</h2>
          <p className="text-white/80 text-sm mb-6">
            Acești termeni sunt guvernați de legea română. Litigiile se soluționează de instanțele competente din România.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Modificări</h2>
          <p className="text-white/80 text-sm mb-6">
            Putem actualiza Termenii și Condițiile. Varianta aplicabilă este cea publicată pe site la momentul utilizării/plasării comenzii.
          </p>

        </div>
      </div>

      {/* Call to action section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Ai Întrebări?</h3>
          <p className="text-white/70 text-sm mb-3">Echipa noastră de suport este aici pentru a te ajuta.</p>
          <a 
            href="/contact-us" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Contactează Suport
          </a>
        </div>
        
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Politica de Confidențialitate</h3>
          <p className="text-white/70 text-sm mb-3">Află cum protejăm și gestionăm datele tale personale.</p>
          <a 
            href="/privacy-policy" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Vezi Politica de Confidențialitate
          </a>
        </div>
      </div>
    </div>
  );
}