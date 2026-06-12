import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Code, Cloud, Database, Shield, GitBranch, Building2, Landmark, Factory, ShoppingBag, Zap, Stethoscope } from 'lucide-react';

const expertiseLinks = [
  { to: '/expertises/cloud-infrastructure', label: 'Cloud & Infrastructure', icon: Cloud, desc: 'Multi-cloud, FinOps, IaC' },
  { to: '/expertises/software-development', label: 'Software Development', icon: Code, desc: 'Apps, APIs, Microservices' },
  { to: '/expertises/data-ia', label: 'Data & IA', icon: Database, desc: 'MLops, BI, IA Générative' },
  { to: '/expertises/cybersecurite', label: 'Cybersécurité', icon: Shield, desc: 'Zero Trust, NIS2, SOC' },
  { to: '/expertises', label: 'ERP & CRM', icon: Database, desc: 'Salesforce, SAP, Dynamics', isSub: true },
  { to: '/expertises', label: 'DevOps & Agilité', icon: GitBranch, desc: 'CI/CD, Kubernetes, Scrum', isSub: true },
];

const sectorLinks = [
  { to: '/secteurs', label: 'Banque & Finance', icon: Landmark },
  { to: '/secteurs', label: 'Assurance', icon: Shield },
  { to: '/secteurs', label: 'Santé', icon: Stethoscope },
  { to: '/secteurs', label: 'Industrie', icon: Factory },
  { to: '/secteurs', label: 'Retail & E-commerce', icon: ShoppingBag },
  { to: '/secteurs', label: 'Énergie', icon: Zap },
  { to: '/secteurs', label: 'Secteur Public', icon: Building2 },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertiseOpen, setExpertiseOpen] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpertiseOpen(false);
    setSectorsOpen(false);
  }, [location.pathname]);

  const closeAll = useCallback(() => {
    setExpertiseOpen(false);
    setSectorsOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'glass-dark border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 font-outfit text-xl font-bold tracking-tight">
          <span className="text-white">NE</span>
          <span className="text-electric-blue">X</span>
          <span className="text-white">US</span>
          <span className="text-neutral-400">ONE</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Expertises Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => { setExpertiseOpen(true); setSectorsOpen(false); }}
            onMouseLeave={() => setExpertiseOpen(false)}
          >
            <button className="flex items-center gap-1 font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
              Expertises <ChevronDown className={`w-4 h-4 transition-transform ${expertiseOpen ? 'rotate-180' : ''}`} />
            </button>
            {expertiseOpen && (
              <div className="absolute top-full left-0 pt-2 w-[480px]">
                <div className="glass-dark border border-white/[0.06] rounded-xl p-5 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3">
                    {expertiseLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={closeAll}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.04] transition-colors group"
                      >
                        <link.icon className="w-5 h-5 text-electric-blue mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-inter text-sm font-medium text-white group-hover:text-electric-blue transition-colors">
                            {link.label}
                          </div>
                          <div className="font-inter text-xs text-neutral-400">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sectors Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => { setSectorsOpen(true); setExpertiseOpen(false); }}
            onMouseLeave={() => setSectorsOpen(false)}
          >
            <button className="flex items-center gap-1 font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
              Secteurs <ChevronDown className={`w-4 h-4 transition-transform ${sectorsOpen ? 'rotate-180' : ''}`} />
            </button>
            {sectorsOpen && (
              <div className="absolute top-full left-0 pt-2 w-[320px]">
                <div className="glass-dark border border-white/[0.06] rounded-xl p-4 shadow-2xl">
                  <div className="flex flex-col gap-1">
                    {sectorLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={closeAll}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                      >
                        <link.icon className="w-4 h-4 text-electric-blue flex-shrink-0" />
                        <span className="font-inter text-sm font-medium text-white group-hover:text-electric-blue transition-colors">
                          {link.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link to="/carrieres" className="font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
            Carrières
          </Link>
          <Link to="/blog" className="font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
            Blog
          </Link>
          <Link to="/a-propos" className="font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
            À Propos
          </Link>
          <Link to="/contact" className="font-inter text-sm font-medium text-white/75 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/carrieres"
            className="font-inter text-sm font-medium text-white border-[1.5px] border-white/30 rounded-lg px-4 py-2 hover:border-electric-blue hover:bg-electric-blue/8 transition-all"
          >
            Postuler
          </Link>
          <Link
            to="/contact"
            className="font-inter text-sm font-semibold text-white bg-electric-blue rounded-lg px-5 py-2 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 active:shadow-none transition-all"
          >
            Nous Contacter
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#0A1628]/98 backdrop-blur-xl z-40 overflow-y-auto">
          <div className="flex flex-col p-6 gap-4">
            <Link to="/expertises" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              Expertises
            </Link>
            <div className="pl-4 flex flex-col gap-2">
              {expertiseLinks.slice(0, 4).map((link) => (
                <Link key={link.label} to={link.to} className="font-inter text-sm text-white/70 py-1">
                  {link.label}
                </Link>
              ))}
            </div>
            <Link to="/secteurs" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              Secteurs
            </Link>
            <Link to="/carrieres" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              Carrières
            </Link>
            <Link to="/blog" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              Blog
            </Link>
            <Link to="/a-propos" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              À Propos
            </Link>
            <Link to="/contact" className="font-outfit text-xl font-semibold text-white py-2 border-b border-white/[0.06]">
              Contact
            </Link>
            <div className="flex flex-col gap-3 mt-4">
              <Link
                to="/carrieres"
                className="font-inter text-sm font-medium text-white text-center border-[1.5px] border-white/30 rounded-lg px-4 py-3 hover:border-electric-blue transition-all"
              >
                Postuler
              </Link>
              <Link
                to="/contact"
                className="font-inter text-sm font-semibold text-white text-center bg-electric-blue rounded-lg px-5 py-3 hover:brightness-110 transition-all"
              >
                Nous Contacter
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
