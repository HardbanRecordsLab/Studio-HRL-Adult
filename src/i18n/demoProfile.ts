import { Locale, Messages } from './index';
import type { ProfileModel } from '@/lib/profileModel';
import { placeholderImage } from '@/lib/placeholders';

// The showcase profile served at /profile/demo. It fills every optional section of the profile model,
// so it doubles as the reference for what a fully set-up creator profile looks like.
// (Platform links point at the platforms' home pages: this is a fictional profile.)

const shared = {
  id: 'demo',
  handle: 'demo',
  type: 'solo',
  height: 168,
  weight: 55,
  measurements: '85C / 62 / 88',
  avatar: placeholderImage('Sophia', 300, 800, 800),
  heroImage: placeholderImage('Sophia', 300, 800, 800),
  stats: { subscribers: '12.4K', content: '320+', satisfaction: '98%', sessions: '150+' },
  platforms: {
    chaturbate: { username: 'sophia_hrl', url: 'https://chaturbate.com/' },
    stripchat: { username: 'sophia_hrl', url: 'https://stripchat.com/' },
    onlyfans: { username: 'sophia', url: 'https://onlyfans.com/' },
    fansly: { username: 'sophia', url: 'https://fansly.com/' },
    twitter: { username: '@sophia_hrl', url: 'https://x.com/' },
    telegram: { username: 'sophia_hrl', url: 'https://t.me/' },
    instagram: { username: 'sophia.hrl', url: 'https://instagram.com/' },
  },
  liveSchedule: [
    { day: 'mon', from: '20:00', to: '23:00', platform: 'chaturbate' },
    { day: 'wed', from: '20:00', to: '23:00', platform: 'stripchat' },
    { day: 'fri', from: '22:00', to: '02:00', platform: 'chaturbate' },
    { day: 'sun', from: '15:00', to: '18:00', platform: 'stripchat' },
  ],
} satisfies Partial<ProfileModel>;

// Stand-ins: a real profile uses its own photos (uploaded through the admin panel).
const gallery = [0, 1, 2, 3, 4, 5, 6].map((i) => placeholderImage(`0${i + 1}`, 280 + i * 26, 800, 800));

const en: ProfileModel = {
  ...shared,
  name: 'Sophia',
  bio: 'Experienced adult performer: films, live shows and interactive cams. Passion, professionalism and discretion — exclusively through Studio HRL Adult.',
  characteristics:
    'I bring warmth, humor and a lot of preparation to every production, and I make sure everyone who joins feels welcome. Quality over quantity, always.',
  testimonials: [
    { name: 'M.', text: 'Always on time, always professional, and genuinely lovely in chat. The best live shows I follow.', rating: 5 },
    { name: 'Daniel', text: 'The quality is on another level — you can tell a real studio is behind it.', rating: 5 },
    { name: 'K.', text: 'Fast replies and the custom video was exactly what I asked for.', rating: 4 },
  ],
  profileData: {
    gallery,
    tags: ['Solo', 'Duo', 'Interactive', 'Glamour', '4K'],
    badges: ['Verified 18+', 'Top creator 2026', 'Studio HRL Partner'],
    languages: ['English', 'Polski'],
    location: 'Warsaw, Poland',
    timezone: 'Europe/Warsaw',
    size: 'S/M · EU 36',
    age: 26,
    nationality: 'Polish',
    experience:
      'Active for 3+ years in the adult industry. Specialisation: solo and duo scenes, interactive cams and role-play. Fitness, yoga and erotic art are my passions. Intelligent and empathetic, with a degree in psychology — I create authentic, emotional experiences. My priority is my fans: quality over quantity.',
    milestones: [
      { year: 2026, title: 'Top creator of the year', desc: 'Studio HRL Adult partner awards' },
      { year: 2025, title: '10K subscribers', desc: 'Reached across all platforms' },
      { year: 2024, title: 'Launched interactive live shows', desc: 'Weekly schedule with 4K production' },
      { year: 2023, title: 'Joined Studio HRL Adult', desc: 'First productions and verification' },
    ],
    boundaries: [
      'Hard limits | BDSM heavy, scat, blood',
      'No respect / no hygiene | Aggression, dirt, substances',
      'Rush / discrimination | Time pressure and prejudice',
    ],
    faq: [
      { q: 'How can I request custom content?', a: 'Message the studio. Custom requests are reviewed and answered within 48 hours.' },
      { q: 'When are you live?', a: 'See the live schedule above, shown in your own time zone. Shows can move; follow the profile on the platforms to be notified.' },
      { q: 'Is the content legal and consensual?', a: 'Yes. Everything is produced by consenting adults, age-verified under 18 U.S.C. § 2257 and EU rules, and records are held by the studio.' },
      { q: 'How is my privacy protected?', a: 'The studio works with pseudonyms, geo-blocking and strict data protection. Content can be removed on request.' },
    ],
  },
};

const pl: ProfileModel = {
  ...shared,
  name: 'Sophia',
  bio: 'Doświadczona performerka adult: filmy, live shows i interaktywne cams. Pasja, profesjonalizm i dyskrecja — wyłącznie przez Studio HRL Adult.',
  characteristics:
    'Do każdej produkcji wnoszę ciepło, humor i dużo przygotowania, a każdy, kto dołącza, ma poczuć się mile widziany. Jakość ponad ilość — zawsze.',
  testimonials: [
    { name: 'M.', text: 'Zawsze punktualna, zawsze profesjonalna i naprawdę miła na czacie. Najlepsze live, jakie śledzę.', rating: 5 },
    { name: 'Daniel', text: 'Jakość jest na zupełnie innym poziomie — widać, że za tym stoi prawdziwe studio.', rating: 5 },
    { name: 'K.', text: 'Szybkie odpowiedzi, a film na zamówienie był dokładnie taki, jak chciałem.', rating: 4 },
  ],
  profileData: {
    gallery,
    tags: ['Solo', 'Duo', 'Interaktywnie', 'Glamour', '4K'],
    badges: ['Zweryfikowana 18+', 'Top twórczyni 2026', 'Partnerka Studio HRL'],
    languages: ['Polski', 'English'],
    location: 'Warszawa, Polska',
    timezone: 'Europe/Warsaw',
    size: 'S/M · EU 36',
    age: 26,
    nationality: 'Polska',
    experience:
      'Aktywna 3+ lata w branży adult. Specjalizacja: sceny solo i duo, interaktywne cams oraz role-play. Pasjonatka fitnessu, jogi i sztuki erotycznej. Inteligentna, empatyczna, z dyplomem psychologii — tworzę autentyczne, emocjonalne doświadczenia. Priorytet: moi fani, jakość ponad ilość.',
    milestones: [
      { year: 2026, title: 'Top twórczyni roku', desc: 'Nagrody partnerów Studio HRL Adult' },
      { year: 2025, title: '10 tys. subskrybentów', desc: 'Osiągnięte łącznie na wszystkich platformach' },
      { year: 2024, title: 'Start interaktywnych live shows', desc: 'Stały grafik i produkcja w 4K' },
      { year: 2023, title: 'Dołączenie do Studio HRL Adult', desc: 'Pierwsze produkcje i weryfikacja' },
    ],
    boundaries: [
      'Twarde granice | BDSM heavy, scat, krew',
      'Brak szacunku / higieny | Agresja, brud, substancje',
      'Pośpiech / dyskryminacja | Presja czasowa i uprzedzenia',
    ],
    faq: [
      { q: 'Jak zamówić treści na zamówienie?', a: 'Napisz do studia. Zamówienia custom są rozpatrywane i odpowiedź otrzymasz w ciągu 48 godzin.' },
      { q: 'Kiedy jesteś na żywo?', a: 'Zobacz harmonogram live powyżej, pokazany w Twojej strefie czasowej. Pokazy mogą się przesunąć; obserwuj profil na platformach, aby dostać powiadomienie.' },
      { q: 'Czy treści są legalne i za zgodą?', a: 'Tak. Wszystko tworzą świadome osoby dorosłe, zweryfikowane wiekowo zgodnie z 18 U.S.C. § 2257 i przepisami UE, a dokumentację przechowuje studio.' },
      { q: 'Jak chroniona jest moja prywatność?', a: 'Studio stosuje pseudonimy, geoblokadę i ścisłą ochronę danych. Treści można usunąć na życzenie.' },
    ],
  },
};

export const demoProfile: Messages<ProfileModel> = { en, pl };

export const getDemoProfile = (locale: Locale): ProfileModel => demoProfile[locale];
