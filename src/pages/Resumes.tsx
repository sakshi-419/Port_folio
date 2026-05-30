import { motion } from 'motion/react';
import { FileDown, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import ResumeCard from '../components/ResumeCard';
import SectionTitle from '../components/SectionTitle';

export default function Resumes() {
  const { resumes } = usePortfolio();

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
          title="Curriculum Vitae" 
          subtitle="Download Academics Resumes" 
        />

        {resumes.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40">
            <FileText className="mx-auto text-light-pink mb-4" size={48} />
            <h3 className="font-bold text-text-dark text-base">No Resumes Found</h3>
            <p className="text-xs text-text-muted mt-1 leading-relaxed max-w-xs mx-auto">
              Please include active resume profiles or Drive download URL hooks inside the Admin board.
            </p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-text-muted text-center max-w-md mx-auto mb-10 leading-relaxed">
              Below are the current versions of my professional resumes. Select the version most matching your recruitment criteria for a direct copy download.
            </p>
            
            <div className="space-y-6">
              {resumes.map((resume, index) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
