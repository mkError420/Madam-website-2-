import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Maximize2, Minimize2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useState } from 'react';

export default function AudioPlayer() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek, volume, setVolume } = useMusic();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);

  if (!currentTrack) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pointer-events-none"
      >
        <div className="container mx-auto max-w-7xl pointer-events-auto">
          <div className="glass-panel rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-4 md:p-6 shadow-2xl shadow-black/50">
            <div className="flex flex-col md:flex-row items-center gap-6">
              
              {/* Track Info */}
              <div className="flex items-center gap-4 w-full md:w-1/4">
                <motion.img 
                  layoutId="player-cover"
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-sm md:text-base font-serif text-zinc-200 truncate">{currentTrack.title}</h4>
                  <p className="text-[10px] md:text-xs font-mono text-gold-400 uppercase tracking-widest truncate">{currentTrack.album}</p>
                </div>
              </div>

              {/* Controls & Progress */}
              <div className="flex-1 w-full flex flex-col items-center gap-2">
                <div className="flex items-center gap-6">
                  <button className="text-zinc-500 hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
                  <button 
                    onClick={togglePlay}
                    className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 hover:scale-110 transition-transform shadow-lg shadow-gold-500/20"
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                  </button>
                  <button className="text-zinc-500 hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
                </div>

                <div className="w-full flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-500 w-10 text-right">{formatTime(progress)}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        seek(percent * (duration || 180));
                      }}
                    />
                    <motion.div 
                      className="h-full bg-gold-500 relative"
                      style={{ width: `${(progress / (duration || 180)) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                    </motion.div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 w-10">{formatTime(duration || 180)}</span>
                </div>
              </div>

              {/* Volume & Extra */}
              <div className="hidden md:flex items-center justify-end gap-6 w-1/4">
                <div className="flex items-center gap-3 w-32">
                  <button onClick={handleVolumeToggle} className="text-zinc-500 hover:text-white transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (parseFloat(e.target.value) > 0) setIsMuted(false);
                    }}
                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-500"
                  />
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors"><ListMusic className="w-5 h-5" /></button>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
