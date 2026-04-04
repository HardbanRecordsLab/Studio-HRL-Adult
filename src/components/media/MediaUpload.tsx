import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, Film, Music, Loader2 } from 'lucide-react';

interface MediaUploadProps {
  onUploadComplete?: (url: string, publicId: string) => void;
  onUploadError?: (error: string) => void;
  folder?: string;
  maxSizeMB?: number;
  acceptedTypes?: string;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  url?: string;
  publicId?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  onUploadError,
  folder = 'studio-hrl-adult',
  maxSizeMB = 50,
  acceptedTypes = 'image/*,video/*,audio/*',
}) => {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const uploadToCloudinary = async (fileData: UploadingFile) => {
    try {
      const base64 = await convertToBase64(fileData.file);

      const resourceType = fileData.file.type.startsWith('video/')
        ? 'video'
        : fileData.file.type.startsWith('audio/')
          ? 'video'
          : 'image';

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          file: base64,
          folder,
          resourceType,
        }),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id
            ? { ...f, status: 'completed', progress: 100, url: data.url, publicId: data.publicId }
            : f
        )
      );

      onUploadComplete?.(data.url, data.publicId);
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileData.id ? { ...f, status: 'error', progress: 0 } : f
        )
      );

      onUploadError?.(error instanceof Error ? error.message : 'Upload failed');
    }
  };

  const handleFiles = useCallback(
    (newFiles: FileList | null) => {
      if (!newFiles) return;

      const validFiles: UploadingFile[] = [];

      Array.from(newFiles).forEach((file) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
          onUploadError?.(`Plik ${file.name} przekracza ${maxSizeMB}MB`);
          return;
        }

        validFiles.push({
          id: Math.random().toString(36).substring(7),
          file,
          progress: 0,
          status: 'uploading',
        });
      });

      setFiles((prev) => [...prev, ...validFiles]);

      validFiles.forEach((fileData) => {
        uploadToCloudinary(fileData);
      });
    },
    [maxSizeMB, onUploadComplete, onUploadError, folder]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Film className="w-5 h-5" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5" />;
    return <Upload className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-gold bg-gold/5' : 'border-gold/30 hover:border-gold/50'}
        `}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="media-upload"
        />
        <label htmlFor="media-upload" className="cursor-pointer">
          <Upload className="w-10 h-10 mx-auto mb-4 text-gold/60" />
          <p className="text-dim mb-2">Przeciągnij i upuść pliki lub kliknij, aby wybrać</p>
          <p className="text-xs text-dim/60">Max {maxSizeMB}MB | Obraz, Video, Audio</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((fileData) => (
            <div
              key={fileData.id}
              className="flex items-center gap-3 p-3 bg-dark-2 border border-gold/10 rounded"
            >
              <div className="text-gold">{getFileIcon(fileData.file.type)}</div>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-text truncate">{fileData.file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  {fileData.status === 'uploading' && (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-gold" />
                      <span className="text-xs text-dim">Uploadowanie...</span>
                    </>
                  )}
                  {fileData.status === 'completed' && (
                    <span className="text-xs text-green-400">✓ Zakończono</span>
                  )}
                  {fileData.status === 'error' && (
                    <span className="text-xs text-crimson">✗ Błąd</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeFile(fileData.id)}
                className="p-1 text-dim hover:text-crimson transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
