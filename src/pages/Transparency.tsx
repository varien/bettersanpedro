import { ExternalLink, FileSearch } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const RESOURCES = [
  {
    label: 'City Citizen’s Charter 2025',
    description:
      'Service standards, responsible offices, requirements, fees, and processing times.',
    url: 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/San-Pedro-Citizens-Charter-2025-1st-EditionApr30_2025.pdf',
  },
  {
    label: 'City Procurement Office Charter',
    description:
      'Official procurement and bid-posting procedures in the city’s charter.',
    url: 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_procurement25.pdf',
  },
  {
    label: 'City Budget Office Charter',
    description:
      'Official budget-office procedures and public service standards.',
    url: 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_budget25.pdf',
  },
  {
    label: 'DILG Full Disclosure Policy',
    description: 'National portal for local government disclosure records.',
    url: 'https://fdp.dilg.gov.ph/',
  },
  {
    label: 'Freedom of Information Philippines',
    description: 'Request public records through the national FOI portal.',
    url: 'https://www.foi.gov.ph/',
  },
  {
    label: 'Commission on Audit',
    description: 'Official audit reports and accountability resources.',
    url: 'https://www.coa.gov.ph/',
  },
];

export default function Transparency() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  return (
    <>
      <SEO
        title={isFil ? 'Transparency' : 'Transparency'}
        description="Transparency and public-record resources for San Pedro, Laguna."
        keywords="San Pedro transparency, DILG FDP, FOI, public records"
      />
      <main className="flex-grow">
        <section className="bg-[#003087] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <FileSearch className="mb-3 h-9 w-9 text-blue-200" />
            <h1 className="text-4xl font-black sm:text-5xl">Transparency</h1>
            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              {isFil
                ? 'Mga pampublikong resource para sa pananagutan at paghingi ng impormasyon.'
                : 'Public resources for accountability and requesting information.'}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-black text-blue-950">
              {isFil ? 'Mga source ng dokumento' : 'Document sources'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-blue-900">
              {isFil
                ? 'Ang BetterSanPedro.ph ay nagli-link sa primary sources at hindi nagho-host ng kopya ng local financial records. Suriin ang source para sa petsa at saklaw ng bawat dokumento.'
                : 'BetterSanPedro.ph links to primary sources and does not host copies of local financial records. Check each source for the document date and coverage.'}
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCES.map(resource => (
              <a
                key={resource.label}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <span className="font-bold text-gray-900">
                  {resource.label}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                  {resource.description}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-700">
                  {isFil ? 'Buksan ang source' : 'Open source'}{' '}
                  <ExternalLink className="h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-gray-500">
            {isFil
              ? 'Huling sinuri: Hulyo 21, 2026. Ang availability at coverage ng external records ay maaaring magbago.'
              : 'Last checked: July 21, 2026. External record availability and coverage may change.'}
          </p>
        </section>
      </main>
    </>
  );
}
