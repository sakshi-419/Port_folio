import { motion } from 'motion/react';

interface FilterBarProps {
  id?: string;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function FilterBar({ id, categories, selectedCategory, onSelectCategory }: FilterBarProps) {
  return (
    <div id={id} className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`relative px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
              isActive 
                ? 'text-white' 
                : 'text-text-muted bg-white border border-pink-border hover:border-accent-pink hover:text-primary-pink'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterTab"
                className="absolute inset-0 rounded-full pink-gradient"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        );
      })}
    </div>
  );
}
