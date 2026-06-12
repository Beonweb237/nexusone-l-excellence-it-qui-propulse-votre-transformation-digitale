import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare, TrendingUp, Search, Eye, FileText, Users,
  ArrowRight, Database, Sparkles, Brain,
  Server, BarChart3, Layers, ArrowRight as ArrowRightIcon,
  Workflow, FlaskConical, Gauge, Repeat
} from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ──────────────────────── data ──────────────────────── */

const aiUseCases = [
  {
    icon: MessageSquare,
    title: 'IA Générative & LLMs',
    desc: 'Chatbots métiers, génération de documents, assistants virtuels',
    metric: '-70% de temps de traitement',
  },
  {
    icon: TrendingUp,
    title: 'Prédiction & Forecasting',
    desc: 'Prédiction de demande, scoring, maintenance prédictive',
    metric: '+35% de précision',
  },
  {
    icon: Search,
    title: 'Recherche Intelligente',
    desc: 'RAG (Retrieval-Augmented Generation), semantic search',
    metric: 'Relevance +50%',
  },
  {
    icon: Eye,
    title: 'Computer Vision',
    desc: 'Contrôle qualité, reconnaissance, comptage automatique',
    metric: "-90% d'erreurs de détection",
  },
  {
    icon: FileText,
    title: 'NLP & Document AI',
    desc: 'Extraction automatique, classification, résumé',
    metric: '-80% de traitement manuel',
  },
  {
    icon: Users,
    title: 'Personnalisation',
    desc: 'Recommandation, segmentation, next-best-action',
    metric: '+25% de conversion',
  },
];

const pipelineStages = [
  { name: 'Ingestion', icon: Database, desc: 'Batch et streaming, CDC, API connectors', techs: 'Kafka, Airbyte, Fivetran, AWS Kinesis, Azure Event Hubs' },
  { name: 'Stockage', icon: Server, desc: 'Data Lakehouse, zone chaude/froide', techs: 'Snowflake, Databricks, S3, ADLS, BigQuery, Delta Lake' },
  { name: 'Traitement', icon: Layers, desc: 'ELT moderne, transformation SQL, orchestration', techs: 'Spark, dbt, Airflow, Prefect, dbt' },
  { name: 'ML/IA', icon: Brain, desc: 'Entraînement, déploiement, monitoring de modèles', techs: 'TensorFlow, PyTorch, MLflow, SageMaker, Vertex AI' },
  { name: 'Visualisation', icon: BarChart3, desc: 'Dashboards métiers, data apps, alerting', techs: 'Power BI, Tableau, Streamlit, Grafana, Looker' },
];

const mlopsSteps = [
  { num: '01', title: 'Exploration', desc: 'Analyse des données, feature engineering, choix du modèle', icon: Search },
  { num: '02', title: 'Entraînement', desc: 'Training, validation, hyperparameter tuning, versioning', icon: FlaskConical },
  { num: '03', title: 'Évaluation', desc: 'Métriques, fairness, tests A/B, validation métier', icon: Gauge },
  { num: '04', title: 'Déploiement', desc: 'CI/CD pour ML, canary deployment, rollback automatique', icon: Workflow },
  { num: '05', title: 'Monitoring', desc: 'Drift detection, performance tracking, retraining triggers', icon: Repeat },
];

const genAIFeatures = [
  {
    title: 'RAG — Réponses Fondées sur Vos Données',
    desc: 'Nos solutions RAG connectent des LLMs (OpenAI, Mistral, Llama) à vos bases de connaissances internes. Résultat : des réponses précises, sourcées, et sans hallucinations.',
    stack: ['LangChain', 'LlamaIndex', 'Pinecone', 'Weaviate', 'OpenAI', 'Mistral'],
    useCase: "Assistant juridique pour un cabinet d'avocats — 10,000+ documents indexés",
  },
  {
    title: 'Agents IA Autonomes',
    desc: "Des agents qui exécutent des tâches complexes de bout en bout : recherche, analyse, génération, validation. Connectés à vos outils métiers (CRM, ERP, email).",
    stack: ['CrewAI', 'AutoGen', 'LangGraph', 'Function Calling'],
    useCase: 'Agent de qualification de leads — 500+ leads traités/jour',
  },
  {
    title: 'Fine-tuning de Modèles',
    desc: 'Adaptez des modèles open-source (Llama, Mistral) à votre domaine métier. Données propriétaires, inférence locale, contrôle total.',
    stack: ['Hugging Face', 'LoRA', 'QLoRA', 'vLLM', 'Ollama'],
    useCase: 'Modèle spécialisé médical — 95% de précision sur classification',
  },
];

const caseStudies = [
  { title: 'Groupe Hospitalier — Plateforme Data Prédictive', metric: "+35% d'efficacité opérationnelle", tags: ['Snowflake', 'Python', 'MLflow'] },
  { title: 'Assureur — Détection de Fraude par IA', metric: '-60% de faux positifs', tags: ['TensorFlow', 'Kafka', 'Elasticsearch'] },
  { title: 'Retail — Moteur de Recommandation Temps Réel', metric: '+25% de panier moyen', tags: ['Spark', 'Redis', 'Python'] },
];

const techStack = [
  { category: 'Data Platform', items: ['Snowflake', 'Databricks', 'BigQuery', 'Redshift', 'Delta Lake'] },
  { category: 'ML/IA', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'OpenAI'] },
  { category: 'MLOps', items: ['MLflow', 'Kubeflow', 'SageMaker', 'Vertex AI', 'Weights & Biases'] },
  { category: 'Orchestration', items: ['Airflow', 'Prefect', 'Dagster', 'dbt'] },
  { category: 'Streaming', items: ['Kafka', 'Spark Streaming', 'Flink', 'Kinesis'] },
  { category: 'Vector DB', items: ['Pinecone', 'Weaviate', 'Chroma', 'pgvector'] },
];

/* ──────────────────────── component ──────────────────────── */

export default function DataAI() {
  return (
    <div className="min-h-[100dvh]">
      {/* ══════════ Hero ══════════ */}
      <section className="relative min-h-[70vh] pt-[160px] pb-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute top-1/2 left-[40%] w-[450px] h-[450px] rounded-full bg-tech-purple/18 blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              className="font-inter text-[13px] text-neutral-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.4 }}
            >
              <Link to="/expertises" className="hover:text-electric-blue transition-colors">Expertises</Link>
              <span className="mx-2">/</span>
              <span>Data & IA</span>
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25, duration: 0.5 }}>
              <SectionLabel text="Data & Intelligence Artificielle" className="mt-4" />
            </motion.div>
            <motion.h1
              className="mt-4 font-outfit text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-[1.15] tracking-tight"
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
            >
              Transformez Vos Données en Décisions
            </motion.h1>
            <motion.p
              className="mt-6 font-inter text-lg text-white/75 max-w-xl"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.55 }}
            >
              Data engineering, Machine Learning, IA générative. Nos data scientists et ML engineers transforment vos données en avantage concurrentiel mesurable.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-tech-purple rounded-lg px-6 py-3 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,58,237,0.35)] hover:brightness-110 active:translate-y-0 transition-all">
                Demander une démo data
              </Link>
              <a href="#use-cases" className="font-inter text-[15px] font-medium text-white border-[1.5px] border-white/30 rounded-lg px-6 py-3 hover:border-tech-purple hover:bg-tech-purple/8 transition-all">
                Nos cas d&apos;usage IA
              </a>
            </motion.div>
          </div>

          {/* Right - Pipeline Visual */}
          <motion.div
            className="hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.5 }}
          >
            <div className="glassmorphism rounded-2xl p-8 animate-float">
              <img
                src="/data-pipeline.svg"
                alt="Data Pipeline Architecture"
                className="w-full max-w-md h-auto"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="grid grid-cols-5 gap-2 mt-6">
                {['Ingest', 'Store', 'Process', 'ML', 'Visualize'].map((s) => (
                  <div key={s} className="text-center py-2 bg-tech-purple/10 rounded-md border border-tech-purple/20">
                    <span className="font-inter text-[10px] font-medium text-white/70">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ AI Use Cases Grid ══════════ */}
      <section id="use-cases" className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800">
              Cas d&apos;Usage IA & Data
            </h2>
            <p className="mt-3 font-inter text-lg text-neutral-600">
              Des solutions concrètes pour des résultats mesurables
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiUseCases.map((uc, i) => (
              <UseCaseCard key={uc.title} uc={uc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Data Pipeline Architecture ══════════ */}
      <section className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10 text-center">
            Architecture Data Moderne
          </h2>

          {/* Pipeline visualization */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {pipelineStages.map((stage, i) => (
                <PipelineStage key={stage.name} stage={stage} index={i} />
              ))}
            </div>
            {/* Connecting arrows - desktop only */}
            <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 justify-between px-[10%] pointer-events-none z-10">
              {[0, 1, 2, 3].map((i) => (
                <ArrowRightIcon key={i} className="w-5 h-5 text-electric-blue/40" />
              ))}
            </div>
          </div>

          {/* Pipeline diagram image */}
          <motion.div
            className="mt-12 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 md:p-10"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <img
              src="/data-pipeline.svg"
              alt="Architecture Data Pipeline"
              className="w-full h-auto max-w-4xl mx-auto"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════ MLOps Process ══════════ */}
      <section className="py-20 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10 text-center">
            MLOps : du Modèle à la Production
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {mlopsSteps.map((step, i) => (
              <MLOpsStep key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ GenAI Capabilities ══════════ */}
      <section className="py-24 px-4 sm:px-6 aurora-gradient">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="IA Générative" />
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white mb-10">
            L&apos;IA Générative au Service de Votre Entreprise
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {genAIFeatures.map((feat, i) => (
              <GenAICard key={feat.title} feat={feat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ Case Studies ══════════ */}
      <section className="py-24 px-4 sm:px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-neutral-800 mb-10">
            Projets Data & IA Marquants
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
            Notre Stack Data & IA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ══════════ CTA Banner ══════════ */}
      <section className="relative py-20 px-4 sm:px-6 aurora-gradient overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-tech-purple/20 blur-[120px] animate-pulse-glow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="font-outfit text-3xl sm:text-[42px] font-semibold text-white leading-tight">
            Transformez Vos Données en Or
          </h2>
          <p className="mt-4 font-inter text-lg text-white/75">
            Démo personnalisée — Notre équipe data vous recontacte sous 24h.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="font-inter text-[15px] font-semibold text-white bg-tech-purple rounded-lg px-8 py-3.5 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,58,237,0.35)] hover:brightness-110 active:translate-y-0 transition-all">
              Demander une démo
            </Link>
          </div>
          <p className="mt-4 font-inter text-[13px] text-white/50">
            Réponse sous 24h. Sans engagement.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────── sub-components ──────────────────────── */

function UseCaseCard({ uc, index }: { uc: typeof aiUseCases[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const Icon = uc.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-8 border border-neutral-200 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-350"
      style={{ borderTop: '3px solid #7C3AED' }}
    >
      <Icon className="w-8 h-8 text-tech-purple" />
      <h3 className="mt-5 font-outfit text-xl font-semibold text-neutral-800">{uc.title}</h3>
      <p className="mt-2 font-inter text-[15px] text-neutral-600">{uc.desc}</p>
      <p className="mt-4 font-mono text-sm text-tech-purple italic">{uc.metric}</p>
    </motion.div>
  );
}

function PipelineStage({ stage, index }: { stage: typeof pipelineStages[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = stage.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: easeOutExpo, delay: index * 0.15 }}
      className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 hover:border-electric-blue/30 hover:bg-electric-blue/5 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-electric-blue/15 flex items-center justify-center">
          <Icon className="w-5 h-5 text-electric-blue" />
        </div>
        <h4 className="font-outfit text-base font-semibold text-white">{stage.name}</h4>
      </div>
      <p className="font-inter text-sm text-white/60">{stage.desc}</p>
      <p className="mt-2 font-inter text-xs text-white/40">{stage.techs}</p>
    </motion.div>
  );
}

function MLOpsStep({ step, index }: { step: typeof mlopsSteps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOutExpo, delay: index * 0.12 }}
      className="relative"
    >
      <div className="bg-white rounded-xl p-6 border border-neutral-200 hover:shadow-card-hover transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xl font-bold text-tech-purple">{step.num}</span>
          <Icon className="w-5 h-5 text-tech-purple" />
        </div>
        <h4 className="font-outfit text-base font-semibold text-neutral-800">{step.title}</h4>
        <p className="mt-2 font-inter text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
      </div>
      {index < mlopsSteps.length - 1 && (
        <div className="hidden lg:flex absolute top-1/2 -right-3 z-10">
          <ArrowRight className="w-5 h-5 text-neutral-400" />
        </div>
      )}
    </motion.div>
  );
}

function GenAICard({ feat, index }: { feat: typeof genAIFeatures[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.12 }}
      className="glassmorphism rounded-2xl p-8 md:p-10"
    >
      <Sparkles className="w-8 h-8 text-tech-purple mb-5" />
      <h3 className="font-outfit text-xl font-semibold text-white leading-snug">{feat.title}</h3>
      <p className="mt-3 font-inter text-[15px] text-white/70 leading-relaxed">{feat.desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {feat.stack.map((s) => (
          <span key={s} className="font-inter text-xs font-medium text-tech-purple bg-tech-purple/15 border border-tech-purple/25 rounded-full px-3 py-1.5">
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-white/[0.08]">
        <p className="font-inter text-sm text-white/50 italic">
          <span className="text-success-green font-medium not-italic">Use case :</span> {feat.useCase}
        </p>
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
