import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Award, Leaf, Star, ArrowRight,
  Building2, Landmark, Factory, ShoppingBag, Zap, Globe, Car, Smartphone
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const partners = [
  {
    name: 'AWS',
    logo: '/partner-aws.svg',
    level: 'Advanced Tier',
    description: 'Partenaire AWS Advanced Tier avec 85+ certifications. Expertise migration, architecture, securite.',
    certCount: '85+',
    color: '#FF9900',
  },
  {
    name: 'Microsoft Azure',
    logo: '/partner-azure.svg',
    level: 'Solutions Partner',
    description: 'Microsoft Solutions Partner pour Infrastructure Azure, Data & AI, et Digital & App Innovation.',
    certCount: '60+',
    color: '#0078D4',
  },
  {
    name: 'Google Cloud',
    logo: '/partner-gcp.svg',
    level: 'Premier Partner',
    description: 'Google Cloud Premier Partner. Specialisations Data Analytics, Cloud Migration, Infrastructure.',
    certCount: '40+',
    color: '#4285F4',
  },
  {
    name: 'Salesforce',
    logo: '/partner-salesforce.svg',
    level: 'Platinum',
    description: 'Salesforce Platinum Partner. Sales Cloud, Service Cloud, Marketing Cloud, Experience Cloud.',
    certCount: '25+',
    color: '#00A1E0',
  },
  {
    name: 'SAP',
    logo: '/partner-sap.svg',
    level: 'Gold',
    description: 'SAP Gold Partner. S/4HANA migration, customisation, Fiori development, integration.',
    certCount: '30+',
    color: '#0FAAFF',
  },
];

const certifications = [
  { category: 'Cloud Architecture', count: '85+', certs: ['AWS SA Pro', 'Azure SA Expert', 'GCP PCA'] },
  { category: 'Cloud Security', count: '25+', certs: ['AWS Security Specialty', 'Azure Security Engineer'] },
  { category: 'Cloud DevOps', count: '30+', certs: ['AWS DevOps Pro', 'Azure DevOps Expert'] },
  { category: 'Data & AI', count: '20+', certs: ['GCP Data Engineer', 'AWS ML Specialty'] },
  { category: 'Cybersecurity', count: '15+', certs: ['CISSP', 'CEH', 'ISO 27001 LI/LA'] },
  { category: 'Project Management', count: '20+', certs: ['Scrum Master', 'SAFe', 'PMP'] },
];

const qualityLabels = [
  {
    icon: Shield,
    title: 'ISO 27001',
    desc: "Certifie ISO 27001 depuis 2019. Gestion de la securite de l'information.",
    color: '#10B981',
  },
  {
    icon: Award,
    title: 'France Cybersecurity',
    desc: "Membre du label France Cybersecurity. Expertise cybersecurite reconnue par l'ANSSI.",
    color: '#0055FF',
  },
  {
    icon: Leaf,
    title: 'EcoVadis',
    desc: 'Note EcoVadis Silver. Engagement RSE et responsabilite societale.',
    color: '#10B981',
  },
  {
    icon: Star,
    title: 'Great Place to Work',
    desc: "Certifie Great Place to Work 2024. Excellence en qualite de vie au travail.",
    color: '#F59E0B',
  },
];

const clientLogos = [
  { Icon: Building2, name: 'Societe Generale' },
  { Icon: Landmark, name: 'BNP Paribas' },
  { Icon: Factory, name: 'Schneider Electric' },
  { Icon: ShoppingBag, name: 'Carrefour' },
  { Icon: Zap, name: 'EDF' },
  { Icon: Globe, name: 'Orange' },
  { Icon: Car, name: 'Renault' },
  { Icon: Smartphone, name: 'Dassault Systemes' },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function Partners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <SectionLabel text="Partenaires & Certifications" className="justify-center" />
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight mb-6">
            Des Partenaires de Confiance, des Certifications Reconnues
          </h1>
          <p className="font-inter text-lg text-white/75 leading-relaxed max-w-[700px] mx-auto">
            NexusOne est partenaire des leaders technologiques mondiaux. Nos consultants cumulent plus de 45 certifications pour vous garantir un service d&apos;excellence.
          </p>
        </motion.div>
      </section>

      {/* ========== STRATEGIC PARTNERS ========== */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Nos Partenaires Strategiques
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.1 }}
                className="group bg-white border border-neutral-200 rounded-2xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-[350ms]"
              >
                {/* Logo placeholder */}
                <div className="h-16 flex items-center justify-center mb-5 grayscale-[30%] group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-300">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-full max-w-[120px] object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="font-outfit text-2xl font-bold text-neutral-400">${p.name}</span>`;
                      }
                    }}
                  />
                </div>

                {/* Level badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-electric-blue text-white mb-4">
                  {p.level}
                </span>

                {/* Description */}
                <p className="font-inter text-[15px] text-neutral-600 leading-relaxed mb-4">
                  {p.description}
                </p>

                {/* Cert count */}
                <p className="font-mono text-sm text-[#10B981]">
                  {p.certCount} certifications {p.name.split(' ')[0]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CERTIFICATION BREAKDOWN ========== */}
      <section className="py-24 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-4">
              45+ Certifications
            </h2>
            <p className="font-inter text-lg text-white/70">
              Nos consultants certifies couvrent l&apos;integralite de notre stack technique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.08 }}
                className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-7 hover:border-electric-blue/30 transition-all duration-300"
              >
                <h4 className="font-outfit text-xl font-semibold text-white mb-2">{cert.category}</h4>
                <div className="font-mono text-[28px] font-bold text-electric-blue mb-3">{cert.count}</div>
                <div className="space-y-1.5">
                  {cert.certs.map((c) => (
                    <div key={c} className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                      <span className="font-inter text-[13px] text-white/60">{c}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== QUALITY LABELS ========== */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Labels & Engagements Qualite
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityLabels.map((label, i) => {
              const Icon = label.icon;
              return (
                <motion.div
                  key={label.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${label.color}14` }}
                  >
                    <Icon className="w-8 h-8" style={{ color: label.color }} />
                  </div>
                  <h4 className="font-outfit text-xl font-semibold text-neutral-800 mb-2">{label.title}</h4>
                  <p className="font-inter text-sm text-neutral-600 leading-relaxed">{label.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CLIENT LOGO WALL ========== */}
      <section className="py-20 bg-deep-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Ils Nous Font Confiance
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {clientLogos.map((cl, i) => {
              const Icon = cl.Icon;
              return (
                <motion.div
                  key={cl.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOutExpo, delay: i * 0.06 }}
                  className="flex flex-col items-center gap-3 py-6 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
                >
                  <Icon className="w-10 h-10 text-neutral-400 hover:text-white transition-colors" />
                  <span className="font-inter text-xs font-medium text-neutral-400">{cl.name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-20 bg-deep-navy border-t border-white/[0.06]">
        <motion.div
          className="max-w-3xl mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeOutExpo }}
        >
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-4">
            Rejoignez Notre Ecosysteme Partenaire
          </h2>
          <p className="font-inter text-lg text-white/70 mb-8">
            Vous etes editeur ou constructeur ? Devenons partenaires.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all"
            >
              Devenir partenaire <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-mono text-sm text-neutral-400">partenariats@nexusone.fr</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
