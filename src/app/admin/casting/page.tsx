'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  User, 
  Mail, 
  Calendar, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import CastingDetailDrawer from '@/components/admin/CastingDetailDrawer';

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

const CastingPage: React.FC = () => {
  const [applications, setApplications] = useState<CastingApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<CastingApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<CastingApplication | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/casting');
      if (response.ok) {
        const data = await response.json();
        setApplications(data.data || []);
      } else {
        showToast('Failed to fetch applications', 'error');
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      showToast('Failed to fetch applications', 'error');
    }
    setLoading(false);
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app =>
        app.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingStatus(true);
    try {
      const response = await fetch('/api/admin/casting', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, status })
      });

      if (response.ok) {
        await fetchApplications();
        showToast(`Application ${status} successfully`, 'success');
        setIsDrawerOpen(false);
        setSelectedApplication(null);
      } else {
        showToast('Failed to update application status', 'error');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      showToast('Failed to update application status', 'error');
    }
    setUpdatingStatus(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

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
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const pendingCount = applications.filter(app => app.status === 'pending').length;

  const openApplication = (application: CastingApplication) => {
    setSelectedApplication(application);
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-gray-700/50 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center font-bold">
              HRL
            </div>
            <h1 className="text-2xl font-bold text-white">Casting Applications</h1>
            {pendingCount > 0 && (
              <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium border border-yellow-400/20">
                {pendingCount} new
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Applications Table */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredApplications.map((application) => (
                  <motion.tr
                    key={application.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700/50 transition-colors cursor-pointer"
                    onClick={() => openApplication(application)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold text-sm mr-3">
                          {application.firstName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {application.firstName} {application.lastName}
                          </div>
                          <div className="text-sm text-gray-400">{application.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{application.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {new Date(application.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(application.status)}`}>
                        {getStatusIcon(application.status)}
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="p-1 text-gray-400 hover:text-rose-400 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No applications found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredApplications.length > 20 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Showing {Math.min(20, filteredApplications.length)} of {filteredApplications.length} applications
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-sm transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Drawer */}
      <CastingDetailDrawer
        application={selectedApplication}
        isOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedApplication(null);
        }}
        onStatusUpdate={handleStatusUpdate}
        loading={updatingStatus}
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

export default CastingPage;
