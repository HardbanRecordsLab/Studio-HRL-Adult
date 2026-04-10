'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Upload, FileText, Calendar } from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';

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

interface AddDocumentFormProps {
  partner: Partner;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDocumentForm: React.FC<AddDocumentFormProps> = ({
  partner,
  onClose,
  onSuccess
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'id_card',
    frontUrl: '',
    backUrl: '',
    selfieUrl: '',
    expiryDate: '',
    notes: ''
  });

  const documentTypes = [
    { value: 'id_card', label: 'Dowód osobisty' },
    { value: 'passport', label: 'Paszport' },
    { value: 'driving_license', label: 'Prawo jazdy' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: partner.id,
          ...formData,
          expiryDate: formData.expiryDate ? new Date(formData.expiryDate).toISOString() : null
        })
      });

      if (response.ok) {
        onSuccess();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to add document');
      }
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Failed to add document');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-60 flex items-center justify-center p-4"
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
            <h2 className="text-2xl font-bold text-white">Add Document for {partner.name}</h2>
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
              {/* Document Type */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Document Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                >
                  {documentTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Front Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Front Side *</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  options={{ resourceType: 'image' }}
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, frontUrl: (result.info as any).secure_url }));
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
                        {formData.frontUrl ? 'Change Front' : 'Upload Front'}
                      </button>
                      {formData.frontUrl && (
                        <div className="relative">
                          <img
                            src={formData.frontUrl}
                            alt="Document front"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, frontUrl: '' }))}
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

              {/* Back Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Back Side (Optional)</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  options={{ resourceType: 'image' }}
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, backUrl: (result.info as any).secure_url }));
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
                        {formData.backUrl ? 'Change Back' : 'Upload Back'}
                      </button>
                      {formData.backUrl && (
                        <div className="relative">
                          <img
                            src={formData.backUrl}
                            alt="Document back"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, backUrl: '' }))}
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

              {/* Selfie Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Selfie with Document (Optional)</label>
                <CldUploadWidget
                  uploadPreset="hrl-studio"
                  options={{ resourceType: 'image' }}
                  onSuccess={(result) => {
                    if (result.info) {
                      setFormData(prev => ({ ...prev, selfieUrl: (result.info as any).secure_url }));
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
                        {formData.selfieUrl ? 'Change Selfie' : 'Upload Selfie'}
                      </button>
                      {formData.selfieUrl && (
                        <div className="relative">
                          <img
                            src={formData.selfieUrl}
                            alt="Selfie with document"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, selfieUrl: '' }))}
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

              {/* Expiry Date */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add notes about this document..."
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-rose-500 text-white"
                  rows={3}
                />
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
                disabled={loading || !formData.frontUrl}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 disabled:from-gray-600 disabled:to-gray-700 rounded-lg text-white font-medium transition-all"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Saving...' : 'Add Document'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddDocumentForm;
