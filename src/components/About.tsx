import { motion } from 'motion/react';
import { Award, Compass, Map, Terminal, Database, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function About() {
  const { profile } = usePortfolio();

  return (
    <section className="py-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Main Story Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 glass-card p-8 md:p-10 rounded-2xl border border-pink-border shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt={profile.name || "Sakshi Choudhary"}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-pink shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full pink-gradient flex items-center justify-center text-white text-xl font-bold font-display shadow-sm shrink-0 font-sans">
                    SC
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-primary-pink uppercase tracking-widest block">My Journey</span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight font-display">
                    About {profile.name || "Sakshi Choudhary"}
                  </h2>
                </div>
              </div>
              <div className="h-1 w-12 pink-gradient rounded-full" />
              <p className="text-sm sm:text-base text-text-muted leading-relaxed pt-2">
                {profile.aboutText || "I am currently pursuing my BS Degree in Data Science and Applications from IIT Madras. Simultaneously, I am developing my hands-on software development and product management skills at the Institute of Innovation Bengaluru. As an aspiring software engineer and data analytics specialist, I focus heavily on writing clean, object-oriented code, designing SQL databases, and developing dynamic modern web layouts using React and Tailwind CSS. I also have an immense passion for generative art and video production."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-light-pink/20">
              <div className="p-4 bg-light-pink/15 rounded-xl border border-pink-border/10">
                <Terminal size={18} className="text-primary-pink mb-1.5" />
                <h4 className="font-bold text-xs text-text-dark">Developer Focus</h4>
                <p className="text-[11px] text-text-muted mt-0.5">Algorithm structures, OOPs paradigms, and React models.</p>
              </div>
              <div className="p-4 bg-light-pink/15 rounded-xl border border-pink-border/10">
                <Database size={18} className="text-primary-pink mb-1.5" />
                <h4 className="font-bold text-xs text-text-dark">Data Analyst Focus</h4>
                <p className="text-[11px] text-text-muted mt-0.5">Statistical queries, DBMS schemes, and SQL aggregates.</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Context Summary Grid Panels */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Career Goals */}
            <div className="glass-card p-6.5 rounded-2xl border border-pink-border shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-light-pink text-primary-pink flex items-center justify-center mb-3">
                  <Compass size={18} />
                </div>
                <h3 className="text-lg font-bold text-text-dark tracking-tight mb-2">My Professional Goals</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {profile.careerGoals || "To merge computational data analysis with human storytelling by synthesizing robust, responsive frontend dashboards and creative generative media channels."}
                </p>
              </div>
            </div>

            {/* Academic Core Foundations */}
            <div className="glass-card p-6.5 rounded-2xl border border-pink-border shadow-sm flex-1 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-light-pink text-primary-pink flex items-center justify-center mb-3">
                  <BookOpen size={18} />
                </div>
                <h3 className="text-lg font-bold text-text-dark tracking-tight mb-2">Education Hub</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-text-muted">
                  {profile.education && profile.education.map((edu, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award size={15} className="text-primary-pink shrink-0 mt-0.5" />
                      <span className="font-medium text-text-dark">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
