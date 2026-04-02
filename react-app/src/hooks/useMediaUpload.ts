import { useState, useCallback } from 'react';
import { api } from '@/utils/api';

interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

interface MediaUploadHook {
  uploadFile: (file: File, onProgress?: (progress: UploadProgress) => void) => Promise<string>;
  uploadMultipleFiles: (files: File[], onProgress?: (progress: UploadProgress) => void) => Promise<string[]>;
  isUploading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useMediaUpload = (): MediaUploadHook => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadFile = useCallback(async (
    file: File,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }

      // Check file size (50MB limit)
      const maxSize = 50 * 1024 * 1024; // 50MB
      if (file.size > maxSize) {
        throw new Error('File size exceeds 50MB limit');
      }

      // Check file type
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-msvideo'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type');
      }

      // Upload file
      const response = await api.uploadFile('/api/upload', file, (progress) => {
        const uploadProgress: UploadProgress = {
          loaded: progress,
          total: file.size,
          percentage: Math.round((progress / file.size) * 100)
        };
        onProgress?.(uploadProgress);
      });

      if (!response.success) {
        throw new Error(response.error || 'Upload failed');
      }

      return response.data?.url || '';
    } catch (err: any) {
      const errorMessage = err.message || 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }, []);

  const uploadMultipleFiles = useCallback(async (
    files: File[],
    onProgress?: (progress: UploadProgress) => void
  ): Promise<string[]> => {
    const uploadPromises = files.map((file, index) => 
      uploadFile(file, (progress) => {
        const adjustedProgress = {
          ...progress,
          percentage: Math.round((progress.percentage + (index * 100)) / files.length)
        };
        onProgress?.(adjustedProgress);
      })
    );

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (err) {
      throw err;
    }
  }, [uploadFile]);

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    error,
    clearError
  };
};

// Media validation utilities
export const validateImageFile = (file: File): string | null => {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG, GIF, and WebP images are allowed';
  }

  // Check file size (10MB for images)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'Image size must be less than 10MB';
  }

  // Check image dimensions (if needed)
  return null;
};

export const validateVideoFile = (file: File): string | null => {
  // Check file type
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only MP4, WebM, MOV, and AVI videos are allowed';
  }

  // Check file size (50MB for videos)
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    return 'Video size must be less than 50MB';
  }

  // Check video duration (would need video element to check actual duration)
  return null;
};

export const getMediaInfo = (file: File): {
  type: 'image' | 'video';
  size: string;
  formattedSize: string;
  extension: string;
} => {
  const isImage = file.type.startsWith('image/');
  const sizeInBytes = file.size;
  const formattedSize = formatFileSize(sizeInBytes);
  const extension = file.name.split('.').pop()?.toLowerCase() || '';

  return {
    type: isImage ? 'image' : 'video',
    size: sizeInBytes.toString(),
    formattedSize,
    extension
  };
};

const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export default useMediaUpload;
