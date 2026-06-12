import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  Clock,
  FileText,
  User,
  Users,
  Settings,
  ChevronRight,
  Search,
  Bell,
  Briefcase,
  Building2,
  BarChart3,
  CheckCircle2,
  Circle,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Filter,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

interface Project {
  id: string;
  name: string;
  client: string;
  role: string;
  startDate: string;
  endDate: string;
  status: 'En Cours' | 'En Attente' | 'Terminé' | 'Archivé';
  progress: number;
  description: string;
  team: TeamMember[];
  deliverables: Deliverable[];
  activity: ActivityItem[];
}

interface TeamMember {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

interface Deliverable {
  name: string;
  status: 'complete' | 'in-progress' | 'pending';
}

interface ActivityItem {
  date: string;
  user: string;
  action: string;
}

interface Consultant {
  id: string;
  name: string;
  email: string;
  level: string;
  skills: string[];
  certifications: string[];
  currentProject: string;
  availability: 'Disponible' | 'En Mission' | 'Bientôt Disponible';
}

interface TimesheetDay {
  day: string;
  hours: number;
}

/* ------------------------------------------------------------------ */
/*  DEMO DATA                                                          */
/* ------------------------------------------------------------------ */

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Migration Cloud Banque Pop',
    client: 'Banque Populaire',
    role: 'Lead Architecte Cloud',
    startDate: 'Jan 2026',
    endDate: 'Juin 2026',
    status: 'En Cours',
    progress: 68,
    description: 'Migration complète de l\'infrastructure on-premise vers AWS. Déploiement d\'une Landing Zone, migration de 200+ workloads, mise en place du FinOps et knowledge transfer.',
    team: [
      { name: 'Thomas Martin', role: 'Lead Architecte', email: 'thomas.m@nexusone.fr', avatar: 'TM' },
      { name: 'Sophie Bernard', role: 'Cloud Engineer', email: 'sophie.b@nexusone.fr', avatar: 'SB' },
      { name: 'Lucas Pereira', role: 'DevOps Engineer', email: 'lucas.p@nexusone.fr', avatar: 'LP' },
      { name: 'Emma Dubois', role: 'Data Engineer', email: 'emma.d@nexusone.fr', avatar: 'ED' },
      { name: 'Nicolas Laurent', role: 'Security Consultant', email: 'nicolas.l@nexusone.fr', avatar: 'NL' },
      { name: 'Camille Rousseau', role: 'Project Manager', email: 'camille.r@nexusone.fr', avatar: 'CR' },
    ],
    deliverables: [
      { name: 'Landing Zone AWS', status: 'complete' },
      { name: 'Migration 200 workloads', status: 'complete' },
      { name: 'Optimisation FinOps', status: 'in-progress' },
      { name: 'Knowledge transfer', status: 'pending' },
      { name: 'Documentation runbooks', status: 'in-progress' },
    ],
    activity: [
      { date: '2 juin 2026', user: 'Thomas Martin', action: 'A validé la migration du batch 4 (50 workloads)' },
      { date: '28 mai 2026', user: 'Sophie Bernard', action: 'A déployé les policies FinOps sur l\'environnement de prod' },
      { date: '25 mai 2026', user: 'Lucas Pereira', action: 'A configuré les pipelines CI/CD pour le déploiement automatique' },
      { date: '20 mai 2026', user: 'Camille Rousseau', action: 'A envoyé le rapport de sprint au client' },
    ],
  },
  {
    id: '2',
    name: 'SI Santé Hôpital',
    client: 'AP-HP',
    role: 'Data Engineer Senior',
    startDate: 'Sep 2025',
    endDate: 'Mars 2026',
    status: 'En Cours',
    progress: 82,
    description: 'Construction d\'une plateforme data unifiée pour l\'agrégation des données patient. Mise en place d\'un lakehouse avec Databricks, pipelines ETL et dashboards Power BI.',
    team: [
      { name: 'Emma Dubois', role: 'Data Engineer Lead', email: 'emma.d@nexusone.fr', avatar: 'ED' },
      { name: 'Alexandre Petit', role: 'ML Engineer', email: 'alex.p@nexusone.fr', avatar: 'AP' },
      { name: 'Julie Moreau', role: 'Data Analyst', email: 'julie.m@nexusone.fr', avatar: 'JM' },
    ],
    deliverables: [
      { name: 'Architecture lakehouse', status: 'complete' },
      { name: 'Pipelines ingestion', status: 'complete' },
      { name: 'Modèles ML prédictifs', status: 'in-progress' },
      { name: 'Dashboards métiers', status: 'pending' },
    ],
    activity: [
      { date: '1 juin 2026', user: 'Emma Dubois', action: 'A finalisé le pipeline de ingestion temps réel' },
      { date: '29 mai 2026', user: 'Alexandre Petit', action: 'A livré le modèle de prédiction des readmissions' },
    ],
  },
  {
    id: '3',
    name: 'Audit Sécurité Orange',
    client: 'Orange Cyberdefense',
    role: 'Consultant Cybersécurité',
    startDate: 'Fév 2026',
    endDate: 'Avr 2026',
    status: 'En Cours',
    progress: 45,
    description: 'Audit de sécurité complet du SI : test d\'intrusion, analyse de vulnérabilités, revue des politiques de sécurité et recommandations conformité NIS2.',
    team: [
      { name: 'Nicolas Laurent', role: 'Lead Security', email: 'nicolas.l@nexusone.fr', avatar: 'NL' },
      { name: 'Thomas Martin', role: 'Architecte SI', email: 'thomas.m@nexusone.fr', avatar: 'TM' },
    ],
    deliverables: [
      { name: 'Rapport audit technique', status: 'in-progress' },
      { name: 'Plan de remédiation', status: 'pending' },
      { name: 'Policies sécurité', status: 'in-progress' },
    ],
    activity: [
      { date: '30 mai 2026', user: 'Nicolas Laurent', action: 'A terminé la phase de reconnaissance du périmètre' },
      { date: '25 mai 2026', user: 'Thomas Martin', action: 'A documenté l\'architecture réseau existante' },
    ],
  },
  {
    id: '4',
    name: 'ERP SAP Secteur Public',
    client: 'Ministère des Finances',
    role: 'Consultant SAP FI/CO',
    startDate: 'Oct 2025',
    endDate: 'Déc 2025',
    status: 'Terminé',
    progress: 100,
    description: 'Implémentation du module SAP S/4HANA Finance et Controlling. Migration des données financières, paramétrage des flux et formation des équipes.',
    team: [
      { name: 'Marie Lefebvre', role: 'Consultant SAP Lead', email: 'marie.l@nexusone.fr', avatar: 'ML' },
      { name: 'Pierre Durand', role: 'Consultant SAP Junior', email: 'pierre.d@nexusone.fr', avatar: 'PD' },
    ],
    deliverables: [
      { name: 'Paramétrage SAP FI/CO', status: 'complete' },
      { name: 'Migration données', status: 'complete' },
      { name: 'Formation utilisateurs', status: 'complete' },
    ],
    activity: [
      { date: '15 déc 2025', user: 'Marie Lefebvre', action: 'A clôturé le projet avec succès' },
      { date: '10 déc 2025', user: 'Pierre Durand', action: 'A finalisé les sessions de formation' },
    ],
  },
  {
    id: '5',
    name: 'Plateforme IoT Industrie',
    client: 'Schneider Electric',
    role: 'Architecte IoT',
    startDate: 'Avr 2026',
    endDate: 'Sep 2026',
    status: 'En Attente',
    progress: 10,
    description: 'Conception d\'une plateforme IoT pour la collecte et l\'analyse des données des capteurs industriels. Architecture serverless, time-series DB et visualisation temps réel.',
    team: [
      { name: 'Lucas Pereira', role: 'Architecte IoT', email: 'lucas.p@nexusone.fr', avatar: 'LP' },
      { name: 'Sophie Bernard', role: 'Cloud Engineer', email: 'sophie.b@nexusone.fr', avatar: 'SB' },
    ],
    deliverables: [
      { name: 'Architecture cible', status: 'in-progress' },
      { name: 'Proof of Concept', status: 'pending' },
      { name: 'Déploiement production', status: 'pending' },
    ],
    activity: [
      { date: '15 mai 2026', user: 'Lucas Pereira', action: 'A présenté l\'architecture cible au comité de direction' },
    ],
  },
  {
    id: '6',
    name: 'Refonte Frontend E-commerce',
    client: 'Carrefour',
    role: 'Lead Developer React',
    startDate: 'Nov 2025',
    endDate: 'Jan 2026',
    status: 'Archivé',
    progress: 100,
    description: 'Refonte complète du frontend e-commerce avec Next.js, migration progressive depuis l\'ancienne stack JSP, optimisation des performances Core Web Vitals.',
    team: [
      { name: 'Antoine Girard', role: 'Lead Frontend', email: 'antoine.g@nexusone.fr', avatar: 'AG' },
      { name: 'Sarah Fontaine', role: 'Développeuse Fullstack', email: 'sarah.f@nexusone.fr', avatar: 'SF' },
    ],
    deliverables: [
      { name: 'Migration page produit', status: 'complete' },
      { name: 'Migration panier & checkout', status: 'complete' },
      { name: 'Optimisation performances', status: 'complete' },
    ],
    activity: [
      { date: '20 jan 2026', user: 'Antoine Girard', action: 'Mise en production de la dernière feature' },
    ],
  },
];

const CONSULTANTS: Consultant[] = [
  {
    id: '1',
    name: 'Thomas Martin',
    email: 'thomas.m@nexusone.fr',
    level: 'Senior',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'FinOps'],
    certifications: ['AWS SA Pro', 'CKA'],
    currentProject: 'Migration Cloud Banque Pop',
    availability: 'En Mission',
  },
  {
    id: '2',
    name: 'Sophie Bernard',
    email: 'sophie.b@nexusone.fr',
    level: 'Confirmé',
    skills: ['Azure', 'Python', 'Spark', 'Databricks'],
    certifications: ['Azure Admin', 'DP-203'],
    currentProject: 'SI Santé Hôpital',
    availability: 'En Mission',
  },
  {
    id: '3',
    name: 'Lucas Pereira',
    email: 'lucas.p@nexusone.fr',
    level: 'Senior',
    skills: ['DevOps', 'CI/CD', 'Docker', 'Go'],
    certifications: ['CKA', 'Terraform Associate'],
    currentProject: 'Migration Cloud Banque Pop',
    availability: 'En Mission',
  },
  {
    id: '4',
    name: 'Emma Dubois',
    email: 'emma.d@nexusone.fr',
    level: 'Lead',
    skills: ['Data Engineering', 'Python', 'SQL', 'Airflow'],
    certifications: ['Google PCA', 'dbt'],
    currentProject: 'SI Santé Hôpital',
    availability: 'En Mission',
  },
  {
    id: '5',
    name: 'Nicolas Laurent',
    email: 'nicolas.l@nexusone.fr',
    level: 'Senior',
    skills: ['CyberSécurité', 'NIS2', 'Pentest', 'SOC'],
    certifications: ['CISSP', 'OSCP', 'CEH'],
    currentProject: 'Audit Sécurité Orange',
    availability: 'En Mission',
  },
  {
    id: '6',
    name: 'Marie Lefebvre',
    email: 'marie.l@nexusone.fr',
    level: 'Lead',
    skills: ['SAP', 'Finance', 'S/4HANA'],
    certifications: ['SAP FI', 'SAP CO'],
    currentProject: '-',
    availability: 'Disponible',
  },
  {
    id: '7',
    name: 'Antoine Girard',
    email: 'antoine.g@nexusone.fr',
    level: 'Senior',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js'],
    certifications: ['AWS Dev'],
    currentProject: '-',
    availability: 'Bientôt Disponible',
  },
  {
    id: '8',
    name: 'Camille Rousseau',
    email: 'camille.r@nexusone.fr',
    level: 'Confirmé',
    skills: ['Gestion de projet', 'Agile', 'Scrum', 'Jira'],
    certifications: ['PSM I', 'SAFe'],
    currentProject: 'Migration Cloud Banque Pop',
    availability: 'En Mission',
  },
];

const TIMESHEET_DATA: TimesheetDay[] = [
  { day: 'Lun', hours: 8 },
  { day: 'Mar', hours: 7.5 },
  { day: 'Mer', hours: 8 },
  { day: 'Jeu', hours: 6 },
  { day: 'Ven', hours: 8 },
  { day: 'Sam', hours: 0 },
  { day: 'Dim', hours: 0 },
];

/* ------------------------------------------------------------------ */
/*  SKILL COLOR MAP                                                    */
/* ------------------------------------------------------------------ */

const SKILL_COLORS: Record<string, string> = {
  AWS: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  Azure: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  Terraform: 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/25',
  Kubernetes: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25',
  DevOps: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25',
  'CI/CD': 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25',
  Docker: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  Go: 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/25',
  Python: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
  'Data Engineering': 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/25',
  SQL: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  Airflow: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
  Spark: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
  Databricks: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
  CyberSécurité: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25',
  NIS2: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25',
  Pentest: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25',
  SOC: 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/25',
  SAP: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  Finance: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  'S/4HANA': 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  React: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25',
  TypeScript: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  'Next.js': 'bg-[#1E293B]/50 text-[#94A3B8] border-[#475569]/25',
  'Node.js': 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  'Gestion de projet': 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/25',
  Agile: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  Scrum: 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  Jira: 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  IoT: 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25',
  FinOps: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
};

/* ------------------------------------------------------------------ */
/*  UTILITY COMPONENTS                                                 */
/* ------------------------------------------------------------------ */

const statusBadgeClasses: Record<string, string> = {
  'En Cours': 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  'En Attente': 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
  'Terminé': 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  'Archivé': 'bg-[#475569]/20 text-[#94A3B8] border-[#475569]/25',
};

const availabilityBadgeClasses: Record<string, string> = {
  'Disponible': 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25',
  'En Mission': 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25',
  'Bientôt Disponible': 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/25',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={`${statusBadgeClasses[status] || 'bg-[#475569]/20 text-[#94A3B8]'} text-xs font-medium border`}
    >
      {status}
    </Badge>
  );
}

function AvailabilityBadge({ availability }: { availability: string }) {
  return (
    <Badge
      variant="outline"
      className={`${availabilityBadgeClasses[availability] || ''} text-xs font-medium border`}
    >
      {availability}
    </Badge>
  );
}

function SkillTag({ skill }: { skill: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
        SKILL_COLORS[skill] || 'bg-[#475569]/20 text-[#94A3B8] border-[#475569]/25'
      }`}
    >
      {skill}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  SIDEBAR                                                            */
/* ------------------------------------------------------------------ */

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isAdmin: boolean;
}

const navGroups = [
  {
    label: 'TABLEAU DE BORD',
    items: [
      { key: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
      { key: 'projects', label: 'Mes Projets', icon: FolderOpen },
      { key: 'timesheet', label: 'Feuilles de Temps', icon: Clock },
      { key: 'documents', label: 'Documents', icon: FileText },
    ],
  },
  {
    label: 'RESSOURCES',
    items: [
      { key: 'profile', label: 'Profil', icon: User },
      { key: 'team', label: 'Équipe', icon: Users },
    ],
  },
];

const adminGroup = {
  label: 'ADMINISTRATION',
  items: [
    { key: 'admin-consultants', label: 'Consultants', icon: Users },
    { key: 'admin-clients', label: 'Clients', icon: Building2 },
    { key: 'admin-reports', label: 'Rapports', icon: BarChart3 },
    { key: 'admin-settings', label: 'Paramètres', icon: Settings },
  ],
};

function Sidebar({ activeView, onViewChange, isAdmin }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 w-[260px] h-[100dvh] bg-[#0A1628] border-r border-white/[0.06] flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 pt-6 pb-2">
        <span className="font-outfit text-base font-bold tracking-tight">
          <span className="text-white">NE</span>
          <span className="text-[#0055FF]">X</span>
          <span className="text-white">US</span>
          <span className="text-[#94A3B8]">ONE</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <div className="px-3 mb-2 text-[10px] font-inter font-semibold text-[#94A3B8]/70 tracking-wider">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onViewChange(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0055FF]/15 text-[#0055FF]'
                        : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <span className="font-inter text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {isAdmin && (
          <div>
            <div className="px-3 mb-2 text-[10px] font-inter font-semibold text-[#94A3B8]/70 tracking-wider">
              {adminGroup.label}
            </div>
            <div className="space-y-1">
              {adminGroup.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => onViewChange(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-[#0055FF]/15 text-[#0055FF]'
                        : 'text-white/60 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <span className="font-inter text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#0055FF]/20 flex items-center justify-center text-[#0055FF] text-xs font-bold font-inter">
            TM
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-inter text-sm font-medium text-white truncate">Thomas Martin</div>
            <div className="font-inter text-[11px] text-[#94A3B8] truncate">Consultant Senior</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  TOP BAR                                                            */
/* ------------------------------------------------------------------ */

interface TopBarProps {
  title: string;
  breadcrumb?: string;
}

function TopBar({ title, breadcrumb }: TopBarProps) {
  return (
    <header className="h-16 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="font-outfit text-xl font-semibold text-white">{title}</h1>
        {breadcrumb && (
          <p className="font-inter text-[13px] text-[#94A3B8]">{breadcrumb}</p>
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-60 h-9 pl-9 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-lg font-inter text-sm text-white placeholder:text-[#94A3B8]/60 focus:outline-none focus:border-[#0055FF]/40 focus:ring-1 focus:ring-[#0055FF]/20 transition-all"
          />
        </div>
        <button className="relative p-2 text-[#94A3B8] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0055FF]/20 flex items-center justify-center text-[#0055FF] text-xs font-bold font-inter">
            TM
          </div>
          <span className="hidden md:block font-inter text-sm text-white">Thomas Martin</span>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  STAT CARD                                                          */
/* ------------------------------------------------------------------ */

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendPositive?: boolean;
}

function StatCard({ label, value, trend, trendPositive = true }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#0055FF]/20 transition-all duration-300"
    >
      <div className="font-inter text-xs font-medium text-[#94A3B8] uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="font-mono text-[28px] font-bold text-white mb-1">{value}</div>
      <div className={`font-inter text-xs ${trendPositive ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
        {trend}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  TIMESHEET WIDGET                                                   */
/* ------------------------------------------------------------------ */

function TimesheetWidget() {
  const totalHours = TIMESHEET_DATA.reduce((sum, d) => sum + d.hours, 0);
  const targetHours = 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-outfit text-base font-semibold text-white">Saisie des Temps</h3>
          <p className="font-inter text-xs text-[#94A3B8] mt-0.5">Semaine du 9 juin 2026</p>
        </div>
        <Button
          size="sm"
          className="bg-[#0055FF] hover:bg-[#0055FF]/90 text-white font-inter text-xs font-semibold rounded-lg px-4"
        >
          Soumettre
        </Button>
      </div>

      <div className="space-y-3">
        {TIMESHEET_DATA.map((day) => (
          <div key={day.day} className="flex items-center gap-3">
            <span className="w-8 font-inter text-xs text-[#94A3B8] font-medium">{day.day}</span>
            <div className="flex-1 h-6 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(day.hours / 8) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="h-full bg-[#0055FF] rounded-full"
              />
            </div>
            <span className="w-12 font-mono text-sm text-white text-right">{day.hours}h</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="font-inter text-sm text-[#94A3B8]">Total</span>
        <span className="font-mono text-base font-bold text-white">
          {totalHours}h <span className="text-[#94A3B8] font-normal">/ {targetHours}h</span>
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS TABLE                                                     */
/* ------------------------------------------------------------------ */

interface ProjectsTableProps {
  onProjectClick: (project: Project) => void;
  statusFilter: string;
}

function ProjectsTable({ onProjectClick, statusFilter }: ProjectsTableProps) {
  const filtered = useMemo(
    () =>
      statusFilter === 'Tous'
        ? PROJECTS
        : PROJECTS.filter((p) => p.status === statusFilter),
    [statusFilter]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <h3 className="font-outfit text-base font-semibold text-white">Mes Projets en Cours</h3>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#94A3B8]" />
          <span className="font-inter text-xs text-[#94A3B8]">Filtrer par statut</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              {['Projet', 'Client', 'Rôle', 'Début', 'Fin', 'Statut', 'Progression', ''].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-inter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((project) => (
              <tr
                key={project.id}
                onClick={() => onProjectClick(project)}
                className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer group"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0055FF]/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-[#0055FF]" />
                    </div>
                    <span className="font-inter text-sm font-medium text-white group-hover:text-[#0055FF] transition-colors">
                      {project.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3.5 font-inter text-sm text-[#94A3B8]">{project.client}</td>
                <td className="px-4 py-3.5 font-inter text-sm text-white/80">{project.role}</td>
                <td className="px-4 py-3.5 font-inter text-sm text-[#94A3B8]">{project.startDate}</td>
                <td className="px-4 py-3.5 font-inter text-sm text-[#94A3B8]">{project.endDate}</td>
                <td className="px-4 py-3.5">
                  <StatusBadge status={project.status} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          project.progress === 100 ? 'bg-[#10B981]' : 'bg-[#0055FF]'
                        }`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-[#94A3B8]">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <ChevronRight className="w-4 h-4 text-[#94A3B8] group-hover:text-[#0055FF] transition-colors" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECT DETAIL VIEW                                                */
/* ------------------------------------------------------------------ */

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#94A3B8] hover:text-white font-inter text-sm mb-4 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" /> Retour aux projets
        </button>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-outfit text-2xl font-semibold text-white">{project.name}</h2>
            <p className="font-inter text-sm text-[#94A3B8] mt-1">
              {project.client} · {project.role} · {project.startDate} — {project.endDate}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/[0.04] border border-white/[0.06] p-1 rounded-lg">
          {['Vue d\'ensemble', 'Équipe', 'Livrables', 'Activité'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase().replace(/[\s']/g, '-').replace(/-+/g, '-')}
              className="font-inter text-sm text-[#94A3B8] data-[state=active]:bg-[#0055FF]/15 data-[state=active]:text-[#0055FF] rounded-md px-4 py-2 transition-all"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview */}
        <TabsContent value="vue-d-ensemble" className="space-y-6">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h4 className="font-outfit text-base font-semibold text-white mb-3">Description</h4>
            <p className="font-inter text-[15px] text-white/80 leading-relaxed">{project.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
              <div className="font-inter text-xs text-[#94A3B8] uppercase tracking-wider mb-1">Progression</div>
              <div className="font-mono text-2xl font-bold text-white">{project.progress}%</div>
              <div className="mt-3 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${project.progress === 100 ? 'bg-[#10B981]' : 'bg-[#0055FF]'}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
              <div className="font-inter text-xs text-[#94A3B8] uppercase tracking-wider mb-1">Équipe</div>
              <div className="font-mono text-2xl font-bold text-white">{project.team.length}</div>
              <div className="font-inter text-xs text-[#94A3B8] mt-1">membres</div>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
              <div className="font-inter text-xs text-[#94A3B8] uppercase tracking-wider mb-1">Livrables</div>
              <div className="font-mono text-2xl font-bold text-white">
                {project.deliverables.filter((d) => d.status === 'complete').length}/{project.deliverables.length}
              </div>
              <div className="font-inter text-xs text-[#94A3B8] mt-1">terminés</div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
            <h4 className="font-outfit text-base font-semibold text-white mb-4">Chronologie</h4>
            <div className="relative">
              <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${project.progress === 100 ? 'bg-[#10B981]' : 'bg-[#0055FF]'}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="font-inter text-xs text-[#94A3B8]">{project.startDate}</span>
                <span className="font-inter text-xs text-[#94A3B8]">{project.endDate}</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Team */}
        <TabsContent value="equipe" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.team.map((member) => (
              <div
                key={member.email}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 flex items-center gap-4 hover:border-[#0055FF]/20 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#0055FF]/15 flex items-center justify-center text-[#0055FF] text-sm font-bold font-inter flex-shrink-0">
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-inter text-sm font-semibold text-white">{member.name}</div>
                  <div className="font-inter text-xs text-[#94A3B8]">{member.role}</div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1 text-[#0055FF] hover:text-[#0055FF]/80 transition-colors">
                      <Mail className="w-3 h-3" />
                      <span className="font-inter text-[11px]">Email</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Deliverables */}
        <TabsContent value="livrables" className="space-y-3">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl divide-y divide-white/[0.04]">
            {project.deliverables.map((del) => (
              <div key={del.name} className="px-5 py-4 flex items-center gap-4">
                {del.status === 'complete' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0" />
                ) : del.status === 'in-progress' ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#0055FF] flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 bg-[#0055FF] rounded-full" />
                  </div>
                ) : (
                  <Circle className="w-5 h-5 text-[#475569] flex-shrink-0" />
                )}
                <span
                  className={`font-inter text-sm ${
                    del.status === 'complete' ? 'text-[#94A3B8] line-through' : 'text-white'
                  }`}
                >
                  {del.name}
                </span>
                <Badge
                  variant="outline"
                  className={`ml-auto text-[10px] font-medium border ${
                    del.status === 'complete'
                      ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/25'
                      : del.status === 'in-progress'
                        ? 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25'
                        : 'bg-[#475569]/15 text-[#94A3B8] border-[#475569]/25'
                  }`}
                >
                  {del.status === 'complete' ? 'Terminé' : del.status === 'in-progress' ? 'En cours' : 'En attente'}
                </Badge>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activite" className="space-y-0">
          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl divide-y divide-white/[0.04]">
            {project.activity.map((item, idx) => (
              <div key={idx} className="px-5 py-4 flex items-start gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-[#0055FF] flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-inter text-sm text-white/80">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-inter text-xs text-[#0055FF]">{item.user}</span>
                    <span className="font-inter text-xs text-[#94A3B8]">· {item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  ADMIN — CONSULTANTS                                                */
/* ------------------------------------------------------------------ */

function AdminConsultants() {
  const [search, setSearch] = useState('');
  const [filterAvail, setFilterAvail] = useState('Tous');

  const filtered = useMemo(() => {
    return CONSULTANTS.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchAvail = filterAvail === 'Tous' || c.availability === filterAvail;
      return matchSearch && matchAvail;
    });
  }, [search, filterAvail]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-outfit text-xl font-semibold text-white">Gestion des Consultants</h2>
          <p className="font-inter text-sm text-[#94A3B8] mt-1">{CONSULTANTS.length} consultants enregistrés</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#0055FF] hover:bg-[#0055FF]/90 text-white font-inter text-sm font-semibold rounded-lg gap-2">
              <Plus className="w-4 h-4" /> Ajouter un consultant
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0F2240] border border-white/[0.08] text-white max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-outfit text-lg font-semibold">Ajouter un Consultant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-inter text-xs text-[#94A3B8] mb-1 block">Prénom</label>
                  <Input placeholder="Prénom" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#94A3B8]/50" />
                </div>
                <div>
                  <label className="font-inter text-xs text-[#94A3B8] mb-1 block">Nom</label>
                  <Input placeholder="Nom" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#94A3B8]/50" />
                </div>
              </div>
              <div>
                <label className="font-inter text-xs text-[#94A3B8] mb-1 block">Email</label>
                <Input placeholder="email@nexusone.fr" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#94A3B8]/50" />
              </div>
              <div>
                <label className="font-inter text-xs text-[#94A3B8] mb-1 block">Niveau</label>
                <Input placeholder="Junior / Confirmé / Senior / Lead" className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#94A3B8]/50" />
              </div>
              <div>
                <label className="font-inter text-xs text-[#94A3B8] mb-1 block">Compétences (séparées par des virgules)</label>
                <Input placeholder="AWS, Terraform, Kubernetes..." className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-[#94A3B8]/50" />
              </div>
              <Button className="w-full bg-[#0055FF] hover:bg-[#0055FF]/90 text-white font-inter font-semibold">
                Créer le consultant
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, email ou compétence..."
            className="w-full h-10 pl-9 pr-4 bg-white/[0.04] border border-white/[0.08] rounded-lg font-inter text-sm text-white placeholder:text-[#94A3B8]/50 focus:outline-none focus:border-[#0055FF]/40 transition-all"
          />
        </div>
        <div className="flex gap-2">
          {['Tous', 'Disponible', 'En Mission', 'Bientôt Disponible'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterAvail(f)}
              className={`px-3 py-2 rounded-lg font-inter text-xs font-medium transition-all ${
                filterAvail === f
                  ? 'bg-[#0055FF]/15 text-[#0055FF] border border-[#0055FF]/25'
                  : 'bg-white/[0.04] text-[#94A3B8] border border-white/[0.08] hover:bg-white/[0.08]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Nom', 'Email', 'Niveau', 'Compétences', 'Certifications', 'Projet Actuel', 'Disponibilité', ''].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-inter text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((consultant) => (
                <tr
                  key={consultant.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0055FF]/15 flex items-center justify-center text-[#0055FF] text-xs font-bold font-inter flex-shrink-0">
                        {consultant.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="font-inter text-sm font-medium text-white">{consultant.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-inter text-sm text-[#94A3B8]">{consultant.email}</td>
                  <td className="px-4 py-3.5">
                    <Badge
                      variant="outline"
                      className={`text-[11px] font-medium border ${
                        consultant.level === 'Lead'
                          ? 'bg-[#7C3AED]/15 text-[#7C3AED] border-[#7C3AED]/25'
                          : consultant.level === 'Senior'
                            ? 'bg-[#0055FF]/15 text-[#0055FF] border-[#0055FF]/25'
                            : 'bg-[#14B8A6]/15 text-[#14B8A6] border-[#14B8A6]/25'
                      }`}
                    >
                      {consultant.level}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {consultant.skills.map((skill) => (
                        <SkillTag key={skill} skill={skill} />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {consultant.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F59E0B]/10 text-[#F59E0B]"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-inter text-sm text-white/80">
                    {consultant.currentProject === '-' ? (
                      <span className="text-[#94A3B8]">—</span>
                    ) : (
                      consultant.currentProject
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <AvailabilityBadge availability={consultant.availability} />
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="p-1.5 rounded-md hover:bg-white/[0.06] text-[#94A3B8] hover:text-white transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN DASHBOARD COMPONENT                                           */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusFilter, setStatusFilter] = useState('Tous');

  // Admin flag — in real app this would come from auth context
  const isAdmin = true;

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setActiveView('project-detail');
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setActiveView('projects');
  };

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard':
        return { title: 'Tableau de Bord', breadcrumb: 'Vue d\'ensemble' };
      case 'projects':
        return { title: 'Mes Projets', breadcrumb: 'Gestion des projets' };
      case 'project-detail':
        return { title: selectedProject?.name || 'Projet', breadcrumb: 'Détail du projet' };
      case 'timesheet':
        return { title: 'Feuilles de Temps', breadcrumb: 'Saisie hebdomadaire' };
      case 'documents':
        return { title: 'Documents', breadcrumb: 'Bibliothèque documentaire' };
      case 'profile':
        return { title: 'Mon Profil', breadcrumb: 'Informations personnelles' };
      case 'team':
        return { title: 'Mon Équipe', breadcrumb: 'Collaborateurs' };
      case 'admin-consultants':
        return { title: 'Administration', breadcrumb: 'Gestion des consultants' };
      case 'admin-clients':
        return { title: 'Administration', breadcrumb: 'Gestion des clients' };
      case 'admin-reports':
        return { title: 'Administration', breadcrumb: 'Rapports & Analytics' };
      case 'admin-settings':
        return { title: 'Administration', breadcrumb: 'Paramètres' };
      default:
        return { title: 'Tableau de Bord', breadcrumb: '' };
    }
  };

  const titleInfo = getTitle();

  return (
    <div className="min-h-[100dvh] bg-[#0A1628] text-white">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} isAdmin={isAdmin} />

      {/* Main Content */}
      <div className="ml-[260px] min-h-[100dvh] flex flex-col">
        <TopBar title={titleInfo.title} breadcrumb={titleInfo.breadcrumb} />

        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* DASHBOARD OVERVIEW */}
            {activeView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard label="Projets Actifs" value="12" trend="+1 ce mois" />
                  <StatCard label="Heures Ce Mois" value="168h" trend="+12% vs mois dernier" />
                  <StatCard label="Taux de Réalisation" value="94%" trend="+3% vs objectif" trendPositive={true} />
                  <StatCard label="Prochaine Échéance" value="5 jours" trend="Audit Sécurité — Orange" trendPositive={true} />
                </div>

                {/* Projects Table + Timesheet */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2">
                    <ProjectsTable onProjectClick={handleProjectClick} statusFilter={statusFilter} />
                  </div>
                  <div>
                    <TimesheetWidget />
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROJECTS LIST */}
            {activeView === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Status Filters */}
                <div className="flex flex-wrap gap-2">
                  {['Tous', 'En Cours', 'En Attente', 'Terminé', 'Archivé'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all ${
                        statusFilter === status
                          ? 'bg-[#0055FF]/15 text-[#0055FF] border border-[#0055FF]/25'
                          : 'bg-white/[0.04] text-[#94A3B8] border border-white/[0.08] hover:bg-white/[0.08]'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <ProjectsTable onProjectClick={handleProjectClick} statusFilter={statusFilter} />
              </motion.div>
            )}

            {/* PROJECT DETAIL */}
            {activeView === 'project-detail' && selectedProject && (
              <ProjectDetail project={selectedProject} onBack={handleBackToProjects} />
            )}

            {/* TIMESHEET FULL */}
            {activeView === 'timesheet' && (
              <motion.div
                key="timesheet"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl"
              >
                <TimesheetWidget />
              </motion.div>
            )}

            {/* DOCUMENTS */}
            {activeView === 'documents' && (
              <motion.div
                key="documents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Contrat Cadre 2026', type: 'PDF', size: '2.4 MB', date: '15 jan 2026' },
                    { name: 'Spécifications Techniques', type: 'DOCX', size: '1.8 MB', date: '3 fév 2026' },
                    { name: 'Architecture Cible', type: 'PDF', size: '4.1 MB', date: '20 fév 2026' },
                    { name: 'Rapport Audit Sécurité', type: 'PDF', size: '3.2 MB', date: '10 avr 2026' },
                    { name: 'Plan de Formation', type: 'XLSX', size: '856 KB', date: '1 mars 2026' },
                    { name: 'Procédures Runbooks', type: 'PDF', size: '1.5 MB', date: '15 mai 2026' },
                  ].map((doc) => (
                    <div
                      key={doc.name}
                      className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#0055FF]/20 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#0055FF]/10 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-[#0055FF]" />
                        </div>
                        <span className="font-mono text-[11px] text-[#94A3B8] bg-white/[0.04] px-2 py-0.5 rounded">
                          {doc.type}
                        </span>
                      </div>
                      <h4 className="font-inter text-sm font-medium text-white group-hover:text-[#0055FF] transition-colors mb-1">
                        {doc.name}
                      </h4>
                      <div className="flex items-center gap-3 font-inter text-xs text-[#94A3B8]">
                        <span>{doc.size}</span>
                        <span>·</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PROFILE */}
            {activeView === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl space-y-6"
              >
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#0055FF]/15 flex items-center justify-center text-[#0055FF] text-2xl font-bold font-inter">
                      TM
                    </div>
                    <div>
                      <h3 className="font-outfit text-xl font-semibold text-white">Thomas Martin</h3>
                      <p className="font-inter text-sm text-[#94A3B8]">Consultant Senior — Cloud & Infrastructure</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 font-inter text-xs text-[#94A3B8]">
                          <Mail className="w-3 h-3" /> thomas.m@nexusone.fr
                        </span>
                        <span className="flex items-center gap-1 font-inter text-xs text-[#94A3B8]">
                          <Phone className="w-3 h-3" /> +33 6 12 34 56 78
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                    <div className="text-center">
                      <div className="font-mono text-xl font-bold text-white">8</div>
                      <div className="font-inter text-xs text-[#94A3B8]">Années d&apos;exp.</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xl font-bold text-white">6</div>
                      <div className="font-inter text-xs text-[#94A3B8]">Certifications</div>
                    </div>
                    <div className="text-center">
                      <div className="font-mono text-xl font-bold text-white">24</div>
                      <div className="font-inter text-xs text-[#94A3B8]">Projets livrés</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <h4 className="font-outfit text-base font-semibold text-white mb-4">Compétences</h4>
                  <div className="flex flex-wrap gap-2">
                    {['AWS', 'Terraform', 'Kubernetes', 'FinOps', 'Docker', 'Python', 'CI/CD', 'Ansible'].map(
                      (skill) => (
                        <SkillTag key={skill} skill={skill} />
                      )
                    )}
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6">
                  <h4 className="font-outfit text-base font-semibold text-white mb-4">Certifications</h4>
                  <div className="space-y-3">
                    {[
                      { name: 'AWS Solutions Architect Professional', date: 'Nov 2025' },
                      { name: 'Certified Kubernetes Administrator (CKA)', date: 'Juin 2025' },
                      { name: 'HashiCorp Terraform Associate', date: 'Mars 2025' },
                      { name: 'FinOps Certified Practitioner', date: 'Jan 2025' },
                    ].map((cert) => (
                      <div key={cert.name} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <Award className="w-4 h-4 text-[#F59E0B]" />
                          <span className="font-inter text-sm text-white">{cert.name}</span>
                        </div>
                        <span className="font-inter text-xs text-[#94A3B8]">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TEAM */}
            {activeView === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {CONSULTANTS.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-[#0055FF]/20 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#0055FF]/15 flex items-center justify-center text-[#0055FF] text-sm font-bold font-inter">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-inter text-sm font-semibold text-white">{c.name}</h4>
                        <p className="font-inter text-xs text-[#94A3B8]">{c.level}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.skills.slice(0, 3).map((skill) => (
                        <SkillTag key={skill} skill={skill} />
                      ))}
                      {c.skills.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-[#94A3B8]">
                          +{c.skills.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <AvailabilityBadge availability={c.availability} />
                      <span className="font-inter text-xs text-[#94A3B8]">{c.currentProject !== '-' ? c.currentProject : 'Sans projet'}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* ADMIN — CONSULTANTS */}
            {activeView === 'admin-consultants' && (
              <motion.div
                key="admin-consultants"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AdminConsultants />
              </motion.div>
            )}

            {/* ADMIN — CLIENTS (placeholder) */}
            {activeView === 'admin-clients' && (
              <motion.div
                key="admin-clients"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center"
              >
                <Building2 className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="font-outfit text-lg font-semibold text-white mb-2">Gestion des Clients</h3>
                <p className="font-inter text-sm text-[#94A3B8]">Module en cours de développement.</p>
              </motion.div>
            )}

            {/* ADMIN — REPORTS (placeholder) */}
            {activeView === 'admin-reports' && (
              <motion.div
                key="admin-reports"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center"
              >
                <BarChart3 className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="font-outfit text-lg font-semibold text-white mb-2">Rapports & Analytics</h3>
                <p className="font-inter text-sm text-[#94A3B8]">Module en cours de développement.</p>
              </motion.div>
            )}

            {/* ADMIN — SETTINGS (placeholder) */}
            {activeView === 'admin-settings' && (
              <motion.div
                key="admin-settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-8 text-center"
              >
                <Settings className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                <h3 className="font-outfit text-lg font-semibold text-white mb-2">Paramètres</h3>
                <p className="font-inter text-sm text-[#94A3B8]">Module en cours de développement.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
