import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Landmark, ShieldCheck, HeartPulse, Factory, ShoppingCart, Zap, Building2,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import ImpactCounter from '@/components/ImpactCounter';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface Sector {
  icon: typeof Landmark;
  title: string;
  color: string;
  challenge: string;
  enjeux: string[];
  expertises: string[];
  caseStudy: { title: string; metric: string };
  stat: string;
}

const sectors: Sector[] = [
  {
    icon: Landmark,
    title: 'Banque & Finance',
    color: '#0055FF',
    challenge: 'Transformation digitale, conformite regulatoire, securite des paiements',
    enjeux: ['Conformite CRD5, DORA, RGPD', 'Core bancaire et Open Banking', 'Cybersecurite et fraude'],
    expertises: ['Cloud', 'Cybersecurite', 'DevOps', 'Data'],
    caseStudy: { title: 'Grande Banque Francaise — Core Banking Cloud Native', metric: '-40% de cout IT, +300% de velocite' },
    stat: '45+ projets bancaires livres',
  },
  {
    icon: ShieldCheck,
    title: 'Assurance',
    color: '#7C3AED',
    challenge: 'Digitalisation des parcours, detection de fraude, conformite',
    enjeux: ['Transformation des parcours sinistres', 'Scoring et tarification predictifs', 'Conformite Solvabilite 2, DORA'],
    expertises: ['Data', 'Software', 'Cloud', 'Cybersecurite'],
    caseStudy: { title: 'Assureur majeur — Plateforme sinistres 100% digitale', metric: '2M+ utilisateurs actifs' },
    stat: '30+ projets assurance',
  },
  {
    icon: HeartPulse,
    title: 'Sante',
    color: '#14B8A6',
    challenge: 'Interoperabilite SI, cybersecurity, IA diagnostique, conformite HDS',
    enjeux: ['Interoperabilite (DMP, Messagerie de Sante)', 'Cybersecurite hospitaliere', 'IA diagnostique et prediction', 'Conformite HDS et RGPD sante'],
    expertises: ['Cybersecurite', 'Data', 'Cloud', 'Software'],
    caseStudy: { title: 'CHU — Plateforme data predictive pour admissions', metric: '+35% d\'efficacite operationnelle' },
    stat: '25+ etablissements de sante accompagnes',
  },
  {
    icon: Factory,
    title: 'Industrie',
    color: '#F59E0B',
    challenge: 'Industrie 4.0, IoT, maintenance predictive, supply chain',
    enjeux: ['IoT industriel et edge computing', 'Maintenance predictive par IA', 'Digital twin et simulation', 'Supply chain resilient'],
    expertises: ['Data', 'Cloud', 'DevOps', 'Software'],
    caseStudy: { title: 'Industriel CAC40 — IoT factory', metric: '-30% de downtime' },
    stat: '20+ usines connectees',
  },
  {
    icon: ShoppingCart,
    title: 'Retail & Distribution',
    color: '#10B981',
    challenge: 'Omnicanal, personnalisation, logistique, marketplace',
    enjeux: ['Experience omnicanale unifiee', 'Moteur de recommandation IA', 'Logistique et supply chain', 'Marketplace digitale'],
    expertises: ['Software', 'Data', 'Cloud', 'ERP'],
    caseStudy: { title: 'Enseigne nationale — E-commerce', metric: '+500% de trafic' },
    stat: '15+ retailers accompagnes',
  },
  {
    icon: Zap,
    title: 'Energie & Utilities',
    color: '#0EA5E9',
    challenge: 'Smart grids, conformite NIS2, transition energetique',
    enjeux: ['Smart grids et smart meters', 'Conformite NIS2 obligatoire', 'Transition energetique et reporting', 'SCADA et securite OT'],
    expertises: ['Cybersecurite', 'Cloud', 'Data', 'DevOps'],
    caseStudy: { title: 'Operateur — Smart Grid', metric: '2M+ compteurs connectes' },
    stat: '10+ operateurs energetiques',
  },
  {
    icon: Building2,
    title: 'Secteur Public',
    color: '#475569',
    challenge: 'Souverainete numerique, accessibilite, modernisation',
    enjeux: ['Souverainete numerique et cloud de confiance', 'Accessibilite (RGAA)', 'Modernisation des SI publics', 'Protection des donnees citoyennes'],
    expertises: ['Cloud', 'Cybersecurite', 'Software', 'DevOps'],
    caseStudy: { title: 'Collectivite — Cloud souverain', metric: '50+ services numeriques' },
    stat: '15+ administrations et collectivites',
  },
];

const regulations = [
  { name: 'NIS2 / LPM', sectors: ['Energie', 'Sante', 'Banque', 'Transport'], desc: 'Directive cybersecurite — octobre 2024' },
  { name: 'DORA', sectors: ['Banque', 'Assurance'], desc: 'Resilience operationnelle digitale — janvier 2025' },
  { name: 'RGPD', sectors: ['Tous'], desc: 'Protection des donnees personnelles' },
  { name: 'HDS', sectors: ['Sante'], desc: 'Hebergeur de donnees de sante' },
  { name: 'Solvabilite 2', sectors: ['Assurance'], desc: 'Norme de supervision des assureurs' },
  { name: 'CRD5 / CRR3', sectors: ['Banque'], desc: 'Reforme bancaire — ratios, reporting' },
  { name: 'RGAA', sectors: ['Public'], desc: 'Accessibilite des services publics numeriques' },
  { name: 'Loi REEN', sectors: ['Tous'], desc: 'Regulation environnementale numerique' },
];

const caseStudyTeasers = [
  { sector: 'Banque', title: 'Migration Core Banking Cloud Native', metric: '-40% cout IT', color: '#0055FF' },
  { sector: 'Sante', title: 'Plateforme Data Predictive CHU', metric: '+35% efficacite', color: '#14B8A6' },
  { sector: 'Industrie', title: 'IoT Factory 4.0 CAC40', metric: '-30% downtime', color: '#F59E0B' },
  { sector: 'Assurance', title: 'Plateforme Sinistres Digitale', metric: '2M+ utilisateurs', color: '#7C3AED' },
  { sector: 'Retail', title: 'E-commerce Omnicanal', metric: '+500% trafic', color: '#10B981' },
  { sector: 'Energie', title: 'Smart Grid Analytics', metric: '2M+ compteurs', color: '#0EA5E9' },
];

const filterTabs = ['Tous', 'Banque', 'Assurance', 'Sante', 'Industrie', 'Retail', 'Energie', 'Public'];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  SECTOR CARD                                                        */
/* ------------------------------------------------------------------ */

function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const { icon: Icon, title, color, challenge, enjeux, expertises, caseStudy, stat } = sector;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.1 }}
      className="group bg-white border border-neutral-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-[350ms]"
      style={{ borderTopWidth: 3, borderTopColor: color }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: `${color}14` }}
      >
        <Icon className="w-7 h-7" style={{ color }} />
      </div>

      {/* Title */}
      <h3 className="font-outfit text-[22px] font-semibold text-neutral-800 mb-2">{title}</h3>

      {/* Challenge */}
      <p className="font-inter text-[15px] text-neutral-400 mb-4 leading-relaxed">{challenge}</p>

      {/* Key enjeux */}
      <ul className="space-y-2 mb-5">
        {enjeux.map((e) => (
          <li key={e} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color }} />
            <span className="font-inter text-sm text-neutral-600">{e}</span>
          </li>
        ))}
      </ul>

      {/* Expertise tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {expertises.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium border"
            style={{ color, backgroundColor: `${color}10`, borderColor: `${color}30` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Case study teaser */}
      <div className="bg-neutral-800 rounded-xl p-4 mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
        <p className="font-inter text-sm text-white font-medium mb-1">{caseStudy.title}</p>
        <p className="font-mono text-[13px] text-[#10B981]">{caseStudy.metric}</p>
      </div>

      {/* Stat + CTA */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-sm" style={{ color }}>{stat}</span>
        <Link
          to="/etudes-de-cas"
          className="inline-flex items-center gap-1 font-inter text-sm font-semibold text-electric-blue hover:underline underline-offset-4 transition-all"
        >
          Explorer <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Secteurs() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const regRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCaseStudies = activeFilter === 'Tous'
    ? caseStudyTeasers
    : caseStudyTeasers.filter((c) =>
        c.sector.toLowerCase().includes(activeFilter.toLowerCase()) ||
        (activeFilter === 'Public' && c.sector === 'Public')
      );

  return (
    <div className="min-h-[100dvh]">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center pt-[160px] pb-20 px-4"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(0,85,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.1) 0%, transparent 50%)',
          }}
        />
        <motion.div
          className="relative z-10 max-w-[800px] mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <SectionLabel text="Secteurs d'Activite" className="justify-center" />
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight mb-6">
            Des Experts qui Comprendent Votre Metier
          </h1>
          <p className="font-inter text-lg text-white/75 leading-relaxed max-w-[640px] mx-auto">
            Chaque secteur a ses specificites techniques et reglementaires. Nos equipes sectorielles combinent expertise IT et connaissance metier pour des solutions adaptees.
          </p>
        </motion.div>
      </section>

      {/* ========== SECTOR GRID ========== */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <SectorCard key={sector.title} sector={sector} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== REGULATORY CONTEXT ========== */}
      <section ref={regRef} className="py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-4">
              Expertise Reglementaire
            </h2>
            <p className="font-inter text-lg text-white/70">
              Nous maitrisons les cadres reglementaires de chaque secteur
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {regulations.map((reg, i) => (
              <motion.div
                key={reg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.08 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-6 hover:border-electric-blue/30 hover:shadow-glass transition-all duration-300"
              >
                <h4 className="font-outfit text-xl font-semibold text-white mb-3">{reg.name}</h4>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {reg.sectors.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-electric-blue/10 text-electric-blue border border-electric-blue/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="font-inter text-sm text-white/60">{reg.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== IMPACT METRICS ========== */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ImpactCounter
            metrics={[
              { number: '650+', label: 'Consultants & Experts' },
              { number: '1,200+', label: 'Projets Livres' },
              { number: '18', label: "Annees d'Experience" },
              { number: '45+', label: 'Certifications Cloud & Securite' },
            ]}
            variant="light"
          />
        </div>
      </section>

      {/* ========== CASE STUDIES BY SECTOR ========== */}
      <section className="py-24 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-white text-center mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            References Sectorielles
          </motion.h2>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeFilter === tab
                    ? 'bg-electric-blue text-white border-transparent'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCaseStudies.map((cs, i) => (
                <motion.div
                  key={cs.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-electric-blue/30 transition-all duration-300 group"
                >
                  <div className="relative aspect-[16/10] bg-neutral-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: cs.color }}
                      >
                        {cs.sector}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-outfit text-lg font-semibold text-white mb-2">{cs.title}</h4>
                    <p className="font-mono text-sm text-[#10B981]">{cs.metric}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-20 bg-deep-navy">
        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-4">
            Un Projet Sectoriel en Tete ?
          </h2>
          <p className="font-inter text-lg text-white/70 mb-8">
            Notre equipe sectorielle vous recontacte sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Contacter nos experts sectoriels
            </Link>
            <span className="font-mono text-sm text-neutral-400">01 23 45 67 89</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
