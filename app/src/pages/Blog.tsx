import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Search } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES = ['Tous', 'Cloud', 'Data & IA', 'Cybers\u00E9curit\u00E9', 'DevOps', 'Software', 'Architecture', 'Carri\u00E8re'];

const CATEGORY_COLORS: Record<string, string> = {
  Cloud: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
  'Data & IA': 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20',
  Cybers\u00E9curit\u00E9: 'text-[#14B8A6] bg-[#14B8A6]/10 border-[#14B8A6]/20',
  DevOps: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  Software: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
  Architecture: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
  Carri\u00E8re: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
};

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
}

const FEATURED_ARTICLE: Article = {
  id: 0,
  category: 'Cloud',
  title: 'Kubernetes 1.30 : Ce qui Change pour les \u00C9quipes de Production',
  excerpt: "La version 1.30 de Kubernetes apporte des am\u00E9liorations significatives pour le stockage, la s\u00E9curit\u00E9 et la gestion des ressources. D\u00E9couvrez ce qui impacte vos clusters de production.",
  date: '15 mars 2026',
  readTime: '8 min',
  author: 'Thomas Durand',
  authorRole: 'Cloud Architect Senior',
  authorAvatar: '/avatar-4.jpg',
  image: '/event-webinar-1.jpg',
};

const ARTICLES: Article[] = [
  { id: 1, category: 'Cloud', title: 'FinOps : R\u00E9duire ses Co\u00FBts AWS de 40% en 6 Mois', excerpt: 'M\u00E9thodologie concr\u00E8te et outils pour ma\u00EEtriser votre budget cloud et optimiser vos d\u00E9penses...', date: '12 mars 2026', readTime: '6 min', author: 'Sarah M.', authorRole: 'Lead DevOps', authorAvatar: '/avatar-1.jpg', image: '/case-study-energy.jpg' },
  { id: 2, category: 'Cybers\u00E9curit\u00E9', title: 'Zero Trust : Guide de Mise en \u0152uvre en 5 \u00C9tapes', excerpt: "Comment impl\u00E9menter Zero Trust dans une grande entreprise sans disruption op\u00E9rationnelle...", date: '8 mars 2026', readTime: '10 min', author: 'Karim B.', authorRole: 'Consultant Cybers\u00E9curit\u00E9', authorAvatar: '/avatar-2.jpg', image: '/event-webinar-2.jpg' },
  { id: 3, category: 'Data & IA', title: 'MLOps en Production : Les Erreurs \u00E0 \u00C9viter', excerpt: "Le passage du PoC \u00E0 la production ML est un voyage parse d'emb\u00FBches. Voici les pi\u00E8ges \u00E0 \u00E9viter...", date: '5 mars 2026', readTime: '7 min', author: 'Lucie A.', authorRole: 'ML Engineer', authorAvatar: '/avatar-3.jpg', image: '/case-study-bank.jpg' },
  { id: 4, category: 'DevOps', title: 'Platform Engineering : Au-Del\u00E0 du DevOps', excerpt: "Pourquoi les meilleures \u00E9quipes tech adoptent le Platform Engineering pour acc\u00E9l\u00E9rer leurs livraisons...", date: '1 mars 2026', readTime: '8 min', author: 'Thomas D.', authorRole: 'Cloud Architect', authorAvatar: '/avatar-4.jpg', image: '/team-culture-1.jpg' },
  { id: 5, category: 'Cloud', title: 'Multi-Cloud vs Cloud Native : Faire le Bon Choix', excerpt: 'Analyse comparative des strat\u00E9gies cloud pour les entreprises fran\u00E7aises en 2026...', date: '26 f\u00E9v 2026', readTime: '9 min', author: 'Sarah M.', authorRole: 'Lead DevOps', authorAvatar: '/avatar-1.jpg', image: '/case-study-health.jpg' },
  { id: 6, category: 'Cybers\u00E9curit\u00E9', title: 'NIS2 : Checklist de Conformit\u00E9 pour les ESN', excerpt: "La directive NIS2 s'applique d\u00E8s octobre 2024. Voici votre roadmap de mise en conformit\u00E9...", date: '22 f\u00E9v 2026', readTime: '12 min', author: 'Karim B.', authorRole: 'Consultant Cybers\u00E9curit\u00E9', authorAvatar: '/avatar-2.jpg', image: '/about-office.jpg' },
  { id: 7, category: 'Software', title: 'Clean Architecture en 2026 : Toujours d\u2019Actualit\u00E9 ?', excerpt: 'Retour sur 5 ans de Clean Architecture dans nos projets enterprise et son \u00E9volution...', date: '18 f\u00E9v 2026', readTime: '6 min', author: 'Thomas D.', authorRole: 'Cloud Architect', authorAvatar: '/avatar-4.jpg', image: '/team-culture-2.jpg' },
  { id: 8, category: 'Data & IA', title: 'RAG Avanc\u00E9 : Au-Del\u00E0 du Basics', excerpt: 'Techniques avanc\u00E9es de RAG pour des applications IA enterprise performantes et fiables...', date: '14 f\u00E9v 2026', readTime: '11 min', author: 'Lucie A.', authorRole: 'ML Engineer', authorAvatar: '/avatar-3.jpg', image: '/team-culture-3.jpg' },
  { id: 9, category: 'Architecture', title: 'Event-Driven Architecture : Patterns et Anti-Patterns', excerpt: "Les patterns qui fonctionnent et ceux \u00E0 \u00E9viter selon notre exp\u00E9rience sur des projets enterprise...", date: '10 f\u00E9v 2026', readTime: '8 min', author: 'Thomas D.', authorRole: 'Cloud Architect', authorAvatar: '/avatar-4.jpg', image: '/hero-bg-gradient.jpg' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = ARTICLES.filter((a) => {
    const matchCat = activeCategory === 'Tous' || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ====== SECTION 1: HERO ====== */}
      <section className="relative bg-deep-navy pt-[160px] pb-16">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0F2240 40%, #1A1033 100%)' }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <SectionLabel text="Blog & Insights" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-4xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
          >
            Insights Tech & Transformation Digitale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mt-6 font-inter text-lg text-white/75 leading-relaxed"
          >
            Articles techniques, retours d'exp\u00E9rience, et analyses sectorielles par nos experts.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.6 }}
            className="mt-8 relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white/5 border border-white/[0.08] rounded-xl font-inter text-base text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
            />
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 2: FEATURED ARTICLE ====== */}
      <section className="bg-deep-navy pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto">
                <img
                  src={FEATURED_ARTICLE.image}
                  alt={FEATURED_ARTICLE.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className={`inline-flex items-center self-start px-3 py-1 rounded-full text-xs font-medium border ${CATEGORY_COLORS[FEATURED_ARTICLE.category]} mb-4`}>
                  {FEATURED_ARTICLE.category}
                </span>
                <h2 className="font-outfit text-2xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
                  {FEATURED_ARTICLE.title}
                </h2>
                <p className="font-inter text-base text-white/70 leading-relaxed mb-6">
                  {FEATURED_ARTICLE.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="flex items-center gap-1.5 font-inter text-sm text-neutral-400">
                    <Calendar className="w-4 h-4" /> {FEATURED_ARTICLE.date}
                  </span>
                  <span className="flex items-center gap-1.5 font-inter text-sm text-neutral-400">
                    <Clock className="w-4 h-4" /> {FEATURED_ARTICLE.readTime} de lecture
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={FEATURED_ARTICLE.authorAvatar}
                    alt={FEATURED_ARTICLE.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-inter text-sm font-medium text-white">{FEATURED_ARTICLE.author}</div>
                    <div className="font-inter text-xs text-neutral-400">{FEATURED_ARTICLE.authorRole}</div>
                  </div>
                </div>
                <button className="inline-flex items-center self-start font-inter text-sm font-semibold text-white bg-electric-blue rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-blue-glow transition-all">
                  Lire l'article
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== SECTION 3: CATEGORY FILTERS ====== */}
      <section className="bg-neutral-100 py-6 sticky top-[72px] z-30 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-inter text-sm font-medium px-4 py-2 rounded-full transition-all ${
                  activeCategory === cat
                    ? 'bg-electric-blue text-white'
                    : 'text-neutral-600 border border-neutral-200 hover:border-electric-blue hover:text-electric-blue bg-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 4: ARTICLE GRID ====== */}
      <section className="bg-neutral-100 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredArticles.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-350 cursor-pointer group"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${CATEGORY_COLORS[article.category]}`}>
                      {article.category}
                    </span>
                    <h3 className="font-outfit text-base font-semibold text-neutral-800 mt-3 line-clamp-2 leading-snug">
                      {article.title}
                    </h3>
                    <p className="font-inter text-sm text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="flex items-center gap-1 font-inter text-xs text-neutral-400">
                        <Calendar className="w-3.5 h-3.5" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1 font-inter text-xs text-neutral-400">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-neutral-100">
                      <img
                        src={article.authorAvatar}
                        alt={article.author}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-inter text-[13px] font-medium text-neutral-700">{article.author}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="font-inter text-neutral-400">Aucun article ne correspond \u00E0 vos crit\u00E8res.</p>
            </div>
          )}
        </div>
      </section>

      {/* ====== SECTION 5: NEWSLETTER CTA ====== */}
      <section className="bg-deep-navy py-20">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(0,85,255,0.08) 0%, transparent 50%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-xl mx-auto px-4 text-center"
        >
          <h2 className="font-outfit text-4xl font-semibold text-white mb-4">
            Ne Manquez Aucun Article
          </h2>
          <p className="font-inter text-base text-white/70 mb-8">
            Inscrivez-vous \u00E0 notre newsletter tech. Un email par semaine, z\u00E9ro spam.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-5 bg-white/5 border border-white/[0.08] rounded-xl font-inter text-base text-white placeholder-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-2 focus:ring-electric-blue/20"
              />
              <button
                type="submit"
                className="h-14 px-8 font-inter text-sm font-semibold text-white bg-electric-blue rounded-xl hover:-translate-y-0.5 hover:shadow-blue-glow transition-all whitespace-nowrap"
              >
                S'inscrire
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-4"
            >
              <p className="font-inter text-lg text-success-green font-medium">
                \u2713 Vous \u00EAtes inscrit !
              </p>
            </motion.div>
          )}

          <p className="mt-4 font-inter text-xs text-white/50">
            +2\u00A0500 abonn\u00E9s. D\u00E9sinscription \u00E0 tout moment.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
