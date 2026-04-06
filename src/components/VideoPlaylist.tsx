import { motion, AnimatePresence } from "motion/react";
import { Play, ListMusic, Clock, Eye, Share2, Heart, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { db, collection, onSnapshot, query, orderBy, OperationType, handleFirestoreError } from "../lib/firebase";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  description: string;
}

const fallbackPlaylist: Video[] = [
  {
    id: "1",
    title: "Echoes in the Dark (Official Music Video)",
    thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    duration: "4:20",
    views: "1.2M",
    category: "Music Video",
    description: "The official music video for 'Echoes in the Dark', the lead single from the sophomore album 'Midnight Serenade'. Directed by Julian Thorne.",
  },
  {
    id: "2",
    title: "Midnight Serenade (Live at The O2)",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
    duration: "5:15",
    views: "850K",
    category: "Live Performance",
    description: "A breathtaking live performance of the title track from the 'Midnight Serenade' world tour, captured at London's iconic O2 Arena.",
  },
];

export default function VideoPlaylist() {
  const [playlist, setPlaylist] = useState<Video[]>(fallbackPlaylist);
  const [activeVideo, setActiveVideo] = useState<Video>(fallbackPlaylist[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedVideos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      if (fetchedVideos.length > 0) {
        setPlaylist(fetchedVideos);
        setActiveVideo(fetchedVideos[0]);
      }
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'videos');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Player Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                {/* Video Player Placeholder */}
                <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-2xl shadow-gold-500/10">
                  <img 
                    src={activeVideo.thumbnail} 
                    alt={activeVideo.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 transform hover:scale-110 transition-transform shadow-[0_0_50px_rgba(234,179,8,0.3)]">
                      <Play className="w-10 h-10 fill-current ml-2" />
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="glass-panel px-4 py-2 rounded-full text-[10px] font-mono text-gold-400 uppercase tracking-widest border border-gold-500/20">
                      {activeVideo.category}
                    </div>
                    <div className="bg-black/80 px-3 py-1.5 rounded-lg text-xs font-mono text-white">
                      {activeVideo.duration}
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <h2 className="text-4xl font-serif mb-4 leading-tight">{activeVideo.title}</h2>
                    <div className="flex flex-wrap items-center gap-6 text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {activeVideo.views} views</span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Released recently</span>
                    </div>
                    <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-3xl">
                      {activeVideo.description}
                    </p>
                  </div>
                  
                  <div className="flex md:flex-col gap-4">
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                      <Heart className="w-5 h-5" />
                      <span className="font-mono text-xs uppercase tracking-widest">Like</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
                      <Share2 className="w-5 h-5" />
                      <span className="font-mono text-xs uppercase tracking-widest">Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar Playlist */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="glass-panel rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-full max-h-[800px]">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ListMusic className="w-5 h-5 text-gold-400" />
                  <h3 className="font-serif text-2xl">Playlist</h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{playlist.length} Videos</span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-4">
                {loading ? (
                  <div className="p-8 text-center text-zinc-500 font-mono text-[10px] uppercase tracking-widest">Loading playlist...</div>
                ) : playlist.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`w-full flex gap-4 p-3 rounded-2xl transition-all group text-left ${
                      activeVideo.id === video.id 
                        ? "bg-gold-500/10 border border-gold-500/20" 
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="relative w-32 aspect-video rounded-xl overflow-hidden shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {activeVideo.id === video.id && (
                        <div className="absolute inset-0 bg-gold-500/40 flex items-center justify-center">
                          <Play className="w-6 h-6 text-gold-950 fill-current" />
                        </div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono text-white">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className={`text-sm font-medium leading-snug mb-1 line-clamp-2 transition-colors ${
                        activeVideo.id === video.id ? "text-gold-200" : "text-zinc-200 group-hover:text-gold-400"
                      }`}>
                        {video.title}
                      </h4>
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                        {video.views} views
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 bg-zinc-900/30">
                <button className="w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-400 transition-all transform hover:scale-[1.02]">
                  <ExternalLink className="w-4 h-4" />
                  View on YouTube
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
