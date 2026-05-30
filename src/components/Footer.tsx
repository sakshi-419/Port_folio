import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { profile, contact } = usePortfolio();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-pink-border/40 py-12 mt-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Logo Brand / Pitch Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full pink-gradient flex items-center justify-center text-white font-extrabold text-sm tracking-tighter">
                SC
              </div>
              <span className="font-display font-extrabold text-base text-text-dark tracking-tight">
                {profile.name || "Sakshi Choudhary"}
              </span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed max-w-xs">
              Student developer in BS Data Science at IIT Madras & Institute of Innovation Bengaluru. Creating modern web systems & AI-driven films.
            </p>
          </div>

          {/* Useful Directories Column */}
          <div>
            <h4 className="font-display font-bold text-xs text-text-dark uppercase tracking-widest mb-4">
              Explore Portfolio
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-text-muted">
              <Link to="/projects" className="hover:text-primary-pink transition-colors">Projects</Link>
              <Link to="/skills" className="hover:text-primary-pink transition-colors">Skill Categories</Link>
              <Link to="/certificates" className="hover:text-primary-pink transition-colors">Certifications</Link>
              <Link to="/ai-films" className="hover:text-primary-pink transition-colors">AI Film Studio</Link>
              <Link to="/timeline" className="hover:text-primary-pink transition-colors">Study Timeline</Link>
              <Link to="/resumes" className="hover:text-primary-pink transition-colors">Resumes</Link>
            </div>
          </div>

          {/* Social Directory / Contacts Column */}
          <div>
            <h4 className="font-display font-bold text-xs text-text-dark uppercase tracking-widest mb-4">
              Connect Channels
            </h4>
            <div className="flex flex-wrap gap-2">
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-light-pink/20 hover:bg-light-pink text-primary-pink rounded-xl transition-all"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              )}
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-light-pink/20 hover:bg-light-pink text-primary-pink rounded-xl transition-all"
                  title="GitHub"
                >
                  <Github size={16} />
                </a>
              )}
              {contact.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-light-pink/20 hover:bg-light-pink text-primary-pink rounded-xl transition-all"
                  title="YouTube"
                >
                  <Youtube size={16} />
                </a>
              )}
              <a
                href={`mailto:${contact.email}`}
                className="p-2 bg-light-pink/20 hover:bg-light-pink text-primary-pink rounded-xl transition-all"
                title="Email Me"
              >
                <Mail size={16} />
              </a>
            </div>
            <p className="text-[10px] text-text-muted mt-4 leading-relaxed">
              Email Developer: <br />
              <span className="font-mono font-medium text-text-dark">{contact.email}</span>
            </p>
          </div>

        </div>

        {/* Closing Credit Row */}
        <div className="pt-8 border-t border-pink-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-muted">
            &copy; {currentYear} {profile.name}. Honest Student Portfolio. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-text-muted">
            <span>Powered by</span>
            <span className="text-primary-pink">Local Storage Content Engine</span>
            <ExternalLink size={10} />
          </div>
        </div>

      </div>
    </footer>
  );
}
