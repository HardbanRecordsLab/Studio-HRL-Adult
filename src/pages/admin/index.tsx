'use client';

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import { cn } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MediaUpload from '@/components/media/MediaUpload';
import AcademyMediaManager from '@/components/admin/AcademyMediaManager';
import { supabase } from '@/utils/supabase';

const sidebarItems = [
  { id: 'dashboard', name: 'Dashboard', ico: '📊' },
  { id: 'partners', name: 'Partnerki', ico: '👥' },
  { id: 'schedule', name: 'Harmonogram', ico: '📅' },
  { id: 'finance', name: 'Finanse', ico: '💰' },
  { id: 'content', name: 'Treści', ico: '📹' },
  { id: 'academy', name: 'Akademia', ico: '🎓' },
  { id: 'platforms', name: 'Platformy', ico: '🌐' },
  { id: 'documents', name: 'Dokumenty', ico: '📋' },
  { id: 'crm', name: 'Wiadomości', ico: '💬', badge: '5' },
  { id: 'settings', name: 'Ustawienia', ico: '⚙️' },
];

const AdminDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSession(session);
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.session) {
      setLoginError(error?.message || 'Błąd logowania');
      setLoading(false);
      return;
    }

    setSession(data.session);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const authHeaders = session?.access_token
    ? { headers: { Authorization: `Bearer ${session.access_token}` } }
    : {};

  const isAdminEmail = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const { data: dashboardData, isLoading: dashLoading, refetch: refetchDashboard } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: () => axios.get('/api/admin/dashboard', authHeaders).then(res => res.data),
    enabled: !!session && isAdminEmail, // Only fetch if session and admin
  });

  const { data: partnersData, isLoading: partnersLoading, refetch: refetchPartners } = useQuery({
    queryKey: ['admin-partners'],
    queryFn: () => axios.get('/api/admin/partners', authHeaders).then(res => res.data),
    enabled: !!session && isAdminEmail, // Only fetch if session and admin
  });

  const { data: financeData, isLoading: financeLoading, refetch: refetchFinance } = useQuery({
    queryKey: ['admin-finance'],
    queryFn: () => axios.get('/api/admin/finance', authHeaders).then(res => res.data),
    enabled: !!session && isAdminEmail, // Only fetch if session and admin
  });

  if (!session || !isAdminEmail) {

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
              <button onClick={handleLogout} className="text-[8px] text-dim hover:text-crimson transition-colors uppercase tracking-widest">
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
                  {activeSection === 'dashboard' && <DashboardSection data={dashboardData} loading={dashLoading} />}
                  {activeSection === 'partners' && <PartnersSection data={partnersData} loading={partnersLoading} refetch={refetchPartners} />}
                  {activeSection === 'schedule' && <ScheduleSection />}
                  {activeSection === 'finance' && <FinanceSection data={financeData} loading={financeLoading} />}
                  {activeSection === 'content' && <ContentSection />}
                  {activeSection === 'academy' && <AcademySection />}
                  {activeSection === 'platforms' && <PlatformsSection_Placeholder />}
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
const DashboardSection = ({ data, loading }: any) => (
  <div className="space-y-12">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <div className="space-y-2">
        <h2 className="font-cormorant text-4xl md:text-5xl text-white italic">Operational Dashboard</h2>
        <p className="text-dim text-xs font-light tracking-widest uppercase">System status: Normal</p>
      </div>
      <div className="flex gap-4">
        <button className="btn-outline py-2 px-6 text-[8px]">Generuj Raport PDF</button>
        <button className="btn-gold py-2 px-6 text-[8px]">Nowa Partnerka +</button>
      </div>
    </div>

    {/* Real-time KPI Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border border-gold/10 p-8 space-y-4 animate-pulse bg-dark-2">
            <div className="h-2 w-12 bg-gold/20" />
            <div className="h-8 w-24 bg-gold/20" />
          </div>
        ))
      ) : (
        data?.kpis?.map((kpi: any) => (
          <div key={kpi.label} className={cn("border border-gold/10 p-8 space-y-4 hover:border-gold/30 transition-all", kpi.bg)}>
            <span className="text-[8px] text-dim tracking-[0.3em] uppercase">{kpi.label}</span>
            <div className={cn("font-cormorant text-4xl", kpi.color)}>{kpi.val}</div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-dim italic">{kpi.trend}</span>
              <div className="h-px flex-1 bg-gold/10" />
            </div>
          </div>
        ))
      )}
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
          {loading ? (
            <div className="text-[10px] text-dim italic">Loading alerts...</div>
          ) : (
            data?.recentAlerts?.map((a: any, i: number) => (
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
            ))
          )}
        </div>
        <button className="w-full py-4 border border-gold/20 text-[9px] text-gold tracking-widest uppercase hover:bg-gold/5">See All Notifications</button>
      </div>
    </div>
  </div>
);

const PartnersSection = ({ data, loading, refetch }: any) => (
  <div className="space-y-12">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <h2 className="font-cormorant text-4xl text-white italic">Partner Management</h2>
        <p className="text-dim text-xs font-light tracking-widest uppercase">Total Partners: {data?.length || 0}</p>
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
          {loading ? (
            <tr><td colSpan={5} className="p-8 text-center text-xs text-dim italic">Pobieranie danych...</td></tr>
          ) : (
            data?.map((p: any, i: number) => (
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
                <td className="px-8 py-6 text-xs font-cormorant text-gold">€{p.revenueTotal?.toLocaleString()}</td>
                <td className="px-8 py-6 text-[10px] text-dim">{p.sync}</td>
                <td className="px-8 py-6 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[9px] text-gold hover:text-white transition-colors uppercase tracking-widest font-bold">Edit</button>
                  <button 
                    onClick={async () => {
                      if(confirm('Usunąć partnerkę?')) {
                        await axios.delete(`/api/admin/partners?id=${p.id}`);
                        refetch();
                      }
                    }}
                    className="text-[9px] text-crimson hover:text-white transition-colors uppercase tracking-widest font-bold"
                  >
                    Disable
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const FinanceSection = ({ data, loading }: any) => (
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
            { label: 'Partners (60%)', w: '60%', color: 'bg-gold' },
            { label: 'Studio Ops (30%)', w: '30%', color: 'bg-crimson' },
            { label: 'Reserves (10%)', w: '10%', color: 'bg-blue-500' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase">
                <span className="text-dim">{item.label}</span>
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
          {loading ? (
            <div className="text-center p-8 text-xs text-dim italic">Ładowanie transakcji...</div>
          ) : (
            data?.map((t: any, i: number) => (
              <div key={i} className="flex justify-between items-center p-5 border border-gold/5 hover:border-gold/20 transition-all">
                <div className="flex items-center gap-6">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-lg", t.isPositive ? 'bg-green-500/10 text-green-500' : 'bg-crimson/10 text-crimson')}>
                    {t.isPositive ? '↙' : '↗'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{t.user}</div>
                    <div className="text-[9px] text-dim tracking-widest uppercase">{t.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn("text-sm font-cormorant font-bold", t.isPositive ? 'text-gold' : 'text-crimson')}>
                    {t.isPositive ? '+' : ''}€{Math.abs(t.amt).toLocaleString()}
                  </div>
                  <div className="text-[8px] text-dim/40 uppercase tracking-widest">{t.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  </div>
);

// Other sections follow the same PRO style...
const ScheduleSection = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">Calendar Tool Integration Pending...</h2></div>;
const ContentSection = () => {
  const { data, refetch } = useQuery({
    queryKey: ['admin-content'],
    queryFn: () => axios.get('/api/admin/content').then(res => res.data)
  });

  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaPublicId, setMediaPublicId] = useState('');
  const [uploadType, setUploadType] = useState<'video' | 'podcast' | 'document'>('video');
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadComplete = (url: string, publicId: string) => {
    setMediaUrl(url);
    setMediaPublicId(publicId);
    setUploadError(null);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setMediaUrl('');
    setMediaPublicId('');
  };

  const handleContentSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newItem = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      title: formData.get('title'),
      description: formData.get('description'),
      type: uploadType,
      cloudinaryUrl: mediaUrl,
      cloudinaryPublicId: mediaPublicId,
      metadata: {
        duration: formData.get('duration') || null,
        episodeNumber: formData.get('episodeNumber') || null,
        category: formData.get('category') || null,
      },
    };

    await axios.post('/api/admin/content', newItem);
    refetch();
    e.target.reset();
    setMediaUrl('');
    setMediaPublicId('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Na pewno usunąć ten element?')) return;
    await axios.delete(`/api/admin/content?id=${id}`);
    refetch();
  };

  return (
    <div className="space-y-12">
      <div className="admin-header">
        <h2 className="font-cormorant text-4xl text-white italic">Zarządzanie Treściami</h2>
        <p className="text-dim text-xs font-light">Dodawaj i zarządzaj materiałami wideo, podcastami i dokumentami</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-dark-2 border border-gold/10 p-8 space-y-6">
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={() => setUploadType('video')}
              className={cn('px-4 py-2 uppercase text-[9px] tracking-[0.3em] border rounded-full transition-all',
                uploadType === 'video' ? 'bg-gold text-dark border-gold' : 'border-gold/10 text-dim hover:bg-gold/10')}
            >Wideo</button>
            <button
              onClick={() => setUploadType('podcast')}
              className={cn('px-4 py-2 uppercase text-[9px] tracking-[0.3em] border rounded-full transition-all',
                uploadType === 'podcast' ? 'bg-gold text-dark border-gold' : 'border-gold/10 text-dim hover:bg-gold/10')}
            >Podcast</button>
            <button
              onClick={() => setUploadType('document')}
              className={cn('px-4 py-2 uppercase text-[9px] tracking-[0.3em] border rounded-full transition-all',
                uploadType === 'document' ? 'bg-gold text-dark border-gold' : 'border-gold/10 text-dim hover:bg-gold/10')}
            >Dokument</button>
          </div>

          <div className="space-y-6">
            <h3 className="font-cormorant text-2xl text-gold italic">Upload mediów</h3>
            <MediaUpload
              acceptedTypes={uploadType === 'document' ? '.pdf,.doc,.docx,.txt' : 'image/*,video/*,audio/*'}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              folder={`studio-hrl-adult/${uploadType}`}
            />
            {mediaUrl && (
              <div className="rounded-lg border border-gold/10 p-4 bg-dark-3">
                <div className="text-[10px] uppercase text-dim tracking-[0.3em] mb-2">Media URL</div>
                <a href={mediaUrl} target="_blank" rel="noreferrer" className="text-sm text-gold underline break-all">{mediaUrl}</a>
              </div>
            )}
            {uploadError && <div className="text-crimson text-sm">Błąd uploadu: {uploadError}</div>}
          </div>

          <form onSubmit={handleContentSubmit} className="space-y-4">
            <input name="title" required type="text" placeholder="Tytuł" className="admin-input" />
            <textarea name="description" placeholder="Opis..." className="admin-input min-h-[120px]" />
            {uploadType !== 'document' && (
              <input name="duration" type="text" placeholder="Czas trwania (np. 12:30)" className="admin-input" />
            )}
            {uploadType === 'podcast' && (
              <input name="episodeNumber" type="text" placeholder="Numer odcinka" className="admin-input" />
            )}
            <input name="category" type="text" placeholder="Kategoria" className="admin-input" />
            <button type="submit" className="btn-gold w-full">Zapisz {uploadType}</button>
          </form>
        </div>

        <div className="bg-dark-2 border border-gold/10 p-8 space-y-6">
          <h3 className="font-cormorant text-2xl text-gold italic">Opublikowane Treści</h3>
          <div className="space-y-4">
            {data?.length === 0 ? (
              <div className="text-xs text-dim italic">Brak dodanych treści</div>
            ) : (
              data.map((item: any) => (
                <div key={item.id} className="flex flex-col gap-3 border border-gold/10 p-4 rounded-lg hover:border-gold/20 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-xs uppercase tracking-[0.3em] text-dim">{item.type}</div>
                      <div className="text-sm font-bold text-white">{item.title}</div>
                      <div className="text-[9px] text-dim">{item.description?.substring(0, 80)}...</div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-[9px] uppercase tracking-[0.3em] text-crimson hover:text-white"
                    >Usuń</button>
                  </div>
                  {item.cloudinaryUrl && (
                    <a href={item.cloudinaryUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gold underline break-all">Podgląd media</a>
                  )}
                  <div className="text-[8px] text-dim uppercase tracking-[0.3em]">{new Date(item.createdAt).toLocaleDateString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>


    </div>
  );
};
const PlatformsSection_Placeholder = () => <div className="p-20 text-center border border-gold/10 bg-dark-2"><h2 className="font-cormorant text-4xl text-gold italic">API Connector Center...</h2></div>;

const AcademySection = () => <AcademyMediaManager />;

const DocumentsSection = () => {
  const docs = [
    { name: 'Operacyjna Mapa Platform', type: 'PDF', size: '2.3 MB', date: '2026-03-01', status: 'active' },
    { name: 'Dokumentacja Biznesowa', type: 'PDF', size: '4.1 MB', date: '2026-02-15', status: 'active' },
    { name: 'Umowa Partnerska', type: 'DOCX', size: '156 KB', date: '2026-01-10', status: 'active' },
    { name: 'Regulamin Szczegółowy', type: 'PDF', size: '890 KB', date: '2026-01-10', status: 'active' },
    { name: 'Formularz Castingowy', type: 'DOCX', size: '234 KB', date: '2026-01-10', status: 'active' },
    { name: 'Przewodnik Operacyjny', type: 'PDF', size: '12.4 MB', date: '2026-03-15', status: 'active' },
    { name: 'Polityka Prywatności RODO', type: 'PDF', size: '320 KB', date: '2026-01-01', status: 'active' },
    { name: 'Rejestr 18 U.S.C. § 2257', type: 'PDF', size: '1.1 MB', date: '2026-04-01', status: 'active' },
  ];
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-cormorant text-4xl text-white italic">Rejestr Dokumentów</h2>
          <p className="text-dim text-xs tracking-widest uppercase mt-1">Prawne, operacyjne i partnerskie</p>
        </div>
        <button className="btn-gold text-[9px] py-2 px-6">+ Dodaj Dokument</button>
      </div>
      <div className="bg-dark-2 border border-gold/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-dark-3/50 border-b border-gold/10">
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Dokument</th>
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Typ</th>
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Rozmiar</th>
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Data</th>
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase">Status</th>
              <th className="px-6 py-4 text-[8px] text-gold tracking-widest uppercase text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {docs.map((doc, i) => (
              <tr key={i} className="hover:bg-gold/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{doc.type === 'PDF' ? '📄' : '📝'}</span>
                    <span className="text-xs text-white">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4"><span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 uppercase">{doc.type}</span></td>
                <td className="px-6 py-4 text-[10px] text-dim">{doc.size}</td>
                <td className="px-6 py-4 text-[10px] text-dim">{doc.date}</td>
                <td className="px-6 py-4"><span className="text-[8px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 uppercase">Aktywny</span></td>
                <td className="px-6 py-4 text-right space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-[9px] text-gold hover:text-white transition-colors uppercase tracking-widest">Pobierz</button>
                  <button className="text-[9px] text-blue-400 hover:text-white transition-colors uppercase tracking-widest">Podgląd</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CRMSection = () => {
  const [msg, setMsg] = useState('');
  const messages = [
    { from: '@annarose', text: 'Kiedy następna sesja w studio B?', time: '10 min temu', unread: true },
    { from: '@marek_studio', text: 'Przelew za marzec dotarł, dziękuję!', time: '2h temu', unread: true },
    { from: '@sophia_lee', text: 'Mam pytanie o geo-blocking na Chaturbate', time: '5h temu', unread: false },
    { from: '@casting_new', text: 'Nowe zgłoszenie castingowe - proszę o weryfikację', time: '1 dzień temu', unread: false },
    { from: '@system', text: 'Automatyczne: Wypłata €8,400 przetworzona pomyślnie', time: '2 dni temu', unread: false },
  ];
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-cormorant text-4xl text-white italic">Centrum Wiadomości</h2>
        <p className="text-dim text-xs tracking-widest uppercase mt-1">Komunikacja z partnerkami i systemem</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-dark-2 border border-gold/10 overflow-hidden">
          <div className="p-4 border-b border-gold/5 text-[9px] text-gold uppercase tracking-widest font-bold">Skrzynka odbiorcza</div>
          <div className="divide-y divide-gold/5">
            {messages.map((m, i) => (
              <div key={i} className={cn('p-4 cursor-pointer hover:bg-gold/5 transition-colors', m.unread && 'bg-gold/3')}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-white">{m.from}</span>
                  {m.unread && <span className="w-1.5 h-1.5 rounded-full bg-crimson flex-shrink-0 mt-1" />}
                </div>
                <div className="text-[9px] text-dim truncate">{m.text}</div>
                <div className="text-[8px] text-dim/50 mt-1">{m.time}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-dark-2 border border-gold/10 flex flex-col">
          <div className="p-4 border-b border-gold/5 text-[9px] text-gold uppercase tracking-widest font-bold">Nowa wiadomość</div>
          <div className="flex-1 p-6 space-y-4">
            <select className="w-full bg-dark-3 border border-gold/10 px-4 py-2 text-[11px] text-white outline-none focus:border-gold/30">
              <option>Wybierz odbiorcę...</option>
              <option>@annarose</option>
              <option>@marek_studio</option>
              <option>@sophia_lee</option>
              <option>Wszystkie partnerki</option>
            </select>
            <textarea value={msg} onChange={e => setMsg(e.target.value)}
              placeholder="Treść wiadomości..."
              className="w-full bg-dark-3 border border-gold/10 px-4 py-3 text-[11px] text-white outline-none focus:border-gold/30 min-h-[160px] resize-none" />
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-dim">{msg.length} znaków</span>
              <button className="btn-gold text-[9px] py-2 px-6">Wyślij Wiadomość</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = () => (
  <div className="space-y-10">
    <div>
      <h2 className="font-cormorant text-4xl text-white italic">Ustawienia Systemu</h2>
      <p className="text-dim text-xs tracking-widest uppercase mt-1">Konfiguracja panelu administracyjnego</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { title: 'Dane Studia', fields: ['Nazwa studia', 'Adres email', 'Telefon kontaktowy', 'Adres siedziby'] },
        { title: 'Wypłaty', fields: ['Domyślna metoda wypłat', 'Minimalny próg wypłaty', 'Harmonogram wypłat', 'Waluta rozliczeniowa'] },
        { title: 'Bezpieczeństwo', fields: ['Zmień hasło admina', 'Klucz 2FA', 'IP Whitelist', 'Session timeout'] },
        { title: 'Powiadomienia', fields: ['Email dla alertów', 'Telegram bot token', 'Próg alertu przychodów', 'Powiadomienia castingowe'] },
      ].map(section => (
        <div key={section.title} className="bg-dark-2 border border-gold/10 p-6 space-y-4">
          <h3 className="font-cormorant text-xl text-gold italic">{section.title}</h3>
          {section.fields.map(field => (
            <div key={field} className="space-y-1">
              <label className="text-[8px] text-dim uppercase tracking-widest">{field}</label>
              <input type="text" placeholder={`Wprowadź ${field.toLowerCase()}...`}
                className="w-full bg-dark-3 border border-gold/10 px-3 py-2 text-[11px] text-white outline-none focus:border-gold/30 transition-colors" />
            </div>
          ))}
          <button className="btn-outline text-[8px] py-2 px-4 w-full">Zapisz {section.title}</button>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
