"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Upload,
  FileText,
  Clock,
  Type,
  Layout,
  Tag as TagIcon,
  Globe,
  Star,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/utils/utils";

interface AcademyBlogArticle {
  id?: string;
  title: string;
  slug: string;
  category:
    | "Psychologia"
    | "Platformy"
    | "Live Cam"
    | "Bezpieczeństwo"
    | "Monetyzacja"
    | "Marka"
    | "Marketing"
    | "Biznes"
    | "Technologia";
  tag:
    | "MUST READ"
    | "ANALIZA"
    | "PORADNIK"
    | "BEZPIECZEŃSTWO"
    | "ZAAWANSOWANY"
    | "STRATEGIA"
    | "PODSTAWY"
    | "TECH";
  excerpt: string;
  content: string;
  readTime: string;
  thumbnail?: string;
  isPublished: boolean;
  publishedAt?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  article?: AcademyBlogArticle | null;
}

const ArticleModal: React.FC<ArticleModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  article,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Psychologia" as AcademyBlogArticle["category"],
    tag: "MUST READ" as AcademyBlogArticle["tag"],
    excerpt: "",
    content: "",
    readTime: "",
    thumbnail: "",
    isPublished: false,
  });

  const categories: AcademyBlogArticle["category"][] = [
    "Psychologia",
    "Platformy",
    "Live Cam",
    "Bezpieczeństwo",
    "Monetyzacja",
    "Marka",
    "Marketing",
    "Biznes",
    "Technologia",
  ];

  const tags: AcademyBlogArticle["tag"][] = [
    "MUST READ",
    "ANALIZA",
    "PORADNIK",
    "BEZPIECZEŃSTWO",
    "ZAAWANSOWANY",
    "STRATEGIA",
    "PODSTAWY",
    "TECH",
  ];

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        category: article.category,
        tag: article.tag,
        excerpt: article.excerpt,
        content: article.content,
        readTime: article.readTime,
        thumbnail: article.thumbnail || "",
        isPublished: article.isPublished,
      });
    } else {
      setFormData({
        title: "",
        slug: "",
        category: "Psychologia",
        tag: "MUST READ",
        excerpt: "",
        content: "",
        readTime: "",
        thumbnail: "",
        isPublished: false,
      });
    }
  }, [article]);

  useEffect(() => {
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = article
        ? `/api/admin/academy/articles?id=${article.id}`
        : "/api/admin/academy/articles";
      const method = article ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save article");
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article");
    }
    setLoading(false);
  };

  const estimateReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="bg-[#0a0a0a] border border-white/10 rounded-[40px] max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <Layout className="w-64 h-64 text-white" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between p-10 border-b border-white/5 bg-white/[0.02]">
            <div>
              <h2 className="text-3xl font-bold italic font-georgia text-[#c9a84c]">
                {article
                  ? 'Edycja <span className="text-white">Artykułu</span>'
                  : 'Nowy <span className="text-white">Artykuł</span>'}
              </h2>
              <p className="text-[9px] text-gray-500 uppercase tracking-[4px] font-black mt-2">
                HRL Academy Production Unit
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
            <div className="grid grid-cols-12 gap-10">
              {/* Main Content Area */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                {/* Title and Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                      <Type className="w-3 h-3 text-[#c9a84c]" /> Tytuł Artykułu
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
                      placeholder="np. Psychologia wysokich napiwków"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2 ml-2">
                      <Globe className="w-3 h-3" /> Slug (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          slug: e.target.value,
                        }))
                      }
                      className="modal-input-gold font-mono text-[#c9a84c]"
                      required
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2">
                    Krótki Opis (Excerpt)
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        excerpt: e.target.value.slice(0, 200),
                      }))
                    }
                    className="modal-textarea-gold h-24"
                    placeholder="Streszczenie artykułu dla czytelnika..."
                    maxLength={200}
                    required
                  />
                  <div className="text-[8px] text-gray-600 font-black uppercase tracking-widest text-right">
                    {formData.excerpt.length}/200 znaków
                  </div>
                </div>

                {/* Content (Markdown) */}
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2 flex justify-between items-center">
                    <span>Treść Merytoryczna (Markdown)</span>
                    <span className="text-[8px] opacity-40 italic lowercase">
                      Wspiera tagi &lt;br/&gt;, **bold**, *italic*
                    </span>
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="modal-textarea-gold h-96 font-mono text-[12px] leading-relaxed"
                    placeholder="Wpisz treść artykułu..."
                    required
                  />
                </div>
              </div>

              {/* Sidebar Config Area */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                {/* Category and Tag */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-[#c9a84c] uppercase tracking-widest flex items-center gap-2">
                      <TagIcon className="w-3 h-3" /> Kategoria
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target
                            .value as AcademyBlogArticle["category"],
                        }))
                      }
                      className="modal-input-gold cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-black">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-[#c9a84c] uppercase tracking-widest flex items-center gap-2">
                      <Star className="w-3 h-3" /> Tag (Badge)
                    </label>
                    <select
                      value={formData.tag}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          tag: e.target.value as AcademyBlogArticle["tag"],
                        }))
                      }
                      className="modal-input-gold cursor-pointer"
                    >
                      {tags.map((tag) => (
                        <option key={tag} value={tag} className="bg-black">
                          {tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Metrics */}
                <div className="bg-[#c9a84c]/5 border border-[#c9a84c]/10 rounded-3xl p-6 space-y-4">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                      Czas Czytania
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            readTime: e.target.value,
                          }))
                        }
                        className="modal-input-gold !py-2.5"
                        placeholder="np. 8 min"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            readTime: estimateReadTime(formData.content),
                          }))
                        }
                        className="p-2.5 bg-white/5 border border-[#c9a84c]/20 text-[#c9a84c] rounded-xl hover:bg-[#c9a84c] hover:text-black transition-all"
                      >
                        <Clock className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Thumbnail */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-2">
                    Miniatura Artykułu
                  </label>
                  <CldUploadWidget
                    uploadPreset="hrl-studio"
                    onSuccess={(result) => {
                      if (result.info) {
                        setFormData((prev) => ({
                          ...prev,
                          thumbnail: (result.info as any).secure_url,
                        }));
                      }
                    }}
                  >
                    {({ open }) => (
                      <div className="space-y-4">
                        <button
                          type="button"
                          onClick={() => open()}
                          className="w-full py-4 bg-white/5 border border-dashed border-white/10 rounded-3xl hover:border-[#c9a84c]/50 transition-all flex flex-col items-center justify-center gap-2 group"
                        >
                          <Upload className="w-6 h-6 text-gray-600 group-hover:text-[#c9a84c]" />
                          <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest group-hover:text-white">
                            {formData.thumbnail
                              ? "Zmień Grafikę"
                              : "Wgraj Miniaturę"}
                          </span>
                        </button>
                        {formData.thumbnail && (
                          <div className="relative rounded-[24px] overflow-hidden border border-white/10 aspect-video group">
                            <img
                              src={formData.thumbnail}
                              alt="Thumbnail"
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  thumbnail: "",
                                }))
                              }
                              className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur-md rounded-xl text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </CldUploadWidget>
                </div>

                {/* Published Toggle */}
                <div className="flex items-center justify-between p-6 bg-black border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                        formData.isPublished
                          ? "bg-green-500/10 text-green-500"
                          : "bg-gray-800/10 text-gray-600",
                      )}
                    >
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-black text-white uppercase tracking-widest">
                        Publikacja
                      </div>
                      <div className="text-[7px] text-gray-600 uppercase tracking-tight mt-0.5">
                        {formData.isPublished
                          ? "Live na portalu"
                          : "Zapisz jako szkic"}
                      </div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer scale-90">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isPublished: e.target.checked,
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9a84c] peer-checked:after:bg-black"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-6 mt-12 pt-8 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="px-10 py-4 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all"
              >
                Anuluj
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-3 px-12 py-4 bg-[#c9a84c] hover:bg-[#e6c15c] disabled:bg-gray-800 text-black text-[10px] font-black uppercase tracking-[4px] rounded-2xl transition-all shadow-xl shadow-[#c9a84c]/20"
              >
                <Save className="w-4 h-4" />
                {loading
                  ? "Przetwarzanie..."
                  : article
                    ? "Aktualizuj Artykuł"
                    : "Stwórz Artykuł"}
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

export default ArticleModal;
