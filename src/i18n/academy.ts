import type { Messages } from './index';

interface PlatformCopy {
  desc: string;
  features: string[];
}

const en = {
  meta: {
    title: 'HRL Creator Academy | Studio HRL Adult – Knowledge Is Power',
    description:
      'HRL Creator Academy – a professional educational portal for 18+ content creators. Video courses, podcasts, a platform map and legal documents. For Studio HRL Adult partners only.',
  },
  categories: {
    all: 'All',
    live: '🎥 Live Cam',
    sub: '👑 Fansite',
    tube: '🖥️ Tube',
    marketing: '📣 Marketing',
    videos: '🎬 Video',
    podcasts: '🎙️ Podcasts',
    guides: '📚 Documents',
    blog: '✍️ Blog',
  },
  platformSections: {
    live: '🎥 Live Cam Platforms',
    sub: '👑 Fansite / Subscription Platforms',
    tube: '🖥️ Tube & Funnel Platforms',
    marketing: '📣 Marketing Channels',
  },
  card: {
    partnersOnly: 'Partners only',
    readMore: 'Read more',
    keyFeatures: 'Key Features',
    about: 'About the Platform',
  },
  hero: {
    tag: 'HRL Creator Academy',
    titleA: 'Knowledge is',
    titleB: 'Your Capital',
    subtitle: 'A professional educational portal for 18+ content creators',
    text: 'Video courses, podcasts, a map of 28 platforms, legal documents and an industry blog. Everything you need to earn professionally and safely.',
    stats: ['Platforms', 'Video Courses', 'Podcasts', 'Documents', 'Articles'],
    login: 'Log in',
    becomePartner: 'Become a Partner',
  },
  preview: 'Preview',
  cta: {
    tag: 'Join Studio HRL',
    title: 'Want to earn professionally?',
    text: "Apply to the casting and get access to the studio's full support, professional 4K equipment and the 60/30/10 model.",
    apply: 'Apply to Casting',
    contact: 'Message us',
  },
  empty: {
    videos: 'No video courses available',
    podcasts: 'No podcasts available',
    documents: 'No documents available',
    articles: 'No articles in this category.',
  },
  podcasts: { title: '🎙️ HRL Podcasts', episodes: 'episodes' },
  documents: {
    title: '📚 Documents & Legal',
    all: 'All',
    download: 'Download',
    // Keys are the category values stored in the database.
    categories: {
      Prawny: 'Legal',
      Operacyjny: 'Operational',
      Biznesowy: 'Business',
      Strategia: 'Strategy',
      Compliance: 'Compliance',
      Casting: 'Casting',
    } as Record<string, string>,
  },
  blog: {
    title: '✍️ Blog & Articles',
    articles: 'articles',
    loading: 'Initializing Knowledge Network...',
    image: 'Article image',
    read: 'Read →',
    noDate: 'N/A',
  },
  platforms: {
    Chaturbate: {
      desc: "The world's largest live cam platform and an absolute foundation for every creator. It runs on a token system where 1 token equals $0.05. Chaturbate offers organic traffic found nowhere else, letting you build a base of loyal fans quickly without any external marketing spend. Tip Goals, Ticket Shows and advanced bots that automate interactions make it a money-making machine. Average private-room rates range from PLN 30-450 per minute, and the best models and couples regularly reach five-figure monthly earnings.",
      features: ['1 token = $0.05', 'Private Shows PLN 30-450/min', '#1 global traffic', 'Apps & Bots automation'],
    },
    Stripchat: {
      desc: 'An innovative platform that revolutionized the market with VR and 360° technology. Stripchat bets on high broadcast quality and modern monetization tools such as the Fan Club, which gives creators steady monthly income regardless of the time spent live. The platform offers some of the highest commissions in the industry (up to 80%) and is fully integrated with Lovense interactive toys. Thanks to a strong system for promoting new accounts, Stripchat is an ideal place to start for couples looking for a technological edge and a modern audience.',
      features: ['VR & 360° shows', 'Fan Club (recurring revenue)', 'Up to 80% commission', 'Lovense integration'],
    },
    LiveJasmin: {
      desc: 'The most prestigious and exclusive camming platform in the world, dedicated to High-End and VIP clients. Quality is what counts here – professional (4K) equipment, impeccable aesthetics and a high personal culture are required. LiveJasmin offers the highest per-minute rates in private rooms, attracting users ready to pay a premium for a luxury experience. Every model and couple gets a dedicated manager who helps optimize the profile and sales strategy. It is a platform for those who want to build a luxury brand and earn from the wealthiest fans.',
      features: ['Premium/VIP clients', 'Highest rates/min', 'Dedicated manager', '4K required'],
    },
    BongaCams: {
      desc: 'A platform with huge reach, especially strong in European markets including Poland, Germany and the Czech Republic. Thanks to local traffic, Polish couples and models have a real chance to become stars here. BongaCams is known for its ease of use, fast and regular payments and numerous contests with high cash prizes for creators. The Gold Shows system and an extensive Tip Menu allow every stream to be monetized effectively. It is an excellent choice for people who want to build popularity in their region and value stability and clear rules of cooperation.',
      features: ['Strong EU presence', 'Fast payments', 'Gold Shows & Tip Menu', 'Contests with prizes'],
    },
    MyFreeCams: {
      desc: 'One of the oldest and most iconic platforms in the industry, with an exceptionally loyal user community, including so-called "Whales" – fans who spend huge sums on their favorite stars. MyFreeCams is built on a unique Camscore ranking system and contests such as Miss MFC. The platform offers stable long-term earnings for creators who can build deep relationships with viewers. The MFC Share system makes it easy to integrate with social media, supporting personal brand building. It is a place for patient, ambitious creators who bet on quality and loyalty.',
      features: ['Loyal fan base', 'Gold Show system', 'MFC Share social', 'Stable long-term'],
    },
    Cam4: {
      desc: 'An exceptionally friendly platform for people taking their first steps in the world of live cam. Cam4 offers an intuitive interface, low technical requirements at the start and an excellent mobile app for iOS and Android, so you can stream from anywhere. Despite its simplicity, the platform generates huge global traffic, especially from the USA and Western Europe. Weekly payouts from just $50 make it a safe and motivating choice for beginners. An ideal space to learn how to interact with viewers and test different show formats before entering more demanding markets.',
      features: ['Easy start', 'Mobile app iOS/Android', 'Weekly payouts', 'Global traffic'],
    },
    Flirt4Free: {
      desc: 'A premium-type platform that bets on quality and professionalism. Flirt4Free attracts a mature audience and VIP clients looking for high-class entertainment. Unique features such as Feature Shows (auctions for broadcast time), Party Chat or Multi-User private offer monetization options unseen on other sites. High image quality (HD/4K) and commitment to building a professional image are required. Earnings in private rooms are among the highest in the industry, which makes this platform ideal for couples with a specific fetish niche or a high production standard.',
      features: ['VIP premium clients', 'HD/4K required', 'Auction-style Feature Shows', 'Party Chat'],
    },
    Streamate: {
      desc: 'A powerful player in the American and Canadian market, offering stable technology and predictable earnings. Streamate differs from token platforms with a direct payment model for time spent in private, giving creators more control over hourly rates. The platform has dozens of niche categories, allowing you to reach specific audience groups effectively. Thanks to strong in-house marketing and a loyal user base from North America, it is an excellent place for couples who want to earn in dollars and value professionalism and financial stability.',
      features: ['US/Canada traffic', 'Multiple categories', 'Stable technology', 'Gold shows'],
    },
    OnlyFans: {
      desc: 'The undisputed leader of the subscription market, which revolutionized how adult content is monetized. OnlyFans is the main revenue artery for most top creators, allowing you to build a stable monthly income from subscriptions. The key to success here is PPV (Pay-Per-View) messages, which can generate as much as 70-80% of total earnings. The platform offers full control over content, a Geo-blocking system to protect privacy and advanced statistics. This is where the most intimate relationship with fans is built, turning popularity from other sites into real, high capital.',
      features: ['Subscriptions $5-$50', 'PPV messages', 'Tips & Live', 'Geo-blocking'],
    },
    Fansly: {
      desc: "OnlyFans' fiercest competitor, which has won creators' recognition with more flexible rules and innovative features. Fansly has its own recommendation algorithm (FYP) that helps fans organically discover new creators – something OnlyFans lacks. The Tiered Subscriptions system lets you differentiate prices and offer unique content to different groups of fans. The platform also supports cryptocurrency payments, which attracts a modern audience. It's an ideal place to diversify revenue and build a fan base in a more open environment.",
      features: ['Discovery algorithm', 'Tiered subscriptions', 'PPV & Media bundles', 'Crypto payouts'],
    },
    ManyVids: {
      desc: 'The best platform for building passive income from sales of recorded video. ManyVids combines a clip store, a subscription platform (MV Crush) and a store for physical items. A video recorded and uploaded once can earn for years thanks to strong Google positioning and the platform\'s internal traffic. The ability to take custom video orders and a tipping system make it a comprehensive tool for every creator. ManyVids is the foundation of "retirement" in this industry – a place where your content archive becomes your biggest asset.',
      features: ['Passive Video Store', 'Custom Video Requests', 'MV Crush subs', 'SEO in Google'],
    },
    JustForFans: {
      desc: 'A subscription platform made by creators for creators, known for the most liberal rules in the industry. JustForFans allows publishing literally any kind of legal adult content, without the restrictions typical of OnlyFans. The platform offers as much as 75% of revenue to the creator, one of the highest rates in the industry. Dedicated and engaged support, a system for collaborating with other creators and the ability to sell your own merch make JFF an ideal place for creators looking for a platform without limits.',
      features: ['75% of revenue to the creator', 'Zero content censorship', 'Creator collabs', 'Merch store'],
    },
    FanCentro: {
      desc: 'A unique aggregator platform that lets you manage multiple monetization platforms in one place. FanCentro offers its own subscription platform, tools for managing Instagram, Snapchat and Twitter Premium, and an advanced sales funnel system. A dedicated success manager helps develop a strategy and optimize earnings. An ideal solution for creators who want to consolidate revenue from many channels in one clear dashboard.',
      features: ['Multi-platform hub', 'Social media mgmt', 'Dedicated success mgr', 'Sales funnel tools'],
    },
    Patreon: {
      desc: 'The largest subscription platform in the world, not dedicated exclusively to adult content but extremely powerful as a community-building tool. Patreon allows multiple subscription tiers with different benefits, from newsletters to exclusive content and access to a private community. It is an ideal place to monetize lifestyle content, industry education, behind-the-scenes and SFW content that attracts a wider audience.',
      features: ['Multi-tier subs', 'Community building', 'SFW & adult mix', 'Creator tools'],
    },
    Pornhub: {
      desc: 'The largest tube platform in the world, with over 130 million visits a day. The Verified Amateurs model lets creators monetize through ads and premium content (Pornhub Premium). It serves as a powerful funnel driving traffic to paid platforms – a link in your bio brings thousands of clicks a month. The platform also has its own affiliate program and the ability to sell clips. A presence on Pornhub is a key element of SEO in the adult industry.',
      features: ['130M visits/day', 'Verified Amateurs', '#1 traffic funnel', 'Premium content'],
    },
    xVideos: {
      desc: 'One of the largest tube platforms in the world, especially popular in Europe, Latin America and Asia. The Red Girls model lets you monetize content through ads and premium subscriptions. xVideos offers one of the best SEO systems in the industry – a well-optimized video can land on the first page of Google. The platform provides detailed statistics and has an active community of commenters, which helps build viewer loyalty.',
      features: ['Red Girls program', 'Europe & LatAm traffic', 'Top Google SEO results', 'Detailed analytics'],
    },
    xHamster: {
      desc: 'A tube platform with an exceptionally strong community and a gamification system. xHamster has its own monetization program for creators, an active discussion forum and a unique "Hamster points" system that rewards activity. The platform is known for its openness to diverse content and niches, which makes it an ideal place for creators with unconventional niches. A Fan Page on xHamster allows direct communication with viewers.',
      features: ['Creator monetization', 'Strong community', 'Fan Pages', 'Diverse niches'],
    },
    'AVN Stars': {
      desc: 'A subscription and tube platform created by the publishers of AVN magazine – the bible of the adult industry. AVN Stars gives creators tremendous prestige and access to industry awards and nominations. The platform has the most engaged audience among hardcore industry fans, who treat creators like stars. A presence on AVN Stars signals professionalism and quality. The regular AVN Awards boost the exposure of the most active creators.',
      features: ['Industry prestige', 'AVN Awards exposure', 'Hardcore fan base', 'Professional cred'],
    },
    'Twitter / X': {
      desc: 'The main traffic artery for the entire adult content industry. Twitter is where networking happens, where you build relationships with other creators and, above all, draw fans to paid platforms like OnlyFans or Fansly. Without an active Twitter account, a creator is practically invisible in the digital world. Using the right hashtags, taking part in Twitter Spaces and strategically pinning posts with links are the absolute basics of marketing. This is where the heart of the creator community beats, where you can swap experiences and build personal brand recognition on a global scale.',
      features: ['Hashtag networking', 'Pinned tweet funnel', 'Twitter Spaces', 'Industry community'],
    },
    Reddit: {
      desc: 'The best source of free traffic for couples. Reddit is a powerful tool that, approached properly, can generate thousands of visits a day to your paid profiles. The key is building "karma", getting verified on niche subreddits and publishing engaging, authentic content. Reddit values authenticity more than professional shoots, so it is an ideal place to build relationships with fans looking for more than just an image. Our team helps with the verification process and advises where and when to post to maximize conversion.',
      features: ['Niche subreddits', 'Karma building', 'Verified creator', 'Direct traffic funnel'],
    },
    'TikTok / Instagram': {
      desc: 'Platforms for building brand awareness and attracting mass traffic from the SFW (Safe For Work) world. On TikTok and Instagram we focus on lifestyle, aesthetics and building an emotional bond with the viewer, strategically directing them to the "link in bio". This is where the sales funnel is created that turns a random viewer into a loyal subscriber. By using trends, the right music and professional editing, your profiles can reach millions of views, becoming a powerful engine for your adult business.',
      features: ['Lifestyle content', 'Brand personality', 'Massive SFW reach', 'Linktree integration'],
    },
  } as Record<string, PlatformCopy>,
};

const pl: typeof en = {
  meta: {
    title: 'Akademia HRL Creator | Studio HRL Adult – Wiedza to Siła',
    description:
      'HRL Creator Academy – profesjonalny portal edukacyjny dla twórców treści +18. Kursy wideo, podcasty, mapa platform, dokumenty prawne. Tylko dla partnerek Studio HRL Adult.',
  },
  categories: {
    all: 'Wszystko',
    live: '🎥 Live Cam',
    sub: '👑 Fansite',
    tube: '🖥️ Tube',
    marketing: '📣 Marketing',
    videos: '🎬 Wideo',
    podcasts: '🎙️ Podcasty',
    guides: '📚 Dokumenty',
    blog: '✍️ Blog',
  },
  platformSections: {
    live: '🎥 Platformy Live Cam',
    sub: '👑 Platformy Fansite / Subskrypcja',
    tube: '🖥️ Platformy Tube & Funnel',
    marketing: '📣 Kanały Marketingowe',
  },
  card: {
    partnersOnly: 'Tylko dla partnerek',
    readMore: 'Czytaj więcej',
    keyFeatures: 'Kluczowe Funkcje',
    about: 'O Platformie',
  },
  hero: {
    tag: 'HRL Creator Academy',
    titleA: 'Wiedza to',
    titleB: 'Twój Kapitał',
    subtitle: 'Profesjonalny portal edukacyjny dla twórców treści +18',
    text: 'Kursy wideo, podcasty, mapa 28 platform, dokumenty prawne i blog branżowy. Wszystko czego potrzebujesz żeby zarabiać profesjonalnie i bezpiecznie.',
    stats: ['Platform', 'Kursów Wideo', 'Podcastów', 'Dokumentów', 'Artykułów'],
    login: 'Zaloguj się',
    becomePartner: 'Zostań Partnerką',
  },
  preview: 'Preview',
  cta: {
    tag: 'Dołącz do Studio HRL',
    title: 'Chcesz zarabiać profesjonalnie?',
    text: 'Aplikuj na casting i uzyskaj dostęp do pełnego wsparcia studia, profesjonalnego sprzętu 4K i modelu 60/30/10.',
    apply: 'Aplikuj na Casting',
    contact: 'Napisz do nas',
  },
  empty: {
    videos: 'Brak dostępnych kursów wideo',
    podcasts: 'Brak dostępnych podcastów',
    documents: 'Brak dostępnych dokumentów',
    articles: 'Brak artykułów w tej kategorii.',
  },
  podcasts: { title: '🎙️ Podcasty HRL', episodes: 'odcinków' },
  documents: {
    title: '📚 Dokumenty & Legal',
    all: 'Wszystkie',
    download: 'Pobierz',
    categories: {
      Prawny: 'Prawny',
      Operacyjny: 'Operacyjny',
      Biznesowy: 'Biznesowy',
      Strategia: 'Strategia',
      Compliance: 'Compliance',
      Casting: 'Casting',
    },
  },
  blog: {
    title: '✍️ Blog & Artykuły',
    articles: 'artykułów',
    loading: 'Inicjalizacja Sieci Wiedzy...',
    image: 'Zdjęcie artykułu',
    read: 'Czytaj →',
    noDate: 'N/A',
  },
  platforms: {
    Chaturbate: {
      desc: 'Największa na świecie platforma live cam, będąca absolutnym fundamentem dla każdego twórcy. Działa w systemie tokenowym, gdzie 1 token to równowartość $0.05. Chaturbate oferuje niespotykany nigdzie indziej ruch organiczny, pozwalający na szybkie zbudowanie bazy lojalnych fanów bez nakładów na marketing zewnętrzny. System Tip Goals, Ticket Shows oraz zaawansowane boty automatyzujące interakcje sprawiają, że jest to maszyna do zarabiania pieniędzy. Średnie stawki w pokojach prywatnych oscylują w granicach 30-450 zł za minutę, a najlepsze modelki i pary regularnie osiągają pięciocyfrowe zarobki miesięczne.',
      features: ['1 token = $0.05', 'Private Shows 30-450 zł/min', 'Globalny traffic #1', 'Apps & Bots automation'],
    },
    Stripchat: {
      desc: 'Innowacyjna platforma, która zrewolucjonizowała rynek dzięki technologii VR i 360°. Stripchat stawia na wysoką jakość transmisji i nowoczesne narzędzia monetyzacji, takie jak Fan Club, który zapewnia twórcom stały, miesięczny przychód niezależnie od czasu spędzonego na transmisji live. Platforma oferuje jedne z najwyższych prowizji w branży (do 80%) i jest w pełni zintegrowana z interaktywnymi zabawkami Lovense. Dzięki silnemu systemowi promowania nowych kont, Stripchat jest idealnym miejscem na start dla par szukających technologicznej przewagi i nowoczesnego audytorium.',
      features: ['VR & 360° shows', 'Fan Club (stały przychód)', 'Do 80% prowizji', 'Lovense integration'],
    },
    LiveJasmin: {
      desc: 'Najbardziej prestiżowa i ekskluzywna platforma cammingowa na świecie, dedykowana dla klientów typu High-End i VIP. Tutaj liczy się przede wszystkim jakość – wymagany jest profesjonalny sprzęt (4K), nienaganna estetyka i wysoka kultura osobista. LiveJasmin oferuje najwyższe stawki za minutę w prywatnych pokojach, przyciągając użytkowników gotowych płacić premium za luksusowe doświadczenie. Każda modelka i para otrzymuje wsparcie dedykowanego managera, który pomaga w optymalizacji profilu i strategii sprzedaży. To platforma dla tych, którzy chcą budować markę luksusową i zarabiać na najbardziej majętnych fanach.',
      features: ['Klienci Premium/VIP', 'Najwyższe stawki/min', 'Dedykowany manager', '4K wymagane'],
    },
    BongaCams: {
      desc: 'Platforma o ogromnym zasięgu, szczególnie silna na rynkach europejskich, w tym w Polsce, Niemczech i Czechach. Dzięki lokalnemu trafficowi, polskie pary i modelki mają tu szansę stać się prawdziwymi gwiazdami. BongaCams słynie z prostoty obsługi, szybkich i regularnych płatności oraz licznych konkursów z wysokimi nagrodami pieniężnymi dla twórców. System Gold Shows i rozbudowane Tip Menu pozwalają na skuteczną monetyzację każdego streamu. Jest to doskonały wybór dla osób, które chcą budować popularność w swoim regionie i cenią sobie stabilność oraz przejrzyste zasady współpracy.',
      features: ['Silna obecność EU', 'Szybkie płatności', 'Gold Shows & Tip Menu', 'Konkursy z nagrodami'],
    },
    MyFreeCams: {
      desc: 'Jedna z najstarszych i najbardziej kultowych platform w branży, posiadająca niezwykle lojalną społeczność użytkowników, w tym tzw. "Whales" – fanów wydających ogromne sumy na swoje ulubione gwiazdy. MyFreeCams opiera się na unikalnym systemie rankingowym Camscore oraz konkursach takich jak Miss MFC. Platforma oferuje stabilne zarobki długofalowe dla twórców, którzy potrafią budować głębokie relacje z widzami. System MFC Share pozwala na łatwą integrację z mediami społecznościowymi, co wspiera budowanie marki osobistej. To miejsce dla cierpliwych i ambitnych twórców, którzy stawiają na jakość i lojalność.',
      features: ['Lojalna baza fanów', 'System Gold Show', 'MFC Share social', 'Stabilne długofalowo'],
    },
    Cam4: {
      desc: 'Niezwykle przyjazna platforma dla osób stawiających swoje pierwsze kroki w świecie live cam. Cam4 oferuje intuicyjny interfejs, niskie wymagania techniczne na starcie oraz doskonałą aplikację mobilną na iOS i Androida, co pozwala na prowadzenie transmisji z dowolnego miejsca. Mimo swojej prostoty, platforma generuje ogromny globalny ruch, szczególnie z USA i Europy Zachodniej. Cotygodniowe wypłaty już od $50 sprawiają, że jest to bezpieczny i motywujący wybór dla początkujących. Idealna przestrzeń do nauki interakcji z widzami i testowania różnych formatów show przed wejściem na bardziej wymagające rynki.',
      features: ['Easy start', 'Mobile app iOS/Android', 'Weekly payouts', 'Global traffic'],
    },
    Flirt4Free: {
      desc: 'Platforma typu Premium, która stawia na jakość i profesjonalizm. Flirt4Free przyciąga dojrzałe audytorium i klientów VIP, którzy szukają wysokiej klasy rozrywki. Unikalne funkcje, takie jak Feature Shows (aukcje na czas transmisji), Party Chat czy Multi-User private, dają niespotykane na innych portalach możliwości monetyzacji. Wymagana jest tu wysoka jakość obrazu (HD/4K) i zaangażowanie w budowanie profesjonalnego wizerunku. Zarobki w prywatnych pokojach należą do jednych z najwyższych w branży, co czyni tę platformę idealną dla par z konkretną niszą fetyszową lub wysokim standardem produkcji.',
      features: ['VIP clients premium', 'HD/4K required', 'Feature Shows aukcyjne', 'Party Chat'],
    },
    Streamate: {
      desc: 'Potężny gracz na rynku amerykańskim i kanadyjskim, oferujący stabilną technologię i przewidywalne zarobki. Streamate różni się od platform tokenowych modelem płatności bezpośredniej za czas spędzony w private, co daje twórcom większą kontrolę nad godzinowymi stawkami. Platforma posiada dziesiątki niszowych kategorii, co pozwala na skuteczne dotarcie do specyficznych grup odbiorców. Dzięki silnemu marketingowi wewnętrznemu i lojalnej bazie użytkowników z Ameryki Północnej, jest to doskonałe miejsce dla par, które chcą zarabiać w dolarach i cenią sobie profesjonalizm oraz stabilność finansową.',
      features: ['US/Canada traffic', 'Multiple categories', 'Stable technology', 'Gold shows'],
    },
    OnlyFans: {
      desc: 'Niekwestionowany lider rynku subskrypcyjnego, który zrewolucjonizował sposób monetyzacji treści dla dorosłych. OnlyFans to główna arteria przychodów dla większości topowych twórców, pozwalająca na budowanie stabilnego, miesięcznego dochodu z subskrypcji. Kluczem do sukcesu są tu wiadomości PPV (Pay-Per-View), które mogą generować nawet 70-80% całkowitych zarobków. Platforma oferuje pełną kontrolę nad treściami, system Geo-blocking do ochrony prywatności oraz zaawansowane statystyki. To tutaj buduje się najbardziej intymną relację z fanami, przekuwając popularność z innych portali na realny i wysoki kapitał.',
      features: ['Subskrypcje $5-$50', 'PPV wiadomości', 'Tips & Live', 'Geo-blocking'],
    },
    Fansly: {
      desc: 'Najgroźniejszy konkurent OnlyFans, który zdobył uznanie twórców dzięki bardziej elastycznym regulaminom i innowacyjnym funkcjom. Fansly posiada własny algorytm rekomendacji (FYP), który pomaga w organicznym odkrywaniu nowych twórców przez fanów – coś, czego brakuje na OnlyFans. System wielopoziomowych subskrypcji (Tiered Subscriptions) pozwala na różnicowanie cen i oferowanie unikalnych treści dla różnych grup fanów. Platforma wspiera również płatności kryptowalutami, co przyciąga nowoczesne audytorium. To idealne miejsce na dywersyfikację przychodów i budowanie bazy fanów w bardziej otwartym środowisku.',
      features: ['Discovery algorithm', 'Tiered subscriptions', 'PPV & Media bundles', 'Crypto payouts'],
    },
    ManyVids: {
      desc: 'Najlepsza platforma do budowania pasywnego dochodu ze sprzedaży nagranych materiałów wideo. ManyVids łączy w sobie sklep z klipami, platformę subskrypcyjną (MV Crush) oraz sklep z przedmiotami fizycznymi. Raz nagrany i wrzucony film może zarabiać na siebie przez lata dzięki silnemu pozycjonowaniu w Google i wewnętrznemu ruchowi platformy. Możliwość przyjmowania zamówień na filmy customowe oraz system napiwków sprawiają, że jest to kompleksowe narzędzie dla każdego twórcy. ManyVids to fundament "emerytury" w tej branży – miejsce, gdzie Twoje archiwum treści staje się Twoim największym aktywem.',
      features: ['Video Store pasywny', 'Custom Video Requests', 'MV Crush subs', 'SEO w Google'],
    },
    JustForFans: {
      desc: 'Platforma subskrypcyjna stworzona przez twórców dla twórców, znana z najbardziej liberalnego regulaminu w branży. JustForFans pozwala na publikację dosłownie każdego rodzaju legalnych treści dla dorosłych, bez restrykcji charakterystycznych dla OnlyFans. Platforma oferuje aż 75% przychodów dla twórcy, co jest jednym z najwyższych wskaźników w branży. Dedykowany i zaangażowany support, system kolaboracji z innymi twórcami oraz możliwość sprzedaży własnych merchy sprawiają, że JFF to idealne miejsce dla twórców szukających platformy bez ograniczeń.',
      features: ['75% przychodów twórcy', 'Zero cenzury treści', 'Creator collabs', 'Merch store'],
    },
    FanCentro: {
      desc: 'Unikalna platforma agregująca, która pozwala zarządzać wieloma platformami monetyzacji w jednym miejscu. FanCentro oferuje własną platformę subskrypcyjną, narzędzia do zarządzania Instagramem, Snapchatem i Twitterem Premium, oraz zaawansowany system funnelu sprzedażowego. Dedykowany manager sukcesu pomaga w opracowaniu strategii i optymalizacji zarobków. To idealne rozwiązanie dla twórców, którzy chcą skonsolidować swoje przychody z wielu kanałów w jednym, przejrzystym panelu.',
      features: ['Multi-platform hub', 'Social media mgmt', 'Dedicated success mgr', 'Sales funnel tools'],
    },
    Patreon: {
      desc: 'Największa platforma subskrypcyjna na świecie, nie dedykowana wyłącznie treściom adult, ale niezwykle potężna jako narzędzie budowania społeczności. Patreon pozwala na tworzenie wielu poziomów subskrypcji z różnymi benefitami, od newsletterów po ekskluzywne treści i dostęp do prywatnej społeczności. Jest to idealne miejsce do monetyzacji treści lifestyle, edukacji o branży, behind-the-scenes i contentu SFW przyciągającego szerszą publiczność.',
      features: ['Multi-tier subs', 'Community building', 'SFW & adult mix', 'Creator tools'],
    },
    Pornhub: {
      desc: 'Największa platforma tube na świecie z ponad 130 milionami odwiedzin dziennie. Model Verified Amateurs pozwala twórcom na monetyzację przez system reklam i premium treści (Pornhub Premium). Służy jako potężny funnel generujący ruch na płatne platformy – link w bio przynosi tysiące kliknięć miesięcznie. Platforma posiada również własny program partnerski i możliwość sprzedaży klipów. Obecność na Pornhub to kluczowy element SEO w branży adult.',
      features: ['130M wizyt/dzień', 'Verified Amateurs', 'Traffic funnel #1', 'Premium content'],
    },
    xVideos: {
      desc: 'Jedna z największych platform tube na świecie, szczególnie popularna w Europie, Ameryce Łacińskiej i Azji. Model Red Girls pozwala na monetyzację treści przez reklamy i subskrypcje premium. xVideos oferuje jeden z najlepszych systemów SEO w branży – dobrze zoptymalizowane wideo może trafiać na pierwszą stronę Google. Platforma dostarcza szczegółowe statystyki i posiada aktywną społeczność komentujących, co pomaga w budowaniu lojalności widzów.',
      features: ['Red Girls program', 'Europa & LatAm traffic', 'SEO Google top results', 'Detailed analytics'],
    },
    xHamster: {
      desc: 'Platforma tube z wyjątkowo silną społecznością i systemem gamifikacji. xHamster posiada własny program monetyzacji dla twórców, aktywne forum dyskusyjne oraz unikalny system "Hamster points" nagradzający aktywność. Platforma jest znana z otwartości na różnorodność treści i niszy, co czyni ją idealnym miejscem dla twórców z niekonwencjonalnymi niszami. Fan Page na xHamster pozwala na bezpośrednią komunikację z widzami.',
      features: ['Creator monetization', 'Strong community', 'Fan Pages', 'Diverse niches'],
    },
    'AVN Stars': {
      desc: 'Platforma subskrypcyjna i tube stworzona przez wydawców magazynu AVN – biblii branży adult. AVN Stars daje twórcom niesamowity prestiż i dostęp do branżowych nagród i nominacji. Platforma posiada najbardziej zaangażowaną publiczność spośród hardcorowych fanów branży, którzy traktują twórców jak gwiazdy. Obecność na AVN Stars to sygnał profesjonalizmu i jakości. Regularne nagrody AVN Awards zwiększają ekspozycję najaktywniejszych twórców.',
      features: ['Industry prestige', 'AVN Awards exposure', 'Hardcore fan base', 'Professional cred'],
    },
    'Twitter / X': {
      desc: 'Główna arteria ruchu dla całej branży adult content. Twitter to miejsce, gdzie buduje się networking, nawiązuje relacje z innymi twórcami i przede wszystkim przyciąga fanów do płatnych platform jak OnlyFans czy Fansly. Bez aktywnego konta na Twitterze, twórca jest praktycznie niewidoczny w cyfrowym świecie. Wykorzystanie odpowiednich hashtagów, udział w Twitter Spaces oraz strategiczne przypinanie postów z linkami to absolutna podstawa marketingu. To tutaj bije serce społeczności twórców, gdzie można wymieniać się doświadczeniami i budować rozpoznawalność marki osobistej na skalę globalną.',
      features: ['Hashtag networking', 'Pinned tweet funnel', 'Twitter Spaces', 'Industry community'],
    },
    Reddit: {
      desc: 'Najlepsze źródło darmowego ruchu dla par. Reddit to potężne narzędzie, które przy odpowiednim podejściu potrafi generować tysiące wejść dziennie na Twoje płatne profile. Kluczem jest tu budowanie "karmy", weryfikacja na niszowych subredditach oraz publikowanie angażujących, autentycznych treści. Reddit ceni autentyczność bardziej niż profesjonalne sesje, dlatego jest to idealne miejsce na budowanie relacji z fanami, którzy szukają czegoś więcej niż tylko obrazu. Nasz zespół pomaga w procesie weryfikacji i doradza, gdzie i kiedy postować, aby zmaksymalizować konwersję.',
      features: ['Niche subreddits', 'Karma building', 'Verified creator', 'Direct traffic funnel'],
    },
    'TikTok / Instagram': {
      desc: 'Platformy służące do budowania świadomości marki i przyciągania masowego ruchu ze świata SFW (Safe For Work). Na TikTok i Instagramie stawiamy na lifestyle, estetykę i budowanie więzi emocjonalnej z widzem, kierując go strategicznie do "linku w bio". To tutaj tworzy się lejek sprzedażowy, który z przypadkowego widza robi lojalnego subskrybenta. Dzięki wykorzystaniu trendów, odpowiedniej muzyki i profesjonalnego montażu, Twoje profile mogą osiągać miliony wyświetleń, stając się potężnym silnikiem napędowym dla Twojego biznesu adult.',
      features: ['Lifestyle content', 'Brand personality', 'Massive reach SFW', 'Linktree integration'],
    },
  },
};

export const academy: Messages<typeof en> = { en, pl };
