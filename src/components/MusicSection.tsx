import { motion } from "motion/react";
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from "lucide-react";
import { useState } from "react";
import { Track } from "../types";

const tracks: Track[] = [
  { id: "1", title: "Echoes in the Dark", duration: "3:45", url: "#", cover: "https://picsum.photos/seed/music1/400/400" },
  { id: "2", title: "Midnight Serenade", duration: "4:12", url: "#", cover: "https://picsum.photos/seed/music2/400/400" },
  { id: "3", title: "Velvet Skies", duration: "3:28", url: "#", cover: "https://picsum.photos/seed/music3/400/400" },
  { id: "4", title: "Neon Heartbeat", duration: "3:56", url: "#", cover: "https://picsum.photos/seed/music4/400/400" },
];

export default function MusicSection() {
  const [activeTrack, setActiveTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);

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
                src={activeTrack.cover} 
                alt={activeTrack.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-gold-950 scale-90 group-hover:scale-100 transition-transform"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </button>
              </div>
            </motion.div>
            
            <div className="mt-8 text-center">
              <h3 className="text-3xl font-serif mb-2">{activeTrack.title}</h3>
              <p className="text-gold-400 font-mono text-sm uppercase tracking-widest">Aria Vance • The New Era</p>
            </div>

            {/* Simple Player Controls */}
            <div className="mt-10 glass-panel p-6 rounded-2xl max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <button className="text-zinc-400 hover:text-white"><SkipBack className="w-6 h-6" /></button>
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                </button>
                <button className="text-zinc-400 hover:text-white"><SkipForward className="w-6 h-6" /></button>
              </div>
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gold-500"
                  animate={{ width: isPlaying ? "60%" : "30%" }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-500">
                <span>1:24</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>
          </div>

          {/* Tracklist */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center gap-3 mb-10">
              <ListMusic className="text-gold-400 w-6 h-6" />
              <h2 className="text-4xl font-serif">Discography</h2>
            </div>
            
            <div className="space-y-2">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setActiveTrack(track);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all group ${
                    activeTrack.id === track.id ? 'bg-gold-500/10 border border-gold-500/20' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-xs ${activeTrack.id === track.id ? 'text-gold-400' : 'text-zinc-500'}`}>0{track.id}</span>
                    <div className="text-left">
                      <div className={`font-medium ${activeTrack.id === track.id ? 'text-gold-200' : 'text-zinc-200'}`}>{track.title}</div>
                      <div className="text-xs text-zinc-500">Single • 2024</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
                    <Play className={`w-4 h-4 ${activeTrack.id === track.id ? 'text-gold-400 opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-opacity`} />
                  </div>
                </button>
              ))}
            </div>

            <button className="mt-12 w-full py-4 border border-gold-500/30 text-gold-400 rounded-xl hover:bg-gold-500 hover:text-gold-950 transition-all font-bold">
              Listen on Spotify
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
