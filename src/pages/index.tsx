import React from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, Video, Shield, Star, CheckCircle } from 'lucide-react';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Studio HRL Adult - Profesjonalny Management dla Twórców Tre Adults</title>
        <meta name="description" content="Kompleksowy management dla modeli, twórców i performerów. Zosta profesjonalistom w branzy adult entertainment." />
        <meta name="keywords" content="studio adult, management dla twórców, modelki, onlyfans, fansly" />
        <meta property="og:title" content="Studio HRL Adult - Profesjonalny Management" />
        <meta property="og:description" content="Zosta profesjonalistom w branzy adult entertainment" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/studio-noir.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/studio-noir.jpg')] bg-cover bg-center opacity-10"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Studio HRL Adult
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Profesjonalny management dla twórców tre adult. Zosta gwiazd branzy z naszym wsparciem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/casting" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all transform hover:scale-105">
                Do nasz teamu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/portfolio" className="inline-flex items-center px-8 py-4 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-all">
                Zobacz portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Dlaczego <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Studio HRL</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Oferujemy kompleksowe wsparcie na kadym etapie Twojej kariery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Personalny Management",
                description: "Dedykowany manager 24/7 i indywidualna strategia rozwoju"
              },
              {
                icon: Video,
                title: "Produkcja Tre",
                description: "Profesjonalne zdjcia, wideo i edycja materiaów"
              },
              {
                icon: Shield,
                title: "Bezpieczestwo",
                description: "Ochrona prywatnoci i anonimowo na najwyszym poziomie"
              },
              {
                icon: Star,
                title: "Marketing",
                description: "Promocja na wszystkich platformach i budowanie marki"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-rose-500/50 transition-all"
              >
                <feature.icon className="h-12 w-12 text-rose-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nasze <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">Usugi</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Kompleksowe rozwizania dla profesjonalnych twórców
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Management Platform",
                items: ["OnlyFans", "Fansly", "ManyVids", "Clips4Sale", "AVN Stars"],
                description: "Pena obsuga kont na platformach subskrypcyjnych"
              },
              {
                title: "Live Cam",
                items: ["Chaturbate", "MyFreeCams", "LiveJasmin", "Stripchat"],
                description: "Profesjonalne wsparcie na platformach live cam"
              },
              {
                title: "Content Creation",
                items: ["Zdjcia profesjonalne", "Wideo production", "Edycja", "Marketing"],
                description: "Tworzenie i promocja wysokiej jakoci tre"
              },
              {
                title: "Social Media",
                items: ["Twitter/X", "Reddit", "Instagram", "TikTok"],
                description: "Budowanie marki na platformach spoecznociowych"
              },
              {
                title: "Legal & Biznes",
                items: ["Umowy", "Prawo autorskie", "Podatki", "Ochrona"],
                description: "Pene wsparcie prawne i biznesowe"
              },
              {
                title: "Technologia",
                items: ["Strony WWW", "SEO", "Analytics", "Automation"],
                description: "Nowoczesne rozwizania technologiczne"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center text-gray-300">
                      <CheckCircle className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Zaczynamy Twoj Karier?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Docz do elitarnego grona twórców z naszym profesjonalnym wsparciem
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/casting" className="inline-flex items-center px-8 py-4 bg-white text-rose-600 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold">
                Zgloszenie casting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all">
                Skontaktuj si z nami
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 60 // Revalidate every minute
  };
};
