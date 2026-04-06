import React, { createContext, useContext, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Track } from '../types';

const Player = ReactPlayer as any;

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  progress: number;
  duration: number;
  seek: (time: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  error: string | null;
  queue: Track[];
  addToQueue: (track: Track) => void;
  removeFromQueue: (id: string) => void;
  playNext: () => void;
  playPrevious: () => void;
  clearQueue: () => void;
  setQueue: (tracks: Track[]) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [error, setError] = useState<string | null>(null);
  const [queue, setQueueState] = useState<Track[]>([]);
  
  const playerRef = useRef<any>(null);

  const playTrack = (track: Track) => {
    setError(null);
    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    setIsPlaying(!isPlaying);
  };

  const seek = (time: number) => {
    playerRef.current?.seekTo(time);
    setProgress(time);
  };

  const addToQueue = (track: Track) => {
    if (!queue.find(t => t.id === track.id)) {
      setQueueState([...queue, track]);
    }
  };

  const removeFromQueue = (id: string) => {
    setQueueState(queue.filter(t => t.id !== id));
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playTrack(queue[nextIndex]);
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    playTrack(queue[prevIndex]);
  };

  const clearQueue = () => setQueueState([]);
  const setQueue = (tracks: Track[]) => setQueueState(tracks);

  return (
    <MusicContext.Provider value={{ 
      currentTrack, 
      isPlaying, 
      playTrack, 
      togglePlay, 
      progress, 
      duration, 
      seek,
      volume,
      setVolume,
      error,
      queue,
      addToQueue,
      removeFromQueue,
      playNext,
      playPrevious,
      clearQueue,
      setQueue
    }}>
      {children}
      {currentTrack?.audioUrl && (
        <div className="fixed bottom-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0 invisible">
          <Player
            ref={playerRef}
            url={currentTrack.audioUrl}
            playing={isPlaying}
            volume={volume}
            onProgress={(state: any) => setProgress(state.playedSeconds)}
            onDuration={(d: number) => setDuration(d)}
            onEnded={playNext}
            onError={(e: any) => {
              console.error("Playback error:", e);
              setError("Failed to load audio source. Please check the URL.");
              setIsPlaying(false);
            }}
            width="0"
            height="0"
            config={{
              file: {
                forceAudio: true,
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
