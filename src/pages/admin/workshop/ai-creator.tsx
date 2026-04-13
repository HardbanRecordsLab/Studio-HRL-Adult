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
  Music,
  ChevronRight,
  MoreVertical,
  Terminal,
  Cpu,
  ShieldCheck,
  Globe
} from 'lucide-react';
import Navigation from '@/components/common/Navigation';
import { cn } from '@/utils/utils';

interface AICreatorWorkshopProps {
  embedded?: boolean;
  token?: string;
}

const AICreatorWorkshop: React.FC<AICreatorWorkshopProps> = ({ embedded = false, token }) => {
  const [activeMode, setActiveMode] = useState<'visual' | 'audio' | 'script' | 'production' | 'bio'>('visual');
  const [subMode, setSubMode] = useState<'generate' | 'swap'>('generate');
  const [isProcessing, setIsProcessing] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isEmbedded, setIsEmbedded] = useState(embedded);
  const [scriptType, setScriptType] = useState('ppv');
  const [scriptTone, setScriptTone] = useState('sensual');
  const [result, setResult] = useState<any>(null);

  const handleProcess = async () => {
    setIsProcessing(true);
    setResult(null);
    try {
      const response = await fetch('/api/admin/workshop/process', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          mode: activeMode, 
          payload: { type: scriptType, tone: scriptTone, prompt } 
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('AI Processing error:', error);
      setResult({ message: "Network synchronization failed. Retry in 5s." });
    }
    setIsProcessing(false);
  };

  const tabs = [
    { id: 'visual' as const, name: 'Obraz & Deepfake', icon: Sparkles, desc: 'Generacja UHD & Swap' },
    { id: 'audio' as const, name: 'Głos & Audio', icon: Music, desc: 'Klonowanie głosu AI' },
    { id: 'script' as const, name: 'Scenariusz & Czat', icon: Type, desc: 'Pisarz PPV & Stories' },
    { id: 'bio' as const, name: 'Bio Architect', icon: UserPlus, desc: 'Profile Optimization' },
    { id: 'production' as const, name: 'Produkcja (Pipeline)', icon: Zap, desc: 'Post-process & Watermark' },
  ];

  useEffect(() => {
    if (window.self !== window.top) setIsEmbedded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-georgia selection:bg-[#c9a84c]/30 overflow-hidden">
      <Head>
        <title>HRL AI WORKSHOP | Industrial Production</title>
      </Head>

      {!isEmbedded && <Navigation />}

      <main className={cn("h-screen flex flex-col", isEmbedded ? "pt-0" : "pt-24")}>
        {/* Modern Lab Header */}
        <div className="px-8 lg:px-12 flex justify-between items-end mb-8 border-b border-white/5 pb-8 bg-black/40">
          <header className="border-l-4 border-[#c9a84c] pl-8">
            <h1 className="text-4xl font-bold tracking-tighter italic uppercase text-glow">
              AI <span className="text-[#c9a84c]">WORKSHOP</span>
            </h1>
            <p className="text-gray-500 text-[9px] tracking-[4px] uppercase font-bold mt-1">Industrial Grade Creative Laboratory // v4.2.0</p>
          </header>

          {/* MAIN TABS SWITCHER */}
          <div className="flex bg-[#0d0d0d] border border-white/5 p-1.5 rounded-[24px] shadow-2xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-8 py-3 rounded-[20px] transition-all group",
                  activeMode === tab.id ? "bg-[#c9a84c] text-black shadow-xl shadow-[#c9a84c]/20" : "text-gray-600 hover:text-white"
                )}
              >
                <tab.icon className={cn("w-5 h-5 transition-transform", activeMode === tab.id ? "scale-110" : "group-hover:scale-110")} />
                <span className="text-[8px] font-black uppercase tracking-widest">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
          
          {/* LEFT: COMMAND CONSOLE */}
          <aside className="col-span-12 lg:col-span-3 bg-[#080808] border-r border-white/5 p-10 flex flex-col overflow-y-auto custom-scrollbar shadow-2xl z-10">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                <Cpu className="w-5 h-5 text-[#c9a84c]" />
                <h3 className="text-[10px] font-black uppercase tracking-[4px] text-white">Console Input</h3>
            </div>

            <AnimatePresence mode="wait">
              {activeMode === 'visual' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                  <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                    <button onClick={() => setSubMode('generate')} className={cn("flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all", subMode === 'generate' ? "bg-white/5 text-[#c9a84c] border border-[#c9a84c]/20" : "text-gray-600")}>Generator</button>
                    <button onClick={() => setSubMode('swap')} className={cn("flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all", subMode === 'swap' ? "bg-white/5 text-[#c9a84c] border border-[#c9a84c]/20" : "text-gray-600")}>Face-Swap</button>
                  </div>
                  
                  {subMode === 'generate' ? (
                    <div className="space-y-6">
                      <div className="space-y-4 bg-white/[0.02] p-6 rounded-3xl border border-white/5">
                        <label className="text-[9px] text-[#c9a84c] uppercase font-black tracking-widest block border-b border-[#c9a84c]/20 pb-2 mb-4 cursor-default">Style Presets</label>
                        <div className="grid grid-cols-1 gap-3">
                           <select onChange={(e) => setPrompt(prev => prev + ", " + e.target.value)} className="ai-input group">
                              <option disabled selected>Aesthetic Context</option>
                              <option value="Candid lifestyle portrait, natural morning light">Lifestyle / Home</option>
                              <option value="Luxury penthouse fashion photoshoot, 8k">High-End Luxury</option>
                              <option value="Dark moody cinematic noir, neon highlights">Moody Noir</option>
                              <option value="90s high-flash polaroid aesthetic, grainy">Y2K Retro</option>
                           </select>
                           <select onChange={(e) => setPrompt(prev => prev + ", " + e.target.value)} className="ai-input">
                              <option disabled selected>Optics & Lighting</option>
                              <option value="85mm f/1.8 lens, shallow depth of field">Portrait 85mm</option>
                              <option value="Wide angle 24mm, architectural perspective">Wide 24mm</option>
                              <option value="Dramatic rim lighting, rim light, volumetric fog">God Rays / Rim</option>
                              <option value="Softbox butterfly lighting, beauty dish">Pro Beauty Dish</option>
                           </select>
                        </div>
                        <button onClick={() => setPrompt(prev => prev + ", raw skin texture, hyper-realistic, 8k resolution, masterpieces, detailed skin pores, tiny imperfections, realistic eyes")} className="w-full py-3 bg-[#c9a84c]/5 text-[#c9a84c] rounded-xl text-[9px] font-black uppercase tracking-widest mt-2 hover:bg-[#c9a84c] hover:text-black transition-all border border-[#c9a84c]/20">Inject Realism Pro</button>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest block ml-2">Engine Script (Prompt)</label>
                        <textarea 
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          className="ai-input-base h-40" 
                          placeholder="Zdefiniuj wizję (np. modelka w Dubaju, złoty zachód słońca)..." 
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                       <div className="p-10 border-2 border-dashed border-white/5 rounded-3xl text-center hover:border-[#c9a84c]/40 transition-all cursor-pointer bg-white/[0.01] group">
                          <Camera className="w-8 h-8 text-gray-700 mx-auto mb-4 group-hover:text-[#c9a84c] group-hover:scale-110 transition-all" />
                          <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Base Image Upload</p>
                       </div>
                       <div className="p-10 border-2 border-dashed border-[#c9a84c]/20 rounded-3xl text-center hover:border-[#c9a84c]/50 transition-all cursor-pointer bg-[#c9a84c]/5 group">
                          <UserPlus className="w-8 h-8 text-[#c9a84c] mx-auto mb-4 group-hover:scale-110 transition-all" />
                          <p className="text-[9px] font-black text-[#c9a84c] uppercase tracking-widest">Target Face (HRL Talent)</p>
                       </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Other modes follow same aesthetic... */}
              {activeMode === 'script' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-8">
                   <div className="space-y-6">
                      <div className="space-y-3">
                         <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest block ml-2">Script Category</label>
                         <select className="ai-input" value={scriptType} onChange={(e) => setScriptType(e.target.value)}>
                            <option value="ppv">Mass Message (PPV)</option>
                            <option value="story">Content Narrative (Story)</option>
                            <option value="chat">Sexting Flows</option>
                            <option value="video">VOD Scripting</option>
                         </select>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[9px] text-gray-600 uppercase font-black tracking-widest block ml-2">Aesthetic Tone</label>
                         <select className="ai-input" value={scriptTone} onChange={(e) => setScriptTone(e.target.value)}>
                            <option value="sensual">Sensuality High</option>
                            <option value="fetish">Fetish & Niche</option>
                            <option value="casual">Natural / Girlfriend</option>
                            <option value="dominant">Dominance / Rough</option>
                         </select>
                      </div>
                      <textarea className="ai-input-base h-48" placeholder="O czym ma traktować skrypt? Np. podziwianie bielizny, rozmowa o marzeniach..." />
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-auto pt-10">
              <button 
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full py-5 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[11px] font-black uppercase tracking-[5px] rounded-2xl transition-all shadow-[0_0_30px_rgba(201,168,76,0.2)] flex items-center justify-center gap-4 group"
              >
                {isProcessing ? 'SYNCHRONIZING...' : 'START GENERATION'}
                {!isProcessing && <Zap className="w-4 h-4 fill-black group-hover:animate-pulse" />}
              </button>
            </div>
          </aside>

          {/* RIGHT: PREVIEW & ENGINE STATUS */}
          <main className="col-span-12 lg:col-span-9 bg-[#050505] p-12 overflow-y-auto custom-scrollbar relative">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Globe className="w-96 h-96 text-white" />
            </div>

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                
                {/* Visual Viewport */}
                <div className="space-y-6">
                   <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-full border border-white/5">
                      <h3 className="text-[8px] font-black uppercase tracking-[4px] text-[#c9a84c] flex items-center gap-3 ml-4">
                        <Terminal className="w-4 h-4" /> Final Viewport
                      </h3>
                      <div className="flex gap-2 mr-2">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                   </div>
                   <div className="aspect-[3/4] bg-[#0d0d0d] border border-white/10 rounded-[48px] flex items-center justify-center relative shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden group">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.08),transparent_70%)]" />
                      {isProcessing ? (
                        <div className="text-center space-y-6">
                          <div className="w-16 h-16 border-4 border-[#c9a84c] border-t-transparent rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(201,168,76,0.3)]" />
                          <p className="text-[10px] font-bold text-[#c9a84c] uppercase tracking-[0.5em] animate-pulse">Processing Nodes...</p>
                        </div>
                      ) : result?.resultUrl && activeMode === 'visual' ? (
                        <motion.img initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} src={result.resultUrl} className="w-full h-full object-cover" alt="AI Production" />
                      ) : (
                        <div className="text-center space-y-4 opacity-20">
                           <ImageIcon className="w-20 h-20 text-white mx-auto mb-6" />
                           <p className="text-[10px] text-gray-500 uppercase tracking-[6px] font-black">Waiting for Data Stream</p>
                        </div>
                      )}
                      
                      {/* Action Overlays */}
                      {!isProcessing && result?.resultUrl && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                           <button className="px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#c9a84c] hover:text-black transition-all">Download UHD</button>
                           <button className="px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest hover:text-[#c9a84c] transition-all"><RefreshCw className="w-4 h-4" /></button>
                        </div>
                      )}
                   </div>
                </div>

                {/* Data Logs & Analysis */}
                <div className="space-y-6">
                   <div className="flex justify-between items-center bg-white/[0.02] p-4 rounded-full border border-white/5">
                      <h3 className="text-[8px] font-black uppercase tracking-[4px] text-gray-500 flex items-center gap-3 ml-4">
                        <Cpu className="w-4 h-4 text-[#c9a84c]" /> Neural Analysis
                      </h3>
                   </div>
                   <div className="bg-[#000] border border-white/5 rounded-[48px] p-10 h-full min-h-[500px] shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                         <ShieldCheck className="w-64 h-64 text-white" />
                      </div>
                      
                      <div className="space-y-8 relative z-10">
                         {/* Terminal Style Logs */}
                         <div className="bg-[#0d0d0d] rounded-2xl p-6 border border-white/5 font-mono text-[10px] leading-relaxed">
                            <p className="text-[#c9a84c] mb-2 font-black uppercase tracking-widest border-b border-white/5 pb-2">HRL AI CORE v.4.0_LOGS</p>
                            <p className="text-gray-600">&gt; Initialize session: OK</p>
                            <p className="text-gray-600">&gt; Mode: {activeMode.toUpperCase()}</p>
                            <p className="text-gray-600">&gt; Encryption: AES-256 Enabled</p>
                            
                            {result?.data && (
                               <div className="mt-6 space-y-6 animate-fadeIn font-sans">
                                  <div className="p-5 bg-[#c9a84c]/5 border border-[#c9a84c]/20 rounded-2xl">
                                     <p className="text-[8px] font-black text-[#c9a84c] uppercase tracking-widest mb-2">Primary Hook</p>
                                     <p className="text-white text-sm italic font-georgia italic">"{result.data.intro}"</p>
                                  </div>
                                  <div className="space-y-2">
                                     <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Optimized Description</p>
                                     <p className="text-[11px] text-gray-400 leading-relaxed font-bold uppercase tracking-tight">{result.data.bio}</p>
                                  </div>
                               </div>
                            )}

                            {!result && !isProcessing && (
                               <div className="mt-10 py-20 text-center opacity-30 animate-pulse">
                                  <Sliders className="w-12 h-12 text-white mx-auto mb-4" />
                                  <p className="uppercase tracking-[4px]">Awaiting Instructions</p>
                               </div>
                            )}
                         </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Archive Bar */}
              <div className="pt-20 border-t border-white/5">
                 <div className="flex justify-between items-center mb-10 px-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[5px] text-gray-600">Generated Asset Archive</h3>
                    <button className="text-[9px] font-black text-[#c9a84c] border-b border-[#c9a84c]/40 hover:text-white transition-all uppercase tracking-widest">Wszystkie Zasoby</button>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    {[1,2,3,4,5,6].map(i => (
                      <div key={i} className="aspect-square bg-[#0d0d0d] border border-white/5 rounded-3xl hover:border-[#c9a84c]/30 hover:shadow-2xl hover:shadow-[#c9a84c]/5 transition-all cursor-pointer group relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                            <Download className="w-6 h-6 text-[#c9a84c]" />
                         </div>
                         <div className="absolute bottom-4 left-4 right-4">
                            <div className="h-0.5 w-0 group-hover:w-full bg-[#c9a84c] transition-all duration-300" />
                            <p className="text-[7px] font-black text-white ml-1 mt-2 tracking-widest uppercase truncate opacity-40 group-hover:opacity-100">PROD_A0{i}.PNG</p>
                         </div>
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c9a84c; }
        .ai-input {
          @apply w-full bg-[#111] border border-white/10 rounded-xl px-5 py-4 text-[10px] text-white font-bold uppercase tracking-widest focus:border-[#c9a84c]/40 focus:outline-none transition-all cursor-pointer;
        }
        .ai-input-base {
          @apply w-full bg-[#111] border border-white/10 rounded-2xl px-6 py-5 text-[11px] text-[#c9a84c] font-mono leading-relaxed focus:border-[#c9a84c] focus:outline-none transition-all placeholder:text-gray-800;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .text-glow { text-shadow: 0 0 20px rgba(201,168,76,0.2); }
      `}</style>
    </div>
  );
};

export default AICreatorWorkshop;
