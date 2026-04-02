// Platform Data
export const PLATFORMS = [
  // Live Cam Platforms
  {
    id: 'chaturbate',
    name: 'Chaturbate',
    type: 'live-cam' as const,
    icon: '🔴',
    description: 'Największa platforma live cam na świecie z systemem tokenów',
    features: [
      'Tokeny system - 1 token = $0.05 dla modelki',
      'Private shows - 6-90 tokens/minuta (30-450 zł)',
      'Tip menu - niestandardowe żądania od 10-500 tokenów',
      'Apps & Bots - automatyzacja i interaktywne gry',
      'CamSplitter - praca na wielu platformach jednocześnie',
      'Payment methods - Paxum, Cosmo, ePayments, wire transfer',
      'Payout schedule - cotygodniowe, minimum $50',
      'Traffic - globalny, głównie USA i Europa Zachodnia'
    ],
    paymentMethods: ['Paxum', 'Cosmo', 'ePayments', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 50,
    traffic: 'Global',
    status: 'disconnected' as const
  },
  {
    id: 'stripchat',
    name: 'Stripchat',
    type: 'live-cam' as const,
    icon: '🎭',
    description: 'Nowoczesna platforma z VR i wysokimi wypłatami',
    features: [
      'VR shows - wirtualna rzeczywistość, 2x wyższe zarobki',
      'High payouts - do 80% dla najlepszych modelek',
      'Mobile friendly - pełna funkcjonalność na telefonach',
      'Good traffic - rosnąca baza użytkowników globalnych',
      'Token system - 1 token = $0.055 dla modelki',
      'Private shows - 8-80 tokens/minuta (40-400 zł)',
      'Payment methods - Paxum, wire transfer, crypto',
      'Special features - spy shows, group shows, ticket events'
    ],
    paymentMethods: ['Paxum', 'Wire Transfer', 'Crypto'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 25,
    revenueShare: 60,
    traffic: 'Global',
    status: 'disconnected' as const
  },
  {
    id: 'livejasmin',
    name: 'LiveJasmin',
    type: 'live-cam' as const,
    icon: '💎',
    description: 'Premium live cam experience z klientami high-end',
    features: [
      'High-end clients - klienci premium z wyższych zarobków',
      'Professional setup - wymagana wysoka jakość sprzętu',
      'Quality focus - HD jakość obowiązkowa, 4K preferowane',
      'Stable income - regularni klienci, dłuższe prywatne sesje',
      'Credit system - 1 credit = $1, 30-60% dla modelki',
      'Private shows - 0.98-4.98 credits/minuta (30-150 zł)',
      'Payment methods - wire transfer, ePayouts, Payoneer',
      'Support - dedykowany support dla modelek premium'
    ],
    paymentMethods: ['Wire Transfer', 'ePayouts', 'Payoneer'],
    payoutSchedule: 'Dwutygodniowo',
    minPayout: 100,
    revenueShare: 45,
    traffic: 'Premium',
    status: 'disconnected' as const
  },
  {
    id: 'bongacams',
    name: 'BongaCams',
    type: 'live-cam' as const,
    icon: '🌟',
    description: 'Popularna w Europie z wielojęzykowym supportem',
    features: [
      'European traffic - głównie Europa Wschodnia i Centralna',
      'Multiple languages - polski, rosyjski, angielski, niemiecki',
      'Regular contests - cotygodniowe konkursy z nagrodami',
      'Good support - 24/7 support w wielu językach',
      'Token system - 1 token = $0.05 dla modelki',
      'Private shows - 2-32 tokens/minuta (10-160 zł)',
      'Payment methods - WebMoney, Paxum, wire transfer',
      'Revenue share - do 60% dla nowych modelek'
    ],
    paymentMethods: ['WebMoney', 'Paxum', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 60,
    traffic: 'Europe',
    status: 'disconnected' as const
  },
  {
    id: 'myfreecams',
    name: 'MyFreeCams',
    type: 'live-cam' as const,
    icon: '🎪',
    description: 'Klasyczna platforma live z systemem camscore',
    features: [
      'Token system - 1 token = $0.05 dla modelki',
      'Camscore - algorytm rankingowy wpływający na widoczność',
      'Miss MFC contests - miesięczne konkursy z nagrodami',
      'Loyal community - stała baza lojalnych klientów',
      'Group shows - 10 tokens/minuta, podział zarobków',
      'Private shows - 60 tokens/minuta (300 zł)',
      'Payment methods - check, wire transfer, Payoneer',
      'VIP status - program VIP dla najlepszych modelek'
    ],
    paymentMethods: ['Check', 'Wire Transfer', 'Payoneer'],
    payoutSchedule: 'Miesięcznie',
    minPayout: 50,
    revenueShare: 50,
    traffic: 'Established',
    status: 'disconnected' as const
  },
  {
    id: 'cam4',
    name: 'Cam4',
    type: 'live-cam' as const,
    icon: '🎨',
    description: 'Przyjazna dla początkujących z aplikacją mobilną',
    features: [
      'Easy start - niskie wymagania techniczne',
      'Good traffic - globalny ruch z USA i Europy',
      'Mobile app - pełna funkcjonalność na iOS/Android',
      'Weekly payouts - cotygodniowe wypłaty, minimum $50',
      'Token system - 1 token = $0.10 dla modelki',
      'Private shows - 8-40 tokens/minuta (80-400 zł)',
      'Payment methods - Paxum, ePayouts, wire transfer',
      'Features - spy mode, group shows, tipping'
    ],
    paymentMethods: ['Paxum', 'ePayouts', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 60,
    traffic: 'Global',
    status: 'disconnected' as const
  },
  {
    id: 'flirt4free',
    name: 'Flirt4Free',
    type: 'live-cam' as const,
    icon: '🎯',
    description: 'Premium live experience z klientami VIP',
    features: [
      'VIP clients - klienci premium z wysokimi wydatkami',
      'High quality - HD jakość wymagana, 4K premiowana',
      'Professional - profesjonalne podejście do biznesu',
      'Good earnings - wysokie zarobki w prywatnych pokojach',
      'Credit system - 1 credit = $1, 30-35% dla modelki',
      'Private shows - 2.99-9.99 credits/minuta (30-100 zł)',
      'Payment methods - check, wire transfer, Payoneer',
      'Contests - regularne konkursy z nagrodami pieniężnymi'
    ],
    paymentMethods: ['Check', 'Wire Transfer', 'Payoneer'],
    payoutSchedule: 'Dwutygodniowo',
    minPayout: 50,
    revenueShare: 32,
    traffic: 'Premium',
    status: 'disconnected' as const
  },
  {
    id: 'streamate',
    name: 'Streamate',
    type: 'live-cam' as const,
    icon: '🌙',
    description: 'Duża platforma amerykańska z różnymi kategoriami',
    features: [
      'US traffic - głównie ruch z USA i Kanady',
      'Multiple categories - różne kategorie i nisze',
      'Stable platform - stabilna technologia i duży ruch',
      'Regular income - przewidywalne zarobki',
      'Gold system - 1 gold = $1, 30-70% dla modelki',
      'Private shows - 2.99-9.99 gold/minuta (30-100 zł)',
      'Payment methods - check, wire transfer, Payoneer',
      'Features - gold shows, party chat, voyeur mode'
    ],
    paymentMethods: ['Check', 'Wire Transfer', 'Payoneer'],
    payoutSchedule: 'Dwutygodniowo',
    minPayout: 50,
    revenueShare: 50,
    traffic: 'US/Canada',
    status: 'disconnected' as const
  },
  {
    id: 'cams',
    name: 'Cams.com',
    type: 'live-cam' as const,
    icon: '🎬',
    description: 'Nowoczesna platforma z zaawansowanymi funkcjami',
    features: [
      'Modern interface - nowoczesny interfejs użytkownika',
      'Advanced features - interaktywne zabawki, kontrola zdalna',
      'Good traffic - rosnąca baza użytkowników',
      'Revenue share - do 60% dla modelek',
      'Credit system - 1 credit = $0.80 dla modelki',
      'Private shows - 2-8 credits/minuta (16-64 zł)',
      'Payment methods - check, wire transfer, Paxum',
      'Mobile app - pełna funkcjonalność mobilna'
    ],
    paymentMethods: ['Check', 'Wire Transfer', 'Paxum'],
    payoutSchedule: 'Dwutygodniowo',
    minPayout: 50,
    revenueShare: 50,
    traffic: 'Growing',
    status: 'disconnected' as const
  },
  {
    id: 'imlive',
    name: 'ImLive',
    type: 'live-cam' as const,
    icon: '🎭',
    description: 'Jedna z najstarszych platform z lojalną społecznością',
    features: [
      'Established platform - działająca od 2002 roku',
      'Loyal community - lojalna baza stałych klientów',
      'Multiple categories - różne nisze i kategorie',
      'Credit system - 1 credit = $1, 30-60% dla modelki',
      'Private shows - 0.98-4.98 credits/minuta (30-150 zł)',
      'Payment methods - check, wire transfer, Payoneer',
      'Features - candy shows, multi-viewer, fan clubs',
      'Support - 24/7 support w wielu językach'
    ],
    paymentMethods: ['Check', 'Wire Transfer', 'Payoneer'],
    payoutSchedule: 'Dwutygodniowo',
    minPayout: 50,
    revenueShare: 45,
    traffic: 'Established',
    status: 'disconnected' as const
  },
  // Fansite Platforms
  {
    id: 'onlyfans',
    name: 'OnlyFans',
    type: 'fansite' as const,
    icon: '🔥',
    description: 'Najpopularniejsza platforma fansite z subskrypcjami miesięcznymi',
    features: [
      'Monthly subscriptions - $5-$50 miesięcznie na subskrypcję',
      'PPV content - pay-per-view treści od $3-$100+',
      'Tips & messaging - napiwki i prywatne wiadomości',
      'High earnings - do 80% przychodów dla twórców',
      'Payment methods - bank transfer, Paxum, ePayments',
      'Payout schedule - cotygodniowe, minimum $20',
      'Traffic - globalny, głównie USA i Europa',
      'Features - stories, live streaming, referral program'
    ],
    paymentMethods: ['Bank Transfer', 'Paxum', 'ePayments'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 20,
    revenueShare: 80,
    traffic: 'Global',
    status: 'disconnected' as const
  },
  {
    id: 'fansly',
    name: 'Fansly',
    type: 'fansite' as const,
    icon: '💫',
    description: 'Nowa konkurencja OnlyFans z tier subscriptions i lepszym interfejsem',
    features: [
      'Tier subscriptions - 3 poziomy subskrypcji ($5/$10/$25)',
      'Good interface - nowoczesny i przyjazny UI',
      'Growing fast - szybko rosnąca platforma',
      'Creator friendly - polityka przyjazna twórcom',
      'PPV content - treści pay-per-view',
      'Payment methods - bank transfer, crypto',
      'Payout schedule - cotygodniowe, minimum $25',
      'Features - timeline, media bundles, custom requests'
    ],
    paymentMethods: ['Bank Transfer', 'Crypto'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 25,
    revenueShare: 80,
    traffic: 'Growing',
    status: 'disconnected' as const
  },
  {
    id: 'manyvids',
    name: 'ManyVids',
    type: 'fansite' as const,
    icon: '🎬',
    description: 'Platforma treści wideo z focus na custom videos i contests',
    features: [
      'Video sales - sprzedaż indywidualnych wideo',
      'Custom requests - zamówienia indywidualne treści',
      'Contests - regularne konkursy z nagrodami',
      'Community - aktywna społeczność twórców',
      'Revenue share - 60-80% dla twórców',
      'Payment methods - Paxum, wire transfer, check',
      'Payout schedule - cotygodniowe, minimum $50',
      'Features - MV Crush, VidCon, fan clubs'
    ],
    paymentMethods: ['Paxum', 'Wire Transfer', 'Check'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 70,
    traffic: 'Community',
    status: 'disconnected' as const
  },
  {
    id: 'admirme',
    name: 'AdmireMe',
    type: 'fansite' as const,
    icon: '💎',
    description: 'Europejska alternatywa z przyjaznym podejściem do twórców',
    features: [
      'EU friendly - zgodność z europejskimi przepisami',
      'Good payouts - do 80% przychodów dla twórców',
      'Support - 24/7 support dla twórców',
      'Growing - szybko rozwijająca się platforma',
      'Subscription model - miesięczne subskrypcje',
      'Payment methods - SEPA, wire transfer',
      'Payout schedule - cotygodniowe, minimum €20',
      'Features - PPV, messaging, fan clubs'
    ],
    paymentMethods: ['SEPA', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 20,
    revenueShare: 80,
    traffic: 'Europe',
    status: 'disconnected' as const
  },
  {
    id: 'fancentro',
    name: 'FanCentro',
    type: 'fansite' as const,
    icon: '🌟',
    description: 'Social media integration z bundle subscriptions',
    features: [
      'Social bundles - dostęp do wielu platform',
      'Multiple platforms - integracja z Instagram, Twitter',
      'Good tools - narzędzia marketingowe i analityczne',
      'Marketing help - wsparcie w promocji',
      'Revenue share - 75% dla twórców',
      'Payment methods - Paxum, wire transfer',
      'Payout schedule - cotygodniowe, minimum $50',
      'Features - snap chat premium, premium social'
    ],
    paymentMethods: ['Paxum', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 75,
    traffic: 'Social',
    status: 'disconnected' as const
  },
  {
    id: 'justforfans',
    name: 'JustForFans',
    type: 'fansite' as const,
    icon: '👑',
    description: 'Platforma stworzona przez twórców dla twórców',
    features: [
      'Creator owned - własność twórców',
      'High payouts - do 80% przychodów',
      'Multiple content types - wideo, zdjęcia, live',
      'Good traffic - rosnąca baza użytkowników',
      'Subscription model - miesięczne subskrypcje',
      'Payment methods - wire transfer, check',
      'Payout schedule - cotygodniowe, minimum $50',
      'Features - PPV, messaging, live streaming'
    ],
    paymentMethods: ['Wire Transfer', 'Check'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 80,
    traffic: 'Creator-focused',
    status: 'disconnected' as const
  },
  {
    id: 'avnstars',
    name: 'AVN Stars',
    type: 'fansite' as const,
    icon: '💰',
    description: 'Platforma od AVN z integracją z branżą porno',
    features: [
      'Industry integration - powiązania z AVN',
      'Good traffic - dostęp do bazy fanów AVN',
      'Multiple content types - wideo, zdjęcia, tekst',
      'Revenue share - 65-80% dla twórców',
      'Subscription model - miesięczne subskrypcje',
      'Payment methods - Paxum, wire transfer',
      'Payout schedule - cotygodniowe, minimum $50',
      'Features - PPV, messaging, contests'
    ],
    paymentMethods: ['Paxum', 'Wire Transfer'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 72,
    traffic: 'Industry',
    status: 'disconnected' as const
  },
  {
    id: 'ismygirl',
    name: 'IsMyGirl',
    type: 'fansite' as const,
    icon: '🎯',
    description: 'Platforma z focus na girlfriend experience',
    features: [
      'GFE focus - girlfriend experience',
      'High engagement - wysokie zaangażowanie fanów',
      'Good payouts - do 80% przychodów',
      'Mobile first - optymalizacja mobilna',
      'Subscription model - miesięczne subskrypcje',
      'Payment methods - wire transfer, check',
      'Payout schedule - cotygodniowe, minimum $50',
      'Features - messaging, PPV, live shows'
    ],
    paymentMethods: ['Wire Transfer', 'Check'],
    payoutSchedule: 'Cotygodniowo',
    minPayout: 50,
    revenueShare: 80,
    traffic: 'GFE-focused',
    status: 'disconnected' as const
  }
];

// Categories
export const CATEGORIES = [
  'Solo',
  'Couples',
  'Lesbian',
  'Gay',
  'BDSM',
  'Fetish',
  'Anal',
  'Oral',
  'Group',
  'Roleplay',
  'Domination',
  'Submission',
  'Cosplay',
  'Interactive',
  'VR'
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: 'Początkujący' },
  { value: 'intermediate', label: 'Średniozaawansowany' },
  { value: 'advanced', label: 'Zaawansowany' },
  { value: 'expert', label: 'Ekspert' }
];

// Equipment
export const EQUIPMENT_OPTIONS = [
  'HD Webcam',
  '4K Webcam',
  'Ring Light',
  'Softbox Lights',
  'Microphone',
  'Green Screen',
  'Toys',
  'Lingerie',
  'Props',
  'High-speed Internet'
];

// Availability
export const AVAILABILITY_OPTIONS = [
  'Weekday Mornings',
  'Weekday Afternoons',
  'Weekday Evenings',
  'Weekend Mornings',
  'Weekend Afternoons',
  'Weekend Evenings',
  'Flexible',
  'On Call'
];

// Content Types
export const CONTENT_TYPES = [
  { value: 'video', label: 'Wideo' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'guide', label: 'Przewodnik' }
];

// Document Types
export const DOCUMENT_TYPES = [
  'PDF',
  'DOCX',
  'TXT',
  'JPG',
  'PNG'
];

// Validation Patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[1-9]\d{1,14}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
};

// Error Messages
export const ERROR_MESSAGES = {
  required: 'To pole jest wymagane',
  email: 'Wprowadź poprawny adres email',
  phone: 'Wprowadź poprawny numer telefonu',
  password: 'Hasło musi zawierać co najmniej 8 znaków, jedną dużą literę, jedną małą literę i jedną cyfrę',
  fileTooBig: 'Plik jest zbyt duży',
  fileFormat: 'Nieobsługiwany format pliku'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  login: 'Zalogowano pomyślnie',
  register: 'Konto utworzone pomyślnie',
  application: 'Aplikacja wysłana pomyślnie',
  upload: 'Plik przesłany pomyślnie',
  saved: 'Zapisano pomyślnie',
  deleted: 'Usunięto pomyślnie'
};

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify'
  },
  PARTNERS: {
    LIST: '/partners',
    DETAIL: '/partners/:id',
    CREATE: '/partners',
    UPDATE: '/partners/:id',
    DELETE: '/partners/:id',
    STATS: '/partners/:id/stats'
  },
  PLATFORMS: {
    LIST: '/platforms',
    CONNECT: '/platforms/:id/connect',
    DISCONNECT: '/platforms/:id/disconnect',
    STATS: '/platforms/:id/stats',
    SYNC: '/platforms/:id/sync'
  },
  CONTENT: {
    LIST: '/content',
    DETAIL: '/content/:id',
    UPLOAD: '/content/upload',
    UPDATE: '/content/:id',
    DELETE: '/content/:id',
    PODCASTS: '/content/podcasts',
    VIDEOS: '/content/videos',
    GUIDES: '/content/guides'
  },
  FINANCE: {
    DASHBOARD: '/finance/dashboard',
    EARNINGS: '/finance/earnings',
    REPORTS: '/finance/reports',
    PAYOUTS: '/finance/payouts'
  },
  DOCUMENTS: {
    LIST: '/documents',
    UPLOAD: '/documents/upload',
    DELETE: '/documents/:id',
    URL: '/documents/:id/url'
  },
  CASTING: {
    APPLY: '/casting/apply',
    APPLICATIONS: '/casting/applications',
    UPDATE: '/casting/applications/:id'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  SIDEBAR_OPEN: 'sidebar_open'
};

// Audio file types and validation
export const AUDIO_TYPES = {
  SUPPORTED: [
    'audio/mpeg',      // MP3
    'audio/wav',       // WAV
    'audio/ogg',       // OGG
    'audio/aac',       // AAC
    'audio/mp4',       // M4A
    'audio/flac',      // FLAC
    'audio/webm',     // WebM
  ],
  EXTENSIONS: {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'aac': 'audio/aac',
    'm4a': 'audio/mp4',
    'flac': 'audio/flac',
    'webm': 'audio/webm',
  },
  MAX_SIZE: 25 * 1024 * 1024, // 25MB
  MAX_DURATION: 3600, // 1 hour in seconds
  QUALITY_LEVELS: {
    LOW: { bitrate: 128, size: '1MB/min' },
    MEDIUM: { bitrate: 192, size: '1.5MB/min' },
    HIGH: { bitrate: 256, size: '2MB/min' },
    PREMIUM: { bitrate: 320, size: '2.5MB/min' }
  }
};

// Podcast categories
export const PODCAST_CATEGORIES = [
  'Education',
  'Interview',
  'Storytelling',
  'News',
  'Comedy',
  'Technology',
  'Business',
  'Health',
  'Entertainment',
  'Lifestyle',
  'Adult Content',
  'Industry Insights'
];

// Audio validation messages
export const AUDIO_VALIDATION_MESSAGES = {
  INVALID_TYPE: 'Only MP3, WAV, AAC, OGG, M4A, FLAC, and WebM audio files are supported',
  TOO_LARGE: 'Audio file size must be less than 25MB',
  TOO_LONG: 'Audio duration must be less than 1 hour',
  CORRUPTED: 'Audio file appears to be corrupted or invalid',
  EMPTY: 'Audio file is empty'
};

// Audio player settings
export const AUDIO_PLAYER_SETTINGS = {
  VOLUME_STEPS: [0, 0.25, 0.5, 0.75, 1],
  PLAYBACK_SPEEDS: [0.5, 0.75, 1, 1.25, 1.5, 2],
  WAVEFORM_SAMPLES: 200,
  AUTO_SAVE_INTERVAL: 5000, // 5 seconds
  BUFFER_SIZE: 10, // seconds
};

// Audio processing utilities
export const AUDIO_PROCESSING = {
  SAMPLE_RATE: 44100,
  CHANNELS: 2,
  BIT_DEPTH: 16,
  ENCODING_PRESETS: {
    VOICE: { bitrate: 128, sampleRate: 22050, channels: 1 },
    MUSIC: { bitrate: 256, sampleRate: 44100, channels: 2 },
    PREMIUM: { bitrate: 320, sampleRate: 48000, channels: 2 }
  }
};
