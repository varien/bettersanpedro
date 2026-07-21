import { BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

export default function SanPedroHistory() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  return (
    <><SEO title={isFil ? 'Kasaysayan ng San Pedro' : 'History of San Pedro'} description="History resources for San Pedro, Laguna, under source verification." keywords="San Pedro Laguna history" /><main className="flex-grow"><section className="bg-[#003087] py-16 text-white"><div className="mx-auto max-w-5xl px-4 sm:px-6"><BookOpen className="mb-3 h-9 w-9 text-blue-200" /><h1 className="text-4xl font-black sm:text-5xl">{isFil ? 'Kasaysayan ng San Pedro' : 'History of San Pedro'}</h1></div></section><section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6"><BookOpen className="mx-auto h-10 w-10 text-primary-700" /><h2 className="mt-4 text-2xl font-black text-gray-900">{isFil ? 'Sinusuri ang kasaysayan' : 'History under research'}</h2><p className="mt-3 leading-relaxed text-gray-600">{isFil ? 'Nangangalap kami ng mga mapagkakatiwalaang primary at archival source para sa kasaysayan ng San Pedro. Hindi muna ilalathala ang mga historical claim hangga’t hindi ito nabe-verify.' : 'We are collecting reliable primary and archival sources for San Pedro’s history. Historical claims will not be published until they are verified.'}</p><a href="https://cityofsanpedrolaguna.gov.ph/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1 font-bold text-primary-700 hover:underline">{isFil ? 'Buksan ang opisyal na website ng lungsod' : 'Open the official city website'} <ExternalLink className="h-4 w-4" /></a><Link to="/tourism" className="ml-5 text-sm font-bold text-primary-700 hover:underline">{isFil ? 'Turismo' : 'Tourism'}</Link></section></main></>
  );
}
