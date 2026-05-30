import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { TimelineEntry } from '../types';

interface TimelineCardProps {
  key?: any;
  id?: string;
  entry: TimelineEntry;
  index: number;
  isLast: boolean;
}

export default function TimelineCard({ id, entry, index, isLast }: TimelineCardProps) {
  // Determine left or right entry for alternating styling on desktop
  const isEven = index % 2 === 0;

  return (
    <div id={id} className="relative flex flex-col md:flex-row items-stretch md:justify-center w-full my-4">
      {/* Date Marker Column (Desktop Only) */}
      <div className={`hidden md:flex md:w-1/2 justify-end pr-8 ${isEven ? 'order-1 md:justify-end' : 'order-3 md:justify-start pl-8'}`}>
        {isEven ? (
          <div className="text-right">
            <span className="inline-block px-4 py-1.5 rounded-full bg-light-pink text-primary-pink font-bold text-sm tracking-wider shadow-sm">
              {entry.year}
            </span>
          </div>
        ) : null}
        {!isEven ? (
          <div className="text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-light-pink text-primary-pink font-bold text-sm tracking-wider shadow-sm">
              {entry.year}
            </span>
          </div>
        ) : null}
      </div>

      {/* Central Axis Node */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 flex flex-col items-center z-10 order-2">
        {/* Glowing circle bullet */}
        <motion.div 
          whileHover={{ scale: 1.2 }}
          className="w-10 h-10 rounded-full bg-white border-2 border-primary-pink flex items-center justify-center text-primary-pink shadow-md"
        >
          <GraduationCap size={16} />
        </motion.div>
        {/* Vertical connecter line */}
        {!isLast && (
          <div className="w-0.5 bg-gradient-to-b from-primary-pink to-pink-border flex-grow mt-2 rounded" />
        )}
      </div>

      {/* Content Narrative Card */}
      <div className={`w-full pl-14 md:pl-0 md:w-1/2 ${isEven ? 'order-3 md:pl-8' : 'order-1 md:pr-8'}`}>
        {/* On Mobile show the date label inside the card */}
        <div className="md:hidden mb-2">
          <span className="inline-block px-3 py-1 rounded-full bg-light-pink text-primary-pink font-bold text-xs tracking-wider shadow-sm">
            {entry.year}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="glass-card p-6 rounded-2xl border border-pink-border shadow-sm hover:shadow-md transition-shadow relative"
        >
          {/* Alternating point tail on desktop */}
          <div className={`hidden md:block absolute top-5 w-3 h-3 bg-white border-b border-l border-pink-border rotate-45 ${isEven ? '-left-1.5' : '-right-1.5 rotate-[225deg]'}`} />
          
          <h3 className="text-lg font-bold text-text-dark tracking-tight mb-2">
            {entry.title}
          </h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {entry.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
