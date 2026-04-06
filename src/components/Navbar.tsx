import { motion, AnimatePresence } from "motion/react";
import { Music, Calendar, Image as ImageIcon, User, Mail, Play, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Music", icon: <Music className="w-4 h-4" />, href: "/music" },
    { name: "Videos", icon: <Play className="w-4 h-4" />, href: "/videos" },
    { name: "Tour", icon: <Calendar className="w-4 h-4" />, href: "/tour" },
    { name: "Gallery", icon: <ImageIcon className="w-4 h-4" />, href: "/gallery" },
    { name: "About", icon: <User className="w-4 h-4" />, href: "/about" },
    { name: "Contact", icon: <Mail className="w-4 h-4" />, href: "/contact" },
  ];

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6"
      >
        <div className="glass-panel px-4 md:px-6 py-3 rounded-full flex items-center justify-between lg:justify-start gap-4 lg:gap-8 w-full max-w-5xl">
          <Link to="/" className="text-xl font-serif font-bold tracking-widest text-gold-400">ARIA</Link>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-zinc-400 hover:text-gold-200 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden lg:flex bg-gold-500 hover:bg-gold-400 text-gold-950 px-5 py-1.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 items-center gap-2 whitespace-nowrap">
              <Play className="w-3 h-3 fill-current" />
              Latest Single
            </button>

            {/* Mobile/Tablet Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-gold-200 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden bg-zinc-950/95 backdrop-blur-xl pt-24 px-6"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link 
                    to={item.href}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xl font-serif text-zinc-200 hover:text-gold-400 hover:bg-white/10 transition-all"
                  >
                    <span className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-2xl flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 fill-current" />
                Latest Single
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
