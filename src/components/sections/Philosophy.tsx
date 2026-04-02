import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-24 px-[6%] bg-dark2 overflow-hidden" id="philosophy">
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-3 text-gold text-[8.5px] font-semibold tracking-[0.42em] uppercase">
          <div className="w-5 h-px bg-gold" />
          Nasza Filozofia
        </div>
        <h2 className="text-white font-bebas text-5xl md:text-7xl tracking-tight leading-none uppercase">
          Sztuka spotyka <span className="text-gold italic">profesjonalizm</span>
        </h2>
        <div className="flex items-center gap-3 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_12px_rgba(155,31,53,0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="text-dim font-montserrat text-sm md:text-base leading-loose max-w-3xl">
          Wierzymy, że tworzenie treści dla dorosłych to forma sztuki wymagająca zarówno artystycznej wizji, jak i biznesowego podejścia. 
          Łączymy estetykę z efektywnością, zapewniając naszym partnerkom nie tylko narzędzia, ale także inspirację do rozwoju.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-video bg-gradient-to-br from-dark3 to-dark4 border border-crimson/20 flex flex-col items-center justify-center group cursor-pointer overflow-hidden">
          <div className="w-12 h-12 border-2 border-gold/40 rounded-full flex items-center justify-center text-gold opacity-40 group-hover:opacity-70 transition-opacity pl-1">
            ▶
          </div>
          <span className="mt-4 text-[8.5px] tracking-[0.2em] uppercase text-gold/40">Obejrzyj Wideo</span>
          <span className="absolute bottom-2 right-3 text-[10px] font-bebas text-crimson/40">Studio Tour</span>
        </div>
        
        <div className="space-y-8">
          <blockquote className="text-white font-bebas text-3xl md:text-4xl italic tracking-wide leading-tight border-l-2 border-gold pl-6">
            "Każda sesja to opowieść, każda partnerka to artystka"
          </blockquote>
          <p className="text-dim font-montserrat text-sm leading-relaxed">
            Nasze podejście opiera się na trzech filarach: szacunku dla twórcy, profesjonalizmie w realizacji i transparentności we współpracy. 
            Tworzymy środowisko, w którym kreatywność spotyka się z bezpieczeństwem i sukcesem finansowym.
          </p>
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
            <div className="w-1.5 h-1.5 bg-crimson rotate-45" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
          </div>
          <p className="text-dim font-montserrat text-sm leading-relaxed">
            Dzięki naszemu doświadczeniu w branży rozumiemy, że sukces w świecie treści dla dorosłych wymaga nie tylko talentu, 
            ale także strategicznego zarządzania karierą i odpowiedniego wsparcia technicznego.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
