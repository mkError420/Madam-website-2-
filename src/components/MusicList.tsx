import { motion } from "motion/react";
import { Play, Download, Share2, Heart, Clock, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const allTracks = [
  { id: "1", title: "Echoes in the Dark", album: "Midnight Serenade", duration: "3:45", year: "2024", cover: "https://picsum.photos/seed/music1/400/400" },
  { id: "2", title: "Midnight Serenade", album: "Midnight Serenade", duration: "4:12", year: "2024", cover: "https://picsum.photos/seed/music2/400/400" },
  { id: "3", title: "Velvet Skies", album: "Midnight Serenade", duration: "3:28", year: "2024", cover: "https://picsum.photos/seed/music3/400/400" },
  { id: "4", title: "Neon Heartbeat", album: "Midnight Serenade", duration: "3:56", year: "2024", cover: "https://picsum.photos/seed/music4/400/400" },
  { id: "5", title: "Shadow Waltz", album: "Midnight Serenade", duration: "4:05", year: "2024", cover: "https://picsum.photos/seed/music5/400/400" },
  { id: "6", title: "Electric Dreams", album: "The New Era", duration: "3:30", year: "2023", cover: "https://picsum.photos/seed/music6/400/400" },
  { id: "7", title: "Urban Solitude", album: "The New Era", duration: "4:20", year: "2023", cover: "https://picsum.photos/seed/music7/400/400" },
  { id: "8", title: "Golden Hour", album: "The New Era", duration: "3:15", year: "2023", cover: "https://picsum.photos/seed/music8/400/400" },
  { id: "9", title: "Stardust", album: "Singles", duration: "3:50", year: "2022", cover: "https://picsum.photos/seed/music9/400/400" },
  { id: "10", title: "Moonlight", album: "Singles", duration: "4:10", year: "2022", cover: "https://picsum.photos/seed/music10/400/400" },
];

export default function MusicList() {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-serif">Full <span className="italic text-gold-200">Discography</span></h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">All</button>
            <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">Albums</button>
            <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">Singles</button>
          </div>
        </div>

        <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-8 px-8 py-4 border-b border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
            <div className="w-8">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Release</div>
            <div className="flex justify-end pr-4"><Clock className="w-3 h-3" /></div>
          </div>

          {/* Track List */}
          <div className="divide-y divide-white/5">
            {allTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 md:gap-8 px-6 md:px-8 py-4 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                {/* ID / Play Icon */}
                <div className="w-8 flex justify-center">
                  {hoveredTrack === track.id ? (
                    <Play className="w-4 h-4 text-gold-400 fill-current" />
                  ) : (
                    <span className="text-xs font-mono text-zinc-600">0{index + 1}</span>
                  )}
                </div>

                {/* Title & Cover */}
                <div className="flex items-center gap-4 min-w-0">
                  <img 
                    src={track.cover} 
                    alt={track.title} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <div className="text-sm md:text-base font-medium text-zinc-200 truncate group-hover:text-gold-200 transition-colors">{track.title}</div>
                    <div className="text-xs text-zinc-500 md:hidden">{track.album}</div>
                  </div>
                </div>

                {/* Album (Desktop) */}
                <div className="hidden md:block text-sm text-zinc-500 truncate">
                  {track.album}
                </div>

                {/* Year (Desktop) */}
                <div className="hidden md:block text-sm text-zinc-500 font-mono">
                  {track.year}
                </div>

                {/* Duration & Actions */}
                <div className="flex items-center gap-4 md:gap-8 justify-end">
                  <div className="hidden sm:flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Heart className="w-4 h-4" /></button>
                    <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Download className="w-4 h-4" /></button>
                    <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 w-10 text-right">{track.duration}</span>
                  <button className="text-zinc-600 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-10 py-4 border border-white/10 rounded-full text-sm font-mono uppercase tracking-widest hover:bg-white/5 transition-all text-zinc-400 hover:text-white">
            Load More Tracks
          </button>
        </div>
      </div>
    </section>
  );
}
