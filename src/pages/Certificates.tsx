import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Award } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import CertificateCard from '../components/CertificateCard';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';

export default function Certificates() {
  const { certificates } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter
  const filteredCertificates = certificates.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.issuer.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          title="Verifications & Badges" 
          subtitle="My Certified Milestones" 
        />

        <div className="max-w-md mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search certificates by name or issuer..."
          />
        </div>

        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16 glass-card max-w-md mx-auto rounded-3xl border border-pink-border/40">
            <Award className="mx-auto text-light-pink mb-4" size={48} />
            <h3 className="font-bold text-text-dark text-base">No certificates found</h3>
            <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">
              Please include verifiable credentials in the administrative board.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <CertificateCard 
                    certificate={cert} 
                    index={index} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>
    </motion.div>
  );
}
