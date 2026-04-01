import React, { useState } from 'react';
import { cn } from '@/utils/utils';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  duration?: string;
  size?: number;
  uploadDate?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  onItemSelect?: (item: MediaItem) => void;
  onItemDelete?: (id: string) => void;
  className?: string;
  showActions?: boolean;
  gridCols?: number;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  items,
  onItemSelect,
  onItemDelete,
  className,
  showActions = true,
  gridCols = 3
}) => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleItemClick = (item: MediaItem) => {
    setSelectedItem(item);
    onItemSelect?.(item);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    onItemDelete?.(id);
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }[gridCols] || 'grid-cols-3';

  return (
    <div className={cn('w-full', className)}>
      {/* Gallery Grid */}
      <div className={cn('grid gap-4', gridColsClass)}>
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden bg-dark2 border border-gold/20 hover:border-gold/40 transition-all duration-300"
            onClick={() => handleItemClick(item)}
          >
            {/* Media Content */}
            <div className="aspect-square relative">
              {item.type === 'image' ? (
                <img
                  src={item.thumbnail || item.url}
                  alt={item.title || 'Image'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={item.thumbnail || ''}
                    alt={item.title || 'Video thumbnail'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gold/80 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-dark" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {item.duration}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Overlay with actions */}
            {showActions && (
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleItemClick(item);
                    }}
                    className="p-2 bg-gold text-dark rounded-full hover:bg-yellow-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, item.id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Info Badge */}
            <div className="absolute top-2 left-2">
              <span className={cn(
                'px-2 py-1 text-xs font-montserrat rounded',
                item.type === 'image' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
              )}>
                {item.type === 'image' ? 'Zdjęcie' : 'Wideo'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl max-h-full bg-dark2 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Media Content */}
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1">
                {selectedItem.type === 'image' ? (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title || 'Image'}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                ) : (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="w-full h-auto max-h-[70vh]"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                )}
              </div>

              {/* Info Panel */}
              <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gold/20">
                <h3 className="text-xl font-bebas text-gold mb-4">
                  {selectedItem.title || `${selectedItem.type === 'image' ? 'Zdjęcie' : 'Wideo'} #${selectedItem.id}`}
                </h3>
                
                {selectedItem.description && (
                  <p className="text-dim mb-4">{selectedItem.description}</p>
                )}

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dim2">Typ:</span>
                    <span className="text-text">
                      {selectedItem.type === 'image' ? 'Zdjęcie' : 'Wideo'}
                    </span>
                  </div>
                  
                  {selectedItem.size && (
                    <div className="flex justify-between">
                      <span className="text-dim2">Rozmiar:</span>
                      <span className="text-text">{formatFileSize(selectedItem.size)}</span>
                    </div>
                  )}
                  
                  {selectedItem.duration && (
                    <div className="flex justify-between">
                      <span className="text-dim2">Czas trwania:</span>
                      <span className="text-text">{selectedItem.duration}</span>
                    </div>
                  )}
                  
                  {selectedItem.uploadDate && (
                    <div className="flex justify-between">
                      <span className="text-dim2">Data dodania:</span>
                      <span className="text-text">{formatDate(selectedItem.uploadDate)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {showActions && (
                  <div className="mt-6 space-y-2">
                    <button
                      onClick={() => onItemDelete?.(selectedItem.id)}
                      className="w-full px-4 py-2 bg-red-600 text-white font-montserrat rounded-sm hover:bg-red-700 transition-colors"
                    >
                      Usuń
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = selectedItem.url;
                        link.download = selectedItem.title || `media-${selectedItem.id}`;
                        link.click();
                      }}
                      className="w-full px-4 py-2 border border-gold text-gold font-montserrat rounded-sm hover:bg-gold hover:text-dark transition-colors"
                    >
                      Pobierz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-dim text-lg font-montserrat mb-2">
            Brak mediów
          </p>
          <p className="text-dim2 text-sm">
            Dodaj pierwsze zdjęcie lub wideo, aby rozpocząć
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaGallery;
