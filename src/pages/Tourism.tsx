import { Compass, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

export default function Tourism() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <>
      <SEO title={isFil ? 'Turismo' : 'Tourism'} description="Tourism information for San Pedro, Laguna. Local places and events will be published after verification." keywords="San Pedro Laguna tourism, places, events" />
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-[#003087] py-16 text-white" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-2 flex items-center gap-3 text-blue-200"><Compass className="h-7 w-7" /><span className="text-sm font-medium uppercase tracking-widest">San Pedro, Laguna</span></div>
            <h1 className="text-4xl font-black sm:text-5xl">{isFil ? 'Turismo' : 'Tourism'}</h1>
            <p className="mt-3 max-w-2xl text-lg text-blue-100">{isFil ? 'Mga lugar, aktibidad, at kaganapan sa San Pedro.' : 'Places, activities, and events in San Pedro.'}</p>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <MapPin className="mx-auto h-10 w-10 text-primary-700" />
            <h2 className="mt-4 text-2xl font-black text-gray-900">{isFil ? 'Inihahanda ang directory' : 'Directory in preparation'}</h2>
            <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-gray-600">{isFil ? 'Nangangalap at nagsusuri kami ng mga opisyal na sanggunian para sa mga lugar, negosyo, at kaganapan sa San Pedro. Maglalathala lamang kami ng impormasyon kapag beripikado na ito.' : 'We are collecting and verifying official sources for places, businesses, and events in San Pedro. Information will be published only after it has been verified.'}</p>
            <Link to="/" className="mt-6 inline-flex items-center rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white hover:bg-primary-800">{isFil ? 'Bumalik sa Home' : 'Back to Home'}</Link>
          </div>
        </section>
      </main>
    </>
  );
}
