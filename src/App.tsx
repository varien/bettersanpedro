import { lazy, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const YakapInteractive = lazy(() => import('./pages/YakapInteractive'));
const Document = lazy(() => import('./pages/Document'));
const Government = lazy(() => import('./pages/Government'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Legislative = lazy(() => import('./pages/Legislative'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Tourism = lazy(() => import('./pages/Tourism'));
const History = lazy(() => import('./pages/SanPedroHistory'));
const ExecutiveDirectory = lazy(() => import('./pages/ExecutiveDirectory'));
const SangguniangBayan = lazy(() => import('./pages/SangguniangBayan'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <Suspense fallback={<div className="flex-grow" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap"
                  element={<YakapInteractive />}
                />
                <Route path="/services/:category" element={<Services />} />
                <Route path="/services" element={<Services />} />
                <Route
                  path="/services/:category/:documentSlug"
                  element={<Document categoryType="service" />}
                />
                <Route
                  path="/government/departments/officials"
                  element={<SangguniangBayan />}
                />
                <Route
                  path="/government/departments/executive"
                  element={<ExecutiveDirectory />}
                />
                <Route
                  path="/government/legislative"
                  element={<Legislative />}
                />
                <Route path="/government/:category" element={<Government />} />
                <Route path="/government" element={<Government />} />
                <Route
                  path="/government/:category/:documentSlug"
                  element={<Document categoryType="government" />}
                />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/legislative" element={<Legislative />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/tourism/history" element={<History />} />
                <Route path="/tourism/:category" element={<Tourism />} />
                <Route path="/tourism" element={<Tourism />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/:lang/:documentSlug" element={<Document />} />
                <Route path="/:documentSlug" element={<Document />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
