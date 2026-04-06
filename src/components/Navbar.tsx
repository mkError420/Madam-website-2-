import { motion } from "motion/react";
import { Music, Calendar, Image as ImageIcon, User, Mail, Play } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { name: "Music", icon: <Music className="w-4 h-4" />, href: "/music" },
    { name: "Videos", icon: <Play className="w-4 h-4" />, href: "/videos" },
    { name: "Tour", icon: <Calendar className="w-4 h-4" />, href: "/tour" },
    { name: "Gallery", icon: <ImageIcon className="w-4 h-4" />, href: "/gallery" },
    { name: "About", icon: <User className="w-4 h-4" />, href: "/about" },
    { name: "Contact", icon: <Mail className="w-4 h-4" />, href: "/contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6"
    >
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-8">
        <Link to="/" className="text-xl font-serif font-bold tracking-widest text-gold-400">ARIA</Link>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              to={item.href}
              className="text-sm font-medium text-zinc-400 hover:text-gold-200 transition-colors flex items-center gap-2"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        <button className="bg-gold-500 hover:bg-gold-400 text-gold-950 px-5 py-1.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 flex items-center gap-2">
          <Play className="w-3 h-3 fill-current" />
          Latest Single
        </button>
      </div>
    </motion.nav>
  );
}
