import { ExternalLink, FileText, Landmark, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';

const cityCharter = 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/San-Pedro-Citizens-Charter-2025-1st-EditionApr30_2025.pdf';

export default function Legislative() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const sections = [
    { title: isFil ? 'Konseho ng Lungsod' : 'City Council', icon: Landmark, description: isFil ? 'Beripikadong pamunuan at contact ng Sangguniang Panlungsod.' : 'Verified leadership and contact details for the Sangguniang Panlungsod.', href: '/government/departments/officials' },
    { title: isFil ? 'Mga Ordinansa' : 'Ordinances', icon: Scale, description: isFil ? 'Ilalathala pagkatapos makumpirma ang opisyal at kasalukuyang repository.' : 'To be published after the current official repository is confirmed.', href: '/government/departments/legislative' },
    { title: isFil ? 'Mga Resolusyon' : 'Resolutions', icon: FileText, description: isFil ? 'Ilalathala pagkatapos makumpirma ang opisyal at kasalukuyang repository.' : 'To be published after the current official repository is confirmed.', href: '/government/departments/legislative' },
  ];

  return (
    <>
      <SEO title={isFil ? 'Pambatasang Sangay' : 'Legislative'} description="Sangguniang Panlungsod information and legislative resources for the City of San Pedro, Laguna." keywords="San Pedro legislative, Sangguniang Panlungsod, ordinances, resolutions" />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-[#003087] py-16 text-white" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="mb-2 flex items-center gap-3"><Scale className="h-7 w-7 text-blue-200" /><span className="text-sm font-medium uppercase tracking-widest text-blue-200">Sangguniang Panlungsod ng San Pedro</span></div><h1 className="mb-3 text-4xl font-black sm:text-5xl">{isFil ? 'Pambatasang Sangay' : 'Legislative'}</h1><p className="max-w-2xl text-lg text-blue-100">{isFil ? 'Beripikadong impormasyon tungkol sa konseho at mga opisyal na pambatasang dokumento ng Lungsod ng San Pedro.' : 'Verified council information and official legislative resources for the City of San Pedro.'}</p></div>
        </div>

        <Reveal as="section" className="border-b border-gray-100 bg-white py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><div className="max-w-3xl"><h2 className="mb-3 text-xl font-black text-gray-900">{isFil ? 'Tungkol sa Sangguniang Panlungsod' : 'About the Sangguniang Panlungsod'}</h2><p className="leading-relaxed text-gray-600">{isFil ? 'Ang Sangguniang Panlungsod ang pambatasang sangay ng Pamahalaang Lungsod. Nagpapatibay ito ng mga ordinansa at resolusyon at ginagampanan ang mga kapangyarihang itinakda ng Local Government Code.' : 'The Sangguniang Panlungsod is the City Government’s legislative branch. It enacts ordinances and resolutions and exercises the powers provided by the Local Government Code.'}</p></div></div></Reveal>

        <Reveal as="section" className="border-b border-gray-100 bg-gray-50 py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="mb-6 text-xl font-black text-gray-900">{isFil ? 'Impormasyon at mga Dokumento' : 'Information and Documents'}</h2><div className="grid gap-5 md:grid-cols-3">{sections.map(({ title, icon: Icon, description, href }) => <Link key={title} to={href} className="rounded-xl border border-gray-200 border-t-4 border-t-primary-600 bg-white p-6 transition-shadow hover:shadow-md"><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-primary-700"><Icon className="h-5 w-5" /></div><h3 className="font-black text-gray-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p></Link>)}</div></div></Reveal>

        <Reveal as="section" className="bg-white py-12"><div className="mx-auto max-w-7xl px-4 sm:px-6"><h2 className="mb-3 text-xl font-black text-gray-900">{isFil ? 'Opisyal na Sanggunian' : 'Official Reference'}</h2><p className="max-w-2xl text-sm leading-relaxed text-gray-600">{isFil ? 'Tingnan ang 2025 Citizen’s Charter para sa mga opisyal na serbisyo, opisina, at paraan ng paghingi ng mga dokumento.' : 'See the 2025 Citizen’s Charter for official services, offices, and procedures for requesting records.'}</p><a href={cityCharter} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline">{isFil ? 'Buksan ang Citizen’s Charter' : 'Open the Citizen’s Charter'} <ExternalLink className="h-3.5 w-3.5" /></a></div></Reveal>
      </main>
    </>
  );
}
