import React, { useState } from 'react';
import { Upload, X, Check, Loader2 } from 'lucide-react';

interface AdminImageUploadProps {
  onUpload: (url: string) => void;
  currentValue?: string;
  label?: string;
}

const AdminImageUpload: React.FC<AdminImageUploadProps> = ({ onUpload, currentValue, label }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentValue || '');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setPreview(data.url);
        onUpload(data.url);
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</label>}
      <div className="relative group">
        {preview ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button 
                type="button"
                onClick={() => { setPreview(''); onUpload(''); }}
                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-2 right-2 p-1 bg-green-500 rounded-full shadow-lg">
               <Check className="w-3 h-3 text-white" />
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center aspect-video rounded-xl border-2 border-dashed border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#c9a84c]/40 transition-all cursor-pointer">
            {isUploading ? (
              <Loader2 className="w-8 h-8 text-[#c9a84c] animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-600 mb-2" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Wybierz plik lub upuść</span>
              </>
            )}
            <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={isUploading} />
          </label>
        )}
      </div>
    </div>
  );
};

export default AdminImageUpload;
