import { memo, useState, useCallback } from 'react';
import { Building2, Landmark, Factory, ShoppingBag, Zap, Globe, Car, Smartphone } from 'lucide-react';

const logos = [
  { Icon: Building2, name: 'Société Générale' },
  { Icon: Landmark, name: 'BNP Paribas' },
  { Icon: Factory, name: 'Schneider Electric' },
  { Icon: ShoppingBag, name: 'Carrefour' },
  { Icon: Zap, name: 'EDF' },
  { Icon: Globe, name: 'Orange' },
  { Icon: Car, name: 'Renault' },
  { Icon: Smartphone, name: 'Dassault Systèmes' },
];

const LogoItem = memo(function LogoItem({
  Icon,
  name,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  Icon: typeof Building2;
  name: string;
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number) => void;
  onLeave: () => void;
}) {
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <div
      className="flex items-center gap-3 px-8 cursor-pointer transition-all duration-300"
      style={{
        opacity: isOtherHovered ? 0.3 : isHovered ? 1 : 0.5,
        filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      <Icon className="w-8 h-8 text-neutral-600" />
      <span className="font-inter text-sm font-medium text-neutral-600 whitespace-nowrap">{name}</span>
    </div>
  );
});

const ClientLogoMarquee = memo(function ClientLogoMarquee() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleHover = useCallback((i: number) => setHoveredIndex(i), []);
  const handleLeave = useCallback(() => setHoveredIndex(null), []);

  const logoRow = (
    <>
      {logos.map((logo, i) => (
        <LogoItem
          key={`a-${i}`}
          Icon={logo.Icon}
          name={logo.name}
          index={i}
          hoveredIndex={hoveredIndex}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      ))}
      {logos.map((logo, i) => (
        <LogoItem
          key={`b-${i}`}
          Icon={logo.Icon}
          name={logo.name}
          index={i + logos.length}
          hoveredIndex={hoveredIndex}
          onHover={handleHover}
          onLeave={handleLeave}
        />
      ))}
    </>
  );

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { setIsPaused(false); setHoveredIndex(null); }}
    >
      <div
        className="flex items-center w-max"
        style={{
          animation: 'marquee 35s linear infinite',
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {logoRow}
      </div>
    </div>
  );
});

export default ClientLogoMarquee;
