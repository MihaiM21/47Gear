import { Metadata } from "next";
import ContactForm from "@/components/forms/contact-form";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact - Suport Clienți Mousepad-uri Gaming",
  description: "Contactează echipa 47Gear pentru întrebări despre mousepad-uri gaming, comenzi, livrare în România. Răspundem rapid la toate solicitările tale.",
  keywords: ["contact 47gear", "suport clienti gaming", "contact mousepad romania", "asistenta cumparaturi"],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact-us`,
  },
};

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-black text-white mt-12">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-full mb-6">
            <span className="text-xs font-medium text-accent-secondary tracking-wider uppercase">Contactează-ne</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Suntem aici să îți răspundem la întrebări și să te ajutăm să îți îmbunătățești experiența de gaming
          </p>
        </div>

        {/* Main content  Schimbat cols in 2 pentru contact form email*/}
        <div className="grid lg:grid-cols-1 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Contactează-ne</h2>
              
              <p className="text-white/60 mb-8">
                Echipa noastră de suport este gata să te asiste.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex-shrink-0 group-hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Telefon</h3>
                    <p className="text-white/60 hover:text-accent-secondary transition-colors">0766 053 447</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex-shrink-0 group-hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email</h3>
                    <p className="text-white/60 hover:text-accent-secondary transition-colors">contact@47gear.ro</p>
                  </div>
                </div>
                
                

                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-primary/10 border border-accent-primary/20 flex-shrink-0 group-hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-accent-secondary">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                    <a 
                      href={`https://wa.me/${process.env.WHATSAPP_PHONE_NUMBER || '40123456789'}?text=Bună! Am o întrebare despre produsele 47Gear.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-accent-secondary transition-colors inline-flex items-center gap-2"
                    >
                      <span>Trimite mesaj</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7"></path>
                        <path d="M7 7h10v10"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="font-semibold text-white mb-4">Conectează-te Cu Noi</h3>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/47gear.ro/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61587469140959" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@47gear.ro?lang=ro-RO" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300" aria-label="TikTok">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white/60">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Program de lucru telefonic</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Luni - Vineri</span>
                  <span className="text-white font-medium">9:00 - 16:00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Sâmbătă - Duminică</span>
                  <span className="text-white/50">Închis</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-secondary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>De obicei răspundem în maxim 24 de ore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          {/* <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Trimite un Mesaj</h2>
            <ContactForm />
          </div> */}
        </div>
        {/* Social Proof Section */}
              
        <div className="container mt-12 mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-12">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-8">Partenerii noștri</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-100">
              <a href="https://www.instagram.com/fcrapid1923esports/" target="_blank" rel="noopener noreferrer">
                <Image src="/partners/FC_RAPID_ESPORTS.png" alt="Partner 1" width={120} height={60} className="object-contain" />
              </a>
              <a href="https://www.instagram.com/gamexpert.ro/" target="_blank" rel="noopener noreferrer">
                <Image src="/partners/GAMEXPERT.png" alt="Partner 2" width={120} height={60} className="object-contain" />
              </a>
              <a href="https://www.instagram.com/loolishgaming?igsh=MThkZjc4aTNidnpoNQ==" target="_blank" rel="noopener noreferrer">
                <Image src="/partners/Loolish_Logo.png" alt="Partner 2" width={120} height={60} className="object-contain" />
              </a>
            </div>
          </div>
        </div>
              

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-white">Întrebări Frecvente</h2>
            <p className="text-white/60">Ai întrebări? Avem răspunsuri.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Care sunt timpii de livrare?</h3>
              <p className="text-white/60">Majoritatea comenzilor sunt expediate în 1-2 zile lucrătoare. Livrarea standard durează 3-5 zile lucrătoare, iar cea rapida 1-3 zile.</p>
            </div>
            
            {/* <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Livrați internațional?</h3>
              <p className="text-white/60">Da! Livrăm în toată lumea. Livrarea internațională durează de obicei 7-14 zile lucrătoare în funcție de locație.</p>
            </div> */}
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Care este politica de returnare?</h3>
              <p className="text-white/60">Oferim o politică de returnare de 14 zile. Produsele trebuie să fie în stare originală cu tot ambalajul și accesoriile.</p>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Oferiți garanție pentru produse?</h3>
              <p className="text-white/60">Toate produsele vin cu o garanție de 2 ani împotriva defectelor.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}