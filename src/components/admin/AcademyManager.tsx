import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Upload, Download, Eye, Edit, Trash2, Users, Play, FileText, Volume2, BookOpen, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'podcast' | 'document' | 'article';
  category: string;
  level: 'Poczytkujacy' | 'Sredni' | 'Zaawansowany';
  duration?: string;
  size?: string;
  url: string;
  thumbnail?: string;
  isActive: boolean;
  order: number;
  enrolledCount: number;
  completedCount: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  instructor?: string;
  price?: number;
  tags: string[];
}

interface UserProgress {
  userId: string;
  userName: string;
  userEmail: string;
  enrolledCourses: string[];
  completedCourses: string[];
  progress: { [courseId: string]: number };
  lastActive: string;
  totalSpent: number;
}

interface AcademyManagerProps {
  token: string;
}

const AcademyManager: React.FC<AcademyManagerProps> = ({ token }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'analytics'>('courses');

  const categories = [
    'Podstawy', 'Marketing', 'Technologia', 'Bezpieczenstwo', 
    'Monetyzacja', 'Platformy', 'Prawo', 'Psychologia'
  ];

  const levels = ['Poczytkujacy', 'Sredni', 'Zaawansowany'];

  useEffect(() => {
    fetchAcademyData();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, typeFilter, levelFilter, categoryFilter]);

  const fetchAcademyData = async () => {
    try {
      const [coursesResponse, progressResponse] = await Promise.all([
        fetch('/api/admin/academy/courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('/api/admin/academy/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (coursesResponse.ok) {
        const coursesData = await coursesResponse.json();
        setCourses(coursesData);
      }

      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setUserProgress(progressData);
      }
    } catch (error) {
      console.error('Error fetching academy data:', error);
    }
    setLoading(false);
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(course => course.type === typeFilter);
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course => course.category === categoryFilter);
    }

    setFilteredCourses(filtered);
  };

  const handleToggleCourseStatus = async (courseId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/academy/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        await fetchAcademyData();
      }
    } catch (error) {
      console.error('Error updating course status:', error);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'podcast': return <Volume2 className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-blue-400 bg-blue-400/10';
      case 'podcast': return 'text-purple-400 bg-purple-400/10';
      case 'document': return 'text-green-400 bg-green-400/10';
      case 'article': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Poczytkujacy': return 'text-green-400 bg-green-400/10';
      case 'Sredni': return 'text-yellow-400 bg-yellow-400/10';
      case 'Zaawansowany': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const mockCourses: Course[] = [
    {
      id: '1',
      title: 'Wprowadzenie do branzy adult',
      description: 'Kompleksowy kurs dla poczatkujacych modeli i twórców tresci',
      type: 'video',
      category: 'Podstawy',
      level: 'Poczytkujacy',
      duration: '2:45:30',
      size: '1.2 GB',
      url: '/academy/intro-video.mp4',
      thumbnail: '/academy/intro-thumb.jpg',
      isActive: true,
      order: 1,
      enrolledCount: 156,
      completedCount: 89,
      averageRating: 4.7,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      instructor: 'Anna Kowalska',
      price: 99,
      tags: ['podstawy', 'poczatkujacy', 'braniza']
    },
    {
      id: '2',
      title: 'Marketing na platformach fansite',
      description: 'Skuteczne strategie marketingowe dla OnlyFans, Fansly i innych',
      type: 'video',
      category: 'Marketing',
      level: 'Sredni',
      duration: '3:15:45',
      size: '1.8 GB',
      url: '/academy/marketing-video.mp4',
      thumbnail: '/academy/marketing-thumb.jpg',
      isActive: true,
      order: 2,
      enrolledCount: 98,
      completedCount: 45,
      averageRating: 4.9,
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z',
      instructor: 'Piotr Nowak',
      price: 149,
      tags: ['marketing', 'fansite', 'onlyfans']
    },
    {
      id: '3',
      title: 'Bezpieczenstwo online',
      description: 'Ochrona prywatnosci i danych w branzy adult',
      type: 'document',
      category: 'Bezpieczenstwo',
      level: 'Poczytkujacy',
      size: '15 MB',
      url: '/academy/security-guide.pdf',
      isActive: true,
      order: 3,
      enrolledCount: 234,
      completedCount: 178,
      averageRating: 4.8,
      createdAt: '2024-01-08T09:15:00Z',
      updatedAt: '2024-01-08T09:15:00Z',
      instructor: 'Security Team',
      price: 49,
      tags: ['bezpieczenstwo', 'prywatnosc', 'dane']
    },
    {
      id: '4',
      title: 'Psychologia odbiorcy',
      description: 'Zrozumienie psychologii klientów w branzy adult',
      type: 'podcast',
      category: 'Psychologia',
      level: 'Zaawansowany',
      duration: '1:23:15',
      size: '245 MB',
      url: '/academy/psychology-audio.m4a',
      isActive: true,
      order: 4,
      enrolledCount: 67,
      completedCount: 23,
      averageRating: 4.6,
      createdAt: '2024-01-05T16:45:00Z',
      updatedAt: '2024-01-05T16:45:00Z',
      instructor: 'Dr. Maria Wisniewska',
      price: 79,
      tags: ['psychologia', 'odbiorcy', 'relacje']
    },
    {
      id: '5',
      title: 'Prawne aspekty pracy',
      description: 'Wszystko o prawnych regulacjach w branzy adult',
      type: 'article',
      category: 'Prawo',
      level: 'Sredni',
      url: '/academy/legal-aspects.html',
      isActive: false,
      order: 5,
      enrolledCount: 45,
      completedCount: 12,
      averageRating: 4.4,
      createdAt: '2024-01-03T11:20:00Z',
      updatedAt: '2024-01-03T11:20:00Z',
      instructor: 'Legal Team',
      price: 129,
      tags: ['prawo', 'regulacje', 'umowy']
    }
  ];

  const mockUserProgress: UserProgress[] = [
    {
      userId: '1',
      userName: 'Jan Kowalski',
      userEmail: 'jan@example.com',
      enrolledCourses: ['1', '2', '3'],
      completedCourses: ['1'],
      progress: { '1': 100, '2': 45, '3': 78 },
      lastActive: '2024-01-20T14:30:00Z',
      totalSpent: 247
    },
    {
      userId: '2',
      userName: 'Anna Nowak',
      userEmail: 'anna@example.com',
      enrolledCourses: ['1', '4'],
      completedCourses: ['1', '4'],
      progress: { '1': 100, '4': 100 },
      lastActive: '2024-01-19T10:15:00Z',
      totalSpent: 178
    },
    {
      userId: '3',
      userName: 'Piotr Wisniewski',
      userEmail: 'piotr@example.com',
      enrolledCourses: ['2', '3', '5'],
      completedCourses: ['3'],
      progress: { '2': 23, '3': 100, '5': 67 },
      lastActive: '2024-01-18T16:45:00Z',
      totalSpent: 327
    }
  ];

  useEffect(() => {
    setCourses(mockCourses);
    setUserProgress(mockUserProgress);
    setLoading(false);
  }, []);

  const totalRevenue = courses.reduce((sum, course) => sum + (course.enrolledCount * (course.price || 0)), 0);
  const totalEnrollments = courses.reduce((sum, course) => sum + course.enrolledCount, 0);
  const totalCompletions = courses.reduce((sum, course) => sum + course.completedCount, 0);
  const averageRating = courses.reduce((sum, course) => sum + course.averageRating, 0) / courses.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Academy Management</h2>
          <p className="text-gray-400">Manage courses, materials, and track user progress</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              // Export functionality
              const csv = [
                ['Title', 'Type', 'Category', 'Level', 'Enrolled', 'Completed', 'Rating', 'Revenue'],
                ...courses.map(course => [
                  course.title,
                  course.type,
                  course.category,
                  course.level,
                  course.enrolledCount.toString(),
                  course.completedCount.toString(),
                  course.averageRating.toString(),
                  `EUR${(course.enrolledCount * (course.price || 0)).toFixed(2)}`
                ])
              ].map(row => row.join(',')).join('\n');
              
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'academy-report.csv';
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
            Add Course
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Courses', value: courses.length, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
          { label: 'Total Enrollments', value: totalEnrollments, icon: Users, color: 'from-green-500 to-green-600' },
          { label: 'Completed', value: totalCompletions, icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
          { label: 'Total Revenue', value: `EUR${totalRevenue.toFixed(0)}`, icon: Award, color: 'from-yellow-500 to-yellow-600' }
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

      {/* Tabs */}
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {['courses', 'progress', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-rose-500 text-rose-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Courses Tab */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
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
              <option value="podcast">Podcasts</option>
              <option value="document">Documents</option>
              <option value="article">Articles</option>
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            >
              <option value="all">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
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

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-rose-500/50 transition-all"
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-gray-700 relative">
                  {course.thumbnail && (
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  )}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(course.type)}`}>
                      {getTypeIcon(course.type)}
                      {course.type}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                  {course.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {course.duration}
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{course.category}</span>
                    <span>EUR{course.price || 0}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <p className="text-white font-medium">{course.enrolledCount}</p>
                      <p className="text-xs text-gray-400">Enrolled</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">{course.completedCount}</p>
                      <p className="text-xs text-gray-400">Completed</p>
                    </div>
                    <div>
                      <p className="text-white font-medium">{course.averageRating.toFixed(1)}</p>
                      <p className="text-xs text-gray-400">Rating</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleCourseStatus(course.id, !course.isActive)}
                      className={`flex-1 py-2 ${course.isActive ? 'bg-gray-600 hover:bg-gray-700' : 'bg-green-600 hover:bg-green-700'} text-white text-sm font-medium rounded-lg transition-colors`}
                    >
                      {course.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Tab */}
      {activeTab === 'progress' && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Enrolled</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Completed</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {userProgress.map((user) => (
                  <motion.tr
                    key={user.userId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white text-xs font-bold">
                          {user.userName.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-white">{user.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.userEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{user.enrolledCourses.length}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{user.completedCourses.length}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">
                        {Object.values(user.progress).reduce((sum, progress) => sum + progress, 0) / user.enrolledCourses.length || 0}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">EUR{user.totalSpent}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(user.lastActive).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Course Performance</h3>
            <div className="space-y-3">
              {courses.slice(0, 5).map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white font-medium">{course.title}</p>
                    <p className="text-gray-400 text-sm">{course.enrolledCount} enrolled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">{course.averageRating.toFixed(1)} stars</p>
                    <p className="text-gray-400 text-sm">{course.completedCount} completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue by Category</h3>
            <div className="space-y-3">
              {categories.slice(0, 5).map((category) => {
                const categoryRevenue = courses
                  .filter(c => c.category === category)
                  .reduce((sum, c) => sum + (c.enrolledCount * (c.price || 0)), 0);
                
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-white">{category}</span>
                    <span className="text-white font-medium">EUR{categoryRevenue.toFixed(0)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademyManager;
