import { useState, useRef } from 'react';
import type { ComponentType } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Cloud, CheckCircle2, ArrowRight,
  LayoutGrid, Truck, Wallet, ShieldCheck, Cog,
  Server, Container, Zap, Network, BarChart3, Eye,
  MapPin
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

const tabs = [
  { id: 'architecture', label: 'Architecture Multi-Cloud', icon: LayoutGrid },
  { id: 'migration', label: 'Migration & Modernisation', icon: Truck },
  { id: 'finops', label: 'FinOps & Optimisation', icon: Wallet },
  { id: 'security', label: 'Sécurité Cloud', icon: ShieldCheck },
  { id: 'devops', label: 'DevOps Cloud', icon: Cog },
];

const tabContent: Record<string, { title: string; desc: string; points: { icon: ComponentType<{ className?: string }>; title: string; desc: string }[] }> = {
  architecture: {
    title: "Concevez l'Architecture de Demain",
    desc: "Nous concevons des architectures cloud natives, résilientes et évolutives. Notre approche Landing Zone garantit une gouvernance robuste dès le premier jour.",
    points: [
      { icon: LayoutGrid, title: 'Landing Zones', desc: 'Gouvernance, sécurité, réseau, comptes' },
      { icon: Container, title: 'Microservices & Containers', desc: 'Kubernetes, Docker, service mesh' },
      { icon: Zap, title: 'Serverless', desc: 'Lambda, Cloud Functions, Azure Functions' },
      { icon: Network, title: 'Event-Driven', desc: 'Kafka, EventBridge, Service Bus' },
      { icon: ShieldCheck, title: 'Résilience', desc: 'Multi-region, DR, backup strategies' },
      { icon: Eye, title: 'Observabilité', desc: 'Monitoring, logging, tracing' },
    ],
  },
  migration: {
    title: 'Migrez Sans Interruption de Service',
    desc: "Notre méthode de migration en 6 phases minimise les risques et garantit la continuité de service. 1,200+ workloads migrés avec 99.99% de succès.",
    points: [
      { icon: Server, title: 'Assessment', desc: 'Inventaire, dépendances, scoring' },
      { icon: MapPin, title: '6R Strategy', desc: 'Rehost, Replatform, Refactor, Repurchase, Retire, Retain' },
      { icon: Container, title: 'Pilot Migration', desc: 'Proof of concept, validation' },
      { icon: Zap, title: 'Execution', desc: 'Vague par vague, rollback plan' },
      { icon: BarChart3, title: 'Optimisation Post-Migration', desc: 'Right-sizing, reserved instances' },
      { icon: Cog, title: 'Knowledge Transfer', desc: 'Documentation, formation équipes' },
    ],
  },
  finops: {
    title: 'Maîtrisez Vos Coûts Cloud',
    desc: "Nos experts FinOps réduisent vos factures cloud de 30 à 40% en moyenne grâce à une optimisation continue et des outils de visibilité.",
    points: [
      { icon: LayoutGrid, title: 'Tagging & Allocation', desc: 'Attribution des coûts par projet/équipe' },
      { icon: Server, title: 'Reserved Instances', desc: 'Planification, achat optimisé' },
      { icon: Zap, title: 'Spot Instances', desc: 'Workloads stateless, réduction de 60-90%' },
      { icon: BarChart3, title: 'Right-Sizing', desc: 'Dimensionnement optimal des ressources' },
      { icon: Eye, title: 'Waste Detection', desc: 'Ressources orphelines, volumes inutilisés' },
      { icon: Network, title: 'Reporting', desc: 'Dashboards, alertes, budgets' },
    ],
  },
  security: {
    title: 'Sécurisez Votre Périmètre Cloud',
    desc: "Cloud Security Posture Management, IAM governance, encryption. Votre cloud, protégé par design.",
    points: [
      { icon: ShieldCheck, title: 'CSPM', desc: 'Cloud Security Posture Management (Wiz, Lacework)' },
      { icon: LayoutGrid, title: 'IAM Governance', desc: 'Least privilege, RBAC, PAM' },
      { icon: Lock, title: 'Encryption', desc: 'At-rest, in-transit, key management (KMS)' },
      { icon: Network, title: 'Network Security', desc: 'VPC, firewalls, WAF, DDoS protection' },
      { icon: CheckCircle2, title: 'Compliance Cloud', desc: 'CIS Benchmarks, SOC2, PCI-DSS' },
      { icon: Eye, title: 'Cloud SIEM', desc: 'Détection, réponse, forensics' },
    ],
  },
  devops: {
    title: 'Accélérez Vos Livraisons Cloud',
    desc: "Pipelines CI/CD, GitOps, infrastructure as code. Du commit au déploiement en production en moins de 15 minutes.",
    points: [
      { icon: Cog, title: 'CI/CD Pipelines', desc: 'GitLab CI, GitHub Actions, Azure DevOps' },
      { icon: GitBranch, title: 'GitOps', desc: 'ArgoCD, Flux, déclaratif' },
      { icon: Container, title: 'IaC', desc: 'Terraform, Pulumi, CloudFormation, Bicep' },
      { icon: Server, title: 'Container Registry', desc: 'Harbor, ECR, ACR, GCR' },
      { icon: Lock, title: 'Secret Management', desc: 'Vault, AWS Secrets Manager' },
      { icon: LayoutGrid, title: 'Platform Engineering', desc: 'Developer portals, self-service' },
    ],
  },
};

const certifications = [
  { platform: 'AWS', count: '85+', certs: ['Solutions Architect Pro', 'DevOps Engineer', 'Security Specialty'] },
  { platform: 'Microsoft Azure', count: '60+', certs: ['Solutions Architect Expert', 'DevOps Engineer Expert', 'Security Engineer'] },
  { platform: 'Google Cloud', count: '35+', certs: ['Professional Cloud Architect', 'Cloud Security Engineer', 'Data Engineer'] },
];

const caseStudies = [
  { img: '/case-study-bank.jpg', title: 'Grande Banque Française — Migration 800+ workloads vers AWS', metric: "-40% de coût d'infrastructure", tags: ['AWS', 'FinOps', 'Landing Zone'] },
  { img: '/case-study-energy.jpg', title: 'Opérateur Énergétique — Hybrid Cloud Azure/GCP', metric: '99.99% de disponibilité', tags: ['Azure', 'GCP', 'Kubernetes'] },
  { img: '/case-study-health.jpg', title: 'Groupe Hospitalier — Cloud Landing Zone Sécurisée', metric: 'Conforme HDS & RGPD', tags: ['AWS', 'Sécurité', 'Landing Zone'] },
];

const techStack = [
  { category: 'Cloud Providers', items: ['AWS', 'Azure', 'Google Cloud', 'OVHcloud', 'Scaleway'] },
  { category: 'Containers', items: ['Kubernetes', 'OpenShift', 'EKS', 'AKS', 'GKE', 'Docker'] },
  { category: 'IaC', items: ['Terraform', 'Pulumi', 'CloudFormation', 'Bicep', 'Ansible'] },
  { category: 'Observabilité', items: ['Prometheus', 'Grafana', 'Datadog', 'ELK', 'Jaeger'] },
];

const faqItems = [
  { q: "Quel cloud provider choisir pour mon entreprise ?", a: "Le choix dépend de votre écosystème existant, de vos contraintes de souveraineté et de vos objectifs de coût. Nos architectes réalisent un audit gratuit pour vous recommander la meilleure stratégie multi-cloud." },
  { q: "Combien de temps dure une migration cloud ?", a: "Cela dépend de la complexité de votre parc applicatif. Une migration pilote peut être réalisée en 4-6 semaines. Une migration complète de plusieurs centaines de workloads se fait généralement sur 6 à 12 mois." },
  { q: "Proposez-vous du FinOps ?", a: "Oui, nos experts FinOps accompagnent nos clients dans l'optimisation continue de leurs coûts cloud. En moyenne, nous réduisons les factures de 30 à 40% dans les 6 premiers mois." },
  { q: "Quelles certifications détiennent vos architectes ?", a: "Nos équipes cumulent plus de 180 certifications cloud : AWS Solutions Architect Professional, Azure Solutions Architect Expert, Google Cloud Professional Architect, et des spécialités Sécurité, Data, et DevOps." },
  { q: "Assurez-vous le support post-migration ?", a: "Absolument. Nous proposons des contrats de TMA (Tierce Maintenance Applicative) et de Run Cloud avec des SLA garantis. Nous formons également vos équipes pour l'autonomie." },
];

/* ──────────────────────── Lock icon helper ──────────────────────── */

function Lock({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function GitBranch({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="6" x2="6" y1="3" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

/* ──────────────────────── component ──────────────────────── */

export default function CloudInfrastructure() {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <div className="min-h-[100dvh]">
      {/* ══════════ Hero ══════════ */}
      <section className="relative min-h-[70vh] pt-[160px] pb-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute top-1/3 left-[30%] w-[400px] h-[400px] rounded-full bg-electric-blue/15 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              className="font-inter text-[13px] text-neutral-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Link to="/expertises" className="hover:text-electric-blue transition-colors">Expertises</Link>
              <span className="mx-2">/</span>
              <span>Cloud & Infrastructure</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <SectionLabel text="Cloud & Infrastructure" className="mt-4" />
            </motion.div>
            <motion.h1
              className="mt-4 font-outfit text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
            >
              Construisez un Cloud qui Scale avec Votre Ambition
            </motion.h1>
            <motion.p
              className="mt-6 font-inter text-lg text-white/75 max-w-xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.55 }}
            >
              Architecture multi-cloud, migration zero-downtime, FinOps. Nos architectes cloud certifiés AWS, Azure et GCP transforment votre infrastructure en levier de croissance.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all">
                Demander un audit cloud
              </Link>
              <a href="#case-studies" className="font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-electric-blue hover:bg-electric-blue/8 transition-all">
                Voir nos références cloud
              </a>
            </motion.div>
          </div>

          {/* Right - Architecture Visual */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.5 }}
          >
            <div className="glassmorphism rounded-2xl p-8 animate-float">
              <img
                src="/cloud-architecture.svg"
                alt="Architecture Cloud Multi-Provider"
                className="w-full max-w-md h-auto"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="grid grid-cols-3 gap-4 mt-6">
                {['AWS', 'Azure', 'GCP'].map((p) => (
                  <div key={p} className="text-center py-3 px-2 bg-white/[0.04] rounded-lg border border-white/[0.08]">
                    <Cloud className="w-6 h-6 text-electric-blue mx-auto" />
                    <span className="mt-1 block font-inter text-xs text-white/60">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ Service Tabs ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Services Cloud
          </h2>

          {/* Tab Headers */}
          <div className="flex flex-wrap gap-0 border-b border-neutral-200 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 font-inter text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-electric-blue border-electric-blue'
                      : 'text-neutral-600 border-transparent hover:text-neutral-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-outfit text-2xl font-semibold text-neutral-800 mb-3">
                {tabContent[activeTab].title}
              </h3>
              <p className="font-inter text-base text-neutral-600 mb-8 max-w-3xl">
                {tabContent[activeTab].desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tabContent[activeTab].points.map((pt, i) => {
                  const PtIcon = pt.icon;
                  return (
                    <motion.div
                      key={pt.title}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-electric-blue/10 flex items-center justify-center mb-4">
                        <PtIcon className="w-5 h-5 text-electric-blue" />
                      </div>
                      <h4 className="font-inter text-[15px] font-semibold text-neutral-800">{pt.title}</h4>
                      <p className="mt-1 font-inter text-[13px] text-neutral-400">{pt.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════ Certifications ══════════ */}
      <section className="py-20 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white">
              Nos Architectes sont Certifiés
            </h2>
            <p className="mt-3 font-inter text-lg text-white/70">180+ certifications cloud à votre service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.platform}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: easeOutExpo }}
                className="glassmorphism rounded-2xl p-8 text-center"
              >
                <Cloud className="w-12 h-12 text-electric-blue mx-auto" />
                <p className="mt-4 font-outfit text-lg font-semibold text-white">{cert.platform}</p>
                <p className="mt-2 font-mono text-4xl font-bold text-electric-blue">{cert.count}</p>
                <p className="font-inter text-sm text-white/50">certifications</p>
                <ul className="mt-5 space-y-2 text-left inline-block">
                  {cert.certs.map((c) => (
                    <li key={c} className="flex items-center gap-2 font-inter text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 text-success-green flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Architecture Showcase ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800">
              Architecture de Référence
            </h2>
            <p className="mt-3 font-inter text-lg text-neutral-600">
              Un exemple d&apos;architecture multi-cloud hybride pour une grande entreprise
            </p>
          </div>

          <motion.div
            className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-10"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <img
              src="/cloud-architecture.svg"
              alt="Architecture Multi-cloud"
              className="w-full h-auto max-w-4xl mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                const el = (e.target as HTMLImageElement).parentElement;
                if (el) {
                  el.innerHTML += ArchitectureFallback();
                }
              }}
            />
          </motion.div>

          {/* Architecture layers */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Presentation', items: 'CDN, WAF, LB' },
              { name: 'Application', items: 'EKS/AKS, APIs' },
              { name: 'Data', items: 'RDS, S3, Snowflake' },
              { name: 'Integration', items: 'Kafka, Events' },
              { name: 'Observabilité', items: 'Prometheus, ELK' },
              { name: 'Sécurité', items: 'Vault, IAM, SIEM' },
            ].map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl p-4 border border-neutral-200 text-center hover:border-electric-blue/30 hover:shadow-md transition-all"
              >
                <p className="font-outfit text-sm font-semibold text-neutral-800">{layer.name}</p>
                <p className="mt-1 font-inter text-xs text-neutral-400">{layer.items}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Case Studies ══════════ */}
      <section id="case-studies" className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Références Cloud" />
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10">
            Projets Cloud Marquants
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.title} cs={cs} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/etudes-de-cas"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-electric-blue hover:bg-electric-blue/8 transition-all"
            >
              Voir toutes nos références cloud
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ Tech Stack ══════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Notre Stack Cloud
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: easeOutExpo }}
                className="bg-white rounded-xl p-6 border border-neutral-200"
              >
                <h4 className="font-outfit text-lg font-semibold text-neutral-800 mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="font-inter text-xs font-medium text-electric-blue bg-electric-blue/10 border border-electric-blue/20 rounded-full px-3 py-1.5"
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
                className="border border-white/[0.08] rounded-xl px-6 bg-white/[0.02] data-[state=open]:border-electric-blue/30"
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
          <div className="w-[500px] h-[500px] rounded-full bg-electric-blue/20 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
            Démarrez Votre Transformation Cloud
          </h2>
          <p className="mt-4 font-inter text-lg text-white/75">
            Audit cloud gratuit — Notre équipe vous recontacte sous 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all">
              Demander mon audit
            </Link>
          </div>
          <p className="mt-4 font-inter text-[13px] text-white/50">
            Réponse garantie sous 24h ouvrables. Sans engagement.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── sub-components ──────────────────────── */

function CaseStudyCard({ cs, index }: { cs: typeof caseStudies[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.12 }}
      className="group bg-white/[0.04] border border-white/[0.08] rounded-2xl overflow-hidden hover:border-electric-blue/30 hover:shadow-glass transition-all duration-350"
    >
      <div className="h-44 overflow-hidden">
        <img
          src={cs.img}
          alt={cs.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="font-outfit text-lg font-semibold text-white leading-snug">{cs.title}</h3>
        <p className="mt-2 font-mono text-sm font-semibold text-success-green">{cs.metric}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {cs.tags.map((tag) => (
            <span key={tag} className="font-inter text-xs text-white/50 bg-white/[0.06] rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ArchitectureFallback() {
  return `
    <div class="grid grid-cols-3 gap-4 text-center py-8">
      <div class="p-4 bg-electric-blue/10 rounded-xl border border-electric-blue/20">
        <p class="font-outfit text-sm font-semibold text-electric-blue">AWS</p>
        <p class="font-inter text-xs text-neutral-500 mt-1">40% workloads</p>
      </div>
      <div class="p-4 bg-electric-blue/10 rounded-xl border border-electric-blue/20">
        <p class="font-outfit text-sm font-semibold text-electric-blue">Azure</p>
        <p class="font-inter text-xs text-neutral-500 mt-1">35% workloads</p>
      </div>
      <div class="p-4 bg-electric-blue/10 rounded-xl border border-electric-blue/20">
        <p class="font-outfit text-sm font-semibold text-electric-blue">GCP</p>
        <p class="font-inter text-xs text-neutral-500 mt-1">25% workloads</p>
      </div>
      <div class="col-span-3 p-4 bg-white/5 rounded-xl border border-white/10 mt-2">
        <p class="font-inter text-sm text-white/70">Kubernetes Orchestration Layer</p>
      </div>
      <div class="col-span-3 p-4 bg-white/5 rounded-xl border border-white/10">
        <p class="font-inter text-sm text-white/70">Shared Data Layer (S3 + Snowflake)</p>
      </div>
    </div>
  `;
}
