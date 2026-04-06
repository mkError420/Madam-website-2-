import { motion } from "motion/react";

const quotes = [
  { text: "Aria Vance is the most exciting voice in alternative pop right now.", source: "Rolling Stone" },
  { text: "Hauntingly beautiful and technically flawless.", source: "Pitchfork" },
  { text: "A masterclass in cinematic songwriting.", source: "The Guardian" },
];

export default function PressQuotes() {
  return (
    <section className="py-24 bg-zinc-900/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {quotes.map((quote, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-gold-500 text-4xl font-serif mb-6">"</div>
              <p className="text-xl font-serif italic text-zinc-300 mb-6 leading-relaxed">
                {quote.text}
              </p>
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
                — {quote.source}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
