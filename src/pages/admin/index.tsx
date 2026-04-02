import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import { cn } from '@/utils/utils';

const sidebarItems = [
  { id: 'dashboard', name: 'Dashboard', ico: '📊' },
  { id: 'partners', name: 'Partnerki', ico: '👥', badge: '12' },
  { id: 'schedule', name: 'Harmonogram', ico: '📅' },
  { id: 'finance', name: 'Finanse', ico: '💰' },
  { id: 'content', name: 'Treści', ico: '📹' },
  { id: 'platforms', name: 'Platformy', ico: '🌐' },
  { id: 'documents', name: 'Dokumenty', ico: '📋' },
  { id: 'notifications', name: 'Powiadomienia', ico: '🔔', badge: '3' },
  { id: 'settings', name: 'Ustawienia', ico: '⚙️' },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <>
      <Head>
        <title>Admin Panel Studio HRL Adult | Dashboard Zarządzania</title>
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
                  className={cn(
                    "w-full flex items-center gap-4 px-8 py-4 text-[11px] tracking-widest uppercase transition-all border-l-2",
                    activeSection === item.id 
                      ? 'bg-gold/5 border-gold text-gold' 
                      : 'border-transparent text-dim hover:bg-gold/5 hover:text-gold'
                  )}
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
          <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-dark relative">
            <div className="max-w-6xl mx-auto space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 'dashboard' && <DashboardSection />}
                  {activeSection === 'partners' && <PartnersSection />}
                  {activeSection === 'schedule' && <ScheduleSection />}
                  {activeSection === 'finance' && <FinanceSection />}
                  {activeSection === 'content' && <ContentSection />}
                  {activeSection === 'platforms' && <PlatformsSection />}
                  {activeSection === 'documents' && <DocumentsSection />}
                  {activeSection === 'notifications' && <NotificationsSection />}
                  {activeSection === 'settings' && <SettingsSection />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>

        <div className="grain-overlay" />
      </div>
    </>
  );
};

// Sub-sections components
const DashboardSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Dashboard</h2>
      <p className="text-dim text-xs font-light">Przegląd kluczowych wskaźników i aktywności systemu</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Aktywne Partnerki', val: '12', trend: '↑ 2', color: 'text-gold' },
        { label: 'Przychody Miesięczne', val: '42 500 PLN', trend: '↑ 18%', color: 'text-green-500' },
        { label: 'Sesje Tygodniowo', val: '47', trend: '↑ 5', color: 'text-blue-500' },
        { label: 'Zadowolenie Klientów', val: '98.2%', trend: '↑ 0.8%', color: 'text-crimson' },
      ].map((kpi) => (
        <div key={kpi.label} className="bg-dark-2 border border-gold/10 p-6 space-y-4 hover:border-gold/30 transition-all">
          <span className="text-[8px] text-dim tracking-[0.3em] uppercase">{kpi.label}</span>
          <div className={cn("font-cormorant text-3xl", kpi.color)}>{kpi.val}</div>
          <div className="text-[9px] text-dim/60 italic">{kpi.trend} względem zeszłego m-ca</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h3 className="font-cormorant text-2xl text-gold italic">Ostatnie Partnerki</h3>
        <div className="bg-dark-2 border border-gold/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-dark-3/50 border-b border-gold/10">
              <tr>
                <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Partnerka</th>
                <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Status</th>
                <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Sesje</th>
                <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Przychód</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {[
                { name: 'Anna Rose', status: 'Aktywna', sessions: 24, revenue: '12 400 PLN' },
                { name: 'Marek Kowalski', status: 'Aktywny', sessions: 18, revenue: '8 200 PLN' },
                { name: 'Sophia Lee', status: 'Nowa', sessions: 8, revenue: '3 150 PLN' },
              ].map((p) => (
                <tr key={p.name} className="hover:bg-gold/5 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest",
                      p.status === 'Aktywna' || p.status === 'Aktywny' ? 'bg-green-500/10 text-green-500' : 'bg-gold/10 text-gold'
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] text-dim">{p.sessions}</td>
                  <td className="px-6 py-4 text-xs font-cormorant text-gold">{p.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-cormorant text-2xl text-gold italic">Najnowsze Aktywności</h3>
        <div className="space-y-4">
          {[
            { text: 'Nowa partnerka dołączyła', time: '2h temu', dot: 'bg-green-500' },
            { text: 'Sesja live zakończona', time: '4h temu', dot: 'bg-gold' },
            { text: 'Nowa umowa podpisana', time: '6h temu', dot: 'bg-blue-500' },
            { text: 'Aktualizacja systemu', time: '1 dzień temu', dot: 'bg-crimson' },
          ].map((a, i) => (
            <div key={i} className="bg-dark-2 border-l-2 border-gold/20 p-4 hover:border-gold transition-all">
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", a.dot)} />
                  <h4 className="text-[11px] font-bold text-white tracking-wide">{a.text}</h4>
                </div>
                <span className="text-[8px] text-dim/40 uppercase">{a.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PartnersSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Zarządzanie Partnerkami</h2>
      <p className="text-dim text-xs font-light">Pełna lista partnerek z ich statystykami i statusami</p>
    </div>
    <div className="bg-dark-2 border border-gold/10 p-8">
      <table className="w-full text-left">
        <thead className="bg-dark-3/50 border-b border-gold/10">
          <tr>
            <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Partnerka</th>
            <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Status</th>
            <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Followers</th>
            <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Satysfakcja</th>
            <th className="px-6 py-4 text-[9px] text-gold tracking-widest uppercase">Akcje</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/5">
          {[
            { name: 'Anna Rose', handle: '@annarose', status: 'Aktywna', followers: '50.2K', rating: '98%' },
            { name: 'Marek Kowalski', handle: '@marek_studio', status: 'Aktywny', followers: '32.1K', rating: '95%' },
            { name: 'Sophia Lee', handle: '@sophia_lee', status: 'Nowa', followers: '15.8K', rating: '92%' },
          ].map((p) => (
            <tr key={p.name} className="hover:bg-gold/5 transition-colors">
              <td className="px-6 py-4">
                <div className="text-xs font-medium text-white">{p.name}</div>
                <div className="text-[9px] text-dim">{p.handle}</div>
              </td>
              <td className="px-6 py-4">
                <span className="badge badge-g">{p.status}</span>
              </td>
              <td className="px-6 py-4 text-xs font-cormorant text-gold">{p.followers}</td>
              <td className="px-6 py-4 text-xs text-dim">{p.rating}</td>
              <td className="px-6 py-4">
                <button className="text-[10px] text-gold hover:text-white transition-colors">ZARZĄDZAJ</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ScheduleSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Harmonogram Sesji</h2>
      <p className="text-dim text-xs font-light">Kalendarz wszystkich zaplanowanych sesji i wydarzeń</p>
    </div>
    <div className="bg-dark-2 border border-gold/10 p-8 text-center">
      <div className="grid grid-cols-7 gap-1 mb-8">
        {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map(d => (
          <div key={d} className="bg-dark-4 p-2 text-[8px] text-gold uppercase tracking-widest">{d}</div>
        ))}
        {Array.from({ length: 31 }).map((_, i) => (
          <div key={i} className="bg-dark-3 border border-gold/5 p-4 min-h-[80px] text-left">
            <span className="text-[10px] text-dim">{i + 1}</span>
            {i === 5 && <div className="mt-2 text-[8px] bg-crimson/20 text-crimson p-1">Sesja: Anna</div>}
            {i === 12 && <div className="mt-2 text-[8px] bg-gold/20 text-gold p-1">Casting: 3 os.</div>}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FinanceSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Finanse i Raporty</h2>
      <p className="text-dim text-xs font-light">Przegląd przychodów, wypłat i podziału dochodów</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-dark-2 border border-gold/10 p-8 space-y-4">
        <h3 className="font-cormorant text-2xl text-gold italic">Podział 60/30/10</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-dim">Partnerki (60%)</span>
            <span className="text-lg text-white">25 500 PLN</span>
          </div>
          <div className="w-full bg-dark-4 h-1">
            <div className="bg-gold h-full w-[60%]" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-dim">Modele (30%)</span>
            <span className="text-lg text-white">12 750 PLN</span>
          </div>
          <div className="w-full bg-dark-4 h-1">
            <div className="bg-crimson h-full w-[30%]" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-dim">Studio (10%)</span>
            <span className="text-lg text-white">4 250 PLN</span>
          </div>
          <div className="w-full bg-dark-4 h-1">
            <div className="bg-blue-500 h-full w-[10%]" />
          </div>
        </div>
      </div>
      <div className="md:col-span-2 bg-dark-2 border border-gold/10 p-8">
        <h3 className="font-cormorant text-2xl text-gold italic mb-6">Ostatnie Wypłaty</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] text-gold uppercase tracking-widest border-b border-gold/10">
              <th className="py-4">Odbiorca</th>
              <th className="py-4">Kwota</th>
              <th className="py-4">Data</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-xs text-dim">
            <tr className="border-b border-gold/5">
              <td className="py-4">Anna Rose</td>
              <td className="py-4 text-white">4 230 PLN</td>
              <td className="py-4">2024-01-15</td>
              <td className="py-4 text-green-500">Zrealizowano</td>
            </tr>
            <tr className="border-b border-gold/5">
              <td className="py-4">Marek Kowalski</td>
              <td className="py-4 text-white">2 100 PLN</td>
              <td className="py-4">2024-01-14</td>
              <td className="py-4 text-green-500">Zrealizowano</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const ContentSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Zarządzanie Treściami</h2>
      <p className="text-dim text-xs font-light">Dodawaj i zarządzaj materiałami wideo, podcastami i dokumentami</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-dark-2 border border-gold/10 p-8 space-y-6">
        <h3 className="font-cormorant text-2xl text-gold italic">Dodaj Podcast</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Tytuł podcastu" className="admin-input" />
          <textarea placeholder="Opis..." className="admin-input min-h-[100px]" />
          <input type="file" className="text-xs text-dim" />
          <button className="btn-gold w-full">Opublikuj Podcast</button>
        </div>
      </div>
      <div className="bg-dark-2 border border-gold/10 p-8 space-y-6">
        <h3 className="font-cormorant text-2xl text-gold italic">Dodaj Wideo</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Tytuł wideo" className="admin-input" />
          <textarea placeholder="Opis..." className="admin-input min-h-[100px]" />
          <input type="file" className="text-xs text-dim" />
          <button className="btn-crimson w-full">Opublikuj Wideo</button>
        </div>
      </div>
    </div>
    <style jsx>{`
      .admin-input {
        width: 100%;
        background: rgba(30, 24, 40, 0.5);
        border: 1px solid rgba(201, 168, 76, 0.15);
        color: #FBF6F0;
        padding: 0.75rem;
        font-size: 0.8rem;
        outline: none;
      }
    `}</style>
  </div>
);

const PlatformsSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Status Platform</h2>
      <p className="text-dim text-xs font-light">Zarządzanie połączeniami z platformami zewnętrznymi</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {['OnlyFans', 'Fansly', 'Chaturbate', 'ManyVids'].map(p => (
        <div key={p} className="bg-dark-2 border border-gold/10 p-6 text-center space-y-4">
          <div className="text-3xl">🌐</div>
          <div className="text-xs font-bold text-white">{p}</div>
          <div className="text-[8px] bg-green-500/20 text-green-500 py-1 uppercase tracking-widest">Połączono</div>
          <button className="text-[9px] text-gold border-b border-gold/20 hover:border-gold transition-all uppercase tracking-widest">USTAWIENIA</button>
        </div>
      ))}
    </div>
  </div>
);

const DocumentsSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Zarządzanie Dokumentami</h2>
      <p className="text-dim text-xs font-light">Umowy, formularze i dokumentacja prawna partnerów</p>
    </div>
    <div className="bg-dark-2 border border-gold/10 p-8">
      <div className="space-y-4">
        {[
          { name: 'HRL_01_Dokumentacja_Biznesowa.docx', type: 'DOCX', date: '2024-01-15' },
          { name: 'HRL_02_Umowa_Partnerska.docx', type: 'DOCX', date: '2024-01-15' },
          { name: 'HRL_03_Regulamin_Szczegolowy.docx', type: 'DOCX', date: '2024-01-15' },
          { name: 'HRL_04_Formularz_Castingowy.docx', type: 'DOCX', date: '2024-01-15' },
        ].map(doc => (
          <div key={doc.name} className="flex justify-between items-center p-4 border-b border-gold/5 hover:bg-gold/5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="text-xl">📄</div>
              <div>
                <div className="text-xs text-white">{doc.name}</div>
                <div className="text-[9px] text-dim">{doc.date}</div>
              </div>
            </div>
            <button className="text-[9px] text-gold border-b border-gold/20 hover:border-gold transition-all uppercase tracking-widest">POBIERZ</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const NotificationsSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Powiadomienia</h2>
      <p className="text-dim text-xs font-light">Systemowe alerty i wiadomości</p>
    </div>
    <div className="space-y-4">
      {[
        { text: 'Nowa aplikacja castingowa: Anna Kowalska', time: '2h temu', type: 'gold' },
        { text: 'Wypłata zrealizowana: Marek Kowalski', time: '5h temu', type: 'green' },
        { text: 'Planowana sesja: Para #01 (Jutro, 14:00)', time: '8h temu', type: 'blue' },
      ].map((n, i) => (
        <div key={i} className="bg-dark-2 border-l-2 border-gold/20 p-6 flex justify-between items-center">
          <div className="space-y-1">
            <h4 className="text-sm text-white font-medium">{n.text}</h4>
            <p className="text-[10px] text-dim">{n.time}</p>
          </div>
          <button className="text-[9px] text-gold uppercase tracking-widest">Oznacz jako przeczytane</button>
        </div>
      ))}
    </div>
  </div>
);

const SettingsSection = () => (
  <div className="space-y-12">
    <div className="admin-header">
      <h2 className="font-cormorant text-4xl text-white italic">Ustawienia Systemu</h2>
      <p className="text-dim text-xs font-light">Konfiguracja platformy i kont administratorów</p>
    </div>
    <div className="bg-dark-2 border border-gold/10 p-8 space-y-6">
      <h3 className="font-cormorant text-2xl text-gold italic">Profil Administratora</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[9px] text-gold uppercase tracking-widest font-bold">Imię i Nazwisko</label>
          <input type="text" value="Administrator HRL" className="admin-input" readOnly />
        </div>
        <div className="space-y-4">
          <label className="text-[9px] text-gold uppercase tracking-widest font-bold">E-mail</label>
          <input type="email" value="admin@hrl-adult.pl" className="admin-input" readOnly />
        </div>
      </div>
      <button className="btn-outline">Zmień Hasło</button>
    </div>
    <style jsx>{`
      .admin-input {
        width: 100%;
        background: rgba(30, 24, 40, 0.5);
        border: 1px solid rgba(201, 168, 76, 0.15);
        color: #FBF6F0;
        padding: 0.75rem;
        font-size: 0.8rem;
        outline: none;
      }
    `}</style>
  </div>
);

export default AdminDashboard;
