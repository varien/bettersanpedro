import {
  ArrowRight,
  Building2,
  CalendarDays,
  Compass,
  ExternalLink,
  Flower2,
  Landmark,
  MapPin,
  ShieldCheck,
  Waves,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const TOURISM_CATEGORIES = [
  {
    slug: 'heritage',
    label: 'Heritage & Faith',
    count: 3,
    icon: Landmark,
    image: '/tourism/san-pedro-library-museum.jpg',
    alt: 'San Pedro City Library and Museum',
    className: 'border-amber-200 bg-amber-50 text-amber-900',
    badgeClassName: 'bg-amber-100 text-amber-800',
  },
  {
    slug: 'landmarks',
    label: 'Landmarks & Public Spaces',
    count: 2,
    icon: MapPin,
    image: '/tourism/san-pedro-city-square.jpg',
    alt: 'A San Pedro streetscape in Laguna',
    className: 'border-blue-200 bg-blue-50 text-blue-900',
    badgeClassName: 'bg-blue-100 text-blue-800',
  },
  {
    slug: 'recreation',
    label: 'Recreation & Sports',
    count: 2,
    icon: Waves,
    image: '/tourism/san-pedro-city-square.jpg',
    alt: 'San Pedro city life near the lakeside corridor',
    className: 'border-cyan-200 bg-cyan-50 text-cyan-900',
    badgeClassName: 'bg-cyan-100 text-cyan-800',
  },
  {
    slug: 'events',
    label: 'Festivals & Events',
    count: 1,
    icon: CalendarDays,
    image: '/tourism/san-pedro-market.jpg',
    alt: 'San Pedro Town Center wet and dry market',
    className: 'border-violet-200 bg-violet-50 text-violet-900',
    badgeClassName: 'bg-violet-100 text-violet-800',
  },
  {
    slug: 'local-life',
    label: 'Sampaguita & Local Life',
    count: 2,
    icon: Flower2,
    image: '/tourism/san-pedro-market.jpg',
    alt: 'San Pedro Town Center wet and dry market',
    className: 'border-rose-200 bg-rose-50 text-rose-900',
    badgeClassName: 'bg-rose-100 text-rose-800',
  },
  {
    slug: 'office',
    label: 'Tourism Information',
    count: 1,
    icon: ShieldCheck,
    image: '/tourism/san-pedro-library-museum.jpg',
    alt: 'San Pedro City Library and Museum',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    badgeClassName: 'bg-emerald-100 text-emerald-800',
  },
];

export default function TourismSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-b border-gray-100 bg-white py-14">
      <div ref={sectionRef} className="reveal mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary-700">
              <Compass className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Tourism
              </span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 sm:text-4xl">
              Discover San Pedro
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              A source-backed guide to sampaguita, heritage, city life, and
              lakeside stories — with clear labels for what is official,
              archived, or still being verified.
            </p>
          </div>
          <Link
            to="/tourism"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary-700 hover:underline"
          >
            View all tourism <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-8 grid gap-5 overflow-hidden rounded-3xl bg-[#003087] text-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <div className="mb-4 flex items-center gap-2 text-blue-200">
              <MapPin className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Sampaguita City · San Pedro, Laguna
              </span>
            </div>
            <h3 className="max-w-xl text-3xl font-black sm:text-4xl">
              A city of flowers, faith, and everyday stories.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100">
              Start with the highlights, then open the directory for source
              links, locations, and verification notes.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/tourism"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-primary-800 transition-colors hover:bg-blue-50"
              >
                Explore tourism <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_tcao25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-blue-300 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-800"
              >
                TCAO Charter <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative min-h-64 overflow-hidden lg:min-h-full">
            <img
              src="/tourism/san-pedro-city-square.jpg"
              alt="San Pedro, Laguna streetscape"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#003087] via-[#003087]/30 to-transparent lg:from-[#003087]/20" />
            <a
              href="https://commons.wikimedia.org/wiki/File:San_Pedro_City_Laguna.jpg"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-4 text-[10px] font-semibold text-white/80 underline underline-offset-2"
            >
              Photo: Wikimedia Commons
            </a>
          </div>
        </div>

        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary-700">
              Browse by guide category
            </p>
            <p className="mt-1 text-sm text-gray-600">
              11 source-linked records across six ways to explore the city.
            </p>
          </div>
          <Building2 className="hidden h-7 w-7 text-primary-200 sm:block" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOURISM_CATEGORIES.map(category => {
            const Icon = category.icon;
            return (
              <Link
                key={category.slug}
                to={`/tourism/${category.slug}`}
                className={`group relative min-h-40 overflow-hidden rounded-2xl border p-5 transition-transform hover:-translate-y-0.5 hover:shadow-md ${category.className}`}
              >
                <img
                  src={category.image}
                  alt={category.alt}
                  className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="relative flex h-full flex-col items-start justify-between gap-7">
                  <span className="rounded-xl bg-white/80 p-3 shadow-sm backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black">{category.label}</h3>
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${category.badgeClassName}`}
                    >
                      {category.count}{' '}
                      {category.count === 1 ? 'record' : 'records'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
