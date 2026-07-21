import { BarChart3, ExternalLink, Users } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const PSA_URL = 'https://psa.gov.ph/classification/psgc/barangays/0403425000';

export default function Statistics() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const facts = [
    { value: '348,968', label: isFil ? 'Residente' : 'Residents', detail: isFil ? '2024 POPCEN population' : '2024 POPCEN population' },
    { value: '27', label: isFil ? 'Barangay' : 'Barangays', detail: isFil ? 'PSGC administrative reference' : 'PSGC administrative reference' },
    { value: '1st Class', label: isFil ? 'Component City' : 'Component City', detail: isFil ? 'PSA classification' : 'PSA classification' },
  ];

  return (
    <><SEO title={isFil ? 'Estadistika' : 'Statistics'} description="Verified population and administrative statistics for San Pedro, Laguna." keywords="San Pedro Laguna statistics, population, barangays, PSA" /><main className="flex-grow"><section className="bg-[#003087] py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6"><BarChart3 className="mb-3 h-9 w-9 text-blue-200" /><h1 className="text-4xl font-black sm:text-5xl">{isFil ? 'Estadistika ng San Pedro' : 'San Pedro Statistics'}</h1><p className="mt-3 max-w-2xl text-lg text-blue-100">{isFil ? 'Mga pangunahing numero mula sa opisyal na Philippine Statistics Authority reference.' : 'Key figures from the official Philippine Statistics Authority reference.'}</p></div></section><section className="mx-auto max-w-7xl px-4 py-12 sm:px-6"><div className="grid gap-5 md:grid-cols-3">{facts.map(fact => <article key={fact.label} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><Users className="h-6 w-6 text-primary-700" /><p className="mt-4 text-3xl font-black text-gray-900">{fact.value}</p><p className="mt-1 font-bold text-gray-800">{fact.label}</p><p className="mt-1 text-sm text-gray-500">{fact.detail}</p></article>)}</div><div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6"><h2 className="font-black text-blue-950">{isFil ? 'Katayuan ng datos' : 'Data status'}</h2><p className="mt-2 max-w-3xl text-sm leading-relaxed text-blue-900">{isFil ? 'Sinusuri pa ang mas detalyadong demographic, economic, at competitiveness datasets bago idagdag ang mga ito sa portal.' : 'Detailed demographic, economic, and competitiveness datasets are still being verified before they are added to the portal.'}</p><a href={PSA_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:underline">{isFil ? 'Buksan ang PSA PSGC profile' : 'Open the PSA PSGC profile'} <ExternalLink className="h-4 w-4" /></a></div></section></main></>
  );
}
