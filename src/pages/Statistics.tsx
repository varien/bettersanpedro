import { BarChart3, ExternalLink, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const PSA_URL = 'https://psa.gov.ph/classification/psgc/barangays/0403425000';
const BARANGAYS = [
  ['Bagong Silang', '6,364'],
  ['Cuyab', '22,745'],
  ['Estrella', '8,548'],
  ['G.S.I.S.', '2,891'],
  ['Landayan', '34,926'],
  ['Langgam', '31,477'],
  ['Laram', '6,764'],
  ['Magsaysay', '13,333'],
  ['Nueva', '5,819'],
  ['Poblacion', '6,736'],
  ['Riverside', '3,163'],
  ['San Antonio', '59,374'],
  ['San Roque', '7,191'],
  ['San Vicente', '28,339'],
  ['Santo Niño', '3,970'],
  ['United Bayanihan', '6,828'],
  ['United Better Living', '6,379'],
  ['Sampaguita Village', '5,226'],
  ['Calendola', '4,483'],
  ['Narra', '3,792'],
  ['Chrysanthemum', '12,590'],
  ['Fatima', '7,855'],
  ['Maharlika', '6,971'],
  ['Pacita 1', '24,037'],
  ['Pacita 2', '12,983'],
  ['Rosario', '10,124'],
  ['San Lorenzo Ruiz', '6,060'],
];

export default function Statistics() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const facts = [
    {
      value: '348,968',
      label: isFil ? 'Residente' : 'Residents',
      detail: '2024 POPCEN population',
    },
    {
      value: '27',
      label: isFil ? 'Barangay' : 'Barangays',
      detail: 'As of 31 July 2025',
    },
    {
      value: '1st Class',
      label: isFil ? 'Lungsod' : 'Component city',
      detail: 'PSA income classification',
    },
  ];

  return (
    <>
      <SEO
        title={isFil ? 'Estadistika' : 'Statistics'}
        description="Verified population and administrative statistics for San Pedro, Laguna."
        keywords="San Pedro Laguna statistics, population, barangays, PSA"
      />
      <main className="flex-grow">
        <section className="bg-[#003087] py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <BarChart3 className="mb-3 h-9 w-9 text-blue-200" />
            <h1 className="text-4xl font-black sm:text-5xl">
              {isFil ? 'Estadistika ng San Pedro' : 'San Pedro Statistics'}
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              {isFil
                ? 'Mga pangunahing numero mula sa opisyal na Philippine Statistics Authority reference.'
                : 'Key figures from the official Philippine Statistics Authority reference.'}
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {facts.map(fact => (
              <article
                key={fact.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <Users className="h-6 w-6 text-primary-700" />
                <p className="mt-4 text-3xl font-black text-gray-900">
                  {fact.value}
                </p>
                <p className="mt-1 font-bold text-gray-800">{fact.label}</p>
                <p className="mt-1 text-sm text-gray-500">{fact.detail}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-black text-gray-900">
                  {isFil ? 'Mga barangay' : 'Barangays'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  2024 POPCEN population, PSA PSGC page checked July 21, 2026.
                </p>
              </div>
              <a
                href={PSA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:underline"
              >
                {isFil ? 'Buksan ang PSA profile' : 'Open PSA profile'}{' '}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-5 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {BARANGAYS.map(([name, population]) => (
                <div
                  key={name}
                  className="flex items-center justify-between border-b border-gray-100 py-2 text-sm"
                >
                  <span className="text-gray-700">{name}</span>
                  <span className="font-semibold text-gray-900">
                    {population}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="font-black text-blue-950">
              {isFil ? 'Katayuan ng datos' : 'Data status'}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-900">
              {isFil
                ? 'Ang population, income class, barangay count, at barangay list ay mula sa PSA PSGC. Ang iba pang demographic, economic, at competitiveness datasets ay idaragdag kapag may napapanahong primary source.'
                : 'Population, income class, barangay count, and barangay list are from the PSA PSGC. Additional demographic, economic, and competitiveness datasets will be added when current primary sources are available.'}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
