import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Shield, Search, FileCheck, Eye, Lock, Cloud,
  CheckCircle2, ChevronDown,
  ShieldCheck, BookOpen, Radio
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────── data ──────────────────────── */

const securityServices = [
  {
    icon: Search,
    title: 'Audit & Pentest',
    desc: "Tests d'intrusion, audit de configuration, revue de code sécurisé",
  },
  {
    icon: Shield,
    title: 'Zero Trust Architecture',
    desc: 'Segmentation réseau, identity-centric security, micro-segmentation',
  },
  {
    icon: FileCheck,
    title: 'Conformité & Gouvernance',
    desc: 'NIS2, RGPD, LPM, ISO 27001, SOC2, PCI-DSS',
  },
  {
    icon: Eye,
    title: 'SOC & Détection',
    desc: 'Security Operations Center 24/7, SIEM, XDR, threat hunting',
  },
  {
    icon: Lock,
    title: 'IAM & PAM',
    desc: 'Identity & Access Management, Privileged Access Management, SSO',
  },
  {
    icon: Cloud,
    title: 'Cloud Security',
    desc: 'CSPM, CWPP, CASB, sécurité multi-cloud',
  },
];

const zeroTrustLayers = [
  { id: 'identity', name: 'Identity', color: '#14B8A6', desc: 'MFA, conditional access, identity protection', components: ['Multi-Factor Authentication', 'Conditional Access Policies', 'Identity Protection', 'Risk-based Authentication'] },
  { id: 'network', name: 'Network', color: '#0D9488', desc: 'Segmentation, micro-segmentation, encryption', components: ['Network Segmentation', 'Micro-segmentation', 'TLS 1.3 Encryption', 'Zero Trust Network Access'] },
  { id: 'compute', name: 'Compute', color: '#0F766E', desc: 'Hardening, EDR/XDR, vulnerability management', components: ['OS Hardening', 'EDR / XDR', 'Vulnerability Management', 'Container Security'] },
  { id: 'applications', name: 'Applications', color: '#115E59', desc: 'App-level security, secrets management, API security', components: ['Application-level Security', 'Secrets Management (Vault)', 'API Security Gateway', 'SAST/DAST'] },
  { id: 'data', name: 'Data', color: '#134E4A', desc: 'Encryption, classification, DLP', components: ['Data Classification', 'Encryption at Rest & Transit', 'DLP (Data Loss Prevention)', 'Database Activity Monitoring'] },
];

const nis2Checklist = [
  'Cartographie des actifs et risques',
  'Plan de gestion des incidents',
  'Tests de sécurité réguliers (pentest)',
  'Chiffrement des données sensibles',
  'Gestion des vulnérabilités',
  'Authentification multi-facteur (MFA)',
  'Sauvegardes et plan de reprise',
  'Formation des équipes',
  'Supply chain security',
  'Reporting aux autorités',
];

const nis2Services = [
  { icon: Search, title: 'Audit NIS2', desc: 'Évaluation de conformité, gap analysis' },
  { icon: ShieldCheck, title: 'Implementation', desc: 'Mise en oeuvre des mesures techniques' },
  { icon: Radio, title: 'SOC Managed', desc: 'Security Operations Center 24/7' },
  { icon: BookOpen, title: 'Formation', desc: 'Sensibilisation et certification des équipes' },
];

const caseStudies = [
  { title: 'Opérateur Énergétique — Déploiement Zero Trust', metric: '100% conforme NIS2', tags: ['Zero Trust', 'CrowdStrike'] },
  { title: 'Banque — SOC 24/7 et Threat Intelligence', metric: "-85% de temps de détection", tags: ['Splunk', 'Cortex XDR'] },
  { title: 'Groupe Hospitalier — Conformité RGPD & HDS', metric: '0 non-conformité lors de l\'audit', tags: ['ISO 27001', 'RGPD'] },
];

const securityStack = [
  { category: 'Endpoint Security', items: ['CrowdStrike', 'SentinelOne', 'Microsoft Defender'] },
  { category: 'Cloud Security', items: ['Wiz', 'Lacework', 'Prisma Cloud', 'Orca'] },
  { category: 'SIEM/XDR', items: ['Splunk', 'Elastic Security', 'Microsoft Sentinel', 'Palo Alto Cortex'] },
  { category: 'IAM', items: ['Okta', 'Azure AD', 'CyberArk', 'HashiCorp Vault'] },
];

const faqItems = [
  { q: "Qu'est-ce que la directive NIS2 ?", a: "NIS2 (Network and Information Security 2) est la directive européenne qui renforce les obligations de cybersécurité pour les entreprises critiques et importantes. Elle s'applique à partir d'octobre 2024 en France via la transposition LNIS." },
  { q: "Proposez-vous un SOC 24/7 ?", a: "Oui, notre SOC managed assure une surveillance 24/7 de votre périmètre. Détection, analyse, réponse — nos analystes SOC gèrent l'intégralité du cycle de vie des incidents." },
  { q: "Quelle est votre approche Zero Trust ?", a: "Nous implémentons Zero Trust selon le framework Microsoft : vérifier explicitement, utiliser le moindre privilège, supposer la violation. Chaque composant est vérifié et segmenté." },
  { q: "Assurez-vous la conformité RGPD ?", a: "Oui, nos experts DPO et sécurité accompagnent les entreprises dans la mise en conformité RGPD : DPIA, registre des traitements, PIA, mesures techniques et organisationnelles." },
  { q: "Combien de temps dure un audit de sécurité ?", a: "Un audit de sécurité classique dure 2 à 4 semaines selon la taille du périmètre. Nous délivrons un rapport détaillé avec un plan d'action priorisé." },
];

/* ──────────────────────── component ──────────────────────── */

export default function Cybersecurity() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="min-h-[100dvh]">
      {/* ══════════ Hero ══════════ */}
      <section className="relative min-h-[70vh] pt-[160px] pb-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute top-1/3 left-[50%] w-[400px] h-[400px] rounded-full bg-cyber-teal/15 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              className="font-inter text-[13px] text-neutral-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Link to="/expertises" className="hover:text-electric-blue transition-colors">Expertises</Link>
              <span className="mx-2">/</span>
              <span>Cybersécurité</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <SectionLabel text="Cybersécurité" className="mt-4" />
            </motion.div>
            <motion.h1
              className="mt-4 font-outfit text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
            >
              Votre Sécurité, Notre Priorité Absolue
            </motion.h1>
            <motion.p
              className="mt-6 font-inter text-lg text-white/75 max-w-xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.55 }}
            >
              Audit, Zero Trust, conformité NIS2/RGPD, SOC. Nos experts sécurité protègent vos actifs numériques avec les standards les plus exigeants du marché.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-cyber-teal rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] hover:brightness-110 active:translate-y-0 transition-all">
                Demander un audit de sécurité
              </Link>
              <a href="#nis2" className="font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-cyber-teal hover:bg-cyber-teal/8 transition-all">
                Conformité NIS2
              </a>
            </motion.div>
          </div>

          {/* Right - Zero Trust Visual */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.5 }}
          >
            <div className="glassmorphism rounded-2xl p-8 animate-float relative">
              <img
                src="/cybersecurity-zero-trust.svg"
                alt="Zero Trust Architecture"
                className="w-full max-w-sm h-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Fallback concentric rings */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {zeroTrustLayers.map((layer, i) => {
                    const size = 100 - i * 16;
                    return (
                      <div
                        key={layer.id}
                        className="absolute rounded-full border-2 flex items-center justify-center transition-all hover:scale-105"
                        style={{
                          width: `${size}%`,
                          height: `${size}%`,
                          top: `${(100 - size) / 2}%`,
                          left: `${(100 - size) / 2}%`,
                          borderColor: layer.color,
                          backgroundColor: `${layer.color}15`,
                        }}
                      >
                        {i === 4 && <span className="font-inter text-[9px] font-semibold text-white">{layer.name}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ Security Services ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Nos Services de Cybersécurité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityServices.map((svc, i) => (
              <SecurityServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Zero Trust Architecture ══════════ */}
      <section className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-4 text-center">
            Zero Trust : Ne Faites Confiance à Personne
          </h2>
          <p className="font-inter text-lg text-white/70 text-center max-w-3xl mx-auto mb-12">
            Le modèle Zero Trust remplace le périmètre de confiance traditionnel par une vérification continue de chaque accès, quelle que soit l&apos;origine.
          </p>

          {/* Interactive Zero Trust Diagram */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Concentric rings */}
            <div className="flex-shrink-0">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                {[...zeroTrustLayers].reverse().map((layer, i) => {
                  const size = 100 - i * 16;
                  const isActive = activeLayer === layer.id || activeLayer === null;
                  return (
                    <motion.button
                      key={layer.id}
                      className="absolute rounded-full border-2 flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        width: `${size}%`,
                        height: `${size}%`,
                        top: `${(100 - size) / 2}%`,
                        left: `${(100 - size) / 2}%`,
                        borderColor: isActive ? layer.color : `${layer.color}40`,
                        backgroundColor: isActive ? `${layer.color}20` : `${layer.color}08`,
                      }}
                      onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      {i === 4 && (
                        <span className="font-inter text-xs font-semibold text-white">{layer.name}</span>
                      )}
                    </motion.button>
                  );
                })}

                {/* Pulsing outer glow */}
                <div
                  className="absolute inset-0 rounded-full animate-pulse-glow pointer-events-none"
                  style={{ boxShadow: '0 0 60px rgba(20,184,166,0.2)' }}
                />
              </div>
            </div>

            {/* Layer details */}
            <div className="flex-1 max-w-xl">
              <div className="space-y-3">
                {zeroTrustLayers.map((layer, i) => (
                  <motion.button
                    key={layer.id}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      activeLayer === layer.id
                        ? 'bg-cyber-teal/15 border-cyber-teal/40'
                        : 'bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]'
                    }`}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: layer.color }}
                        />
                        <span className="font-outfit text-base font-semibold text-white">{layer.name}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${activeLayer === layer.id ? 'rotate-180' : ''}`} />
                    </div>
                    {activeLayer === layer.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pl-6"
                      >
                        <p className="font-inter text-sm text-white/60 mb-2">{layer.desc}</p>
                        <ul className="space-y-1">
                          {layer.components.map((c) => (
                            <li key={c} className="flex items-center gap-2 font-inter text-xs text-white/50">
                              <CheckCircle2 className="w-3 h-3 text-cyber-teal" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ NIS2 Compliance ══════════ */}
      <section id="nis2" className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <SectionLabel text="Conformité Réglementaire" />
          </div>
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Conformité NIS2 : Agissez Maintenant
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left - Checklist */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-8">
              <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-6">
                Votre Roadmap NIS2
              </h3>
              <div className="w-full h-2 bg-neutral-100 rounded-full mb-6 overflow-hidden">
                <motion.div
                  className="h-full bg-cyber-teal rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: easeOutExpo, delay: 0.3 }}
                />
              </div>
              <ul className="space-y-3">
                {nis2Checklist.map((item, i) => (
                  <NIS2ChecklistItem key={item} item={item} index={i} />
                ))}
              </ul>
            </div>

            {/* Right - Services */}
            <div>
              <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-6">
                Comment NexusOne Vous Accompagne
              </h3>
              <div className="space-y-4">
                {nis2Services.map((svc, i) => (
                  <motion.div
                    key={svc.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: easeOutExpo }}
                    className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-cyber-teal/10 flex items-center justify-center flex-shrink-0">
                      <svc.icon className="w-5 h-5 text-cyber-teal" />
                    </div>
                    <div>
                      <h4 className="font-outfit text-base font-semibold text-neutral-800">{svc.title}</h4>
                      <p className="mt-1 font-inter text-sm text-neutral-600">{svc.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ Case Studies ══════════ */}
      <section className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10">
            Projets Sécurité Marquants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.title} cs={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Security Stack ══════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Notre Stack Sécurité
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityStack.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: easeOutExpo }}
                className="bg-white rounded-xl p-6 border border-neutral-200"
              >
                <h4 className="font-outfit text-lg font-semibold text-neutral-800 mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="font-inter text-xs font-medium text-cyber-teal bg-cyber-teal/10 border border-cyber-teal/20 rounded-full px-3 py-1.5"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-20 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10 text-center">
            Questions Fréquentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-white/[0.08] rounded-xl px-6 bg-white/[0.02] data-[state=open]:border-cyber-teal/30"
              >
                <AccordionTrigger className="font-inter text-base font-medium text-white hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-[15px] text-white/70 pb-5 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ══════════ CTA Banner ══════════ */}
      <section className="relative py-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-cyber-teal/20 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
            Sécurisez Votre Entreprise Dès Aujourd&apos;hui
          </h2>
          <p className="mt-4 font-inter text-lg text-white/75">
            Audit de sécurité gratuit — Notre RSSI vous recontacte sous 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-cyber-teal rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] hover:brightness-110 active:translate-y-0 transition-all">
              Demander un audit de sécurité
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-1.5 font-inter text-sm text-white/60 bg-white/[0.06] rounded-full px-4 py-2">
              <ShieldCheck className="w-4 h-4 text-success-green" /> ISO 27001 certifié
            </span>
            <span className="inline-flex items-center gap-1.5 font-inter text-sm text-white/60 bg-white/[0.06] rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-cyber-teal" /> France Cybersecurity
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── sub-components ──────────────────────── */

function SecurityServiceCard({ svc, index }: { svc: typeof securityServices[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = svc.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-350"
      style={{ borderTop: '3px solid #14B8A6' }}
    >
      <Icon className="w-8 h-8 text-cyber-teal" />
      <h3 className="mt-5 font-outfit text-xl font-semibold text-neutral-800">{svc.title}</h3>
      <p className="mt-2 font-inter text-[15px] text-neutral-600">{svc.desc}</p>
    </motion.div>
  );
}

function NIS2ChecklistItem({ item, index }: { item: string; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.li
      ref={ref}
      className="flex items-center gap-3"
      initial={{ opacity: 0, x: -15 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: easeOutExpo, delay: index * 0.08 }}
    >
      <CheckCircle2 className="w-5 h-5 text-cyber-teal flex-shrink-0" />
      <span className="font-inter text-[15px] text-neutral-700">{item}</span>
    </motion.li>
  );
}

function CaseStudyCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.12 }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:border-cyber-teal/30 hover:shadow-glass transition-all duration-350"
    >
      <h3 className="font-outfit text-lg font-semibold text-white leading-snug">{cs.title}</h3>
      <p className="mt-3 font-mono text-sm font-semibold text-success-green">{cs.metric}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {cs.tags.map((tag) => (
          <span key={tag} className="font-inter text-xs text-white/50 bg-white/[0.06] rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
