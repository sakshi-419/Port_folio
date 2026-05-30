import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import TimelineCard from '../components/TimelineCard';
import SectionTitle from '../components/SectionTitle';

export default function Timeline() {
  const { timeline } = usePortfolio();

  // Sort timeline entries strictly chronologically or descending (recent first looks excellent)
  const sortedTimeline = [...timeline].sort((a, b) => {
    return parseInt(b.year) - parseInt(a.year);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-16 min-h-[85vh] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionTitle 
          title="Education & Path" 
          subtitle="My Scholastic Pathway" 
        />

        {sortedTimeline.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40">
            <Calendar className="mx-auto text-light-pink mb-4" size={48} />
            <h3 className="font-bold text-text-dark text-base">No timeline nodes created</h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed">
              Use the control admin dashboard to log educational milestones.
            </p>
          </div>
        ) : (
          <div className="relative mt-12 max-w-4xl mx-auto pl-4 pr-4">
            
            {/* The absolute dotted axis segment for mobile */}
            <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-dashed border-l-2 border-pink-border/60 -z-0" />
            
            <div className="space-y-4">
              {sortedTimeline.map((item, index) => (
                <TimelineCard
                  key={item.id}
                  entry={item}
                  index={index}
                  isLast={index === sortedTimeline.length - 1}
                />
              ))}
            </div>

          </div>
        )}

      </div>
    </motion.div>
  );
}
