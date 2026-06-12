import { memo } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  variant?: 'dark' | 'light';
}

const TestimonialCard = memo(function TestimonialCard({
  quote,
  name,
  role,
  company,
  avatar,
  variant = 'dark',
}: TestimonialCardProps) {
  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-2xl p-8 transition-all duration-350 ${
        isDark
          ? 'bg-white/[0.06] border border-white/[0.08] backdrop-blur-[20px] hover:bg-white/[0.10] hover:border-white/[0.18]'
          : 'bg-white border border-neutral-200 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
      }`}
    >
      <Quote className={`w-6 h-6 mb-4 ${isDark ? 'text-electric-blue' : 'text-electric-blue'}`} />
      <p className={`font-outfit text-base italic leading-relaxed mb-6 ${isDark ? 'text-white' : 'text-neutral-800'}`}>
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className={`font-inter text-sm font-semibold ${isDark ? 'text-white' : 'text-neutral-800'}`}>
            {name}
          </div>
          <div className={`font-inter text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {role}
          </div>
          <div className={`font-inter text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-400'}`}>
            {company}
          </div>
        </div>
      </div>
    </div>
  );
});

export default TestimonialCard;
