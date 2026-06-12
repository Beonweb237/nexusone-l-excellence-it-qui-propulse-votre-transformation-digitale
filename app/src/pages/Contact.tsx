import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase, User, CheckCircle2, Mail, Phone, MapPin, Clock,
  Linkedin, Twitter, Github, Youtube, Upload, X, ArrowRight
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

/* ------------------------------------------------------------------ */
/*  FORM INPUT COMPONENT                                               */
/* ------------------------------------------------------------------ */

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const baseClass =
    'w-full h-[52px] px-4 rounded-lg border border-neutral-200 font-inter text-[15px] text-neutral-800 ' +
    'bg-white placeholder:text-neutral-400 focus:outline-none focus:border-electric-blue focus:ring-[3px] focus:ring-electric-blue/12 ' +
    'transition-all';

  return (
    <div>
      <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'select' && options ? (
        <select
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass + ' appearance-none cursor-pointer'}
        >
          <option value="">{placeholder || 'Selectionner...'}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className={baseClass + ' h-auto py-3 resize-none'}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUCCESS STATE COMPONENT                                            */
/* ------------------------------------------------------------------ */

function SuccessState({ title, desc, ctaText, ctaTo }: { title: string; desc: string; ctaText: string; ctaTo: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="text-center py-12"
    >
      <CheckCircle2 className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
      <h3 className="font-outfit text-2xl font-semibold text-neutral-800 mb-2">{title}</h3>
      <p className="font-inter text-neutral-600 mb-6">{desc}</p>
      <Link
        to={ctaTo}
        className="inline-flex items-center gap-2 font-inter text-sm font-semibold text-electric-blue hover:underline underline-offset-4"
      >
        {ctaText} <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Contact() {
  const [activeTrack, setActiveTrack] = useState<'client' | 'candidate'>('client');
  const [clientSubmitted, setClientSubmitted] = useState(false);
  const [candidateSubmitted, setCandidateSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  /* Client form state */
  const [clientForm, setClientForm] = useState<Record<string, string>>({
    nom: '', prenom: '', email: '', telephone: '', entreprise: '', poste: '',
    secteur: '', expertise: '', taille: '', message: '', rgpd: '',
  });

  /* Candidate form state */
  const [candidateForm, setCandidateForm] = useState<Record<string, string>>({
    nom: '', prenom: '', email: '', telephone: '', linkedin: '',
    profil: '', domaine: '', localisation: '', contrat: '', message: '', rgpd: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateClient = (field: string, val: string) =>
    setClientForm((prev) => ({ ...prev, [field]: val }));

  const updateCandidate = (field: string, val: string) =>
    setCandidateForm((prev) => ({ ...prev, [field]: val }));

  const handleCvDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') setCvFile(file);
  };

  const handleCvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFile(file);
  };

  const handleClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientSubmitted(true);
  };

  const handleCandidateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCandidateSubmitted(true);
  };

  return (
    <div className="min-h-[100dvh]">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-[45vh] flex items-center justify-center pt-[160px] pb-16 px-4"
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
          <SectionLabel text="Contact" className="justify-center" />
          <h1 className="font-outfit text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-tight tracking-tight mb-6">
            Discutons de Votre Projet
          </h1>
          <p className="font-inter text-lg text-white/75 leading-relaxed max-w-[600px] mx-auto">
            Vous etes un client/prospect ou un candidat ? Choisissez le formulaire adapte pour une reponse rapide.
          </p>
        </motion.div>
      </section>

      {/* ========== DUAL TRACK SELECTOR ========== */}
      <section className="pb-12 bg-deep-navy">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Client card */}
            <motion.button
              onClick={() => setActiveTrack('client')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative rounded-2xl p-8 text-center cursor-pointer border-2 transition-all duration-300 ${
                activeTrack === 'client'
                  ? 'border-electric-blue bg-electric-blue/[0.08]'
                  : 'border-white/10 bg-transparent hover:border-white/20'
              }`}
            >
              <Briefcase className={`w-9 h-9 mx-auto mb-3 ${activeTrack === 'client' ? 'text-electric-blue' : 'text-neutral-400'}`} />
              <h3 className="font-outfit text-xl font-semibold text-white mb-2">Client / Prospect</h3>
              <p className="font-inter text-sm text-neutral-400">
                Demande de devis, audit, information sur nos services.
              </p>
            </motion.button>

            {/* Candidate card */}
            <motion.button
              onClick={() => setActiveTrack('candidate')}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`relative rounded-2xl p-8 text-center cursor-pointer border-2 transition-all duration-300 ${
                activeTrack === 'candidate'
                  ? 'border-[#10B981] bg-[#10B981]/[0.08]'
                  : 'border-white/10 bg-transparent hover:border-white/20'
              }`}
            >
              <User className={`w-9 h-9 mx-auto mb-3 ${activeTrack === 'candidate' ? 'text-[#10B981]' : 'text-neutral-400'}`} />
              <h3 className="font-outfit text-xl font-semibold text-white mb-2">Candidat</h3>
              <p className="font-inter text-sm text-neutral-400">
                Candidature spontanee, question sur nos postes.
              </p>
            </motion.button>
          </div>
        </div>
      </section>

      {/* ========== CLIENT FORM ========== */}
      <AnimatePresence mode="wait">
        {activeTrack === 'client' && (
          <motion.section
            key="client-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="py-20 bg-neutral-100"
          >
            <div className="max-w-[700px] mx-auto px-4 sm:px-6">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                {!clientSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h3 className="font-outfit text-2xl sm:text-[28px] font-semibold text-neutral-800 mb-1">
                        Demande de Contact — Client
                      </h3>
                      <p className="font-inter text-[15px] text-neutral-400">
                        Notre equipe commerciale vous recontacte sous 24h.
                      </p>
                    </div>

                    <form onSubmit={handleClientSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Nom" name="nom" required placeholder="Votre nom" value={clientForm.nom} onChange={(v) => updateClient('nom', v)} />
                        <FormField label="Prenom" name="prenom" required placeholder="Votre prenom" value={clientForm.prenom} onChange={(v) => updateClient('prenom', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Email" name="email" type="email" required placeholder="votre@email.fr" value={clientForm.email} onChange={(v) => updateClient('email', v)} />
                        <FormField label="Telephone" name="telephone" type="tel" placeholder="+33 6 12 34 56 78" value={clientForm.telephone} onChange={(v) => updateClient('telephone', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Entreprise" name="entreprise" required placeholder="Nom de votre entreprise" value={clientForm.entreprise} onChange={(v) => updateClient('entreprise', v)} />
                        <FormField label="Poste" name="poste" placeholder="Votre fonction" value={clientForm.poste} onChange={(v) => updateClient('poste', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Secteur" name="secteur" type="select" required placeholder="Selectionner votre secteur" options={['Banque', 'Assurance', 'Sante', 'Industrie', 'Retail', 'Energie', 'Public', 'Autre']} value={clientForm.secteur} onChange={(v) => updateClient('secteur', v)} />
                        <FormField label="Expertise" name="expertise" type="select" required placeholder="Selectionner l'expertise" options={['Cloud', 'Software', 'Data/IA', 'Cybersecurite', 'ERP/CRM', 'DevOps', 'Autre/Multiple']} value={clientForm.expertise} onChange={(v) => updateClient('expertise', v)} />
                      </div>
                      <FormField label="Taille entreprise" name="taille" type="select" required placeholder="Selectionner la taille" options={['<50', '50-250', '250-1000', '1000-5000', '>5000']} value={clientForm.taille} onChange={(v) => updateClient('taille', v)} />
                      <FormField label="Message" name="message" type="textarea" required placeholder="Decrivez votre projet ou votre besoin..." value={clientForm.message} onChange={(v) => updateClient('message', v)} />

                      {/* RGPD */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          name="rgpd"
                          required
                          checked={!!clientForm.rgpd}
                          onChange={(e) => updateClient('rgpd', e.target.checked ? 'true' : '')}
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-electric-blue focus:ring-electric-blue"
                        />
                        <label className="font-inter text-sm text-neutral-600 leading-relaxed">
                          J&apos;accepte que NexusOne traite mes donnees pour repondre a ma demande.{" "}
                          <Link to="/" className="text-electric-blue hover:underline">Voir notre politique de confidentialite</Link>.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-[52px] font-inter text-[15px] font-semibold text-white bg-electric-blue rounded-lg hover:-translate-y-0.5 hover:shadow-blue-glow hover:brightness-110 active:translate-y-0 transition-all mt-4"
                      >
                        Envoyer ma demande
                      </button>
                    </form>
                  </>
                ) : (
                  <SuccessState
                    title="Merci pour votre message !"
                    desc="Notre equipe vous recontacte sous 24h ouvrables."
                    ctaText="Retour a l'accueil"
                    ctaTo="/"
                  />
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* ========== CANDIDATE FORM ========== */}
        {activeTrack === 'candidate' && (
          <motion.section
            key="candidate-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="py-20 bg-neutral-100"
          >
            <div className="max-w-[700px] mx-auto px-4 sm:px-6">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                {!candidateSubmitted ? (
                  <>
                    <div className="mb-8">
                      <h3 className="font-outfit text-2xl sm:text-[28px] font-semibold text-neutral-800 mb-1">
                        Candidature / Contact — Candidat
                      </h3>
                      <p className="font-inter text-[15px] text-neutral-400">
                        Notre equipe RH vous recontacte sous 48h.
                      </p>
                    </div>

                    <form onSubmit={handleCandidateSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Nom" name="cnom" required placeholder="Votre nom" value={candidateForm.nom} onChange={(v) => updateCandidate('nom', v)} />
                        <FormField label="Prenom" name="cprenom" required placeholder="Votre prenom" value={candidateForm.prenom} onChange={(v) => updateCandidate('prenom', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Email" name="cemail" type="email" required placeholder="votre@email.fr" value={candidateForm.email} onChange={(v) => updateCandidate('email', v)} />
                        <FormField label="Telephone" name="ctelephone" type="tel" placeholder="+33 6 12 34 56 78" value={candidateForm.telephone} onChange={(v) => updateCandidate('telephone', v)} />
                      </div>
                      <FormField label="LinkedIn" name="linkedin" type="url" placeholder="https://linkedin.com/in/..." value={candidateForm.linkedin} onChange={(v) => updateCandidate('linkedin', v)} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Profil" name="profil" type="select" required placeholder="Selectionner votre profil" options={['Junior', 'Confirme', 'Senior', 'Lead', 'Manager']} value={candidateForm.profil} onChange={(v) => updateCandidate('profil', v)} />
                        <FormField label="Domaine souhaite" name="domaine" type="select" required placeholder="Selectionner le domaine" options={['Cloud', 'Data', 'DevOps', 'Cybersecurite', 'Software', 'ERP/CRM']} value={candidateForm.domaine} onChange={(v) => updateCandidate('domaine', v)} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Localisation" name="localisation" type="select" required placeholder="Selectionner" options={['Paris', 'Lyon', 'Bordeaux', 'Nantes', 'Full Remote']} value={candidateForm.localisation} onChange={(v) => updateCandidate('localisation', v)} />
                        <FormField label="Type de contrat" name="contrat" type="select" required placeholder="Selectionner" options={['CDI', 'Freelance', 'Stage', 'Alternance']} value={candidateForm.contrat} onChange={(v) => updateCandidate('contrat', v)} />
                      </div>

                      {/* CV Upload */}
                      <div>
                        <label className="block font-inter text-sm font-medium text-neutral-700 mb-1.5">
                          CV (PDF, max 5Mo)
                        </label>
                        <div
                          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                          onDragLeave={() => setDragOver(false)}
                          onDrop={handleCvDrop}
                          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
                            dragOver
                              ? 'border-electric-blue bg-electric-blue/5'
                              : cvFile
                              ? 'border-[#10B981] bg-[#10B981]/5'
                              : 'border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleCvInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          {cvFile ? (
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                              <span className="font-inter text-sm text-neutral-700">{cvFile.name}</span>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setCvFile(null); }}
                                className="text-neutral-400 hover:text-red-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                              <p className="font-inter text-sm text-neutral-500">
                                Deposez votre CV ici ou <span className="text-electric-blue">cliquez pour parcourir</span>
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      <FormField label="Message" name="cmessage" type="textarea" placeholder="Votre message ou questions..." value={candidateForm.message} onChange={(v) => updateCandidate('message', v)} />

                      {/* RGPD */}
                      <div className="flex items-start gap-3 pt-2">
                        <input
                          type="checkbox"
                          name="crgpd"
                          required
                          checked={!!candidateForm.rgpd}
                          onChange={(e) => updateCandidate('rgpd', e.target.checked ? 'true' : '')}
                          className="mt-1 w-4 h-4 rounded border-neutral-300 text-[#10B981] focus:ring-[#10B981]"
                        />
                        <label className="font-inter text-sm text-neutral-600 leading-relaxed">
                          J&apos;accepte que NexusOne traite mes donnees pour mon processus de recrutement.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-[52px] font-inter text-[15px] font-semibold text-white bg-[#10B981] rounded-lg hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)] hover:brightness-110 active:translate-y-0 transition-all mt-4"
                      >
                        Envoyer ma candidature
                      </button>
                    </form>
                  </>
                ) : (
                  <SuccessState
                    title="Merci pour votre candidature !"
                    desc="Notre equipe RH vous recontacte sous 48h ouvrables."
                    ctaText="Retour a l'accueil"
                    ctaTo="/"
                  />
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ========== CONTACT INFO & MAP ========== */}
      <section className="py-20 bg-deep-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
            >
              <h3 className="font-outfit text-2xl font-semibold text-white mb-8">Nos Coordonnees</h3>

              <div className="space-y-5 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-neutral-400">Email</p>
                    <p className="font-inter text-[15px] text-white">contact@nexusone.fr</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-neutral-400">Telephone</p>
                    <p className="font-inter text-[15px] text-white">01 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-neutral-400">Adresse</p>
                    <p className="font-inter text-[15px] text-white">Tour Granite, La Defense, 92000 Paris</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="font-inter text-sm text-neutral-400">Horaires</p>
                    <p className="font-inter text-[15px] text-white">Lun-Ven, 9h-18h</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {[Linkedin, Twitter, Github, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-neutral-400 hover:text-white hover:border-electric-blue/30 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                ))}
              </div>

              {/* Response time promises */}
              <div className="mt-10 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="font-inter text-sm text-white/70">Reponse client sous 24h ouvrables</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span className="font-inter text-sm text-white/70">Reponse candidat sous 48h ouvrables</span>
                </div>
              </div>
            </motion.div>

            {/* Right — Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="relative h-[300px] rounded-2xl bg-neutral-800 border border-white/[0.08] overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            >
              <div className="text-center">
                <MapPin className="w-12 h-12 text-electric-blue mx-auto mb-3" />
                <p className="font-outfit text-lg font-semibold text-white">Paris — La Defense</p>
                <p className="font-inter text-sm text-neutral-400 mt-1">Tour Granite, 92000</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
