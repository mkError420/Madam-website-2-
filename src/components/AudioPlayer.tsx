import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic, Maximize2, Minimize2, X, Heart, Share2, Repeat, Shuffle } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { useState, useEffect } from 'react';

export default function AudioPlayer() {
  const { 
    currentTrack, isPlaying, togglePlay, progress, duration, seek, 
    volume, setVolume, queue, playNext, playPrevious, removeFromQueue, error
  } = useMusic();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
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
        className={`fixed bottom-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isExpanded ? "h-screen bg-zinc-950" : "px-4 pb-4 pointer-events-none"
        }`}
      >
        {isExpanded ? (
          /* Expanded Immersive View */
          <div className="h-full flex flex-col relative overflow-hidden">
            {/* Background Blur */}
            <div className="absolute inset-0 z-0">
              <img 
                src={currentTrack.cover} 
                alt="" 
                className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950 to-zinc-950" />
            </div>

            {/* Header */}
            <div className="relative z-10 p-8 flex justify-between items-center">
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
              >
                <Minimize2 className="w-6 h-6" />
              </button>
              <div className="text-center">
                <p className="text-[10px] font-mono text-gold-400 uppercase tracking-[0.3em] mb-1">Now Playing</p>
                <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">{currentTrack.album}</h3>
              </div>
              <button 
                onClick={() => setShowQueue(!showQueue)}
                className={`p-3 rounded-full border transition-all ${
                  showQueue ? "bg-gold-500 border-gold-500 text-gold-950" : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <ListMusic className="w-6 h-6" />
              </button>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 px-8 max-w-7xl mx-auto w-full">
              {/* Cover Art */}
              <motion.div 
                layoutId="player-cover"
                className="relative w-full max-w-[300px] lg:max-w-[450px] aspect-square rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(234,179,8,0.15)]"
              >
                <img 
                  src={currentTrack.cover} 
                  alt={currentTrack.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Controls Section */}
              <div className="flex-1 w-full max-w-xl space-y-12">
                <div className="text-center lg:text-left">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentTrack.id}
                    className="text-5xl lg:text-7xl font-serif mb-4 leading-tight"
                  >
                    {currentTrack.title}
                  </motion.h2>
                  <p className="text-xl lg:text-2xl text-zinc-400 font-light italic">Aria Vance</p>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-400 font-mono text-xs uppercase tracking-widest mt-4 animate-pulse"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* Progress */}
                <div className="space-y-4">
                  <div className="w-full h-1.5 bg-white/10 rounded-full relative group cursor-pointer">
                    <div 
                      className="absolute inset-0 z-10"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        seek(percent * (duration || 180));
                      }}
                    />
                    <motion.div 
                      className="h-full bg-gold-500 relative rounded-full"
                      style={{ width: `${(progress / (duration || 180)) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform" />
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    <span>{formatTime(progress)}</span>
                    <span>{formatTime(duration || 180)}</span>
                  </div>
                </div>

                {/* Main Controls */}
                <div className="flex items-center justify-center lg:justify-between gap-8">
                  <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Shuffle className="w-6 h-6" /></button>
                  <div className="flex items-center gap-8">
                    <button onClick={playPrevious} className="text-white hover:text-gold-400 transition-colors"><SkipBack className="w-8 h-8 fill-current" /></button>
                    <button 
                      onClick={togglePlay}
                      className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 hover:scale-110 transition-transform shadow-[0_0_50px_rgba(234,179,8,0.3)]"
                    >
                      {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
                    </button>
                    <button onClick={playNext} className="text-white hover:text-gold-400 transition-colors"><SkipForward className="w-8 h-8 fill-current" /></button>
                  </div>
                  <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Repeat className="w-6 h-6" /></button>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-center gap-12 pt-8">
                  <button className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                    <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Favorite</span>
                  </button>
                  <button className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                    <Share2 className="w-6 h-6" />
                    <span className="font-mono text-[10px] uppercase tracking-widest">Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Queue Sidebar (Expanded) */}
            <AnimatePresence>
              {showQueue && (
                <motion.div
                  initial={{ x: 400 }}
                  animate={{ x: 0 }}
                  exit={{ x: 400 }}
                  className="absolute top-0 right-0 bottom-0 w-full lg:w-[450px] z-20 bg-zinc-950/90 backdrop-blur-2xl border-l border-white/5 p-8"
                >
                  <div className="flex items-center justify-between mb-12">
                    <h3 className="text-3xl font-serif">Queue</h3>
                    <button onClick={() => setShowQueue(false)} className="p-2 text-zinc-500 hover:text-white">
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-4">
                    {queue.map((track, idx) => (
                      <div 
                        key={`${track.id}-${idx}`}
                        className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          currentTrack.id === track.id ? "bg-gold-500/10 border border-gold-500/20" : "hover:bg-white/5"
                        }`}
                      >
                        <img src={track.cover} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium truncate ${currentTrack.id === track.id ? "text-gold-400" : "text-white"}`}>
                            {track.title}
                          </h4>
                          <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest truncate">{track.album}</p>
                        </div>
                        <button 
                          onClick={() => removeFromQueue(track.id)}
                          className="p-2 text-zinc-600 hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Compact Bar View */
          <div className="container mx-auto max-w-7xl pointer-events-auto">
            <div className="glass-panel rounded-3xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl p-4 md:p-6 shadow-2xl shadow-black/50 group">
              <div className="flex flex-col md:flex-row items-center gap-6">
                
                {/* Track Info */}
                <div className="flex items-center gap-4 w-full md:w-1/4">
                  <div className="relative group/cover">
                    <motion.img 
                      layoutId="player-cover"
                      src={currentTrack.cover} 
                      alt={currentTrack.title} 
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={() => setIsExpanded(true)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
                    >
                      <Maximize2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm md:text-base font-serif text-zinc-200 truncate">{currentTrack.title}</h4>
                    <p className="text-[10px] md:text-xs font-mono text-gold-400 uppercase tracking-widest truncate">{currentTrack.album}</p>
                    {error && (
                      <p className="text-[10px] text-red-500 font-mono mt-0.5 animate-pulse truncate">{error}</p>
                    )}
                  </div>
                </div>

                {/* Controls & Progress */}
                <div className="flex-1 w-full flex flex-col items-center gap-2">
                  <div className="flex items-center gap-6">
                    <button onClick={playPrevious} className="text-zinc-500 hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
                    <button 
                      onClick={togglePlay}
                      className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 hover:scale-110 transition-transform shadow-lg shadow-gold-500/20"
                    >
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </button>
                    <button onClick={playNext} className="text-zinc-500 hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
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
                  <button 
                    onClick={() => setIsExpanded(true)}
                    className="text-zinc-500 hover:text-white transition-colors"
                  >
                    <ListMusic className="w-5 h-5" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
