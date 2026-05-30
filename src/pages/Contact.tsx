import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, ShieldAlert, BadgeCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ContactCard from '../components/ContactCard';
import SectionTitle from '../components/SectionTitle';

export default function Contact() {
  const { contact } = usePortfolio();
  
  // Simulated form states
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please populate required fields.");
      return;
    }
    
    setSending(true);
    // Simulate API delay
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      // Reset
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-16 min-h-[85vh]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div>
          <SectionTitle 
            title="Let's Connect" 
            subtitle="Recruiter Communications Hub" 
          />
        </div>

        {/* Contact info block handles */}
        <ContactCard contact={contact} />

        {/* Dynamic Simulated Email Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto glass-card p-8 rounded-3xl border border-pink-border shadow-md"
        >
          <div className="text-center mb-6">
            <h3 className="font-display font-extrabold text-xl text-text-dark">Send Message Directly</h3>
            <p className="text-xs text-text-muted mt-1">Leave an academic inquiry or project proposition</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-text-dark uppercase tracking-wide mb-1.5">
                  Name <span className="text-primary-pink">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink text-text-dark placeholder-text-muted/60"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-text-dark uppercase tracking-wide mb-1.5">
                  Email Address <span className="text-primary-pink">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink text-text-dark placeholder-text-muted/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-dark uppercase tracking-wide mb-1.5">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Inquiry Topic"
                className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink text-text-dark placeholder-text-muted/60"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-text-dark uppercase tracking-wide mb-1.5">
                Your Message <span className="text-primary-pink">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message content..."
                className="w-full text-xs p-3 bg-white border border-pink-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink text-text-dark placeholder-text-muted/60 resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 py-3 pink-gradient text-white rounded-xl text-xs font-bold shadow-md hover:brightness-105 disabled:bg-slate-300 disabled:pointer-events-none transition-all cursor-pointer"
              >
                {sending ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <Send size={12} />
                    <span>Send Secure Message</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Toast / Success Banner */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2"
              >
                <BadgeCheck size={18} className="text-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold block">Message simulated successfully!</span>
                  <span>Your email script has validated properly. Local Storage is in sync.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.div>
  );
}
