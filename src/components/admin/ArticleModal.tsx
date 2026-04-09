'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, FileText, Clock } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

interface AcademyBlogArticle {
  id?: string;
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
  article
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Psychologia' as AcademyBlogArticle['category'],
    tag: 'MUST READ' as AcademyBlogArticle['tag'],
    excerpt: '',
    content: '',
    readTime: '',
    thumbnail: '',
    isPublished: false
  });

  const categories: AcademyBlogArticle['category'][] = [
    'Psychologia', 'Platformy', 'Live Cam', 'Bezpiecze stwo',
    'Monetyzacja', 'Marka', 'Marketing', 'Biznes', 'Technologia'
  ];

  const tags: AcademyBlogArticle['tag'][] = [
    'MUST READ', 'ANALIZA', 'PORADNIK', 'BEZPIECZE STWO',
    'ZAAWANSOWANY', 'STRATEGIA', 'PODSTAWY', 'TECH'
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
        thumbnail: article.thumbnail || '',
        isPublished: article.isPublished
      });
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'Psychologia',
        tag: 'MUST READ',
        excerpt: '',
        content: '',
        readTime: '',
        thumbnail: '',
        isPublished: false
      });
    }
  }, [article]);

  useEffect(() => {
    // Auto-generate slug from title
    if (formData.title && !article) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, article]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = article ? `/api/admin/academy/articles?id=${article.id}` : '/api/admin/academy/articles';
      const method = article ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save article');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Failed to save article');
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
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">
              {article ? 'Edit Article' : 'New Article'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="space-y-6">
              {/* Title and Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Slug *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    required
                  />
                </div>
              </div>

              {/* Category and Tag */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as AcademyBlogArticle['category'] }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tag *</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData(prev => ({ ...prev, tag: e.target.value as AcademyBlogArticle['tag'] }))}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  >
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Excerpt * (max 200 chars)</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value.slice(0, 200) }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  rows={3}
                  maxLength={200}
                  required
                />
                <div className="text-xs text-gray-400 mt-1">
                  {formData.excerpt.length}/200 characters
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white font-mono text-sm"
                  rows={12}
                  placeholder="Write your article content here (Markdown supported)..."
                  required
                />
              </div>

              {/* Read Time */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Read Time *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                    placeholder="e.g., 8 min"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, readTime: estimateReadTime(formData.content) }))}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center gap-2"
                  >
                    <Clock className="w-4 h-4" />
                    Auto
                  </button>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Thumbnail</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, thumbnail: (result.info as any).secure_url }));
                    }
                  }}
                >
                  {({ open }) => (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => open()}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg hover:border-rose-500 text-white transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        {formData.thumbnail ? 'Change Thumbnail' : 'Upload Thumbnail'}
                      </button>
                      {formData.thumbnail && (
                        <div className="relative">
                          <img
                            src={formData.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </CldUploadWidget>
              </div>

              {/* Published Status */}
              <div className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-rose-400" />
                  <div>
                    <div className="text-white font-medium">Publish Status</div>
                    <div className="text-sm text-gray-400">
                      {formData.isPublished ? 'Article will be visible to users' : 'Article will be saved as draft'}
                    </div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : (article ? 'Update Article' : 'Create Article')}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArticleModal;
