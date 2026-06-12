import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  GraduationCap, TrendingUp, Globe, Heart, Search, MapPin, Briefcase,
  ArrowRight, CheckCircle2, Cloud, Brain, GitBranch, Shield, Code2, Boxes,
  Users, Clock
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const VALUE_PROPS = [
  { icon: GraduationCap, title: 'Formation Continue', desc: "3\u00A0000\u00A0EUR/an de budget formation. Certifications cloud, formations techniques, conf\u00E9rences. Vous choisissez, nous finan\u00E7ons." },
  { icon: TrendingUp, title: 'Plan de Carri\u00E8re', desc: "\u00C9volution transparente\u00A0: Junior \u2192 Confirm\u00E9 \u2192 Senior \u2192 Lead \u2192 Principal \u2192 Director. Chaque \u00E9tape est d\u00E9finie avec des crit\u00E8res clairs." },
  { icon: Globe, title: 'Projets Vari\u00E9s', desc: "Banque, sant\u00E9, \u00E9nergie, retail. Projets en France et \u00E0 l'international. Vous ne serez jamais enferm\u00E9 dans un seul domaine." },
  { icon: Heart, title: 'Culture Tech', desc: "Communaut\u00E9s de pratique, brown bags hebdo, labs d'innovation, hackathons. La tech est au centre de notre ADN." },
];

const GALLERY_IMAGES = [
  { src: '/team-culture-1.jpg', caption: 'Nos bureaux \u00E0 Paris La D\u00E9fense', span: 'row-span-2' },
  { src: '/team-culture-2.jpg', caption: 'Pair programming au quotidien', span: '' },
  { src: '/team-culture-3.jpg', caption: 'C\u00E9l\u00E9bration du lancement projet IoT', span: '' },
  { src: '/event-webinar-1.jpg', caption: 'Webinar tech interne \u2014 Kubernetes', span: '' },
  { src: '/event-webinar-2.jpg', caption: 'Conf\u00E9rence cybersecurity', span: '' },
  { src: '/about-office.jpg', caption: 'Espaces de collaboration', span: 'row-span-2' },
];

const BENEFITS = [
  { category: 'Formation', items: ['3\u000A0000\u00A0EUR/an', 'Certifications', 'Conf\u00E9rences', 'E-learning'] },
  { category: 'R\u00E9mun\u00E9ration', items: ['Fixe + variable', 'Participation', 'Int\u00E9ressement', 'PERCO'] },
  { category: 'Qualit\u00E9 de vie', items: ['T\u00E9l\u00E9travail 3j/sem', 'RTT', 'Horaires flexibles'] },
  { category: 'Sant\u00E9', items: ['Mutuelle premium', 'Pr\u00E9voyance', 'Aide psychologique'] },
  { category: 'Tech', items: ['MacBook Pro', '\u00C9crans 4K', 'Budget mat\u00E9riel annuel'] },
  { category: 'Convivialit\u00E9', items: ['Afterworks', 'S\u00E9minaires', 'Team buildings', 'Hackathons'] },
];

const SALARY_BANDS = [
  { role: 'Junior (0\u20132\u00A0ans)', range: '42K \u2013 52K\u00A0EUR' },
  { role: 'Confirm\u00E9 (2\u20135\u00A0ans)', range: '52K \u2013 68K\u00A0EUR' },
  { role: 'Senior (5\u20138\u00A0ans)', range: '68K \u2013 85K\u00A0EUR' },
  { role: 'Lead/Principal (8+\u00A0ans)', range: '85K \u2013 110K\u00A0EUR+' },
];

interface Job {
  id: string;
  title: string;
  domain: string;
  experience: string;
  location: string;
  type: string;
  published: string;
}

const JOBS: Job[] = [
  { id: 'cloud-architect-aws', title: 'Cloud Architect AWS', domain: 'Cloud', experience: 'Senior', location: 'Paris / Remote', type: 'CDI', published: '2j' },
  { id: 'data-engineer-snowflake', title: 'Data Engineer Snowflake', domain: 'Data', experience: 'Confirm\u00E9', location: 'Lyon / Remote', type: 'CDI', published: '3j' },
  { id: 'lead-devops-kubernetes', title: 'Lead DevOps Kubernetes', domain: 'DevOps', experience: 'Lead', location: 'Paris', type: 'CDI', published: '1j' },
  { id: 'consultant-cybersecurite-nis2', title: 'Consultant Cybers\u00E9curit\u00E9 NIS2', domain: 'Cybers\u00E9curit\u00E9', experience: 'Senior', location: 'Paris / Remote', type: 'CDI', published: '5j' },
  { id: 'developpeur-full-stack-react-node', title: 'D\u00E9veloppeur Full Stack React/Node', domain: 'Software', experience: 'Confirm\u00E9', location: 'Bordeaux', type: 'CDI', published: '1j' },
  { id: 'ml-engineer', title: 'ML Engineer', domain: 'Data', experience: 'Senior', location: 'Full Remote', type: 'CDI', published: '4j' },
  { id: 'developpeur-salesforce', title: 'D\u00E9veloppeur Salesforce', domain: 'ERP/CRM', experience: 'Confirm\u00E9', location: 'Paris', type: 'CDI', published: '2j' },
  { id: 'alternant-cloud-devops', title: 'Alternant Cloud & DevOps', domain: 'Cloud', experience: 'Junior', location: 'Nantes', type: 'Alternance', published: '1j' },
];

const DOMAIN_COLORS: Record<string, string> = {
  Cloud: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
  Data: 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20',
  DevOps: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  Cybers\u00E9curit\u00E9: 'text-[#14B8A6] bg-[#14B8A6]/10 border-[#14B8A6]/20',
  Software: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  'ERP/CRM': 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
};

const TESTIMONIALS = [
  { quote: "J'ai rejoint NexusOne il y a 3 ans. Les formations, les certifications, les projets challeng\u00E9s \u2014 tout est l\u00E0 pour faire grandir votre carri\u00E8re.", name: 'Sarah M.', role: 'Lead DevOps Cloud', tenure: '3 ans', avatar: '/avatar-1.jpg' },
  { quote: "Enfin une ESN qui met vraiment le consultant au centre. La transparence sur les projets et les r\u00E9mun\u00E9rations, c'est rafra\u00EEchissant.", name: 'Karim B.', role: 'Data Engineer', tenure: '2 ans', avatar: '/avatar-2.jpg' },
  { quote: "L'ambiance tech est incroyable. Les communaut\u00E9s de pratique, les brown bags tech, les labs d'innovation \u2014 on apprend tous les jours.", name: 'Lucie A.', role: 'Architecte Cloud Senior', tenure: '4 ans', avatar: '/avatar-3.jpg' },
];

const CAREER_STEPS = [
  { level: 'Junior', exp: '0\u20132\u00A0ans', salary: '42\u201352K', criteria: 'Ma\u00EEtrise des bases, apprentissage' },
  { level: 'Confirm\u00E9', exp: '2\u20135\u00A0ans', salary: '52\u201368K', criteria: 'Autonomie, mentorat juniors' },
  { level: 'Senior', exp: '5\u20138\u00A0ans', salary: '68\u201385K', criteria: 'Expertise, architecture, pre-sales' },
  { level: 'Lead', exp: '8\u201310\u00A0ans', salary: '85\u2013100K', criteria: 'Leadership technique, transverse' },
  { level: 'Principal', exp: '10+\u00A0ans', salary: '100\u2013110K', criteria: 'Expert reconnu, innovation' },
  { level: 'Director', exp: '12+\u00A0ans', salary: '110K+', criteria: 'Strat\u00E9gie, management, vision' },
];

const COMMUNITIES = [
  { name: 'Cloud Native', icon: Cloud, members: 85, activity: 'Meetup mensuel, cert study groups', color: 'text-[#0055FF]' },
  { name: 'Data & ML', icon: Brain, members: 62, activity: 'Kaggle competitions, paper reviews', color: 'text-[#7C3AED]' },
  { name: 'DevOps & SRE', icon: GitBranch, members: 70, activity: 'Tool demos, incident post-mortems', color: 'text-[#10B981]' },
  { name: 'CyberSec', icon: Shield, members: 45, activity: 'CTF, veille s\u00E9curit\u00E9, pentest labs', color: 'text-[#14B8A6]' },
  { name: 'Frontend', icon: Code2, members: 55, activity: 'UI reviews, framework comparisons', color: 'text-[#F59E0B]' },
  { name: 'Architecture', icon: Boxes, members: 38, activity: 'ADR reviews, pattern discussions', color: 'text-[#0055FF]' },
];

const HIRING_STEPS = [
  { title: 'Candidature', desc: 'D\u00E9p\u00F4t de CV + lettre de motivation en ligne. R\u00E9ponse sous 48h.', duration: '48h' },
  { title: 'Entretien Tech', desc: "Entretien avec un lead technique. Discussion autour de vos exp\u00E9riences et d'un cas pratique.", duration: '1h' },
  { title: 'Entretien RH', desc: "Entretien avec notre \u00E9quipe RH. Culture fit, motivations, parcours souhait\u00E9.", duration: '45min' },
  { title: 'Proposition', desc: 'Proposition d\u00E9taill\u00E9e sous 24h. Transparence totale sur r\u00E9mun\u00E9ration et projet.', duration: '24h' },
];

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Careers() {
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState('Tous');
  const [filterExp, setFilterExp] = useState('Tous');
  const [filterLoc, setFilterLoc] = useState('Tous');
  const [filterType, setFilterType] = useState('Tous');

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchSearch = job.title.toLowerCase().includes(search.toLowerCase());
      const matchDomain = filterDomain === 'Tous' || job.domain === filterDomain;
      const matchExp = filterExp === 'Tous' || job.experience === filterExp;
      const matchLoc = filterLoc === 'Tous' || job.location.includes(filterLoc);
      const matchType = filterType === 'Tous' || job.type === filterType;
      return matchSearch && matchDomain && matchExp && matchLoc && matchType;
    });
  }, [search, filterDomain, filterExp, filterLoc, filterType]);

  const openCount = 24;

  return (
    <div className="min-h-[100dvh]">
      {/* ====== SECTION 1: HERO ====== */}
      <section className="relative min-h-[80vh] bg-deep-navy pt-[160px] pb-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 60% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div variants={staggerItem}>
                <SectionLabel text="Carri\u00E8res" className="!text-success-green" />
              </motion.div>
              <motion.h1
                variants={staggerItem}
                className="font-outfit text-4xl md:text-[56px] font-bold leading-[1.15] tracking-tight text-white"
              >
                Construisez la Carri\u00E8re Tech que Vous M\u00E9ritez
              </motion.h1>
              <motion.p
                variants={staggerItem}
                className="mt-6 font-inter text-lg text-white/75 leading-relaxed"
              >
                650+ consultants, 18 ans d'expertise, une culture tech authentique. Chez NexusOne, votre d\u00E9veloppement professionnel est notre priorit\u00E9.
              </motion.p>

              {/* Live counter */}
              <motion.div variants={staggerItem} className="mt-6 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-success-green" />
                </span>
                <span className="font-mono text-base text-success-green">
                  {openCount} postes ouverts
                </span>
              </motion.div>

              <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#postes"
                  className="inline-flex items-center font-inter text-sm font-semibold text-white bg-success-green rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
                >
                  Voir les postes ouverts
                </a>
                <a
                  href="#culture"
                  className="inline-flex items-center font-inter text-sm font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3.5 hover:border-success-green hover:bg-success-green/8 transition-all"
                >
                  Notre culture tech
                </a>
              </motion.div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img src="/team-culture-1.jpg" alt="Culture d'\u00E9quipe" className="w-full h-[480px] object-cover rounded-2xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] to-transparent" />
              </div>
              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="absolute top-6 right-6 glassmorphism-card rounded-xl px-5 py-4"
              >
                <div className="font-mono text-2xl font-bold text-white">4.2/5</div>
                <div className="font-inter text-xs text-neutral-400 mt-1">Note Glassdoor</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute bottom-6 left-6 glassmorphism-card rounded-xl px-5 py-4"
              >
                <div className="font-mono text-2xl font-bold text-white">3\u00A0000 EUR</div>
                <div className="font-inter text-xs text-neutral-400 mt-1">Budget formation/an</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: WHY JOIN US ====== */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-neutral-800 text-center mb-12"
          >
            Pourquoi Rejoindre NexusOne&nbsp;?
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PROPS.map((vp, i) => (
              <motion.div
                key={vp.title}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="bg-white border border-neutral-200 rounded-xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-350 border-t-[3px] border-t-success-green"
              >
                <div className="w-[52px] h-[52px] rounded-full bg-success-green/10 flex items-center justify-center mb-5">
                  <vp.icon className="w-6 h-6 text-success-green" />
                </div>
                <h4 className="font-outfit text-xl font-semibold text-neutral-800 mb-3">{vp.title}</h4>
                <p className="font-inter text-[15px] text-neutral-600 leading-relaxed">{vp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: CULTURE GALLERY ====== */}
      <section id="culture" className="bg-deep-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-white mb-12"
          >
            Notre Culture en Images
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative group overflow-hidden rounded-xl ${img.span || 'row-span-1'} ${i === 0 || i === 5 ? 'md:row-span-2' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-4 left-4 font-inter text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {img.caption}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: BENEFITS ====== */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-neutral-800 mb-12"
          >
            Avantages & R\u00E9mun\u00E9ration
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left — Benefits grid */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="grid grid-cols-2 gap-6"
            >
              {BENEFITS.map((cat) => (
                <div key={cat.category} className="bg-white rounded-xl p-5 border border-neutral-200">
                  <h4 className="font-inter text-sm font-semibold text-neutral-800 mb-3">{cat.category}</h4>
                  <ul className="space-y-2">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-success-green flex-shrink-0 mt-0.5" />
                        <span className="font-inter text-sm text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Right — Salary bands */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <h3 className="font-outfit text-[28px] font-semibold text-neutral-800 mb-6">Transparence Salariale</h3>
              <div className="space-y-4">
                {SALARY_BANDS.map((band) => (
                  <div
                    key={band.role}
                    className="bg-white border border-neutral-200 rounded-xl p-5 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  >
                    <span className="font-inter text-sm text-neutral-700">{band.role}</span>
                    <span className="font-mono text-xl font-bold text-electric-blue">{band.range}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-inter text-xs text-neutral-400 italic">
                R\u00E9mun\u00E9ration brute annuelle + variable. Selon profil et exp\u00E9rience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 5: JOB EXPLORER ====== */}
      <section id="postes" className="bg-deep-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-outfit text-[42px] font-semibold text-white"
            >
              Postes Ouverts
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success-green" />
              </span>
              <span className="font-mono text-base text-success-green">{openCount} postes disponibles</span>
            </motion.div>
          </div>

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Rechercher un poste..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white/5 border border-white/[0.08] rounded-lg font-inter text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
              />
            </div>
            <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)} className="h-11 px-4 bg-white/5 border border-white/[0.08] rounded-lg font-inter text-sm text-white focus:outline-none focus:border-electric-blue">
              <option value="Tous">Domaine</option>
              <option>Cloud</option>
              <option>Data</option>
              <option>DevOps</option>
              <option>Cybers\u00E9curit\u00E9</option>
              <option>Software</option>
              <option>ERP/CRM</option>
            </select>
            <select value={filterExp} onChange={(e) => setFilterExp(e.target.value)} className="h-11 px-4 bg-white/5 border border-white/[0.08] rounded-lg font-inter text-sm text-white focus:outline-none focus:border-electric-blue">
              <option value="Tous">Exp\u00E9rience</option>
              <option>Junior</option>
              <option>Confirm\u00E9</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
            <select value={filterLoc} onChange={(e) => setFilterLoc(e.target.value)} className="h-11 px-4 bg-white/5 border border-white/[0.08] rounded-lg font-inter text-sm text-white focus:outline-none focus:border-electric-blue">
              <option value="Tous">Localisation</option>
              <option>Paris</option>
              <option>Lyon</option>
              <option>Bordeaux</option>
              <option>Nantes</option>
              <option>Full Remote</option>
            </select>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="h-11 px-4 bg-white/5 border border-white/[0.08] rounded-lg font-inter text-sm text-white focus:outline-none focus:border-electric-blue">
              <option value="Tous">Type</option>
              <option>CDI</option>
              <option>Freelance</option>
              <option>Stage</option>
              <option>Alternance</option>
            </select>
          </motion.div>

          {/* Job list */}
          <div className="space-y-3">
            {filteredJobs.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <Link
                  to={`/postes/${job.id}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/[0.03] border border-white/[0.08] rounded-xl px-6 py-5 hover:bg-white/[0.05] hover:border-[#0055FF]/30 transition-all group"
                >
                  <div className="flex-1">
                    <h3 className="font-outfit text-base font-semibold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${DOMAIN_COLORS[job.domain] || DOMAIN_COLORS['Software']}`}>
                        {job.domain}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-neutral-400 bg-white/[0.05] border border-white/[0.08]">
                        {job.experience}
                      </span>
                      <span className="flex items-center gap-1 font-inter text-[13px] text-neutral-400">
                        <MapPin className="w-3.5 h-3.5" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 font-inter text-[13px] text-neutral-400">
                        <Briefcase className="w-3.5 h-3.5" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-inter text-xs text-neutral-400">Il y a {job.published}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
            {filteredJobs.length === 0 && (
              <div className="text-center py-12 text-neutral-400 font-inter">Aucun poste ne correspond \u00E0 vos crit\u00E8res.</div>
            )}
          </div>
        </div>
      </section>

      {/* ====== SECTION 6: TESTIMONIALS ====== */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-neutral-800 mb-12"
          >
            Ils Ont Choisi NexusOne
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-350 relative"
              >
                <span className="absolute top-6 left-6 font-outfit text-5xl text-electric-blue/30 leading-none">&ldquo;</span>
                <p className="font-outfit text-[17px] italic text-neutral-800 leading-relaxed mb-6 relative z-10 pt-6">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-inter text-sm font-semibold text-neutral-800">{t.name}</div>
                    <div className="font-inter text-[13px] text-neutral-400">{t.role}</div>
                    <div className="font-inter text-xs text-success-green">{t.tenure}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 7: CAREER LADDER ====== */}
      <section className="bg-deep-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="font-outfit text-[42px] font-semibold text-white">Votre Parcours de Carri\u00E8re</h2>
            <p className="mt-4 font-inter text-lg text-white/60">6 niveaux, des crit\u00E8res transparents, une \u00E9volution m\u00E9ritocratique</p>
          </motion.div>

          {/* Desktop horizontal stepper */}
          <div className="hidden lg:block relative">
            <div className="absolute top-5 left-[8%] right-[8%] h-0.5 bg-electric-blue/30" />
            <div className="flex justify-between relative z-10">
              {CAREER_STEPS.map((step, i) => (
                <motion.div
                  key={step.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className="flex flex-col items-center text-center group w-40"
                >
                  <div className="w-10 h-10 rounded-full bg-electric-blue flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(0,85,255,0.4)]">
                    <span className="font-mono text-sm font-bold text-white">{i + 1}</span>
                  </div>
                  <h4 className="font-outfit text-base font-semibold text-white mb-1">{step.level}</h4>
                  <p className="font-inter text-xs text-neutral-400 mb-1">{step.exp}</p>
                  <p className="font-mono text-sm font-bold text-electric-blue">{step.salary}</p>
                  <p className="font-inter text-xs text-white/50 mt-2 opacity-0 group-hover:opacity-100 transition-opacity max-w-[140px]">
                    {step.criteria}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical stepper */}
          <div className="lg:hidden relative space-y-8">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-electric-blue/30" />
            {CAREER_STEPS.map((step, i) => (
              <motion.div
                key={step.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative flex items-start gap-6 pl-14"
              >
                <div className="absolute left-3 top-0 w-4 h-4 rounded-full bg-electric-blue -translate-x-1/2" />
                <div>
                  <h4 className="font-outfit text-base font-semibold text-white">{step.level}</h4>
                  <p className="font-inter text-xs text-neutral-400">{step.exp}</p>
                  <p className="font-mono text-sm font-bold text-electric-blue mt-1">{step.salary}</p>
                  <p className="font-inter text-xs text-white/50 mt-1">{step.criteria}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 8: TECH COMMUNITIES ====== */}
      <section className="bg-neutral-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-neutral-800 mb-10"
          >
            Nos Communaut\u00E9s de Pratique
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMMUNITIES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="bg-white border border-neutral-200 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-350"
              >
                <div className="flex items-center gap-3 mb-3">
                  <c.icon className={`w-7 h-7 ${c.color}`} />
                  <h4 className="font-outfit text-lg font-semibold text-neutral-800">{c.name}</h4>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <Users className="w-4 h-4 text-neutral-400" />
                  <span className="font-inter text-[13px] text-neutral-400">{c.members} membres</span>
                </div>
                <p className="font-inter text-[13px] text-neutral-600">{c.activity}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 9: HIRING PROCESS ====== */}
      <section className="bg-deep-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-white mb-12"
          >
            Notre Process de Recrutement
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HIRING_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="text-center"
              >
                <div className="font-mono text-4xl font-bold text-electric-blue mb-4">0{i + 1}</div>
                <h4 className="font-outfit text-xl font-semibold text-white mb-3">{step.title}</h4>
                <p className="font-inter text-sm text-white/60 leading-relaxed mb-3">{step.desc}</p>
                <div className="flex items-center justify-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-success-green" />
                  <span className="font-mono text-[13px] text-success-green">{step.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 10: CTA BANNER ====== */}
      <section className="relative bg-deep-navy py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, rgba(16,185,129,0.12) 0%, transparent 60%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="font-outfit text-[42px] font-semibold text-white mb-4">Pr\u00EAt \u00E0 Relever le D\u00E9fi&nbsp;?</h2>
          <p className="font-inter text-lg text-white/70 mb-8">
            {openCount} postes ouverts. Votre prochain projet tech vous attend.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#postes"
              className="inline-flex items-center font-inter text-sm font-semibold text-white bg-success-green rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
            >
              Voir les postes ouverts
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center font-inter text-sm font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3.5 hover:border-success-green hover:bg-success-green/8 transition-all"
            >
              Envoyer une candidature spontan\u00E9e
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
