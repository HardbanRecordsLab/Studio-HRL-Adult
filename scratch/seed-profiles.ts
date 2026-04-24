import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const DEMO_PROFILES = [
  {
    name: 'Luna',
    handle: 'luna-hrl',
    email: 'luna@hrlstudio.com',
    status: 'active',
    type: 'solo',
    bio: 'Profesjonalna twórczyni treści adult z 3-letnim doświadczeniem. Specjalizuję się w eleganckich, artystycznych sesjach i interaktywnych streamach live.',
    description: 'Naturalna elegancja, zmysłowość i profesjonalne podejście do każdej sesji. Tworzę treści na najwyższym poziomie jakości.',
    measurements: '168 cm / 90 / 64 / 92',
    height: 168,
    weight: 55,
    platforms: {
      onlyfans: { url: 'https://onlyfans.com', username: 'luna.hrl', followers: '2.4K' },
      chaturbate: { url: 'https://chaturbate.com', username: 'lunahrl', followers: '8.1K' },
      fansly: { url: 'https://fansly.com', username: 'luna.hrl', followers: '1.2K' },
    },
    profileStats: { subscribers: '3.6K', content: '240+', satisfaction: '98%' },
    liveSchedule: [
      { day: 'Wtorek', time: '21:00 – 23:00', active: true },
      { day: 'Czwartek', time: '22:00 – 00:00', active: true },
      { day: 'Sobota', time: '20:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Basic Fan', price: '$9.99/mies', features: ['Dostęp do zdjęć', 'DM priorytet'] },
      { name: 'VIP Access', price: '$24.99/mies', features: ['Ekskluzywne wideo', 'Prywatne ticki live', 'Custom PPV -20%'] },
      { name: 'Elite', price: '$49.99/mies', features: ['1x custom video/mies', 'Bezpośredni kontakt', 'Zdjęcia podpisane'] },
    ],
    testimonials: [
      { username: 'Fan_PL_01', text: 'Najlepsza twórczyni jakiej subskrybuję!', since: 'Marzec 2025', rating: 5 },
      { username: 'TopFan_X', text: 'Custom video przekroczyło moje oczekiwania.', since: 'Styczeń 2025', rating: 5 },
    ],
    profileData: { tags: ['Premium', 'Live Cam', 'OnlyFans'] }
  },
  {
    name: 'Alexia',
    handle: 'alexia-hrl',
    email: 'alexia@hrlstudio.com',
    status: 'active',
    type: 'solo',
    bio: 'Premium Glamour Creator. Studio HRL Adult. Specjalizacja: Artistic nudes, Lingerie, Live. Top 5% OnlyFans & Fansly.',
    description: 'Artystka, elegancja, zmysłowość ze smakiem. Specjalistka od luxury content i fotografii high-end.',
    measurements: '174 cm / 92 / 62 / 92',
    height: 174,
    weight: 58,
    platforms: {
      onlyfans: { url: 'https://onlyfans.com', username: 'alexia.hrl', followers: '3.8K' },
      fansly: { url: 'https://fansly.com', username: 'alexia.hrl', followers: '2.1K' },
    },
    profileStats: { subscribers: '5.2K', content: '380+', satisfaction: '99%' },
    liveSchedule: [
      { day: 'Środa', time: '20:00 – 22:00', active: true },
      { day: 'Piątek', time: '21:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Classic', price: '$12.99/mies', features: ['Galerie zdjęć', 'Monthly exclusive'] },
      { name: 'Luxury VIP', price: '$34.99/mies', features: ['Video content', 'Custom requests', 'Live priority'] },
    ],
    testimonials: [
      { username: 'LuxuryFan99', text: 'Absolutnie piękna i profesjonalna. Najlepsza inwestycja!', since: 'Styczeń 2025', rating: 5 },
    ],
    profileData: { tags: ['Fansly', 'Luxury', 'Artistic'] }
  },
  {
    name: 'Sofia',
    handle: 'sofia-hrl',
    email: 'sofia@hrlstudio.com',
    status: 'active',
    type: 'solo',
    bio: 'Multi-platform creator. Studio HRL Adult. BDSM, Fetish & Vanilla. ManyVids Top Seller 2025.',
    description: 'Dominująca osobowość, profesjonalne podejście do fetish content. Najbardziej wszechstronna twórczyni w portfolio studia.',
    measurements: '166 cm / 95 / 68 / 98',
    height: 166,
    weight: 60,
    platforms: {
      chaturbate: { url: 'https://chaturbate.com', username: 'sofiahrl', followers: '12.4K' },
      manyvids: { url: 'https://manyvids.com', username: 'sofia-hrl', followers: '4.2K' },
    },
    profileStats: { subscribers: '8.9K', content: '620+', satisfaction: '97%' },
    liveSchedule: [
      { day: 'Poniedziałek', time: '22:00 – 01:00', active: true },
      { day: 'Czwartek', time: '22:00 – 00:00', active: true },
      { day: 'Niedziela', time: '21:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Fan', price: '$7.99/mies', features: ['Podstawowe treści', 'Newsy'] },
      { name: 'Sub+', price: '$19.99/mies', features: ['Fetish content', 'Custom clips -15%', 'DM priority'] },
    ],
    testimonials: [
      { username: 'FetishKing', text: 'Najbardziej profesjonalna Domina na Chaturbate. Perfekcja.', since: 'Luty 2025', rating: 5 },
    ],
    profileData: { tags: ['ManyVids', 'Chaturbate', 'BDSM'] }
  }
];

async function main() {
  console.log('Rozpoczynam migrację profili demo...');
  for (const profile of DEMO_PROFILES) {
    const p = await prisma.partner.upsert({
      where: { handle: profile.handle },
      update: profile,
      create: profile,
    });
    console.log(`Zmigrowano: ${p.name} (@${p.handle})`);
  }
  console.log('Migracja zakończona sukcesem!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
