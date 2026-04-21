import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/utils';

interface AudioUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number; // in MB
  accept?: string;
  className?: string;
  preview?: boolean;
  showWaveform?: boolean;
}

const AudioUpload: React.FC<AudioUploadProps> = ({
  onUpload,
  maxSize = 25, // 25MB default for audio
  accept = 'audio/*',
  className,
  preview = true,
  showWaveform = true
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<string>('0:00');
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith('audio/')) {
      alert('Proszę wybrać plik audio');
      return;
    }

    // Validate file size
    const sizeInMB = selectedFile.size / (1024 * 1024);
    if (sizeInMB > maxSize) {
      alert(`Maksymalny rozmiar pliku to ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    
    if (preview) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      const url = URL.createObjectURL(selectedFile);
      objectUrlRef.current = url;
      setAudioUrl(url);
      
      // Generate waveform visualization
      if (showWaveform) {
        generateWaveform(selectedFile);
      }
    }

    // No mocked progress: hand off file immediately
    onUpload(selectedFile);
  };

  const generateWaveform = async (audioFile: File) => {
    let audioContext: AudioContext | null = null;
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const channelData = audioBuffer.getChannelData(0);
      const samples = 100; // Number of samples for visualization
      const blockSize = Math.floor(channelData.length / samples);
      const filteredData = [];
      
      for (let i = 0; i < samples; i++) {
        const blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(channelData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }
      
      setWaveformData(filteredData);
      drawWaveform(filteredData);
    } catch (error) {
      console.error('Error generating waveform:', error);
      setWaveformData([]);
    } finally {
      try {
        await audioContext?.close();
      } catch {
        // ignore close errors (Safari can throw if already closed)
      }
    }
  };

  const drawWaveform = (data: number[]) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#C9A84C';
    ctx.strokeStyle = '#C9A84C';
    ctx.lineWidth = 2;

    const barWidth = width / data.length;
    const centerY = height / 2;

    data.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = centerY - barHeight / 2;

      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  };

  const removeFile = () => {
    setFile(null);
    setAudioUrl('');
    setWaveformData([]);
    setDuration('0:00');
    setIsPlaying(false);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    
    if (!isNaN(total)) {
      const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      };
      
      setDuration(formatTime(total));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatBitrate = (file: File): string => {
    // This is a simplified version - in production you'd want to actually get audio bitrate
    const estimatedBitrate = 128; // Default estimate
    return `${estimatedBitrate} kbps`;
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
          dragActive ? 'border-gold bg-gold/10' : 'border-gold/50 hover:border-gold',
          file && 'border-crimson/50'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        
        {file ? (
          <div className="space-y-4">
            {preview && audioUrl && (
              <div className="space-y-4">
                {/* Waveform Visualization */}
                {showWaveform && waveformData.length > 0 && (
                  <div className="relative">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={100}
                      className="w-full h-24 bg-dark2 rounded-lg"
                    />
                  </div>
                )}

                {/* Audio Player */}
                <div className="bg-dark2 rounded-lg p-4">
                  <audio
                    ref={audioRef}
                    src={audioUrl}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleTimeUpdate}
                    className="w-full"
                  />
                  
                  {/* Custom Controls */}
                  <div className="flex items-center space-x-4 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="p-2 bg-gold text-dark rounded-full hover:bg-yellow-400 transition-colors"
                    >
                      {isPlaying ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="text-sm text-gold font-montserrat">
                        {file.name}
                      </div>
                      <div className="text-xs text-dim">
                        {duration} • {formatBitrate(file)}
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* File Info */}
            <div className="space-y-2">
              <p className="text-gold font-montserrat font-semibold">
                {file.name}
              </p>
              <div className="text-sm text-dim">
                <p>Rozmiar: {formatFileSize(file.size)}</p>
                <p>Format: {file.type}</p>
                <p>Czas trwania: {duration}</p>
                <p>Jakość: {formatBitrate(file)}</p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}
              className="text-gold hover:text-yellow-400 font-montserrat"
            >
              Wybierz inny plik audio
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <p className="text-gold font-montserrat font-semibold">
                Przeciągnij i upuść plik audio tutaj
              </p>
              <p className="text-dim text-sm mt-1">
                lub kliknij aby wybrać plik
              </p>
            </div>
            <div className="text-xs text-dim2">
              <p>Formaty: MP3, WAV, AAC, OGG, M4A</p>
              <p>Maksymalny rozmiar: {maxSize}MB</p>
              <p>Jakość: Do 320 kbps</p>
              <p>Czas trwania: Bez limitu</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUpload;
