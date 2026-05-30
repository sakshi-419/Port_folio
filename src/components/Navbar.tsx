import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar() {
  const { profile } = usePortfolio();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to apply sticky glassmorphism style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'AI Films', path: '/ai-films' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Resumes', path: '/resumes' },
    { name: 'Contact', path: '/contact' },
  ];

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-white/85 backdrop-blur-md shadow-sm border-b border-pink-border/40' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand Name */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center text-white font-extrabold text-base tracking-tighter border border-pink-border/30 shadow-xs relative shrink-0">
              {profile.profilePhoto ? (
                <img 
                  src={profile.profilePhoto} 
                  alt={profile.name || "Sakshi Choudhary"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full pink-gradient flex items-center justify-center text-white">
                  SC
                </div>
              )}
            </div>
            <span className="font-display font-extrabold text-lg text-text-dark tracking-tight transition-colors group-hover:text-primary-pink">
              {profile.name || "Sakshi Choudhary"}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/40 p-1.5 rounded-full border border-pink-border/20 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    isActive 
                      ? 'text-primary-pink font-bold' 
                      : 'text-text-muted hover:text-primary-pink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navTab"
                      className="absolute inset-0 bg-light-pink/40 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Trigger (Admin Portal / Status) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-full border shadow-sm transition-all ${
                isAdminPath
                  ? 'pink-gradient text-white border-transparent'
                  : 'text-text-dark bg-white border-pink-border hover:border-primary-pink hover:text-primary-pink'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Admin Panel</span>
            </Link>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              to="/admin"
              className="p-2 bg-white rounded-full border border-pink-border text-text-dark hover:text-primary-pink"
              title="Admin Panel"
            >
              <ShieldCheck size={16} />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 bg-white rounded-full border border-pink-border text-text-dark hover:text-primary-pink focus:outline-none transition-colors"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-[100%] left-0 right-0 bg-white border-b border-pink-border/60 shadow-lg overflow-hidden"
          >
            <div className="px-5 py-6 space-y-2 max-h-[85vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive 
                        ? 'bg-light-pink/40 text-primary-pink' 
                        : 'text-text-muted hover:bg-light-pink/10 hover:text-primary-pink'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-pink-border/40 mt-4">
                <Link
                  to="/admin"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-text-dark hover:bg-black text-white rounded-xl text-sm font-bold shadow-md transition-all"
                >
                  <ShieldCheck size={16} />
                  <span>Enter Control Admin</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
