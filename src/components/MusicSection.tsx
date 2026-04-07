import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, ListMusic } from "lucide-react";
import { useState, useEffect } from "react";
import { Track } from "../types";
import { Link } from "react-router-dom";
import { db, collection, query, orderBy, onSnapshot, OperationType, handleFirestoreError } from "../lib/firebase";
import { useMusic } from "../context/MusicContext";

export default function MusicSection({ showViewMore = false }: { showViewMore?: boolean }) {
  const { playTrack, currentTrack, isPlaying, togglePlay, playNext, playPrevious, progress, duration, seek, setQueue } = useMusic();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tracks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTracks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Track[];
      setTracks(fetchedTracks.slice(0, 5)); // Show top 5 for featured
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tracks');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const activeTrack = currentTrack || tracks[0];

  if (loading) {
    return (
      <section className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse text-zinc-500 font-mono uppercase tracking-widest">Loading Featured Music...</div>
        </div>
      </section>
    );
  }

  if (tracks.length === 0) return null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music" className="py-24 bg-zinc-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Player Visualizer Area */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-gold-500/10 group"
            >
              <img 
                src={activeTrack?.cover} 
                alt={activeTrack?.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => {
                    if (activeTrack) {
                      setQueue(tracks);
                      playTrack(activeTrack);
                    }
                  }}
                  className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 scale-90 group-hover:scale-100 transition-transform"
                >
                  {isPlaying && currentTrack?.id === activeTrack?.id ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
              </div>
            </motion.div>
            
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-serif mb-2">{activeTrack?.title}</h3>
              <p className="text-gold-400 font-mono text-sm uppercase tracking-widest">Aria Vance • {activeTrack?.album || 'The New Era'}</p>
            </div>

            {/* Simple Player Controls */}
            <div className="mt-10 glass-panel p-6 rounded-2xl max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <button onClick={playPrevious} className="text-zinc-400 hover:text-white"><SkipBack className="w-6 h-6" /></button>
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <button onClick={playNext} className="text-zinc-400 hover:text-white"><SkipForward className="w-6 h-6" /></button>
              </div>
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
                <div 
                  className="absolute inset-0 z-10"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    seek(percent * (duration || 180));
                  }}
                />
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gold-500"
                  style={{ width: `${(progress / (duration || 180)) * 100}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration || 180)}</span>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <ListMusic className="text-gold-400 w-6 h-6" />
                <h2 className="text-4xl font-serif">Featured</h2>
              </div>
              <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest border border-gold-500/30 px-3 py-1 rounded-full">Now Playing</span>
            </div>
            
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setQueue(tracks);
                    playTrack(track);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
                    currentTrack?.id === track.id ? 'bg-gold-500/10 border border-gold-500/20' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs ${currentTrack?.id === track.id ? 'text-gold-400' : 'text-zinc-500'}`}>0{index + 1}</span>
                    <div className="text-left">
                      <div className={`font-medium ${currentTrack?.id === track.id ? 'text-gold-200' : 'text-zinc-200'}`}>{track.title}</div>
                      <div className="text-xs text-zinc-500">{track.album} • {track.year}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
                    {isPlaying && currentTrack?.id === track.id ? (
                      <Pause className="w-4 h-4 text-gold-400 fill-current" />
                    ) : (
                      <Play className={`w-4 h-4 ${currentTrack?.id === track.id ? 'text-gold-400 opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showViewMore && (
              <Link to="/music" className="mt-12 w-full py-4 border border-gold-500/30 text-gold-400 rounded-xl hover:bg-gold-500 hover:text-gold-950 transition-all font-bold flex items-center justify-center">
                View more
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
