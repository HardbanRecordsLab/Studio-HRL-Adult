import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { ROUTES } from '@/utils/constants';

const steps = [
  { id: 1, name: 'Dane Podstawowe' },
  { id: 2, name: 'Wygląd i Preferencje' },
  { id: 3, name: 'Sprzęt i Social Media' },
  { id: 4, name: 'Zgody i Przesyłanie' },
];

const CastingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    location: '',
    experience: '',
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: '',
    socialMedia: '',
    expectedEarnings: '5000',
    consentAge: false,
    consentTerms: false,
    consentData: false,
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <>
      <Head>
        <title>Casting - Studio HRL Adult</title>
        <meta name="description" content="Aplikuj do Studio HRL Adult. Profesjonalny casting dla twórców treści 18+." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%]">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <div className="section-tag justify-center">Rekrutacja 18+</div>
              <h1 className="h1-premium">Zacznij swoją <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Karierę Premium</span></h1>
              <p className="text-dim text-sm font-light italic max-w-lg mx-auto">
                Wypełnij szczegółowy formularz aplikacyjny. Nasz zespół przeanalizuje Twoje zgłoszenie i skontaktuje się z Tobą w ciągu 24h.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between mb-20 relative">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/10 -translate-y-1/2 z-0" />
              {steps.map((step) => (
                <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                    currentStep >= step.id ? 'bg-gold border-gold text-dark' : 'bg-dark border-gold/20 text-gold/40'
                  }`}>
                    {step.id}
                  </div>
                  <span className={`text-[8px] tracking-[0.2em] uppercase transition-colors duration-500 ${
                    currentStep >= step.id ? 'text-gold' : 'text-dim/40'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Panel */}
            <div className="bg-dark-3/40 border border-gold/10 p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <h2 className="font-cormorant text-3xl text-white italic mb-8">Dane Podstawowe</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Imię / Pseudonim</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="Twoje imię..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Email</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="Twój email..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Telefon / Telegram</label>
                          <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="Twój kontakt..." />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Wiek</label>
                          <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="18+" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <h2 className="font-cormorant text-3xl text-white italic mb-8">Wygląd i Preferencje</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Wzrost (cm)</label>
                          <input type="number" name="height" value={formData.height} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="Np. 170" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Waga (kg)</label>
                          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="Np. 55" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Doświadczenie w branży</label>
                        <textarea name="experience" value={formData.experience} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors min-h-[120px]" placeholder="Opisz swoje doświadczenie (opcjonalnie)..."></textarea>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <h2 className="font-cormorant text-3xl text-white italic mb-8">Sprzęt i Social Media</h2>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Social Media (Instagram / Twitter / TikTok)</label>
                        <input type="text" name="socialMedia" value={formData.socialMedia} onChange={handleChange} className="w-full bg-dark-4/50 border border-gold/10 p-4 text-white font-cormorant italic text-lg outline-none focus:border-gold/40 transition-colors" placeholder="@twoj_profil" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[9px] uppercase tracking-widest text-gold/60 font-bold">Oczekiwane zarobki miesięczne (PLN)</label>
                        <input type="range" name="expectedEarnings" min="2000" max="50000" step="500" value={formData.expectedEarnings} onChange={handleChange} className="w-full accent-gold h-1 bg-gold/10 rounded-full appearance-none cursor-pointer" />
                        <div className="flex justify-between font-cormorant text-xl text-gold">
                          <span>2 000 PLN</span>
                          <span className="font-bold">{parseInt(formData.expectedEarnings).toLocaleString()} PLN</span>
                          <span>50 000+ PLN</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <h2 className="font-cormorant text-3xl text-white italic mb-8">Zgody i Przesyłanie</h2>
                      <div className="space-y-4">
                        <label className="flex items-start gap-4 p-4 bg-dark-4/30 border border-gold/5 cursor-pointer hover:border-gold/20 transition-colors">
                          <input type="checkbox" name="consentAge" checked={formData.consentAge} onChange={handleChange} className="mt-1 accent-gold w-4 h-4" />
                          <span className="text-[11px] text-dim font-light leading-relaxed">Potwierdzam, że mam ukończone <strong>18 lat</strong> i posiadam ważny dokument tożsamości.</span>
                        </label>
                        <label className="flex items-start gap-4 p-4 bg-dark-4/30 border border-gold/5 cursor-pointer hover:border-gold/20 transition-colors">
                          <input type="checkbox" name="consentTerms" checked={formData.consentTerms} onChange={handleChange} className="mt-1 accent-gold w-4 h-4" />
                          <span className="text-[11px] text-dim font-light leading-relaxed">Akceptuję <a href="#" className="text-gold border-b border-gold/20">Regulamin Studia</a> oraz politykę prywatności.</span>
                        </label>
                        <label className="flex items-start gap-4 p-4 bg-dark-4/30 border border-gold/5 cursor-pointer hover:border-gold/20 transition-colors">
                          <input type="checkbox" name="consentData" checked={formData.consentData} onChange={handleChange} className="mt-1 accent-gold w-4 h-4" />
                          <span className="text-[11px] text-dim font-light leading-relaxed">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu rekrutacji.</span>
                        </label>
                      </div>
                      
                      <div className="p-6 bg-crimson/5 border border-crimson/20">
                        <p className="text-[10px] text-dim/80 italic leading-relaxed text-center">
                          Twoje dane są u nas bezpieczne. Stosujemy pełne szyfrowanie i nie udostępniamy informacji osobom trzecim.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-12 pt-8 border-t border-gold/10 relative z-10">
                <button 
                  onClick={handleBack} 
                  disabled={currentStep === 1}
                  className={`text-[10px] uppercase tracking-widest font-bold transition-all ${
                    currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-dim hover:text-gold'
                  }`}
                >
                  ← Wstecz
                </button>
                
                {currentStep < steps.length ? (
                  <button onClick={handleNext} className="btn-gold">
                    Dalej →
                  </button>
                ) : (
                  <button className="btn-crimson">
                    Wyślij Aplikację
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default CastingPage;
