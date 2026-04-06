import { motion } from "motion/react";
import { Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto glass-panel p-12 md:p-20 rounded-[40px] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-serif mb-6">Join the <span className="italic text-gold-200">Inner Circle</span></h2>
            <p className="text-zinc-400 text-lg mb-12 max-w-xl mx-auto">
              Subscribe to get early access to tour tickets, exclusive merchandise, and behind-the-scenes content.
            </p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-grow bg-white/5 border border-white/10 rounded-full px-8 py-4 focus:outline-none focus:border-gold-500/50 transition-all text-center md:text-left"
              />
              <button className="px-10 py-4 bg-gold-500 text-gold-950 font-bold rounded-full hover:bg-gold-400 transition-all flex items-center justify-center gap-2">
                Subscribe
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              No spam. Just music. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
