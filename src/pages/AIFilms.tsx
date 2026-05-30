import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Video, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import FilmCard from '../components/FilmCard';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';

export default function AIFilms() {
  const { films } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredFilms = films.filter((film) => 
    film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    film.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    film.aiToolsUsed.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-16 min-h-[85vh]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionTitle 
          title="AI Film Studio & Creators" 
          subtitle="Generative Storytelling Space" 
        />

        {/* Intro Pitch */}
        <div className="max-w-xl mx-auto text-center mb-10 leading-relaxed text-sm text-text-muted">
          <p>
            Bridging technical development with artistic vision. Below are some concepts and shorts that I've modeled, storyboarded, and generated using leading transformers and synthesized vocal systems.
          </p>
        </div>

        {/* Input */}
        <div className="max-w-md mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search films by title or generative tools..."
          />
        </div>

        {filteredFilms.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40 bg-white">
            <Video className="mx-auto text-light-pink mb-4 animate-pulse" size={48} />
            <h3 className="font-bold text-text-dark text-base">No films available matching query</h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-xs mx-auto">
              Please enter the Admin Panel to submit your first cinematic reel or try search edits.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredFilms.map((film, index) => (
                <motion.div
                  key={film.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <FilmCard 
                    film={film} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </motion.div>
  );
}
