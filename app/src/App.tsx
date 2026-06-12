import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Page stubs
import Expertises from './pages/Expertises'
import CloudInfrastructure from './pages/CloudInfrastructure'
import SoftwareDevelopment from './pages/SoftwareDevelopment'
import DataAI from './pages/DataAI'
import Cybersecurity from './pages/Cybersecurity'
import Secteurs from './pages/Secteurs'
import CaseStudies from './pages/CaseStudies'
import Partners from './pages/Partners'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import Blog from './pages/Blog'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Dashboard from './pages/Dashboard'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expertises" element={<Expertises />} />
        <Route path="/expertises/cloud-infrastructure" element={<CloudInfrastructure />} />
        <Route path="/expertises/software-development" element={<SoftwareDevelopment />} />
        <Route path="/expertises/data-ia" element={<DataAI />} />
        <Route path="/expertises/cybersecurite" element={<Cybersecurity />} />
        <Route path="/secteurs" element={<Secteurs />} />
        <Route path="/etudes-de-cas" element={<CaseStudies />} />
        <Route path="/partenaires" element={<Partners />} />
        <Route path="/carrieres" element={<Careers />} />
        <Route path="/postes/:id" element={<JobDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/evenements" element={<Events />} />
        <Route path="/espace-client" element={<Dashboard />} />
      </Routes>
    </Layout>
  )
}
