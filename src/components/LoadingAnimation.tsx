import { motion } from 'motion/react';

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-12 h-12 border-4 border-light-pink border-t-primary-pink rounded-full mb-4 shadow-sm"
      />
      <motion.p
        initial={{ opacity: 0.6 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-xs font-semibold text-text-muted tracking-wide"
      >
        Synchronizing credentials...
      </motion.p>
    </div>
  );
}
