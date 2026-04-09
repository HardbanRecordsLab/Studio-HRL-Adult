import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload, Download, Eye, Edit, Trash2, Calendar, Tag, Folder, Clock, CheckCircle, XCircle, Play, Image, FileText, Video, Music } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: 'video' | 'image' | 'audio' | 'document';
  category: string;
  tags: string[];
  url: string;
  thumbnail?: string;
  duration?: string;
  size?: string;
  status: 'draft' | 'published' | 'archived';
  scheduledFor?: string;
  createdAt: string;
  updatedAt: string;
  views?: number;
  downloads?: number;
  author?: string;
  platform?: string;
  isPublic: boolean;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface ContentManagementSystemProps {
  token: string;
}

const ContentManagementSystem: React.FC<ContentManagementSystemProps> = ({ token }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    'Tutorial', 'Interview', 'Behind the Scenes', 'Performance', 'Photoshoot', 
    'Podcast', 'Webinar', 'Course Material', 'Marketing', 'User Generated'
  ];

  const tags = [
    'Beginner', 'Advanced', 'Live Cam', 'Fansite', 'Marketing', 'SEO', 
    'Monetization', 'Safety', 'Equipment', 'Editing', 'Social Media'
  ];

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [content, searchTerm, typeFilter, statusFilter, categoryFilter]);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/content', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
    setLoading(false);
  };

  const filterContent = () => {
    let filtered = content;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredContent(filtered);
  };

  const handleStatusChange = async (contentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        await fetchContent();
      }
    } catch (error) {
      console.error('Error updating content status:', error);
    }
  };

  const handleSchedule = async (contentId: string, scheduledDate: string) => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}/schedule`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ scheduledFor: scheduledDate })
      });

      if (response.ok) {
        await fetchContent();
        setShowScheduleModal(false);
        setSelectedContent(null);
      }
    } catch (error) {
      console.error('Error scheduling content:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'image': return <Image className="w-4 h-4" />;
      case 'audio': return <Music className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-400/10';
      case 'draft': return 'text-yellow-400 bg-yellow-400/10';
      case 'archived': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-400 bg-blue-400/10';
      case 'image': return 'text-purple-400 bg-purple-400/10';
      case 'audio': return 'text-orange-400 bg-orange-400/10';
      case 'document': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const mockContent: ContentItem[] = [
    {
      id: '1',
      title: 'Live Cam Success Strategies',
      description: 'Complete guide to maximizing earnings on live cam platforms',
      type: 'video',
      category: 'Tutorial',
      tags: ['Beginner', 'Live Cam', 'Monetization'],
      url: '/content/video1.mp4',
      thumbnail: '/thumbnails/video1.jpg',
      duration: '45:23',
      size: '245 MB',
      status: 'published',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      views: 1250,
      downloads: 89,
      author: 'Admin',
      platform: 'YouTube',
      isPublic: true,
      level: 'beginner'
    },
    {
      id: '2',
      title: 'Fansite Marketing Masterclass',
      description: 'Advanced marketing techniques for content creators',
      type: 'video',
      category: 'Course Material',
      tags: ['Advanced', 'Fansite', 'Marketing'],
      url: '/content/video2.mp4',
      thumbnail: '/thumbnails/video2.jpg',
      duration: '1:23:45',
      size: '512 MB',
      status: 'published',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      views: 890,
      downloads: 45,
      author: 'Marketing Team',
      platform: 'OnlyFans',
      isPublic: false,
      level: 'advanced'
    },
    {
      id: '3',
      title: 'Equipment Setup Guide',
      description: 'Essential equipment for professional content creation',
      type: 'document',
      category: 'Tutorial',
      tags: ['Beginner', 'Equipment'],
      url: '/content/equipment-guide.pdf',
      size: '2.3 MB',
      status: 'draft',
      createdAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-08T09:15:00Z',
      views: 234,
      downloads: 156,
      author: 'Admin',
      isPublic: true,
      level: 'beginner'
    },
    {
      id: '4',
      title: 'Safety and Privacy Workshop',
      description: 'Important safety measures for online content creators',
      type: 'audio',
      category: 'Webinar',
      tags: ['Safety', 'Privacy'],
      url: '/content/safety-workshop.m4a',
      duration: '42:15',
      size: '89 MB',
      status: 'published',
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-05T16:45:00Z',
      views: 567,
      downloads: 78,
      author: 'Security Team',
      isPublic: true,
      level: 'intermediate'
    },
    {
      id: '5',
      title: 'Behind the Scenes Photoshoot',
      description: 'Professional photoshoot techniques and tips',
      type: 'image',
      category: 'Photoshoot',
      tags: ['Advanced', 'Editing'],
      url: '/content/photoshoot.jpg',
      size: '4.5 MB',
      status: 'published',
      createdAt: '2024-01-03T11:20:00Z',
      updatedAt: '2024-01-03T11:20:00Z',
      views: 2340,
      downloads: 234,
      author: 'Photography Team',
      isPublic: true,
      level: 'advanced'
    }
  ];

  useEffect(() => {
    setContent(mockContent);
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Management</h2>
          <p className="text-gray-400">Upload, moderate, and schedule content</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              // Export functionality
              const csv = [
                ['Title', 'Type', 'Category', 'Status', 'Views', 'Downloads'],
                ...filteredContent.map(item => [
                  item.title,
                  item.type,
                  item.category,
                  item.status,
                  item.views?.toString() || '0',
                  item.downloads?.toString() || '0'
                ])
              ].map(row => row.join(',')).join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'content-report.csv';
              a.click();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Content
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Content', value: content.length, icon: Folder, color: 'from-blue-500 to-blue-600' },
          { label: 'Published', value: content.filter(c => c.status === 'published').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Draft', value: content.filter(c => c.status === 'draft').length, icon: Edit, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Total Views', value: content.reduce((sum, c) => sum + (c.views || 0), 0).toLocaleString(), icon: Eye, color: 'from-purple-500 to-purple-600' }
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} p-4 rounded-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-white/50" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Types</option>
          <option value="video">Videos</option>
          <option value="image">Images</option>
          <option value="audio">Audio</option>
          <option value="document">Documents</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-rose-500/50 transition-all"
          >
            {/* Thumbnail/Preview */}
            <div className="aspect-video bg-gray-700 relative">
              {item.type === 'video' && item.thumbnail && (
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
              )}
              {item.type === 'image' && (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-2 left-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                  {getTypeIcon(item.type)}
                  {item.type}
                </span>
              </div>
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              {item.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                  {item.duration}
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="p-4">
              <h3 className="font-semibold text-white mb-2 line-clamp-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
              )}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {item.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                    #{tag}
                  </span>
                ))}
                {item.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                    +{item.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {item.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    {item.downloads || 0}
                  </span>
                </div>
                {item.size && (
                  <span>{item.size}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedContent(item);
                    setShowScheduleModal(true);
                  }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Schedule
                </button>
                {item.status === 'draft' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'published')}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Publish
                  </button>
                )}
                {item.status === 'published' && (
                  <button
                    onClick={() => handleStatusChange(item.id, 'archived')}
                    className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && selectedContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-white mb-6">Schedule Content</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
                <div className="p-3 bg-gray-800 rounded-lg">
                  <p className="text-white font-medium">{selectedContent.title}</p>
                  <p className="text-gray-400 text-sm">{selectedContent.type} • {selectedContent.category}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Schedule Date</label>
                <input
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  onChange={(e) => setSelectedContent(prev => prev ? { ...prev, scheduledFor: e.target.value } : null)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Publishing Options</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-white">Notify subscribers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span className="text-white">Post to social media</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="text-white">Send email newsletter</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  if (selectedContent.scheduledFor) {
                    handleSchedule(selectedContent.id, selectedContent.scheduledFor);
                  }
                }}
                disabled={!selectedContent.scheduledFor}
                className="flex-1 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold rounded-lg transition-all"
              >
                Schedule
              </button>
              <button
                onClick={() => {
                  setShowScheduleModal(false);
                  setSelectedContent(null);
                }}
                className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ContentManagementSystem;
