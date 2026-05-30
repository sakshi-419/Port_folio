import { motion } from 'motion/react';
import { FileText, Download } from 'lucide-react';
import { Resume } from '../types';

interface ResumeCardProps {
  key?: any;
  id?: string;
  resume: Resume;
  index: number;
}

export default function ResumeCard({ id, resume, index }: ResumeCardProps) {
  const handleDownload = () => {
    // If it's a real PDF URL we download it, otherwise simulate beautifully
    if (resume.pdfUrl && resume.pdfUrl !== '#') {
      window.open(resume.pdfUrl, '_blank');
    } else {
      alert(`Downloading simulated PDF: ${resume.title}\nIn your live dashboard, you can paste the link to your Google Drive or hosted PDF!`);
    }
  };

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.1, 0.4), duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 rounded-2xl border border-pink-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all"
    >
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="p-4 bg-light-pink text-primary-pink rounded-2xl shrink-0">
          <FileText size={28} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-text-dark tracking-tight">
            {resume.title}
          </h3>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            {resume.description}
          </p>
        </div>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={handleDownload}
        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 pink-gradient text-white font-bold text-sm rounded-xl shadow-sm hover:brightness-105 transition-all cursor-pointer"
      >
        <Download size={16} />
        <span>Download Resume PDF</span>
      </motion.button>
    </motion.div>
  );
}
