import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github, Youtube } from 'lucide-react';

const expertiseLinks = [
  { to: '/expertises/cloud-infrastructure', label: 'Cloud & Infrastructure' },
  { to: '/expertises/software-development', label: 'Software Development' },
  { to: '/expertises/data-ia', label: 'Data & IA' },
  { to: '/expertises/cybersecurite', label: 'Cybersécurité' },
  { to: '/expertises', label: 'ERP & CRM' },
  { to: '/expertises', label: 'DevOps & Agilité' },
];

const sectorLinks = [
  { to: '/secteurs', label: 'Banque' },
  { to: '/secteurs', label: 'Assurance' },
  { to: '/secteurs', label: 'Santé' },
  { to: '/secteurs', label: 'Industrie' },
  { to: '/secteurs', label: 'Retail' },
  { to: '/secteurs', label: 'Énergie' },
  { to: '/secteurs', label: 'Public' },
];

const companyLinks = [
  { to: '/a-propos', label: 'À Propos' },
  { to: '/carrieres', label: 'Carrières' },
  { to: '/blog', label: 'Blog' },
  { to: '/partenaires', label: 'Partenaires' },
  { to: '/contact', label: 'Contact' },
  { to: '/evenements', label: 'Événements' },
];

export default function Footer() {
  return (
    <footer className="relative aurora-gradient">
      <div className="tech-mesh-gradient absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-10">
        {/* Newsletter */}
        <div className="mb-16 p-8 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-outfit text-xl font-semibold text-white mb-1">
                Restez informés de nos actualités tech
              </h3>
              <p className="font-inter text-sm text-neutral-400">
                Recevez nos insights, études de cas et invitations événements.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 md:w-64 h-12 px-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white font-inter text-sm placeholder:text-neutral-400 focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20 outline-none transition-all"
              />
              <button className="h-12 px-6 rounded-lg bg-electric-blue text-white font-inter text-sm font-semibold hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 transition-all whitespace-nowrap">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Logo & Tagline */}
          <div>
            <Link to="/" className="flex items-center gap-0 font-outfit text-lg font-bold tracking-tight mb-4">
              <span className="text-white">NE</span>
              <span className="text-electric-blue">X</span>
              <span className="text-white">US</span>
              <span className="text-neutral-400">ONE</span>
            </Link>
            <p className="font-inter text-sm text-neutral-400 leading-relaxed mb-6">
              L'excellence IT qui propulse votre transformation digitale depuis 2008.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Expertises */}
          <div>
            <h4 className="font-outfit text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Expertises
            </h4>
            <ul className="flex flex-col gap-2.5">
              {expertiseLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-neutral-400 hover:text-electric-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Secteurs */}
          <div>
            <h4 className="font-outfit text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Secteurs
            </h4>
            <ul className="flex flex-col gap-2.5">
              {sectorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-neutral-400 hover:text-electric-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Entreprise */}
          <div>
            <h4 className="font-outfit text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Entreprise
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-inter text-sm text-neutral-400 hover:text-electric-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-neutral-400">
            &copy; 2026 NexusOne. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="font-inter text-xs text-neutral-400 hover:text-electric-blue transition-colors">
              Mentions Légales
            </a>
            <span className="text-neutral-600">|</span>
            <a href="#" className="font-inter text-xs text-neutral-400 hover:text-electric-blue transition-colors">
              Politique de Confidentialité
            </a>
            <span className="text-neutral-600">|</span>
            <a href="#" className="font-inter text-xs text-neutral-400 hover:text-electric-blue transition-colors">
              Accessibilité
            </a>
            <span className="text-neutral-600">|</span>
            <a
              href="https://www.beonweb.cm/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-xs text-neutral-400 hover:text-electric-blue transition-colors"
            >
              Conçu par Beonweb
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
