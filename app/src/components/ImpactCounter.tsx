import { memo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ImpactCounterProps {
  metrics: { number: string; label: string }[];
  variant?: 'dark' | 'light';
}

const ImpactCounter = memo(function ImpactCounter({ metrics, variant = 'light' }: ImpactCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = containerRef.current?.querySelectorAll('.counter-number');
      counters?.forEach((counter, i) => {
        const targetText = metrics[i]?.number ?? '0';
        const numericValue = parseFloat(targetText.replace(/[^0-9.]/g, ''));
        const prefix = targetText.match(/^[^0-9]*/)?.[0] ?? '';
        const suffix = targetText.match(/[^0-9]*$/)?.[0] ?? '';

        const obj = { val: 0 };
        gsap.to(obj, {
          val: numericValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
          },
          delay: i * 0.15,
          onUpdate: () => {
            if (numericValue >= 1000) {
              counter.textContent = prefix + Math.floor(obj.val).toLocaleString() + suffix;
            } else {
              counter.textContent = prefix + Math.floor(obj.val) + suffix;
            }
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [metrics]);

  const isDark = variant === 'dark';

  return (
    <div
      ref={containerRef}
      className={`rounded-2xl p-8 md:p-12 ${
        isDark
          ? 'bg-white/[0.03] border border-white/[0.06]'
          : 'bg-white border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
      }`}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((metric, i) => (
          <div key={i} className={`text-center ${i < metrics.length - 1 ? 'md:border-r ' + (isDark ? 'md:border-white/[0.06]' : 'md:border-neutral-200') : ''}`}>
            <div className="counter-number font-mono text-3xl md:text-5xl font-bold text-electric-blue">
              0
            </div>
            <div className={`mt-2 font-inter text-sm ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ImpactCounter;
