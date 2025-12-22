import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Policy | 47Gear",
  description: "Learn about 47Gear's return policy and how to return products within 14 days.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-10">
      {/* Header with gradient effect */}
      <div className="mb-8 pt-20 text-center relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-accent-primary/20 via-accent-secondary/10 to-accent-primary/20 blur-xl opacity-30 rounded-full"></div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 animate-gradient">
          Politica de Retur
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full mx-auto my-4"></div>
        <p className="mt-3 text-base text-white/80 max-w-xl mx-auto">
          Ultima actualizare: 18.11.2025
        </p>
      </div>

      {/* Main content */}
      <div className="glass-card p-6 border border-accent-primary/20 shadow-neon mb-8">
        <div className="prose prose-invert prose-headings:text-accent-secondary prose-a:text-accent-secondary max-w-none">
          
          <h2 className="text-xl font-bold text-gradient-purple mb-4">Dreptul de retur (14 zile)</h2>
          <p className="text-white/80 text-sm mb-6">
            Dacă ești consumator (persoană fizică), ai dreptul să returnezi produsele cumpărate online în termen de <strong>14 zile calendaristice</strong> de la data la care le-ai primit, fără să fie nevoie să explici motivul.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cum soliciți returul</h2>
          <p className="text-white/80 text-sm mb-2">
            Trimite un e-mail la <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a> și include:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-white/80 text-sm">numărul comenzii</li>
            <li className="text-white/80 text-sm">numele pe care a fost plasată comanda</li>
            <li className="text-white/80 text-sm">produsele pe care vrei să le returnezi</li>
            <li className="text-white/80 text-sm">contul IBAN (dacă e nevoie pentru rambursare, în funcție de metoda de plată)</li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            Îți confirmăm primirea solicitării și îți spunem pașii de urmat.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Cum trimiți coletul înapoi</h2>
          <p className="text-white/80 text-sm mb-4">
            Returnarea se face prin curier, la adresa comunicată de noi în răspunsul la solicitarea de retur.
          </p>
          <div className="glass-card p-4 bg-amber-900/20 border border-amber-500/30 mb-6">
            <p className="text-amber-200 text-sm mb-2">
              <strong>⚠️ Important:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li className="text-white/80 text-sm">Costul direct al returnării este suportat de client.</li>
              <li className="text-white/80 text-sm">Recomandăm păstrarea dovezii de expediere până la finalizarea returului.</li>
            </ul>
          </div>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Condițiile de acceptare a returului</h2>
          <p className="text-white/80 text-sm mb-2">Pentru a putea fi acceptat, produsul trebuie:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-white/80 text-sm">să fie returnat în aceeași stare în care a fost primit</li>
            <li className="text-white/80 text-sm">să nu fie deteriorat, murdărit sau utilizat în mod excesiv</li>
            <li className="text-white/80 text-sm">să fie ambalat corespunzător pentru transport (ideal în ambalajul original, dacă există)</li>
            <li className="text-white/80 text-sm">să includă toate accesoriile și orice elemente primite în colet</li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            Poți deschide și verifica produsul, așa cum ai face într-un magazin fizic.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Rambursarea banilor</h2>
          <p className="text-white/80 text-sm mb-4">
            După ce primim coletul și verificăm produsele, facem rambursarea în cel mult <strong>14 zile</strong> de la data la care ne-ai informat despre retragere.
          </p>
          <p className="text-white/80 text-sm mb-2">Putem amâna rambursarea până când:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-white/80 text-sm">primim produsele înapoi, sau</li>
            <li className="text-white/80 text-sm">ne trimiți dovada că ai expediat coletul (AWB)</li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            Rambursarea se face, de regulă, prin aceeași metodă folosită la plată (dacă nu agream altfel).
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Situații în care se poate reduce suma rambursată</h2>
          <p className="text-white/80 text-sm mb-6">
            Dacă produsul prezintă urme de utilizare peste ce este necesar pentru verificare (zgârieturi, murdărie, deteriorări), putem reține o sumă corespunzătoare diminuării valorii produsului.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Produse care nu pot fi returnate (excepții legale)</h2>
          <p className="text-white/80 text-sm mb-2">În anumite cazuri, legea prevede excepții de la dreptul de retragere, de exemplu:</p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li className="text-white/80 text-sm">produse personalizate după specificațiile clientului</li>
            <li className="text-white/80 text-sm">produse sigilate care nu pot fi returnate din motive de igienă sau protecție a sănătății, dacă au fost desigilate</li>
          </ul>
          <p className="text-white/80 text-sm mb-6">
            Dacă o astfel de excepție se aplică unui produs, va fi menționată clar pe pagina produsului sau în comunicarea cu tine.
          </p>

          <h2 className="text-xl font-bold text-gradient-purple mb-4">Contact</h2>
          <p className="text-white/80 text-sm mb-4">Pentru retururi sau întrebări:</p>
          <div className="glass-card p-4 bg-black/40 border border-accent-primary/20">
            <p className="text-white/90 text-sm mb-1">
              E-mail: <a href="mailto:contact@47gear.ro" className="text-accent-secondary hover:text-accent-primary">contact@47gear.ro</a>
            </p>
            <p className="text-white/90 text-sm">Telefon: 0766053447</p>
          </div>

        </div>
      </div>

      {/* Call to action section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Ai Întrebări?</h3>
          <p className="text-white/70 text-sm mb-3">Echipa noastră de suport este aici pentru a te ajuta cu orice întrebări despre retururi.</p>
          <a 
            href="/contact-us" 
            className="inline-block px-4 py-2 text-sm rounded-md bg-accent-primary/80 hover:bg-accent-primary transition-colors duration-300 text-white"
          >
            Contactează Suport
          </a>
        </div>
        
        <div className="glass-card p-4 border border-accent-primary/20 flex-1 w-full text-center">
          <h3 className="text-lg font-semibold text-accent-secondary mb-2">Termeni și Condiții</h3>
          <p className="text-white/70 text-sm mb-3">Citește termenii completi care guvernează achizițiile tale.</p>
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
