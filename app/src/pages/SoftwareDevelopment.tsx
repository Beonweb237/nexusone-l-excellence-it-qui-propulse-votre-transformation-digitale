import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Globe, Smartphone, Plug, Boxes, RefreshCw, TestTube,
  CheckCircle2, CircleDot, ChevronRight, Phone
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

const services = [
  {
    icon: Globe,
    title: 'Applications Web',
    desc: 'SPAs, PWAs, portals internes, extranets clients',
    tags: ['React', 'Next.js', 'Vue', 'Angular'],
  },
  {
    icon: Smartphone,
    title: 'Applications Mobiles',
    desc: 'Native iOS/Android, React Native, Flutter',
    tags: ['Swift', 'Kotlin', 'React Native'],
  },
  {
    icon: Plug,
    title: 'APIs & Intégration',
    desc: 'RESTful APIs, GraphQL, ESB, event streaming',
    tags: ['Node.js', 'Python', 'Kafka'],
  },
  {
    icon: Boxes,
    title: 'Microservices',
    desc: 'Architecture distribuée, service mesh, DDD',
    tags: ['Kubernetes', 'Istio', 'Go'],
  },
  {
    icon: RefreshCw,
    title: 'Legacy Modernization',
    desc: 'Refactoring, strangler fig, replatforming',
    tags: ['Java', '.NET', 'COBOL'],
  },
  {
    icon: TestTube,
    title: 'Quality Engineering',
    desc: 'TDD, BDD, test automation, performance',
    tags: ['Cypress', 'Jest', 'k6'],
  },
];

const methodologyTabs = [
  { id: 'agile', label: 'Agile & Scrum' },
  { id: 'devops', label: 'DevOps & CI/CD' },
  { id: 'clean', label: 'Clean Architecture' },
];

const methodologyContent: Record<string, { title: string; left: React.ReactNode; right: React.ReactNode }> = {
  agile: {
    title: 'Agile & Scrum',
    left: (
      <div className="flex flex-col items-center">
        <div className="relative w-56 h-56">
          {/* Sprint cycle */}
          {['Backlog', 'Planning', 'Dev', 'Review', 'Retro'].map((label, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x = 50 + 38 * Math.cos(angle);
            const y = 50 + 38 * Math.sin(angle);
            return (
              <div
                key={label}
                className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full bg-tech-purple/20 border border-tech-purple/40 flex items-center justify-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="font-inter text-[10px] font-semibold text-white text-center leading-tight">{label}</span>
              </div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-tech-purple/30 border border-tech-purple/50 flex items-center justify-center">
              <CircleDot className="w-6 h-6 text-tech-purple" />
            </div>
          </div>
        </div>
        <p className="mt-4 font-inter text-sm text-white/50">Cycle de sprint de 2 semaines</p>
      </div>
    ),
    right: (
      <ul className="space-y-4">
        {[
          'Sprints de 2 semaines',
          'Daily stand-ups, sprint reviews, retrospectives',
          'Product Owner dédié par projet',
          'Backlog grooming continu',
          'Velocity tracking et prévisibilité',
          'Story points et estimation collaborative',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-tech-purple mt-0.5 flex-shrink-0" />
            <span className="font-inter text-[15px] text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  devops: {
    title: 'DevOps & CI/CD',
    left: (
      <div className="space-y-3 w-full">
        {[
          { stage: 'Commit', dur: '<1min', tools: 'Git' },
          { stage: 'Build', dur: '3-5min', tools: 'Docker' },
          { stage: 'Test', dur: '5-8min', tools: 'Jest, Cypress' },
          { stage: 'Security Scan', dur: '2min', tools: 'Snyk, Sonar' },
          { stage: 'Deploy Staging', dur: '3min', tools: 'ArgoCD' },
          { stage: 'E2E Tests', dur: '10min', tools: 'Cypress' },
          { stage: 'Deploy Prod', dur: '2min', tools: 'GitOps' },
        ].map((s, i) => (
          <div key={s.stage} className="flex items-center gap-3">
            <div className="w-24 text-right">
              <span className="font-inter text-xs font-semibold text-white">{s.stage}</span>
            </div>
            <div className="flex-1 h-8 rounded-md bg-tech-purple/20 border border-tech-purple/30 flex items-center px-3">
              <span className="font-inter text-[11px] text-white/70">{s.tools}</span>
            </div>
            <span className="font-mono text-[11px] text-white/50 w-14">{s.dur}</span>
            {i < 6 && <ChevronRight className="w-3 h-3 text-white/30" />}
          </div>
        ))}
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h4 className="font-outfit text-lg font-semibold text-white">Toolchain DevOps</h4>
        {[
          { tool: 'GitLab CI / GitHub Actions', desc: 'Orchestration' },
          { tool: 'SonarQube', desc: 'Code quality' },
          { tool: 'Snyk / Trivy', desc: 'Security scanning' },
          { tool: 'Docker + Kubernetes', desc: 'Packaging & deployment' },
          { tool: 'ArgoCD', desc: 'GitOps delivery' },
          { tool: 'Cypress + Jest', desc: 'Testing' },
        ].map((t) => (
          <div key={t.tool} className="flex items-center justify-between py-2 border-b border-white/[0.06]">
            <span className="font-inter text-sm text-white/80">{t.tool}</span>
            <span className="font-inter text-xs text-white/40">{t.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  clean: {
    title: 'Clean Architecture',
    left: (
      <div className="flex items-center justify-center">
        <div className="relative w-56 h-56">
          {/* Concentric rings */}
          {[
            { label: 'Domain\nEntities', color: 'bg-tech-purple/40 border-tech-purple/60' },
            { label: 'Use\nCases', color: 'bg-tech-purple/25 border-tech-purple/45' },
            { label: 'Interface\nAdapters', color: 'bg-tech-purple/15 border-tech-purple/35' },
            { label: 'Frameworks\n& Drivers', color: 'bg-tech-purple/8 border-tech-purple/25' },
          ].map((ring, i) => {
            const size = 100 - i * 22;
            return (
              <div
                key={ring.label}
                className={`absolute rounded-full border flex items-center justify-center ${ring.color}`}
                style={{ width: `${size}%`, height: `${size}%`, top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%` }}
              >
                {i === 0 && <span className="font-inter text-[9px] font-semibold text-white text-center leading-tight whitespace-pre">{ring.label}</span>}
              </div>
            );
          })}
        </div>
      </div>
    ),
    right: (
      <ul className="space-y-4">
        {[
          'Dependency Inversion — dépendances vers l\'intérieur',
          'SOLID principles — Single responsibility, Open/closed, etc.',
          'Hexagonal / Ports & Adapters pattern',
          'Test-Driven Development (TDD)',
          'Domain-Driven Design (DDD) pour les projets complexes',
        ].map((item) => (
          <li key={item} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-tech-purple mt-0.5 flex-shrink-0" />
            <span className="font-inter text-[15px] text-white/80">{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
};

const caseStudies = [
  { title: 'Assureur Majeur — Plateforme Digitale Assurance Vie', metric: '2M+ utilisateurs, 99.9% uptime', tags: ['React', 'Node.js', 'AWS'] },
  { title: 'Retailer National — Application Mobile Omnicanal', metric: '+40% de panier moyen', tags: ['React Native', 'GraphQL'] },
  { title: 'Banque — Modernisation Core Bancaire (Microservices)', metric: '-60% time-to-market', tags: ['Java', 'Kubernetes', 'Kafka'] },
];

const techStack = [
  { category: 'Langages', items: ['Java', 'Python', 'TypeScript', 'Go', 'Rust', 'Kotlin', 'C#', 'Scala'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Vue', 'Angular', 'Tailwind CSS', 'Storybook'] },
  { category: 'Backend', items: ['Node.js', 'Spring Boot', 'FastAPI', 'Express', 'Gin', '.NET'] },
  { category: 'Data', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Neo4j'] },
];

const faqItems = [
  { q: "Quelles technologies utilisez-vous ?", a: "Nous sommes agnostiques technologiquement. Notre stack s'adapte à vos besoins et à votre écosystème existant. Nous maîtrisons Java, Python, TypeScript, Go, Kotlin, et les frameworks modernes comme React, Next.js, Spring Boot, et FastAPI." },
  { q: "Comment assurez-vous la qualité du code ?", a: "TDD, revues de code systématiques, SonarQube, couverture de tests >80%, audits de sécurité automatisés (SAST/DAST). Chaque ligne de code est revue par au moins 2 développeurs seniors." },
  { q: "Proposez-vous du TMA (maintenance) ?", a: "Oui, nous proposons des contrats de Tierce Maintenance Applicative avec des SLA adaptés. Nos équipes de Run assurent la maintenance corrective et évolutive de vos applications." },
  { q: "Quelle est votre approche pour les projets legacy ?", a: "Nous utilisons le pattern Strangler Fig pour moderniser progressivement les applications legacy. Cette approche minimise les risques tout en délivrant de la valeur rapidement." },
  { q: "Comment se passe le transfert de compétences ?", a: "Le transfert est intégré dès le début du projet. Nous documentons tout (ADRs, wiki, READMEs), organisons des sessions de knowledge sharing, et formons vos équipes pour garantir leur autonomie à terme." },
];

/* ──────────────────────── component ──────────────────────── */

export default function SoftwareDevelopment() {
  const [activeTab, setActiveTab] = useState('agile');

  return (
    <div className="min-h-[100dvh]">
      {/* ══════════ Hero ══════════ */}
      <section className="relative min-h-[70vh] pt-[160px] pb-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute top-1/3 right-[20%] w-[400px] h-[400px] rounded-full bg-tech-purple/15 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              className="font-inter text-[13px] text-neutral-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Link to="/expertises" className="hover:text-electric-blue transition-colors">Expertises</Link>
              <span className="mx-2">/</span>
              <span>Développement Logiciel</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <SectionLabel text="Développement Logiciel" className="mt-4" />
            </motion.div>
            <motion.h1
              className="mt-4 font-outfit text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
            >
              Du Code qui Fait la Différence
            </motion.h1>
            <motion.p
              className="mt-6 font-inter text-lg text-white/75 max-w-xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.55 }}
            >
              Applications sur mesure, microservices scalables, APIs robustes. Nos équipes de développement livrent du code de production qui dure.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all">
                Demander une proof of concept
              </Link>
              <a href="#methodology" className="font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-electric-blue hover:bg-electric-blue/8 transition-all">
                Voir nos méthodes
              </a>
            </motion.div>
          </div>

          {/* Right - Code Snippet */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.5 }}
          >
            <div className="glassmorphism rounded-2xl p-6 animate-float">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 font-inter text-xs text-white/40">api-service.ts</span>
              </div>
              <pre className="font-mono text-sm text-white/80 overflow-x-auto">
                <code>{`// Clean microservice endpoint
import { Router } from 'express';
import { CreateOrderUseCase } from '@domain/orders';

const router = Router();

router.post('/orders', async (req, res) => {
  const useCase = new CreateOrderUseCase();
  const order = await useCase.execute({
    customerId: req.body.customerId,
    items: req.body.items,
  });
  res.status(201).json(order);
});

export { router };`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ Services Grid ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Ce que Nous Construisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Methodology ══════════ */}
      <section id="methodology" className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10">
            Notre Méthodologie de Développement
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-0 border-b border-white/[0.12] mb-10">
            {methodologyTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3.5 font-inter text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-tech-purple border-tech-purple'
                    : 'text-white/60 border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>{methodologyContent[activeTab].left}</div>
              <div>{methodologyContent[activeTab].right}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ══════════ Case Studies ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Références Développement" className="text-neutral-600" />
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Applications Livrées en Production
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.title} cs={cs} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Tech Stack ══════════ */}
      <section className="py-20 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10">
            Notre Stack Technique
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {techStack.map((cat, i) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease: easeOutExpo }}
                className="glassmorphism rounded-xl p-6"
              >
                <h4 className="font-outfit text-lg font-semibold text-white mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="font-inter text-xs font-medium text-tech-purple bg-tech-purple/15 border border-tech-purple/25 rounded-full px-3 py-1.5"
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
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10 text-center">
            Questions Fréquentes
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqItems.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-neutral-200 rounded-xl px-6 bg-white data-[state=open]:border-tech-purple/30"
              >
                <AccordionTrigger className="font-inter text-base font-medium text-neutral-800 hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="font-inter text-[15px] text-neutral-600 pb-5 leading-relaxed">
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
          <div className="w-[500px] h-[500px] rounded-full bg-tech-purple/20 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
            Un Projet de Développement en Tête ?
          </h2>
          <p className="mt-4 font-inter text-lg text-white/75">
            Discutons-en. Notre équipe vous recontacte sous 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all">
              Démarrer une proof of concept
            </Link>
            <a href="tel:0123456789" className="inline-flex items-center gap-2 font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3.5 hover:border-electric-blue hover:bg-electric-blue/8 transition-all">
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

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = svc.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-350 group"
    >
      <div className="w-[52px] h-[52px] rounded-xl bg-tech-purple/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-tech-purple" />
      </div>
      <h3 className="mt-5 font-outfit text-xl font-semibold text-neutral-800">{svc.title}</h3>
      <p className="mt-2 font-inter text-[15px] text-neutral-600">{svc.desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="font-inter text-xs font-medium text-tech-purple border border-tech-purple/20 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
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
      className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-350"
    >
      <h3 className="font-outfit text-lg font-semibold text-neutral-800 leading-snug">{cs.title}</h3>
      <p className="mt-3 font-mono text-sm font-semibold text-tech-purple">{cs.metric}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {cs.tags.map((tag) => (
          <span key={tag} className="font-inter text-xs text-neutral-500 bg-neutral-100 rounded-full px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
