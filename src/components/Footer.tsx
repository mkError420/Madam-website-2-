import { motion } from "motion/react";
import { Instagram, Twitter, Youtube, Music2, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="pt-24 pb-12 bg-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          
          <div>
            <h2 className="text-5xl font-serif mb-8">Get in <span className="italic text-gold-200">Touch</span></h2>
            <p className="text-zinc-500 text-lg mb-12 max-w-md">
              For booking inquiries, press kits, or just to say hello, reach out to our management team.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-gold-500 group-hover:text-gold-950 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Management</div>
                  <div className="text-lg font-medium">mgmt@ariavance.com</div>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center group-hover:bg-gold-500 group-hover:text-gold-950 transition-all">
                  <Music2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Press</div>
                  <div className="text-lg font-medium">press@ariavance.com</div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center gap-6">
              {[Instagram, Twitter, Youtube, Music2].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-gold-500/50 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel p-10 rounded-3xl">
            <h3 className="text-2xl font-serif mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Subject</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all appearance-none">
                  <option className="bg-zinc-950">Booking Inquiry</option>
                  <option className="bg-zinc-950">Press Request</option>
                  <option className="bg-zinc-950">General Message</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all resize-none" placeholder="Your message here..."></textarea>
              </div>
              <button className="w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-xl hover:bg-gold-400 transition-all flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-white/5">
          <div className="text-2xl font-serif font-bold tracking-widest text-gold-400">ARIA</div>
          <div className="text-zinc-600 text-xs font-mono">
            © 2024 ARIA VANCE. ALL RIGHTS RESERVED. DESIGNED BY AIS.
          </div>
          <div className="flex items-center gap-8 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
