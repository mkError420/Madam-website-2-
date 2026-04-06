import { motion } from "motion/react";
import { Award, Star, TrendingUp, Globe, Music, Mic2, Users, Heart } from "lucide-react";

const milestones = [
  { year: "2020", title: "The Beginning", description: "Released first independent EP 'Whispers' from a bedroom studio in London." },
  { year: "2021", title: "Viral Sensation", description: "Acoustic cover of 'Midnight' goes viral, leading to a major label signing." },
  { year: "2022", title: "Debut Album", description: "Released 'Echoes', which debuted at #1 on the Alternative Charts." },
  { year: "2023", title: "World Tour", description: "Sold out 45 dates across Europe, North America, and Asia." },
  { year: "2024", title: "Midnight Serenade", description: "Released sophomore album to critical acclaim and two Grammy nominations." },
];

const awards = [
  { category: "Best New Artist", event: "Brit Awards 2023", icon: <Award className="w-6 h-6" /> },
  { category: "Album of the Year", event: "Indie Music Awards 2024", icon: <Star className="w-6 h-6" /> },
  { category: "Best Alternative Act", event: "Global Music Festival", icon: <Music className="w-6 h-6" /> },
  { category: "Songwriter of the Year", event: "Lyricists Guild 2024", icon: <Mic2 className="w-6 h-6" /> },
];

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-500/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-gold-400 font-mono text-xs uppercase tracking-[0.4em] mb-6 block">Beyond the Voice</span>
            <h1 className="text-7xl md:text-9xl font-serif mb-8 leading-tight">Aria <br /><span className="italic text-gold-200">Vance</span></h1>
            <p className="text-zinc-400 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
              A journey of sound, soul, and storytelling. Discover the artist behind the melodies that have captured millions of hearts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Biography */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-gold-500/10">
                <img 
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=2070&auto=format&fit=crop" 
                  alt="Aria Vance in Studio"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 glass-panel p-8 rounded-2xl hidden md:block max-w-xs">
                <p className="text-gold-200 italic font-serif text-lg">"Music is the only language where I don't have to translate my feelings."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif">The <span className="italic text-gold-200">Artistry</span></h2>
              <div className="space-y-6 text-zinc-400 text-lg font-light leading-relaxed">
                <p>
                  Born in the vibrant musical landscape of London, Aria Vance's journey began with a dusty piano and a collection of her father's jazz records. Her early years were spent absorbing the nuances of storytelling through sound, blending the raw emotion of blues with the experimental edges of modern alternative rock.
                </p>
                <p>
                  What sets Aria apart is her commitment to vulnerability. Her songwriting doesn't shy away from the complexities of the human condition—love, loss, and the quiet moments of introspection that define us. This authenticity has resonated globally, turning her from a bedroom producer into a voice for a generation.
                </p>
                <p>
                  Today, Aria continues to push boundaries, collaborating with cinematic composers and electronic pioneers to create a sound that is uniquely hers: ethereal, powerful, and deeply resonant.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-serif text-white">London</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Base</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-serif text-white">12M+</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Listeners</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-zinc-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif mb-4">Career <span className="italic text-gold-200">Milestones</span></h2>
            <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">The journey so far</p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="space-y-16">
              {milestones.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-gold-500 rounded-full -translate-x-1/2 shadow-[0_0_20px_rgba(234,179,8,0.5)] z-10" />
                  
                  <div className="w-full md:w-1/2 pl-8 md:pl-0 md:px-12">
                    <div className={`glass-panel p-8 rounded-3xl border border-white/5 hover:border-gold-500/30 transition-all group ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      <span className="text-3xl font-serif text-gold-400 mb-2 block">{item.year}</span>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-200 transition-colors">{item.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-serif mb-4">Awards & <span className="italic text-gold-200">Recognition</span></h2>
              <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Celebrating the achievements</p>
            </div>
            <div className="flex items-center gap-2 text-gold-400 font-mono text-xs uppercase tracking-widest">
              <Star className="w-4 h-4 fill-current" />
              <span>Industry Excellence</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-panel p-8 rounded-3xl border border-white/5 hover:bg-gold-500/5 transition-all group text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {award.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{award.category}</h3>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{award.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-zinc-900/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto glass-panel p-12 md:p-20 rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/3">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-gold-500/20 p-2">
                  <img 
                    src="https://images.unsplash.com/photo-1525362081669-2b476bb628c3?q=80&w=1974&auto=format&fit=crop" 
                    alt="Aria Vance"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h2 className="text-4xl font-serif mb-8 leading-tight">"I believe music is a sacred space where we can all be <span className="italic text-gold-200">truly honest</span> with ourselves."</h2>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gold-400" />
                    <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Community Focused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-gold-400" />
                    <span className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Emotion Driven</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
