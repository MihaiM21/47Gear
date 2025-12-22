import { Metadata } from "next";
import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | 47Gear",
  description: "Get in touch with the 47Gear team for any inquiries, support or feedback.",
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

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
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
                  <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/47gear.ro/" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent-secondary/20 hover:border-accent-secondary/40 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
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
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Trimite un Mesaj</h2>
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-white">Întrebări Frecvente</h2>
            <p className="text-white/60">Ai întrebări? Avem răspunsuri.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Care sunt timpii de livrare?</h3>
              <p className="text-white/60">Majoritatea comenzilor sunt expediate în 1-2 zile lucrătoare. Livrarea standard durează 3-5 zile lucrătoare, iar cea rapida 1-3 zile.</p>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Livrați internațional?</h3>
              <p className="text-white/60">Da! Livrăm în toată lumea. Livrarea internațională durează de obicei 7-14 zile lucrătoare în funcție de locație.</p>
            </div>
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-white/20 transition-all duration-500">
              <h3 className="text-lg font-semibold text-white mb-3">Care este politica de returnare?</h3>
              <p className="text-white/60">Oferim o politică de returnare de 14 de zile. Produsele trebuie să fie în stare originală cu tot ambalajul și accesoriile.</p>
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