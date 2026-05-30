import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgressBar from './components/ScrollProgressBar';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import AIFilms from './pages/AIFilms';
import Certificates from './pages/Certificates';
import Timeline from './pages/Timeline';
import Resumes from './pages/Resumes';
import Contact from './pages/Contact';
import AdminDashboard from './admin/AdminDashboard';

// Helper component to force resetting scroll height to top on transition
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        {/* Forces scroll height back to top on paths transition */}
        <ScrollToTopOnNavigate />
        
        {/* Slim top scroll indicator */}
        <ScrollProgressBar />

        {/* Dynamic Nav bar */}
        <Navbar />

        {/* Global Router Pathway Hub */}
        <div className="min-h-[85vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/ai-films" element={<AIFilms />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Redirect fallback */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Footer info blocks & credentials */}
        <Footer />

        {/* Float Chevron return button */}
        <ScrollToTop />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
