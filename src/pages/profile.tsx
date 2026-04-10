import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Elegancka Modelka - Studio HRL Adult</title>
        <meta name="description" content="Profil eleganckiej modelki na Studio HRL Adult. Sex cams, escort, filmy. Dyskrecja i luksus." />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="min-h-screen font-playfair bg-gradient-to-br from-[#1a1a1a] via-[#2d1b69] to-black text-[#f0e6d2] leading-relaxed overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto p-5">
          
          {/* Navigation Back */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-[#ffd700] hover:text-[#da70d6] transition-colors text-sm tracking-wider">
              <span>←</span> Powrót do Strony Głównej
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center p-12 md:p-16 bg-black/70 rounded-2xl mb-10 shadow-[0_10px_40px_rgba(218,112,214,0.3)]"
          >
            <h1 className="font-cinzel text-4xl md:text-5xl text-[#ffd700] mb-3 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse">
              Elegancka, pewna siebie kobieta
            </h1>
            <p className="text-lg md:text-xl max-w-[800px] mx-auto opacity-90">
              Modelka do filmów, sex cams i escort. Dostępna na platformie Studio HRL Adult.
            </p>
          </motion.header>

          {/* O mnie */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="about"
            className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] hover:shadow-[0_15px_50px_rgba(218,112,214,0.4)] transition-all duration-300"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center">O mnie</h2>
            
            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4">Wymiary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              {[
                { label: 'Wzrost', value: '168 cm' },
                { label: 'Waga', value: '55 kg' },
                { label: 'Biust', value: '85C' },
                { label: 'Talia', value: '62 cm' },
                { label: 'Biodra', value: '88 cm' },
                { label: 'Rozmiar', value: 'S/M' },
              ].map((dim, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-4 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <span className="text-[#da70d6] font-semibold">{dim.label}:</span> {dim.value}
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4">Charakterystyka</h3>
            <p className="text-base leading-7">
              Jestem osobą pełną pasji i energii, która ceni sobie autentyczne połączenia. Moja natura jest jednocześnie delikatna i silna - potrafię być czuła i opiekuńcza, ale także pewna siebie i zdecydowana. Uwielbiam głębokie rozmowy, sztukę i wszystko co piękne. Cenię sobie inteligencję, poczucie humoru i wzajemny szacunek. W relacjach stawiam na jakość, nie ilość - każde spotkanie traktuję jako wyjątkowe doświadczenie.
            </p>
          </motion.section>

          {/* Upodobania i granice */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="preferences"
            className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] hover:shadow-[0_15px_50px_rgba(218,112,214,0.4)] transition-all duration-300"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center">Upodobania i granice</h2>
            
            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4">Lubię</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {[
                { title: 'Romantyczne spotkania', desc: 'Kolacje przy świecach, spacery, głębokie rozmowy' },
                { title: 'Sztuka i kultura', desc: 'Teatr, galerie, koncerty, literatura' },
                { title: 'Luksusowe doświadczenia', desc: 'Spa, podróże, wykwintne restauracje' },
                { title: 'Intymność i bliskość', desc: 'Czułość, wzajemny szacunek, emocjonalne połączenie' },
                { title: 'Aktywny tryb życia', desc: 'Joga, taniec, sporty wodne' },
              ].map((like, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-5 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <h4 className="text-[#ffd700] mb-2 font-semibold">{like.title}</h4>
                  <p className="text-sm opacity-80">{like.desc}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4">Granice</h3>
            <ul className="space-y-3 pl-5 mb-6">
              {[
                { strong: 'Brak szacunku:', text: 'Nieuprzejmość, agresja, przekraczanie granic' },
                { strong: 'Niehigiena:', text: 'Brak dbałości o czystość i wygląd' },
                { strong: 'Substancje:', text: 'Narkotyki, nadmierne spożycie alkoholu' },
                { strong: 'Pośpiech:', text: 'Presja czasowa, brak cierpliwości' },
                { strong: 'Dyskryminacja:', text: 'Wszelkie formy nietolerancji i uprzedzeń' },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="py-2"
                >
                  <strong className="text-[#ff6b6b]">{item.strong}</strong> {item.text}
                </motion.li>
              ))}
            </ul>

            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4">Dyskrecja i bezpieczeństwo</h3>
            <p className="text-base leading-7 bg-black/20 p-5 rounded-lg border border-[rgba(255,215,0,0.1)]">
              Wszystkie spotkania odbywają się w atmosferze pełnego zaufania i dyskrecji. Cenię sobie prywatność - zarówno swoją, jak i moich klientów. Bezpieczeństwo i komfort są dla mnie priorytetem.
            </p>
          </motion.section>

          {/* Usługi */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="services"
            className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] hover:shadow-[0_15px_50px_rgba(218,112,214,0.4)] transition-all duration-300"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center">Usługi</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  title: 'Sex Cams',
                  items: [
                    'Pokazy prywatne: Intymne, spersonalizowane sesje 1:1 z czuleścią i emocjonalnym połączeniem.',
                    'Pokazy grupowe: Energetyczne interakcje z publicznością, podkreślające moją charyzmę i pasję.',
                  ]
                },
                {
                  title: 'Escort',
                  items: [
                    'Kolacje i randki: Romantyczne wieczory z rozmowami i sztuką.',
                    'Noclegi: Całkowite zanurzenie w luksusie i bliskości.',
                    'Towarzysz podróży: Elegancka partnerka na wyjazdy, spa czy wydarzenia kulturalne.',
                    'Opcje: In-call (moje dyskretne miejsce), out-call (u Ciebie), sesje duo z inną modelką.',
                  ]
                },
                {
                  title: 'Modelka do filmów',
                  items: [
                    'Specjalności: Sensualne sceny, role-play (romantyczne, artystyczne).',
                    'Dodatki: Negocjowalne extras zgodne z granicami i platformą (wszystko tasteful).',
                  ]
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-6 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <h3 className="text-xl text-[#da70d6] mb-4 font-semibold">{service.title}</h3>
                  <ul className="space-y-3 text-sm">
                    {service.items.map((item, i) => (
                      <li key={i} className="py-1 leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Dostępność i stawki */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="availability"
            className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)] hover:translate-y-[-5px] hover:shadow-[0_15px_50px_rgba(218,112,214,0.4)] transition-all duration-300"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center">Dostępność i stawki</h2>
            <p className="mb-6 text-base leading-7">
              <strong className="text-[#ffd700]">Dostępność:</strong> Poniedziałek-Piątek 18:00-02:00, Weekendy na żądanie. Lokalizacja: Warszawa + dojazd 100km. Języki: Polski, Angielski.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-5">
                <thead>
                  <tr className="bg-[rgba(255,215,0,0.2)]">
                    <th className="p-4 text-left text-[#ffd700] border-b border-[rgba(255,255,255,0.2)]">Usługa</th>
                    <th className="p-4 text-left text-[#ffd700] border-b border-[rgba(255,255,255,0.2)]">Stawka (EUR/godz.)</th>
                    <th className="p-4 text-left text-[#ffd700] border-b border-[rgba(255,255,255,0.2)]">Inkludowane</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { service: 'Sex Cams Prywatne', rate: '50-100', included: '30-60 min sesja' },
                    { service: 'Escort Kolacja', rate: '300', included: '2h + rozmowa' },
                    { service: 'Escort Noc', rate: '800', included: '8h + nocleg' },
                    { service: 'Filmy (godz.)', rate: '200+', included: 'Negocjowalne' },
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-[rgba(255,255,255,0.1)] hover:bg-white/5 transition-colors">
                      <td className="p-4">{row.service}</td>
                      <td className="p-4 text-[#ffd700] font-semibold">{row.rate}</td>
                      <td className="p-4">{row.included}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm opacity-80">
              Depozyt wymagany. Kontakt wyłącznie przez platformę Studio HRL Adult.
            </p>
          </motion.section>

          {/* Galeria */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="gallery"
            className="mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)]"
          >
            <h2 className="font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: num * 0.05 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-xl cursor-pointer group"
                >
                  <img
                    src={`https://picsum.photos/400/500?random=${num}`}
                    alt={`Zdjęcie ${num}`}
                    className="w-full h-auto rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
            
            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 text-center">Teaser Videos (15-30s)</h3>
            <div className="flex flex-wrap gap-5 justify-center">
              <video width="400" height="auto" controls className="rounded-xl shadow-lg">
                <source src="placeholder-teaser1.mp4" type="video/mp4" />
                Twój browser nie wspiera video.
              </video>
              <video width="400" height="auto" controls className="rounded-xl shadow-lg">
                <source src="placeholder-teaser2.mp4" type="video/mp4" />
                Twój browser nie wspiera video.
              </video>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="cta"
            className="text-center p-10 md:p-12 rounded-2xl text-lg md:text-xl font-bold bg-gradient-to-r from-[#da70d6] to-[#ffd700] text-black"
          >
            <h2 className="text-2xl md:text-3xl mb-4 font-cinzel">Gotowy na wyjątkowe doświadczenie?</h2>
            <p className="mb-6 font-normal text-base">
              Kontaktuj się wyłącznie przez platformę Studio HRL Adult. Dyskrecja gwarantowana.
            </p>
            <button 
              onClick={() => alert('Kontakt przez Studio HRL Adult!')}
              className="px-10 py-4 text-lg bg-black text-[#ffd700] border-none rounded-full cursor-pointer font-playfair hover:scale-105 transition-transform shadow-lg"
            >
              Zarezerwuj teraz
            </button>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;
