import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Download, Mail, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Hero() {
  const { profile, resumes } = usePortfolio();

  const handleDownloadResume = () => {
    if (resumes && resumes.length > 0) {
      const primaryResume = resumes[0];
      if (primaryResume.pdfUrl && primaryResume.pdfUrl !== '#') {
        window.open(primaryResume.pdfUrl, '_blank');
      } else {
        alert(`Downloading simulated PDF: ${primaryResume.title}\nYou can customize this link inside the /admin panel!`);
      }
    } else {
      alert(`No resumes uploaded! You can add resume links in the Admin Panel /admin.`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Decorative ambient background blur lights */}
      <div className="absolute top-1/4 right-[5%] w-72 h-72 bg-light-pink/40 rounded-full blur-[90px] -z-10 animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 left-[5%] w-60 h-60 bg-accent-pink/20 rounded-full blur-[80px] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Hero Credentials Layout */}
          <div className="flex-1 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-light-pink text-primary-pink rounded-full text-xs font-bold tracking-wide shadow-sm"
            >
              <BookOpen size={13} className="animate-bounce" />
              <span>BS degree at IIT Madras & IISB Student</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-text-dark leading-none"
              >
                Let's Build with
                <span className="block mt-1 pink-gradient-text">
                  {profile.name || "Sakshi Choudhary"}
                </span>
              </motion.h1>

              {/* Education list summary */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex flex-col gap-1.5 text-xs text-text-muted max-w-md mx-auto lg:mx-0 py-1"
              >
                {profile.education && profile.education.map((edu, idx) => (
                  <p key={idx} className="flex items-center gap-2 justify-center lg:justify-start font-medium text-text-dark">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-pink" />
                    <span>{edu}</span>
                  </p>
                ))}
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm sm:text-base text-text-muted leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              {profile.shortIntro || "A structured student explorer blending data science metrics with clean React dashboards and cinematic storyboarding."}
            </motion.p>

            {/* Current learning bubble list */}
            {profile.currentLearning && profile.currentLearning.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="space-y-2 text-left bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-pink-border/40 max-w-md mx-auto lg:mx-0 shadow-sm"
              >
                <span className="text-[10px] font-extrabold text-primary-pink uppercase tracking-widest block">Active Learning Focus:</span>
                <div className="flex flex-wrap gap-1.5">
                  {profile.currentLearning.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] font-semibold px-2.5 py-0.5 bg-light-pink text-primary-pink/90 rounded-md shadow-[0_1px_2px_rgba(255,79,163,0.05)] border border-pink-border/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Core Hero Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-4"
            >
              <Link
                to="/projects"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 pink-gradient text-white font-bold text-sm rounded-full shadow-lg hover:shadow-xl hover:brightness-105 transition-all text-center"
              >
                <span>View Projects</span>
                <ArrowRight size={15} />
              </Link>

              <button
                type="button"
                onClick={handleDownloadResume}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-pink-border hover:bg-light-pink/10 hover:border-primary-pink text-text-dark hover:text-primary-pink font-bold text-sm rounded-full shadow-sm transition-all text-center cursor-pointer"
              >
                <Download size={14} className="text-primary-pink" />
                <span>Download Resume</span>
              </button>

              <Link
                to="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-text-dark mx-auto hover:bg-black text-white font-bold text-sm rounded-full shadow-sm transition-all text-center"
              >
                <Mail size={14} />
                <span>Contact Me</span>
              </Link>
            </motion.div>
          </div>

          {/* Hero Profile Decorative Graphic Frame */}
          <div className="flex-1 flex justify-center order-1 lg:order-2">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 select-none animate-float"
            >
              {/* Spinning or rotating pink circles backdrops */}
              <div className="absolute -inset-4 pink-gradient rounded-full opacity-10 animate-pulse duration-[4000ms] blur-lg" />
              <div className="absolute -inset-2 border-2 border-dashed border-accent-pink/30 rounded-full animate-[spin_50s_linear_infinite]" />
              
              <div className="absolute top-2 left-2 w-10 h-10 bg-white/95 rounded-2xl shadow-md border border-pink-border/40 flex items-center justify-center text-primary-pink animate-bounce duration-[2500ms]">
                🐍
              </div>
              <div className="absolute bottom-4 right-1.5 w-12 h-12 bg-white/95 rounded-2xl shadow-md border border-pink-border/40 flex items-center justify-center text-primary-pink animate-bounce duration-[3000ms]">
                ⚛️
              </div>

              {/* Profile Image Circle */}
              <div className="w-full h-full rounded-full border-[8px] border-white overflow-hidden shadow-xl relative aspect-square">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.name || "Sakshi Choudhary"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full pink-gradient flex items-center justify-center text-white text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display select-none">
                    SC
                  </div>
                )}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
