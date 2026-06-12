import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Briefcase, Code, Cloud, Brain, Shield, Database, GitBranch,
  ArrowRight, GraduationCap, TrendingUp, Globe, Wallet, CheckCircle2,
  ExternalLink
} from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ImpactCounter from '../components/ImpactCounter';
import ClientLogoMarquee from '../components/ClientLogoMarquee';
import TestimonialCard from '../components/TestimonialCard';

gsap.registerPlugin(ScrollTrigger);

/* ─── Floating Particles Component (isolated for perf) ─── */
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-electric-blue"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
            animation: `particle-float ${Math.random() * 20 + 25}s linear infinite`,
            animationDelay: `${Math.random() * 20}s`,
          }}
        />
      ))}
    </div>
  );
};

/* ─── Hero Section ─── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden aurora-gradient"
    >
      <div className="tech-mesh-gradient absolute inset-0" />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
          className="font-outfit text-4xl sm:text-5xl lg:text-7xl font-bold text-white max-w-[800px] mx-auto leading-[1.1] tracking-tight"
          style={{ textShadow: '0 2px 40px rgba(0,85,255,0.2)' }}
        >
          L'Excellence IT qui Propulse Votre Transformation Digitale
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={heroLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.5 }}
          className="mt-5 font-inter text-lg text-white/75 max-w-[600px] mx-auto leading-relaxed"
        >
          Pionniers du conseil IT et de l'ingénierie logicielle depuis 2008. Plus de 650 experts passionnés au service de votre transformation digitale.
        </motion.p>

        {/* Bifurcated Cards */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {/* Card A — Client Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={heroLoaded ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.7 }}
          >
            <Link
              to="/expertises"
              className="group block text-left rounded-2xl p-8 md:p-10 bg-white/[0.04] border border-white/[0.1] transition-all duration-350 hover:border-electric-blue/40 hover:shadow-[0_8px_32px_rgba(0,85,255,0.15)] hover:-translate-y-1"
            >
              <Briefcase className="w-8 h-8 text-electric-blue mb-5" />
              <h3 className="font-outfit text-2xl font-semibold text-white">
                Vous cherchez un partenaire IT ?
              </h3>
              <p className="mt-3 font-inter text-[15px] text-neutral-400 leading-relaxed">
                Cloud, Data, Cybersécurité, DevOps — nos équipes d'experts accélèrent votre transformation digitale.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-electric-blue text-white font-inter text-sm font-semibold rounded-lg px-6 py-3 group-hover:-translate-y-0.5 group-hover:shadow-blue-glow transition-all">
                Découvrir nos expertises
                <ArrowRight className="w-4 h-4" />
              </div>
              <img
                src="/bifurcation-clients.jpg"
                alt="Client journey"
                className="absolute bottom-4 right-4 w-[200px] rounded-xl opacity-0 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-400 hidden lg:block"
              />
            </Link>
          </motion.div>

          {/* Card B — Candidate Journey */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={heroLoaded ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.85 }}
          >
            <Link
              to="/carrieres"
              className="group block text-left rounded-2xl p-8 md:p-10 bg-electric-blue/[0.08] border border-electric-blue/20 transition-all duration-350 hover:border-success-green/40 hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] hover:-translate-y-1"
            >
              <Code className="w-8 h-8 text-success-green mb-5" />
              <h3 className="font-outfit text-2xl font-semibold text-white">
                Vous cherchez votre prochain défi tech ?
              </h3>
              <p className="mt-3 font-inter text-[15px] text-neutral-400 leading-relaxed">
                Rejoignez 650+ passionnés. Formations, certifications, projets challengeants — construisez votre carrière tech avec nous.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 bg-success-green text-white font-inter text-sm font-semibold rounded-lg px-6 py-3 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all">
                Rejoindre l'équipe
                <ArrowRight className="w-4 h-4" />
              </div>
              <img
                src="/bifurcation-candidates.jpg"
                alt="Candidate journey"
                className="absolute bottom-4 right-4 w-[200px] rounded-xl opacity-0 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-400 hidden lg:block"
              />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-6 h-6 text-white/40 animate-scroll-down" />
      </motion.div>
    </section>
  );
}

/* ─── Impact Metrics Section ─── */
function ImpactMetricsSection() {
  return (
    <section className="py-20 md:py-24 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <SectionLabel text="Nos Chiffres Clés" className="justify-center" />
        </div>
        <ImpactCounter
          metrics={[
            { number: '650+', label: 'Consultants & Experts' },
            { number: '1,200+', label: 'Projets Livrés' },
            { number: '18', label: 'Années d\'Expérience' },
            { number: '45+', label: 'Certifications Cloud & Sécurité' },
          ]}
        />
      </div>
    </section>
  );
}

/* ─── Client Logo Marquee Section ─── */
function ClientMarqueeSection() {
  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <p className="font-inter text-xs font-semibold uppercase tracking-[0.08em] text-neutral-400 text-center">
          Ils nous font confiance
        </p>
      </div>
      <ClientLogoMarquee />
    </section>
  );
}

/* ─── Expertises Section ─── */
const expertises = [
  { icon: Cloud, title: 'Cloud & Infrastructure', desc: 'Architecture multi-cloud, migration, FinOps, infrastructure as code', color: 'text-electric-blue', bg: 'bg-electric-blue/10', borderHover: 'hover:border-electric-blue/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(0,85,255,0.08)]', link: '/expertises/cloud-infrastructure', cases: '24 études de cas' },
  { icon: Code, title: 'Software Development', desc: 'Applications sur mesure, APIs, microservices, frontend modernes', color: 'text-tech-purple', bg: 'bg-tech-purple/10', borderHover: 'hover:border-tech-purple/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)]', link: '/expertises/software-development', cases: '31 études de cas' },
  { icon: Brain, title: 'Data & IA', desc: 'Data engineering, MLops, business intelligence, IA générative', color: 'text-tech-purple', bg: 'bg-tech-purple/10', borderHover: 'hover:border-tech-purple/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(124,58,237,0.08)]', link: '/expertises/data-ia', cases: '19 études de cas' },
  { icon: Shield, title: 'Cybersécurité', desc: 'Audit, Zero Trust, conformité NIS2/RGPD, SOC', color: 'text-cyber-teal', bg: 'bg-cyber-teal/10', borderHover: 'hover:border-cyber-teal/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(20,184,166,0.08)]', link: '/expertises/cybersecurite', cases: '16 études de cas' },
  { icon: Database, title: 'ERP & CRM', desc: 'Salesforce, SAP, Microsoft Dynamics, intégration', color: 'text-alert-orange', bg: 'bg-alert-orange/10', borderHover: 'hover:border-alert-orange/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(245,158,11,0.08)]', link: '/expertises', cases: '12 études de cas' },
  { icon: GitBranch, title: 'DevOps & Agilité', desc: 'CI/CD, Kubernetes, Scrum, platform engineering', color: 'text-success-green', bg: 'bg-success-green/10', borderHover: 'hover:border-success-green/30', shadowHover: 'hover:shadow-[0_8px_32px_rgba(16,185,129,0.08)]', link: '/expertises', cases: '28 études de cas' },
];

function ExpertisesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.expertise-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 aurora-gradient overflow-hidden">
      <div className="tech-mesh-gradient absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-12"
        >
          <SectionLabel text="Nos Expertises" />
          <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-white leading-tight">
            Six Piliers de l'Excellence Technologique
          </h2>
          <p className="mt-4 font-inter text-lg text-white/70 max-w-[600px] leading-relaxed">
            De la stratégie à l'exécution, nos équipes couvrent l'ensemble du spectre IT pour accélérer votre transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertises.map((ex) => (
            <Link
              key={ex.title}
              to={ex.link}
              className={`expertise-card group block rounded-xl p-8 bg-white/[0.03] border border-white/[0.08] transition-all duration-350 hover:-translate-y-1 ${ex.borderHover} ${ex.shadowHover}`}
            >
              <div className={`w-14 h-14 rounded-full ${ex.bg} flex items-center justify-center mb-5 transition-all group-hover:scale-105`}>
                <ex.icon className={`w-7 h-7 ${ex.color}`} />
              </div>
              <h3 className="font-outfit text-xl font-semibold text-white">{ex.title}</h3>
              <p className="mt-2 font-inter text-[15px] text-white/60 leading-relaxed">{ex.desc}</p>
              <p className={`mt-4 font-inter text-sm ${ex.color}`}>{ex.cases}</p>
              <div className="mt-5 flex items-center gap-1 text-white group-hover:gap-2 transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/expertises"
            className="inline-flex items-center gap-2 bg-electric-blue text-white font-inter text-sm font-semibold rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 transition-all"
          >
            Explorer toutes nos expertises
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech Stack Visualizer ─── */
const techTabs = [
  { id: 'cloud', label: 'Cloud', items: ['AWS', 'Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'OpenShift', 'VMware'] },
  { id: 'languages', label: 'Langages', items: ['Java', 'Python', 'TypeScript', 'Go', 'Rust', 'C#', 'Kotlin', 'Scala', 'PHP'] },
  { id: 'data', label: 'Data/ML', items: ['Snowflake', 'Databricks', 'TensorFlow', 'PyTorch', 'Apache Spark', 'Kafka', 'dbt', 'Airflow'] },
  { id: 'devops', label: 'DevOps', items: ['GitLab CI', 'Jenkins', 'GitHub Actions', 'ArgoCD', 'Helm', 'Prometheus', 'Grafana', 'Vault'] },
  { id: 'security', label: 'Cybersécurité', items: ['CrowdStrike', 'SentinelOne', 'Wiz', 'Lacework', 'Splunk', 'Elastic SIEM', 'Tenable'] },
  { id: 'frontend', label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Angular', 'Tailwind CSS', 'Figma', 'Storybook'] },
];

function TechStackSection() {
  const [activeTab, setActiveTab] = useState('cloud');
  const currentItems = techTabs.find((t) => t.id === activeTab)?.items ?? [];

  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-10"
        >
          <SectionLabel text="Notre Stack Technologique" className="justify-center" />
          <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-neutral-800 leading-tight">
            Des Technologies de Pointe pour des Résultats d'Excellence
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-1 mb-10 bg-white rounded-xl p-1.5 shadow-sm border border-neutral-200 max-w-fit mx-auto">
          {techTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-inter text-sm font-medium px-5 py-2.5 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'text-electric-blue bg-electric-blue/10'
                  : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tags */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {currentItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="group flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-5 py-2.5 cursor-default hover:border-electric-blue hover:shadow-[0_2px_8px_rgba(0,85,255,0.1)] hover:-translate-y-0.5 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-electric-blue" />
                <span className="font-mono text-sm font-medium text-neutral-800">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Case Studies Section ─── */
const caseStudies = [
  {
    image: '/case-study-bank.jpg',
    category: 'Cloud & Infrastructure',
    categoryColor: 'text-electric-blue bg-electric-blue/10 border-electric-blue/20',
    title: 'Grande Banque Française — Migration Cloud Complète',
    metric: '-40% de coût d\'infrastructure',
    link: '/etudes-de-cas',
  },
  {
    image: '/case-study-health.jpg',
    category: 'Data & IA',
    categoryColor: 'text-tech-purple bg-tech-purple/10 border-tech-purple/20',
    title: 'Groupe Hospitalier — Plateforme Data Prédictive',
    metric: '+35% d\'efficacité opérationnelle',
    link: '/etudes-de-cas',
  },
  {
    image: '/case-study-energy.jpg',
    category: 'Cybersécurité',
    categoryColor: 'text-cyber-teal bg-cyber-teal/10 border-cyber-teal/20',
    title: 'Opérateur Énergétique — Déploiement Zero Trust',
    metric: '100% conforme NIS2',
    link: '/etudes-de-cas',
  },
];

function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.case-card');
    gsap.from(cards, {
      y: 40,
      opacity: 0,
      scale: 0.97,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 aurora-gradient">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel text="Nos Références" />
            <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-white leading-tight">
              Résultats Concrets, Impact Mesurable
            </h2>
          </motion.div>
          <Link
            to="/etudes-de-cas"
            className="mt-4 md:mt-0 font-inter text-sm text-electric-blue hover:underline underline-offset-4 transition-all"
          >
            Voir toutes les études de cas &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.title}
              to={cs.link}
              className="case-card group block rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all duration-350 hover:border-electric-blue/25 hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7">
                <span className={`inline-block font-inter text-xs font-medium px-3 py-1 rounded-full border ${cs.categoryColor}`}>
                  {cs.category}
                </span>
                <h3 className="mt-3 font-outfit text-lg font-semibold text-white leading-snug">
                  {cs.title}
                </h3>
                <p className="mt-3 font-mono text-base text-success-green font-medium">
                  {cs.metric}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-inter text-sm text-electric-blue group-hover:gap-2 transition-all">
                  Lire l'étude de cas <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials Section ─── */
const clientTestimonials = [
  { quote: 'NexusOne a transformé notre infrastructure cloud en 6 mois. Leur expertise technique et leur agilité sont exceptionnelles.', name: 'Thomas D.', role: 'DSI', company: 'Grande Banque Française', avatar: '/avatar-1.jpg' },
  { quote: 'Une équipe qui comprend vraiment les enjeux de la cybersécurité dans le secteur de l\'énergie. Partenaire de confiance.', name: 'Marie L.', role: 'RSSI', company: 'Opérateur Énergétique Majeur', avatar: '/avatar-2.jpg' },
  { quote: 'Leur approche Data/IA nous a permis de réduire nos coûts de maintenance prédictive de 30%.', name: 'Pierre R.', role: 'Directeur Digital', company: 'Groupe Industriel CAC40', avatar: '/avatar-3.jpg' },
];

const consultantTestimonials = [
  { quote: 'J\'ai rejoint NexusOne il y a 3 ans. Les formations, les certifications, les projets challenges — tout est là pour faire grandir votre carrière.', name: 'Sarah M.', role: 'Lead DevOps Cloud', company: '3 ans', avatar: '/avatar-4.jpg' },
  { quote: 'Enfin une ESN qui met vraiment le consultant au centre. La transparence sur les projets et les rémunérations, c\'est rafraichissant.', name: 'Karim B.', role: 'Data Engineer', company: '2 ans', avatar: '/avatar-5.jpg' },
  { quote: 'L\'ambiance tech est incroyable. Les communautés de pratique, les brown bags tech, les labs d\'innovation — on apprend tous les jours.', name: 'Lucie A.', role: 'Architecte Cloud Senior', company: '4 ans', avatar: '/avatar-6.jpg' },
];

function TestimonialsSection() {
  const [activeTab, setActiveTab] = useState<'clients' | 'consultants'>('clients');
  const testimonials = activeTab === 'clients' ? clientTestimonials : consultantTestimonials;

  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-8"
        >
          <SectionLabel text="Témoignages" className="justify-center" />
          <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-neutral-800 leading-tight">
            Ce Qu'ils Disent de Nous
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-10 bg-white rounded-xl p-1.5 shadow-sm border border-neutral-200 max-w-fit mx-auto">
          <button
            onClick={() => setActiveTab('clients')}
            className={`font-inter text-sm font-medium px-5 py-2.5 rounded-lg transition-all ${
              activeTab === 'clients'
                ? 'text-electric-blue bg-electric-blue/10'
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('consultants')}
            className={`font-inter text-sm font-medium px-5 py-2.5 rounded-lg transition-all ${
              activeTab === 'consultants'
                ? 'text-electric-blue bg-electric-blue/10'
                : 'text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100'
            }`}
          >
            Consultants
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.name + activeTab}
                quote={t.quote}
                name={t.name}
                role={t.role}
                company={t.company}
                avatar={t.avatar}
                variant="light"
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Careers Preview Section ─── */
const benefits = [
  { icon: GraduationCap, text: 'Budget formation : 3,000 EUR/an' },
  { icon: TrendingUp, text: 'Plan de carrière personnalisé' },
  { icon: Globe, text: 'Projets internationaux' },
  { icon: Wallet, text: 'Rémunération transparente' },
];

function CareersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll('.benefit-item');
    gsap.from(items, {
      x: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 aurora-gradient overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel text="Carrières" />
            <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-white leading-tight">
              Rejoignez les Meilleurs Talents Tech
            </h2>
            <p className="mt-4 font-inter text-lg text-white/70 max-w-[480px] leading-relaxed">
              Formations, certifications, projets internationaux, rémunération transparente — découvrez pourquoi 650+ consultants ont choisi NexusOne.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {benefits.map((b) => (
                <div key={b.text} className="benefit-item flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0" />
                  <span className="font-inter text-[15px] text-white/85">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/carrieres"
                className="inline-flex items-center gap-2 bg-success-green text-white font-inter text-sm font-semibold rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
              >
                Voir nos offres d'emploi
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/a-propos"
                className="inline-flex items-center gap-2 font-inter text-sm font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-electric-blue hover:bg-electric-blue/8 transition-all"
              >
                Notre culture tech
              </Link>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/team-culture-1.jpg"
                alt="NexusOne team culture"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Partners & Certifications Section ─── */
const partners = [
  { name: 'AWS Partner Network', badge: 'AWS Advanced Tier' },
  { name: 'Microsoft Azure', badge: 'Solutions Partner' },
  { name: 'Google Cloud', badge: 'Premier Partner' },
  { name: 'Salesforce', badge: 'Consulting Partner' },
  { name: 'SAP', badge: 'Silver Partner' },
];

function PartnersSection() {
  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <SectionLabel text="Partenaires & Certifications" className="justify-center" />
          <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-neutral-800 leading-tight">
            Certifiés par les Leaders du Cloud
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {partners.map((p) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col items-center p-6 bg-white rounded-xl border border-neutral-200 hover:border-electric-blue/30 hover:shadow-[0_4px_16px_rgba(0,85,255,0.08)] hover:-translate-y-1 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-electric-blue/5 flex items-center justify-center mb-4 group-hover:bg-electric-blue/10 transition-colors">
                <Cloud className="w-8 h-8 text-electric-blue" />
              </div>
              <span className="font-outfit text-sm font-semibold text-neutral-800 text-center">{p.name}</span>
              <span className="mt-1 font-inter text-xs text-neutral-400 text-center">{p.badge}</span>
            </motion.div>
          ))}
        </div>

        {/* Certification badges row */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {['ISO 27001', 'ISO 9001', 'SOC 2 Type II', 'RGPD', 'NIS2'].map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-neutral-200 font-inter text-xs font-medium text-neutral-600"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-success-green" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Blog Preview Section ─── */
const blogPosts = [
  {
    image: '/event-webinar-1.jpg',
    category: 'Cloud',
    title: 'Kubernetes en Production : Retour d\'Expérience d\'une Migration à Grande Échelle',
    excerpt: 'Comment nous avons migré 200+ microservices vers Kubernetes en 6 mois avec zéro downtime.',
    date: '15 Jan 2026',
    link: '/blog',
  },
  {
    image: '/event-webinar-2.jpg',
    category: 'Cybersécurité',
    title: 'NIS2 : Comment Préparer Votre Organisation à la Nouvelle Directive Européenne',
    excerpt: 'Les étapes clés pour atteindre la conformité NIS2 avant l\'échéance de 2026.',
    date: '8 Jan 2026',
    link: '/blog',
  },
  {
    image: '/case-study-bank.jpg',
    category: 'Data & IA',
    title: 'IA Générative en Entreprise : 5 Cas d\'Usage Concrets et Leur ROI',
    excerpt: "De l'automatisation documentaire au support client, découvrez comment l'IA générative transforme nos clients.",
    date: '2 Jan 2026',
    link: '/blog',
  },
];

function BlogSection() {
  return (
    <section className="py-24 md:py-32 aurora-gradient">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel text="Blog" />
            <h2 className="font-outfit text-3xl md:text-[42px] font-semibold text-white leading-tight">
              Nos Derniers Articles
            </h2>
          </motion.div>
          <Link
            to="/blog"
            className="mt-4 md:mt-0 font-inter text-sm text-electric-blue hover:underline underline-offset-4 transition-all"
          >
            Voir tous les articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              to={post.link}
              className="group block rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all duration-350 hover:border-electric-blue/25 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-inter text-xs font-medium text-electric-blue bg-electric-blue/10 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="font-inter text-xs text-neutral-400">{post.date}</span>
                </div>
                <h3 className="font-outfit text-base font-semibold text-white leading-snug group-hover:text-electric-blue transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 font-inter text-sm text-neutral-400 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-inter text-sm text-electric-blue group-hover:gap-2 transition-all">
                  Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA Section ─── */
function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 bg-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h2 className="font-outfit text-3xl md:text-5xl font-bold text-neutral-800 leading-tight">
            Prêt à Accélérer Votre Transformation Digitale ?
          </h2>
          <p className="mt-4 font-inter text-lg text-neutral-600 max-w-[600px] mx-auto">
            Que vous soyez un client à la recherche d'expertise IT ou un talent cherchant votre prochain défi, NexusOne vous accompagne.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-electric-blue text-white font-inter text-sm font-semibold rounded-lg px-8 py-4 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 transition-all"
            >
              Nous Contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/carrieres"
              className="inline-flex items-center gap-2 bg-success-green text-white font-inter text-sm font-semibold rounded-lg px-8 py-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
            >
              Rejoindre l'Équipe
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Home Page ─── */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <ImpactMetricsSection />
      <ClientMarqueeSection />
      <ExpertisesSection />
      <TechStackSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <CareersSection />
      <PartnersSection />
      <BlogSection />
      <FinalCTASection />
    </div>
  );
}
