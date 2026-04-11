import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  UserPlus, 
  Image as ImageIcon, 
  Zap, 
  Layers, 
  Download, 
  RefreshCw,
  Camera,
  Maximize,
  Sliders,
  Type,
  Trash2,
  Music
} from 'lucide-react';
import Navigation from '@/components/common/Navigation';

interface AICreatorWorkshopProps {
  embedded?: boolean;
}

const AICreatorWorkshop: React.FC<AICreatorWorkshopProps> = ({ embedded = false }) => {
  const [activeMode, setActiveMode] = useState<'visual' | 'audio' | 'script' | 'production' | 'bio'>('visual');
  const [subMode, setSubMode] = useState<'generate' | 'swap'>('generate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  
  const [isEmbedded, setIsEmbedded] = useState(embedded);
  
  // Script state
  const [scriptType, setScriptType] = useState('ppv');
  const [scriptTone, setScriptTone] = useState('sensual');
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResult(null);
    try {
      const response = await fetch('/api/admin/workshop/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          mode: activeMode, 
          payload: { type: scriptType, tone: scriptTone, prompt } 
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Test error:', error);
    }
    setIsProcessing(false);
  };

  const tabs = [
    { id: 'visual' as const, name: 'Obraz & Deepfake', icon: Sparkles },
    { id: 'audio' as const, name: 'Głos & Audio', icon: Music },
    { id: 'script' as const, name: 'Scenariusz & Czat', icon: Type },
    { id: 'bio' as const, name: 'Bio Architect', icon: UserPlus },
    { id: 'production' as const, name: 'Produkcja (Pipeline)', icon: Zap },
  ];

  useEffect(() => {
    if (window.self !== window.top) setIsEmbedded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-rose-500/30 overflow-hidden">
      <Head>
        <title>HRL Creative Suite | Workshop</title>
      </Head>

      {!isEmbedded && <Navigation />}

      <main className={`${isEmbedded ? 'pt-4' : 'pt-24'} h-screen flex flex-col`}>
        <div className="px-6 lg:px-12 flex justify-between items-end mb-8 border-b border-white/5 pb-6">
          <header className={`border-l-4 border-rose-600 pl-6 ${isEmbedded ? 'hidden lg:block' : ''}`}>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">
              HRL <span className="text-rose-600">Creative</span> Suite
            </h1>
            <p className="text-gray-500 text-[10px] tracking-widest uppercase mt-1">Industrial Grade Laboratory for Content Production</p>
          </header>

          {/* MAIN TABS */}
          <div className="flex bg-[#0a0a0a] border border-white/10 p-1 rounded-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id)}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${activeMode === tab.id ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-gray-500 hover:text-white'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
          
          {/* LEFT: CONTROL CONSOLE (Context Sensitive) */}
          <aside className="col-span-12 lg:col-span-3 bg-[#080808] border-r border-white/5 p-8 flex flex-col overflow-y-auto custom-scrollbar">
            
            <AnimatePresence mode="wait">
              {/* VISUAL MODE */}
              {activeMode === 'visual' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="flex bg-[#111] p-1 rounded-lg border border-white/5 mb-6">
                    <button onClick={() => setSubMode('generate')} className={`flex-1 py-2 rounded text-[8px] font-bold uppercase ${subMode === 'generate' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Generacja</button>
                    <button onClick={() => setSubMode('swap')} className={`flex-1 py-2 rounded text-[8px] font-bold uppercase ${subMode === 'swap' ? 'bg-white/10 text-white' : 'text-gray-500'}`}>Face-Swap</button>
                  </div>
                  
                  {subMode === 'generate' ? (
                    <>
                      <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/5">
                        <label className="text-[9px] text-rose-500 uppercase font-black">Prompt Architect (Helper)</label>
                        <div className="grid grid-cols-2 gap-2">
                           <select onChange={(e) => setPrompt(prev => prev + " " + e.target.value)} className="admin-input !py-2 text-[10px]">
                              <option disabled selected>Stylistyka</option>
                              <option value="Candid lifestyle portrait, natural look">Lifestyle</option>
                              <option value="Professional studio photography, high-end">Studio</option>
                              <option value="Cinematic moody aesthetic, atmospheric">Kinowy</option>
                              <option value="90s vintage film aesthetic, grainy">Vintage</option>
                           </select>
                           <select onChange={(e) => setPrompt(prev => prev + " " + e.target.value)} className="admin-input !py-2 text-[10px]">
                              <option disabled selected>Oświetlenie</option>
                              <option value="softbox lighting, neutral colors">Softbox (Studio)</option>
                              <option value="neon rim lighting, dramatic shadows">Neon Noir</option>
                              <option value="golden hour natural sun light">Golden Hour</option>
                              <option value="harsh flash photography, high contrast">Hard Flash</option>
                           </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                           <select onChange={(e) => setPrompt(prev => prev + " " + e.target.value)} className="admin-input !py-2 text-[10px]">
                              <option disabled selected>Aparat</option>
                              <option value="Shot on iPhone 15 Pro, mobile photo">iPhone</option>
                              <option value="Shot on Sony A7R IV, 85mm lens, f/1.8">Pro DSLR</option>
                              <option value="35mm portra 400 film, cinematic grain">35mm Film</option>
                              <option value="GoPro action camera perspective">Action Cam</option>
                           </select>
                           <button onClick={() => setPrompt(prev => prev + ", skin pores, fine details, hyper-realistic, subsurface scattering, tiny skin imperfections")} className="bg-white/10 hover:bg-rose-600 rounded-lg text-[8px] font-bold uppercase py-2 transition-all">
                              Dodaj Realizm PRO
                           </button>
                        </div>
                        <button onClick={() => setPrompt('')} className="w-full text-[8px] text-gray-500 uppercase font-black hover:text-white transition-all">Wyczyść Prompt</button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] text-gray-500 uppercase font-black">Finalny Prompt Maszynowy</label>
                        <textarea 
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="admin-input h-32 resize-none" 
                          placeholder="Opisz modelkę (np. blondynka, 175cm, lubi sport)..." 
                        />
                      </div>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-8 border-2 border-dashed border-white/5 rounded-xl text-center hover:border-rose-600 transition-colors uppercase text-[8px] font-black text-gray-500">Wgraj Bazę</div>
                      <div className="p-8 border-2 border-dashed border-white/5 rounded-xl text-center hover:border-rose-600 transition-colors uppercase text-[8px] font-black text-gray-500">Wgraj Twarz</div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* AUDIO MODE */}
              {activeMode === 'audio' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                   <div className="space-y-4">
                      <div className="p-6 bg-rose-600/5 border border-rose-600/20 rounded-xl">
                        <label className="text-[9px] text-rose-500 uppercase font-black mb-4 block">Klonowanie Głosu</label>
                        <div className="p-8 border-2 border-dashed border-rose-600/20 rounded-lg text-center text-[8px] text-rose-300 font-bold uppercase cursor-pointer hover:bg-rose-600/10 transition-all">
                          Wgraj próbkę głosu (MP3/WAV)
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] text-gray-500 uppercase font-black">Tekst do przeczytania</label>
                        <textarea className="admin-input h-40" placeholder="Wpisz co modelka ma powiedzieć fanowi..." />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] text-gray-500 uppercase font-black">Emocje</label>
                        <select className="admin-input">
                          <option>Zmysłowy szept</option>
                          <option>Energiczny / Radosny</option>
                          <option>Dominujący / Oschły</option>
                        </select>
                      </div>
                   </div>
                </motion.div>
              )}

              {/* SCRIPT MODE */}
              {activeMode === 'script' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] text-gray-500 uppercase font-black">Typ Treści</label>
                      <select className="admin-input" value={scriptType} onChange={(e) => setScriptType(e.target.value)}>
                        <option value="ppv">Wiadomość Masowa (PPV)</option>
                        <option value="story">Historia / Blog</option>
                        <option value="chat">Scenariusz Czatowania</option>
                        <option value="video">Scenariusz Wideo</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] text-gray-500 uppercase font-black">Ton & Styl</label>
                      <select className="admin-input" value={scriptTone} onChange={(e) => setScriptTone(e.target.value)}>
                        <option value="sensual">Sensualny / Flirciarski</option>
                        <option value="fetish">Tematyka Fetyszowa</option>
                        <option value="casual">Koleżeński / Naturalny</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] text-gray-500 uppercase font-black">Dodatkowe Wytyczne</label>
                      <textarea className="admin-input h-32" placeholder="O czym ma być tekst? Np. 'Dziewczyna w wannie', 'Fetysz stóp'..." />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PRODUCTION MODE */}
              {activeMode === 'production' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <div className="p-8 border-2 border-dashed border-white/5 rounded-xl text-center hover:border-rose-600 transition-all cursor-pointer bg-white/[0.02] group">
                    <Zap className="w-8 h-8 text-gray-700 mx-auto mb-4 group-hover:text-rose-600" />
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Wgraj film/zdjęcie do procesowania</p>
                  </div>
                  <div className="bg-[#111] p-4 rounded-xl space-y-4">
                    <h4 className="text-[9px] font-black uppercase text-rose-500">Opcje Automatyzacji</h4>
                    <label className="flex items-center gap-3 text-[10px] text-gray-300 cursor-pointer">
                      <input type="checkbox" className="accent-rose-600" defaultChecked /> Dodaj Watermark Studia
                    </label>
                    <label className="flex items-center gap-3 text-[10px] text-gray-300 cursor-pointer">
                      <input type="checkbox" className="accent-rose-600" /> Wytnij Teaser (15s)
                    </label>
                    <label className="flex items-center gap-3 text-[10px] text-gray-300 cursor-pointer">
                      <input type="checkbox" className="accent-rose-600" defaultChecked /> Wyczyść Metadane (EXIF)
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-8">
              <button 
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-4 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-800 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center gap-3"
              >
                {isProcessing ? 'Inicjacja Procesu...' : 'Uruchom Generator'}
                {!isProcessing && <Zap className="w-3 h-3 fill-white" />}
              </button>
            </div>
          </aside>

          {/* MIDDLE & RIGHT: PREVIEW & ASSETS (Combined) */}
          <main className="col-span-12 lg:col-span-9 bg-[#050505] p-12 overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Visual Preview */}
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <ImageIcon className="w-4 h-4" /> Podgląd Rezultatu
                   </h3>
                   <div className="aspect-[3/4] bg-[#0a0a0a] border border-white/5 rounded-3xl flex items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(225,29,72,0.05),transparent_70%)]" />
                      {isProcessing ? (
                        <div className="text-center space-y-4">
                          <div className="w-12 h-12 border-2 border-rose-600 border-t-transparent rounded-full animate-spin mx-auto" />
                          <p className="text-[8px] font-bold text-rose-600 uppercase tracking-[0.3em]">Latent Space Cooking...</p>
                        </div>
                      ) : result?.resultUrl && activeMode === 'visual' ? (
                        <img src={result.resultUrl} className="w-full h-full object-cover animate-fadeIn" alt="AI Generated" />
                      ) : (
                        <p className="text-[10px] text-gray-700 uppercase tracking-widest">
                          {result?.message || "Oczekiwanie na generację"}
                        </p>
                      )}
                   </div>
                </div>

                {/* Script / Audio / Status Details */}
                <div className="space-y-4 font-mono">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                     <Layers className="w-4 h-4" /> Dane Operacyjne
                   </h3>
                   <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 h-full min-h-[400px]">
                      <div className="bg-black/40 p-6 rounded-xl border border-white/5 text-[11px] text-rose-500/80 leading-relaxed min-h-[150px]">
                        &gt; System Ready.<br/>
                        &gt; Mode: {activeMode.toUpperCase()}<br/>
                        {result && result.data && activeMode === 'bio' && (
                          <div className="mt-4 space-y-6 text-white animate-fadeIn">
                             <div className="p-4 bg-rose-600/10 rounded-xl border-l-4 border-rose-600">
                               <span className="text-[8px] text-rose-500 font-bold block mb-1 uppercase tracking-tighter">Hook / Intro</span>
                               <div className="italic text-sm">"{result.data.intro}"</div>
                             </div>
                             
                             <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                               <span className="text-[8px] text-gray-500 font-bold block mb-2 uppercase">Profilowy Opis (Bio)</span>
                               <div className="text-[11px] leading-relaxed text-gray-300">{result.data.bio}</div>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                               <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                 <span className="text-[8px] text-gray-500 font-bold block mb-2 uppercase">Wymiary</span>
                                 <div className="grid grid-cols-1 gap-1">
                                   {Object.entries(result.data.measurements || {}).map(([k, v]) => (
                                     <div key={k} className="flex justify-between text-[10px]">
                                       <span className="text-gray-500">{k}:</span>
                                       <span className="font-mono">{v as string}</span>
                                     </div>
                                   ))}
                                 </div>
                               </div>
                               <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                 <span className="text-[8px] text-gray-500 font-bold block mb-2 uppercase">Tagi / Cechy</span>
                                 <div className="flex flex-wrap gap-1">
                                   {((result.data.characteristics as string[]) || []).map((tag) => (
                                     <span key={tag} className="text-[8px] px-2 py-1 bg-rose-600/20 text-rose-500 rounded uppercase font-bold">{tag}</span>
                                   ))}
                                 </div>
                               </div>
                             </div>
                          </div>
                        )}

                        {result && !result.data && (
                          <div className="mt-4 text-white animate-fadeIn">
                             {result.text && <div className="p-4 bg-white/5 rounded border-l-2 border-rose-600 italic">"{result.text}"</div>}
                             {result.files && result.files.map((f: string) => <div key={f} className="text-green-500">&gt; File processed: {f}</div>)}
                             {result.message && <div className="text-gray-500 mt-2">// {result.message}</div>}
                          </div>
                        )}
                        {!result && !isProcessing && <div className="text-gray-600 italic mt-4">// Moduł gotowy do procesowania danych.</div>}
                        {isProcessing && <div className="text-rose-600 animate-pulse mt-4">&gt; Processing...</div>}
                      </div>
                   </div>
                </div>
              </div>

              {/* RECENT ASSETS SECTION */}
              <div className="space-y-6 pt-12 border-t border-white/5">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ostatnio Wygenerowane Zasoby</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="aspect-square bg-[#0a0a0a] border border-white/5 rounded-xl hover:border-rose-600/50 transition-all cursor-pointer group relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
                      <div className="absolute bottom-2 left-2 text-[7px] font-bold text-white/50 group-hover:text-rose-600">ASSET_{i}.JPG</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </main>
        </div>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(225,29,72,0.4); }
        
        .admin-input {
          @apply w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-[11px] text-white font-light focus:border-rose-600 focus:outline-none transition-all;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AICreatorWorkshop;
