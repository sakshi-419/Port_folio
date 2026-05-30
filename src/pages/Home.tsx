import { motion } from 'motion/react';
import { ArrowRight, Sparkles, FolderGit2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from '../components/ProjectCard';
import SectionTitle from '../components/SectionTitle';

export default function Home() {
  const { projects, films } = usePortfolio();

  // Show only up to 3 highlighted projects as a quick portfolio showcase
  const featuredProjects = projects.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-12"
    >
      {/* 1. Hero Cover */}
      <Hero />

      {/* 2. Interactive About Details */}
      <About />

      {/* 3. Featured Portfolio Projects Panel */}
      <section className="py-16 bg-white/30">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Highlighted Work" 
            subtitle="My Tech Explorations" 
          />

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-2xl max-w-md mx-auto border border-pink-border/40">
              <FolderGit2 className="mx-auto text-light-pink mb-3" size={36} />
              <p className="text-sm font-semibold text-text-muted">No projects uploaded yet.</p>
              <Link to="/admin" className="text-xs font-bold text-primary-pink hover:underline mt-2 inline-block">
                Visit Admin to add first project
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={idx} 
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-pink-border hover:bg-light-pink/20 hover:text-primary-pink text-text-dark font-bold text-xs rounded-full shadow-sm hover:shadow transition-all"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Secondary Callouts (AI Cinema & Badges) */}
      <section className="py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* AI Film Callout Panel */}
            <div className="glass-card p-8 rounded-3xl border border-pink-border shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 pink-gradient rounded-full blur-[50px] opacity-10" />
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-light-pink text-primary-pink flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <h3 className="font-display font-bold text-xl text-text-dark">AI Film Studio</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  I draft script models and cinematic screenplays to synthesize digital narratives with leading generative models like Runway, Suno, and Midjourney.
                </p>
              </div>
              <div className="mt-8 relative z-10">
                <Link
                  to="/ai-films"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-pink hover:text-accent-pink group"
                >
                  <span>Studio Workspace</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Certifications Block */}
            <div className="glass-card p-8 rounded-3xl border border-pink-border shadow-sm flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 pink-gradient rounded-full blur-[50px] opacity-10" />
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-light-pink text-primary-pink flex items-center justify-center">
                  <Star size={18} />
                </div>
                <h3 className="font-display font-bold text-xl text-text-dark">Certificated Badges</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Look through the honest course accomplishments and foundation milestones achieved across IIT Madras BS curriculum tracks.
                </p>
              </div>
              <div className="mt-8 relative z-10">
                <Link
                  to="/certificates"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-pink hover:text-accent-pink group"
                >
                  <span>Credentials View</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </motion.div>
  );
}
