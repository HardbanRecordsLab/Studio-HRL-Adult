'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface AdminLog {
  id: string;
  createdAt: string;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
}

interface LogsResponse {
  data: AdminLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const LogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceFilter, setResourceFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchLogs();
  }, [currentPage, resourceFilter, actionFilter, fromDate, toDate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [resourceFilter, actionFilter, fromDate, toDate]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20'
      });

      if (resourceFilter !== 'all') params.append('resource', resourceFilter);
      if (actionFilter !== 'all') params.append('action', actionFilter);
      if (searchTerm) params.append('adminEmail', searchTerm);
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const response = await fetch(`/api/admin/logs?${params}`);
      if (response.ok) {
        const data: LogsResponse = await response.json();
        setLogs(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotal(data.pagination.total);
      } else {
        showToast('Failed to fetch logs', 'error');
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      showToast('Failed to fetch logs', 'error');
    }
    setLoading(false);
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleExport = async () => {
    try {
      const response = await fetch('/api/admin/logs?type=csv');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        showToast('Logs exported successfully', 'success');
      } else {
        showToast('Failed to export logs', 'error');
      }
    } catch (error) {
      console.error('Error exporting logs:', error);
      showToast('Failed to export logs', 'error');
    }
  };

  const handleCleanup = async () => {
    if (!confirm('Are you sure you want to delete logs older than 30 days? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch('/api/admin/logs?days=30', {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        showToast(data.message, 'success');
        fetchLogs();
      } else {
        showToast('Failed to cleanup logs', 'error');
      }
    } catch (error) {
      console.error('Error cleaning up logs:', error);
      showToast('Failed to cleanup logs', 'error');
    }
    setDeleting(false);
  };

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (action.includes('UPDATE')) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    if (action.includes('DELETE')) return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (action === 'LOGIN') return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    if (action === 'LOGIN_FAILED') return 'text-red-600 bg-red-600/10 border-red-600/20';
    return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  const getResourceColor = (resource: string) => {
    const colors: { [key: string]: string } = {
      partners: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      casting: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      finance: 'text-green-400 bg-green-400/10 border-green-400/20',
      documents: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      academy: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
      settings: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      logs: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
      auth: 'text-red-400 bg-red-400/10 border-red-400/20'
    };
    return colors[resource] || 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  };

  const resources = ['all', 'partners', 'casting', 'finance', 'documents', 'academy', 'settings', 'logs', 'auth'];
  const actions = ['all', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGIN_FAILED'];

  if (loading && currentPage === 1) {
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
            <h1 className="text-2xl font-bold text-white">System Logs</h1>
            <span className="px-3 py-1 bg-gray-400/10 text-gray-400 rounded-full text-sm font-medium border border-gray-400/20">
              {total} entries
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={handleCleanup}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-white transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? 'Cleaning...' : 'Cleanup 30 days'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search admin email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchLogs()}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
              />
            </div>

            {/* Resource Filter */}
            <select
              value={resourceFilter}
              onChange={(e) => setResourceFilter(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            >
              {resources.map(resource => (
                <option key={resource} value={resource}>
                  {resource === 'all' ? 'All Resources' : resource.charAt(0).toUpperCase() + resource.slice(1)}
                </option>
              ))}
            </select>

            {/* Action Filter */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
            >
              {actions.map(action => (
                <option key={action} value={action}>
                  {action === 'all' ? 'All Actions' : action}
                </option>
              ))}
            </select>

            {/* Date Range */}
            <div className="flex gap-2">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white text-sm"
              />
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white text-sm"
              />
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date/Time</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Admin</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {logs.map((log) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-white">
                            {new Date(log.createdAt).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(log.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-white">{log.adminEmail}</div>
                      {log.ip && (
                        <div className="text-xs text-gray-400">{log.ip}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getResourceColor(log.resource)}`}>
                        {log.resource}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-xs text-gray-300 font-mono">
                        {log.resourceId || '-'}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate">
                        {log.details || '-'}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {logs.length === 0 && !loading && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No logs found</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="text-white">Loading...</div>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, total)} of {total} logs
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 rounded-lg text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-gray-800 rounded-lg text-white text-sm">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:opacity-50 rounded-lg text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

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

export default LogsPage;
