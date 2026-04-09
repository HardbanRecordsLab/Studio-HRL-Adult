'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  CheckCircle, 
  XCircle, 
  Plus, 
  Upload,
  FileText,
  Calendar,
  User,
  AlertCircle,
  Eye,
  EyeOff,
  Clock
} from 'lucide-react';
import AddDocumentForm from './AddDocumentForm';

interface Partner {
  id: string;
  name: string;
  handle: string;
  email: string;
  status: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  documentStatus: string;
  documentsCount: number;
  latestDocument?: any;
  documents: any[];
}

interface DocumentVerifyDrawerProps {
  partner: Partner | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DocumentVerifyDrawer: React.FC<DocumentVerifyDrawerProps> = ({
  partner,
  isOpen,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImages, setShowImages] = useState<{ [key: string]: boolean }>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  if (!partner) return null;

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusUpdate = async (documentId: string, status: 'verified' | 'rejected') => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: documentId,
          status,
          notes: status === 'rejected' ? notes[documentId] : undefined
        })
      });

      if (response.ok) {
        showToast(`Document ${status} successfully`, 'success');
        onSuccess();
      } else {
        const error = await response.json();
        showToast(error.error || 'Failed to update document', 'error');
      }
    } catch (error) {
      console.error('Error updating document:', error);
      showToast('Failed to update document', 'error');
    }
    setLoading(false);
  };

  const toggleImageVisibility = (documentId: string, imageType: string) => {
    const key = `${documentId}-${imageType}`;
    setShowImages(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isImageVisible = (documentId: string, imageType: string) => {
    const key = `${documentId}-${imageType}`;
    return showImages[key] || false;
  };

  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case 'id_card':
        return 'Dowód osobisty';
      case 'passport':
        return 'Paszport';
      case 'driving_license':
        return 'Prawo jazdy';
      default:
        return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'rejected':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'expired':
        return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'expired':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const documents = partner.documents || [];

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
            className="fixed right-0 top-0 h-full w-full max-w-5xl bg-gradient-to-br from-gray-900 via-gray-800 to-black border-l border-gray-700 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/50 backdrop-blur border-b border-gray-700">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white font-bold">
                    {partner.avatar ? (
                      <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      partner.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{partner.name}</h2>
                    <div className="text-gray-400">@{partner.handle} | {partner.email}</div>
                  </div>
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
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No Documents</h3>
                  <p className="text-gray-400 mb-6">This partner hasn't uploaded any documents yet.</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
                  >
                    Request Documents (TODO)
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Documents</h3>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Document
                    </button>
                  </div>

                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {getDocumentTypeLabel(doc.type)}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                              {getStatusIcon(doc.status)}
                              {doc.status}
                            </span>
                            {doc.verifiedAt && (
                              <span>Verified: {new Date(doc.verifiedAt).toLocaleDateString()}</span>
                            )}
                            {doc.verifiedBy && (
                              <span>By: {doc.verifiedBy}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Document Images */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Front */}
                        <div className="relative group">
                          <div className="aspect-[3/2] bg-gray-900 rounded-lg overflow-hidden">
                            <img
                              src={doc.frontUrl}
                              alt="Document front"
                              className={`w-full h-full object-cover transition-all duration-300 ${
                                isImageVisible(doc.id, 'front') ? '' : 'blur-lg'
                              }`}
                            />
                          </div>
                          <button
                            onClick={() => toggleImageVisibility(doc.id, 'front')}
                            className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
                          >
                            {isImageVisible(doc.id, 'front') ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <div className="mt-2 text-center">
                            <span className="text-sm text-gray-400">Front</span>
                          </div>
                        </div>

                        {/* Back */}
                        {doc.backUrl && (
                          <div className="relative group">
                            <div className="aspect-[3/2] bg-gray-900 rounded-lg overflow-hidden">
                              <img
                                src={doc.backUrl}
                                alt="Document back"
                                className={`w-full h-full object-cover transition-all duration-300 ${
                                  isImageVisible(doc.id, 'back') ? '' : 'blur-lg'
                                }`}
                              />
                            </div>
                            <button
                              onClick={() => toggleImageVisibility(doc.id, 'back')}
                              className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
                            >
                              {isImageVisible(doc.id, 'back') ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <div className="mt-2 text-center">
                              <span className="text-sm text-gray-400">Back</span>
                            </div>
                          </div>
                        )}

                        {/* Selfie */}
                        {doc.selfieUrl && (
                          <div className="relative group">
                            <div className="aspect-[3/2] bg-gray-900 rounded-lg overflow-hidden">
                              <img
                                src={doc.selfieUrl}
                                alt="Selfie with document"
                                className={`w-full h-full object-cover transition-all duration-300 ${
                                  isImageVisible(doc.id, 'selfie') ? '' : 'blur-lg'
                                }`}
                              />
                            </div>
                            <button
                              onClick={() => toggleImageVisibility(doc.id, 'selfie')}
                              className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
                            >
                              {isImageVisible(doc.id, 'selfie') ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                            <div className="mt-2 text-center">
                              <span className="text-sm text-gray-400">Selfie</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Document Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {doc.expiryDate && (
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Expiry Date</label>
                            <div className="text-white">{new Date(doc.expiryDate).toLocaleDateString()}</div>
                          </div>
                        )}
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">Uploaded</label>
                          <div className="text-white">{new Date(doc.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Admin Notes</label>
                        <textarea
                          value={notes[doc.id] || doc.notes || ''}
                          onChange={(e) => setNotes(prev => ({ ...prev, [doc.id]: e.target.value }))}
                          placeholder="Add notes about this document..."
                          className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                          rows={3}
                        />
                      </div>

                      {/* Actions */}
                      {doc.status === 'pending' && (
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleStatusUpdate(doc.id, 'verified')}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {loading ? 'Processing...' : 'Verify'}
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(doc.id, 'rejected')}
                            disabled={loading || !notes[doc.id]}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 rounded-lg text-white font-medium transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                            {loading ? 'Processing...' : 'Reject'}
                          </button>
                          {!notes[doc.id] && (
                            <span className="text-sm text-gray-400">Notes required for rejection</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Document Form */}
            <AnimatePresence>
              {showAddForm && (
                <AddDocumentForm
                  partner={partner}
                  onClose={() => setShowAddForm(false)}
                  onSuccess={() => {
                    setShowAddForm(false);
                    onSuccess();
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>

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
        </>
      )}
    </AnimatePresence>
  );
};

export default DocumentVerifyDrawer;
