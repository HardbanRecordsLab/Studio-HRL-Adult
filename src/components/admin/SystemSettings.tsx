import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RotateCcw,
  Key,
  Shield,
  Users,
  Settings,
  Database,
  Bell,
  Globe,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Activity,
  Zap,
  Lock,
  Mail,
  Smartphone,
  Server,
  Cloud,
  ChevronRight,
  X,
} from "lucide-react";

interface SystemSettings {
  revenueSplit: {
    studio: number;
    partner: number;
    referral: number;
  };
  roles: {
    admin: string[];
    manager: string[];
    model: string[];
  };
  apiKeys: {
    cloudinary: string;
    sendgrid: string;
    stripe: string;
    webhook: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    payoutAlerts: boolean;
    newApplications: boolean;
  };
  integrations: {
    onlyfans: boolean;
    fansly: boolean;
    chaturbate: boolean;
    stripchat: boolean;
  };
  security: {
    twoFactorAuth: boolean;
    sessionTimeout: number;
    ipWhitelist: string[];
    auditLog: boolean;
  };
  general: {
    studioName: string;
    adminEmail: string;
    supportEmail: string;
    timezone: string;
    currency: string;
    language: string;
  };
}

interface SystemSettingsProps {
  token: string;
}

const DEFAULT_SETTINGS = {
  general: {
    studioName: "Studio HRL Adult",
    adminEmail: "hardbanrecordslab.pl@gmail.com",
    supportEmail: "",
    timezone: "Europe/Warsaw",
    currency: "EUR",
    language: "pl",
  },
  revenueSplit: { studio: 10, partner: 60, referral: 30 },
  roles: { admin: [], manager: [], model: [] },
  apiKeys: { cloudinary: "", sendgrid: "", stripe: "", webhook: "" },
  notifications: {
    email: true,
    sms: false,
    push: false,
    payoutAlerts: true,
    newApplications: true,
  },
  integrations: {
    onlyfans: true,
    fansly: true,
    chaturbate: true,
    stripchat: true,
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 24,
    ipWhitelist: [],
    auditLog: true,
  },
};

const SystemSettings: React.FC<SystemSettingsProps> = ({ token }) => {
  const [settings, setSettings] = useState<any>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "general" | "revenue" | "roles" | "api" | "security"
  >("general");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        // Deep merge with defaults so missing nested fields don't crash
        setSettings((prev: any) => ({
          ...DEFAULT_SETTINGS,
          ...data,
          integrations: {
            ...DEFAULT_SETTINGS.integrations,
            ...(data.integrations ?? {}),
          },
          notifications: {
            ...DEFAULT_SETTINGS.notifications,
            ...(data.notifications ?? {}),
          },
          security: { ...DEFAULT_SETTINGS.security, ...(data.security ?? {}) },
          revenueSplit: {
            ...DEFAULT_SETTINGS.revenueSplit,
            ...(data.revenueSplit ?? {}),
          },
          general: { ...DEFAULT_SETTINGS.general, ...(data.general ?? {}) },
        }));
      }
    } catch (error) {
      console.error("Settings fetch failed", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });
      if (response.ok) {
        // Show success toast logic could be here
      }
    } catch (e) {
      console.error("Save failed", e);
    }
    setSaving(false);
  };

  const tabs = [
    { id: "general", label: "Konfiguracja", icon: Settings },
    { id: "revenue", label: "Finanse & Splity", icon: CreditCard },
    { id: "roles", label: "Uprawnienia", icon: Users },
    { id: "api", label: "Klucze API", icon: Key },
    { id: "security", label: "Bezpieczeństwo", icon: Shield },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-light italic text-[#c9a84c] mb-2 uppercase tracking-tighter">
            HRL <span className="text-white">Central</span> CONTROL
          </h2>
          <p className="text-[10px] text-gray-500 tracking-[3px] uppercase">
            Zarządzanie rdzeniem systemu, kluczami API i polityką bezpieczeństwa
          </p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 px-6 py-2.5 bg-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest rounded transition-all hover:bg-white/10 border border-white/5">
            <RotateCcw className="w-4 h-4" /> Resetuj
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-3 px-6 py-2.5 bg-[#c9a84c] text-black text-[10px] font-black uppercase tracking-widest rounded transition-all hover:scale-105 shadow-xl shadow-[#c9a84c]/10 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving ? "Zapisywanie..." : "Zapisz Zmiany"}
          </button>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Sidebar Navigation */}
        <div className="w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all group ${
                activeTab === tab.id
                  ? "bg-[#c9a84c] border-[#c9a84c] text-black shadow-lg shadow-[#c9a84c]/10"
                  : "bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                <tab.icon
                  className={`w-4 h-4 ${activeTab === tab.id ? "text-black" : "text-gray-600 group-hover:text-white"}`}
                />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0d0d0d] border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden min-h-[600px]">
          <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
            <Database className="w-64 h-64 text-white" />
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "general" && (
              <motion.div
                key="general"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <div>
                  <h3 className="text-xl font-bold font-georgia text-white mb-6 italic">
                    Podstawowe{" "}
                    <span className="text-[#c9a84c]">Ustawienia</span>
                  </h3>
                  {!settings ? (
                    <div className="text-[10px] text-gray-500 animate-pulse">
                      Ładowanie profilu serwera...
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 uppercase tracking-widest font-black">
                          Nazwa Studia
                        </label>
                        <input
                          type="text"
                          value={settings.studioName}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              studioName: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#c9a84c]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 uppercase tracking-widest font-black">
                          Główny Email Administratora
                        </label>
                        <input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              contactEmail: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#c9a84c]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 uppercase tracking-widest font-black">
                          Email Powiadomień
                        </label>
                        <input
                          type="email"
                          value={settings.notificationEmail}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              notificationEmail: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#c9a84c]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[8px] text-gray-500 uppercase tracking-widest font-black">
                          Waluta Systemowa
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#c9a84c]">
                          <option className="bg-[#0a0a0a]">EUR - Euro</option>
                          <option className="bg-[#0a0a0a]">
                            USD - US Dollar
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-white/5 space-y-6 text-white">
                  <h4 className="text-[9px] font-black uppercase tracking-[3px]">
                    Integracje Platform (Master Switches)
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(
                      settings?.integrations ?? DEFAULT_SETTINGS.integrations,
                    ).map(([id, active]) => (
                      <div
                        key={id}
                        className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {id}
                        </span>
                        <div
                          className={`w-10 h-5 rounded-full relative cursor-pointer ${active ? "bg-[#c9a84c]" : "bg-white/10"}`}
                        >
                          <div
                            className={`absolute top-1 w-3 h-3 rounded-full bg-black transition-all ${active ? "right-1" : "left-1"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "api" && (
              <motion.div
                key="api"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10 relative z-10"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold font-georgia text-white italic">
                    Vault: <span className="text-[#c9a84c]">Klucze API</span>
                  </h3>
                  <button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="px-4 py-1.5 bg-white/5 text-[9px] font-black text-[#c9a84c] border border-[#c9a84c]/20 rounded-full hover:bg-[#c9a84c]/10 transition-all uppercase tracking-widest flex items-center gap-2"
                  >
                    {showApiKeys ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                    {showApiKeys ? "Ukryj Klucze" : "Pokaż Klucze"}
                  </button>
                </div>

                <div className="space-y-6">
                  {Object.entries(settings.apiKeys).map(
                    ([service, keyValue]) => (
                      <div key={service} className="space-y-2">
                        <label className="text-[8px] text-gray-500 uppercase tracking-widest font-black flex items-center gap-2">
                          <Cloud className="w-3 h-3" /> {service} Secret
                        </label>
                        <div className="flex gap-4">
                          <div className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 font-mono text-xs text-[#c9a84c]/70 flex items-center">
                            {showApiKeys
                              ? String(keyValue)
                              : "********************************"}
                          </div>
                          <button className="px-6 py-2 bg-white/5 border border-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all">
                            Rotuj Klucz
                          </button>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 p-6 rounded-2xl flex gap-4 items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                  <p className="text-[9px] text-orange-500 uppercase tracking-widest leading-relaxed font-bold">
                    Uwaga: Klucze API dają pełny dostęp do podłączonych usług.
                    Każda zmiana jest logowana w Audit Logu systemu.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8 relative z-10"
              >
                <h3 className="text-xl font-bold font-georgia text-white italic">
                  Hardened <span className="text-[#c9a84c]">Security</span>
                </h3>
                <div className="space-y-4">
                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:border-[#c9a84c]/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl text-[#c9a84c]">
                        <Lock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">
                          Wymuszone 2FA (TOTP)
                        </p>
                        <p className="text-[8px] text-gray-500 uppercase mt-1">
                          Wymagaj autoryzacji Google Authenticator dla
                          wszystkich Adminów
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-[#c9a84c] rounded-full relative cursor-pointer">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black shadow-lg" />
                    </div>
                  </div>

                  <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex justify-between items-center group hover:border-[#c9a84c]/20 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-2xl text-blue-500">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">
                          Audit Logs (Continuous)
                        </p>
                        <p className="text-[8px] text-gray-500 uppercase mt-1">
                          Zapisuj każdą akcję administracyjną w nienaruszalnym
                          dzienniku zdarzeń
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-[#c9a84c] rounded-full relative cursor-pointer">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black shadow-lg" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SystemSettings;
