import { ExternalLink, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import data from '../../content/government/departments/legislative/legislative.json';
import { useTranslation } from '../hooks/useTranslation';

export default function SangguniangPanlungsod() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <>
      <SEO title="Sangguniang Panlungsod" description="Verified leadership and contact information for the 20th Legislative Council of San Pedro, Laguna." keywords="San Pedro Sangguniang Panlungsod, city council, vice mayor" />
      <main className="flex-grow">
        <div className="border-b border-gray-100 bg-gray-50 py-3"><nav className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 text-xs text-gray-500 sm:px-6"><Link to="/">{isFil ? 'Tahanan' : 'Home'}</Link><span>/</span><Link to="/government">{isFil ? 'Pamahalaan' : 'Government'}</Link><span>/</span><span className="font-medium text-gray-700">Sangguniang Panlungsod</span></nav></div>
        <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
          <header><Landmark className="mb-3 h-8 w-8 text-primary-700" /><p className="mb-1 text-sm font-bold uppercase tracking-wide text-primary-700">{data.TERM}</p><h1 className="text-3xl font-black text-gray-900">Sangguniang Panlungsod ng San Pedro</h1><p className="mt-2 max-w-3xl text-gray-600">{isFil ? 'Ang pambatasang sangay ng Pamahalaang Lungsod ng San Pedro.' : 'The legislative branch of the City Government of San Pedro.'}</p></header>

          <Reveal as="section" className="grid gap-4 sm:grid-cols-2">{data.presiding_officer.map(officer => <div key={officer.position} className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wide text-gray-500">{officer.position}</p><p className="mt-1 text-lg font-black text-gray-900">{officer.name}</p></div>)}</Reveal>

          <Reveal as="section" className="rounded-xl border border-amber-200 bg-amber-50 p-6"><h2 className="font-black text-amber-950">{isFil ? 'Sinusuri pa ang buong talaan' : 'Full roster under verification'}</h2><p className="mt-2 text-sm leading-relaxed text-amber-900">{isFil ? 'Kinukumpirma pa mula sa kasalukuyang opisyal na talaan ang kumpletong mga konsehal, ex-officio members, at committee assignments ng 20th Legislative Council. Hindi muna maglalathala ang portal ng hindi beripikadong pangalan.' : 'The complete councilors, ex-officio members, and committee assignments of the 20th Legislative Council are still being confirmed from a current official roster. The portal will not publish unverified names.'}</p><a href={data.source.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">{isFil ? 'Tingnan ang opisyal na sanggunian' : 'View official source'} <ExternalLink className="h-3.5 w-3.5" /></a></Reveal>

          <Reveal as="section" className="rounded-xl border border-gray-200 bg-gray-50 p-6"><h2 className="font-black text-gray-900">{data.contact.office}</h2><p className="mt-2 text-sm text-gray-700">{data.contact.address}</p><p className="mt-1 text-sm text-gray-700">Tel: <a href="tel:+63285530773" className="font-semibold text-primary-700 hover:underline">{data.contact.telephone}</a></p></Reveal>
        </div>
      </main>
    </>
  );
}
