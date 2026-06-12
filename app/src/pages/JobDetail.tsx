import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Briefcase, Clock, Users, ArrowLeft, CheckCircle2,
  Award, FileText, Wallet, Linkedin, Twitter, Mail
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface JobDetailData {
  id: string;
  title: string;
  domainBadge: string;
  domainColor: string;
  location: string;
  contract: string;
  published: string;
  teamSize: string;
  experience: string;
  salary: string;
  applications: string;
  description: string;
  missions: string[];
  requirements: string[];
  benefits: string[];
  stack: { name: string; color: string }[];
}

const JOBS_DATA: Record<string, JobDetailData> = {
  'cloud-architect-aws': {
    id: 'cloud-architect-aws',
    title: 'Cloud Architect AWS (H/F)',
    domainBadge: 'Cloud & Infrastructure',
    domainColor: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
    location: 'Paris / Full Remote',
    contract: 'CDI',
    published: 'Il y a 2 jours',
    teamSize: '6 personnes dans l\'\u00E9quipe',
    experience: 'Senior (5\u20138 ans)',
    salary: '68K \u2013 85K EUR',
    applications: '12 candidatures',
    description: "En tant que Cloud Architect AWS chez NexusOne, vous accompagnerez nos clients dans la conception et la mise en \u0153uvre d'architectures cloud natives sur AWS. Vous interviendrez sur des projets de migration, de modernisation et d'optimisation d'infrastructures cloud pour des grands comptes du secteur bancaire, de la sant\u00E9 et de l'\u00E9nergie.",
    missions: [
      'Concevoir des architectures cloud natives, resilientes et s\u00E9curis\u00E9es sur AWS',
      'Accompagner les clients dans leur strat\u00E9gie de migration (6R)',
      'Impl\u00E9menter des solutions Infrastructure as Code (Terraform, CloudFormation)',
      'Optimiser les co\u00FBts cloud (FinOps, reserved instances, right-sizing)',
      'Assurer le transfert de comp\u00E9tences vers les \u00E9quipes client',
      'Contribuer aux avant-ventes et aux propositions techniques',
    ],
    requirements: [
      '5+ ans d\'exp\u00E9rience sur AWS (Solutions Architect Professional ou \u00E9quivalent)',
      'Ma\u00EEtrise de Kubernetes (EKS) et des containers (Docker)',
      'Exp\u00E9rience en Infrastructure as Code (Terraform obligatoire)',
      'Connaissance des patterns de s\u00E9curit\u00E9 cloud (IAM, KMS, VPC)',
      'Capacit\u00E9 \u00E0 communiquer avec des interlocuteurs techniques et m\u00E9tiers',
      'Anglais professionnel (oral et \u00E9crit)',
    ],
    benefits: [
      'R\u00E9mun\u00E9ration : 68K \u2013 85K EUR selon exp\u00E9rience + variable',
      'Budget formation : 3\u00A0000 EUR/an',
      'T\u00E9l\u00E9travail : 3 jours/semaine',
      'Certifications AWS prises en charge (100%)',
      'Mutuelle premium, PERCO, participation et int\u00E9ressement',
      'MacBook Pro + \u00E9crans 4K + budget home office',
    ],
    stack: [
      { name: 'AWS', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
      { name: 'Kubernetes', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
      { name: 'Terraform', color: 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20' },
      { name: 'Docker', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
      { name: 'Python', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
      { name: 'GitLab CI', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
      { name: 'Prometheus', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
    ],
  },
};

// Fallback data generator for any job ID
function getJobData(id: string): JobDetailData {
  if (JOBS_DATA[id]) return JOBS_DATA[id];
  // Generic fallback
  return {
    id,
    title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' (H/F)',
    domainBadge: 'Tech',
    domainColor: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
    location: 'Paris / Remote',
    contract: 'CDI',
    published: 'Il y a 3 jours',
    teamSize: '4\u20136 personnes',
    experience: 'Confirm\u00E9 (2\u20135 ans)',
    salary: '52K \u2013 68K EUR',
    applications: '8 candidatures',
    description: "Rejoignez NexusOne pour accompagner nos clients dans leur transformation digitale. Vous interviendrez sur des projets innovants au sein d'\u00E9quipes agile.",
    missions: [
      'Participer aux phases de conception et d\'architecture',
      'D\u00E9velopper et maintenir des solutions de qualit\u00E9',
      'Collaborer avec les \u00E9quipes client et les autres consultants',
      'Proposer des am\u00E9liorations et partager vos connaissances',
    ],
    requirements: [
      '2+ ans d\'exp\u00E9rience sur les technologies du poste',
      'Autonomie et sens du service',
      'Bonne communication \u00E9crite et orale',
      'Esprit d\'\u00E9quipe et envie d\'apprendre',
    ],
    benefits: [
      'R\u00E9mun\u00E9ration comp\u00E9titive selon profil',
      'Budget formation : 3\u00A0000 EUR/an',
      'T\u00E9l\u00E9travail : 3 jours/semaine',
      'Mutuelle premium, PERCO',
      'MacBook Pro + \u00E9crans 4K',
    ],
    stack: [
      { name: 'React', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
      { name: 'Node.js', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
      { name: 'TypeScript', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
      { name: 'AWS', color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' },
    ],
  };
}

const SIMILAR_JOBS = [
  { id: 'cloud-architect-azure', title: 'Cloud Architect Azure (H/F)', domain: 'Cloud', location: 'Lyon / Remote', experience: 'Senior', color: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20' },
  { id: 'devops-engineer-aws', title: 'DevOps Engineer AWS (H/F)', domain: 'DevOps', location: 'Paris', experience: 'Confirm\u00E9', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
  { id: 'platform-engineer-k8s', title: 'Platform Engineer Kubernetes (H/F)', domain: 'DevOps', location: 'Full Remote', experience: 'Senior', color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const job = getJobData(id || '');

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', linkedin: '', message: '', rgpd: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName && formData.lastName && formData.email && formData.rgpd) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ====== SECTION 1: HERO ====== */}
      <section className="relative bg-deep-navy pt-[140px] pb-12">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
            <Link to="/carrieres" className="inline-flex items-center gap-2 font-inter text-[13px] text-neutral-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Carri\u00E8res / Postes ouverts
            </Link>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${job.domainColor} mb-4`}>
              {job.domainBadge}
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" custom={2} variants={fadeUp}
            className="font-outfit text-3xl md:text-5xl font-bold text-white mb-6"
          >
            {job.title}
          </motion.h1>

          <motion.div
            initial="hidden" animate="visible" custom={3} variants={fadeUp}
            className="flex flex-wrap items-center gap-4 mb-8"
          >
            <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
              <MapPin className="w-4 h-4" /> {job.location}
            </span>
            <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
              <Briefcase className="w-4 h-4" /> {job.contract}
            </span>
            <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
              <Clock className="w-4 h-4" /> {job.published}
            </span>
            <span className="flex items-center gap-1.5 font-inter text-[13px] text-neutral-400">
              <Users className="w-4 h-4" /> {job.teamSize}
            </span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp}>
            <a
              href="#apply"
              className="inline-flex items-center font-inter text-sm font-semibold text-white bg-success-green rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
            >
              Postuler maintenant
            </a>
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 2: JOB OVERVIEW ====== */}
      <section className="bg-neutral-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[65%_35%] gap-8">
            {/* Left — Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Description */}
              <div className="mb-10">
                <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-4">Le Poste</h3>
                <p className="font-inter text-[15px] text-neutral-700 leading-[1.7]">{job.description}</p>
              </div>

              {/* Missions */}
              <div className="mb-10">
                <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-4">Vos Missions</h3>
                <ul className="space-y-3">
                  {job.missions.map((m, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-[15px] text-neutral-700">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="mb-10">
                <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-4">Le Profil Recherch\u00E9</h3>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-electric-blue flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-[15px] text-neutral-700">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-10">
                <h3 className="font-outfit text-sm font-semibold text-neutral-600 mb-3">Stack Technique</h3>
                <div className="flex flex-wrap gap-2">
                  {job.stack.map((s) => (
                    <span key={s.name} className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${s.color}`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-4">Ce que Nous Offrons</h3>
                <ul className="space-y-3">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success-green flex-shrink-0 mt-0.5" />
                      <span className="font-inter text-[15px] text-neutral-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right — Sticky Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="lg:sticky lg:top-[100px] self-start"
            >
              <div className="bg-white border border-neutral-200 rounded-2xl p-7">
                <h4 className="font-outfit text-lg font-semibold text-neutral-800 mb-5">Informations</h4>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Exp\u00E9rience</div>
                      <div className="font-inter text-sm text-neutral-800">{job.experience}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Localisation</div>
                      <div className="font-inter text-sm text-neutral-800">{job.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Contrat</div>
                      <div className="font-inter text-sm text-neutral-800">{job.contract}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Salaire</div>
                      <div className="font-inter text-sm text-neutral-800">{job.salary}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Publication</div>
                      <div className="font-inter text-sm text-neutral-800">{job.published}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-electric-blue" />
                    <div>
                      <div className="font-inter text-xs text-neutral-400">Candidatures</div>
                      <div className="font-inter text-sm text-neutral-800">{job.applications}</div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-5 mb-5">
                  <div className="font-inter text-[13px] text-neutral-400 mb-3">Partager</div>
                  <div className="flex items-center gap-3">
                    <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-[#0055FF]/10 hover:text-[#0055FF] text-neutral-400 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-[#0055FF]/10 hover:text-[#0055FF] text-neutral-400 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center hover:bg-[#0055FF]/10 hover:text-[#0055FF] text-neutral-400 transition-colors">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <a
                  href="#apply"
                  className="block w-full text-center font-inter text-sm font-semibold text-white bg-success-green rounded-lg px-6 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
                >
                  Postuler maintenant
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: SIMILAR JOBS ====== */}
      <section className="bg-deep-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-outfit text-4xl font-semibold text-white mb-8"
          >
            Postes Similaires
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {SIMILAR_JOBS.map((sj, i) => (
              <motion.div
                key={sj.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <Link
                  to={`/postes/${sj.id}`}
                  className="block bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.05] hover:border-[#0055FF]/30 transition-all group"
                >
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${sj.color} mb-3`}>
                    {sj.domain}
                  </span>
                  <h3 className="font-outfit text-base font-semibold text-white mb-3">{sj.title}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 font-inter text-[13px] text-neutral-400">
                      <MapPin className="w-3.5 h-3.5" /> {sj.location}
                    </span>
                    <span className="font-inter text-[13px] text-neutral-400">{sj.experience}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 5: APPLICATION FORM ====== */}
      <section id="apply" className="bg-neutral-100 py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white border border-neutral-200 rounded-2xl p-8 md:p-12"
          >
            {!submitted ? (
              <>
                <h3 className="font-outfit text-2xl font-semibold text-neutral-800 mb-2">
                  Postuler \u2014 {job.title}
                </h3>
                <p className="font-inter text-sm text-neutral-400 mb-8">
                  Remplissez le formulaire ci-dessous. Notre \u00E9quipe RH vous recontacte sous 48h.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">Pr\u00E9nom *</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">Nom *</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">T\u00E9l\u00E9phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">CV (PDF) *</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) => setCvFile(e.target.files?.[0]?.name || '')}
                        className="w-full h-[52px] px-4 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-electric-blue file:text-white hover:file:brightness-110"
                      />
                    </div>
                    {cvFile && <p className="mt-1 font-inter text-xs text-success-green">{cvFile}</p>}
                  </div>

                  <div>
                    <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Votre message, motivations, questions..."
                      className="w-full px-4 py-3 border border-neutral-200 rounded-lg font-inter text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12 resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.rgpd}
                      onChange={(e) => setFormData({ ...formData, rgpd: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded border-neutral-300 text-electric-blue focus:ring-electric-blue"
                    />
                    <span className="font-inter text-xs text-neutral-500 leading-relaxed">
                      J'accepte que NexusOne collecte et traite mes donn\u00E9es personnelles dans le cadre de ma candidature, conform\u00E9ment \u00E0 la politique de confidentialit\u00E9. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="w-full font-inter text-sm font-semibold text-white bg-success-green rounded-lg px-6 py-4 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] transition-all"
                  >
                    Envoyer ma candidature
                  </button>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-success-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-success-green" />
                </div>
                <h3 className="font-outfit text-2xl font-semibold text-neutral-800 mb-3">Candidature envoy\u00E9e !</h3>
                <p className="font-inter text-sm text-neutral-600">
                  Merci pour votre int\u00E9r\u00EAt. Notre \u00E9quipe RH vous recontactera sous 48h.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 6: CTA BANNER ====== */}
      <section className="bg-deep-navy py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <h2 className="font-outfit text-3xl font-semibold text-white mb-6">
            Vous Connaissez quelqu'un pour ce Poste&nbsp;?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex items-center font-inter text-sm font-semibold text-white bg-[#0055FF] rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-blue-glow transition-all">
              <Linkedin className="w-4 h-4 mr-2" />
              Partager sur LinkedIn
            </button>
            <Link
              to="/carrieres"
              className="inline-flex items-center font-inter text-sm font-medium text-electric-blue hover:underline underline-offset-4 transition-all"
            >
              Retour aux offres
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
