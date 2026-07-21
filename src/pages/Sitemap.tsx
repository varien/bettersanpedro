import { Link } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Building2,
  BarChart3,
  Shield,
  MapPin,
  Phone,
  Map,
  ChevronRight,
} from 'lucide-react';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { serviceCategories as servicesData } from '../data/yamlLoader';
import { useTranslation } from '../hooks/useTranslation';

interface Category {
  category: string;
  slug: string;
}

export default function Sitemap() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const translateServiceCategory = (name: string) => {
    if (!isFil) return name;
    const mapping: Record<string, string> = {
      'Social & Health': 'Panlipunan at Kalusugan',
      'Certificates & Clearances': 'Mga Sertipiko at Clearance',
      'Business & Taxes': 'Negosyo at Buwis',
      'Youth & Sports': 'Kabataan at Palakasan',
      Agriculture: 'Pagsasaka at Agrikultura',
    };
    return mapping[name] || name;
  };

  const SECTIONS = [
    {
      icon: Home,
      label: isFil ? 'Tahanan' : 'Home',
      href: '/',
      children: [],
    },
    {
      icon: Briefcase,
      label: isFil ? 'Mga Serbisyo' : 'Services',
      href: '/services',
      children: (servicesData.categories as Category[]).map(c => ({
        label: translateServiceCategory(c.category),
        href: `/services/${c.slug}`,
      })),
    },
    {
      icon: Building2,
      label: isFil ? 'Pamahalaan' : 'Government',
      href: '/government',
      children: [
        {
          label: isFil ? 'Mga Kagawaran at Opisyal' : 'Departments & Officials',
          href: '/government/departments',
        },
        {
          label: isFil
            ? 'Pambatas (Sangguniang Bayan)'
            : 'Legislative (City Council)',
          href: '/government/legislative',
        },
        {
          label: isFil
            ? 'Direktoryo ng Lokal na Opisyal'
            : 'Local Officials Directory',
          href: '/government/departments/officials',
        },
      ],
    },
    {
      icon: Shield,
      label: isFil ? 'Katapatan at Transparency' : 'Transparency',
      href: '/transparency',
      children: [
        {
          label: isFil ? 'Katapatan sa Pagbubunyag' : 'Full Disclosure Policy',
          href: '/transparency',
        },
        {
          label: isFil
            ? 'Mga Dokumento ng Transparency'
            : 'Transparency Documents',
          href: '/government/transparency-documents',
        },
        {
          label: isFil ? 'Mga Ulat at Estadistika' : 'Reports & Statistics',
          href: '/government/reports-and-statistics',
        },
      ],
    },
    {
      icon: BarChart3,
      label: isFil ? 'Estadistika' : 'Statistics',
      href: '/statistics',
      children: [
        {
          label: isFil ? 'Profile ng Lungsod' : 'City Profile',
          href: '/statistics',
        },
        {
          label: isFil ? 'Datos ng Barangay' : 'Barangay Data',
          href: '/statistics',
        },
      ],
    },
    {
      icon: MapPin,
      label: isFil ? 'Turismo' : 'Tourism',
      href: '/tourism',
      children: [
        {
          label: isFil ? 'Mga Makasaysayang Lugar' : 'Heritage Sites',
          href: '/tourism/heritage',
        },
        { label: isFil ? 'Mga Resort' : 'Resorts', href: '/tourism/resorts' },
        {
          label: isFil ? 'Mga Sakahan at Agri-Eco' : 'Farms & Agri-Eco',
          href: '/tourism/farms',
        },
        {
          label: isFil
            ? 'Mga Kaganapan at Akomodasyon'
            : 'Events & Accommodations',
          href: '/tourism/events',
        },
        {
          label: isFil ? 'Mga Restaurant at Café' : 'Restaurants & Cafés',
          href: '/tourism/restaurants',
        },
        {
          label: isFil
            ? 'Pakikipagsapalaran (Adventure & Eco)'
            : 'Adventure & Eco',
          href: '/tourism/adventure',
        },
      ],
    },
    {
      icon: Phone,
      label: isFil ? 'Makipag-ugnayan' : 'Contact',
      href: '/#contact',
      children: [],
    },
    {
      icon: Map,
      label: isFil ? 'Mabilisang Aksyon' : 'Quick Links',
      href: '#',
      children: [
        {
          label: isFil ? 'Tungkol sa Portal' : 'About the Portal',
          href: '/about',
        },
        {
          label: isFil ? 'Kakayahang Ma-access' : 'Accessibility',
          href: '/accessibility',
        },
        {
          label: 'Freedom of Information',
          href: 'https://www.foi.gov.ph',
        },
        {
          label: 'Open Data PH',
          href: 'https://data.gov.ph',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title={isFil ? 'Mapa ng Site' : 'Sitemap'}
        description="Full sitemap of the BetterSanPedro.ph community portal — browse all pages and sections."
        keywords="sitemap, San Pedro, portal, navigation"
      />

      {/* Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-primary-300 text-xs font-bold uppercase tracking-widest mb-2">
            BetterSanPedro.ph
          </p>
          <h1 className="text-4xl font-black mb-2">
            {isFil ? 'Mapa ng Site' : 'Sitemap'}
          </h1>
          <p className="text-primary-200 text-sm max-w-xl">
            {isFil
              ? 'Isang kumpletong listahan ng lahat ng mga pahina at seksyon na magagamit sa portal na ito.'
              : 'A complete list of all pages and sections available on this portal.'}
          </p>
        </div>
      </div>

      {/* Sections */}
      <main className="bg-gray-50 py-12 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {SECTIONS.map(section => {
              const Icon = section.icon;
              return (
                <div
                  key={section.label}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    {section.href.startsWith('http') || section.href === '#' ? (
                      <span className="font-black text-gray-900 text-base">
                        {section.label}
                      </span>
                    ) : (
                      <Link
                        to={section.href}
                        className="font-black text-gray-900 text-base hover:text-primary-700 transition-colors"
                      >
                        {section.label}
                      </Link>
                    )}
                  </div>

                  {section.children.length > 0 && (
                    <ul className="space-y-1.5 border-t border-gray-50 pt-3">
                      {section.children.map(child => (
                        <li key={child.label}>
                          {child.href.startsWith('http') ? (
                            <a
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 transition-colors cursor-pointer"
                            >
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              to={child.href}
                              className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary-700 transition-colors"
                            >
                              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </Reveal>
        </div>
      </main>
    </>
  );
}
