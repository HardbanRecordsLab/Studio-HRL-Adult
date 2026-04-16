import React, { useState, useRef } from 'react';
import { cn } from '@/utils/utils';

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
  preview?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, maxFiles = 1, accept = 'image/*', className, preview = true }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFiles(e.target.files);
  };

  const handleFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter((file) => file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024);
    if (validFiles.length > 0) {
      const newFiles = maxFiles === 1 ? [validFiles[0]] : validFiles.slice(0, maxFiles);
      previews.forEach((previewUrl) => URL.revokeObjectURL(previewUrl));
      setFiles(newFiles);
      if (preview) {
        setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
      }
      onUpload(newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setFiles(newFiles);
    setPreviews(newPreviews);
    if (previews[index]) URL.revokeObjectURL(previews[index]);
    onUpload(newFiles);
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn('relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer', dragActive ? 'border-gold bg-gold/10' : 'border-gold/50 hover:border-gold', files.length > 0 && 'border-crimson/50')}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" multiple={maxFiles > 1} accept={accept} onChange={handleChange} className="hidden" />
        {previews.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {previews.map((previewUrl, index) => (
                <div key={index} className="relative group">
                  <img src={previewUrl} alt={`Preview ${index + 1}`} className="h-48 w-full rounded-lg object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); removeFile(index); }} className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <div className="absolute bottom-2 left-2 rounded bg-black/50 px-2 py-1 text-xs text-white">{files[index]?.name}</div>
                </div>
              ))}
            </div>
            {files.length < maxFiles && <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="font-montserrat text-gold hover:text-yellow-400">+ Dodaj więcej zdjęć</button>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20"><svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg></div>
            <div>
              <p className="font-montserrat font-semibold text-gold">Przeciągnij i upuść zdjęcia tutaj</p>
              <p className="mt-1 text-sm text-dim">lub kliknij, aby wybrać pliki</p>
            </div>
            <div className="text-xs text-dim2"><p>Formaty: JPG, PNG, GIF, WebP</p><p>Maksymalny rozmiar: 10MB</p><p>Maksymalna liczba plików: {maxFiles}</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
