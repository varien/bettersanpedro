import { Link } from 'react-router-dom';
import {
  Home,
  ArrowLeft,
  Briefcase,
  Building2,
  MapPin,
  BarChart3,
} from 'lucide-react';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';

const QUICK_LINKS = [
  {
    label: 'Services',
    description: 'Find government services',
    href: '/services',
    icon: Briefcase,
    color: 'text-blue-600 bg-blue-50 border-blue-100',
  },
  {
    label: 'Government',
    description: 'Offices & departments',
    href: '/government',
    icon: Building2,
    color: 'text-primary-600 bg-primary-50 border-primary-100',
  },
  {
    label: 'Tourism',
    description: 'Explore San Pedro',
    href: '/tourism',
    icon: MapPin,
    color: 'text-green-600 bg-green-50 border-green-100',
  },
  {
    label: 'Statistics',
    description: 'Local data & figures',
    href: '/statistics',
    icon: BarChart3,
    color: 'text-orange-600 bg-orange-50 border-orange-100',
  },
];

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
      />
      <main className="flex-1 bg-gray-50">
        {/* Hero band */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-white/[0.03]"
          />

          <div className="relative container mx-auto px-4 py-20 text-center">
            {/* 404 number */}
            <p className="text-[120px] sm:text-[160px] font-black leading-none text-white/10 select-none mb-0">
              404
            </p>
            <div className="-mt-8 sm:-mt-12">
              <span className="inline-block bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                Page Not Found
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                Details coming soon
              </h1>
              <p className="text-primary-200 text-base sm:text-lg max-w-md mx-auto mb-8">
                This page is either under construction or doesn&apos;t exist
                yet. Check back soon — we&apos;re constantly improving.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-colors shadow-lg shadow-primary-900/20"
                >
                  <Home className="h-4 w-4" />
                  Back to Homepage
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links */}
        <Reveal className="container mx-auto px-4 py-14">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-8">
            You might be looking for
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {QUICK_LINKS.map(
              ({ label, description, href, icon: Icon, color }) => (
                <Link
                  key={href}
                  to={href}
                  className="group flex flex-col items-start gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span
                    className={`inline-flex items-center justify-center h-10 w-10 rounded-xl border ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                      {label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {description}
                    </p>
                  </div>
                </Link>
              )
            )}
          </div>
        </Reveal>
      </main>
    </>
  );
};

export default NotFound;
