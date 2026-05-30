import { motion } from 'motion/react';

interface SectionTitleProps {
  id?: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ id, title, subtitle }: SectionTitleProps) {
  return (
    <div id={id} className="text-center mb-12">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-primary-pink uppercase font-semibold text-xs tracking-widest mb-2"
      >
        {subtitle || "Discover"}
      </motion.p>
      
      <motion.h2 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl font-extrabold tracking-tight text-text-dark"
      >
        {title}
      </motion.h2>
      
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 60 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="h-1.5 pink-gradient rounded-full mx-auto mt-4"
      />
    </div>
  );
}
