import { memo } from 'react';
import { Users } from 'lucide-react';

interface ConsultantBadgeProps {
  count?: string;
  label?: string;
  className?: string;
}

const ConsultantBadge = memo(function ConsultantBadge({
  count = '650+',
  label = 'Consultants',
  className = '',
}: ConsultantBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-3 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-electric-blue/10 flex items-center justify-center">
        <Users className="w-5 h-5 text-electric-blue" />
      </div>
      <div>
        <div className="font-mono text-lg font-bold text-white leading-none">{count}</div>
        <div className="font-inter text-xs text-neutral-400 mt-0.5">{label}</div>
      </div>
    </div>
  );
});

export default ConsultantBadge;
