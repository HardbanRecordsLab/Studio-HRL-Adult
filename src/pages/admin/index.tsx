import React, { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const kpis = [
    { label: 'Przychód Miesięczny', val: '42 500 PLN', trend: '+12%', color: 'text-gold' },
    { label: 'Aktywne Partnerki', val: '12', trend: '+2', color: 'text-blue-500' },
    { label: 'Sesje Dzisiaj', val: '4', trend: 'W normie', color: 'text-crimson' },
    { label: 'Nowe Aplikacje', val: '8', trend: 'Oczekujące', color: 'text-green-500' },
  ];

  const partners = [
    { name: 'Modelka #01', status: 'Active', platform: 'OnlyFans', revenue: '12 400 PLN' },
    { name: 'Modelka #02', status: 'Streaming', platform: 'Chaturbate', revenue: '8 200 PLN' },
    { name: 'Para #01', status: 'Active', platform: 'ManyVids', revenue: '15 900 PLN' },
    { name: 'Modelka #03', status: 'Inactive', platform: 'Fansly', revenue: '0 PLN' },
  ];

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', ico: '📊' },
    { id: 'partners', name: 'Partnerki', ico: '👥', badge: '12' },
    { id: 'schedule', name: 'Harmonogram', ico: '📅' },
    { id: 'finance', name: 'Finanse', ico: '💰' },
    { id: 'content', name: 'Treści', ico: '📹' },
    { id: 'platforms', name: 'Platformy', ico: '🌐' },
    { id: 'documents', name: 'Dokumenty', ico: '📋' },
    { id: 'settings', name: 'Ustawienia', ico: '⚙️' },
  ];

  return (
    <>
      <Head>
        <title>Admin Panel - Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text flex flex-col">
        <Navigation />

        <div className="flex-1 flex pt-[76px]">
          {/* Sidebar */}
          <aside className="w-64 bg-dark-2 border-r border-gold/10 hidden lg:flex flex-col sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto">
            <div className="p-8 border-b border-gold/5">
              <h3 className="font-cormorant text-xl text-gold italic uppercase tracking-widest">Admin Panel</h3>
              <p className="text-[8px] text-dim/60 tracking-[0.3em] uppercase mt-1">System Zarządzania</p>
            </div>
            
            <nav className="flex-1 py-6">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-4 px-8 py-4 text-[11px] tracking-widest uppercase transition-all border-l-2 ${
                    activeSection === item.id 
                      ? 'bg-gold/5 border-gold text-gold' 
                      : 'border-transparent text-dim hover:bg-gold/5 hover:text-gold'
                  }`}
                >
                  <span className="text-sm">{item.ico}</span>
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-crimson text-white text-[8px] px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-dark">
            <div className="max-w-6xl mx-auto space-y-12">
              {/* Header */}
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <h2 className="font-cormorant text-4xl text-white italic">Witaj, Administratorze</h2>
                  <p className="text-dim text-xs font-light">Oto podsumowanie działań studia na dzień dzisiejszy.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gold tracking-widest uppercase font-bold">{new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="bg-dark-2 border border-gold/10 p-6 space-y-4 hover:border-gold/30 transition-all">
                    <span className="text-[8px] text-dim tracking-[0.3em] uppercase">{kpi.label}</span>
                    <div className={`font-cormorant text-3xl ${kpi.color}`}>{kpi.val}</div>
                    <div className="text-[9px] text-dim/60 italic">{kpi.trend} względem zeszłego m-ca</div>
                  </div>
                ))}
              </div>

              {/* Main Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Partners Table */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-cormorant text-2xl text-gold italic">Aktywne Partnerki</h3>
                    <button className="text-[9px] text-gold border-b border-gold/20 hover:border-gold transition-all uppercase tracking-widest">Wszystkie →</button>
                  </div>
                  <div className="bg-dark-2 border border-gold/10 overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-dark-3/50 border-b border-gold/10">
                        <tr>
                          <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Nazwa</th>
                          <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Status</th>
                          <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Platforma</th>
                          <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Przychód</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gold/5">
                        {partners.map((p) => (
                          <tr key={p.name} className="hover:bg-gold/5 transition-colors">
                            <td className="px-6 py-4 text-xs font-medium">{p.name}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest ${
                                p.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                                p.status === 'Streaming' ? 'bg-blue-500/10 text-blue-500' : 'bg-crimson/10 text-crimson'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-[10px] text-dim">{p.platform}</td>
                            <td className="px-6 py-4 text-xs font-cormorant text-gold">{p.revenue}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notifications/Recent Actions */}
                <div className="space-y-6">
                  <h3 className="font-cormorant text-2xl text-gold italic">Ostatnie Powiadomienia</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Nowa aplikacja castingowa', time: '2h temu', type: 'gold' },
                      { title: 'Wypłata zrealizowana: Modelka #01', time: '5h temu', type: 'green' },
                      { title: 'Planowana sesja: Para #01', time: 'Jutro, 14:00', type: 'blue' },
                    ].map((n, i) => (
                      <div key={i} className="bg-dark-2 border-l-2 border-gold/20 p-4 hover:border-gold transition-all cursor-none">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-[11px] font-bold text-white tracking-wide">{n.title}</h4>
                          <span className="text-[8px] text-dim/40 uppercase">{n.time}</span>
                        </div>
                        <p className="text-[9px] text-dim font-light">System automatycznie wygenerował powiadomienie.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default AdminDashboard;
