import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-900/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          <div className="w-full lg:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5]"
            >
              <img 
                src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1974&auto=format&fit=crop" 
                alt="Aria Vance Portrait"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t-2 border-l-2 border-gold-500/30 rounded-tl-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b-2 border-r-2 border-gold-500/30 rounded-br-3xl" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -left-20 w-64 h-64 border border-dashed border-white/10 rounded-full"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold-400 font-mono tracking-widest uppercase text-xs mb-4 block">The Story</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">Voice of a <br /><span className="italic text-gold-200">Generation</span></h2>
              
              <div className="space-y-6 text-zinc-400 leading-relaxed text-lg font-light">
                <p>
                  Born in the heart of London and raised on a diet of jazz legends and alternative rock, Aria Vance has carved a unique path in the contemporary music landscape. Her voice, often described as "liquid gold," carries the weight of old-soul wisdom with a modern, electric edge.
                </p>
                <p>
                  Since her debut single "Echoes" took the charts by storm in 2022, Aria has been on a relentless journey of self-discovery and musical innovation. Her music transcends genres, blending haunting cinematic arrangements with raw, vulnerable songwriting.
                </p>
                <p>
                  "I don't just want people to hear my music," Aria says. "I want them to feel the vibration of the stories I'm telling. Every song is a piece of a larger mosaic of human experience."
                </p>
              </div>

              <div className="mt-12 flex items-center gap-12">
                <div>
                  <div className="text-3xl font-serif text-white">12M+</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Monthly Listeners</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-white">4</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Global Tours</div>
                </div>
                <div>
                  <div className="text-3xl font-serif text-white">2</div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Grammy Noms</div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
