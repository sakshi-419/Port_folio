import { motion } from 'motion/react';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateCardProps {
  id?: string;
  certificate: Certificate;
  index: number;
}

export default function CertificateCard({ id, certificate, index }: CertificateCardProps) {
  const displayImage = certificate.imageUrl && certificate.imageUrl.trim() !== ''
    ? certificate.imageUrl
    : 'https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?q=80&w=800';

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.1, 0.5), duration: 0.4 }}
      className="glass-card flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-pink-border"
    >
      {/* Certificate Image Frame */}
      <div className="md:w-1/3 relative aspect-video md:aspect-auto overflow-hidden bg-light-pink/10">
        <img
          src={displayImage}
          alt={certificate.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 p-1.5 bg-white/95 rounded-lg border border-pink-border text-primary-pink shadow-sm">
          <Award size={18} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-text-dark tracking-tight mb-1">
            {certificate.name}
          </h3>
          <p className="text-sm font-semibold text-primary-pink">
            {certificate.issuer}
          </p>
          
          <div className="flex items-center gap-1.5 text-text-muted mt-3 text-xs">
            <Calendar size={13} className="text-text-muted" />
            <span>Issued: {certificate.date}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-light-pink/20 flex justify-end">
          {certificate.certificateLink && certificate.certificateLink !== '#' ? (
            <a
              href={certificate.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-text-dark hover:bg-black text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <span>Verify Credentials</span>
              <ExternalLink size={12} />
            </a>
          ) : (
            <span className="inline-flex py-1.5 px-3 bg-gray-100 rounded-lg text-[11px] font-medium text-text-muted">
              Enrollment Verified
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
