import { motion } from "motion/react";
import { MapPin, Ticket, ExternalLink } from "lucide-react";
import { TourDate } from "../types";

const tourDates: TourDate[] = [
  { id: "1", date: "MAY 12, 2024", venue: "The O2 Arena", location: "London, UK", status: "Tickets" },
  { id: "2", date: "MAY 15, 2024", venue: "Accor Arena", location: "Paris, FR", status: "Sold Out" },
  { id: "3", date: "MAY 18, 2024", venue: "Ziggo Dome", location: "Amsterdam, NL", status: "Tickets" },
  { id: "4", date: "MAY 22, 2024", venue: "Mercedes-Benz Arena", location: "Berlin, DE", status: "Tickets" },
  { id: "5", date: "JUN 05, 2024", venue: "Madison Square Garden", location: "New York, US", status: "Coming Soon" },
];

export default function TourDates() {
  return (
    <section id="tour" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif mb-4">The Echoes Tour</h2>
          <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">World Tour 2024-2025</p>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">
          {tourDates.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row items-center justify-between p-8 glass-panel rounded-2xl hover:bg-white/10 transition-all border-l-4 border-l-transparent hover:border-l-gold-500"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-center md:text-left">
                <div className="flex flex-col">
                  <span className="text-gold-400 font-mono text-lg font-bold">{tour.date.split(',')[0]}</span>
                  <span className="text-zinc-500 text-xs font-mono">{tour.date.split(',')[1]}</span>
                </div>
                
                <div>
                  <h3 className="text-xl font-serif text-white group-hover:text-gold-200 transition-colors">{tour.venue}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 text-sm mt-1">
                    <MapPin className="w-3 h-3" />
                    {tour.location}
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-0">
                <button 
                  disabled={tour.status === 'Sold Out'}
                  className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
                    tour.status === 'Tickets' 
                      ? 'bg-gold-500 text-gold-950 hover:bg-gold-400' 
                      : tour.status === 'Sold Out'
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                >
                  {tour.status === 'Tickets' && <Ticket className="w-4 h-4" />}
                  {tour.status}
                  {tour.status === 'Tickets' && <ExternalLink className="w-3 h-3 ml-1 opacity-50" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm italic">More dates to be announced soon. Stay tuned.</p>
        </div>
      </div>
    </section>
  );
}
