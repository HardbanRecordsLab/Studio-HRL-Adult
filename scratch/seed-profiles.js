const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const profiles = [
  {
    name: 'Barbie',
    handle: 'barbie.hrl',
    email: 'barbie@studiohrl.com',
    status: 'active',
    bio: 'Witaj w świecie, gdzie luksus spotyka się z namiętnością. Jestem Barbie – twórczyni treści premium, która zawsze stawia na najwyższą jakość i autentyczne, elektryzujące relacje z widzami. Zanurz się w moim świecie pełnym niespodzianek.',
    avatar: '/image/barbie.png',
    type: 'solo',
    heroImage: '/image/barbie.png',
    aboutImage1: '/image/barbie1.png',
    aboutImage2: '/image/barbie2.png',
    description: 'Jestem perfekcjonistką w każdym calu, a przed obiektywem oddaję całą swoją energię. Mój profil to bezpieczna przestrzeń dla mężczyzn ceniących elegancję, wyrafinowany flirt i niezapomniane wrażenia wizualne. Starannie dobieram każdy element moich sesji – od luksusowej bielizny po kinowe oświetlenie. Zawsze angażuję się na 100%, ponieważ uważam, że prawdziwa rozkosz tkwi w autentycznym pożądaniu. Moja determinacja do tworzenia najlepszych produkcji sprawia, że każdy detal w moim wideo jest starannie przemyślany, od muzyki po choreografię. Jestem otwarta na wyrafinowane pomysły i potrafię stworzyć dla Ciebie iluzję, w którą uwierzysz całym sobą. Moi najlepsi widzowie cenią mnie za naturalność, niewyczerpaną energię podczas wielogodzinnych streamów oraz inteligencję, z jaką potrafię prowadzić najskrytsze konwersacje.',
    height: 168,
    weight: 55,
    measurements: '90D / 60 / 90',
    profileData: {
      likes: [
        'Luksusowe podróże | Odwiedzanie egzotycznych miejsc i dzielenie się tymi chwilami podczas ekskluzywnych streamów.',
        'Sztuka współczesna | Czerpię z niej inspiracje do tworzenia zmysłowych, artystycznych sesji zdjęciowych w jakości 4K.',
        'Długie, głębokie rozmowy | Uwielbiam nawiązywać intymną więź na czacie i poznawać najskrytsze fantazje moich fanów.',
        'Niespodzianki | Romantyczne i pikantne gesty, które sprawiają, że każda chwila ze mną jest unikalna.',
        'Elegancja i styl | Dopracowana w każdym detalu garderoba, która pobudza wyobraźnię i podkreśla moje kształty.',
        'Fitness i dbanie o ciało | Codzienne treningi, aby zawsze wyglądać zjawiskowo na każdym ujęciu.'
      ],
      boundaries: [
        'Brak szacunku | Wulgarność pozbawiona smaku i agresywne zachowanie natychmiast kończą naszą relację.',
        'Kłamstwo | Cenię transparentność – w moich pokojach liczy się szczerość i otwartość.',
        'Nuda i rutyna | Nie cierpię powtarzalności; zawsze szukam nowych pomysłów i scenariuszy.',
        'Zbyt szybkie tempo | Prawdziwa przyjemność wymaga czasu, budowania napięcia i odpowiedniej gry wstępnej.',
        'Brak dbałości o szczegóły | Zawsze daję z siebie 100% i tego samego oczekuję w naszej komunikacji.',
        'Ignorancja | Zamykanie się na nowe, odważne doznania i propozycje.'
      ],
      bestInMe: ['Kreatywność', 'Szczerość', 'Zmysłowość', 'Piękny uśmiech', 'Ambicja', 'Dobra energia', 'Elegancja', 'Temperament', 'Namiętność', 'Zaangażowanie'],
      whyWatchMe: ['Zawsze 100% zaangażowania', 'Unikalny content premium', 'Wysoka jakość produkcji 4K', 'Prawdziwe emocje i łzy szczęścia', 'Zmysłowe interakcje na żywo', 'Regularne, gorące aktualizacje', 'Ekskluzywne materiały VIP', 'Głębokie rozmowy na DM', 'Dbałość o najmniejsze detale', 'Pełna satysfakcja gwarantowana'],
      gallery: ['/image/barbie.png', '/image/barbie1.png', '/image/barbie2.png', '/image/barbie3.png', '/image/barbie4.png']
    }
  },
  {
    name: 'Sisi',
    handle: 'sisi.hrl',
    email: 'sisi@studiohrl.com',
    status: 'active',
    bio: 'Sisi to definicja tajemniczości i czułości. Jeśli szukasz bezpiecznej przystani pełnej ciepła, bliskości, a zarazem ukrytych, dzikich fantazji – właśnie ją znalazłeś. Tworzymy razem niezapomniane historie.',
    avatar: '/image/sisi.jpg',
    type: 'solo',
    heroImage: '/image/sisi.jpg',
    aboutImage1: '/image/sisi1.jpg',
    aboutImage2: '/image/sisi2.jpg',
    description: 'Z pozoru jestem cichą, delikatną dziewczyną z sąsiedztwa, ale przed moimi zaufanymi widzami potrafię pokazać niesamowity, dziki temperament. Uwielbiam odgrywać role (roleplay), długo rozmawiać w nocy i budować niesamowitą, namiętną więź. U mnie poczujesz się jak w ramionach najlepszej, ale bardzo niegrzecznej przyjaciółki. Tworzę klimat niezwykle intymny, zmysłowy, polegający na głębokim zrozumieniu partnera. Lubię, gdy cała uwaga skupiona jest na mnie, a moją misją jest przeniesienie moich widzów w świat najbardziej perwersyjnych, ale jednocześnie bardzo romantycznych fantazji. Kiedy patrzę w obiektyw kamery, patrzę prosto w Twoje oczy.',
    height: 165,
    weight: 52,
    measurements: '90C / 60 / 90',
    profileData: {
      likes: [
        'Ekskluzywne perfumy | Zapach ma dla mnie ogromne znaczenie podczas budowania zmysłowego klimatu.',
        'Dobre wino i intymność | Uwielbiam wieczorne streamy z lampką wina i szczerymi, gorącymi rozmowami.',
        'Muzyka na żywo | Tworzy idealne tło do moich powolnych, hipnotyzujących pokazów w lingerie.',
        'Romantyczne wieczory | Delikatne światło świec, jedwabna pościel i nasz wspólny czas wolny od pośpiechu.',
        'Pikantny Roleplay | Odgrywanie scenariuszy od niewinnej uczennicy po dominującą szefową.',
        'Głębokie więzi emocjonalne | Satysfakcja z relacji, która wykracza poza zwykły kontakt online.'
      ],
      boundaries: [
        'Agresja | Żadnych gwałtownych, niespodziewanych zachowań bez wcześniejszych ustaleń.',
        'Narzucanie się | Brak przestrzeni na własną decyzyjność i presja to coś, czego unikam.',
        'Złe maniery | Brak podstawowej kultury w wiadomościach i prostackie żądania.',
        'Chaos | Nieprzygotowane sesje i brak jasno określonych oczekiwań z obu stron.',
        'Pośpiech | Gra wstępna i budowanie nastroju to dla mnie podstawa każdego pokazu.',
        'Brak wyczucia smaku | Nawet najbardziej dzikie fantazje można ubrać w eleganckie słowa.'
      ],
      bestInMe: ['Tajemniczość', 'Czułość', 'Delikatność', 'Kobiecość', 'Empatia', 'Poczucie humoru', 'Inteligencja', 'Wdzięk', 'Namiętność', 'Spontaniczność'],
      whyWatchMe: ['Niezwykle intymna atmosfera', 'Tworzenie głębokich relacji', 'W 100% spersonalizowany content', 'Codzienny, szczery kontakt', 'Wyjątkowe, nastrojowe sesje live', 'Czysta, nieskazitelna autentyczność', 'Doświadczenie na poziomie VIP', 'Niezapomniane, bezsenne noce', 'Dzielenie się słodkimi sekretami', 'Tylko starannie wyselekcjonowane materiały'],
      gallery: ['/image/sisi.jpg', '/image/sisi1.jpg', '/image/sisi2.jpg', '/image/sisi3.jpg', '/image/sisi4.jpg']
    }
  },
  {
    name: 'Casandra',
    handle: 'casandra.hrl',
    email: 'casandra@studiohrl.com',
    status: 'active',
    bio: 'Dominująca natura z nieskazitelną elegancją. Casandra to twórczyni stworzona dla mężczyzn ceniących ekstremalne emocje, wyraźne zasady i brak jakichkolwiek kompromisów. Przygotuj się na jazdę bez trzymanki.',
    avatar: '/image/casandra.png',
    type: 'solo',
    heroImage: '/image/casandra.png',
    aboutImage1: '/image/casandra1.png',
    aboutImage2: '/image/casandra2.png',
    description: 'Nie uznaję półśrodków. Wymagam wiele, ale daję z siebie jeszcze więcej. Moje sesje to wybuchowy koktajl adrenaliny, pożądania i pełnej kontroli. Jeśli lubisz uległość, zmysłową dominację oraz ekskluzywne środowisko, mój VIP-room stanie się Twoim ulubionym miejscem w sieci. Zaufaj mi i daj się poprowadzić. Przekraczam granice i łamię wszelkie zasady, o ile to ja ustalam ton. Buduję społeczność mężczyzn silnych, ale wiedzących, kiedy warto okazać posłuszeństwo i oddać kontrolę w ręce bezwzględnej bogini. Każdy mój live to teatr najwyższej próby, a interakcje na DM pozostawiają ślad na długo po tym, jak zamkniesz aplikację. Dołącz tylko, jeśli masz na to odwagę.',
    height: 172,
    weight: 58,
    measurements: '92E / 62 / 92',
    profileData: {
      likes: [
        'Adrenalina | Czyste, pierwotne emocje i przesuwanie granic podczas interaktywnych pokazów na żywo.',
        'Zmysłowa Dominacja | Pełna kontrola nad sytuacją i prowadzenie gry według własnych, twardych zasad.',
        'Perfekcjonizm | Moje zdjęcia i filmy to produkcje w jakości kinowej, bez miejsca na amatorskie wpadki.',
        'Intensywne wyzwania | Realizowanie najtrudniejszych scenariuszy i spełnianie najbardziej wymagających fantazji.',
        'Ekskluzywne eventy | VIP experience to dla mnie standard, a nie wyjątek.',
        'Czarne koronkowe body | Mój znak rozpoznawczy, dodający mi pewności siebie.'
      ],
      boundaries: [
        'Niesłowność | Obiecujesz – dotrzymuj słowa. W moim świecie nie ma miejsca na wahanie.',
        'Słabość charakteru | Cenię mocnych mężczyzn, którzy potrafią poddać się równie silnej kobiecie.',
        'Tanie kompromisy | Nie targuję się o czas i jakość. Albo bierzemy wszystko, albo nic.',
        'Przewidywalność | Znudzony rutyną uciekam; wymagam stałego dostarczania nowych bodźców.',
        'Narzekanie | Atmosfera ma być gorąca i pełna pożądania, a nie obciążona negatywną energią.',
        'Brak konkretów | Lubię wiedzieć dokładnie, czego ode mnie pragniesz w danej chwili.'
      ],
      bestInMe: ['Pewność siebie', 'Niesamowita charyzma', 'Zdecydowanie w działaniu', 'Mocny, magnetyczny charakter', 'Zjawiskowa uroda', 'Pełna niezależność', 'Ekskluzywny styl bycia', 'Odważne, bezkompromisowe pomysły', 'Szybkość działania', 'Skupienie na detalu'],
      whyWatchMe: ['Zupełnie inny, wyższy wymiar', 'Brak taniej cenzury, pełna wolność', 'Ekskluzywne, prywatne pokazy', 'Intensywne interakcje na żywo', 'Ekstremalne, dzikie wrażenia', 'Gra w przejmowanie kontroli', 'Content dla najbardziej wymagających', 'Najwyższa, studyjna jakość produkcji', 'Prawdziwy ogień podczas streamów', 'Gwarancja braku rozczarowań'],
      gallery: ['/image/casandra.png', '/image/casandra1.png', '/image/casandra2.png', '/image/casandra3.png', '/image/casandra4.png']
    }
  },
  {
    name: 'Glem',
    handle: 'glem.hrl',
    email: 'glem@studiohrl.com',
    status: 'active',
    bio: 'Artystyczna dusza o niepokornym sercu. Moje treści to wizualna podróż pełna neonów, alternatywnej estetyki i czystej ekspresji. Zapraszam do miejsca, gdzie erotyka staje się sztuką.',
    avatar: '/image/glem.png',
    type: 'solo',
    heroImage: '/image/glem.png',
    aboutImage1: '/image/glem1.png',
    aboutImage2: '/image/glem2.png',
    description: 'Moje ciało to płótno, a sesje wideo to spektakle, w których bawię się światłem, formą i rekwizytami. Nie interesuje mnie standardowy content – u mnie znajdziesz awangardowe nudesy, eksperymentalne formaty wideo i unikalny vibe, którego nie podrobi nikt inny. Jestem otwarta na niestandardowe zlecenia i szalone pomysły. Tworzę z głębokiej potrzeby wyrażania swoich uczuć i pożądania poprzez wizualne piękno. Mój content jest stworzony dla koneserów sztuki i kobiecego ciała. Nigdy nie przestaję eksplorować nowych granic w produkcjach, więc możesz spodziewać się wszystkiego – od mrocznego, cyberpunkowego klimatu, po jasne, zmysłowe, oniryczne sesje w blasku księżyca.',
    height: 169,
    weight: 54,
    measurements: '85B / 60 / 88',
    profileData: {
      likes: [
        'Sztuka i awangarda | Uwielbiam eksperymentować z neonowym oświetleniem i nietypowymi kadrami.',
        'Moda alternatywna | Unikalne stylizacje, odważne dodatki i stroje, które przyciągają wzrok.',
        'Muzyka elektroniczna | Mroczne, hipnotyczne brzmienia są idealnym tłem do moich nagrań na wyłączność.',
        'Tatuaże i ekspresja | Cenię wolność w wyrażaniu siebie poprzez body-art.',
        'Nowoczesny design | Studyjne wnętrza, które idealnie pasują do mojego artystycznego klimatu.',
        'Głębokie dyskusje | Rozmowy o życiu, sztuce i ukrytych pragnieniach po godzinach.'
      ],
      boundaries: [
        'Zamknięty umysł | Brak akceptacji dla odmienności i nietypowych, odważnych form wyrazu.',
        'Ocenianie po pozorach | Płycizna intelektualna bardzo mnie zniechęca do dalszego kontaktu.',
        'Rutyna i przewidywalność | Jeśli sesja ma wyglądać jak milion innych w sieci – to nie u mnie.',
        'Zwykłość | W moich produkcjach nie ma miejsca na przysłowiową nudę i brak pomysłu.',
        'Ignorancja estetyczna | Narzucanie mi tandetnych i oklepanych scenariuszy.',
        'Brak tolerancji | Mój profil to bezpieczna strefa (safe space) dla każdego.'
      ],
      bestInMe: ['Oryginalność', 'Niesamowita ekspresja', 'Pełna swoboda', 'Zrozumienie i tolerancja', 'Artystyczna, bezbłędna wizja', 'Absolutna niezależność', 'Dzikość serca', 'Ciekawość drugiego człowieka', 'Wysoki intelekt', 'Ciągła zabawa formą'],
      whyWatchMe: ['Zmysłowa wizualna poezja', 'Eksperymentalne, nowatorskie formaty', 'Artystyczne sesje nudes', 'Wysublimowana, niespotykana erotyka', 'Niepowtarzalny, elektryzujący styl', 'Kreatywne podejście do widzów', 'Dopracowane na maksa detale', 'Estetyka premium (4K/8K)', 'Prawdziwa pasja tworzenia', 'Kompletna wolność wyrazu'],
      gallery: ['/image/glem.png', '/image/glem1.png', '/image/glem2.png', '/image/glem3.png', '/image/glem4.png']
    }
  }
];

async function seed() {
  for (const p of profiles) {
    const existing = await prisma.partner.findUnique({ where: { handle: p.handle } });
    if (existing) {
      await prisma.partner.update({
        where: { handle: p.handle },
        data: {
          ...p,
          profileData: p.profileData // Updating raw JSON object
        }
      });
      console.log(`Zaktualizowano profil: ${p.name}`);
    } else {
      await prisma.partner.create({
        data: {
          ...p,
          profileData: p.profileData // Saving raw JSON object
        }
      });
      console.log(`Utworzono profil: ${p.name}`);
    }
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
