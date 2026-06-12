import { memo } from 'react';

interface SectionLabelProps {
  text: string;
  className?: string;
}

const SectionLabel = memo(function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 mb-4 ${className}`}>
      <span className="w-2 h-2 rounded-full bg-electric-blue" />
      <span className="font-inter text-xs font-semibold uppercase tracking-[0.08em] text-electric-blue">
        {text}
      </span>
    </div>
  );
});

export default SectionLabel;
