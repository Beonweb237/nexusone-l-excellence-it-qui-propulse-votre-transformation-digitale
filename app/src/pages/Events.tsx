import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar, Clock, Video, MapPin, Play, Eye
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const EVENT_TYPES = ['Tous', 'Webinars', 'Meetups', 'Conf\u00E9rences', 'Workshops'];

const TYPE_COLORS: Record<string, string> = {
  Webinar: 'text-[#0055FF] bg-[#0055FF]/10 border-[#0055FF]/20',
  Meetup: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
  Conf\u00E9rence: 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20',
  Workshop: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
};

interface UpcomingEvent {
  id: number;
  type: string;
  title: string;
  day: string;
  month: string;
  time: string;
  format: string;
  formatIcon: 'video' | 'mapPin';
  speakers: { name: string; avatar: string }[];
  image: string;
}

const UPCOMING_EVENTS: UpcomingEvent[] = [
  { id: 1, type: 'Webinar', title: 'Zero Trust : Mise en \u0152uvre Pratique', day: '28', month: 'MAR', time: '11h\u201312h', format: 'En ligne', formatIcon: 'video', speakers: [{ name: 'Karim B.', avatar: '/avatar-2.jpg' }], image: '/event-webinar-2.jpg' },
  { id: 2, type: 'Meetup', title: 'Cloud Native Paris by NexusOne', day: '3', month: 'AVR', time: '19h\u201321h', format: 'Paris', formatIcon: 'mapPin', speakers: [{ name: 'Communaut\u00E9', avatar: '/avatar-1.jpg' }], image: '/team-culture-1.jpg' },
  { id: 3, type: 'Webinar', title: 'MLOps avec MLflow et Kubernetes', day: '10', month: 'AVR', time: '14h\u201315h30', format: 'En ligne', formatIcon: 'video', speakers: [{ name: 'Lucie A.', avatar: '/avatar-3.jpg' }], image: '/event-webinar-1.jpg' },
  { id: 4, type: 'Conf\u00E9rence', title: 'DevOpsDays Paris \u2014 Sponsor', day: '15\u201316', month: 'AVR', time: '9h\u201318h', format: 'Paris', formatIcon: 'mapPin', speakers: [{ name: 'Team NexusOne', avatar: '/avatar-4.jpg' }], image: '/about-office.jpg' },
  { id: 5, type: 'Workshop', title: 'Hands-on Terraform', day: '22', month: 'AVR', time: '9h\u201317h', format: 'Lyon', formatIcon: 'mapPin', speakers: [{ name: 'Thomas D.', avatar: '/avatar-4.jpg' }], image: '/team-culture-2.jpg' },
  { id: 6, type: 'Webinar', title: 'NIS2 : Ce qui Change en 2026', day: '29', month: 'AVR', time: '11h\u201312h', format: 'En ligne', formatIcon: 'video', speakers: [{ name: 'Karim B.', avatar: '/avatar-2.jpg' }], image: '/event-webinar-2.jpg' },
];

const PAST_EVENTS = [
  { id: 1, title: 'FinOps Avanc\u00E9 : Optimisation AWS', date: '15 f\u00E9v 2026', views: 342, duration: '52 min', image: '/case-study-energy.jpg' },
  { id: 2, title: 'RAG en Enterprise : Patterns et Pitfalls', date: '8 f\u00E9v 2026', views: 512, duration: '68 min', image: '/case-study-bank.jpg' },
  { id: 3, title: 'S\u00E9curit\u00E9 Kubernetes : Best Practices', date: '1 f\u00E9v 2026', views: 289, duration: '55 min', image: '/event-webinar-2.jpg' },
  { id: 4, title: 'Data Mesh : Exp\u00E9rience d\'une Grande Banque', date: '25 jan 2026', views: 401, duration: '61 min', image: '/case-study-health.jpg' },
  { id: 5, title: 'Platform Engineering : Retour d\'Exp\u00E9rience', date: '18 jan 2026', views: 378, duration: '58 min', image: '/team-culture-3.jpg' },
  { id: 6, title: 'IA G\u00E9n\u00E9rative : 6 Mois en Production', date: '11 jan 2026', views: 623, duration: '72 min', image: '/event-webinar-1.jpg' },
];

/* Target date for countdown: March 25, 2026 */
const WEBINAR_DATE = new Date('2026-03-25T14:00:00');

/* ------------------------------------------------------------------ */
/*  Countdown hook                                                     */
/* ------------------------------------------------------------------ */

function useCountdown(targetDate: Date) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) { setDays(0); setHours(0); setMinutes(0); return; }
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((diff / (1000 * 60)) % 60));
    };
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return { days, hours, minutes };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { days, hours, minutes } = useCountdown(WEBINAR_DATE);

  const filteredEvents = activeFilter === 'Tous'
    ? UPCOMING_EVENTS
    : UPCOMING_EVENTS.filter((e) => e.type === activeFilter);

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
            <SectionLabel text="\u00C9v\u00E9nements" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-4xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
          >
            Webinars, Meetups & Conf\u00E9rences
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="mt-6 font-inter text-lg text-white/75 leading-relaxed"
          >
            Rejoignez nos experts tech pour des sessions pratiques sur les derni\u00E8res technologies et tendances du march\u00E9.
          </motion.p>
        </div>
      </section>

      {/* ====== SECTION 2: NEXT WEBINAR HIGHLIGHT ====== */}
      <section className="bg-electric-blue py-16 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[60%_40%] gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white text-electric-blue mb-4">
                Prochain Webinar
              </span>
              <h2 className="font-outfit text-3xl md:text-4xl font-semibold text-white mb-4 leading-tight">
                Kubernetes 1.30 en Production : Retour d'Exp\u00E9rience
              </h2>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="flex items-center gap-1.5 font-inter text-sm text-white/85">
                  <Calendar className="w-4 h-4" /> 25 mars 2026
                </span>
                <span className="flex items-center gap-1.5 font-inter text-sm text-white/85">
                  <Clock className="w-4 h-4" /> 14h \u2013 15h30
                </span>
                <span className="flex items-center gap-1.5 font-inter text-sm text-white/85">
                  <Video className="w-4 h-4" /> En ligne (Zoom)
                </span>
              </div>
              <div className="flex items-center gap-3 mb-5">
                <img src="/avatar-4.jpg" alt="Thomas Durand" className="w-8 h-8 rounded-full object-cover" />
                <img src="/avatar-1.jpg" alt="Sarah Martin" className="w-8 h-8 rounded-full object-cover -ml-2" />
                <span className="font-inter text-sm text-white/85">Thomas Durand & Sarah Martin</span>
              </div>
              <p className="font-inter text-base text-white/85 leading-relaxed max-w-xl">
                Nos experts Cloud partagent leur exp\u00E9rience de migration vers Kubernetes 1.30 en production. Bonnes pratiques, pitfalls, et nouvelles fonctionnalit\u00E9s \u00E0 adopter.
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="text-center lg:text-right"
            >
              {/* Countdown */}
              <div className="flex items-center justify-center lg:justify-end gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[70px]">
                  <div className="font-mono text-3xl font-bold text-white">{days}</div>
                  <div className="font-inter text-[11px] text-white/70 uppercase">jours</div>
                </div>
                <span className="font-mono text-2xl text-white/50">:</span>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[70px]">
                  <div className="font-mono text-3xl font-bold text-white">{String(hours).padStart(2, '0')}</div>
                  <div className="font-inter text-[11px] text-white/70 uppercase">heures</div>
                </div>
                <span className="font-mono text-2xl text-white/50">:</span>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[70px]">
                  <div className="font-mono text-3xl font-bold text-white">{String(minutes).padStart(2, '0')}</div>
                  <div className="font-inter text-[11px] text-white/70 uppercase">min</div>
                </div>
              </div>

              <button className="inline-flex items-center font-inter text-sm font-semibold text-electric-blue bg-white rounded-lg px-8 py-4 hover:-translate-y-0.5 hover:shadow-lg transition-all mb-3">
                S'inscrire gratuitement
              </button>
              <p className="font-inter text-[13px] text-white/70">
                Places limit\u00E9es \u00E0 200 participants
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: UPCOMING EVENTS ====== */}
      <section className="bg-neutral-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-neutral-800 mb-8"
          >
            \u00C0 Venir
          </motion.h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`font-inter text-sm font-medium px-4 py-2 rounded-full transition-all ${
                  activeFilter === type
                    ? 'bg-electric-blue text-white'
                    : 'text-neutral-600 border border-neutral-200 hover:border-electric-blue hover:text-electric-blue bg-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="bg-white border border-neutral-200 rounded-2xl p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-350"
              >
                {/* Date + Type row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-center min-w-[56px]">
                    <div className="font-mono text-[32px] font-bold text-neutral-800 leading-none">{event.day}</div>
                    <div className="font-inter text-[13px] text-neutral-400 uppercase tracking-wider">{event.month}</div>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[event.type] || TYPE_COLORS.Webinar}`}>
                    {event.type}
                  </span>
                </div>

                {/* Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>

                <h3 className="font-outfit text-xl font-semibold text-neutral-800 mb-3 leading-snug">{event.title}</h3>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 font-inter text-[13px] text-neutral-400">
                    <Clock className="w-3.5 h-3.5" /> {event.time}
                  </span>
                  <span className="flex items-center gap-1 font-inter text-[13px] text-neutral-400">
                    {event.formatIcon === 'video' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                    {event.format}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  {event.speakers.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <img src={s.avatar} alt={s.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="font-inter text-[13px] text-neutral-600">{s.name}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full font-inter text-sm font-semibold text-white bg-electric-blue rounded-lg px-5 py-3 hover:-translate-y-0.5 hover:shadow-blue-glow transition-all">
                  S'inscrire
                </button>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-neutral-400 font-inter">Aucun \u00E9v\u00E9nement dans cette cat\u00E9gorie.</div>
          )}
        </div>
      </section>

      {/* ====== SECTION 4: PAST EVENTS & REPLAYS ====== */}
      <section className="bg-deep-navy py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-outfit text-[42px] font-semibold text-white mb-10"
          >
            Replay & Archives
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_EVENTS.map((evt, i) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 hover:bg-white/[0.05] hover:border-[#0055FF]/30 transition-all group"
              >
                {/* Thumbnail with play */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-electric-blue/90 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Play icon */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-electric-blue/20 flex items-center justify-center group-hover:bg-electric-blue/30 transition-colors">
                    <Play className="w-4 h-4 text-electric-blue ml-0.5" />
                  </div>
                </div>

                <h3 className="font-outfit text-base font-semibold text-white mb-3 text-center leading-snug">
                  {evt.title}
                </h3>

                <div className="flex items-center justify-center gap-4">
                  <span className="font-inter text-xs text-neutral-400">{evt.date}</span>
                  <span className="flex items-center gap-1 font-inter text-xs text-neutral-400">
                    <Eye className="w-3.5 h-3.5" /> {evt.views} vues
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
                    <Clock className="w-3.5 h-3.5" /> {evt.duration}
                  </span>
                </div>

                <button className="block w-full text-center mt-4 font-inter text-sm font-medium text-electric-blue hover:underline underline-offset-4 transition-all">
                  Voir le replay
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 5: NEWSLETTER CTA ====== */}
      <section className="bg-neutral-100 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto px-4 text-center"
        >
          <h2 className="font-outfit text-4xl font-semibold text-neutral-800 mb-4">
            Ne Ratez Aucun \u00C9v\u00E9nement
          </h2>
          <p className="font-inter text-base text-neutral-600 mb-8">
            Inscrivez-vous pour recevoir nos invitations en avant-premi\u00E8re.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 px-5 bg-white border border-neutral-200 rounded-xl font-inter text-base text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-3 focus:ring-electric-blue/12"
              />
              <button
                type="submit"
                className="h-14 px-8 font-inter text-sm font-semibold text-white bg-electric-blue rounded-xl hover:-translate-y-0.5 hover:shadow-blue-glow transition-all whitespace-nowrap"
              >
                M'inscrire
              </button>
            </form>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-4">
              <p className="font-inter text-lg text-success-green font-medium">\u2713 Inscription confirm\u00E9e !</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
