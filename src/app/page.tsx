'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Video, 
  Music, 
  DollarSign, 
  Shield, 
  Star,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const features = [
    {
      icon: Users,
      title: 'Partnerzy',
      description: 'Docepanie profesjonalnych modelek i partnerów do branzy',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Video,
      title: 'Produkcja',
      description: 'Wysokiej klasy produkcja wideo i foto sesji',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Music,
      title: '18 Platform',
      description: 'Dystrybucja na 18 platformach wideo',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: DollarSign,
      title: 'Finanse',
      description: 'Transparentny system podzialu przychodów',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: 'Bezpieczenstwo',
      description: 'Pena ochrona danych i prywatnosci',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Star,
      title: 'Akademia',
      description: 'Szkolenia i rozwój dla partnerów',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const stats = [
    { label: 'Partnerów', value: '24+', color: 'text-blue-400' },
    { label: 'Platform', value: '18', color: 'text-green-400' },
    { label: 'Kursów', value: '12', color: 'text-purple-400' },
    { label: 'Lat Doiswiadczenia', value: '5+', color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-800/50 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold">
                HRL
              </div>
              <span className="text-xl font-bold">Studio HRL Adult</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Funkcje</Link>
              <Link href="#about" className="text-gray-300 hover:text-white transition-colors">O nas</Link>
              <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Kontakt</Link>
              <Link href="/admin" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 rounded-lg hover:from-rose-600 hover:to-rose-800 transition-all">
                Admin Panel
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4"
            >
              <div className="flex flex-col gap-4">
                <Link href="#features" className="text-gray-300 hover:text-white transition-colors">Funkcje</Link>
                <Link href="#about" className="text-gray-300 hover:text-white transition-colors">O nas</Link>
                <Link href="#contact" className="text-gray-300 hover:text-white transition-colors">Kontakt</Link>
                <Link href="/admin" className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 rounded-lg hover:from-rose-600 hover:to-rose-800 transition-all text-center">
                  Admin Panel
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                  Studio HRL Adult
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Profesjonalne zarzadzanie branza adult. Przyszlosc produkcji i dystrybucji.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/admin" className="px-8 py-3 bg-gradient-to-r from-rose-500 to-rose-700 rounded-lg hover:from-rose-600 hover:to-rose-800 transition-all flex items-center justify-center gap-2">
                  Panel Admina
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="px-8 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-all">
                  Dowiedz sie wiecej
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Kompletny System Zarzadzania
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Wszystkie narzedzia potrzebne do zarzadzania studiem adult w jednym miejscu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
                O Studio HRL Adult
              </span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-300 mb-6">
                Studio HRL Adult to nowoczesna platforma zarzadzania branza adult, która laczy 
                profesjonalizm z innowacyjnymi rozwiazaniami technologicznymi.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Nasz system zapewnia pelna kontrola nad wszystkimi aspektami dzialalnosci studia, 
                od rekrutacji partnerów, przez produkcje, po dystrybucje na 18 platformach.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-rose-400 mb-2">5+</div>
                  <div className="text-gray-400">Lat doswiadczenia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">24+</div>
                  <div className="text-gray-400">Aktywnych partnerów</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">18</div>
                  <div className="text-gray-400">Platform dystrybucji</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-rose-500 to-rose-700 rounded-2xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gotowy do rozpoczecia?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Zaloguj sie do panelu admina i zarzadzaj swoim studiem
            </p>
            <Link href="/admin" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-rose-600 rounded-lg hover:bg-gray-100 transition-all font-semibold">
              Przejdz do Panelu Admina
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold text-sm">
                HRL
              </div>
              <span className="text-gray-400">© 2024 Studio HRL Adult. Wszystkie prawa zastrzezone.</span>
            </div>
            <div className="flex gap-6">
              <Link href="#privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="#terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
