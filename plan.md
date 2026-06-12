# Plan — Template Premium ESN / SSII (Secteur 06)

## Context
- Skill: `web-template-library` — 30 Sector Premium Collection
- Sector: #06 — Société de Services Informatiques (ESN / SSII / IT Services)
- Source files: `06_esn_ssii.md` (detailed design guide), `sector-06-esn-ssii.md` (sector reference)

## Execution Stages

### Stage 1: Design System & Architecture
- Create comprehensive `design.md` with:
  - Sector analysis summary and template objectives
  - Page tree (public pages + optional user/admin spaces)
  - Design system: colors (tech blue #0066CC + dark navy + white + green accent #10B981)
  - Typography: Geist Sans + Geist Mono
  - Spacing, grid, responsive breakpoints
  - Animation patterns
  - Component library specs
  - UX/UI inspirations from Capgemini, Devoteam, Sopra Steria, Theodo
- Skill: web-template-library (design phase)

### Stage 2: Content Generation & Asset Creation
- Generate realistic demo content for all pages
- Generate images: hero backgrounds, team photos, tech visuals, office/team images
- Create case studies, testimonials, job listings, blog articles
- Skill: image generation tools

### Stage 3: Development — Public Website
- Build all public pages with Next.js + React + Tailwind CSS:
  - `/` — Homepage (hero + dual CTA client/candidat + métiers + chiffres clés + certifications + témoignages)
  - `/expertises` — Hub expertises techniques (Cloud, Data, Dev, Cyber, ERP, DevOps)
  - `/expertises/[slug]` — Pages détaillées par domaine
  - `/secteurs` — Hub secteurs d'intervention
  - `/secteurs/[slug]` — Pages sectorielles
  - `/realisations` — Études de cas anonymisées
  - `/carrieres` — Offres, culture tech, stack, témoignages
  - `/blog` — Blog technique
  - `/contact` — Formulaire différencié client/candidat
  - `/a-propos` — Histoire, valeurs, équipe
  - `/partenaires` — Certifications & partenariats
- Skill: vibecoding-webapp-swarm

### Stage 4: Optional Spaces
- User space: Espace consultant (simplified)
- Admin space: Dashboard de gestion

### Stage 5: Polish & Deploy
- SEO metadata, Schema.org markup (JobPosting, ITService, ProfessionalService)
- Accessibility WCAG AA
- Performance optimization (Core Web Vitals ≥ 92)
- Deploy

## Sub-agent Strategy
- Design_Agent: Create design.md
- Content_Agent: Generate all text content + image prompts
- Dev_PublicSite: Build all public pages
- Dev_Spaces: Build user + admin spaces
- Polish_Agent: SEO, a11y, performance, deploy
