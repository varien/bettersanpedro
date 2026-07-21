import { useState } from 'react';
import { Building2, ExternalLink, List, Table2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import dir from '../../content/government/departments/executive.json';
import { useTranslation } from '../hooks/useTranslation';

type ViewMode = 'table' | 'list';

function ViewToggle({ mode, onChange, isFil }: { mode: ViewMode; onChange: (mode: ViewMode) => void; isFil: boolean }) {
  return (
    <div className="flex overflow-hidden rounded-md border border-gray-200">
      {(['table', 'list'] as const).map(item => {
        const Icon = item === 'table' ? Table2 : List;
        return (
          <button key={item} type="button" onClick={() => onChange(item)} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${mode === item ? 'bg-primary-700 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <Icon className="h-3.5 w-3.5" />
            {item === 'table' ? (isFil ? 'Talahanayan' : 'Table') : isFil ? 'Listahan' : 'List'}
          </button>
        );
      })}
    </div>
  );
}

export default function ExecutiveDirectory() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const [view, setView] = useState<ViewMode>('table');
  const h = dir.header;

  return (
    <>
      <SEO title={isFil ? 'Direktoryo ng mga Tanggapan ng Lungsod' : 'City Office Directory'} description="Verified City Hall offices and contact details for the City of San Pedro, Laguna." keywords="San Pedro Laguna City Hall, city offices, directory, contacts" />
      <main className="flex-grow">
        <div className="border-b border-gray-100 bg-gray-50 py-3">
          <nav className="mx-auto flex max-w-7xl items-center gap-1.5 px-4 text-xs text-gray-500 sm:px-6">
            <Link to="/">{isFil ? 'Tahanan' : 'Home'}</Link><span>/</span>
            <Link to="/government">{isFil ? 'Pamahalaan' : 'Government'}</Link><span>/</span>
            <span className="font-medium text-gray-700">{isFil ? 'Direktoryo' : 'Office Directory'}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6">
          <header>
            <Building2 className="mb-3 h-8 w-8 text-primary-700" />
            <h1 className="mb-2 text-2xl font-black text-gray-900 sm:text-3xl">{isFil ? 'Lungsod ng San Pedro — Direktoryo ng mga Tanggapan' : 'City of San Pedro — Office Directory'}</h1>
            <p className="max-w-3xl text-sm leading-relaxed text-gray-600">{h.address} · Trunkline: <a className="font-semibold text-primary-700 hover:underline" href="tel:+63288082020">{h.telephone}</a> · <a className="font-semibold text-primary-700 hover:underline" href={`mailto:${h.email}`}>{h.email}</a></p>
          </header>

          <Reveal as="section" className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wide text-gray-500">{isFil ? 'Punong Lungsod' : 'City Mayor'}</p><p className="mt-1 text-lg font-black text-gray-900">{dir.MAYOR}</p></div>
            <div className="rounded-xl border border-gray-200 bg-white p-5"><p className="text-xs font-bold uppercase tracking-wide text-gray-500">{isFil ? 'Pangalawang Punong Lungsod' : 'City Vice Mayor'}</p><p className="mt-1 text-lg font-black text-gray-900">{dir.VICE_MAYOR}</p></div>
          </Reveal>

          <Reveal as="section">
            <div className="mb-4 flex items-center justify-between gap-4"><h2 className="text-lg font-black text-gray-900">{isFil ? 'Mga Tanggapan sa City Hall' : 'City Hall Offices'}</h2><ViewToggle mode={view} onChange={setView} isFil={isFil} /></div>
            {view === 'table' ? (
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[680px] text-sm"><thead className="border-b border-gray-200 bg-gray-50"><tr><th className="px-4 py-3 text-left font-semibold text-gray-600">{isFil ? 'Tanggapan' : 'Office'}</th><th className="w-24 px-4 py-3 text-left font-semibold text-gray-600">{isFil ? 'Palapag' : 'Floor'}</th><th className="w-60 px-4 py-3 text-left font-semibold text-gray-600">{isFil ? 'Kontak' : 'Contact'}</th></tr></thead>
                  <tbody>{dir.city_offices.map((row, index) => <tr key={row.office} className={index % 2 ? 'bg-gray-50/50' : 'bg-white'}><td className="px-4 py-3 text-gray-800"><span className="font-semibold">{row.office}</span>{row.in_charge && <span className="mt-0.5 block text-xs text-gray-500">{row.in_charge}</span>}</td><td className="px-4 py-3 text-gray-600">{row.location}</td><td className="px-4 py-3 font-medium text-gray-700">{row.telephone}</td></tr>)}</tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">{dir.city_offices.map(row => <div key={row.office} className="rounded-lg border border-gray-200 bg-white px-4 py-3"><div className="font-semibold text-gray-800">{row.office}</div><div className="mt-1 text-sm text-gray-600">{row.location} · {row.telephone}</div>{row.in_charge && <div className="mt-1 text-xs text-gray-500">{row.in_charge}</div>}</div>)}</div>
            )}
          </Reveal>

          <Reveal as="section" className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-950">
            <p className="font-bold">{isFil ? 'Katayuan ng datos' : 'Data status'}</p>
            <p className="mt-1 leading-relaxed">{isFil ? 'Ang mga kontak na ito ay mula sa opisyal na direktoryo ng lungsod at huling sinuri noong Hulyo 21, 2026. Tumawag muna sa trunkline para kumpirmahin ang extension bago bumiyahe.' : 'These contacts come from the official city directory and were last checked on July 21, 2026. Call the trunkline to confirm an extension before travelling.'}</p>
            <a href={dir.source.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 font-semibold text-primary-700 hover:underline">{isFil ? 'Buksan ang opisyal na sanggunian' : 'Open official source'} <ExternalLink className="h-3.5 w-3.5" /></a>
          </Reveal>
        </div>
      </main>
    </>
  );
}
