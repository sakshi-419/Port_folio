import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  key?: any;
  id?: string;
  project: Project;
  index: number;
}

export default function ProjectCard({ id, project, index }: ProjectCardProps) {
  // Use a default Unsplash placeholder if imageUrl is missing
  const displayImage = project.imageUrl && project.imageUrl.trim() !== ''
    ? project.imageUrl
    : 'https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=600';

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.4 }}
      className="glass-card flex flex-col h-full rounded-2xl overflow-hidden shadow-sm group border border-pink-border"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-light-pink/10">
        <img
          src={displayImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary-pink tracking-wider shadow-sm border border-pink-border uppercase">
          {project.category}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-dark mb-2 tracking-tight group-hover:text-primary-pink transition-colors">
          {project.title}
        </h3>
        
        <p className="text-sm text-text-muted mb-5 leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Tech Stack Tags */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-0.5 bg-light-pink/30 text-primary-pink rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-light-pink/20">
          {project.githubLink && project.githubLink !== '#' && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-text-dark text-white text-xs font-semibold rounded-xl hover:bg-black transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
          )}
          {project.liveDemoLink && project.liveDemoLink !== '#' ? (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 pink-gradient text-white text-xs font-semibold rounded-xl hover:brightness-105 shadow-sm transition-all"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="flex-1 text-center py-2 text-text-muted bg-gray-100/60 rounded-xl text-xs font-medium border border-gray-100">
              Personal Study
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
