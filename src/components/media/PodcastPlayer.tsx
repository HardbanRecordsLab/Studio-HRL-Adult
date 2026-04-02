import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/utils';
import AudioPlayer from './AudioPlayer';

interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  publishDate: string;
  cover?: string;
  category?: string;
  tags?: string[];
}

interface PodcastPlayerProps {
  episodes: PodcastEpisode[];
  currentEpisodeId?: string;
  onEpisodeSelect?: (episode: PodcastEpisode) => void;
  className?: string;
  showPlaylist?: boolean;
  autoPlay?: boolean;
}

const PodcastPlayer: React.FC<PodcastPlayerProps> = ({
  episodes,
  currentEpisodeId,
  onEpisodeSelect,
  className,
  showPlaylist = true,
  autoPlay = false
}) => {
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode | null>(
    episodes.find(ep => ep.id === currentEpisodeId) || episodes[0] || null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (currentEpisodeId && episodes.length > 0) {
      const episode = episodes.find(ep => ep.id === currentEpisodeId);
      if (episode) {
        setCurrentEpisode(episode);
      }
    }
  }, [currentEpisodeId, episodes]);

  const handleEpisodeSelect = (episode: PodcastEpisode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
    onEpisodeSelect?.(episode);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Auto-play next episode
    const currentIndex = episodes.findIndex(ep => ep.id === currentEpisode?.id);
    if (currentIndex < episodes.length - 1) {
      handleEpisodeSelect(episodes[currentIndex + 1]);
    }
  };

  const handleTimeUpdate = (currentTime: number, duration: number) => {
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (currentEpisode && audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <div className={cn('bg-dark border border-gold/20 rounded-lg overflow-hidden', className)}>
      {currentEpisode ? (
        <>
          {/* Current Episode Info */}
          <div className="p-6 border-b border-gold/20">
            <div className="flex items-start space-x-4">
              {currentEpisode.cover ? (
                <img
                  src={currentEpisode.cover}
                  alt={currentEpisode.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gold/20 rounded-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
              )}
              
              <div className="flex-1">
                <h2 className="text-2xl font-bebas text-gold mb-2">
                  {currentEpisode.title}
                </h2>
                
                <div className="flex items-center space-x-4 text-sm text-dim mb-3">
                  <span>{formatDate(currentEpisode.publishDate)}</span>
                  <span>•</span>
                  <span>{formatDuration(currentEpisode.duration)}</span>
                  {currentEpisode.category && (
                    <>
                      <span>•</span>
                      <span className="text-gold">{currentEpisode.category}</span>
                    </>
                  )}
                </div>

                {currentEpisode.description && (
                  <p className="text-dim text-sm mb-3 line-clamp-3">
                    {currentEpisode.description}
                  </p>
                )}

                {currentEpisode.tags && currentEpisode.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentEpisode.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gold/20 text-gold text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Audio Player */}
          <div className="p-6">
            <AudioPlayer
              src={currentEpisode.audioUrl}
              title={currentEpisode.title}
              cover={currentEpisode.cover}
              autoPlay={autoPlay}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onTimeUpdate={handleTimeUpdate}
            />
            
            {/* Additional Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-dim">Speed:</span>
                <div className="flex space-x-1">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={cn(
                        'px-2 py-1 text-xs rounded transition-colors',
                        playbackSpeed === speed
                          ? 'bg-gold text-dark'
                          : 'bg-dark3 text-dim hover:bg-gold/20'
                      )}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="px-3 py-1 text-sm border border-gold/50 text-gold rounded hover:bg-gold hover:text-dark transition-colors"
                >
                  {showTranscript ? 'Hide' : 'Show'} Transcript
                </button>
              </div>
            </div>
          </div>

          {/* Transcript Section */}
          {showTranscript && (
            <div className="p-6 border-t border-gold/20">
              <h3 className="text-lg font-bebas text-gold mb-4">Transcript</h3>
              <div className="bg-dark2 rounded-lg p-4 max-h-64 overflow-y-auto">
                <p className="text-dim text-sm leading-relaxed">
                  Transcript for "{currentEpisode.title}" would be displayed here.
                  This could include timestamps, speaker labels, and full text content.
                </p>
              </div>
            </div>
          )}

          {/* Playlist */}
          {showPlaylist && episodes.length > 1 && (
            <div className="border-t border-gold/20">
              <div className="p-4">
                <h3 className="text-lg font-bebas text-gold mb-4">Playlist</h3>
                <div className="space-y-2">
                  {episodes.map((episode, index) => (
                    <div
                      key={episode.id}
                      onClick={() => handleEpisodeSelect(episode)}
                      className={cn(
                        'flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors',
                        currentEpisode?.id === episode.id
                          ? 'bg-gold/20 border border-gold/50'
                          : 'hover:bg-dark3'
                      )}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-xs text-gold font-montserrat">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gold font-montserrat font-medium truncate">
                          {episode.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-xs text-dim">
                          <span>{formatDate(episode.publishDate)}</span>
                          <span>•</span>
                          <span>{formatDuration(episode.duration)}</span>
                        </div>
                      </div>

                      {currentEpisode?.id === episode.id && isPlaying && (
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <p className="text-dim text-lg font-montserrat mb-2">
            No episodes available
          </p>
          <p className="text-dim2 text-sm">
            Add podcast episodes to start listening
          </p>
        </div>
      )}
    </div>
  );
};

export default PodcastPlayer;
