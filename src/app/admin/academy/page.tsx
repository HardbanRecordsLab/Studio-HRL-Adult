'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, 
  Podcast, 
  FileText, 
  BookOpen,
  Plus, 
  Edit, 
  Trash2, 
  ChevronUp, 
  ChevronDown,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle
} from 'lucide-react';
import ArticleModal from '@/components/admin/ArticleModal';
import VideoModal from '@/components/admin/VideoModal';
import PodcastModal from '@/components/admin/PodcastModal';
import DocumentModal from '@/components/admin/DocumentModal';

interface AcademyVideo {
  id: string;
  title: string;
  description?: string;
  duration: string;
  level: 'Pocza tkujcy' | ' redni' | 'Zaawansowany';
  cloudinaryId: string;
  url: string;
  thumbnail?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AcademyPodcast {
  id: string;
  title: string;
  description?: string;
  episodeNumber: string;
  duration: string;
  cloudinaryId: string;
  url: string;
  format?: string;
  bytes?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AcademyDocument {
  id: string;
  title: string;
  description?: string;
  type: 'PDF' | 'DOCX';
  category: 'Prawny' | 'Operacyjny' | 'Biznesowy' | 'Strategia' | 'Compliance' | 'Casting';
  icon: string;
  cloudinaryId: string;
  url: string;
  size?: number;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface AcademyBlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Psychologia' | 'Platformy' | 'Live Cam' | 'Bezpiecze stwo' | 'Monetyzacja' | 'Marka' | 'Marketing' | 'Biznes' | 'Technologia';
  tag: 'MUST READ' | 'ANALIZA' | 'PORADNIK' | 'BEZPIECZE STWO' | 'ZAAWANSOWANY' | 'STRATEGIA' | 'PODSTAWY' | 'TECH';
  excerpt: string;
  content: string;
  readTime: string;
  thumbnail?: string;
  isPublished: boolean;
  publishedAt?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

type TabType = 'videos' | 'podcasts' | 'documents' | 'articles';

const AcademyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('videos');
  const [videos, setVideos] = useState<AcademyVideo[]>([]);
  const [podcasts, setPodcasts] = useState<AcademyPodcast[]>([]);
  const [documents, setDocuments] = useState<AcademyDocument[]>([]);
  const [articles, setArticles] = useState<AcademyBlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Modal states
  const [articleModalOpen, setArticleModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [podcastModalOpen, setPodcastModalOpen] = useState(false);
  const [documentModalOpen, setDocumentModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoints = {
        videos: '/api/admin/academy/videos',
        podcasts: '/api/admin/academy/podcasts',
        documents: '/api/admin/academy/documents',
        articles: '/api/admin/academy/articles'
      };

      const response = await fetch(endpoints[activeTab]);
      if (response.ok) {
        const data = await response.json();
        
        switch (activeTab) {
          case 'videos':
            setVideos(data.data || []);
            break;
          case 'podcasts':
            setPodcasts(data.data || []);
            break;
          case 'documents':
            setDocuments(data.data || []);
            break;
          case 'articles':
            setArticles(data.data || []);
            break;
        }
      } else {
        showToast('Failed to fetch data', 'error');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast('Failed to fetch data', 'error');
    }
    setLoading(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleToggleActive = async (type: TabType, id: string, currentStatus: boolean) => {
    try {
      const endpoints = {
        videos: '/api/admin/academy/videos',
        podcasts: '/api/admin/academy/podcasts',
        documents: '/api/admin/academy/documents',
        articles: '/api/admin/academy/articles'
      };

      const response = await fetch(`${endpoints[type]}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...((type === 'articles' ? articles.find(a => a.id === id) : 
             type === 'videos' ? videos.find(v => v.id === id) : 
             type === 'podcasts' ? podcasts.find(p => p.id === id) : 
             documents.find(d => d.id === id)) || {}),
          isActive: type === 'articles' ? undefined : !currentStatus,
          isPublished: type === 'articles' ? !currentStatus : undefined
        })
      });

      if (response.ok) {
        await fetchData();
        showToast(`${type === 'articles' ? 'Article' : type.slice(0, -1).charAt(0).toUpperCase() + type.slice(1, -1)} ${!currentStatus ? 'activated' : 'deactivated'}`, 'success');
      } else {
        showToast('Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (type: TabType, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const endpoints = {
        videos: '/api/admin/academy/videos',
        podcasts: '/api/admin/academy/podcasts',
        documents: '/api/admin/academy/documents',
        articles: '/api/admin/academy/articles'
      };

      const response = await fetch(`${endpoints[type]}?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchData();
        showToast('Item deleted successfully', 'success');
      } else {
        showToast('Failed to delete item', 'error');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('Failed to delete item', 'error');
    }
  };

  const handleReorder = async (type: TabType, id: string, direction: 'up' | 'down') => {
    const items = type === 'videos' ? videos : 
                 type === 'podcasts' ? podcasts : 
                 type === 'documents' ? documents : articles;
    
    const currentIndex = items.findIndex(item => item.id === id);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= items.length) return;

    const reorderedItems = [...items];
    const [movedItem] = reorderedItems.splice(currentIndex, 1);
    reorderedItems.splice(newIndex, 0, movedItem);

    // Update orders
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    try {
      const endpoints = {
        videos: '/api/admin/academy/videos',
        podcasts: '/api/admin/academy/podcasts',
        documents: '/api/admin/academy/documents',
        articles: '/api/admin/academy/articles'
      };

      // Update all affected items
      const promises = updatedItems
        .filter(item => 
          (direction === 'up' && (item.id === id || item.order === newIndex + 1)) ||
          (direction === 'down' && (item.id === id || item.order === newIndex + 1))
        )
        .map(item => 
          fetch(`${endpoints[type]}?id=${item.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...item, order: item.order })
          })
        );

      await Promise.all(promises);
      await fetchData();
      showToast('Order updated successfully', 'success');
    } catch (error) {
      console.error('Error updating order:', error);
      showToast('Failed to update order', 'error');
    }
  };

  const openModal = (type: TabType, item?: any) => {
    setEditingItem(item);
    
    switch (type) {
      case 'articles':
        setArticleModalOpen(true);
        break;
      case 'videos':
        setVideoModalOpen(true);
        break;
      case 'podcasts':
        setPodcastModalOpen(true);
        break;
      case 'documents':
        setDocumentModalOpen(true);
        break;
    }
  };

  const tabs = [
    { id: 'videos' as TabType, label: 'Filmy', icon: Video },
    { id: 'podcasts' as TabType, label: 'Podcasty', icon: Podcast },
    { id: 'documents' as TabType, label: 'Dokumenty', icon: FileText },
    { id: 'articles' as TabType, label: 'Artyku y', icon: BookOpen }
  ];

  const renderContent = () => {
    const items = activeTab === 'videos' ? videos : 
                  activeTab === 'podcasts' ? podcasts : 
                  activeTab === 'documents' ? documents : articles;

    const getStatusColor = (isActive: boolean) => {
      return isActive ? 'text-green-400' : 'text-gray-400';
    };

    const getStatusIcon = (isActive: boolean) => {
      return isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />;
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-white">Loading...</div>
        </div>
      );
    }

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      {activeTab === 'videos' && (
                        <div className="text-sm text-gray-400">{(item as AcademyVideo).duration} | {(item as AcademyVideo).level}</div>
                      )}
                      {activeTab === 'podcasts' && (
                        <div className="text-sm text-gray-400">{(item as AcademyPodcast).episodeNumber} | {(item as AcademyPodcast).duration}</div>
                      )}
                      {activeTab === 'documents' && (
                        <div className="text-sm text-gray-400">{(item as AcademyDocument).type} | {(item as AcademyDocument).category}</div>
                      )}
                      {activeTab === 'articles' && (
                        <div className="text-sm text-gray-400">{(item as AcademyBlogArticle).category} | {(item as AcademyBlogArticle).tag}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(activeTab, item.id, activeTab === 'articles' ? (item as AcademyBlogArticle).isPublished : (item as any).isActive)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activeTab === 'articles' ? (item as AcademyBlogArticle).isPublished : (item as any).isActive)} hover:opacity-80 transition-opacity`}
                    >
                      {getStatusIcon(activeTab === 'articles' ? (item as AcademyBlogArticle).isPublished : (item as any).isActive)}
                      {activeTab === 'articles' ? (item as AcademyBlogArticle).isPublished ? 'Published' : 'Draft' : (item as any).isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">#{item.order}</span>
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleReorder(activeTab, item.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleReorder(activeTab, item.id, 'down')}
                          disabled={index === items.length - 1}
                          className="p-1 text-gray-400 hover:text-rose-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(activeTab, item)}
                        className="p-1 text-gray-400 hover:text-rose-400 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(activeTab, item.id)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No {activeTab} found</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold">
              HRL
            </div>
            <h1 className="text-2xl font-bold text-white">Academy Management</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-rose-500 text-rose-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Add Button */}
        <div className="mb-6">
          <button
            onClick={() => openModal(activeTab)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <Plus className="w-4 h-4" />
            Add {activeTab === 'videos' ? 'Video' : activeTab === 'podcasts' ? 'Podcast' : activeTab === 'documents' ? 'Document' : 'Article'}
          </button>
        </div>

        {/* Content */}
        {renderContent()}
      </div>

      {/* Modals */}
      <ArticleModal
        isOpen={articleModalOpen}
        onClose={() => {
          setArticleModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          fetchData();
          setArticleModalOpen(false);
          setEditingItem(null);
        }}
        article={editingItem}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => {
          setVideoModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          fetchData();
          setVideoModalOpen(false);
          setEditingItem(null);
        }}
        video={editingItem}
      />

      <PodcastModal
        isOpen={podcastModalOpen}
        onClose={() => {
          setPodcastModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          fetchData();
          setPodcastModalOpen(false);
          setEditingItem(null);
        }}
        podcast={editingItem}
      />

      <DocumentModal
        isOpen={documentModalOpen}
        onClose={() => {
          setDocumentModalOpen(false);
          setEditingItem(null);
        }}
        onSuccess={() => {
          fetchData();
          setDocumentModalOpen(false);
          setEditingItem(null);
        }}
        document={editingItem}
      />

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white font-medium ${
            toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default AcademyPage;
