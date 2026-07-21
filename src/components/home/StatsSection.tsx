import { Users, MapPin, Building2, CalendarDays, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function StatsSection() {
  const { t } = useTranslation('common');
  const ref = useScrollReveal<HTMLElement>();

  const STATS = [
    {
      icon: Users,
      value: '348,968',
      label: t('stats.population.label'),
      description: t('stats.population.desc'),
    },
    {
      icon: MapPin,
      value: '27',
      label: t('stats.barangays.label'),
      description: t('stats.barangays.desc'),
    },
    {
      icon: Building2,
      value: '1st Class',
      label: 'Component City',
      description: t('stats.classification.desc'),
    },
    {
      icon: CalendarDays,
      value: '2024',
      label: 'POPCEN',
      description: 'Latest PSA population count',
    },
  ];

  return (
    <section
      ref={ref}
      className="reveal bg-white border-b border-gray-100 py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-gray-900">
            {t('stats.title')}
          </h2>
          <Link
            to="/statistics"
            className="text-sm font-semibold text-primary-700 hover:text-primary-800 flex items-center gap-1 transition-colors"
          >
            {t('stats.viewProfile')}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ icon: Icon, value, label, description }) => (
            <div
              key={description}
              className="bg-gray-50 rounded-xl p-5 border border-gray-100"
            >
              <div className="bg-primary-100 text-primary-700 w-9 h-9 rounded-lg flex items-center justify-center mb-3">
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-2xl font-black text-gray-900 leading-none mb-1">
                {value}
              </div>
              {label && (
                <div className="text-sm font-semibold text-gray-800">
                  {label}
                </div>
              )}
              <div className="text-xs text-gray-600 mt-0.5">{description}</div>
            </div>
          ))}
        </div>
        <a
          href="https://psa.gov.ph/classification/psgc/barangays/0403425000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-primary-700 hover:text-primary-900"
        >
          Source: Philippine Statistics Authority PSGC
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </section>
  );
}
