import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ArrowRight, X } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface CaseStudy {
  id: number;
  sector: string;
  expertise: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  duration: string;
  teamSize: string;
  image: string;
  sectorColor: string;
  expertiseTags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    sector: 'Banque',
    expertise: 'Cloud',
    title: 'Grande Banque Francaise — Migration Cloud Complete',
    description: 'Migration lift-and-shift vers AWS puis re-architecture cloud-native du core bancaire. Mise en place de l\'IaC et du FinOps.',
    metric: '-40%',
    metricLabel: 'de cout IT',
    duration: '8 mois',
    teamSize: '12 consultants',
    image: '/case-study-bank.jpg',
    sectorColor: '#0055FF',
    expertiseTags: ['AWS', 'Terraform', 'Kubernetes', 'FinOps'],
  },
  {
    id: 2,
    sector: 'Sante',
    expertise: 'Data & IA',
    title: 'Groupe Hospitalier — Plateforme Data Predictive',
    description: 'Construction d\'un lakehouse pour l\'analyse predictive des admissions et optimisation des lits.',
    metric: '+35%',
    metricLabel: "d'efficacite",
    duration: '6 mois',
    teamSize: '8 consultants',
    image: '/case-study-health.jpg',
    sectorColor: '#14B8A6',
    expertiseTags: ['Databricks', 'Python', 'MLflow', 'PowerBI'],
  },
  {
    id: 3,
    sector: 'Energie',
    expertise: 'Cybersecurite',
    title: 'Operateur Energetique — Zero Trust & NIS2',
    description: 'Deploiement d\'une architecture Zero Trust, segmentation reseau et conformite NIS2.',
    metric: '100%',
    metricLabel: 'conforme NIS2',
    duration: '10 mois',
    teamSize: '6 consultants',
    image: '/case-study-energy.jpg',
    sectorColor: '#0EA5E9',
    expertiseTags: ['Zero Trust', 'CrowdStrike', 'NIS2', 'SOC'],
  },
  {
    id: 4,
    sector: 'Assurance',
    expertise: 'Software',
    title: 'Assureur Majeur — Plateforme Digitale Assurance Vie',
    description: 'Developpement d\'une plateforme digitale complete souscription/gestion pour l\'assurance vie.',
    metric: '2M+',
    metricLabel: 'utilisateurs',
    duration: '12 mois',
    teamSize: '15 consultants',
    image: '/case-study-bank.jpg',
    sectorColor: '#7C3AED',
    expertiseTags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
  },
  {
    id: 5,
    sector: 'Industrie',
    expertise: 'DevOps',
    title: 'Industriel CAC40 — Transformation DevOps',
    description: 'Transformation CI/CD, containerisation, GitOps et industrialisation des deploiements.',
    metric: '-70%',
    metricLabel: 'lead time',
    duration: '9 mois',
    teamSize: '10 consultants',
    image: '/case-study-energy.jpg',
    sectorColor: '#F59E0B',
    expertiseTags: ['GitLab CI', 'ArgoCD', 'Kubernetes', 'Helm'],
  },
  {
    id: 6,
    sector: 'Retail',
    expertise: 'ERP/CRM',
    title: 'Retailer National — Salesforce Omnicanal',
    description: 'Implementation Salesforce Service Cloud et Marketing Cloud pour un parcours client unifie.',
    metric: '+25%',
    metricLabel: 'satisfaction',
    duration: '8 mois',
    teamSize: '8 consultants',
    image: '/case-study-health.jpg',
    sectorColor: '#10B981',
    expertiseTags: ['Salesforce', 'MuleSoft', 'Einstein AI'],
  },
  {
    id: 7,
    sector: 'Banque',
    expertise: 'Cybersecurite',
    title: 'Banque — SOC 24/7 et Threat Hunting',
    description: 'Creation d\'un SOC interne avec capacites threat hunting, playbooks automatises et threat intelligence.',
    metric: '-85%',
    metricLabel: 'temps detection',
    duration: '6 mois',
    teamSize: '5 consultants',
    image: '/case-study-bank.jpg',
    sectorColor: '#0055FF',
    expertiseTags: ['Splunk', 'CrowdStrike', 'SOAR', 'MITRE'],
  },
  {
    id: 8,
    sector: 'Sante',
    expertise: 'Software',
    title: 'CHU — Application Mobile Patients',
    description: 'Conception et developpement d\'une application mobile pour patients (rendez-vous, dossier, messagerie).',
    metric: '50,000+',
    metricLabel: 'telechargements',
    duration: '5 mois',
    teamSize: '6 consultants',
    image: '/case-study-health.jpg',
    sectorColor: '#14B8A6',
    expertiseTags: ['React Native', 'Firebase', 'Node.js'],
  },
  {
    id: 9,
    sector: 'Energie',
    expertise: 'Data & IA',
    title: 'Operateur — Smart Grid Analytics',
    description: 'Plateforme temps reel d\'analyse des donnees smart grid pour la prediction et la detection d\'anomalies.',
    metric: '-20%',
    metricLabel: 'pertes reseau',
    duration: '14 mois',
    teamSize: '10 consultants',
    image: '/case-study-energy.jpg',
    sectorColor: '#0EA5E9',
    expertiseTags: ['Kafka', 'Spark', 'TensorFlow', 'Grafana'],
  },
];

const expertiseFilters = ['Tous', 'Cloud', 'Software', 'Data & IA', 'Cybersecurite', 'ERP/CRM', 'DevOps'];
const sectorFilters = ['Tous', 'Banque', 'Assurance', 'Sante', 'Industrie', 'Retail', 'Energie', 'Public'];

const results = [
  { value: '97%', label: 'Taux de satisfaction client', desc: 'NPS moyen sur nos projets' },
  { value: '92%', label: 'Projets livres dans les delais', desc: 'Respect des planning contractualises' },
  { value: '85%', label: 'Consultants certifies', desc: 'Au moins 1 certification par consultant' },
  { value: '89%', label: 'Taux de reconduction', desc: 'Clients renouvelant leur confiance' },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  ACTIVE FILTER PILL                                                 */
/* ------------------------------------------------------------------ */

function ActiveFilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
      {label}
      <button onClick={onRemove} className="hover:text-white transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function CaseStudies() {
  const [activeExpertise, setActiveExpertise] = useState('Tous');
  const [activeSector, setActiveSector] = useState('Tous');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = caseStudies.filter((cs) => {
    const matchExpertise = activeExpertise === 'Tous' || cs.expertise === activeExpertise;
    const matchSector = activeSector === 'Tous' || cs.sector === activeSector;
    return matchExpertise && matchSector;
  });

  const activeFilters: string[] = [];
  if (activeExpertise !== 'Tous') activeFilters.push(activeExpertise);
  if (activeSector !== 'Tous') activeFilters.push(activeSector);

  return (
    <div className="min-h-[100dvh]">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center pt-[160px] pb-16 px-4"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(0,85,255,0.15) 0%, transparent 50%)',
          }}
        />
        <motion.div
          className="relative z-10 max-w-[800px] mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          <SectionLabel text="Nos References" className="justify-center" />
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight mb-6">
            Resultats Concrets, Impact Mesurable
          </h1>
          <p className="font-inter text-lg text-white/75 leading-relaxed max-w-[680px] mx-auto">
            Decouvrez comment nous accompagnons nos clients dans leur transformation digitale. Tous les projets sont reels, les noms ont ete anonymises sur demande des clients.
          </p>
        </motion.div>
      </section>

      {/* ========== FILTER BAR ========== */}
      <section className="sticky top-[72px] z-30 bg-neutral-100 border-b border-neutral-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Expertise filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {expertiseFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveExpertise(f)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeExpertise === f
                    ? 'bg-electric-blue text-white border-transparent'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:scale-[1.02]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Sector filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {sectorFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveSector(f)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                  activeSector === f
                    ? 'bg-electric-blue text-white border-transparent'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400 hover:scale-[1.02]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <motion.div
              className="flex flex-wrap justify-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {activeExpertise !== 'Tous' && (
                <ActiveFilterPill label={activeExpertise} onRemove={() => setActiveExpertise('Tous')} />
              )}
              {activeSector !== 'Tous' && (
                <ActiveFilterPill label={activeSector} onRemove={() => setActiveSector('Tous')} />
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== CASE STUDY GRID ========== */}
      <section className="py-12 pb-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((cs, i) => (
                <motion.div
                  key={cs.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:border-electric-blue/30 transition-all duration-[350ms]"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={cs.image}
                      alt={cs.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: cs.sectorColor }}
                      >
                        {cs.sector}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    {/* Expertise tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cs.expertiseTags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-electric-blue/10 text-electric-blue border border-electric-blue/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-outfit text-lg font-semibold text-neutral-800 mb-2 leading-snug">
                      {cs.title}
                    </h3>
                    <p className="font-inter text-sm text-neutral-600 leading-relaxed mb-4">
                      {cs.description}
                    </p>

                    {/* Metric bar */}
                    <div className="bg-neutral-100 rounded-lg px-4 py-3 mb-4">
                      <span className="font-mono text-lg font-bold text-[#10B981]">{cs.metric}</span>
                      <span className="font-inter text-xs text-neutral-400 ml-2">{cs.metricLabel}</span>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
                        <Clock className="w-3.5 h-3.5" /> {cs.duration}
                      </span>
                      <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
                        <Users className="w-3.5 h-3.5" /> {cs.teamSize}
                      </span>
                    </div>

                    {/* CTA */}
                    <Link
                      to={`/etudes-de-cas`}
                      className="inline-flex items-center gap-1.5 font-inter text-sm font-medium text-electric-blue hover:underline underline-offset-4 transition-all"
                    >
                      Lire l&apos;etude de cas <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-inter text-lg text-neutral-400">Aucune etude de cas ne correspond aux filtres selectionnes.</p>
              <button
                onClick={() => { setActiveExpertise('Tous'); setActiveSector('Tous'); }}
                className="mt-4 font-inter text-sm font-medium text-electric-blue hover:underline underline-offset-4"
              >
                Reinitialiser les filtres
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== RESULTS SUMMARY ========== */}
      <section className="py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Notre Impact en Chiffres
          </motion.h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.1 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 text-center hover:border-electric-blue/30 transition-all duration-300"
              >
                <div className="font-mono text-4xl md:text-5xl font-bold text-electric-blue mb-3">
                  {r.value}
                </div>
                <div className="font-inter text-[15px] text-white/70 mb-1">{r.label}</div>
                <div className="font-inter text-sm text-neutral-400">{r.desc}</div>
              </motion.div>
            ))}
          </div>
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
            Vous Souhaitez un Resultat Similaire ?
          </h2>
          <p className="font-inter text-lg text-white/70 mb-8">
            Discutons de votre projet. Notre equipe vous recontacte sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Demander un audit gratuit
            </Link>
            <span className="font-mono text-sm text-neutral-400">01 23 45 67 89</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
