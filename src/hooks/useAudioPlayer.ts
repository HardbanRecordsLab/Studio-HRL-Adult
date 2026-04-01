import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoaded: boolean;
  error: string | null;
}

interface UseAudioPlayerOptions {
  autoPlay?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onLoad?: () => void;
  onError?: (error: string) => void;
}

interface UseAudioPlayerReturn {
  audioState: AudioState;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  load: (src: string) => void;
  unload: () => void;
  getFormattedTime: (time: number) => string;
  getProgressPercentage: () => number;
}

export const useAudioPlayer = (options: UseAudioPlayerOptions = {}): UseAudioPlayerReturn => {
  const {
    autoPlay = false,
    loop = false,
    onPlay,
    onPause,
    onEnded,
    onTimeUpdate,
    onLoad,
    onError
  } = options;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<AudioState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isLoaded: false,
    error: null
  });

  const getFormattedTime = useCallback((time: number): string => {
    if (isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const getProgressPercentage = useCallback((): number => {
    if (audioState.duration === 0) return 0;
    return (audioState.currentTime / audioState.duration) * 100;
  }, [audioState.currentTime, audioState.duration]);

  const play = useCallback(() => {
    if (audioRef.current && !audioState.isPlaying) {
      audioRef.current.play().catch((error) => {
        setAudioState(prev => ({ ...prev, error: error.message }));
        onError?.(error.message);
      });
    }
  }, [audioState.isPlaying, onError]);

  const pause = useCallback(() => {
    if (audioRef.current && audioState.isPlaying) {
      audioRef.current.pause();
    }
  }, [audioState.isPlaying]);

  const togglePlayPause = useCallback(() => {
    if (audioState.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [audioState.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setAudioState(prev => ({ ...prev, currentTime: time }));
    }
  }, []);

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
      setAudioState(prev => ({ ...prev, volume: clampedVolume, isMuted: false }));
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setAudioState(prev => ({ ...prev, isMuted: newMutedState }));
    }
  }, [audioState.isMuted]);

  const load = useCallback((src: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      setupAudioElement();
    }

    setAudioState(prev => ({ ...prev, isLoaded: false, error: null, isPlaying: false }));
    
    audioRef.current.src = src;
    audioRef.current.load();
  }, []);

  const unload = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      setAudioState({
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        volume: 1,
        isMuted: false,
        isLoaded: false,
        error: null
      });
    }
  }, []);

  const setupAudioElement = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = loop;
    audio.preload = 'metadata';

    const handleLoadedData = () => {
      setAudioState(prev => ({
        ...prev,
        isLoaded: true,
        duration: audio.duration,
        error: null
      }));
      onLoad?.();
      
      if (autoPlay) {
        play();
      }
    };

    const handleTimeUpdate = () => {
      setAudioState(prev => ({
        ...prev,
        currentTime: audio.currentTime
      }));
      onTimeUpdate?.(audio.currentTime, audio.duration);
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      onEnded?.();
    };

    const handlePlay = () => {
      setAudioState(prev => ({ ...prev, isPlaying: true, error: null }));
      onPlay?.();
    };

    const handlePause = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false }));
      onPause?.();
    };

    const handleError = () => {
      const errorMessage = audio.error?.message || 'Audio loading error';
      setAudioState(prev => ({
        ...prev,
        error: errorMessage,
        isPlaying: false,
        isLoaded: false
      }));
      onError?.(errorMessage);
    };

    const handleVolumeChange = () => {
      setAudioState(prev => ({
        ...prev,
        volume: audio.volume,
        isMuted: audio.muted
      }));
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('volumechange', handleVolumeChange);

    return () => {
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('volumechange', handleVolumeChange);
    };
  }, [loop, autoPlay, play, onLoad, onTimeUpdate, onEnded, onPlay, onPause, onError]);

  useEffect(() => {
    const cleanup = setupAudioElement();
    
    return () => {
      cleanup();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [setupAudioElement]);

  return {
    audioState,
    play,
    pause,
    togglePlayPause,
    seek,
    setVolume,
    toggleMute,
    load,
    unload,
    getFormattedTime,
    getProgressPercentage
  };
};

// Audio analysis utilities
export const analyzeAudioFile = async (file: File): Promise<{
  duration: number;
  sampleRate: number;
  channels: number;
  bitrate?: number;
}> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    
    audio.addEventListener('loadedmetadata', () => {
      resolve({
        duration: audio.duration,
        sampleRate: 0, // Cannot get sample rate from HTML5 audio element
        channels: 0, // Cannot get channel count from HTML5 audio element
        bitrate: undefined // Cannot get bitrate from HTML5 audio element
      });
    });
    
    audio.addEventListener('error', () => {
      reject(new Error('Failed to load audio file'));
    });
    
    audio.src = URL.createObjectURL(file);
  });
};

export const generateWaveformData = async (audioFile: File, samples: number = 100): Promise<number[]> => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const channelData = audioBuffer.getChannelData(0);
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
    
    return filteredData;
  } catch (error) {
    console.error('Error generating waveform data:', error);
    // Return random data as fallback
    return Array.from({ length: samples }, () => Math.random() * 0.8 + 0.1);
  }
};

export const formatAudioDuration = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const formatAudioFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

export const getAudioQuality = (file: File): string => {
  // This is a simplified estimation based on file size and duration
  // In a real implementation, you'd want to analyze the actual audio data
  const sizeInMB = file.size / (1024 * 1024);
  const estimatedBitrate = (sizeInMB * 8) / 60; // Rough estimate in Mbps
  
  if (estimatedBitrate >= 0.32) return '320 kbps';
  if (estimatedBitrate >= 0.256) return '256 kbps';
  if (estimatedBitrate >= 0.192) return '192 kbps';
  if (estimatedBitrate >= 0.128) return '128 kbps';
  return 'Unknown';
};

export default useAudioPlayer;
