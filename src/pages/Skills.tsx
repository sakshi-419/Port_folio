import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import SkillCard from '../components/SkillCard';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';
import { SkillCategory } from '../types';

export default function Skills() {
  const { skills } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');

  const categories: SkillCategory[] = [
    'Programming',
    'Web Development',
    'Databases',
    'Data Analytics',
    'AI Tools',
    'Machine Learning'
  ];

  // Search filter
  const filteredSkills = skills.filter(skill => 
    skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.category.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="Proficiencies & Stack" 
          subtitle="My Academic Core Focus" 
        />

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search matching skills (e.g. SQL, Python)..."
          />
        </div>

        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40">
            <Layers className="mx-auto text-light-pink mb-3" size={36} />
            <p className="text-sm font-semibold text-text-muted">No matching competencies found.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* If user is searching, just render simple flat grid list */}
            {searchQuery ? (
              <div>
                <h3 className="text-xs font-bold text-primary-pink uppercase tracking-widest mb-6 text-center">
                  Search Results ({filteredSkills.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredSkills.map((skill, idx) => (
                    <SkillCard 
                      key={skill.id} 
                      skill={skill} 
                      index={idx} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Otherwise, group skills nicely by Category for a structured presentation
              categories.map((cat) => {
                const categorySkills = skills.filter(s => s.category === cat);
                if (categorySkills.length === 0) return null;

                return (
                  <motion.div 
                    key={cat}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                    className="space-y-4"
                  >
                    {/* Category Title Heading */}
                    <div className="flex items-center gap-2 pb-2 border-b border-pink-border/30">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-pink" />
                      <h3 className="font-display font-black text-lg text-text-dark uppercase tracking-tight">
                        {cat}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-light-pink/40 text-primary-pink rounded-md ml-auto">
                        {categorySkills.length} {categorySkills.length === 1 ? 'Skill' : 'Skills'}
                      </span>
                    </div>

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categorySkills.map((skill, idx) => (
                        <SkillCard 
                          key={skill.id} 
                          skill={skill} 
                          index={idx} 
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })
            )}

          </div>
        )}

      </div>
    </motion.div>
  );
}
