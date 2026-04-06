import VideosSection from "../components/VideosSection";
import { motion } from "motion/react";

export default function VideosPage() {
  return (
    <div className="pt-24 min-h-screen bg-zinc-950">
      {/* Videos Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-gold-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Visual Journey</span>
            <h1 className="text-7xl md:text-8xl font-serif mb-8 leading-tight">Videos <br /><span className="italic text-gold-200">& Performances</span></h1>
            <p className="text-zinc-400 text-xl font-light leading-relaxed max-w-2xl">
              Experience the visual world of Aria Vance. From high-concept music videos to intimate live sessions and world tour highlights.
            </p>
          </motion.div>
        </div>
      </section>

      <VideosSection showViewMore={false} />
    </div>
  );
}
