import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 47Gear",
  description: "Learn how 47Gear collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Header with gradient effect */}
      <div className="mb-8 pt-20 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Privacy Policy 
        </h1>
        <h4>
          <span className="text-accent-yellow">(Politica de Confidențialitate)</span>
        </h4>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          Ultima actualizare: 18.11.2025
        </p>
      </div>

      {/* Main content */}
      <div className="glass-card p-6 border border-accent-primary/20 shadow-neon mb-8">
        <div className="prose prose-invert prose-headings:text-accent-secondary prose-a:text-accent-secondary max-w-none">
          
          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cine suntem</h2>
          <div className="glass-card p-4 bg-black/40 border border-accent-primary/20 mb-6">
            <p className="text-white/90 text-sm mb-1"><strong>47GEAR S.R.L.</strong></p>
            <p className="text-white/80 text-sm mb-1">Sediu: Jud. Timiș, Mun. Timișoara, Bulevardul G-ral Ion Dragalina, Nr. 19, Etaj Parter, Ap. SAD 3</p>
            <p className="text-white/80 text-sm mb-1">CUI: 52528638</p>
            <p className="text-white/80 text-sm mb-1">Nr. ONRC: J2025071076004</p>
            <p className="text-white/80 text-sm mb-1">EUID: ROONRC.J2025071076004</p>
            <p className="text-white/80 text-sm mb-1">Contact: <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a></p>
            <p className="text-white/80 text-sm">Telefon: 0766053447</p>
          </div>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Ce date prelucrăm</h2>
          <p className="text-white/80 text-sm mb-2">În funcție de cum folosești site-ul, putem prelucra:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-white/80 text-sm">
              <strong>Date de identificare & contact:</strong> nume, prenume, e-mail, telefon
            </li>
            <li className="text-white/80 text-sm">
              <strong>Date pentru livrare/facturare:</strong> adresă livrare, adresă facturare, localitate, județ, cod poștal
            </li>
            <li className="text-white/80 text-sm">
              <strong>Date despre comenzi:</strong> produse, cantități, preț, istoric comenzi, facturi
            </li>
            <li className="text-white/80 text-sm">
              <strong>Date despre plăți:</strong> confirmări de plată și status tranzacții (nu stocăm date complete de card)
            </li>
            <li className="text-white/80 text-sm">
              <strong>Date tehnice:</strong> IP, device, browser, cookie-uri, pagini accesate
            </li>
            <li className="text-white/80 text-sm">
              <strong>Comunicări:</strong> mesaje trimise către noi, solicitări, reclamații, retururi/garanții
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">De ce folosim datele (scopuri) și baza legală</h2>
          <p className="text-white/80 text-sm mb-2">Prelucrăm datele pentru:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-white/80 text-sm">
              <strong>Crearea și administrarea contului</strong> (dacă există), plasarea și gestionarea comenzilor – pentru executarea contractului
            </li>
            <li className="text-white/80 text-sm">
              <strong>Livrare, retur, garanție, suport clienți</strong> – pentru executarea contractului și/sau interes legitim
            </li>
            <li className="text-white/80 text-sm">
              <strong>Facturare și evidențe contabile/fiscale</strong> – obligație legală
            </li>
            <li className="text-white/80 text-sm">
              <strong>Prevenirea fraudelor și securitatea site-ului</strong> – interes legitim
            </li>
            <li className="text-white/80 text-sm">
              <strong>Marketing (newsletter / oferte)</strong> – consimțământ (te poți dezabona oricând)
            </li>
            <li className="text-white/80 text-sm">
              <strong>Statistici și îmbunătățirea experienței pe site</strong> – interes legitim și/sau consimțământ, în funcție de cookie-urile folosite
            </li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Plăți și platformă (Shopify)</h2>
          <p className="text-white/80 text-sm mb-4">
            Folosim Shopify pentru funcționarea magazinului online și procesarea plăților (în calitate de furnizor/împuternicit, după caz). Datele necesare plății sunt prelucrate prin Shopify conform setărilor și fluxurilor de checkout.
          </p>
          <p className="text-white/80 text-sm mb-6">
            Este posibil ca anumite date să fie prelucrate sau stocate și în afara Spațiului Economic European, în funcție de infrastructura furnizorilor utilizați; în aceste situații se aplică garanții legale pentru transferuri.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cookie-uri</h2>
          <p className="text-white/80 text-sm mb-2">Folosim cookie-uri:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-white/80 text-sm">
              <strong>Necesare</strong> (funcționare site, coș, securitate) – active implicit
            </li>
            <li className="text-white/80 text-sm">
              <strong>Statistice/marketing</strong> – active doar dacă îți dai acordul din bannerul de cookie-uri (unde poți modifica opțiunile)
            </li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            Poți gestiona cookie-urile și din setările browserului tău.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cui divulgăm datele</h2>
          <p className="text-white/80 text-sm mb-2">Putem partaja datele strict cât e necesar cu:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-white/80 text-sm">furnizori de livrare/curierat – [nume curier]</li>
            <li className="text-white/80 text-sm">Shopify (platformă + procesare plăți)</li>
            <li className="text-white/80 text-sm">furnizori IT (hosting, mentenanță, e-mail)</li>
            <li className="text-white/80 text-sm">servicii de marketing/analiză (doar dacă ai consimțit, când e cazul)</li>
            <li className="text-white/80 text-sm">autorități publice, când legea ne obligă</li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cât timp păstrăm datele</h2>
          <p className="text-white/80 text-sm mb-2">Păstrăm datele:</p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li className="text-white/80 text-sm">cât e necesar pentru comenzi, livrare, retururi și garanții</li>
            <li className="text-white/80 text-sm">conform termenelor legale pentru documente financiar-contabile</li>
            <li className="text-white/80 text-sm">pentru marketing: până îți retragi consimțământul (dezabonare)</li>
          </ul>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Drepturile tale</h2>
          <p className="text-white/80 text-sm mb-6">
            Ai drepturile prevăzute de legislația privind protecția datelor: acces, rectificare, ștergere, restricționare, opoziție, portabilitate, retragerea consimțământului (pentru marketing) și dreptul de a depune plângere la autoritatea competentă.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Securitate</h2>
          <p className="text-white/80 text-sm mb-6">
            Aplicăm măsuri rezonabile de securitate pentru a proteja datele (control acces, backup, protecții tehnice, proceduri interne).
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Modificări</h2>
          <p className="text-white/80 text-sm mb-6">
            Putem actualiza această politică. Versiunea în vigoare este cea publicată pe site, cu data ultimei actualizări.
          </p>

        </div>
      </div>

      {/* Call to action section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Ai Întrebări?</h3>
          <p className="text-white/70 text-sm mb-3">Echipa noastră de suport este aici pentru a te ajuta cu orice preocupări de confidențialitate.</p>
          <a 
            href="/contact-us" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Contactează Suport
          </a>
        </div>
        
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Termeni și Condiții</h3>
          <p className="text-white/70 text-sm mb-3">Află despre termenii care guvernează utilizarea serviciilor noastre.</p>
          <a 
            href="/terms-of-service" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Vezi Termenii
          </a>
        </div>
      </div>
    </div>
  );
}