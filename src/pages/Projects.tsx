import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import SectionTitle from '../components/SectionTitle';
import { ProjectCategory } from '../types';

export default function Projects() {
  const { projects } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories mentioned in request
  const categoriesList = [
    'All',
    'React',
    'Web Development',
    'AI Film',
    'AI/ML',
    'Data Analytics',
    'University Project',
    'Personal Project'
  ];

  // Search logic on Title, Description and Tech Stack tags
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-16 min-h-[85vh]"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionTitle 
          title="Dynamic Software Projects" 
          subtitle="My Technical Portfolio" 
        />

        {/* Filters and Inputs Wrapper */}
        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects by title, stack, or category..."
          />
          
          <FilterBar 
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Results Info Summary */}
        <div className="text-center mb-8">
          <p className="text-xs text-text-muted font-mono font-medium">
            Found {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} matching criteria
          </p>
        </div>

        {/* Projects Grid Grid with Micro-Transitions */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40">
            <FolderGit2 className="mx-auto text-light-pink mb-4" size={48} />
            <h3 className="font-bold text-text-dark text-base">No projects match your query</h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-xs mx-auto">
              Try adjusting your search terminology or reset categories selection above.
            </p>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectCard 
                    project={project} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
