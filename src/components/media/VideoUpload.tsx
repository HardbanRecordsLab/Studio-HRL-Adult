import React, { useState, useRef } from 'react';
import { cn } from '@/utils/utils';

interface VideoUploadProps {
  onUpload: (file: File | null) => void;
  maxSize?: number;
  accept?: string;
  className?: string;
  preview?: boolean;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, maxSize = 50, accept = 'video/*', className, preview = true }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('video/')) {
      alert('Proszę wybrać plik wideo');
      return;
    }
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      alert(`Maksymalny rozmiar pliku to ${maxSize}MB`);
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    if (preview) setPreviewUrl(URL.createObjectURL(selectedFile));
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onUpload(selectedFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl('');
    setUploadProgress(0);
    setIsUploading(false);
    onUpload(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn('relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer', dragActive ? 'border-gold bg-gold/10' : 'border-gold/50 hover:border-gold', file && 'border-crimson/50')}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input ref={fileInputRef} type="file" accept={accept} onChange={handleChange} className="hidden" />
        {file ? (
          <div className="space-y-4">
            {preview && previewUrl && <div className="relative"><video src={previewUrl} controls className="mx-auto w-full max-w-md rounded-lg" />{!isUploading && <button onClick={(e) => { e.stopPropagation(); removeFile(); }} className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>}</div>}
            <div className="space-y-2"><p className="font-montserrat font-semibold text-gold">{file.name}</p><div className="text-sm text-dim"><p>Rozmiar: {formatFileSize(file.size)}</p><p>Czas trwania: 0:30</p><p>Format: {file.type}</p></div></div>
            {isUploading && <div className="space-y-2"><div className="h-2 w-full rounded-full bg-dark3"><div className="h-2 rounded-full bg-gold transition-all duration-300" style={{ width: `${uploadProgress}%` }} /></div><p className="text-sm text-gold">Przesyłanie... {uploadProgress}%</p></div>}
            {!isUploading && <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="font-montserrat text-gold hover:text-yellow-400">Wybierz inny film</button>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20"><svg className="h-6 w-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>
            <div><p className="font-montserrat font-semibold text-gold">Przeciągnij i upuść film tutaj</p><p className="mt-1 text-sm text-dim">lub kliknij, aby wybrać plik</p></div>
            <div className="text-xs text-dim2"><p>Formaty: MP4, WebM, MOV, AVI</p><p>Maksymalny rozmiar: {maxSize}MB</p><p>Maksymalny czas: 30 sekund</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
