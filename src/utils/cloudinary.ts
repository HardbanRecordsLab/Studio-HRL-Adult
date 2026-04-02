/**
 * Cloudinary Utility for Studio HRL Adult
 * Provides helpers for generating optimized image and video URLs.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfn5qgvpy';

export const getCloudinaryUrl = (path: string, options: { width?: number; height?: number; quality?: string; format?: string } = {}) => {
  if (path.startsWith('http')) return path;
  
  const { width, height, quality = 'auto', format = 'auto' } = options;
  
  let transformations = `f_${format},q_${quality}`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${path}`;
};

export const getCloudinaryVideoUrl = (path: string, options: { width?: number; quality?: string } = {}) => {
  if (path.startsWith('http')) return path;
  
  const { width, quality = 'auto' } = options;
  
  let transformations = `q_${quality}`;
  if (width) transformations += `,w_${width}`;
  
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformations}/${path}`;
};
