'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  Calendar,
  Clock,
  Wifi,
  User,
  Users,
  MapPin,
  Globe,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

interface Platform {
  id: string;
  name: string;
  username: string;
  url: string;
  followers: number;
}

interface LiveSchedule {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
}

interface Partner {
  id: string;
  name: string;
  handle: string;
  email: string;
  type: 'solo' | 'couple';
  status: 'active' | 'inactive' | 'pending';
  bio?: string;
  description?: string;
  avatar?: string;
  heroImage?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  platforms: Platform[];
  liveSchedule: LiveSchedule[];
  createdAt: string;
  updatedAt: string;
}

const PartnerProfilePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<Partner | null>(null);

  useEffect(() => {
    fetchPartner();
  }, [params.id]);

  const fetchPartner = async () => {
    try {
      const response = await fetch(`/api/admin/partners?id=${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setPartner(data.data);
      } else {
        router.push('/admin/partners');
      }
    } catch (error) {
      console.error('Error fetching partner:', error);
      router.push('/admin/partners');
    }
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10';
      case 'inactive':
        return 'text-gray-400 bg-gray-400/10';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10';
      default:
        return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'inactive':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'solo' ? <User className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  };

  const getPlatformIcon = (platform: string) => {
    // Simple icon mapping for platforms
    const iconMap: { [key: string]: string } = {
      'OnlyFans': 'OF',
      'Fansly': 'FS',
      'ManyVids': 'MV',
      'Chaturbate': 'CB',
      'Stripchat': 'SC',
      'BongaCams': 'BC',
      'Instagram': 'IG',
      'Twitter/X': 'TW',
      'TikTok': 'TT'
    };
    return iconMap[platform] || platform.charAt(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Partner not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/partners"
              className="p-2 hover:bg-gray-800 rounded-lg text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Partner Profile</h1>
          </div>
          <Link
            href={`/admin/partners/${partner.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 rounded-lg text-white font-medium transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit Partner
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden mb-8">
          {partner.heroImage && (
            <div className="h-64 bg-gray-700 relative">
              <img 
                src={partner.heroImage} 
                alt={`${partner.name} hero`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          )}
          
          <div className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {partner.avatar ? (
                  <img src={partner.avatar} alt={partner.name} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  partner.name.charAt(0).toUpperCase()
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-3xl font-bold text-white">{partner.name}</h2>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(partner.status)}`}>
                    {getStatusIcon(partner.status)}
                    {partner.status}
                  </span>
                  <div className="flex items-center gap-2 text-gray-300">
                    {getTypeIcon(partner.type)}
                    <span className="capitalize">{partner.type}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>@{partner.handle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{partner.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(partner.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {partner.bio && (
                  <p className="mt-4 text-gray-300 text-lg leading-relaxed">{partner.bio}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {partner.description && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">About</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{partner.description}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Platforms</span>
              <Wifi className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white">{partner.platforms.length}</p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Followers</span>
              <Star className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {partner.platforms.reduce((sum, p) => sum + p.followers, 0).toLocaleString()}
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Active Sessions</span>
              <Clock className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {partner.liveSchedule.filter(s => s.isActive).length}
            </p>
          </div>
          
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Last Updated</span>
              <Calendar className="w-4 h-4 text-rose-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {new Date(partner.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Platforms */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Platforms
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partner.platforms.map((platform) => (
              <div key={platform.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold text-sm">
                      {getPlatformIcon(platform.name)}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{platform.name}</h4>
                      <p className="text-gray-400 text-sm">@{platform.username}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-gray-300">
                    <Star className="w-4 h-4" />
                    <span>{platform.followers.toLocaleString()}</span>
                  </div>
                  {platform.url && (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Visit
                    </a>
                  )}
                </div>
              </div>
            ))}
            {partner.platforms.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-8">No platforms added yet</p>
            )}
          </div>
        </div>

        {/* Live Schedule */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Live Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partner.liveSchedule.map((schedule) => (
              <div key={schedule.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-medium">{getDayName(schedule.dayOfWeek)}</h4>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    schedule.isActive 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-gray-400 bg-gray-400/10'
                  }`}>
                    {schedule.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{schedule.startTime} - {schedule.endTime}</span>
                  </div>
                </div>
              </div>
            ))}
            {partner.liveSchedule.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-8">No schedules added yet</p>
            )}
          </div>
        </div>

        {/* About Images */}
        {(partner.aboutImage1 || partner.aboutImage2) && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-8">
            <h3 className="text-xl font-semibold text-white mb-6">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {partner.aboutImage1 && (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img 
                    src={partner.aboutImage1} 
                    alt="About 1"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
              {partner.aboutImage2 && (
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <img 
                    src={partner.aboutImage2} 
                    alt="About 2"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerProfilePage;
