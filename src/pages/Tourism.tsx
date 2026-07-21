import {
  CalendarDays,
  Compass,
  ExternalLink,
  Landmark,
  MapPin,
} from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const REFERENCES = [
  {
    icon: Landmark,
    title: 'City Tourism, Culture and Arts Office',
    description:
      'The official city office responsible for tourism, culture, and arts programs. Its 2025 Citizen’s Charter is the current public service reference.',
    source: 'Open the TCAO Citizen’s Charter',
    url: 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_tcao25.pdf',
  },
  {
    icon: CalendarDays,
    title: 'Sampaguita Festival archive',
    description:
      'The City Government’s official archive documents the 2024 Sampaguita Festival, including the float parade and community activities.',
    source: 'View the official festival archive',
    url: 'https://cityofsanpedrolaguna.gov.ph/category/news-and-releases/page/91/',
  },
  {
    icon: MapPin,
    title: 'Cultural Mapping Project',
    description:
      'The City Tourism, Culture and Arts Office and Grupo Kalinangan began a city cultural mapping project covering local barangays in 2024.',
    source: 'Read the city update',
    url: 'https://cityofsanpedrolaguna.gov.ph/category/news-and-releases/page/102/',
  },
];

export default function Tourism() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  return (
    <>
      <SEO
        title={isFil ? 'Turismo' : 'Tourism'}
        description="Official tourism, culture, and arts references for San Pedro, Laguna."
        keywords="San Pedro Laguna tourism, Sampaguita Festival, culture, arts"
      />
      <main className="flex-grow">
        <section
          className="relative overflow-hidden bg-[#003087] py-16 text-white"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-2 flex items-center gap-3 text-blue-200">
              <Compass className="h-7 w-7" />
              <span className="text-sm font-medium uppercase tracking-widest">
                San Pedro, Laguna
              </span>
            </div>
            <h1 className="text-4xl font-black sm:text-5xl">
              {isFil
                ? 'Turismo, Kultura at Sining'
                : 'Tourism, Culture and Arts'}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              {isFil
                ? 'Mga opisyal na sanggunian at tala para sa mga programa at kaganapan ng lungsod.'
                : 'Official references and archives for the city’s tourism, culture, and arts programs.'}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="mb-8 rounded-2xl border border-primary-100 bg-primary-50 p-6">
            <h2 className="text-xl font-black text-gray-900">
              {isFil
                ? 'Source-first tourism directory'
                : 'Source-first tourism directory'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
              {isFil
                ? 'Nagsisimula kami sa mga opisyal na tala ng lungsod. Hindi muna naglilista ng pribadong establisimyento o kasalukuyang iskedyul hangga’t walang napapanahong source at kumpirmasyon.'
                : 'We are starting with official city records. Private establishments and current schedules are not listed until a current source and confirmation are available.'}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {REFERENCES.map(reference => {
              const Icon = reference.icon;
              return (
                <article
                  key={reference.title}
                  className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="h-7 w-7 text-primary-700" />
                  <h2 className="mt-4 text-lg font-black text-gray-900">
                    {reference.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {reference.description}
                  </p>
                  <a
                    href={reference.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:underline"
                  >
                    {reference.source} <ExternalLink className="h-4 w-4" />
                  </a>
                </article>
              );
            })}
          </div>
          <p className="mt-8 text-xs text-gray-500">
            {isFil
              ? 'Huling sinuri: Hulyo 21, 2026. Ang mga archival event links ay hindi patunay ng kasalukuyang schedule.'
              : 'Last checked: July 21, 2026. Archived event links do not confirm a current schedule.'}
          </p>
        </section>
      </main>
    </>
  );
}
