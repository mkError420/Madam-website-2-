import { motion } from "motion/react";
import { Link } from "react-router-dom";

const images = [
  "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253361-bee8718a74a2?q=80&w=1964&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
];

export default function Gallery({ showViewMore = false }: { showViewMore?: boolean }) {
  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl font-serif mb-4">Visuals</h2>
            <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Moments from the stage</p>
          </div>
          {showViewMore && (
            <Link to="/gallery" className="text-gold-400 hover:text-gold-200 font-mono text-sm uppercase tracking-widest border-b border-gold-500/30 pb-1 transition-all">
              View All Photos
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
