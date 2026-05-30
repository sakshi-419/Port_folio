import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Youtube, ExternalLink, MapPin } from 'lucide-react';
import { Contact } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactCardProps {
  id?: string;
  contact: Contact;
}

export default function ContactCard({ id, contact }: ContactCardProps) {
  const { profile } = usePortfolio();

  return (
    <div id={id} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* Contact Info Detail Block */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 rounded-2xl border border-pink-border shadow-sm flex flex-col justify-between"
      >
        <div>
          {profile.profilePhoto && (
            <img 
              src={profile.profilePhoto} 
              alt={profile.name || "Sakshi Choudhary"} 
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-pink shadow-sm mb-4"
            />
          )}
          <span className="text-primary-pink text-xs font-bold tracking-widest uppercase block mb-2">Get in touch</span>
          <h3 className="text-2xl font-bold text-text-dark tracking-tight mb-4">Let's build something wonderful together</h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6">
            I am always open to discussing new engineering collaborations, academic research, data analytics projects, or creative film productions. Feel free to reach out via email!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-light-pink text-primary-pink rounded-xl">
              <Mail size={18} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Direct Email</p>
              <a href={`mailto:${contact.email}`} className="text-sm font-semibold text-text-dark hover:text-primary-pink transition-colors">
                {contact.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-light-pink text-primary-pink rounded-xl">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-xs text-text-muted">Primary Hub</p>
              <p className="text-sm font-semibold text-text-dark">Bengaluru, India</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Social Network Channels Block */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 rounded-2xl border border-pink-border shadow-sm flex flex-col justify-between"
      >
        <div>
          <span className="text-primary-pink text-xs font-bold tracking-widest uppercase block mb-2">Social Channels</span>
          <h3 className="text-2xl font-bold text-text-dark tracking-tight mb-4">Connect with me online</h3>
          <p className="text-sm text-text-muted leading-relaxed mb-6">
            Keep up with my academic updates at IIT Madras or look at video trailers and Python/React repositories across these spaces:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-pink-border/50 bg-white hover:bg-light-pink/10 hover:border-accent-pink text-text-muted hover:text-primary-pink transition-all group"
            >
              <Linkedin size={20} className="shrink-0 text-[#2D2D2D] group-hover:text-primary-pink transition-colors" />
              <div className="truncate">
                <p className="text-[10px] text-text-muted uppercase font-bold">LinkedIn</p>
                <span className="text-xs font-semibold block truncate">Connect</span>
              </div>
            </a>
          )}

          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-pink-border/50 bg-white hover:bg-light-pink/10 hover:border-accent-pink text-text-muted hover:text-primary-pink transition-all group"
            >
              <Github size={20} className="shrink-0 text-[#2D2D2D] group-hover:text-primary-pink transition-colors" />
              <div className="truncate">
                <p className="text-[10px] text-text-muted uppercase font-bold">GitHub</p>
                <span className="text-xs font-semibold block truncate">Follow</span>
              </div>
            </a>
          )}

          {contact.youtube && (
            <a
              href={contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3.5 rounded-xl border border-pink-border/50 bg-white hover:bg-light-pink/10 hover:border-accent-pink text-text-muted hover:text-primary-pink transition-all group"
            >
              <Youtube size={20} className="shrink-0 text-[#2D2D2D] group-hover:text-primary-pink transition-colors" />
              <div className="truncate">
                <p className="text-[10px] text-text-muted uppercase font-bold">YouTube</p>
                <span className="text-xs font-semibold block truncate">Subscribe</span>
              </div>
            </a>
          )}

          <a
            href={`mailto:${contact.email}`}
            className="flex items-center gap-3 p-3.5 rounded-xl border border-pink-border/50 bg-white hover:bg-light-pink/10 hover:border-accent-pink text-text-muted hover:text-primary-pink transition-all group"
          >
            <Mail size={20} className="shrink-0 text-[#2D2D2D] group-hover:text-primary-pink transition-colors" />
            <div className="truncate">
              <p className="text-[10px] text-text-muted uppercase font-bold">Direct Mail</p>
              <span className="text-xs font-semibold block truncate">Email Me</span>
            </div>
          </a>
        </div>
      </motion.div>
    </div>
  );
}
