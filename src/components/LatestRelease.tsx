import { motion } from "motion/react";
import { Play, ShoppingBag, Music2 } from "lucide-react";

export default function LatestRelease() {
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
            <div className="relative aspect-square max-w-md mx-auto lg:ml-0">
              <img 
                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop" 
                alt="Album Cover"
                className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gold-500/20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl hidden md:block">
                <div className="text-xs font-mono text-gold-400 uppercase tracking-widest mb-1">Available Now</div>
                <div className="text-xl font-serif">Vinyl Edition</div>
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
              <h2 className="text-6xl font-serif mb-6 leading-tight">Midnight <br /><span className="italic text-gold-200">Serenade</span></h2>
              <p className="text-zinc-400 text-lg mb-10 font-light leading-relaxed">
                The critically acclaimed sophomore album. A journey through the neon-lit streets of the soul, featuring the hit singles "Echoes" and "Velvet Skies".
              </p>

              <div className="space-y-4 mb-12">
                {["Echoes in the Dark", "Midnight Serenade", "Velvet Skies", "Neon Heartbeat"].map((track, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 group cursor-pointer hover:border-gold-500/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-zinc-600 font-mono text-xs">0{i+1}</span>
                      <span className="text-zinc-200 group-hover:text-gold-200 transition-colors">{track}</span>
                    </div>
                    <Play className="w-4 h-4 text-zinc-600 group-hover:text-gold-400 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gold-500 text-gold-950 font-bold rounded-full flex items-center gap-2 hover:bg-gold-400 transition-all">
                  <ShoppingBag className="w-4 h-4" />
                  Buy Vinyl
                </button>
                <button className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-full font-bold flex items-center gap-2 transition-all">
                  <Music2 className="w-4 h-4" />
                  Stream Now
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
