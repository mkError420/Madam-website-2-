import { motion } from "motion/react";
import { Play, Pause, ShoppingBag, Music2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, collection, query, orderBy, onSnapshot, OperationType, handleFirestoreError } from "../lib/firebase";
import { useMusic } from "../context/MusicContext";
import { Track } from "../types";

export default function LatestRelease() {
  const { playTrack, currentTrack, isPlaying, setQueue } = useMusic();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tracks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTracks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Track[];
      setTracks(fetchedTracks.slice(0, 4)); // Show top 4 for the featured album section
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tracks');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const featuredTrack = tracks[0];

  if (loading) {
    return (
      <section className="py-24 bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
      </section>
    );
  }

  if (tracks.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:ml-0 group">
              <img 
                src={featuredTrack?.cover || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop"} 
                alt="Album Cover"
                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gold-500/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <button 
                  onClick={() => {
                    if (featuredTrack) {
                      setQueue(tracks);
                      playTrack(featuredTrack);
                    }
                  }}
                  className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 scale-90 group-hover:scale-100 transition-transform"
                >
                  {isPlaying && currentTrack?.id === featuredTrack?.id ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl hidden md:block">
                <div className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">Available Now</div>
                <div className="text-xl font-serif">{featuredTrack?.album || "New Release"}</div>
              </div>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 font-mono tracking-widest uppercase text-xs mb-4 block">Featured Album</span>
              <h2 className="text-6xl font-serif mb-6 leading-tight">{featuredTrack?.album || "Latest"} <br /><span className="italic text-gold-200">Collection</span></h2>
              <p className="text-zinc-400 text-lg mb-10 font-light leading-relaxed">
                Experience the latest sounds from Aria Vance. A journey through the neon-lit streets of the soul, featuring the hit single "{featuredTrack?.title}".
              </p>

              <div className="space-y-4 mb-12">
                {tracks.map((track, i) => (
                  <div 
                    key={track.id} 
                    onClick={() => {
                      setQueue(tracks);
                      playTrack(track);
                    }}
                    className="flex items-center justify-between py-3 border-b border-white/5 group cursor-pointer hover:border-gold-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-mono text-xs ${currentTrack?.id === track.id ? 'text-gold-400' : 'text-zinc-600'}`}>0{i+1}</span>
                      <span className={`transition-colors ${currentTrack?.id === track.id ? 'text-gold-200' : 'text-zinc-200 group-hover:text-gold-200'}`}>{track.title}</span>
                    </div>
                    {isPlaying && currentTrack?.id === track.id ? (
                      <Pause className="w-4 h-4 text-gold-400 fill-current" />
                    ) : (
                      <Play className={`w-4 h-4 ${currentTrack?.id === track.id ? 'text-gold-400 opacity-100' : 'text-zinc-600 group-hover:text-gold-400 opacity-0 group-hover:opacity-100'} transition-all`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/music" className="px-8 py-4 bg-gold-500 text-gold-950 font-bold rounded-full flex items-center gap-2 hover:bg-gold-400 transition-all">
                  <Play className="w-4 h-4 fill-current" />
                  Listen more
                </Link>
                <button 
                  onClick={() => {
                    if (featuredTrack) {
                      setQueue(tracks);
                      playTrack(featuredTrack);
                    }
                  }}
                  className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full font-bold flex items-center gap-2 transition-all"
                >
                  <Music2 className="w-4 h-4" />
                  {isPlaying && currentTrack?.id === featuredTrack?.id ? 'Playing Now' : 'Stream Now'}
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
