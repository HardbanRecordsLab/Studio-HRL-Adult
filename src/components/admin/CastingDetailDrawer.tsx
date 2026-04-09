'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  User,
  Clock,
  Video,
  Image,
  Star,
  Heart,
  Camera,
  Play,
  Check
} from 'lucide-react';

interface CastingApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  height: number;
  weight: number;
  hairColor: string;
  eyeColor: string;
  bustSize: string;
  hasExperience: boolean;
  experienceDescription?: string;
  platforms: string[];
  contentTypes: string[];
  workingTimes: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  motivation: string;
  bodyModifications: string;
  skills: string;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  videoUrl?: string;
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

interface CastingDetailDrawerProps {
  application: CastingApplication | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
  loading?: boolean;
}

const CastingDetailDrawer: React.FC<CastingDetailDrawerProps> = ({
  application,
  isOpen,
  onClose,
  onStatusUpdate,
  loading = false
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!application) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getDayName = (dayOfWeek: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayOfWeek];
  };

  const photos = [application.photo1, application.photo2, application.photo3].filter(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-4xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-l border-gray-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/50 backdrop-blur border-b border-gray-700">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white">
                    {application.firstName} {application.lastName}
                  </h2>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    {application.status}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto p-6 pb-32">
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                      <p className="text-white">{application.firstName} {application.lastName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                      <p className="text-white flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {application.email}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                      <p className="text-white flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {application.phone}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Date of Birth</label>
                      <p className="text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(application.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Physical Details */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Physical Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Height</label>
                      <p className="text-white">{application.height} cm</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Weight</label>
                      <p className="text-white">{application.weight} kg</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Hair Color</label>
                      <p className="text-white">{application.hairColor}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Eye Color</label>
                      <p className="text-white">{application.eyeColor}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">Bust Size</label>
                      <p className="text-white">{application.bustSize}</p>
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Experience</h3>
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      application.hasExperience ? 'bg-green-400/10 text-green-400' : 'bg-gray-400/10 text-gray-400'
                    }`}>
                      <Check className="w-4 h-4" />
                      {application.hasExperience ? 'Has Experience' : 'No Experience'}
                    </span>
                  </div>
                  {application.experienceDescription && (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Experience Description</label>
                      <p className="text-gray-300 leading-relaxed">{application.experienceDescription}</p>
                    </div>
                  )}
                </div>

                {/* Platforms */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Known Platforms</h3>
                  <div className="flex flex-wrap gap-2">
                    {application.platforms.map((platform, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-gray-300">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Types */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Content Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {application.contentTypes.map((type, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-lg text-gray-300">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Working Times */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Availability
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {application.workingTimes.map((time, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg border border-gray-700">
                        <span className="text-white">{getDayName(time.dayOfWeek)}</span>
                        <span className="text-gray-300">{time.startTime} - {time.endTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Motivation */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Motivation
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{application.motivation}</p>
                </div>

                {/* Body Modifications & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Body Modifications</h3>
                    <p className="text-gray-300 leading-relaxed">{application.bodyModifications || 'None'}</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Skills</h3>
                    <p className="text-gray-300 leading-relaxed">{application.skills || 'None specified'}</p>
                  </div>
                </div>

                {/* Photos */}
                {photos.length > 0 && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Photos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-rose-500 transition-all"
                          onClick={() => setSelectedImage(photo!)}
                        >
                          <img
                            src={photo!}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video */}
                {application.videoUrl && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Video
                    </h3>
                    <a
                      href={application.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      Watch Video
                    </a>
                  </div>
                )}

                {/* Consents */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Consents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${application.consentAge ? 'text-green-400' : 'text-red-400'}`} />
                      <span className="text-white">Age Verification</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${application.consentTerms ? 'text-green-400' : 'text-red-400'}`} />
                      <span className="text-white">Terms & Conditions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Check className={`w-5 h-5 ${application.consentData ? 'text-green-400' : 'text-red-400'}`} />
                      <span className="text-white">Data Processing Consent</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 bg-black/50 backdrop-blur border-t border-gray-700 p-6">
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Applied: {new Date(application.createdAt).toLocaleDateString()}
                  {application.updatedAt !== application.createdAt && (
                    <span className="ml-4">
                      Updated: {new Date(application.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  {application.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onStatusUpdate(application.id, 'approved')}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {loading ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => onStatusUpdate(application.id, 'rejected')}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        {loading ? 'Processing...' : 'Reject'}
                      </button>
                    </>
                  )}
                  {application.status !== 'pending' && (
                    <div className="text-sm text-gray-400">
                      Status already set to <span className="font-medium text-white">{application.status}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
                onClick={() => setSelectedImage(null)}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <img
                  src={selectedImage}
                  alt="Enlarged photo"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default CastingDetailDrawer;
