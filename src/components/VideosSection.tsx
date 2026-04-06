import { motion } from "motion/react";
import { Play, ExternalLink } from "lucide-react";

const videos = [
  {
    id: "1",
    title: "Echoes in the Dark (Official Music Video)",
    thumbnail: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
    duration: "4:20",
    views: "1.2M views",
  },
  {
    id: "2",
    title: "Midnight Serenade (Live at The O2)",
    thumbnail: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
    duration: "5:15",
    views: "850K views",
  },
  {
    id: "3",
    title: "Velvet Skies (Acoustic Session)",
    thumbnail: "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?q=80&w=1964&auto=format&fit=crop",
    duration: "3:45",
    views: "420K views",
  },
];

export default function VideosSection() {
  return (
    <section id="videos" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-serif mb-4">Videos</h2>
            <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Music videos & live performances</p>
          </div>
          <button className="text-gold-400 hover:text-gold-200 font-mono text-sm uppercase tracking-widest border-b border-gold-500/30 pb-1 transition-all">
            Visit YouTube Channel
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-white">
                  {video.duration}
                </div>
              </div>
              <h3 className="text-xl font-serif mb-2 group-hover:text-gold-400 transition-colors">{video.title}</h3>
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono uppercase tracking-wider">
                <span>{video.views}</span>
                <span className="flex items-center gap-1">Watch Now <ExternalLink className="w-3 h-3" /></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
