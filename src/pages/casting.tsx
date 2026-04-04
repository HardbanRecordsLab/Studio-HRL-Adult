import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import ImageUpload from '@/components/media/ImageUpload';
import VideoUpload from '@/components/media/VideoUpload';
import { cn } from '@/utils/utils';

const steps = [
  { id: 1, name: 'Podstawowe Informacje' },
  { id: 2, name: 'Dane Fizyczne' },
  { id: 3, name: 'Doświadczenie' },
  { id: 4, name: 'Preferencje' },
  { id: 5, name: 'Dostępność' },
  { id: 6, name: 'Dodatkowe Informacje' },
  { id: 7, name: 'Zgody i Oświadczenia' },
  { id: 8, name: 'Zdjęcia i Wideo' },
];

const CastingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    height: '',
    weight: '',
    hairColor: '',
    eyeColor: '',
    breastSize: '',
    experience: 'no',
    experienceDesc: '',
    platforms: [] as string[],
    contentTypes: [] as string[],
    limits: '',
    sessionsPerWeek: '',
    workingTimes: [] as string[],
    motivation: '',
    bodyModifications: '',
    skills: '',
    consentAge: false,
    consentTerms: false,
    consentData: false,
    consentMarketing: false,
    photo1: null as File | null,
    photo2: null as File | null,
    photo3: null as File | null,
    video: null as File | null,
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'platforms' || name === 'contentTypes' || name === 'workingTimes') {
        const currentArray = [...(formData[name as keyof typeof formData] as string[])];
        if (checkbox.checked) {
          currentArray.push(value);
        } else {
          const index = currentArray.indexOf(value);
          if (index > -1) currentArray.splice(index, 1);
        }
        setFormData(prev => ({ ...prev, [name]: currentArray }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/casting/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert('Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Błąd połączenia z serwerem.');
    }
  };

  return (
    <>
      <Head>
        <title>Casting Premium +18 | Studio HRL Adult – Ekskluzywne Partnerstwo</title>
        <meta name="description" content="Dołącz do elitarnego grona twórców Studio HRL Adult. Profesjonalny management, luksusowe studia 4K, zarobki do 150 000 PLN+. Aplikuj na casting do najlepszego studia w branży." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative overflow-x-hidden">
        <Navigation />

        <main className="pt-24">
          {/* HERO CASTING - LUXURY REDESIGN */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-[7%] py-24">
            {/* Animated background layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(155,31,53,0.2),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(201,168,76,0.12),transparent_50%)]" />
            <div className="absolute inset-0 bg-dark/40 backdrop-blur-[2px]" />
            
            <div className="relative z-10 text-center max-w-5xl mx-auto space-y-12">
              <motion.div 
                initial={{ opacity: 0, letterSpacing: '0.2em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.6em' }}
                transition={{ duration: 1 }}
                className="flex items-center justify-center gap-6 text-gold/50 text-[9px] uppercase font-bold"
              >
                <div className="w-16 h-px bg-gold-gradient" />
                Elite Partnership Program
                <div className="w-16 h-px bg-gold-gradient" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h1-premium text-white leading-[1.1]"
              >
                Zmień Swoją <span className="italic">Wizję</span> <br />
                <span className="bg-gold-gradient bg-clip-text text-transparent">W Luksusowy Sukces</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="font-cormorant text-2xl italic text-dim max-w-2xl mx-auto"
              >
                Profesjonalny management i produkcja treści klasy Premium dla najbardziej wymagających twórców.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap justify-center gap-8 pt-6"
              >
                <a href="#form" className="btn-gold px-12 py-5 text-xs">Aplikuj Teraz</a>
                <a href="#earnings" className="btn-outline px-12 py-5 text-xs">Kalkulator Zarobków</a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
                className="flex justify-center gap-12 pt-16 grayscale opacity-50"
              >
                {['ONLYFANS TOP 0.1%', '4K PRODUCTION', 'GLOBAL REACH', 'LEGAL COMPLIANCE'].map(t => (
                  <span key={t} className="text-[7px] tracking-[0.4em] uppercase text-gold font-bold">{t}</span>
                ))}
              </motion.div>
            </div>
          </section>

          {/* LUXURY EARNINGS TABLE */}
          <section id="earnings" className="py-32 px-[7%] max-w-7xl mx-auto relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-crimson/5 rounded-full blur-[120px] -z-10" />
            <div className="section-tag">Zarobki i Skalowanie</div>
            <h2 className="h1-premium">Twoja <span className="italic">Droga</span> do <br /><span className="bg-gold-gradient bg-clip-text text-transparent">Wolności Finansowej</span></h2>
            
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-4 gap-px bg-gold/10 border border-gold/10">
              {[
                { 
                  level: 'Starter', 
                  amount: '1.5 - 4k', 
                  desc: 'Budowanie fundamentów marki i pierwszej bazy lojalnych fanów.', 
                  features: ['1-2 sesje / tydz.', 'Onboarding', 'Basic SEO'],
                  color: 'text-dim'
                },
                { 
                  level: 'Professional', 
                  amount: '5 - 15k', 
                  desc: 'Stabilny wzrost i optymalizacja sprzedaży poprzez PPV i Live.', 
                  features: ['3 sesje / tydz.', 'Dedykowany czat', 'Social funnel'],
                  color: 'text-gold'
                },
                { 
                  level: 'Master', 
                  amount: '15 - 45k', 
                  desc: 'Zaawansowana monetyzacja i budowanie statusu Top 1% na OF.', 
                  features: ['4 sesje / tydz.', 'Produkcja 4K', 'Global Promo'],
                  color: 'text-crimson'
                },
                { 
                  level: 'Elite', 
                  amount: '50 - 150k+', 
                  desc: 'Najwyższy poziom dochodów pasywnych i pełna dominacja rynkowa.', 
                  features: ['Full support', 'Custom management', 'VIP Whales focus'],
                  color: 'text-white'
                }
              ].map((tier, i) => (
                <div key={tier.level} className="bg-dark-2 p-10 space-y-8 hover:bg-dark-3 transition-all group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gold/10 group-hover:bg-gold transition-colors" />
                  <div className="space-y-2">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-gold/60">{tier.level}</span>
                    <div className={cn("font-cormorant text-3xl font-bold", tier.color)}>{tier.amount} <span className="text-sm font-light">PLN</span></div>
                  </div>
                  <p className="text-[10px] text-dim leading-loose font-light italic">{tier.desc}</p>
                  <ul className="space-y-3 pt-4">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-[9px] text-dim/80">
                        <span className="w-1 h-1 bg-gold rotate-45" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[8px] text-dim/40 text-center italic uppercase tracking-widest">Wszystkie kwoty są uśrednionymi wynikami netto naszych partnerów w modelu 60/30/10.</p>
          </section>

          {/* LUXURY PROCESS SECTION */}
          <section id="process" className="py-32 bg-dark-2 px-[7%] relative overflow-hidden">
            <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="section-tag">Metodologia Sukcesu</div>
              <h2 className="h1-premium">Ewolucja <span className="italic">Twojej</span> <br /><span className="bg-gold-gradient bg-clip-text text-transparent">Marki Osobistej</span></h2>
              
              <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-20">
                {[
                  { 
                    num: '01', 
                    title: 'Audyt i Strategia', 
                    desc: 'Analizujemy Twój potencjał i tworzymy unikalny plan pozycjonowania na globalnym rynku adult.',
                    ico: '🎯'
                  },
                  { 
                    num: '02', 
                    title: 'Produkcja 4K', 
                    desc: 'Realizujemy profesjonalne sesje foto i wideo w luksusowych lokalizacjach z wykorzystaniem sprzętu kinowego.',
                    ico: '📹'
                  },
                  { 
                    num: '03', 
                    title: 'Monetyzacja', 
                    desc: 'Nasi managerowie przejmują obsługę techniczną i marketingową, pozwalając Ci skupić się na kreacji.',
                    ico: '💎'
                  }
                ].map((step, i) => (
                  <div key={step.num} className="space-y-8 group">
                    <div className="flex items-baseline gap-4">
                      <span className="font-playfair text-6xl text-gold/10 group-hover:text-gold/30 transition-colors duration-700">{step.num}</span>
                      <div className="text-3xl">{step.ico}</div>
                    </div>
                    <h3 className="font-cormorant text-2xl text-white italic">{step.title}</h3>
                    <p className="text-xs text-dim leading-loose font-light">{step.desc}</p>
                    <div className="w-12 h-px bg-gold/20 group-hover:w-full transition-all duration-1000" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LUXURY CASTING FORM SECTION */}
          <section id="form" className="py-32 px-[7%] bg-dark relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-24 space-y-6">
                <div className="section-tag justify-center">Aplikacja Premium</div>
                <h2 className="h1-premium">Zostań <span className="italic bg-gold-gradient bg-clip-text text-transparent">Partnerką</span> Studio HRL</h2>
                <p className="text-dim text-sm font-light italic max-w-xl mx-auto leading-loose">
                  Nasz proces selekcji jest rygorystyczny, aby zapewnić najwyższą jakość współpracy. Gwarantujemy pełną dyskrecję i profesjonalne podejście od pierwszego kontaktu.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-dark-2 border border-gold/20 p-20 text-center space-y-8 shadow-2xl relative"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,168,76,0.1),transparent_70%)]" />
                  <div className="text-7xl relative z-10">🌹</div>
                  <h3 className="font-cormorant text-4xl text-gold italic relative z-10">Twoje Zgłoszenie Zostało Przyjęte</h3>
                  <p className="text-dim max-w-md mx-auto leading-loose relative z-10 text-sm">
                    Nasza dyrektor rekrutacji skontaktuje się z Tobą w ciągu 24 godzin, aby omówić szczegóły i zaprosić na poufną rozmowę wstępną.
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="btn-outline relative z-10 px-12">Wyślij Nowe Zapytanie</button>
                </motion.div>
              ) : (
                <>
                  {/* Luxury Progress Bar */}
                  <div className="flex justify-between mb-24 relative px-4">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gold/5 -translate-y-1/2" />
                    {steps.map((step) => (
                      <div key={step.id} className="relative z-10 flex flex-col items-center gap-4">
                        <div className={`w-3 h-3 rounded-full transition-all duration-700 ${
                          currentStep >= step.id ? 'bg-gold shadow-[0_0_15px_rgba(201,168,76,0.5)] scale-125' : 'bg-dark-3 border border-gold/20'
                        }`} />
                        <span className={`text-[6px] tracking-[0.3em] uppercase transition-colors duration-700 font-bold ${
                          currentStep >= step.id ? 'text-gold' : 'text-dim/30'
                        }`}>
                          {step.id}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Form Content */}
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="bg-dark-2 border border-gold/10 p-10 md:p-16 relative shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
                        
                        <div className="relative z-10 space-y-10">
                          <div className="flex items-center gap-6 mb-12">
                            <span className="font-playfair text-5xl text-gold/20 italic">{currentStep < 10 ? `0${currentStep}` : currentStep}</span>
                            <h3 className="font-cormorant text-3xl text-white italic border-l border-gold/20 pl-6">{steps[currentStep - 1].name}</h3>
                          </div>

                          {currentStep === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Imię lub Pseudonim <span className="text-crimson">*</span></label>
                                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input-premium" placeholder="Jak mamy się do Ciebie zwracać?" />
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Wiek <span className="text-crimson">*</span></label>
                                <input required type="number" name="birthDate" value={formData.birthDate} onChange={handleChange} className="form-input-premium" placeholder="Musisz mieć ukończone 18 lat" />
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Adres Email <span className="text-crimson">*</span></label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input-premium" placeholder="Do poufnej korespondencji" />
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Telefon / Telegram <span className="text-crimson">*</span></label>
                                <input required type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input-premium" placeholder="Preferowana forma kontaktu" />
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="space-y-10">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                  <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Wzrost (cm) <span className="text-crimson">*</span></label>
                                  <input required type="number" name="height" value={formData.height} onChange={handleChange} className="form-input-premium" placeholder="Np. 172" />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Waga (kg) <span className="text-crimson">*</span></label>
                                  <input required type="number" name="weight" value={formData.weight} onChange={handleChange} className="form-input-premium" placeholder="Np. 54" />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Typ Urody</label>
                                  <input type="text" name="hairColor" value={formData.hairColor} onChange={handleChange} className="form-input-premium" placeholder="Np. Blond / Niebieskie oczy" />
                                </div>
                                <div className="space-y-3">
                                  <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Rozmiar Biustu / Sylwetka</label>
                                  <input type="text" name="breastSize" value={formData.breastSize} onChange={handleChange} className="form-input-premium" placeholder="Np. 75C / Slim" />
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="space-y-10">
                              <div className="space-y-6">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Czy posiadasz już portfolio lub historię w branży?</label>
                                <div className="flex gap-6">
                                  {['Nie', 'Tak'].map(opt => (
                                    <label key={opt} className="flex-1 flex items-center justify-center gap-4 p-5 bg-dark border border-gold/10 cursor-pointer hover:border-gold/30 transition-all group">
                                      <input type="radio" name="experience" value={opt.toLowerCase()} checked={formData.experience === opt.toLowerCase()} onChange={handleChange} className="accent-gold" />
                                      <span className="text-xs text-dim group-hover:text-white transition-colors">{opt}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Dodatkowe informacje o doświadczeniu</label>
                                <textarea name="experienceDesc" value={formData.experienceDesc} onChange={handleChange} className="form-input-premium min-h-[120px]" placeholder="Opisz krótko swoje dotychczasowe działania..."></textarea>
                              </div>
                            </div>
                          )}

                          {currentStep === 4 && (
                            <div className="space-y-10">
                              <div className="space-y-6">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Preferowane Formaty</label>
                                <div className="grid grid-cols-2 gap-4">
                                  {['Ekskluzywne Foto', 'Produkcja VOD', 'Live Cam Premium', 'Współpraca Solo', 'Współpraca w Parze', 'Custom Content'].map(t => (
                                    <label key={t} className="flex items-center gap-4 p-4 bg-dark border border-gold/5 cursor-pointer hover:border-gold/20 transition-all group">
                                      <input type="checkbox" name="contentTypes" value={t.toLowerCase()} checked={formData.contentTypes.includes(t.toLowerCase())} onChange={handleChange} className="accent-gold" />
                                      <span className="text-[10px] text-dim group-hover:text-white transition-colors">{t}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Twoje Granice i Hard Limits</label>
                                <textarea name="limits" value={formData.limits} onChange={handleChange} className="form-input-premium min-h-[120px]" placeholder="To Ty ustalasz zasady. Opisz co jest dla Ciebie nieakceptowalne..."></textarea>
                              </div>
                            </div>
                          )}

                          {currentStep === 5 && (
                            <div className="space-y-10">
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Dyspozycyjność Tygodniowa</label>
                                <select name="sessionsPerWeek" value={formData.sessionsPerWeek} onChange={handleChange} className="form-input-premium">
                                  <option value="">Wybierz intensywność...</option>
                                  <option value="1-2">Okazjonalnie (1-2 dni)</option>
                                  <option value="3-4">Regularnie (3-4 dni)</option>
                                  <option value="5+">Pełne Zaangażowanie (5+ dni)</option>
                                </select>
                              </div>
                              <div className="space-y-6">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Preferowane Pory Dnia</label>
                                <div className="grid grid-cols-2 gap-4">
                                  {['Dzień', 'Wieczór', 'Noc', 'Weekendy'].map(t => (
                                    <label key={t} className="flex items-center gap-4 p-4 bg-dark border border-gold/5 cursor-pointer hover:border-gold/20 transition-all group">
                                      <input type="checkbox" name="workingTimes" value={t.toLowerCase()} checked={formData.workingTimes.includes(t.toLowerCase())} onChange={handleChange} className="accent-gold" />
                                      <span className="text-[10px] text-dim group-hover:text-white transition-colors">{t}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 6 && (
                            <div className="space-y-10">
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Twoja Motywacja i Cele <span className="text-crimson">*</span></label>
                                <textarea required name="motivation" value={formData.motivation} onChange={handleChange} className="form-input-premium min-h-[120px]" placeholder="Co chcesz osiągnąć współpracując z nami?"></textarea>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Znaki Szczególne / Tatuaże / Piercing</label>
                                <textarea name="bodyModifications" value={formData.bodyModifications} onChange={handleChange} className="form-input-premium min-h-[100px]" placeholder="Opisz ich lokalizację..."></textarea>
                              </div>
                            </div>
                          )}

                          {currentStep === 7 && (
                            <div className="space-y-10">
                              <div className="bg-dark border border-gold/10 p-10 space-y-8 shadow-inner">
                                <p className="font-cormorant text-xl text-gold italic border-b border-gold/10 pb-4">Oświadczenia Prawne</p>
                                <div className="space-y-6">
                                  {[
                                    { name: 'consentAge', label: 'Potwierdzam ukończenie 18 roku życia.' },
                                    { name: 'consentTerms', label: 'Akceptuję standardy profesjonalnej współpracy Studio HRL.' },
                                    { name: 'consentData', label: 'Wyrażam zgodę na poufne przetwarzanie moich danych w celu rekrutacji.' },
                                    { name: 'consentMarketing', label: 'Chcę otrzymywać zaproszenia na zamknięte sesje i castingi.' }
                                  ].map(c => (
                                    <label key={c.name} className="flex items-start gap-6 cursor-pointer group">
                                      <input required={c.name !== 'consentMarketing'} type="checkbox" name={c.name} checked={formData[c.name as keyof typeof formData] as boolean} onChange={handleChange} className="mt-1 accent-gold w-4 h-4" />
                                      <span className="text-xs text-dim group-hover:text-white transition-colors leading-relaxed">{c.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 8 && (
                            <div className="space-y-10">
                              <div className="p-10 bg-dark border border-gold/10 space-y-10">
                                <div className="text-center space-y-2">
                                  <h4 className="font-cormorant text-2xl text-gold italic">Weryfikacja Wizualna</h4>
                                  <p className="text-[10px] text-dim/60 uppercase tracking-widest">Wymagane: 3 fotografie (Full Body / Portrait) oraz krótkie wideo (30s).</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                  <div className="space-y-3">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Sylwetka (Nagie/Bielizna) <span className="text-crimson">*</span></label>
                                    <ImageUpload onUpload={(files) => setFormData(prev => ({ ...prev, photo1: files[0] }))} />
                                  </div>
                                  <div className="space-y-3">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Portret (Naturalny) <span className="text-crimson">*</span></label>
                                    <ImageUpload onUpload={(files) => setFormData(prev => ({ ...prev, photo2: files[0] }))} />
                                  </div>
                                  <div className="space-y-3">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Dowolne (Portfolio) <span className="text-crimson">*</span></label>
                                    <ImageUpload onUpload={(files) => setFormData(prev => ({ ...prev, photo3: files[0] }))} />
                                  </div>
                                  <div className="space-y-3">
                                    <label className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Wideo Intro (max 30s) <span className="text-crimson">*</span></label>
                                    <VideoUpload onUpload={(file) => setFormData(prev => ({ ...prev, video: file }))} maxSize={100} />
                                  </div>
                                </div>
                                <div className="pt-6 text-center italic text-dim text-[10px]">Wszystkie materiały są przechowywane na zaszyfrowanych serwerach i służą wyłącznie do weryfikacji przez zespół rekrutacyjny.</div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-12 border-t border-gold/10">
                      <button 
                        type="button"
                        onClick={handleBack} 
                        className={cn(
                          "text-[9px] uppercase tracking-[0.3em] font-bold transition-all",
                          currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-dim hover:text-gold'
                        )}
                      >
                        ← Wróć
                      </button>
                      
                      {currentStep < steps.length ? (
                        <button type="button" onClick={handleNext} className="btn-gold px-12 py-4">
                          Kontynuuj →
                        </button>
                      ) : (
                        <button type="submit" className="btn-crimson px-16 py-4">
                          Wyślij Aplikację
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>

          {/* LUXURY FAQ SECTION */}
          <section id="faq" className="py-32 px-[7%] max-w-5xl mx-auto">
            <div className="section-tag">Concierge Q&A</div>
            <h2 className="h1-premium text-center">Wszystko co <span className="italic">powinnaś</span> wiedzieć</h2>
            
            <div className="mt-20 space-y-4">
              {[
                { q: "Jak wygląda pierwsza sesja w studiu?", a: "Każda nowa partnerka przechodzi przez profesjonalny onboarding. Pierwsza sesja to briefing, wybór stylizacji przez naszych stylistów oraz praca z doświadczonym fotografem, który pomoże Ci poczuć się pewnie przed obiektywem." },
                { q: "Czy muszę pokazywać twarz?", a: "To zależy wyłącznie od Twojej strategii. Prowadzimy wiele topowych kont, które bazują na anonimowości. Wykorzystujemy geo-blocking, maski lub kadrowanie, aby chronić Twoją tożsamość, jeśli tego wymagasz." },
                { q: "W jaki sposób rozliczane są zarobki?", a: "Stosujemy transparentny model 60/30/10. Otrzymujesz 60% przychodów netto, studio pobiera 30% na management i produkcję, a 10% przeznaczamy na fundusz marketingowy Twojej marki. Wypłaty są realizowane terminowo przelewem lub krypto." },
                { q: "Jakie wsparcie techniczne oferujecie?", a: "Zapewniamy dostęp do najnowocześniejszego sprzętu 4K, profesjonalnego oświetlenia, szybkich łączy internetowych oraz dedykowanych stanowisk do cammingu i produkcji VOD w luksusowej oprawie." }
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>

          {/* LUXURY PRIVACY ASSURANCE */}
          <section className="py-32 px-[7%] max-w-7xl mx-auto">
            <div className="bg-dark-2 border border-gold/20 p-16 md:p-24 relative overflow-hidden group">
              <div className="absolute inset-0 bg-grain opacity-[0.03]" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -z-10" />
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-10">
                  <div className="section-tag">Security & Privacy</div>
                  <h3 className="font-cormorant text-4xl text-white italic">Twoje <span className="text-gold">Bezpieczeństwo</span> <br />jest naszą Religią</h3>
                  <p className="text-dim text-sm leading-loose font-light">
                    W branży adult content dyskrecja to nie tylko obietnica, to fundament biznesu. Studio HRL Adult wdraża wojskowe standardy ochrony danych i tożsamości naszych partnerów.
                  </p>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold text-2xl">🔒</div>
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold text-2xl">🛡️</div>
                    <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold text-2xl">⚖️</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[
                    'Geo-blocking na poziomie IP i krajów',
                    'Szyfrowane przechowywanie danych osobowych',
                    'Pełna zgodność z ustawą 18 U.S.C. § 2257',
                    'Profesjonalne wsparcie prawne i compliance',
                    'Ochrona wizerunku przed wyciekami'
                  ].map(f => (
                    <div key={f} className="flex items-center gap-6 p-4 bg-dark border border-gold/5 hover:border-gold/20 transition-all">
                      <div className="w-2 h-2 bg-gold-gradient rotate-45 flex-shrink-0" />
                      <span className="text-[10px] text-dim uppercase tracking-widest font-bold">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .form-input-premium {
          width: 100%;
          background: rgba(15, 12, 20, 0.8);
          border: 1px solid rgba(201, 168, 76, 0.1);
          color: #FBF6F0;
          padding: 1.25rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          font-weight: 300;
          outline: none;
          transition: all 0.5s;
          border-radius: 0;
        }
        .form-input-premium:focus {
          border-color: rgba(201, 168, 76, 0.5);
          background: rgba(20, 16, 26, 0.9);
          box-shadow: 0 0 20px rgba(201, 168, 76, 0.05);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gold/10 py-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex justify-between items-center gap-4">
        <h4 className="text-sm text-white font-medium">{question}</h4>
        <span className={cn("text-gold text-2xl transition-transform duration-300", isOpen && "rotate-45")}>+</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-dim leading-loose pt-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CastingPage;
