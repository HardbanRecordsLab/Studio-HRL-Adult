import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import ImageUpload from '@/components/media/ImageUpload';
import VideoUpload from '@/components/media/VideoUpload';
import { cn } from '@/utils/utils';
import { useLocale, useMessages } from '@/i18n';
import { casting } from '@/i18n/casting';

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
    reader.readAsDataURL(file);
  });

const uploadMediaFile = async (file: File, resourceType: 'image' | 'video') => {
  const fileDataUrl = await readFileAsDataUrl(file);
  const response = await fetch('/api/media/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file: fileDataUrl,
      folder: 'casting-applications',
      resourceType,
    }),
  });

  if (!response.ok) {
    throw new Error(`Upload failed for ${file.name}`);
  }

  const payload = await response.json();
  return payload.url as string;
};

const Required: React.FC = () => <span className="text-crimson">*</span>;

const FieldLabel: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="text-[9px] uppercase tracking-widest text-gold font-bold">
    {children}{required && <> <Required /></>}
  </label>
);

const CastingPage: React.FC = () => {
  const locale = useLocale();
  const t = useMessages(casting);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const steps = t.form.steps;
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
        setFormData((prev) => ({ ...prev, [name]: currentArray }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checkbox.checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const [photo1, photo2, photo3, video] = await Promise.all([
        formData.photo1 ? uploadMediaFile(formData.photo1, 'image') : Promise.resolve(null),
        formData.photo2 ? uploadMediaFile(formData.photo2, 'image') : Promise.resolve(null),
        formData.photo3 ? uploadMediaFile(formData.photo3, 'image') : Promise.resolve(null),
        formData.video ? uploadMediaFile(formData.video, 'video') : Promise.resolve(null),
      ]);

      const response = await fetch('/api/casting/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          photo1,
          photo2,
          photo3,
          video,
          locale,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert(t.form.submitError);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t.form.connectionError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24">
          {/* HERO CASTING */}
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-[7%] py-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(155,31,53,0.15),rgba(90,15,30,0.08)_50%,transparent_70%)] z-0" />
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="hero-casting-pre flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase"
              >
                <div className="w-8 h-px bg-gold/30" />
                ELEVATE YOUR EXPERIENCE
                <div className="w-8 h-px bg-gold/30" />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h1-premium text-white"
              >
                {t.hero.titleA} <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.hero.titleB}</span> {t.hero.titleC}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-cormorant text-xl italic text-dim"
              >
                {t.hero.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-dim text-sm leading-loose font-light max-w-2xl mx-auto"
              >
                {t.hero.text}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6"
              >
                <a href="#form" className="btn-crimson">{t.hero.apply}</a>
                <a href="#earnings" className="btn-outline">{t.hero.earnings}</a>
              </motion.div>
            </div>
          </section>

          {/* PROCESS SECTION */}
          <section id="process" className="py-24 bg-dark-2 px-[7%]">
            <div className="max-w-7xl mx-auto">
              <div className="section-tag">{t.process.tag}</div>
              <h2 className="h1-premium">{t.process.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.process.titleB}</span></h2>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent my-12" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-crimson via-gold/20 to-gold/5 z-0" />

                {t.process.steps.map((step, i) => (
                  <div key={step.title} className="relative z-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full border border-crimson flex items-center justify-center mx-auto bg-dark text-gold font-cormorant text-2xl hover:bg-crimson/20 transition-all duration-500">{i + 1}</div>
                    <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white">{step.title}</h3>
                    <p className="text-xs text-dim leading-relaxed">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CASTING FORM SECTION */}
          <section id="form" className="py-24 px-[7%] bg-dark-3">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 space-y-4">
                <div className="section-tag justify-center">{t.form.tag}</div>
                <h2 className="h1-premium">{t.form.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.form.titleB}</span></h2>
                <p className="text-dim text-sm font-light italic">
                  {t.form.sub}
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gold/5 border border-gold/20 p-16 text-center space-y-6"
                >
                  <div className="text-6xl">✨</div>
                  <h3 className="font-cormorant text-4xl text-gold italic">{t.form.successTitle}</h3>
                  <p className="text-dim max-w-md mx-auto leading-loose">
                    {t.form.successText}
                  </p>
                  <button onClick={() => setIsSubmitted(false)} className="btn-outline">{t.form.again}</button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Steps */}
                  <div className="flex justify-between mb-20 relative overflow-x-auto pb-4 px-4 scrollbar-hide">
                    <div className="absolute top-5 left-0 right-0 h-px bg-gold/10 -translate-y-1/2 z-0" />
                    {steps.map((name, index) => {
                      const id = index + 1;
                      return (
                        <div key={id} className="relative z-10 flex flex-col items-center gap-3 min-w-[80px]">
                          <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                            currentStep >= id ? 'bg-gold border-gold text-dark' : 'bg-dark border-gold/20 text-gold/40'
                          }`}>
                            {id}
                          </div>
                          <span className={`text-[7px] tracking-[0.15em] uppercase text-center transition-colors duration-500 ${
                            currentStep >= id ? 'text-gold' : 'text-dim/40'
                          }`}>
                            {name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Form Content */}
                  <form onSubmit={handleSubmit} className="space-y-12">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="bg-dark-2/50 border border-gold/10 p-8 md:p-12 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />

                        <div className="relative z-10 space-y-8">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-full border border-crimson flex items-center justify-center text-crimson font-cormorant text-xl">{currentStep}</div>
                            <h3 className="font-cormorant text-3xl text-gold italic">{steps[currentStep - 1]}</h3>
                          </div>

                          {currentStep === 1 && (
                            <div className="space-y-8">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.firstName}</FieldLabel>
                                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" placeholder={t.form.firstNamePh} />
                                </div>
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.lastName}</FieldLabel>
                                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" placeholder={t.form.lastNamePh} />
                                </div>
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.email}</FieldLabel>
                                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" placeholder={t.form.emailPh} />
                                </div>
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.phone}</FieldLabel>
                                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" placeholder={t.form.phonePh} />
                                </div>
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.birthDate}</FieldLabel>
                                  <input required type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="space-y-2">
                                  <FieldLabel required>{t.form.body}</FieldLabel>
                                  <div className="flex gap-2">
                                    <input required type="number" name="height" value={formData.height} onChange={handleChange} className="form-input" placeholder={t.form.height} />
                                    <input required type="number" name="weight" value={formData.weight} onChange={handleChange} className="form-input" placeholder={t.form.weight} />
                                  </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                  <FieldLabel>{t.form.features}</FieldLabel>
                                  <textarea name="bodyModifications" value={formData.bodyModifications} onChange={handleChange} className="form-input h-[80px]" placeholder={t.form.featuresPh}></textarea>
                                </div>
                              </div>
                            </div>
                          )}

                          {currentStep === 2 && (
                            <div className="space-y-8">
                               <div className="space-y-4">
                                <FieldLabel>{t.form.experience}</FieldLabel>
                                <div className="flex flex-wrap gap-4">
                                  <label className="flex items-center gap-3 p-4 bg-dark-4 border border-gold/10 cursor-pointer hover:border-gold/30 transition-colors">
                                    <input type="radio" name="experience" value="no" checked={formData.experience === 'no'} onChange={handleChange} className="accent-crimson" />
                                    <span className="text-xs text-dim">{t.form.experienceNo}</span>
                                  </label>
                                  <label className="flex items-center gap-3 p-4 bg-dark-4 border border-gold/10 cursor-pointer hover:border-gold/30 transition-colors">
                                    <input type="radio" name="experience" value="yes" checked={formData.experience === 'yes'} onChange={handleChange} className="accent-crimson" />
                                    <span className="text-xs text-dim">{t.form.experienceYes}</span>
                                  </label>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <FieldLabel>{t.form.contentTypes}</FieldLabel>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                  {t.form.contentTypeOptions.map(option => (
                                    <label key={option.value} className="flex items-center gap-3 p-3 bg-dark-4 border border-gold/5 cursor-pointer hover:border-gold/20 transition-colors">
                                      <input type="checkbox" name="contentTypes" value={option.value} checked={formData.contentTypes.includes(option.value)} onChange={handleChange} className="accent-gold" />
                                      <span className="text-[10px] text-dim">{option.label}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <FieldLabel required>{t.form.motivation}</FieldLabel>
                                <textarea required name="motivation" value={formData.motivation} onChange={handleChange} className="form-input min-h-[80px]" placeholder={t.form.motivationPh}></textarea>
                              </div>
                            </div>
                          )}

                          {currentStep === 3 && (
                            <div className="space-y-8">
                              <div className="p-6 bg-gold/5 border border-gold/10">
                                <p className="text-[11px] text-dim leading-relaxed mb-4">{t.form.mediaNote} <Required /></p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="space-y-2">
                                    <FieldLabel required>{t.form.photoBody}</FieldLabel>
                                    <ImageUpload onUpload={(files) => setFormData(prev => ({ ...prev, photo1: files[0] ?? null }))} />
                                  </div>
                                  <div className="space-y-2">
                                    <FieldLabel required>{t.form.photoFace}</FieldLabel>
                                    <ImageUpload onUpload={(files) => setFormData(prev => ({ ...prev, photo2: files[0] ?? null }))} />
                                  </div>
                                  <div className="space-y-2">
                                    <FieldLabel required>{t.form.video}</FieldLabel>
                                    <VideoUpload onUpload={(file) => setFormData(prev => ({ ...prev, video: file }))} maxSize={50} />
                                  </div>
                                </div>
                              </div>

                              <div className="bg-dark-4/50 border border-crimson/20 p-8 space-y-4">
                                <h4 className="font-cormorant text-xl text-gold italic">{t.form.statementsTitle}</h4>
                                <div className="space-y-4">
                                  <label className="flex items-start gap-4 cursor-pointer group">
                                    <input required type="checkbox" name="consentAge" checked={formData.consentAge} onChange={handleChange} className="mt-1 accent-crimson w-4 h-4" />
                                    <span className="text-[11px] text-dim group-hover:text-white transition-colors">{t.form.consentAge} <Required /></span>
                                  </label>
                                  <label className="flex items-start gap-4 cursor-pointer group">
                                    <input required type="checkbox" name="consentTerms" checked={formData.consentTerms} onChange={handleChange} className="mt-1 accent-crimson w-4 h-4" />
                                    <span className="text-[11px] text-dim group-hover:text-white transition-colors">{t.form.consentTerms} <Required /></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center pt-8 border-t border-gold/10">
                      <button
                        type="button"
                        onClick={handleBack}
                        className={cn(
                          "text-[10px] uppercase tracking-widest font-bold transition-all",
                          currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-dim hover:text-gold'
                        )}
                      >
                        {t.form.back}
                      </button>

                      {currentStep < steps.length ? (
                        <button type="button" onClick={handleNext} className="btn-gold">
                          {t.form.next}
                        </button>
                      ) : (
                        <button type="submit" className="btn-crimson" disabled={isSubmitting}>
                          {isSubmitting ? t.form.sending : t.form.submit}
                        </button>
                      )}
                    </div>
                  </form>
                </>
              )}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section id="faq" className="py-24 px-[7%] max-w-5xl mx-auto">
            <div className="section-tag">{t.faq.tag}</div>
            <h2 className="h1-premium">{t.faq.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.faq.titleB}</span></h2>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent my-12" />

            <div className="space-y-4">
              {t.faq.items.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </section>

          {/* PRIVACY ASSURANCE */}
          <section className="py-24 px-[7%] max-w-7xl mx-auto">
            <div className="bg-dark-3/40 border-l-4 border-gold p-12 space-y-6">
              <h3 className="font-cormorant text-2xl text-gold italic">{t.privacy.title}</h3>
              <p className="text-dim text-sm leading-relaxed">{t.privacy.text}</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-dim italic">
                {t.privacy.items.map((item) => (
                  <li key={item} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gold rotate-45" /> {item}</li>
                ))}
              </ul>
              <p className="text-gold/60 text-[10px] font-bold tracking-widest uppercase">{t.privacy.footer}</p>
            </div>
          </section>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .form-input {
          width: 100%;
          background: rgba(30, 24, 40, 0.5);
          border: 1px solid rgba(201, 168, 76, 0.15);
          color: #FBF6F0;
          padding: 1rem;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          outline: none;
          transition: border-color 0.3s;
        }
        .form-input:focus {
          border-color: rgba(201, 168, 76, 0.45);
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
