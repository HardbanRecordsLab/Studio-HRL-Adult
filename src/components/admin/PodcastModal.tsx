"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Upload,
  Podcast,
  Clock,
  Mic,
  Headphones,
  Activity,
  Shield,
  Zap,
  FileCheck,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/utils/utils";

interface AcademyPodcast {
  id?: string;
  title: string;
  description?: string;
  episodeNumber: string;
  duration: string;
  cloudinaryId: string;
  url: string;
  format?: string;
  bytes?: number;
  isActive: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface PodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  podcast?: AcademyPodcast | null;
}

const PodcastModal: React.FC<PodcastModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  podcast,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    episodeNumber: "",
    duration: "",
    cloudinaryId: "",
    url: "",
    format: "",
    bytes: 0,
    isActive: true,
  });

  useEffect(() => {
    if (podcast) {
      setFormData({
        title: podcast.title,
        description: podcast.description || "",
        episodeNumber: podcast.episodeNumber,
        duration: podcast.duration,
        cloudinaryId: podcast.cloudinaryId,
        url: podcast.url,
        format: podcast.format || "",
        bytes: podcast.bytes || 0,
        isActive: podcast.isActive,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        episodeNumber: "",
        duration: "",
        cloudinaryId: "",
        url: "",
        format: "",
        bytes: 0,
        isActive: true,
      });
    }
  }, [podcast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = podcast
        ? `/api/admin/academy/podcasts?id=${podcast.id}`
        : "/api/admin/academy/podcasts";
      const method = podcast ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save podcast");
      }
    } catch (error) {
      console.error("Error saving podcast:", error);
      alert("Failed to save podcast");
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[40px] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Headphones className="w-64 h-64 text-white" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-10 border-b border-white/5 bg-white/[0.02]">
            <div>
              <h2 className="text-3xl font-bold italic font-georgia text-[#c9a84c]">
                {podcast
                  ? 'Edycja <span className="text-white">Podcastu</span>'
                  : 'Nowy <span className="text-white">Odcinek</span>'}
              </h2>
              <p className="text-[9px] text-gray-500 uppercase tracking-[4px] font-black mt-2">
                HRL Academy Audio Experience
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-all border border-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-10 overflow-y-auto max-h-[calc(90vh-250px)] custom-scrollbar"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Metadata Section */}
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                    <Zap className="w-3 h-3 text-[#c9a84c]" /> Tytuł Odcinka
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="modal-input-gold"
                    placeholder="np. Kulisy Pracy w Branży Adult"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                      <Mic className="w-3 h-3 text-[#c9a84c]" /> Numer EP
                    </label>
                    <input
                      type="text"
                      value={formData.episodeNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          episodeNumber: e.target.value,
                        }))
                      }
                      className="modal-input-gold font-mono"
                      placeholder="np. EP 05"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                      <Clock className="w-3 h-3 text-[#c9a84c]" /> Czas Trwania
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          duration: e.target.value,
                        }))
                      }
                      className="modal-input-gold"
                      placeholder="np. 42:15"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2">
                    Notatki do Odcinka
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="modal-textarea-gold h-[200px]"
                    placeholder="O czym rozmawiamy w tym odcinku? Główne punkty programu..."
                  />
                </div>
              </div>

              {/* Media & Status Section */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest block ml-2 border-b border-white/5 pb-2">
                    Audio Broadcast Source
                  </label>

                  <div className="grid grid-cols-1 gap-6">
                    {/* Cloudinary Upload */}
                    <CldUploadWidget
                      uploadPreset="hrl-studio"
                      options={{ resourceType: "video" }}
                      onSuccess={(result) => {
                        if (result.info) {
                          const info = result.info as any;
                          setFormData((prev) => ({
                            ...prev,
                            cloudinaryId: info.public_id,
                            url: info.secure_url,
                            format: info.format,
                            bytes: info.bytes,
                          }));
                        }
                      }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="w-full py-10 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[32px] hover:border-[#c9a84c]/40 transition-all flex flex-col items-center justify-center gap-3 group"
                        >
                          <div className="w-12 h-12 bg-[#c9a84c]/5 rounded-2xl flex items-center justify-center text-[#c9a84c] group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">
                              Wgraj do Chmury
                            </p>
                            <p className="text-[7px] text-gray-600 uppercase tracking-widest mt-1">
                              Automatyczne Kodowanie
                            </p>
                          </div>
                        </button>
                      )}
                    </CldUploadWidget>

                    {/* Manual Path */}
                    <div className="p-8 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-[32px] flex flex-col justify-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#c9a84c]">
                          <Headphones className="w-5 h-5" />
                        </div>
                        <p className="text-[9px] font-black text-white uppercase tracking-widest">
                          Ścieżka Lokalna / URL
                        </p>
                      </div>
                      <input
                        type="text"
                        value={formData.url}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            url: e.target.value,
                            cloudinaryId: "LOCAL",
                            format: e.target.value.split(".").pop() || "",
                          }))
                        }
                        className="modal-input-gold !py-2.5 !text-[10px]"
                        placeholder="/audio/odcinek.mp3"
                      />
                      <p className="text-[7px] text-gray-600 uppercase tracking-widest leading-relaxed">
                        Użyj dla plików w folderze{" "}
                        <span className="text-white">public/audio</span> lub
                        linków zewnętrznych.
                      </p>
                    </div>
                  </div>

                  {formData.url && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-8 bg-[#0d0d0d] border border-white/5 rounded-[32px] space-y-6 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Activity className="w-24 h-24 text-[#c9a84c] animate-pulse" />
                      </div>
                      <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-[#c9a84c] rounded-2xl flex items-center justify-center text-black">
                          <Mic className="w-8 h-8" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[12px] font-black text-white uppercase tracking-widest truncate">
                            {formData.title}
                          </p>
                          <p className="text-[8px] text-[#c9a84c] uppercase tracking-widest mt-1 truncate">
                            {formData.url.startsWith("http")
                              ? "CDN Stream"
                              : "Local Archive"}{" "}
                            • {formData.url}
                          </p>
                        </div>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-[#c9a84c]"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2 }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="p-8 bg-black border border-white/5 rounded-[40px] space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                          formData.isActive
                            ? "bg-[#c9a84c]/10 text-[#c9a84c]"
                            : "bg-gray-800/10 text-gray-600",
                        )}
                      >
                        <Shield className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">
                          Public Stream
                        </p>
                        <p className="text-[7px] text-gray-600 uppercase tracking-widest mt-1">
                          {formData.isActive
                            ? "Widoczny dla wszystkich modelek"
                            : "Poczekalnia studyjna"}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer scale-90">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            isActive: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-12 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a84c] peer-checked:after:bg-black"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Actions */}
            <div className="flex items-center justify-end gap-6 mt-16 pt-10 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-10 py-5 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Anuluj Akcję
              </button>
              <button
                type="submit"
                disabled={loading || !formData.url}
                className="flex items-center gap-3 px-16 py-5 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[10px] font-black uppercase tracking-[5px] rounded-[24px] transition-all shadow-xl shadow-[#c9a84c]/20"
              >
                <Save className="w-4 h-4" />
                {loading
                  ? "MODULACJA..."
                  : podcast
                    ? "Aktualizuj Stream"
                    : "Deploy Podcast"}
              </button>
            </div>
          </form>
        </motion.div>

        <style jsx global>{`
          .modal-input-gold {
            @apply w-full bg-[#111] border border-white/5 rounded-2xl px-5 py-4 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800;
          }
          .modal-textarea-gold {
            @apply w-full bg-[#111] border border-white/5 rounded-3xl px-6 py-5 text-[13px] text-white font-light focus:border-[#c9a84c]/40 focus:outline-none transition-all placeholder:text-gray-800 resize-none;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(201, 168, 76, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #c9a84c;
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default PodcastModal;
