import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/utils';

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  cover?: string;
  className?: string;
  showWaveform?: boolean;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  artist,
  cover,
  className,
  showWaveform = true,
  autoPlay = false,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformClickRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(audio.duration);
      if (showWaveform) {
        generateWaveform();
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      onTimeUpdate?.(audio.currentTime, audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [src, showWaveform, onPlay, onPause, onEnded, onTimeUpdate]);

  useEffect(() => {
    if (autoPlay && audioRef.current && !isLoading) {
      audioRef.current.play();
    }
  }, [autoPlay, isLoading]);

  const generateWaveform = async () => {
    if (!audioRef.current) return;
    
    let audioContext: AudioContext | null = null;
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
      const channelData = audioBuffer.getChannelData(0);
      const samples = 200; // Number of samples for visualization
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
        // ignore close errors
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
    
    const barWidth = width / data.length;
    const centerY = height / 2;

    data.forEach((value, index) => {
      const barHeight = value * height * 0.8;
      const x = index * barWidth;
      const y = centerY - barHeight / 2;

      ctx.fillRect(x, y, barWidth - 1, barHeight);
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('bg-dark2 border border-gold/20 rounded-lg p-6', className)}>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Cover Art and Info */}
      <div className="flex items-center space-x-4 mb-6">
        {cover ? (
          <img
            src={cover}
            alt={title || 'Audio cover'}
            className="w-16 h-16 rounded-lg object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-gold font-bebas text-lg">
            {title || 'Untitled Audio'}
          </h3>
          {artist && (
            <p className="text-dim text-sm font-montserrat">
              {artist}
            </p>
          )}
        </div>
      </div>

      {/* Waveform Visualization */}
      {showWaveform && waveformData.length > 0 && (
        <div className="relative mb-6">
          <canvas
            ref={canvasRef}
            width={400}
            height={80}
            className="w-full h-20 bg-dark rounded-lg"
          />
          {/* Progress overlay */}
          <div
            className="absolute top-0 left-0 h-full bg-gold/30 pointer-events-none transition-all duration-100"
            style={{ width: `${progressPercentage}%` }}
          />
          {/* Clickable progress bar */}
          <div
            ref={waveformClickRef}
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            onClick={handleProgressClick}
          />
        </div>
      )}

      {/* Controls */}
      <div className="space-y-4">
        {/* Main Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlayPause}
            disabled={isLoading}
            className="p-3 bg-gold text-dark rounded-full hover:bg-yellow-400 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>

          {/* Time Display */}
          <div className="flex-1 text-sm text-dim font-montserrat">
            <span>{formatTime(currentTime)}</span>
            <span className="mx-2">/</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-dim hover:text-gold transition-colors"
            >
              {isMuted || volume === 0 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : volume < 0.5 ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-dark rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${isMuted ? 0 : volume * 100}%, #374151 ${isMuted ? 0 : volume * 100}%, #374151 100%)`
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div
            ref={progressBarRef}
            className="w-full h-2 bg-dark rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-gold rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
