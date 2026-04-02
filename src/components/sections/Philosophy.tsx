import React from 'react';

const Philosophy: React.FC = () => {
  return (
    <section className="py-24 px-[7%] bg-dark-2 overflow-hidden" id="philosophy">
      <div className="max-w-7xl mx-auto">
        {/* Tag */}
        <div className="section-tag">Nasza Filozofia</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="h2-premium">
              The Art of <br />
              <span className="italic bg-gold-gradient bg-clip-text text-transparent">Adult Entertainment</span>
            </h2>
            
            {/* Divider Line */}
            <div className="flex items-center gap-4 py-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/40" />
              <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_12px_rgba(155,31,53,0.5)]" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/40" />
            </div>

            <p className="text-dim text-sm md:text-base leading-loose font-light">
              Wierzymy, że tworzenie treści dla dorosłych to forma sztuki wymagająca zarówno artystycznej wizji, jak i biznesowego profesjonalizmu. 
              Łączymy estetykę z efektywnością, zapewniając naszym partnerkom nie tylko narzędzia, ale także inspirację do ciągłego rozwoju.
            </p>

            <blockquote className="border-l-2 border-gold/40 pl-6 py-2">
              <p className="font-cormorant text-2xl md:text-3xl italic text-white/90 leading-tight">
                "Każda sesja to unikalna opowieść, każda partnerka to niezależna artystka"
              </p>
            </blockquote>

            <p className="text-dim text-sm leading-relaxed font-light">
              Nasze podejście opiera się na trzech filarach: bezwzględnym szacunku, najwyższym profesjonalizmie i pełnej transparentności. 
              Tworzymy bezpieczne środowisko, w którym kreatywność spotyka się z sukcesem finansowym.
            </p>
          </div>

          {/* Image/Video Placeholder with Premium Frame */}
          <div className="relative group cursor-none">
            <div className="aspect-[4/5] bg-dark-3 border border-gold/10 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 group-hover:scale-105 transition-transform duration-700">
                <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center text-gold/40 pl-1 group-hover:border-gold group-hover:text-gold transition-colors">
                  ▶
                </div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-gold/30 group-hover:text-gold/60 transition-colors">
                  Obejrzyj Studio Tour
                </span>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/20" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/20" />
            </div>
            
            {/* Floating Label */}
            <div className="absolute -bottom-6 -left-6 bg-dark-4 border border-gold/10 p-6 shadow-2xl hidden md:block">
              <span className="font-cormorant text-xl text-gold italic">Estetyka i Jakość 4K</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
