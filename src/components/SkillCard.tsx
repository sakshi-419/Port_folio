import { motion } from 'motion/react';
import { Award, Code, Database, BarChart2, Cpu, Video, Globe } from 'lucide-react';
import { Skill } from '../types';

interface SkillCardProps {
  key?: any;
  id?: string;
  skill: Skill;
  index: number;
}

export default function SkillCard({ id, skill, index }: SkillCardProps) {
  // Get icon depending on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming':
        return <Code size={18} className="text-primary-pink" />;
      case 'Web Development':
        return <Globe size={18} className="text-primary-pink" />;
      case 'Databases':
        return <Database size={18} className="text-primary-pink" />;
      case 'Data Analytics':
        return <BarChart2 size={18} className="text-primary-pink" />;
      case 'AI Tools':
        return <Video size={18} className="text-primary-pink" />;
      case 'Machine Learning':
        return <Cpu size={18} className="text-primary-pink" />;
      default:
        return <Award size={18} className="text-primary-pink" />;
    }
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.3 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="glass-card p-5 rounded-2xl flex items-center justify-between shadow-sm transition-all border border-pink-border"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-light-pink/40 rounded-xl">
          {getCategoryIcon(skill.category)}
        </div>
        <div>
          <h4 className="font-semibold text-text-dark text-base">{skill.name}</h4>
          <p className="text-xs text-text-muted mt-0.5">{skill.category}</p>
        </div>
      </div>
    </motion.div>
  );
}
