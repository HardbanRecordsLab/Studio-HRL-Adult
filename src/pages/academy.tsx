import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';
import { getCloudinaryVideoUrl } from '@/utils/cloudinary';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfn5qgvpy';

// ─── MEDIA ───────────────────────────────────────────────────────────────────
interface VideoResource {
  id: string;
  title: string;
  dur: string;
  level: string;
  desc: string;
  cloudinaryId: string;
  localPath: string;
  thumb: string | null;
}

interface PodcastResource {
  id: string;
  title: string;
  dur: string;
  desc: string;
  file: string;
  ep: string;
}

interface LegalDocResource {
  id: string;
  title: string;
  type: string;
  size: string;
  desc: string;
  file: string;
  icon: string;
  cat: string;
}

const PLATFORMS = [
  { cat: 'live', name: 'Chaturbate', ico: '🔴', badge: 'CAM GIANT', desc: 'Największa na świecie platforma live cam, będąca absolutnym fundamentem dla każdego twórcy. Działa w systemie tokenowym, gdzie 1 token to równowartość $0.05. Chaturbate oferuje niespotykany nigdzie indziej ruch organiczny, pozwalający na szybkie zbudowanie bazy lojalnych fanów bez nakładów na marketing zewnętrzny. System Tip Goals, Ticket Shows oraz zaawansowane boty automatyzujące interakcje sprawiają, że jest to maszyna do zarabiania pieniędzy. Średnie stawki w pokojach prywatnych oscylują w granicach 30-450 zł za minutę, a najlepsze modelki i pary regularnie osiągają pięciocyfrowe zarobki miesięczne.', features: ['1 token = $0.05', 'Private Shows 30-450 zł/min', 'Globalny traffic #1', 'Apps & Bots automation'] },
  { cat: 'live', name: 'Stripchat', ico: '🎭', badge: 'VR LEADER', desc: 'Innowacyjna platforma, która zrewolucjonizowała rynek dzięki technologii VR i 360°. Stripchat stawia na wysoką jakość transmisji i nowoczesne narzędzia monetyzacji, takie jak Fan Club, który zapewnia twórcom stały, miesięczny przychód niezależnie od czasu spędzonego na transmisji live. Platforma oferuje jedne z najwyższych prowizji w branży (do 80%) i jest w pełni zintegrowana z interaktywnymi zabawkami Lovense. Dzięki silnemu systemowi promowania nowych kont, Stripchat jest idealnym miejscem na start dla par szukających technologicznej przewagi i nowoczesnego audytorium.', features: ['VR & 360° shows', 'Fan Club (stały przychód)', 'Do 80% prowizji', 'Lovense integration'] },
  { cat: 'live', name: 'LiveJasmin', ico: '💎', badge: 'ELITE', desc: 'Najbardziej prestiżowa i ekskluzywna platforma cammingowa na świecie, dedykowana dla klientów typu High-End i VIP. Tutaj liczy się przede wszystkim jakość – wymagany jest profesjonalny sprzęt (4K), nienaganna estetyka i wysoka kultura osobista. LiveJasmin oferuje najwyższe stawki za minutę w prywatnych pokojach, przyciągając użytkowników gotowych płacić premium za luksusowe doświadczenie. Każda modelka i para otrzymuje wsparcie dedykowanego managera, który pomaga w optymalizacji profilu i strategii sprzedaży. To platforma dla tych, którzy chcą budować markę luksusową i zarabiać na najbardziej majętnych fanach.', features: ['Klienci Premium/VIP', 'Najwyższe stawki/min', 'Dedykowany manager', '4K wymagane'] },
  { cat: 'live', name: 'BongaCams', ico: '🌟', badge: 'EU FOCUS', desc: 'Platforma o ogromnym zasięgu, szczególnie silna na rynkach europejskich, w tym w Polsce, Niemczech i Czechach. Dzięki lokalnemu trafficowi, polskie pary i modelki mają tu szansę stać się prawdziwymi gwiazdami. BongaCams słynie z prostoty obsługi, szybkich i regularnych płatności oraz licznych konkursów z wysokimi nagrodami pieniężnymi dla twórców. System Gold Shows i rozbudowane Tip Menu pozwalają na skuteczną monetyzację każdego streamu. Jest to doskonały wybór dla osób, które chcą budować popularność w swoim regionie i cenią sobie stabilność oraz przejrzyste zasady współpracy.', features: ['Silna obecność EU', 'Szybkie płatności', 'Gold Shows & Tip Menu', 'Konkursy z nagrodami'] },
  { cat: 'live', name: 'MyFreeCams', ico: '🎪', badge: 'CLASSIC', desc: 'Jedna z najstarszych i najbardziej kultowych platform w branży, posiadająca niezwykle lojalną społeczność użytkowników, w tym tzw. "Whales" – fanów wydających ogromne sumy na swoje ulubione gwiazdy. MyFreeCams opiera się na unikalnym systemie rankingowym Camscore oraz konkursach takich jak Miss MFC. Platforma oferuje stabilne zarobki długofalowe dla twórców, którzy potrafią budować głębokie relacje z widzami. System MFC Share pozwala na łatwą integrację z mediami społecznościowymi, co wspiera budowanie marki osobistej. To miejsce dla cierpliwych i ambitnych twórców, którzy stawiają na jakość i lojalność.', features: ['Lojalna baza fanów', 'System Gold Show', 'MFC Share social', 'Stabilne długofalowo'] },
  { cat: 'live', name: 'Cam4', ico: '🎨', badge: 'NEWBIE', desc: 'Niezwykle przyjazna platforma dla osób stawiających swoje pierwsze kroki w świecie live cam. Cam4 oferuje intuicyjny interfejs, niskie wymagania techniczne na starcie oraz doskonałą aplikację mobilną na iOS i Androida, co pozwala na prowadzenie transmisji z dowolnego miejsca. Mimo swojej prostoty, platforma generuje ogromny globalny ruch, szczególnie z USA i Europy Zachodniej. Cotygodniowe wypłaty już od $50 sprawiają, że jest to bezpieczny i motywujący wybór dla początkujących. Idealna przestrzeń do nauki interakcji z widzami i testowania różnych formatów show przed wejściem na bardziej wymagające rynki.', features: ['Easy start', 'Mobile app iOS/Android', 'Weekly payouts', 'Global traffic'] },
  { cat: 'live', name: 'Flirt4Free', ico: '🎯', badge: 'VIP CAM', desc: 'Platforma typu Premium, która stawia na jakość i profesjonalizm. Flirt4Free przyciąga dojrzałe audytorium i klientów VIP, którzy szukają wysokiej klasy rozrywki. Unikalne funkcje, takie jak Feature Shows (aukcje na czas transmisji), Party Chat czy Multi-User private, dają niespotykane na innych portalach możliwości monetyzacji. Wymagana jest tu wysoka jakość obrazu (HD/4K) i zaangażowanie w budowanie profesjonalnego wizerunku. Zarobki w prywatnych pokojach należą do jednych z najwyższych w branży, co czyni tę platformę idealną dla par z konkretną niszą fetyszową lub wysokim standardem produkcji.', features: ['VIP clients premium', 'HD/4K required', 'Feature Shows aukcyjne', 'Party Chat'] },
  { cat: 'live', name: 'Streamate', ico: '🌙', badge: 'US MARKET', desc: 'Potężny gracz na rynku amerykańskim i kanadyjskim, oferujący stabilną technologię i przewidywalne zarobki. Streamate różni się od platform tokenowych modelem płatności bezpośredniej za czas spędzony w private, co daje twórcom większą kontrolę nad godzinowymi stawkami. Platforma posiada dziesiątki niszowych kategorii, co pozwala na skuteczne dotarcie do specyficznych grup odbiorców. Dzięki silnemu marketingowi wewnętrznemu i lojalnej bazie użytkowników z Ameryki Północnej, jest to doskonałe miejsce dla par, które chcą zarabiać w dolarach i cenią sobie profesjonalizm oraz stabilność finansową.', features: ['US/Canada traffic', 'Multiple categories', 'Stable technology', 'Gold shows'] },
  { cat: 'sub', name: 'OnlyFans', ico: '🔥', badge: 'PREMIUM #1', desc: 'Niekwestionowany lider rynku subskrypcyjnego, który zrewolucjonizował sposób monetyzacji treści dla dorosłych. OnlyFans to główna arteria przychodów dla większości topowych twórców, pozwalająca na budowanie stabilnego, miesięcznego dochodu z subskrypcji. Kluczem do sukcesu są tu wiadomości PPV (Pay-Per-View), które mogą generować nawet 70-80% całkowitych zarobków. Platforma oferuje pełną kontrolę nad treściami, system Geo-blocking do ochrony prywatności oraz zaawansowane statystyki. To tutaj buduje się najbardziej intymną relację z fanami, przekuwając popularność z innych portali na realny i wysoki kapitał.', features: ['Subskrypcje $5-$50', 'PPV wiadomości', 'Tips & Live', 'Geo-blocking'] },
  { cat: 'sub', name: 'Fansly', ico: '💫', badge: 'GROWING', desc: 'Najgroźniejszy konkurent OnlyFans, który zdobył uznanie twórców dzięki bardziej elastycznym regulaminom i innowacyjnym funkcjom. Fansly posiada własny algorytm rekomendacji (FYP), który pomaga w organicznym odkrywaniu nowych twórców przez fanów – coś, czego brakuje na OnlyFans. System wielopoziomowych subskrypcji (Tiered Subscriptions) pozwala na różnicowanie cen i oferowanie unikalnych treści dla różnych grup fanów. Platforma wspiera również płatności kryptowalutami, co przyciąga nowoczesne audytorium. To idealne miejsce na dywersyfikację przychodów i budowanie bazy fanów w bardziej otwartym środowisku.', features: ['Discovery algorithm', 'Tiered subscriptions', 'PPV & Media bundles', 'Crypto payouts'] },
  { cat: 'sub', name: 'ManyVids', ico: '📹', badge: 'VOD PASSIVE', desc: 'Najlepsza platforma do budowania pasywnego dochodu ze sprzedaży nagranych materiałów wideo. ManyVids łączy w sobie sklep z klipami, platformę subskrypcyjną (MV Crush) oraz sklep z przedmiotami fizycznymi. Raz nagrany i wrzucony film może zarabiać na siebie przez lata dzięki silnemu pozycjonowaniu w Google i wewnętrznemu ruchowi platformy. Możliwość przyjmowania zamówień na filmy customowe oraz system napiwków sprawiają, że jest to kompleksowe narzędzie dla każdego twórcy. ManyVids to fundament "emerytury" w tej branży – miejsce, gdzie Twoje archiwum treści staje się Twoim największym aktywem.', features: ['Video Store pasywny', 'Custom Video Requests', 'MV Crush subs', 'SEO w Google'] },
  { cat: 'sub', name: 'JustForFans', ico: '🔞', badge: 'CREATOR FIRST', desc: 'Platforma subskrypcyjna stworzona przez twórców dla twórców, znana z najbardziej liberalnego regulaminu w branży. JustForFans pozwala na publikację dosłownie każdego rodzaju legalnych treści dla dorosłych, bez restrykcji charakterystycznych dla OnlyFans. Platforma oferuje aż 75% przychodów dla twórcy, co jest jednym z najwyższych wskaźników w branży. Dedykowany i zaangażowany support, system kolaboracji z innymi twórcami oraz możliwość sprzedaży własnych merchy sprawiają, że JFF to idealne miejsce dla twórców szukających platformy bez ograniczeń.', features: ['75% przychodów twórcy', 'Zero cenzury treści', 'Creator collabs', 'Merch store'] },
  { cat: 'sub', name: 'FanCentro', ico: '🌐', badge: 'MULTI-PLATFORM', desc: 'Unikalna platforma agregująca, która pozwala zarządzać wieloma platformami monetyzacji w jednym miejscu. FanCentro oferuje własną platformę subskrypcyjną, narzędzia do zarządzania Instagramem, Snapchatem i Twitterem Premium, oraz zaawansowany system funnelu sprzedażowego. Dedykowany manager sukcesu pomaga w opracowaniu strategii i optymalizacji zarobków. To idealne rozwiązanie dla twórców, którzy chcą skonsolidować swoje przychody z wielu kanałów w jednym, przejrzystym panelu.', features: ['Multi-platform hub', 'Social media mgmt', 'Dedicated success mgr', 'Sales funnel tools'] },
  { cat: 'sub', name: 'Patreon', ico: '🏛️', badge: 'CREATOR ECONOMY', desc: 'Największa platforma subskrypcyjna na świecie, nie dedykowana wyłącznie treściom adult, ale niezwykle potężna jako narzędzie budowania społeczności. Patreon pozwala na tworzenie wielu poziomów subskrypcji z różnymi benefitami, od newsletterów po ekskluzywne treści i dostęp do prywatnej społeczności. Jest to idealne miejsce do monetyzacji treści lifestyle, edukacji o branży, behind-the-scenes i contentu SFW przyciągającego szerszą publiczność.', features: ['Multi-tier subs', 'Community building', 'SFW & adult mix', 'Creator tools'] },
  { cat: 'tube', name: 'Pornhub', ico: '🖥️', badge: 'TUBE #1', desc: 'Największa platforma tube na świecie z ponad 130 milionami odwiedzin dziennie. Model Verified Amateurs pozwala twórcom na monetyzację przez system reklam i premium treści (Pornhub Premium). Służy jako potężny funnel generujący ruch na płatne platformy – link w bio przynosi tysiące kliknięć miesięcznie. Platforma posiada również własny program partnerski i możliwość sprzedaży klipów. Obecność na Pornhub to kluczowy element SEO w branży adult.', features: ['130M wizyt/dzień', 'Verified Amateurs', 'Traffic funnel #1', 'Premium content'] },
  { cat: 'tube', name: 'xVideos', ico: '🖥️', badge: 'GLOBAL REACH', desc: 'Jedna z największych platform tube na świecie, szczególnie popularna w Europie, Ameryce Łacińskiej i Azji. Model Red Girls pozwala na monetyzację treści przez reklamy i subskrypcje premium. xVideos oferuje jeden z najlepszych systemów SEO w branży – dobrze zoptymalizowane wideo może trafiać na pierwszą stronę Google. Platforma dostarcza szczegółowe statystyki i posiada aktywną społeczność komentujących, co pomaga w budowaniu lojalności widzów.', features: ['Red Girls program', 'Europa & LatAm traffic', 'SEO Google top results', 'Detailed analytics'] },
  { cat: 'tube', name: 'xHamster', ico: '🖥️', badge: 'COMMUNITY', desc: 'Platforma tube z wyjątkowo silną społecznością i systemem gamifikacji. xHamster posiada własny program monetyzacji dla twórców, aktywne forum dyskusyjne oraz unikalny system "Hamster points" nagradzający aktywność. Platforma jest znana z otwartości na różnorodność treści i niszy, co czyni ją idealnym miejscem dla twórców z niekonwencjonalnymi niszami. Fan Page na xHamster pozwala na bezpośrednią komunikację z widzami.', features: ['Creator monetization', 'Strong community', 'Fan Pages', 'Diverse niches'] },
  { cat: 'tube', name: 'AVN Stars', ico: '⭐', badge: 'INDUSTRY CRED', desc: 'Platforma subskrypcyjna i tube stworzona przez wydawców magazynu AVN – biblii branży adult. AVN Stars daje twórcom niesamowity prestiż i dostęp do branżowych nagród i nominacji. Platforma posiada najbardziej zaangażowaną publiczność spośród hardcorowych fanów branży, którzy traktują twórców jak gwiazdy. Obecność na AVN Stars to sygnał profesjonalizmu i jakości. Regularne nagrody AVN Awards zwiększają ekspozycję najaktywniejszych twórców.', features: ['Industry prestige', 'AVN Awards exposure', 'Hardcore fan base', 'Professional cred'] },
  { cat: 'marketing', name: 'Twitter / X', ico: '🐦', badge: 'ESSENTIAL', desc: 'Główna arteria ruchu dla całej branży adult content. Twitter to miejsce, gdzie buduje się networking, nawiązuje relacje z innymi twórcami i przede wszystkim przyciąga fanów do płatnych platform jak OnlyFans czy Fansly. Bez aktywnego konta na Twitterze, twórca jest praktycznie niewidzialny w cyfrowym świecie. Wykorzystanie odpowiednich hashtagów, udział w Twitter Spaces oraz strategiczne przypinanie postów z linkami to absolutna podstawa marketingu. To tutaj bije serce społeczności twórców, gdzie można wymieniać się doświadczeniami i budować rozpoznawalność marki osobistej na skalę globalną.', features: ['Hashtag networking', 'Pinned tweet funnel', 'Twitter Spaces', 'Industry community'] },
  { cat: 'marketing', name: 'Reddit', ico: '🤖', badge: 'ORGANIC', desc: 'Najlepsze źródło darmowego ruchu dla par. Reddit to potężne narzędzie, które przy odpowiednim podejściu potrafi generować tysiące wejść dziennie na Twoje płatne profile. Kluczem jest tu budowanie "karmy", weryfikacja na niszowych subredditach oraz publikowanie angażujących, autentycznych treści. Reddit ceni autentyczność bardziej niż profesjonalne sesje, dlatego jest to idealne miejsce na budowanie relacji z fanami, którzy szukają czegoś więcej niż tylko obrazu. Nasz zespół pomaga w procesie weryfikacji i doradza, gdzie i kiedy postować, aby zmaksymalizować konwersję.', features: ['Niche subreddits', 'Karma building', 'Verified creator', 'Direct traffic funnel'] },
  { cat: 'marketing', name: 'TikTok / Instagram', ico: '📱', badge: 'AWARENESS', desc: 'Platformy służące do budowania świadomości marki i przyciągania masowego ruchu ze świata SFW (Safe For Work). Na TikTok i Instagramie stawiamy na lifestyle, estetykę i budowanie więzi emocjonalnej z widzem, kierując go strategicznie do "linku w bio". To tutaj tworzy się lejek sprzedażowy, który z przypadkowego widza robi lojalnego subskrybenta. Dzięki wykorzystaniu trendów, odpowiedniej muzyki i profesjonalnego montażu, Twoje profile mogą osiągać miliony wyświetleń, stając się potężnym silnikiem napędowym dla Twojego biznesu adult.', features: ['Lifestyle content', 'Brand personality', 'Massive reach SFW', 'Linktree integration'] },
];

const CATS = [
  { id: 'all', name: 'Wszystko' },
  { id: 'live', name: '🎥 Live Cam' },
  { id: 'sub', name: '👑 Fansite' },
  { id: 'tube', name: '🖥️ Tube' },
  { id: 'marketing', name: '📣 Marketing' },
  { id: 'videos', name: '🎬 Wideo' },
  { id: 'podcasts', name: '🎙️ Podcasty' },
  { id: 'guides', name: '📚 Dokumenty' },
  { id: 'blog', name: '✍️ Blog' },
];

// ─── AUDIO PLAYER ────────────────────────────────────────────────────────────
const AudioPlayer: React.FC<{ src: string; title: string }> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(pct) ? 0 : pct);
    const m = Math.floor(audioRef.current.currentTime / 60);
    const s = Math.floor(audioRef.current.currentTime % 60);
    setCurrentTime(`${m}:${s.toString().padStart(2, '0')}`);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} />
      <button onClick={toggle}
        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-all flex-shrink-0 text-xs">
        {playing ? '⏸' : '▶'}
      </button>
      <div className="flex-1 space-y-1">
        <div className="h-1 bg-dark-4 cursor-pointer rounded-full overflow-hidden" onClick={seek}>
          <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-[8px] text-dim/60">{currentTime}</div>
      </div>
    </div>
  );
};

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
const VideoCard: React.FC<{ v: VideoResource; locked: boolean }> = ({ v, locked }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    if (locked) return;
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div className="bg-dark-3/40 border border-gold/10 group overflow-hidden hover:border-gold/30 transition-all">
      <div className="aspect-video bg-dark-4 relative overflow-hidden cursor-pointer" onClick={toggle}>
        {!locked ? (
          <video ref={videoRef} src={v.localPath} className="w-full h-full object-cover"
            onEnded={() => setPlaying(false)} playsInline />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-4 to-dark-3 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-3xl opacity-30">🔒</div>
              <div className="text-[8px] text-dim uppercase tracking-widest">Tylko dla partnerek</div>
            </div>
          </div>
        )}
        {!locked && !playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/40">
            <div className="w-12 h-12 border border-gold/50 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform pl-1 bg-dark/60">▶</div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-dark/80 text-[7px] text-white px-2 py-1">{v.dur}</div>
        <div className="absolute top-2 left-2 text-[7px] text-gold tracking-widest uppercase bg-dark/80 px-2 py-1 border border-gold/20">{v.level}</div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-cormorant text-lg text-white italic leading-tight">{v.title}</h3>
        <p className="text-dim text-[9px] leading-relaxed font-light">{v.desc}</p>
      </div>
    </div>
  );
};

// ─── PLATFORM CARD ────────────────────────────────────────────────────────────
const PlatformCard: React.FC<{ plat: typeof PLATFORMS[0] }> = ({ plat }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[400px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-dark-2 border border-gold/10 p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start">
            <div className="text-4xl">{plat.ico}</div>
            <div className="text-[7px] tracking-[0.15em] uppercase bg-gold/10 text-gold px-2 py-1 border border-gold/20 font-bold">
              {plat.badge}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-cormorant text-3xl text-white italic">{plat.name}</h3>
            <div className="h-px w-12 bg-gold/30" />
            <p className="text-dim text-[11px] leading-relaxed font-light line-clamp-4">
              {plat.desc}
            </p>
          </div>

          <div className="pt-6 flex items-center gap-2 text-[8px] text-gold uppercase tracking-[0.2em] font-bold">
            Czytaj więcej <span className="text-lg">→</span>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden bg-dark-3 border border-gold/30 p-8 flex flex-col justify-between rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-6">
            <h4 className="font-cormorant text-xl text-gold italic border-b border-gold/10 pb-2">Kluczowe Funkcje</h4>
            <ul className="space-y-3">
              {plat.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-[10px] text-dim/90 font-light leading-snug">
                  <span className="text-gold mt-1 text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-cormorant text-xl text-gold italic border-b border-gold/10 pb-2">O Platformie</h4>
            <p className="text-dim text-[10px] leading-relaxed font-light italic">
              {plat.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [docFilter, setDocFilter] = useState('all');
  
  // Dynamic Content States
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastResource[]>([]);
  const [legalDocs, setLegalDocs] = useState<LegalDocResource[]>([]);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        // Fetch resources in parallel
        const [vRes, pRes, dRes, aRes] = await Promise.all([
          fetch('/api/admin/academy/videos'),
          fetch('/api/admin/academy/podcasts'),
          fetch('/api/admin/academy/documents'),
          fetch('/api/academy/content?type=articles')
        ]);

        if (vRes.ok) {
          const vData = await vRes.json();
          setVideos(vData.map((v: any) => ({
            id: v.id, title: v.title, dur: v.duration, level: v.level,
            desc: v.description, cloudinaryId: v.cloudinaryId,
            localPath: v.url, thumb: v.thumbnail
          })));
        }

        if (pRes.ok) {
          const pData = await pRes.json();
          setPodcasts(pData.map((p: any) => ({
            id: p.id, title: p.title, dur: p.duration,
            desc: p.description, file: p.url, ep: p.episodeNumber
          })));
        }

        if (dRes.ok) {
          const dData = await dRes.json();
          setLegalDocs(dData.map((d: any) => ({
            id: d.id, title: d.title, type: d.type, size: d.size,
            desc: d.description, file: d.url, icon: d.icon, cat: d.category
          })));
        }

        if (aRes.ok) {
          const data = await aRes.json();
          const transformed = data.map((article: any) => ({
            slug: article.slug,
            cat: article.category,
            tag: article.tag,
            title: article.title,
            excerpt: article.excerpt,
            readTime: article.readTime,
            date: article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A',
            tags: article.tag.toLowerCase().split(' '),
            content: article.content,
          }));
          setBlogArticles(transformed);
        }
      } catch (error) {
        console.error('Error fetching academy content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  return (
    <>
      <Head>
        <title>Akademia HRL Creator | Studio HRL Adult – Wiedza to Siła</title>
        <meta name="description" content="HRL Creator Academy – profesjonalny portal edukacyjny dla twórców treści +18. Kursy wideo, podcasty, mapa platform, dokumenty prawne. Tylko dla partnerek Studio HRL Adult." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">

          {/* ── HERO ── */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(155,31,53,0.18),rgba(90,15,30,0.08)_50%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20 pointer-events-none">
              <div className="flex gap-1 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-crimson/30 to-transparent border-r border-gold/5" />
                ))}
              </div>
            </div>
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-12 h-px bg-gold/30" />
                HRL Creator Academy
                <div className="w-12 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">
                Wiedza to<br />
                <span className="italic bg-gold-gradient bg-clip-text text-transparent">Twój Kapitał</span>
              </h1>
              <p className="font-cormorant text-2xl italic text-dim">
                Profesjonalny portal edukacyjny dla twórców treści +18
              </p>
              <p className="text-dim text-sm leading-loose font-light max-w-2xl mx-auto">
                Kursy wideo, podcasty, mapa 28 platform, dokumenty prawne i blog branżowy.
                Wszystko czego potrzebujesz żeby zarabiać profesjonalnie i bezpiecznie.
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                {[
                  { val: '28', label: 'Platform' },
                  { val: '6', label: 'Kursów Wideo' },
                  { val: '7', label: 'Podcastów' },
                  { val: '11', label: 'Dokumentów' },
                  { val: '9', label: 'Artykułów' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-cormorant text-3xl text-gold">{s.val}</div>
                    <div className="text-[8px] text-dim uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 pt-2">
                <a href="#login" className="btn-gold">Zaloguj się</a>
                <a href="/casting" className="btn-outline">Zostań Partnerką</a>
              </div>
            </div>
          </section>

          {/* ── PROMO MEDIA STRIP ── */}
          <section className="py-8 overflow-hidden border-y border-gold/10 bg-dark-2">
            <div className="flex gap-3 px-[7%] overflow-x-auto scrollbar-hide">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-40 h-24 bg-dark-3 border border-gold/10 relative overflow-hidden group cursor-pointer hover:border-gold/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 to-dark-4 flex items-center justify-center">
                    <div className="text-gold/30 text-2xl group-hover:text-gold/60 transition-colors">▶</div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-[7px] text-dim/50 uppercase tracking-widest">Preview {i + 1}</div>
                  <div className="absolute top-1 right-1 text-[6px] text-gold/40 border border-gold/20 px-1">+18</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="px-[7%] max-w-4xl mx-auto my-20">
            <div className="bg-dark-3/50 border border-gold/20 p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient" />
              <div className="section-tag justify-center">Dołącz do Studio HRL</div>
              <h3 className="font-cormorant text-3xl text-white italic">Chcesz zarabiać profesjonalnie?</h3>
              <p className="text-dim text-xs font-light max-w-md mx-auto">
                Aplikuj na casting i uzyskaj dostęp do pełnego wsparcia studia, profesjonalnego sprzętu 4K i modelu 60/30/10.
              </p>
              <div className="flex justify-center gap-4">
                <a href="/casting" className="btn-gold">Aplikuj na Casting</a>
                <a href="/contact" className="btn-outline">Napisz do nas</a>
              </div>
            </div>
          </section>

          {/* ── FILTERS ── */}
          <section className="px-[7%] mb-16">
            <div className="flex flex-wrap justify-center gap-2">
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                  className={`px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                    activeCat === cat.id
                      ? 'bg-gold text-dark border-gold font-bold'
                      : 'bg-dark-3/40 text-dim border-gold/10 hover:border-gold/30'
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* ── CONTENT ── */}
          <div className="px-[7%] space-y-28 max-w-7xl mx-auto">

            {/* VIDEOS */}
            {(activeCat === 'all' || activeCat === 'videos') && (
              <section className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">Brak dostępnych kursów wideo</div>
                  ) : (
                    videos.map(v => <VideoCard key={v.id} v={v} locked={false} />)
                  )}
                </div>
              </section>
            )}

            {/* PODCASTS */}
            {(activeCat === 'all' || activeCat === 'podcasts') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="section-tag">🎙️ Podcasty HRL</div>
                  <span className="text-[8px] text-dim uppercase tracking-widest">{podcasts.length} odcinków</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {podcasts.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">Brak dostępnych podcastów</div>
                  ) : (
                    podcasts.map(pod => (
                      <div key={pod.id} className="bg-dark-2 border border-gold/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex gap-5 items-start">
                          <div className="w-16 h-16 bg-gradient-to-br from-crimson/30 to-dark-4 border border-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-cormorant text-gold text-sm font-bold">{pod.ep}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-cormorant text-lg text-white italic leading-tight mb-2 group-hover:text-gold transition-colors">{pod.title}</h3>
                            <p className="text-dim text-[9px] leading-relaxed font-light mb-1">{pod.desc}</p>
                            <div className="text-[8px] text-dim/50 uppercase tracking-widest">{pod.dur}</div>
                            <AudioPlayer src={pod.file} title={pod.title} />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* PLATFORMS */}
            {['all', 'live', 'sub', 'tube', 'marketing'].includes(activeCat) && (
              <>
                {['live', 'sub', 'tube', 'marketing'].filter(c => activeCat === 'all' || activeCat === c).map(cat => {
                  const labels: Record<string, string> = { live: '🎥 Platformy Live Cam', sub: '👑 Platformy Fansite / Subskrypcja', tube: '🖥️ Platformy Tube & Funnel', marketing: '📣 Kanały Marketingowe' };
                  const filtered = PLATFORMS.filter(p => p.cat === cat);
                  if (filtered.length === 0) return null;
                  return (
                    <section key={cat} className="space-y-10">
                      <div className="section-tag">{labels[cat]}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map(plat => (
                          <PlatformCard key={plat.name} plat={plat} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}

            {/* DOCUMENTS */}
            {(activeCat === 'all' || activeCat === 'guides') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="section-tag">📚 Dokumenty & Legal</div>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Prawny', 'Operacyjny', 'Biznesowy', 'Strategia', 'Compliance', 'Casting'].map(f => (
                      <button key={f} onClick={() => setDocFilter(f)}
                        className={`px-3 py-1 text-[8px] uppercase tracking-widest border transition-all ${
                          docFilter === f ? 'bg-gold text-dark border-gold' : 'text-dim border-gold/10 hover:border-gold/30'
                        }`}>
                        {f === 'all' ? 'Wszystkie' : f}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {legalDocs.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">Brak dostępnych dokumentów</div>
                  ) : (
                    legalDocs.filter(d => docFilter === 'all' || d.cat === docFilter).map(doc => (
                      <div key={doc.id} className="bg-dark-2 border border-gold/10 p-6 hover:border-gold/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-3xl">{doc.icon}</div>
                          <div className="flex gap-2">
                            <span className="text-[7px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 uppercase">{doc.type}</span>
                            <span className="text-[7px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 uppercase">{doc.cat}</span>
                          </div>
                        </div>
                        <h3 className="font-cormorant text-lg text-white italic mb-2">{doc.title}</h3>
                        <p className="text-dim text-[9px] leading-relaxed font-light mb-4">{doc.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-dim/50 uppercase tracking-widest">{doc.size}</span>
                          <a href={doc.file} target="_blank" rel="noopener noreferrer"
                            className="text-[8px] text-gold uppercase tracking-widest border border-gold/20 px-3 py-1.5 hover:bg-gold hover:text-dark transition-all">
                            Pobierz
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* BLOG */}
            {(activeCat === 'all' || activeCat === 'blog') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="section-tag">✍️ Blog & Artykuły</div>
                  <span className="text-[8px] text-dim uppercase tracking-widest">{blogArticles.length} artykułów</span>
                </div>
                {loading ? (
                  <div className="text-center text-dim py-20 animate-pulse tracking-[5px] uppercase text-[10px]">Inicjalizacja Sieci Wiedzy...</div>
                ) : blogArticles.length === 0 ? (
                  <div className="text-center text-dim py-20">Brak artykułów w tej kategorii.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogArticles.map(article => (
                      <motion.div key={article.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                        className="bg-dark-2 border border-gold/10 hover:border-gold/30 transition-all group overflow-hidden flex flex-col">
                        <div className="aspect-video bg-gradient-to-br from-dark-4 to-dark-3 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-[8px] text-dim/30 uppercase tracking-widest">Zdjęcie artykułu</div>
                          </div>
                          <div className="absolute top-3 left-3 text-[7px] tracking-[0.15em] uppercase bg-crimson/80 text-white px-2 py-0.5">{article.cat}</div>
                          <div className="absolute top-3 right-3 text-[7px] tracking-[0.15em] uppercase bg-gold/80 text-dark px-2 py-0.5 font-bold">{article.tag}</div>
                        </div>
                        <div className="p-6 flex flex-col flex-1 space-y-3">
                          <h3 className="font-cormorant text-xl text-white italic leading-tight group-hover:text-gold transition-colors">{article.title}</h3>
                          <p className="text-dim text-[10px] leading-relaxed font-light flex-1">{article.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {article.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-[7px] text-dim/50 border border-gold/10 px-2 py-0.5 uppercase tracking-widest">#{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gold/10">
                            <div className="text-[8px] text-dim/50">{article.date} · {article.readTime}</div>
                            <button className="text-[8px] text-gold uppercase tracking-widest border-b border-gold/20 hover:border-gold transition-all">Czytaj →</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            )}

          </div>

          <CTA />
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .grain-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1; opacity: 0.35;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default AcademyPage;
