'use client';

import Image from 'next/image';
import { useState } from 'react';

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Se pătează mousepad-ul dacă vărs lichide pe el?",
      answer: "Suprafața are proprietăți hidrofobe, astfel încât lichidele uzuale (apă, cafea, suc, băuturi energizante) nu sunt absorbite imediat. Dacă lichidul este șters rapid, riscul de pătare este minim. În cazul în care lichidul rămâne pe suprafață o perioadă mai lungă, materialul poate începe să absoarbă umezeala."
    },
    {
      question: "Este mousepad-ul impermeabil?",
      answer: "Nu. Suprafața este rezistentă temporar la lichide, dar nu este complet impermeabilă. Se recomandă îndepărtarea imediată a lichidelor vărsate."
    },
    {
      question: "Cum se curăță corect mousepad-ul?",
      answer: "Curățarea se face manual, folosind o lavetă ușor umedă. La nevoie, se poate folosi un detergent delicat. Murdăria și petele se îndepărtează ușor, fără frecare agresivă."
    },
    {
      question: "Se poate spăla la mașina de spălat?",
      answer: "Nu este recomandată spălarea intensivă la mașină. Pentru a păstra suprafața și printul în stare optimă, se recomandă curățarea manuală."
    },
    {
      question: "Se duce printul în timp sau la curățare?",
      answer: "Nu. Printarea este realizată prin sublimare, fiind integrată permanent în structura materialului. Culorile sunt rezistente și nu se șterg sau decolorează în timpul utilizării sau curățării corecte."
    },
    {
      question: "Ce tip de suprafață are mousepad-ul?",
      answer: "Suprafața este realizată din material textil din poliester, neted, cu o micro-textură fină rezultată din structura țesăturii. Aceasta oferă un echilibru optim între viteză și control."
    },
    {
      question: "Este potrivit pentru toate tipurile de mouse?",
      answer: "Da. Suprafața este compatibilă cu mouse-uri cu senzori optici și laser, fiind potrivită atât pentru gaming, cât și pentru utilizare zilnică."
    },
    {
      question: "Ce produse de curățare ar trebui evitate?",
      answer: "Se recomandă evitarea substanțelor chimice agresive, a solvenților și a frecării dure, deoarece pot afecta materialul în timp."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="border-t border-white/5 pt-16 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            FAQ – Întrebări frecvente
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Răspunsuri la întrebările cele mai frecvente despre mousepad-urile noastre
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-accent-secondary/20 to-accent-primary/20 flex items-center justify-center border border-white/10">
                    <Image src="/logo/logo_yellow.png" alt="FAQ" width={22} height={22} />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-white">
                    {faq.question}
                  </h3>
                </div>
                <svg 
                  className={`w-5 h-5 text-white/60 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 md:px-6 pb-5 md:pb-6 pl-14 md:pl-[4.5rem]">
                  <p className="text-white/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
