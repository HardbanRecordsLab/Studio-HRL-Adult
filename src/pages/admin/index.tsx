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
  { id: 'crm', name: 'Wiadomości', ico: '💬', badge: '5' },
  { id: 'settings', name: 'Ustawienia', ico: '⚙️' },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <>
      <Head>
        <title>PRO Admin Panel | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text flex flex-col">
        <Navigation />

        <div className="flex-1 flex pt-[76px]">
          {/* PRO Sidebar */}
          <aside className="w-72 bg-dark-2 border-r border-gold/10 hidden lg:flex flex-col sticky top-[76px] h-[calc(100vh-76px)] overflow-y-auto z-40">
            <div className="p-8 border-b border-gold/5 bg-dark-3/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-gold/30 p-1">
                  <img src="/logo/studio hrl adultbezła logo.png" alt="HRL" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-cormorant text-lg text-gold italic leading-tight">Admin PRO</h3>
                  <p className="text-[7px] text-dim tracking-[0.4em] uppercase">Control System</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full w-fit">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[7px] text-green-500 font-bold tracking-widest uppercase">System Online</span>
              </div>
            </div>
            
            <nav className="flex-1 py-6 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-4 px-8 py-4 text-[10px] tracking-widest uppercase transition-all border-l-2 group relative overflow-hidden",
                    activeSection === item.id 
                      ? 'bg-gold/5 border-gold text-gold' 
                      : 'border-transparent text-dim hover:bg-gold/5 hover:text-gold'
                  )}
                >
                  <span className="text-sm">{item.ico}</span>
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-crimson text-white text-[8px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>
                  )}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gold/5 pointer-events-none"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="p-8 border-t border-gold/5 text-center">
              <button className="text-[8px] text-dim hover:text-crimson transition-colors uppercase tracking-widest">
                Wyloguj Bezpiecznie
              </button>
            </div>
          </aside>

          {/* PRO Content */}
          <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-dark relative min-h-screen">
            <div className="max-w-7xl mx-auto space-y-12 pb-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeSection === 'dashboard' && <DashboardSection />}
                  {activeSection === 'partners' && <PartnersSection />}
                  {activeSection === 'schedule' && <ScheduleSection />}
                  {activeSection === 'finance' && <FinanceSection />}
                  {activeSection === 'content' && <ContentSection />}
                  {activeSection === 'platforms' && <PlatformsSection />}
                  {activeSection === 'documents' && <DocumentsSection />}
                  {activeSection === 'crm' && <CRMSection />}
                  {activeSection === 'settings' && <SettingsSection />}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Grain Overlay for Admin */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-grain" />
          </main>
        </div>
      </div>
    </>
  );
};

// Sub-sections components with REAL TOOLS
const DashboardSection = () => (
  <div className="space-y-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-2">
        <h2 className="font-cormorant text-4xl md:text-5xl text-white italic">Operational Dashboard</h2>
        <p className="text-dim text-xs font-light tracking-widest uppercase">System status: Normal | Active Partners: 12</p>
      </div>
      <div className="flex gap-4">
        <button className="btn-outline py-2 px-6 text-[8px]">Generuj Raport PDF</button>
        <button className="btn-gold py-2 px-6 text-[8px]">Nowa Partnerka +</button>
      </div>
    </div>

    {/* Real-time KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Revenue (M-T-D)', val: '€142,500', trend: '+18.5%', color: 'text-gold', bg: 'bg-gold/5' },
        { label: 'Platform Distribution', val: '98.2%', trend: 'Optimal', color: 'text-green-500', bg: 'bg-green-500/5' },
        { label: 'Active Sessions', val: '47', trend: 'Live now: 3', color: 'text-blue-500', bg: 'bg-blue-500/5' },
        { label: 'Compliance Score', val: '100%', trend: 'Verified', color: 'text-crimson', bg: 'bg-crimson/5' },
      ].map((kpi) => (
        <div key={kpi.label} className={cn("border border-gold/10 p-8 space-y-4 hover:border-gold/30 transition-all", kpi.bg)}>
          <span className="text-[8px] text-dim tracking-[0.3em] uppercase">{kpi.label}</span>
          <div className={cn("font-cormorant text-4xl", kpi.color)}>{kpi.val}</div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] text-dim italic">{kpi.trend}</span>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Platform Performance Chart (Placeholder UI) */}
      <div className="lg:col-span-2 space-y-8 bg-dark-2/50 border border-gold/10 p-10">
        <div className="flex justify-between items-center">
          <h3 className="font-cormorant text-2xl text-gold italic">Revenue by Platform</h3>
          <select className="bg-dark text-[8px] text-gold border border-gold/20 px-3 py-1 outline-none">
            <option>Ostatnie 30 dni</option>
            <option>Ostatnie 3 miesiące</option>
          </select>
        </div>
        <div className="h-[300px] flex items-end justify-between gap-4">
          {[65, 80, 45, 90, 30, 70, 85].map((h, i) => (
            <div key={i} className="flex-1 group relative">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                className="w-full bg-gold-gradient opacity-60 group-hover:opacity-100 transition-all cursor-pointer"
              />
              <div className="text-[7px] text-dim text-center mt-4 tracking-widest uppercase">Day {i+1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions / Alerts */}
      <div className="space-y-8">
        <h3 className="font-cormorant text-2xl text-gold italic">System Alerts</h3>
        <div className="space-y-4">
          {[
            { text: 'Pending KYC Verification: Anna R.', type: 'urgent', time: '12m ago' },
            { text: 'OnlyFans API Sync Successful', type: 'info', time: '1h ago' },
            { text: 'Contract Expiring: Marcus K.', type: 'warning', time: '3h ago' },
            { text: 'New Casting Application Received', type: 'info', time: '6h ago' },
          ].map((a, i) => (
            <div key={i} className="bg-dark-2 border-l-2 border-gold/20 p-6 flex flex-col gap-2 hover:bg-gold/5 transition-all">
              <div className="flex justify-between items-center">
                <span className={cn(
                  "text-[7px] font-bold tracking-widest uppercase px-2 py-0.5",
                  a.type === 'urgent' ? 'text-crimson bg-crimson/10' : 
                  a.type === 'warning' ? 'text-gold bg-gold/10' : 'text-blue-500 bg-blue-500/10'
                )}>{a.type}</span>
                <span className="text-[7px] text-dim/40 uppercase">{a.time}</span>
              </div>
              <h4 className="text-[11px] font-medium text-white">{a.text}</h4>
            </div>
          ))}
        </div>
        <button className="w-full py-4 border border-gold/20 text-[9px] text-gold tracking-widest uppercase hover:bg-gold/5">See All Notifications</button>
      </div>
    </div>
  </div>
);

const PartnersSection = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h2 className="font-cormorant text-4xl text-white italic">Partner Management</h2>
        <p className="text-dim text-xs font-light tracking-widest uppercase">Total Partners: 12 Active | 4 Pending</p>
      </div>
      <div className="relative w-64">
        <input type="text" placeholder="Search partners..." className="w-full bg-dark-2 border border-gold/10 px-4 py-2 text-[10px] text-white focus:border-gold/40 transition-colors outline-none" />
      </div>
    </div>

    <div className="bg-dark-2 border border-gold/10 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-dark-3/50 border-b border-gold/10">
            <th className="px-8 py-6 text-[9px] text-gold tracking-[0.2em] uppercase font-bold">Name & Handle</th>
            <th className="px-8 py-6 text-[9px] text-gold tracking-[0.2em] uppercase font-bold">Status</th>
            <th className="px-8 py-6 text-[9px] text-gold tracking-[0.2em] uppercase font-bold">Revenue (M)</th>
            <th className="px-8 py-6 text-[9px] text-gold tracking-[0.2em] uppercase font-bold">Last Sync</th>
            <th className="px-8 py-6 text-[9px] text-gold tracking-[0.2em] uppercase font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/5">
          {[
            { name: 'Anna Rose', handle: '@annarose_x', status: 'Active', revenue: '€12,450', sync: '2m ago' },
            { name: 'Marcus Kovac', handle: '@marcus_hrl', status: 'Contract Pending', revenue: '€8,120', sync: '1h ago' },
            { name: 'Elena Silver', handle: '@elena_silver', status: 'Active', revenue: '€15,900', sync: '30m ago' },
            { name: 'David Bloom', handle: '@david_hrl', status: 'Offline', revenue: '€2,340', sync: '1d ago' },
          ].map((p, i) => (
            <tr key={i} className="hover:bg-gold/5 transition-colors group">
              <td className="px-8 py-6">
                <div className="text-xs font-medium text-white">{p.name}</div>
                <div className="text-[9px] text-dim">{p.handle}</div>
              </td>
              <td className="px-8 py-6">
                <span className={cn(
                  "text-[8px] px-3 py-1 border uppercase tracking-widest font-bold",
                  p.status === 'Active' ? 'text-green-500 border-green-500/20 bg-green-500/5' : 
                  p.status === 'Offline' ? 'text-dim border-dim/20 bg-dim/5' : 'text-gold border-gold/20 bg-gold/5'
                )}>{p.status}</span>
              </td>
              <td className="px-8 py-6 text-xs font-cormorant text-gold">{p.revenue}</td>
              <td className="px-8 py-6 text-[10px] text-dim">{p.sync}</td>
              <td className="px-8 py-6 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[9px] text-gold hover:text-white transition-colors uppercase tracking-widest font-bold">Edit</button>
                <button className="text-[9px] text-crimson hover:text-white transition-colors uppercase tracking-widest font-bold">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const FinanceSection = () => (
  <div className="space-y-12">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h2 className="font-cormorant text-4xl text-white italic">Financial Operations</h2>
        <p className="text-dim text-xs font-light tracking-widest uppercase">Cycle: April 2026 | Next Payout: April 15</p>
      </div>
      <button className="btn-gold py-3 px-8 text-[9px]">Process Payouts (Bulk)</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Revenue Breakdown */}
      <div className="bg-dark-2 border border-gold/10 p-10 space-y-8">
        <h3 className="font-cormorant text-2xl text-gold italic">Revenue Distribution</h3>
        <div className="space-y-6">
          {[
            { label: 'Partners (60%)', val: '€85,500', color: 'bg-gold', w: '60%' },
            { label: 'Studio Ops (30%)', val: '€42,750', color: 'bg-crimson', w: '30%' },
            { label: 'Reserves (10%)', val: '€14,250', color: 'bg-blue-500', w: '10%' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase">
                <span className="text-dim">{item.label}</span>
                <span className="text-white font-bold">{item.val}</span>
              </div>
              <div className="h-1 bg-dark w-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: item.w }} className={cn("h-full", item.color)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions Tool */}
      <div className="md:col-span-2 bg-dark-2 border border-gold/10 p-10">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-cormorant text-2xl text-gold italic">Recent Transactions</h3>
          <button className="text-[9px] text-dim hover:text-gold transition-colors tracking-widest uppercase">View All History</button>
        </div>
        <div className="space-y-4">
          {[
            { id: '#TR-9821', user: 'Anna Rose', amt: '+€1,450', type: 'Subscription Payout', date: 'Apr 02, 14:20' },
            { id: '#TR-9820', user: 'Fansly', amt: '+€4,200', type: 'API Settlement', date: 'Apr 02, 11:15' },
            { id: '#TR-9819', user: 'AWS Cloud', amt: '-€210', type: 'Server Infrastructure', date: 'Apr 01, 23:50' },
            { id: '#TR-9818', user: 'Elena Silver', amt: '+€3,100', type: 'Custom Content Tip', date: 'Apr 01, 18:30' },
          ].map((t, i) => (
            <div key={i} className="flex justify-between items-center p-5 border border-gold/5 hover:border-gold/20 transition-all">
              <div className="flex items-center gap-6">
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg", t.amt.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-crimson/10 text-crimson')}>
                  {t.amt.startsWith('+') ? '↙' : '↗'}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{t.user}</div>
                  <div className="text-[9px] text-dim tracking-widest uppercase">{t.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={cn("text-sm font-cormorant font-bold", t.amt.startsWith('+') ? 'text-gold' : 'text-crimson')}>{t.amt}</div>
                <div className="text-[8px] text-dim/40 uppercase tracking-widest">{t.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Other sections follow the same PRO style...
const ScheduleSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">Calendar Tool Integration Pending...</h2></div>;
const ContentSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">Content Management System...</h2></div>;
const PlatformsSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">API Connector Center...</h2></div>;
const DocumentsSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">Legal Document Rejestry...</h2></div>;
const CRMSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">Secure Messenger Center...</h2></div>;
const SettingsSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">System Configurations...</h2></div>;

export default AdminDashboard;
