// ─── PRODUCER PROFILE TEMPLATES ──────────────────────────────────────────────
// Użyj tych szablonów do szybkiego tworzenia nowych profili twórców
// Zamiast `[IMIĘ]` wstaw prawdziwe imię twórcy
// Każdy szablon zawiera kompletną strukturę i wskazówki

export interface ProfileTemplate {
  id: string;
  templateName: string;
  type: 'solo-female' | 'solo-male' | 'couple';
  description: string;
  idealFor: string[];
  earnings: { min: string; max: string };
  minExperience: string;
  platform: {
    name: string;
    commission: string;
    bestFor: string;
  }[];
}

export interface CreatorProfile {
  handle: string;
  type: 'couple' | 'solo';
  name: string;
  tagline: string;
  eyebrow: string;
  bio: string;
  stats: { val: string; label: string }[];
  platforms: { name: string; url: string; color: string; icon: string }[];
  plans: { name: string; price: string; period: string; desc: string; perks: string[]; featured: boolean }[];
  schedule: { day: string; time: string; active: boolean }[];
  testimonials: { text: string; name: string; since: string }[];
  contentCount: number;
  isLive: boolean;
  measurements?: { height: string; weight: string; bust: string; waist: string; hips: string };
  specialties?: string[];
}

// ════════════════════════════════════════════════════════════════════════════════
// TEMPLATE 1: SOLO FEMALE - ELEGANCE & INTIMACY
// Idealna dla: kobiet które chcą budować relacje z fanami, personalizowanych treści
// Zarabianie: $3k-$8k/miesiąc
// ════════════════════════════════════════════════════════════════════════════════

export const TEMPLATE_SOLO_FEMALE_ELEGANCE: CreatorProfile = {
  handle: '[HANDLE-FEMALE]',
  type: 'solo',
  name: '[IMIĘ] [NAZWISKO]',
  tagline: 'Autentyczność & Intymność',
  eyebrow: 'Premium Creator — Polska — Studio HRL Adult',
  bio: 'Tworzę wartościowe treści łączące elegancję z autentycznością. Specjalizuję się w budowaniu głębokich relacji z fanami poprzez spersonalizowane wiadomości, custom video i live sessions. Każda interakcja to dla mnie ważna.',
  stats: [
    { val: '2.1k+', label: 'Subskrybentów' },
    { val: '150+', label: 'Treści' },
    { val: '98%', label: 'Zadowolonych' },
  ],
  platforms: [
    { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
    { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
  ],
  plans: [
    {
      name: 'Supporter',
      price: '$4.99',
      period: '/mies.',
      desc: 'Podstawowy dostęp do moich treści',
      perks: ['Tygodniowe zdjęcia', 'Wiadomości prywatne', 'Story updates'],
      featured: false,
    },
    {
      name: 'Premium Subscriber',
      price: '$9.99',
      period: '/mies.',
      desc: 'Pełny dostęp do wszystkich materiałów',
      perks: ['Wszystkie wideo', 'Custom requests', 'Priority messaging', 'Weekly live session dostęp'],
      featured: true,
    },
    {
      name: 'VIP Companion',
      price: '$29.99',
      period: '/mies.',
      desc: 'Osobisty dostęp i spersonalizowana atencja',
      perks: ['Wszystko z Premium', 'Prywatne 1-on-1 video calls', 'Personalized content', 'Birthday specials'],
      featured: false,
    },
  ],
  schedule: [
    { day: 'Wt', time: '20:00', active: true },
    { day: 'Cz', time: '19:30', active: false },
    { day: 'Pt', time: '21:00', active: true },
    { day: 'So', time: '20:30', active: false },
    { day: 'Nd', time: '19:00', active: false },
  ],
  testimonials: [
    {
      text: 'Czuję się jak osoba, a nie tylko fanów numerem. [IMIĘ] pamiętać moje rzeczy, wysyła mi spersonalizowane wiadomości - to jest inna liga.',
      name: 'LongTermFan',
      since: 'Fan od 10 miesięcy',
    },
    {
      text: 'Najlepsza komunikacja jaką dostałem od twórcy. Custom video zrobione dokładnie tak jak chciałem, z profesjonalnym podejściem.',
      name: 'VerifiedSupporter',
      since: 'Fan od 6 miesięcy',
    },
    {
      text: 'To nie jest transakcja - to naprawdę relacja. Polecam wszystkim którzy szukają czegoś więcej niż zwykły content.',
      name: 'regulary_viewer',
      since: 'Fan od 1 roku',
    },
  ],
  contentCount: 12,
  isLive: false,
  measurements: {
    height: '[WZROST cm]',
    weight: '[WAGA kg]',
    bust: '[BIUST cm]',
    waist: '[TALIA cm]',
    hips: '[BIODRA cm]',
  },
  specialties: ['Personalized content', 'Custom videos', 'Intimate conversations', 'Live sessions'],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEMPLATE 2: SOLO FEMALE - GLAMOUR & LUXURY ART
// Idealna dla: modelek, artystek, twórców high-end content
// Zarabianie: $5k-$15k/miesiąc
// ════════════════════════════════════════════════════════════════════════════════

export const TEMPLATE_SOLO_FEMALE_GLAMOUR: CreatorProfile = {
  handle: '[HANDLE-LUXURY]',
  type: 'solo',
  name: '[IMIĘ] [NAZWISKO]',
  tagline: 'Luxury Art & Elegance',
  eyebrow: 'Professional Model & Artist — Premium Creator — Studio HRL Adult',
  bio: 'Jestem artystką i modelką specjalizującą się w fotografii premium i artystycznych treściach. Moja praca łączy elegancję, profesjonalizm i zmysłowość. Każda produkcja to dzieło sztuki stworzone z dbałością o każdy szczegół.',
  stats: [
    { val: '5.2k+', label: 'Obserwujących' },
    { val: '250+', label: 'Dzieł artystycznych' },
    { val: '99%', label: 'Owoce pracy' },
  ],
  platforms: [
    { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
    { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
    { name: 'ManyVids', url: '#', color: '#FF6B35', icon: '🎬' },
  ],
  plans: [
    {
      name: 'Art Collector',
      price: '$6.99',
      period: '/mies.',
      desc: 'Dostęp do wybranej kolekcji artystycznej',
      perks: ['120+ artystycznych zdjęć', 'Tygodniowe premiery', 'Behind the scenes'],
      featured: false,
    },
    {
      name: 'Patron',
      price: '$16.99',
      period: '/mies.',
      desc: 'Pełny dostęp do wszystkich treści premium',
      perks: ['Wszystkie wideo 4K', 'Exclusive photoshoots', 'Live session 2x/mies.', 'Priority custom requests'],
      featured: true,
    },
    {
      name: 'VIP Artist Supporter',
      price: '$49.99',
      period: '/mies.',
      desc: 'Ekskluzywna współpraca i artystyczna wizja',
      perks: ['Prywatne sesje fotograficzne', 'Custom art direction', 'Personal mentions', '1-on-1 consultations'],
      featured: false,
    },
  ],
  schedule: [
    { day: 'Wt', time: '18:00', active: true },
    { day: 'Cz', time: '19:00', active: false },
    { day: 'Pt', time: '20:00', active: true },
    { day: 'So', time: '19:30', active: false },
    { day: 'Nd', time: '17:00', active: false },
  ],
  testimonials: [
    {
      text: '[IMIĘ] tworzą coś zupełnie innego. To są prawdziwe dzieła sztuki, a nie zwykły content. Zaskakuję moim zmysłem artystycznym i skrupulatności.',
      name: 'ArtEnthusiast_EU',
      since: 'Fan od 1.5 roku',
    },
    {
      text: 'Profesjonalne podejście na najwyższym poziomie. Jakość zdjęć i filmów jest naukowa, a czy jest inspirujący.',
      name: 'PhotographyFan',
      since: 'Fan od 11 miesięcy',
    },
    {
      text: 'To jest na zupełnie innym poziomie niż inne twórcy. Warto każdy złoty. Polecam artystom i wszystkim którzy cenią sobie piękno.',
      name: 'PremiumCollector',
      since: 'Fan od 8 miesięcy',
    },
  ],
  contentCount: 18,
  isLive: false,
  measurements: {
    height: '[WZROST cm]',
    weight: '[WAGA kg]',
    bust: '[BIUST cm]',
    waist: '[TALIA cm]',
    hips: '[BIODRA cm]',
  },
  specialties: ['Artistic photography', 'High-end content', 'Fashion shoots', 'Luxury branding'],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEMPLATE 3: COUPLE - AUTHENTIC CHEMISTRY
// Idealna dla: par z naturalną chemią, wynalazcze podejście
// Zarabianie: $8k-$25k/miesiąc
// ════════════════════════════════════════════════════════════════════════════════

export const TEMPLATE_COUPLE_CHEMISTRY: CreatorProfile = {
  handle: '[HANDLE-COUPLE]',
  type: 'couple',
  name: '[IMIĘ #1] & [IMIĘ #2]',
  tagline: 'Autentyczna chemia & Wspólna passion',
  eyebrow: 'Prawdziwa Para — Polska — Studio HRL Adult',
  bio: 'Jesteśmy parą która dzieli pasję do tworzenia szczerych, zmysłowych treści. Nasza chemia jest naturalna, a nasze treści odzwierciedlają prawdziwą intymność i zabawę. Nie ma tu scenariuszy - tylko my, nasza relacja i wy.',
  stats: [
    { val: '3.8k+', label: 'Subskrybentów' },
    { val: '210+', label: 'Filmów & sesji' },
    { val: '99%', label: 'Zadowolonych' },
  ],
  platforms: [
    { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
    { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
    { name: 'ManyVids', url: '#', color: '#FF6B35', icon: '🎬' },
  ],
  plans: [
    {
      name: 'Couple Friend',
      price: '$7.99',
      period: '/mies.',
      desc: 'Podstawowy dostęp do naszych przygód',
      perks: ['60+ zdjęć miesięcznie', 'Klipy SFW & teasery', 'Private messaging'],
      featured: false,
    },
    {
      name: 'Intimate Insider',
      price: '$14.99',
      period: '/mies.',
      desc: 'Pełny dostęp do wszystkich treści',
      perks: ['Wszystkie filmy HD/4K', 'Live sessions 2x/tydz.', 'Custom video requests', 'Behind-the-scenes'],
      featured: true,
    },
    {
      name: 'VIP Experience',
      price: '$39.99',
      period: '/mies.',
      desc: 'Ekskluzywne doświadczenie z osobistym kontaktem',
      perks: ['Prywatne video sessions', 'Custom movie production', 'Personalize content', 'Direct telegram access'],
      featured: false,
    },
  ],
  schedule: [
    { day: 'Wt', time: '21:00', active: true },
    { day: 'Cz', time: '20:30', active: false },
    { day: 'Pt', time: '22:00', active: true },
    { day: 'So', time: '21:30', active: true },
    { day: 'Nd', time: '20:00', active: false },
  ],
  testimonials: [
    {
      text: 'To jest autorytef! Widzieć jak naprawdę się lubią i jak mogą się bawić razem - to jest rare i piękne. Najlepsza para którą obserwuję.',
      name: 'CoupleEnthusiast',
      since: 'Fan od 1 roku',
    },
    {
      text: 'Ich chemia jest tak naturalna że aż boli. Nie widzieć żadnych udawań lub scenariuszy. Po prostu dwie osoby które się kochają i dzielą się tym światem.',
      name: 'AuthenticityFan',
      since: 'Fan od 8 miesięcy',
    },
    {
      text: 'Custom video było absolutnym szaleństwem! Wiedziały dokładnie co zrobić, profesjonalne, zmysłowe i perfekcyjnie oddane. Będę zamawiać więcej!',
      name: 'RegularSupporter',
      since: 'Fan od 6 miesięcy',
    },
  ],
  contentCount: 15,
  isLive: true,
  specialties: ['Authentic chemistry', 'Couple dynamics', 'Creative roleplay', 'Live performance'],
};

// ════════════════════════════════════════════════════════════════════════════════
// TEMPLATE PORADNIK - JAK UŻYWAĆ
// ════════════════════════════════════════════════════════════════════════════════

export const TEMPLATE_GUIDE = {
  description: `
    INSTRUKCJA: Jak używać szablonów profili
    
    1. WYBRANIE SZABLONU:
       - Solo Female Elegance: Dla twórców które chcą fokus na relacje i komunikacji
       - Solo Female Glamour: Dla modelek/artystek z high-end approach
       - Couple Chemistry: Dla par z naturalną chemią
    
    2. PERSONALIZACJA:
       - Zamień wszystkie [IMIĘ], [HANDLE], [WZROST] itp. na dane twórcy
       - Dostosuj opisy do osobowości i specjalizacji twórcy
       - Zmień ceny w planach (mogą się różnić w zależności od market position)
       - Dostosuj harmonogram do rzeczywistych czasów dostępności
    
    3. STATYSTYKI:
       - Nowe profil: start z 0 subskrybentów, stopniowe wzrastanie
       - Twórcy z doświadczeniem: wykorzystaj ich rzeczywiste statystyki
       - Content count: wzrasta o 2-3 materiały dziennie
    
    4. PLATFORMY:
       - Nowe profil: zaczyć z 2 platformy (OnlyFans + Fansly)
       - Po 2-3 miesiące: dodaj trzecią platformę
       - Adaptatywny tekst do platformy i zawartości
    
    5. CENY PLANÓW:
       - Nowe twórcy: niższe ceny ($3.99-$9.99 range)
       - Doświadczeni: średnie ceny ($7.99-$19.99)
       - Premium/Luxury: wyższe ceny ($15.99-$49.99+)
    
    6. TESTIMONIALS:
       - Napisz realistyczne opinie od fanów
       - Zawsze zawrz "czas obserwowania"
       - Podkreśl unikalne cechy twórcy
       - Mix: zachwyt jakością, relacją, komunikacją
    
    7. MIARY DAMSKIE (jeśli dotyczy):
       - Typowy zakres: 160-180cm wzrostu
       - Biust: 80-100cm, Talia: 55-75cm, Biodra: 85-105cm
       - Zawsze realiste i zmienne
    
    8. HARMONOGRAM:
       - Nowe: 2-3 dni tygodniowo
       - Regularne: 3-5 dni tygodniowo  
       - Premium: 5-7 dni tygodniowo lub daily
    
    KOPIUJ TEMPLATE → ZMIEŃ DANE → DODAJ DO PROFILI
  `,
  tips: [
    'Zawsze używaj rzeczywistych imion dla wiarygodności',
    'Testimonialsy piszą realiści - brzmieć authentycznie',
    'Ceny niższe = szybszy grow; Ceny wyższe = lepszy quality signal',
    'Harmonogram musi być osiągalny dla twórcy',
    'Zmień emoji jeśli odpadadają innym stylów',
    'Specjalizacje powinny być realistyczne dla twórcy',
  ],
};

// ════════════════════════════════════════════════════════════════════════════════
// EXPORT ALL TEMPLATES
// ════════════════════════════════════════════════════════════════════════════════

export const ALL_PROFILE_TEMPLATES = [
  {
    id: 'solo-female-elegance',
    template: TEMPLATE_SOLO_FEMALE_ELEGANCE,
    guide: 'Szablon dla twórczyń skupionych na relacjach, personalizacji i komunikacji z fanami. Idealna dla twórców z doświadczeniem lub naturalnym talentem do komunikacji.',
  },
  {
    id: 'solo-female-glamour',
    template: TEMPLATE_SOLO_FEMALE_GLAMOUR,
    guide: 'Szablon dla modelek/artystek z wysokimi standartami i high-end content. Wymaga inwestycji w producję, fotografia i styling - ale zwraca znacznie więcej.',
  },
  {
    id: 'couple-chemistry',
    template: TEMPLATE_COUPLE_CHEMISTRY,
    guide: 'Szablon dla par z rzeczywista chemią i entuzjazmem do wspólnego tworzenia. Biggest earning potential ale wymaga dużej komunikacji i synchronizacji między partnerami.',
  },
];
