import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { AIFilm } from '../types';

interface FilmCardProps {
  id?: string;
  film: AIFilm;
  index: number;
}

export default function FilmCard({ id, film, index }: FilmCardProps) {
  const displayThumbnail = film.thumbnailUrl && film.thumbnailUrl.trim() !== ''
    ? film.thumbnailUrl
    : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800';

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.4 }}
      className="glass-card flex flex-col h-full rounded-2xl overflow-hidden shadow-sm group border border-pink-border"
    >
      {/* Video Thumbnail with Hover Overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <img
          src={displayThumbnail}
          alt={film.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-85 group-hover:scale-105 duration-500 transition-transform"
        />
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
          <motion.div 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-white/95 rounded-full shadow-lg text-primary-pink cursor-pointer"
          >
            <Play size={20} fill="currentColor" />
          </motion.div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text-dark mb-2 tracking-tight group-hover:text-primary-pink transition-colors">
          {film.title}
        </h3>
        
        <p className="text-sm text-text-muted mb-4 leading-relaxed flex-grow">
          {film.description}
        </p>

        {/* AI Tools Used */}
        {film.aiToolsUsed && film.aiToolsUsed.length > 0 && (
          <div className="mb-6">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block mb-1.5">
              Tools Applied:
            </span>
            <div className="flex flex-wrap gap-1">
              {film.aiToolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] font-medium px-2 py-0.5 bg-text-dark/5 text-text-dark rounded-md border border-text-dark/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Watch Button */}
        <a
          href={film.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center py-2.5 bg-white border border-pink-border hover:bg-light-pink/40 hover:text-primary-pink text-text-dark font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Play size={12} fill="currentColor" className="text-primary-pink" />
          <span>Watch Cinematic Video</span>
        </a>
      </div>
    </motion.div>
  );
}
