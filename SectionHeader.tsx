import { motion } from 'framer-motion';
import './SectionHeader.scss';

interface Props {
  index: string;
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ index, label, title, description }: Props) {
  return (
    <header className="section-header">
      <div className="section-header__meta">
        <span className="section-header__index">{index}</span>
        <span className="section-header__divider" aria-hidden />
        <span className="section-header__label">{label}</span>
      </div>

      <motion.h2
        className="section-header__title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          className="section-header__description"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
