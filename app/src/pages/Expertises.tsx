import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cloud, Code2, Brain, Shield, Database, GitBranch,
  Landmark, HeartPulse, Factory, ShoppingCart, Zap, Building2,
  CheckCircle2, ArrowRight, Phone, ShieldCheck
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import ImpactCounter from '@/components/ImpactCounter';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────── data ──────────────────────── */

const expertiseCards = [
  {
    icon: Cloud,
    title: 'Cloud & Infrastructure',
    subtitle: 'Architecture, Migration, FinOps',
    color: '#0055FF',
    description: "De l'audit à la migration, nous concevons des architectures cloud résilientes et optimisées. Multi-cloud et hybride, infrastructure as code, FinOps.",
    services: [
      'Architecture multi-cloud (AWS, Azure, GCP)',
      'Migration et modernisation d\'applications',
      'Infrastructure as Code (Terraform, Pulumi, ARM)',
      'Containerisation et orchestration (Kubernetes, OpenShift)',
      'FinOps et optimisation des coûts cloud',
      'Cloud Landing Zones et gouvernance',
    ],
    caseStudy: {
      client: 'Grande Banque Française — Migration 800+ workloads vers AWS en 8 mois',
      metric: '-40% de coût d\'infrastructure',
    },
    link: '/expertises/cloud-infrastructure',
  },
  {
    icon: Code2,
    title: 'Développement Logiciel',
    subtitle: 'Applications Sur Mesure, APIs, Microservices',
    color: '#7C3AED',
    description: "Applications sur mesure, microservices scalables, APIs robustes. Nos équipes de développement livrent du code de production qui dure.",
    services: [
      'Applications web et mobiles sur mesure',
      'Architecture microservices et event-driven',
      'APIs RESTful et GraphQL',
      'Frontend modernes (React, Vue, Angular)',
      'Legacy modernization et refactoring',
      'Quality engineering et test automation',
    ],
    caseStudy: {
      client: 'Assureur majeur — Plateforme digitale assurance vie, 2M+ utilisateurs',
      metric: 'Time-to-market réduit de 60%',
    },
    link: '/expertises/software-development',
  },
  {
    icon: Brain,
    title: 'Data & Intelligence Artificielle',
    subtitle: 'Data Engineering, ML, IA Générative',
    color: '#7C3AED',
    description: "Data Lakes et plateformes analytics, Machine Learning, IA Générative. Nos data scientists transforment vos données en avantage concurrentiel.",
    services: [
      'Data Lakes et plateformes analytics',
      'Pipelines ETL/ELT modernes (dbt, Airflow)',
      'Machine Learning et MLOps',
      'IA Générative et LLMs (RAG, fine-tuning)',
      'Business Intelligence et data visualisation',
      'Gouvernance des données et qualité',
    ],
    caseStudy: {
      client: 'Groupe Hospitalier — Prédiction des admissions, +35% d\'efficacité',
      metric: '+35% d\'efficacité opérationnelle',
    },
    link: '/expertises/data-ia',
  },
  {
    icon: Shield,
    title: 'Cybersécurité',
    subtitle: 'Zero Trust, Conformité, SOC',
    color: '#14B8A6',
    description: "Audit, Zero Trust, conformité NIS2/RGPD, SOC. Nos experts sécurité protègent vos actifs numériques avec les standards les plus exigeants.",
    services: [
      'Audit de sécurité et pentest',
      'Architecture Zero Trust',
      'Conformité NIS2 et RGPD',
      'Security Operations Center (SOC)',
      'Cloud Security Posture Management (CSPM)',
      'Gestion des vulnérabilités et patching',
    ],
    caseStudy: {
      client: 'Opérateur Énergétique — Déploiement Zero Trust, conformité NIS2',
      metric: '100% conforme NIS2',
    },
    link: '/expertises/cybersecurite',
  },
  {
    icon: Database,
    title: 'ERP & CRM',
    subtitle: 'Salesforce, SAP, Microsoft Dynamics',
    color: '#F59E0B',
    description: "Implementation Salesforce, SAP S/4HANA, Microsoft Dynamics. Nous intégrons vos ERP/CRM avec votre écosystème existant pour unifié.",
    services: [
      'Implementation Salesforce (Sales, Service, Marketing Cloud)',
      'SAP S/4HANA migration et customisation',
      'Microsoft Dynamics 365',
      'Intégration ERP/CRM avec écosystèmes existants',
      'Développement d\'applications Salesforce (Apex, LWC)',
      'Support et TMA',
    ],
    caseStudy: {
      client: 'Retail national — Déploiement Salesforce omnicanal, 500+ magasins',
      metric: '+25% de satisfaction client',
    },
    link: '/expertises',
  },
  {
    icon: GitBranch,
    title: 'DevOps & Agilité',
    subtitle: 'CI/CD, Platform Engineering, Scrum',
    color: '#10B981',
    description: "Pipelines CI/CD, Platform Engineering, coaching agile. Nous transformons votre delivery pour des équipes autonomes et des déploiements continus.",
    services: [
      'Pipelines CI/CD (GitLab, GitHub Actions, Jenkins)',
      'Platform Engineering et developer experience',
      'Coaching agile et transformation organisationnelle',
      'Observabilité et SRE (Prometheus, Grafana, Datadog)',
      'GitOps et gestion de configuration',
      'Value Stream Management',
    ],
    caseStudy: {
      client: 'Industriel CAC40 — Transformation DevOps, 15 équipes autonomes',
      metric: '-70% de lead time de livraison',
    },
    link: '/expertises',
  },
];

const methodologySteps = [
  { num: '01', title: 'Audit & Diagnostic', desc: "Analyse de l'existant, identification des leviers de valeur, cartographie des risques" },
  { num: '02', title: 'Conception', desc: 'Architecture cible, proof of concept, plan de migration, budget détaillé' },
  { num: '03', title: 'Exécution', desc: 'Mise en oeuvre agile, reporting en temps réel, gestion du changement' },
  { num: '04', title: 'Run & Optimisation', desc: 'Support, amélioration continue, transfert de compétences, optimisation' },
];

const sectorCards = [
  { icon: Landmark, title: 'Banque & Finance', challenge: 'Conformité régulatoire, transformation digitale' },
  { icon: ShieldCheck, title: 'Assurance', challenge: 'Fraude, digitalisation des sinistres' },
  { icon: HeartPulse, title: 'Santé', challenge: 'Interopérabilité, cybersecurity, IA diagnostique' },
  { icon: Factory, title: 'Industrie', challenge: 'IoT, maintenance prédictive, supply chain' },
  { icon: ShoppingCart, title: 'Retail & Distribution', challenge: 'Omnicanal, personnalisation, logistique' },
  { icon: Zap, title: 'Énergie & Utilities', challenge: 'Smart grids, conformité NIS2, transition verte' },
  { icon: Building2, title: 'Secteur Public', challenge: 'Souveraineté numérique, accessibilité' },
];

const impactMetrics = [
  { number: '650+', label: 'Consultants & Experts' },
  { number: '1,200+', label: 'Projets Livrés' },
  { number: '18', label: "Années d'Expérience" },
  { number: '45+', label: 'Certifications Cloud & Sécurité' },
];

const certificationLogos = [
  { name: 'AWS', img: '/partner-aws.svg' },
  { name: 'Azure', img: '/partner-azure.svg' },
  { name: 'GCP', img: '/partner-gcp.svg' },
  { name: 'Salesforce', img: '/partner-salesforce.svg' },
  { name: 'SAP', img: '/partner-sap.svg' },
];

/* ──────────────────────── easing ──────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────── component ──────────────────────── */

export default function Expertises() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  // GSAP timeline line draw
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-[100dvh]">
      {/* ═══════════════ Section 1: Hero ═══════════════ */}
      <section className="relative min-h-[60vh] pt-[160px] pb-20 px-4 sm:px-6 aurora-gradient tech-mesh-gradient overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionLabel text="Nos Expertises" className="justify-center" />
          </motion.div>

          <motion.h1
            className="font-outfit text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
          >
            De la Stratégie à l&apos;Exécution, l&apos;Excellence à Chaque Niveau
          </motion.h1>

          <motion.p
            className="mt-6 font-inter text-lg text-white/75 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.55 }}
          >
            Six domaines d&apos;expertise couvrant l&apos;intégralité du spectre IT.
            Nos équipes pluridisciplinaires accompagnent votre transformation digitale de bout en bout.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.7 }}
          >
            <a
              href="#contact"
              className="font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Demander un audit gratuit
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Section 2: Expertise Grid ═══════════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseCards.map((card, i) => (
              <ExpertiseCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Section 3: Methodology Timeline ═══════════════ */}
      <section ref={timelineRef} className="relative py-24 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
              Notre Approche : Du Diagnostic à la Valeur
            </h2>
            <p className="mt-4 font-inter text-lg text-white/70 max-w-2xl mx-auto">
              Une méthodologie éprouvée pour garantir le succès de chaque projet.
            </p>
          </div>

          {/* Timeline Desktop */}
          <div className="hidden md:block relative">
            <div
              ref={timelineLineRef}
              className="absolute top-[28px] left-0 right-0 h-0.5 bg-electric-blue/30 origin-left"
            />
            <div className="grid grid-cols-4 gap-8 relative">
              {methodologySteps.map((step, i) => (
                <TimelineStep key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Timeline Mobile */}
          <div className="md:hidden relative pl-8">
            <div className="absolute top-0 left-[11px] bottom-0 w-0.5 bg-electric-blue/30" />
            {methodologySteps.map((step, i) => (
              <MobileTimelineStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Section 4: Impact Metrics ═══════════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <SectionLabel text="Notre Impact en Chiffres" className="justify-center" />
          </div>
          <ImpactCounter metrics={impactMetrics} variant="light" />
        </div>
      </section>

      {/* ═══════════════ Section 5: Sector Cross-Sell ═══════════════ */}
      <section className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
              Des Expertises Ciblées par Secteur
            </h2>
            <p className="mt-4 font-inter text-lg text-white/70 max-w-2xl mx-auto">
              Chaque secteur a ses spécificités. Nos équipes sectorielles maîtrisent vos enjeux métier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectorCards.slice(0, 4).map((sector, i) => (
              <SectorCard key={sector.title} sector={sector} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 max-w-4xl mx-auto">
            {sectorCards.slice(4).map((sector, i) => (
              <SectorCard key={sector.title} sector={sector} index={i + 4} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/secteurs"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Explorer nos secteurs d&apos;activité
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ Section 6: Certifications ═══════════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-2xl sm:text-[28px] font-semibold text-neutral-800">
            Certifié, Reconnu, de Confiance
          </h2>

          <div className="mt-10 flex flex-wrap justify-center items-center gap-10 md:gap-12">
            {certificationLogos.map((logo) => (
              <motion.div
                key={logo.name}
                className="h-12 w-28 flex items-center justify-center grayscale-[60%] opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.textContent = logo.name;
                    (e.target as HTMLImageElement).parentElement!.className += ' font-inter text-sm font-semibold text-neutral-600';
                  }}
                />
              </motion.div>
            ))}
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-neutral-700 bg-white border border-neutral-200 rounded-full px-4 py-2">
                <CheckCircle2 className="w-4 h-4 text-success-green" /> ISO 27001
              </span>
              <span className="font-inter text-sm font-medium text-neutral-600">
                France Cybersecurity
              </span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: '45+', label: 'Certifications Partenaires' },
              { num: '12', label: 'Partenaires Stratégiques' },
              { num: 'ISO 27001', label: 'Certifié' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="font-mono text-2xl font-bold text-electric-blue">{stat.num}</div>
                <div className="mt-1 font-inter text-xs text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Section 7: CTA Banner ═══════════════ */}
      <section
        id="contact"
        className="relative py-20 px-4 sm:px-6 aurora-gradient overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-electric-blue/20 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
            Prêts à Transformer Votre IT ?
          </h2>
          <p className="mt-4 font-inter text-lg text-white/75">
            Discutons de vos projets. Notre équipe vous recontacte sous 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Demander un audit gratuit
            </Link>
            <a
              href="tel:0123456789"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3.5 hover:border-electric-blue hover:bg-electric-blue/8 transition-all"
            >
              <Phone className="w-4 h-4" />
              01 23 45 67 89
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── sub-components ──────────────────────── */

function ExpertiseCard({ card, index }: { card: typeof expertiseCards[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.1 }}
      className="group bg-white rounded-2xl border border-neutral-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-350 flex flex-col overflow-hidden"
      style={{ borderTop: `3px solid ${card.color}` }}
    >
      <div className="p-8 flex flex-col flex-grow">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: `${card.color}10` }}
        >
          <Icon className="w-7 h-7" style={{ color: card.color }} />
        </div>

        {/* Title */}
        <h3 className="mt-5 font-outfit text-[22px] font-semibold text-neutral-800 leading-tight">
          {card.title}
        </h3>
        <p className="mt-1 font-inter text-[15px] text-neutral-400">{card.subtitle}</p>

        {/* Description */}
        <p className="mt-4 font-inter text-[15px] text-neutral-600 leading-relaxed">
          {card.description}
        </p>

        {/* Services */}
        <ul className="mt-4 space-y-2">
          {card.services.slice(0, 4).map((service) => (
            <li key={service} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-electric-blue mt-0.5 flex-shrink-0" />
              <span className="font-inter text-sm text-neutral-600">{service}</span>
            </li>
          ))}
        </ul>

        {/* Case Study */}
        <div className="mt-5 pt-5 border-t border-neutral-200">
          <p className="font-inter text-sm text-neutral-500 italic">{card.caseStudy.client}</p>
          <p className="mt-1 font-mono text-sm font-semibold" style={{ color: card.color === '#F59E0B' ? '#D97706' : card.color }}>
            {card.caseStudy.metric}
          </p>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            to={card.link}
            className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-electric-blue hover:underline underline-offset-4 transition-all"
          >
            En savoir plus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineStep({ step, index }: { step: typeof methodologySteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="relative text-center pt-12"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.2 }}
    >
      {/* Dot */}
      <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-electric-blue" />

      <span className="font-mono text-5xl font-bold text-electric-blue/30">{step.num}</span>
      <h4 className="mt-3 font-outfit text-xl font-semibold text-white">{step.title}</h4>
      <p className="mt-2 font-inter text-sm text-white/60 leading-relaxed max-w-[220px] mx-auto">
        {step.desc}
      </p>
    </motion.div>
  );
}

function MobileTimelineStep({ step, index }: { step: typeof methodologySteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="relative pb-10"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.2 }}
    >
      <div className="absolute top-[6px] left-[-21px] w-3 h-3 rounded-full bg-electric-blue" />
      <span className="font-mono text-3xl font-bold text-electric-blue/30">{step.num}</span>
      <h4 className="mt-2 font-outfit text-lg font-semibold text-white">{step.title}</h4>
      <p className="mt-1 font-inter text-sm text-white/60 leading-relaxed">{step.desc}</p>
    </motion.div>
  );
}

function SectorCard({ sector, index }: { sector: typeof sectorCards[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = sector.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.08 }}
      className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 text-center hover:border-electric-blue/30 hover:bg-electric-blue/5 transition-all duration-300 cursor-pointer group"
    >
      <Icon className="w-7 h-7 text-electric-blue mx-auto group-hover:scale-110 transition-transform duration-250" />
      <h3 className="mt-3 font-outfit text-base font-semibold text-white">{sector.title}</h3>
      <p className="mt-1.5 font-inter text-[13px] text-white/50 leading-relaxed">{sector.challenge}</p>
    </motion.div>
  );
}
