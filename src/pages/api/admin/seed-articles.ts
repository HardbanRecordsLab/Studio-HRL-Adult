import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/utils/adminAuth';

const articles = [
  {
    slug: 'psychologia-widza',
    title: 'Psychologia widza: jak budować lojalność, która płaci',
    category: 'Psychologia',
    tag: 'MUST READ',
    excerpt: 'Zrozumienie mechanizmów psychologicznych stojących za decyzjami zakupowymi fanów to fundament każdego dochodowego konta.',
    readTime: '8 min',
    content: `<h2>Psychologia widza: jak budować lojalność, która płaci</h2><p>Zrozumienie psychiki twojego widza to najważniejsza inwestycja, którą możesz zrobić jako twórca. W branży adult content, gdzie konkurencja jest bezlitosna, to emocjonalny związek – a nie fizyczna atrakcyjność – decyduje o tym, czy fan zostanie z tobą na lata czy przejdzie do konkurencji.</p><h3>Piramida hierarchii potrzeb Maslowa</h3><p>Klasyczne teorie psychologiczne są wciąż aktualne. Twój fan potrzebuje:<ul><li><strong>Bezpieczeństwa</strong> – pewności, że jego prywatność jest chroniona</li><li><strong>Przynależności</strong> – poczucia bycia częścią społeczności, grupy, klubu ekskluzywnego</li><li><strong>Uznania</strong> – że jego widziane, że ma znaczenie</li><li><strong>Samorealizacji</strong> – możliwości eksploracji swoich fantazji bez osądu</li></ul></p><p>Jako twórca, twoja rola to budowanie bezpiecznej przestrzeni, w której fan czuje się rozumiany i akceptowany.</p><h3>Neurobiologia uzależnienia od treści</h3><p>To nie są przypadkowe obsesje. Kiedy fan patrzy na twoje treści, mózg wydziela dopaminę. Twoja rola to: (1) Stworzyć przewidywalny rytm treści, (2) Dostarczać nagrody poślednie, (3) Utworzyć efekt niedoboru.</p><h3>Mechanika społeczna: status i dostęp</h3><p>Ludzie są zwierzętami społecznym. Kupujemy rzeczy, aby pokazać nasz status. W twojej ekosystemie potrzebujesz wyraźnie zdefiniowanych tier'ów - od Bronze (obserwujących bezpłatnie), przez Silver, Gold, aż do Platinum (VIP członkowie).</p><h3>Praktyczne kroki na dzisiaj</h3><ol><li>Przeanalizuj swoich top 10 fanów</li><li>Stwórz dla nich specjalną grupę z osobistymi wiadomościami</li><li>Wyślij każdemu personalno napisaną wiadomość</li><li>Poproś o feedback</li><li>Wdrażaj ich pomysły i zawsze ich cytuj</li></ol>`,
    isPublished: true,
  },
  {
    slug: 'onlyfans-vs-fansly-2026',
    title: 'OnlyFans vs Fansly 2026 – które konto opłaca się bardziej?',
    category: 'Platformy',
    tag: 'ANALIZA',
    excerpt: 'Szczegółowe porównanie prowizji, algorytmów, narzędzi i potencjału zarobkowego obu platform. Dane z realnych kont.',
    readTime: '12 min',
    content: `<h2>OnlyFans vs Fansly 2026 – które konto jest bardziej dochodowe?</h2><p>To pytanie zadają sobie wszyscy nowi twórcy: <strong>"Gdzie zarabiać więcej – na OnlyFans czy Fansly?"</strong> Odpowiedź nie jest czarno-biała, ale dane pokazują, że prawidłowe wykorzystanie obu platform łącznie może podwoić twoje zarobki.</p><h3>1. Prowizja platformy</h3><p><strong>OnlyFans:</strong> 20% - twórca bierze 80%</p><p><strong>Fansly:</strong> 20% - twórca bierze 80%</p><p><em>Remis. Ale to tylko liczba na papierze...</em></p><h3>2. Algorytm i ruch organiczny</h3><p>OnlyFans nie ma algorytmu rekomendacji. Fansly wdrożył w 2025 roku algorytm typu "For You Page" (FYP), który każdy nowy post trafia do 1000+ potencjalnych fanów.</p><p><strong>Zwycięzca: Fansly – średnio 40% więcej nowych fanów/miesiąc dla nowych twórców</strong></p><h3>3. Narzędzia monetyzacji</h3><p>Fansly oferuje dodatkowe możliwości: wielopoziomowe subskrypcje (Tiered), live subscriptions, i wsparcie dla kryptowalut.</p><p><strong>Zwycięzca: Fansly – dodatkowe 15-25% przychodów</strong></p><h3>5. Strategie dual-platform</h3><p>Top twórcy w 2026 roku nigdy nie stawiają na jedną platformę. Średni wzrost przychodów przy dwóch platformach: +85%</p><h3>Moja rekomendacja:</h3><p>Zamiast wybierać, startuj z OnlyFans (większa baza), ale równocześnie zbuduj konto na Fansly. Po 3 miesiącach porównaj wyniki i zdecyduj, gdzie inwestować więcej czasu.</p>`,
    isPublished: true,
  },
  {
    slug: 'pierwsze-30-dni-chaturbate',
    title: 'Pierwsze 30 dni na Chaturbate – plan działania krok po kroku',
    category: 'Live Cam',
    tag: 'PORADNIK',
    excerpt: 'Jak zbudować bazę fanów, ustawić Tip Menu, zaplanować pierwsze Goal Shows i osiągnąć Top 100 w miesiąc.',
    readTime: '15 min',
    content: `<h2>Pierwsze 30 dni na Chaturbate – plan działania krok po kroku</h2><p>Chaturbate to największa platforma live cam na świecie. Jeśli zaczniesz tam mądrze, możesz zarobić 3,000-15,000 dolarów w pierwszym miesiącu.</p><h3>Dni 1-3: Setup i promocja</h3><p><strong>Co robić:</strong></p><ul><li>Wgrać profesjonalne, high-quality zdjęcia do profilu</li><li>Napisać sprzedające bio</li><li>Ustaw kamerę w 1080p minimum</li><li>Postuj linki na Reddit, Twitter, TikTok</li></ul><p><strong>Cele:</strong></p><ul><li>100+ followers</li><li>10+ godzin streamu</li></ul><h3>Dni 4-10: Tip Menu i Goal Shows</h3><p>Tip Menu to najbardziej ważny element. Konfiguruj go logicznie: 1 USD = lajk, 5 USD = request piosenki, 15 USD = preview, 50 USD = private preview, 100+ = private show.</p><p>Goal Shows to klucz do zarobków w Chaturbate. Ustaw goal na 300 tokenów (15 dolarów) - coś mało zobowiązującego. Kiedy osiągniesz - DOSTARCZAJ - to buduje zaufanie fanów.</p><h3>30-dniowy harmonogram realizacji:</h3><p>Tydzień 1: Setup → zarobki 500-700 USD<br>Tydzień 2: Optimization → zarobki 2,500-3,500 USD<br>Tydzień 3: Scaling → zarobki 4,000-6,000 USD<br>Tydzień 4: Full throttle → zarobki 6,000-10,000 USD</p><p><strong>TOTAL: 13,000-20,000 USD brutto = 6,500-10,000 USD netto</strong></p>`,
    isPublished: true,
  },
  {
    slug: 'geo-blocking-prywatnosc',
    title: 'Geo-blocking i prywatność – kompletny przewodnik twórcy',
    category: 'Bezpieczeństwo',
    tag: 'BEZPIECZEŃSTWO',
    excerpt: 'Jak skutecznie ukryć tożsamość, zablokować dostęp z wybranych krajów i chronić dane na wszystkich platformach.',
    readTime: '10 min',
    content: `<h2>Geo-blocking i prywatność – kompletny przewodnik twórcy</h2><p>Jednym z największych lęków twórców adult content jest ekspozycja. Geo-blocking to narzędzie, które pozwala ci kontrolować, kto widzi twoją zawartość.</p><h3>1. Co to jest geo-blocking?</h3><p>To funkcja, która pozwala ci zablokować dostęp do twoich treści użytkownikom z określonych krajów, miast czy nawet adresów IP.</p><p><strong>Zastosowania:</strong></p><ul><li>Blokada Polski – jeśli chcesz, aby miejscowe osoby nie znalazły twojego konta</li><li>Blokada miasta/regionu – specjalna ochrona jeśli mieszkasz w małym mieście</li><li>Blokada krajów wysokiego ryzyka – funkcja bezpieczeństwa</li></ul><h3>2. Geo-blocking na OnlyFans</h3><p>Zaloguj się → Settings → Privacy → "Content Restriction by Country" → zaznacz kraje do zablokowania</p><h3>3. VPN i ochrona IP</h3><p>Geo-blocking to pierwsza linia obrony, ale nie jest 100% pewny. Zawsze używaj VPN podczas streamingu (NordVPN, ExpressVPN). Nigdy nie streamuj ze swojego rzeczywistego IP.</p><h3>5. Ochrona przed de-anonymizacją</h3><p>Największe zagrożenie to "doxxing". Jak się chronić:</p><ul><li>Usuń EXIF data z wszystkich zdjęć PRZED wrzuceniem</li><li>Jeśli znaleźć niepotrzebne treści online, poproś o usunięcie</li><li>Stosuj zasadę: inne imię na każdej platformie</li></ul><h3>Checklist bezpieczeństwa:</h3><p>✅ Geo-blocking włączony<br>✅ VPN zawsze aktywny<br>✅ EXIF data usunięta<br>✅ Różne imiona/hasła na każdej platformie<br>✅ Burner telefon do rejestracji<br>✅ Wiadomości biznesowe<br>✅ Tło/otoczenie neutralne</p>`,
    isPublished: true,
  },
  {
    slug: 'ppv-strategia',
    title: 'PPV – strategia maksymalizacji przychodów z wiadomości prywatnych',
    category: 'Monetyzacja',
    tag: 'ZAAWANSOWANY',
    excerpt: 'Pay-Per-View to najszybciej rosnące źródło dochodu dla twórców premium. Techniki wyceny i timing wysyłki.',
    readTime: '11 min',
    content: `<h2>PPV – strategia maksymalizacji przychodów z wiadomości prywatnych</h2><p>Pay-Per-View (PPV) to najpotężniejsze narzędzie monetyzacji na OnlyFans i Fansly. Dla serioznych twórców, PPV może stanowić 60-80% całkowitych zarobków.</p><h3>1. Jak działa PPV?</h3><p>Tradycyjna subskrypcja: fan płaci 10-50 USD/miesiąc za dostęp do wszystkich postów. PPV: fan płaci między 5-150 USD za jedną wiadomość prywatną.</p><p><strong>Przepływy pieniędzy (OnlyFans):</strong> Przychód z PPV: 80% tobie, 20% platformie. Średnia konwersja PPV: 5-15% subskrybentów.</p><h3>3. Strategie wyceny PPV</h3><p>Model tiered: 5-10 USD (Preview), 15-25 USD (Short clip), 25-50 USD (Medium clip), 50-100 USD (Full scene), 150+ USD (Custom video)</p><p>Większość konwersji jest na 15-25 USD (sweet spot).</p><h3>4. Timing wysyłki PPV – kiedy wysłać?</h3><p>Najlepsze czasy: 17:00-19:00, 21:00-23:00, 08:00-09:00. Najgorsze: 12:00-14:00, 02:00-06:00, niedzielę rano.</p><h3>5. Frequency – jak często wysyłać PPV?</h3><p><strong>Golden rule:</strong> Wysyłaj PPV 2-4 razy dziennie, ale nie pod rząd.</p><h3>7. Technika "The Curve"</h3><p>Dzień 1: Wysyła 5 USD preview. Dzień 2: 15 USD medium version. Dzień 3: 50 USD "Full Scene".</p><p>Wynik: Jeden ciąg treści generuje 3x przychodu vs wysłanie pojedynczego PPV.</p><h3>Podsumowanie:</h3><p>PPV może 2-3x zwielokrotnić twoje zarobki. Klucz to prawidłowa wycena, idealne timing, wysokość jakość treści, i "The Curve".</p>`,
    isPublished: true,
  },
  {
    slug: 'budowanie-marki-para',
    title: 'Budowanie marki jako para – przewaga, której nie mają soliści',
    category: 'Marka',
    tag: 'STRATEGIA',
    excerpt: 'Pary mają unikalną przewagę rynkową. Jak ją wykorzystać, wybrać niszę i zbudować rozpoznawalność.',
    readTime: '9 min',
    content: `<h2>Budowanie marki jako para – przewaga, której nie mają soliści</h2><p>Pary w branży adult content mają pewną produkcyjną przewagę – mogą tworzyć content, którego soliści nigdy nie mogą pełnie zastąpić. Chemia między dwoma ludźmi to coś, czego nie da się sfingować.</p><h3>1. Anatomia sukcesu pary</h3><p><strong>Statystyka:</strong> Przeciętna para zarabia 200-300% więcej niż średni solista.</p><p><strong>Dlaczego?</strong></p><ul><li>Wyż produkcji: Dwie osoby = zawsze jest kto filma, kto się uśmiecha</li><li>Dynamika: Energia między parą jest magnetyczna</li><li>Różnorodność treści: 3x więcej wariantów</li><li>Wiarygodność: Fani czują że to autentyczne</li><li>Powrót: Fani chcą wrócić do pary, którą obserwowali</li></ul><h3>2. Wybór niszy – jak wybrać swoją unikalną pozycję?</h3><p><strong>Strategie niszowe:</strong> Demograficzne, Zawodowe, Kreatywne, Niszę seksualną, Edukacyjne.</p><h3>4. Budownictwo marki – 90 dni do rozpoznawalności</h3><p>Miesiąc 1: Setup - Cel: 1,000 followers<br>Miesiąc 2: Engagement - Cel: 5,000 followers, 500+ subskrybentów<br>Miesiąc 3: Scale - Cel: 10,000 followers, 1,500+ subskrybentów, zarobki 3,000-5,000 USD/miesiąc</p><h3>5. Cross-platform funnel</h3><p>TikTok/Instagram → Twitter/Reddit → OnlyFans → Fansly/ManyVids</p><h3>Praktyczne zadania na dzisiaj:</h3><ol><li>Zdecydujcie na wspólną niszę</li><li>Utwórz "brand bible"</li><li>Zaplanuj 90-dniowy content calendar</li><li>Zacznij od TikToka/Instagramu</li><li>Ustaw funnel do OnlyFans</li></ol>`,
    isPublished: true,
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow both admin and public seed (with a secret key for security)
  const { seed } = req.query;
  
  if (seed !== process.env.NEXT_PUBLIC_SEED_KEY && process.env.NODE_ENV === 'production') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if articles already exist
    const existingCount = await prisma.academyBlogArticle.count();
    
    if (existingCount > 0 && !req.body.force) {
      return res.status(400).json({
        error: 'Articles already exist. Use ?force=true to overwrite.',
        count: existingCount,
      });
    }

    // Clear existing articles if force is enabled
    if (req.body.force) {
      await prisma.academyBlogArticle.deleteMany({});
    }

    // Insert new articles
    const created = await Promise.all(
      articles.map((article, index) =>
        prisma.academyBlogArticle.create({
          data: {
            ...article,
            order: index,
            publishedAt: new Date(),
          },
        })
      )
    );

    return res.status(200).json({
      success: true,
      message: `Successfully seeded ${created.length} blog articles`,
      count: created.length,
    });
  } catch (error) {
    console.error('Error seeding articles:', error);
    return res.status(500).json({
      error: 'Failed to seed articles',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
