import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Target, Users, Heart, Lightbulb, Leaf,
  Linkedin
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import ImpactCounter from '@/components/ImpactCounter';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const timeline = [
  { year: '2008', event: 'Creation', desc: "Fondation de NexusOne a Paris par 3 consultants passionnes. Premier projet : migration SAP pour un industriel du CAC40." },
  { year: '2012', event: '50 Consultants', desc: 'Premiere barre des 50 consultants. Ouverture du bureau de Lyon. Certification partenaire SAP.' },
  { year: '2015', event: 'Cloud', desc: 'Lancement de la practice Cloud avec AWS. Premier projet Kubernetes en production.' },
  { year: '2017', event: 'Data & IA', desc: 'Creation de la practice Data & Intelligence Artificielle. 10 data scientists recrutes.' },
  { year: '2019', event: 'ISO 27001', desc: "Certification ISO 27001. Partenariat AWS Advanced Tier. Ouverture du bureau de Bordeaux." },
  { year: '2021', event: '400 Consultants', desc: "Barre des 400 consultants franchie. Partenariat Google Cloud Premier. Lancement practice Cybersecurite." },
  { year: '2023', event: 'International', desc: "Premiers projets a l'international (Luxembourg, Belgique). Partenariat Salesforce Platinum." },
  { year: '2025', event: '650 Consultants', desc: "650+ consultants, 45+ certifications, 1,200+ projets livres. Great Place to Work certifie." },
];

const values = [
  {
    icon: Target,
    title: 'Excellence Technique',
    desc: "Nous visons l'excellence dans chaque ligne de code, chaque architecture, chaque recommandation. La qualite technique est non negociable.",
  },
  {
    icon: Users,
    title: 'Pluridisciplinarite',
    desc: "Nos equipes combinent expertise IT et connaissance metier. Un consultant qui comprend votre business livre plus de valeur.",
  },
  {
    icon: Heart,
    title: 'Bienveillance',
    desc: "L'humain est au centre de notre modele. Respect, ecoute, transparence — envers nos clients comme envers nos consultants.",
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: "Nous investissons 5% de notre CA en R&D. Labs d'innovation, POCs internes, veille technologique permanente.",
  },
  {
    icon: Leaf,
    title: 'Responsabilite',
    desc: "Nous agissons de maniere responsable : environnement, diversite, inclusion. Notre certificat EcoVadis Silver en temoigne.",
  },
];

const leadership = [
  { name: 'Alexandre Martin', role: 'CEO & Co-fondateur', bio: "18 ans d'experience IT. Visionnaire du modele ESN de demain : tech-first, consultant-centric.", photo: '/avatar-4.jpg' },
  { name: 'Claire Dubois', role: 'CTO', bio: "Ancienne architecte cloud AWS. Dirige la strategy technique et les partenariats. 45+ certifications.", photo: '/avatar-5.jpg' },
  { name: 'Nicolas Petit', role: 'DRH', bio: "Expert en marque employeur tech. A transforme NexusOne en Great Place to Work certifie.", photo: '/avatar-6.jpg' },
  { name: 'Sophie Bernard', role: 'Directrice Commerciale', bio: "15 ans de vente IT enterprise. Connait les enjeux metier de chaque secteur sur le bout des doigts.", photo: '/avatar-7.jpg' },
];

const rsePillars = [
  {
    icon: Leaf,
    title: 'Empreinte Carbone',
    color: '#10B981',
    items: [
      'Bilan carbone realise chaque annee depuis 2021',
      "-30% d'emissions en 3 ans (teletravail, bureaux verts)",
      'Partenaire de la Loire Tech Green',
      'Certification EcoVadis Silver',
    ],
  },
  {
    icon: Users,
    title: 'Diversite & Inclusion',
    color: '#0055FF',
    items: [
      '42% de femmes dans nos effectifs (vs 25% moyenne sectorielle)',
      'Programme de mentorat feminin',
      'Partenariat avec Reboot Project',
      'Index Egalite Femmes-Hommes : 94/100',
    ],
  },
  {
    icon: Heart,
    title: 'Impact Societal',
    color: '#F59E0B',
    items: [
      "1% du CA dedie aux associations tech educatives",
      'Parrainage de 3 associations (Simplon, Ada Tech School, Les Bricodeurs)',
      'Journee de volontariat annuelle pour chaque consultant',
    ],
  },
];

const offices = [
  { city: 'Paris', address: 'La Defense — Tour Granite, 92000', headcount: '350+' },
  { city: 'Lyon', address: 'Part-Dieu — 69003', headcount: '150+' },
  { city: 'Bordeaux', address: 'Eurocampus — 33000', headcount: '80+' },
  { city: 'Nantes', address: 'Euronantes — 44000', headcount: '70+' },
  { city: 'Montreal', address: 'Downtown — QC H3A', headcount: '50+' },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  TIMELINE COMPONENT (GSAP)                                          */
/* ------------------------------------------------------------------ */

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.timeline-item');
    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const isLeft = i % 2 === 0;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tl.from(item, {
          opacity: 0,
          x: isLeft ? -20 : 20,
          duration: 0.7,
          ease: 'power2.out',
          delay: 0.1,
        });

        if (tl.scrollTrigger) {
          triggersRef.current.push(tl.scrollTrigger);
        }
      });
    }, containerRef);

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 md:-translate-x-px" />

      {timeline.map((item, i) => {
        const isLeft = i % 2 === 0;
        return (
          <div
            key={item.year}
            className={`timeline-item relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
              isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-electric-blue border-4 border-neutral-100 -translate-x-1/2 mt-2 z-10" />

            {/* Content */}
            <div className={`pl-12 md:pl-0 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <span className="font-mono text-xl font-bold text-electric-blue">{item.year}</span>
              <h4 className="font-outfit text-xl font-semibold text-neutral-800 mt-1 mb-2">{item.event}</h4>
              <p className="font-inter text-[15px] text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100dvh]">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-[60vh] flex items-center justify-center pt-[160px] pb-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
      >
        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-overlay"
          style={{ backgroundImage: 'url(/about-hero.jpg)' }}
        />
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
          <SectionLabel text="A Propos" className="justify-center" />
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight mb-6">
            18 Ans d&apos;Excellence au Service du Digital
          </h1>
          <p className="font-inter text-lg text-white/75 leading-relaxed max-w-[680px] mx-auto">
            Fondee en 2008, NexusOne accompagne les entreprises francaises dans leur transformation numerique avec passion, expertise et integrite.
          </p>
        </motion.div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Notre Histoire
          </motion.h2>
          <Timeline />
        </div>
      </section>

      {/* ========== VALUES ========== */}
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
              Nos Valeurs
            </h2>
            <p className="font-inter text-lg text-white/70">
              Ces principes guident chacune de nos decisions, chaque jour.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.1 }}
                  className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.1] rounded-2xl p-8 hover:bg-white/[0.10] hover:border-white/[0.18] transition-all duration-300"
                >
                  <Icon className="w-9 h-9 text-electric-blue mb-4" />
                  <h4 className="font-outfit text-xl font-semibold text-white mb-3">{v.title}</h4>
                  <p className="font-inter text-[15px] text-white/70 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== LEADERSHIP TEAM ========== */}
      <section className="py-24 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Notre Direction
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.1 }}
                className="group bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-[350ms]"
              >
                {/* Photo */}
                <div className="aspect-square overflow-hidden bg-neutral-200">
                  <img
                    src={leader.photo}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-outfit text-lg font-semibold text-neutral-800">{leader.name}</h4>
                  <p className="font-inter text-sm font-medium text-electric-blue mt-0.5">{leader.role}</p>
                  <p className="font-inter text-sm text-neutral-600 mt-2 leading-relaxed">{leader.bio}</p>
                  <button className="mt-3 text-neutral-400 hover:text-electric-blue transition-colors">
                    <Linkedin className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RSE COMMITMENTS ========== */}
      <section className="py-24 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Notre Engagement RSE
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rsePillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, ease: easeOutExpo, delay: i * 0.1 }}
                  className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:border-electric-blue/30 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 mb-4" style={{ color: pillar.color }} />
                  <h4 className="font-outfit text-xl font-semibold text-white mb-4">{pillar.title}</h4>
                  <ul className="space-y-3">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: pillar.color }} />
                        <span className="font-inter text-sm text-white/70 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
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

      {/* ========== OFFICE LOCATIONS ========== */}
      <section className="py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="font-outfit text-3xl sm:text-[42px] font-semibold text-white text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            Nos Bureaux
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {offices.map((office, i) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: i * 0.08 }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:border-electric-blue/30 transition-all duration-300"
              >
                <h4 className="font-outfit text-lg font-semibold text-white mb-1">{office.city}</h4>
                <p className="font-inter text-[13px] text-neutral-400 mb-3">{office.address}</p>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-electric-blue" />
                  <span className="font-mono text-sm text-electric-blue">{office.headcount}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Office image */}
          <motion.div
            className="mt-10 rounded-2xl overflow-hidden max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <img
              src="/about-office.jpg"
              alt="Nos bureaux"
              className="w-full h-auto object-cover"
            />
          </motion.div>
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
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-8">
            Envie de Faire Partie de l&apos;Aventure ?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/carrieres"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white bg-[#10B981] rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:brightness-110 active:translate-y-0 transition-all"
            >
              Voir nos postes ouverts
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-inter text-[15px] font-semibold text-white border-[1.5px] border-white/30 rounded-lg px-8 py-3.5 hover:border-electric-blue hover:bg-electric-blue/8 transition-all"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
