import { ExternalLink, FileSearch } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const RESOURCES = [
  { label: 'DILG Full Disclosure Policy', url: 'https://fdp.dilg.gov.ph/' },
  { label: 'Freedom of Information Philippines', url: 'https://www.foi.gov.ph/' },
  { label: 'Commission on Audit', url: 'https://www.coa.gov.ph/' },
];

export default function Transparency() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  return (
    <><SEO title={isFil ? 'Transparency' : 'Transparency'} description="Transparency and public-record resources for San Pedro, Laguna." keywords="San Pedro transparency, DILG FDP, FOI, public records" /><main className="flex-grow"><section className="bg-[#003087] py-16 text-white"><div className="mx-auto max-w-7xl px-4 sm:px-6"><FileSearch className="mb-3 h-9 w-9 text-blue-200" /><h1 className="text-4xl font-black sm:text-5xl">Transparency</h1><p className="mt-3 max-w-2xl text-lg text-blue-100">{isFil ? 'Mga pampublikong resource para sa pananagutan at paghingi ng impormasyon.' : 'Public resources for accountability and requesting information.'}</p></div></section><section className="mx-auto max-w-5xl px-4 py-12 sm:px-6"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black text-amber-950">{isFil ? 'Sinusuri ang lokal na mga dokumento' : 'Local documents under verification'}</h2><p className="mt-2 text-sm leading-relaxed text-amber-900">{isFil ? 'Hindi pa naglalathala ang BetterSanPedro.ph ng local budget, procurement, o accomplishment documents hanggang makumpirma ang kasalukuyang opisyal na source at petsa ng bawat record.' : 'BetterSanPedro.ph is not yet publishing local budget, procurement, or accomplishment documents until the current official source and date for each record are confirmed.'}</p></div><div className="mt-6 grid gap-4 sm:grid-cols-3">{RESOURCES.map(resource => <a key={resource.label} href={resource.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-gray-200 bg-white p-5 font-bold text-gray-900 transition-shadow hover:shadow-md">{resource.label}<ExternalLink className="mt-3 h-4 w-4 text-primary-700" /></a>)}</div></section></main></>
  );
}
