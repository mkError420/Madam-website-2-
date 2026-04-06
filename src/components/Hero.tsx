import { motion } from "motion/react";
import { Play, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" 
          alt="Singer on stage"
          className="w-full h-full object-cover opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold-400 font-mono tracking-[0.3em] uppercase text-sm mb-4 block">New Single Out Now</span>
          <h1 className="text-7xl md:text-9xl font-serif font-black mb-8 tracking-tighter leading-none">
            ARIA <br />
            <span className="text-gradient">VANCE</span>
          </h1>
          <p className="max-w-xl mx-auto text-zinc-400 text-lg mb-10 font-light leading-relaxed">
            Experience the soul-stirring melodies and powerful vocals of the decade's most breakout alternative pop artist.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/videos" className="group relative px-8 py-4 bg-gold-500 text-gold-950 font-bold rounded-full overflow-hidden transition-all hover:pr-12">
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Listen to "Echoes"
              </span>
              <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all w-4 h-4" />
            </Link>
            <Link to="/music" className="px-8 py-4 border border-white/20 hover:bg-white/5 rounded-full font-bold transition-all">
              View more
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-px h-12 bg-white" />
      </motion.div>
    </section>
  );
}
