import React, { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, X, Film, Music, FileText, BookOpen, Loader2, Image as ImageIcon, Trash2, Edit2, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/utils';

interface AcademyMediaManagerProps {
  isEmbedded?: boolean;
}

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

type ContentType = 'videos' | 'podcasts' | 'documents' | 'articles';

interface AcademyContent {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
  order: number;
}

interface Video extends AcademyContent {
  duration: string;
  level: string;
  cloudinaryId: string;
  url: string;
  thumbnail?: string;
  format?: string;
  bytes?: number;
}

interface Podcast extends AcademyContent {
  duration: string;
  episodeNumber: string;
  cloudinaryId: string;
  url: string;
  format?: string;
  bytes?: number;
}

interface Document extends AcademyContent {
  type: string;
  category: string;
  size: string;
  cloudinaryId?: string;
  url: string;
  icon: string;
}

interface Article extends AcademyContent {
  slug: string;
  category: string;
  tag: string;
  excerpt: string;
  content?: string;
  readTime: string;
  thumbnail?: string;
  isPublished: boolean;
  publishedAt?: string;
}

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

const uploadToCloudinary = async (
  file: File,
  folder: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<any> => {
  const base64 = await convertToBase64(file);
  
  const resourceType = file.type.startsWith('video/')
    ? 'video'
    : file.type.startsWith('audio/')
      ? 'video'
      : 'image';

  const response = await fetch('/api/media/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      file: base64,
      folder,
      resourceType,
    }),
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
};

const AcademyMediaManager: React.FC<AcademyMediaManagerProps> = ({ isEmbedded = false }) => {
  const [activeTab, setActiveTab] = useState<ContentType>('videos');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const queryClient = useQueryClient();

  // Fetch academy content
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['admin-academy', activeTab],
    queryFn: () => axios.get(`/api/admin/academy?type=${activeTab}`).then(res => res.data),
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (payload: any) => axios.post('/api/admin/academy', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => axios.put('/api/admin/academy', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
      setShowForm(false);
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ type, id }: { type: string; id: string }) => 
      axios.delete(`/api/admin/academy?type=${type}&id=${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-academy'] });
    },
  });

  const handleFileUpload = useCallback(async (file: File, folder: string) => {
    setIsUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    try {
      const result = await uploadToCloudinary(file, folder, (progress) => {
        setUploadProgress(progress.percentage);
      });

      setIsUploading(false);
      return result;
    } catch (error) {
      setIsUploading(false);
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
      throw error;
    }
  }, []);

  const handleVideoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cloudinaryUrl = formData.get('cloudinaryUrl') as string;
    const thumbnailUrl = formData.get('thumbnailUrl') as string;

    const payload = {
      type: 'video',
      title: formData.get('title'),
      description: formData.get('description'),
      duration: formData.get('duration'),
      level: formData.get('level'),
      url: cloudinaryUrl,
      thumbnail: thumbnailUrl || editingItem?.thumbnail || null,
      format: formData.get('format') || editingItem?.format || null,
    };

    if (editingItem) {
      updateMutation.mutate({ ...payload, id: editingItem.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handlePodcastSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cloudinaryUrl = formData.get('cloudinaryUrl') as string;

    const payload = {
      type: 'podcast',
      title: formData.get('title'),
      description: formData.get('description'),
      duration: formData.get('duration'),
      episodeNumber: formData.get('episodeNumber'),
      url: cloudinaryUrl,
      format: formData.get('format') || editingItem?.format || null,
    };

    if (editingItem) {
      updateMutation.mutate({ ...payload, id: editingItem.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDocumentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cloudinaryUrl = formData.get('cloudinaryUrl') as string;

    const payload = {
      type: 'document',
      title: formData.get('title'),
      description: formData.get('description'),
      type_doc: formData.get('type'),
      category: formData.get('category'),
      size: formData.get('size') || editingItem?.size || '0 MB',
      icon: formData.get('icon'),
      url: cloudinaryUrl,
    };

    if (editingItem) {
      updateMutation.mutate({ ...payload, id: editingItem.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleArticleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      type: 'article',
      slug: formData.get('slug'),
      title: formData.get('title'),
      category: formData.get('category'),
      tag: formData.get('tag'),
      excerpt: formData.get('excerpt'),
      content: formData.get('content'),
      readTime: formData.get('readTime'),
      isPublished: formData.get('isPublished') === 'true',
    };

    if (editingItem) {
      updateMutation.mutate({ ...payload, id: editingItem.id });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (item: any) => {
    if (confirm(`Czy na pewno chcesz usunąć "${item.title}"?`)) {
      deleteMutation.mutate({ type: activeTab.slice(0, -1), id: item.id });
    }
  };

  const tabs = [
    { id: 'videos' as ContentType, name: 'Wideo', icon: Film },
    { id: 'podcasts' as ContentType, name: 'Podcasty', icon: Music },
    { id: 'documents' as ContentType, name: 'Dokumenty', icon: FileText },
    { id: 'articles' as ContentType, name: 'Artykuły', icon: BookOpen },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h2 className="font-cormorant text-4xl text-white italic">Zarządzanie Akademią</h2>
          <p className="text-dim text-xs font-light">Dodawaj i zarządzaj treściami edukacyjnymi – wideo, podcasty, dokumenty, artykuły</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
            setUploadError(null);
          }}
          className="btn-gold py-2 px-6 text-[9px] flex items-center gap-2"
        >
          <Upload className="w-3 h-3" />
          Dodaj {activeTab === 'videos' ? 'Wideo' : activeTab === 'podcasts' ? 'Podcast' : activeTab === 'documents' ? 'Dokument' : 'Artykuł'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gold/10 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowForm(false);
                setEditingItem(null);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-[10px] tracking-widest uppercase transition-all border",
                activeTab === tab.id
                  ? 'bg-gold text-dark border-gold font-bold'
                  : 'text-dim border-gold/10 hover:border-gold/30'
              )}
            >
              <Icon className="w-3 h-3" />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Upload Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-2 border border-gold/20 p-8 space-y-6"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-cormorant text-2xl text-gold italic">
              {editingItem ? 'Edytuj' : 'Dodaj nowy'} {activeTab === 'videos' ? 'wideo' : activeTab === 'podcasts' ? 'podcast' : activeTab === 'documents' ? 'dokument' : 'artykuł'}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingItem(null);
                setUploadError(null);
              }}
              className="text-dim hover:text-crimson transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {uploadError && (
            <div className="bg-crimson/10 border border-crimson/30 p-4 flex items-center gap-2 text-crimson text-xs">
              <AlertCircle className="w-4 h-4" />
              {uploadError}
            </div>
          )}

          {/* Video Form */}
          {activeTab === 'videos' && (
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Tytuł *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingItem?.title}
                    placeholder="Np. 14 Błędów Twórców Online"
                    className="admin-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Czas trwania *</label>
                  <input
                    name="duration"
                    required
                    defaultValue={editingItem?.duration}
                    placeholder="Np. 45:23"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Opis</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  placeholder="Krótki opis kursu..."
                  className="admin-input min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Poziom</label>
                  <select name="level" defaultValue={editingItem?.level || 'Początkujący'} className="admin-input">
                    <option value="Początkujący">Początkujący</option>
                    <option value="Średni">Średni</option>
                    <option value="Zaawansowany">Zaawansowany</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Format (opcjonalnie)</label>
                  <input
                    name="format"
                    defaultValue={editingItem?.format}
                    placeholder="Np. mp4, webm"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">
                  URL Cloudinary * <span className="normal-case text-dim/50">(link do pliku)</span>
                </label>
                <input
                  name="cloudinaryUrl"
                  type="url"
                  required
                  defaultValue={editingItem?.url}
                  placeholder="https://res.cloudinary.com/.../video/upload/..."
                  className="admin-input"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">
                  URL Miniaturki <span className="normal-case text-dim/50">(opcjonalnie)</span>
                </label>
                <input
                  name="thumbnailUrl"
                  type="url"
                  defaultValue={editingItem?.thumbnail}
                  placeholder="https://res.cloudinary.com/.../image/upload/..."
                  className="admin-input"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-gold flex-1">
                  {editingItem ? 'Zapisz zmiany' : 'Dodaj wideo'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="btn-outline"
                >
                  Anuluj
                </button>
              </div>
            </form>
          )}

          {/* Podcast Form */}
          {activeTab === 'podcasts' && (
            <form onSubmit={handlePodcastSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Tytuł *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingItem?.title}
                    placeholder="Np. Inżynieria Iluzji Bliskości"
                    className="admin-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Numer odcinka *</label>
                  <input
                    name="episodeNumber"
                    required
                    defaultValue={editingItem?.episodeNumber}
                    placeholder="Np. EP 01"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Czas trwania *</label>
                  <input
                    name="duration"
                    required
                    defaultValue={editingItem?.duration}
                    placeholder="Np. 42:15"
                    className="admin-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Format (opcjonalnie)</label>
                  <input
                    name="format"
                    defaultValue={editingItem?.format}
                    placeholder="Np. mp3, m4a"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">
                  URL Cloudinary * <span className="normal-case text-dim/50">(link do pliku audio)</span>
                </label>
                <input
                  name="cloudinaryUrl"
                  type="url"
                  required
                  defaultValue={editingItem?.url}
                  placeholder="https://res.cloudinary.com/.../video/upload/..."
                  className="admin-input"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Opis</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  placeholder="Opis odcinka podcastu..."
                  className="admin-input min-h-[80px]"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-gold flex-1">
                  {editingItem ? 'Zapisz zmiany' : 'Dodaj podcast'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="btn-outline"
                >
                  Anuluj
                </button>
              </div>
            </form>
          )}

          {/* Document Form */}
          {activeTab === 'documents' && (
            <form onSubmit={handleDocumentSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Tytuł *</label>
                <input
                  name="title"
                  required
                  defaultValue={editingItem?.title}
                  placeholder="Np. Operacyjna Mapa Platform"
                  className="admin-input"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Typ *</label>
                  <select name="type" defaultValue={editingItem?.type || 'PDF'} className="admin-input">
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="DOC">DOC</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Kategoria *</label>
                  <select name="category" defaultValue={editingItem?.category || 'Operacyjny'} className="admin-input">
                    <option value="Prawny">Prawny</option>
                    <option value="Operacyjny">Operacyjny</option>
                    <option value="Biznesowy">Biznesowy</option>
                    <option value="Strategia">Strategia</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Casting">Casting</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Rozmiar (np. 2.3 MB)</label>
                  <input
                    name="size"
                    defaultValue={editingItem?.size}
                    placeholder="Np. 2.3 MB"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Ikona</label>
                  <select name="icon" defaultValue={editingItem?.icon || '📄'} className="admin-input">
                    <option value="📄">📄 Dokument</option>
                    <option value="🗺️">🗺️ Mapa</option>
                    <option value="📊">📊 Analiza</option>
                    <option value="📝">📝 Formularz</option>
                    <option value="⚖️">⚖️ Prawo</option>
                    <option value="📋">📋 Lista</option>
                    <option value="📖">📖 Przewodnik</option>
                    <option value="🔒">🔒 RODO</option>
                    <option value="🇺🇸">🇺🇸 US Compliance</option>
                    <option value="🚀">🚀 Startup</option>
                    <option value="📅">📅 Plan</option>
                    <option value="⚡">⚡ Szybki</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">
                    URL Cloudinary * <span className="normal-case text-dim/50">(link do pliku)</span>
                  </label>
                  <input
                    name="cloudinaryUrl"
                    type="url"
                    required
                    defaultValue={editingItem?.url}
                    placeholder="https://res.cloudinary.com/.../raw/upload/..."
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Opis</label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description}
                  placeholder="Opis dokumentu..."
                  className="admin-input min-h-[80px]"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-gold flex-1">
                  {editingItem ? 'Zapisz zmiany' : 'Dodaj dokument'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="btn-outline"
                >
                  Anuluj
                </button>
              </div>
            </form>
          )}

          {/* Article Form */}
          {activeTab === 'articles' && (
            <form onSubmit={handleArticleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Tytuł *</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingItem?.title}
                    placeholder="Np. Psychologia widza: jak budować lojalność"
                    className="admin-input"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Slug *</label>
                  <input
                    name="slug"
                    required
                    defaultValue={editingItem?.slug}
                    placeholder="np. psychologia-widza"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Kategoria *</label>
                  <select name="category" defaultValue={editingItem?.category || 'Psychologia'} className="admin-input">
                    <option value="Psychologia">Psychologia</option>
                    <option value="Platformy">Platformy</option>
                    <option value="Live Cam">Live Cam</option>
                    <option value="Bezpieczeństwo">Bezpieczeństwo</option>
                    <option value="Monetyzacja">Monetyzacja</option>
                    <option value="Marka">Marka</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Biznes">Biznes</option>
                    <option value="Technologia">Technologia</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Tag *</label>
                  <select name="tag" defaultValue={editingItem?.tag || 'PORADNIK'} className="admin-input">
                    <option value="MUST READ">MUST READ</option>
                    <option value="ANALIZA">ANALIZA</option>
                    <option value="PORADNIK">PORADNIK</option>
                    <option value="BEZPIECZEŃSTWO">BEZPIECZEŃSTWO</option>
                    <option value="ZAAWANSOWANY">ZAAWANSOWANY</option>
                    <option value="STRATEGIA">STRATEGIA</option>
                    <option value="PODSTAWY">PODSTAWY</option>
                    <option value="TECH">TECH</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] text-dim uppercase tracking-widest">Czas czytania *</label>
                  <input
                    name="readTime"
                    required
                    defaultValue={editingItem?.readTime}
                    placeholder="Np. 8 min"
                    className="admin-input"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Krótki opis (excerpt) *</label>
                <textarea
                  name="excerpt"
                  required
                  defaultValue={editingItem?.excerpt}
                  placeholder="Krótki opis wyświetlany na liście artykułów..."
                  className="admin-input min-h-[60px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Treść artykułu</label>
                <textarea
                  name="content"
                  defaultValue={editingItem?.content}
                  placeholder="Pełna treść artykułu (HTML lub Markdown)..."
                  className="admin-input min-h-[200px]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] text-dim uppercase tracking-widest">Status publikacji</label>
                <select name="isPublished" defaultValue={editingItem?.isPublished ? 'true' : 'false'} className="admin-input">
                  <option value="true">Opublikowany</option>
                  <option value="false">Wersja robocza</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-gold flex-1">
                  {editingItem ? 'Zapisz zmiany' : 'Dodaj artykuł'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className="btn-outline"
                >
                  Anuluj
                </button>
              </div>
            </form>
          )}
        </motion.div>
      )}

      {/* Content List */}
      <div className="bg-dark-2 border border-gold/10">
        {isLoading ? (
          <div className="p-12 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-gold mx-auto mb-4" />
            <p className="text-dim text-xs">Ładowanie treści...</p>
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="p-12 text-center text-dim text-xs">
            Brak treści. Kliknij "Dodaj" aby dodać pierwszy element.
          </div>
        ) : (
          <div className="divide-y divide-gold/5">
            {data?.data?.map((item: Video | Podcast | Document | Article) => (
              <div
                key={item.id}
                className="p-6 flex items-start gap-4 hover:bg-gold/5 transition-colors group"
              >
                <div className="text-2xl">
                  {activeTab === 'videos' && <Film className="w-6 h-6 text-crimson" />}
                  {activeTab === 'podcasts' && <Music className="w-6 h-6 text-gold" />}
                  {activeTab === 'documents' && (
                    <span className="text-2xl">{(item as Document).icon}</span>
                  )}
                  {activeTab === 'articles' && <BookOpen className="w-6 h-6 text-blue-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-white">{item.title}</h4>
                      {item.description && (
                        <p className="text-[10px] text-dim mt-1 line-clamp-1">{item.description}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        {activeTab === 'videos' && (
                          <>
                            <span className="text-[9px] text-gold bg-gold/10 px-2 py-0.5">
                              {(item as Video).level}
                            </span>
                            <span className="text-[9px] text-dim">⏱ {(item as Video).duration}</span>
                            {(item as Video).format && (
                              <span className="text-[9px] text-dim uppercase">{(item as Video).format}</span>
                            )}
                          </>
                        )}
                        {activeTab === 'podcasts' && (
                          <>
                            <span className="text-[9px] text-gold bg-gold/10 px-2 py-0.5">
                              {(item as Podcast).episodeNumber}
                            </span>
                            <span className="text-[9px] text-dim">⏱ {(item as Podcast).duration}</span>
                            {(item as Podcast).format && (
                              <span className="text-[9px] text-dim uppercase">{(item as Podcast).format}</span>
                            )}
                          </>
                        )}
                        {activeTab === 'documents' && (
                          <>
                            <span className="text-[9px] text-blue-400 bg-blue-400/10 px-2 py-0.5">
                              {(item as Document).type}
                            </span>
                            <span className="text-[9px] text-gold bg-gold/10 px-2 py-0.5">
                              {(item as Document).category}
                            </span>
                            <span className="text-[9px] text-dim">{(item as Document).size}</span>
                          </>
                        )}
                        {activeTab === 'articles' && (
                          <>
                            <span className="text-[9px] text-crimson bg-crimson/10 px-2 py-0.5">
                              {(item as Article).tag}
                            </span>
                            <span className="text-[9px] text-gold bg-gold/10 px-2 py-0.5">
                              {(item as Article).category}
                            </span>
                            <span className="text-[9px] text-dim">⏱ {(item as Article).readTime}</span>
                            {(item as Article).isPublished ? (
                              <span className="text-[9px] text-green-500 bg-green-500/10 px-2 py-0.5 flex items-center gap-1">
                                <Check className="w-3 h-3" /> Opublikowany
                              </span>
                            ) : (
                              <span className="text-[9px] text-dim bg-dim/10 px-2 py-0.5">Wersja robocza</span>
                            )}
                          </>
                        )}
                        <span className="text-[9px] text-dim/50">
                          {new Date(item.createdAt).toLocaleDateString('pl-PL')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        className="p-2 text-dim hover:text-gold transition-colors"
                        title="Edytuj"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 text-dim hover:text-crimson transition-colors"
                        title="Usuń"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: rgba(201, 168, 76, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AcademyMediaManager;
