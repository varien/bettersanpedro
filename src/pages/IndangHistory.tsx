import { BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const SENATE_RA_10420 = 'https://senate.gov.ph/republic_acts/ra%2010420.pdf';

export default function SanPedroHistory() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <>
      <SEO
        title={isFil ? 'Kasaysayan ng San Pedro' : 'History of San Pedro'}
        description="Verified history resources for San Pedro, Laguna."
        keywords="San Pedro Laguna history"
      />
      <main className="flex-grow">
        <section className="bg-[#003087] py-16 text-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <BookOpen className="mb-3 h-9 w-9 text-blue-200" />
            <h1 className="text-4xl font-black sm:text-5xl">
              {isFil ? 'Kasaysayan ng San Pedro' : 'History of San Pedro'}
            </h1>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <article className="rounded-2xl border border-primary-100 bg-primary-50 p-7">
            <p className="text-sm font-black uppercase tracking-wider text-primary-700">
              2013
            </p>
            <h2 className="mt-2 text-2xl font-black text-gray-900">
              {isFil
                ? 'Pagiging lungsod ng San Pedro'
                : 'San Pedro becomes a city'}
            </h2>
            <p className="mt-3 leading-relaxed text-gray-700">
              {isFil
                ? 'Noong Marso 27, 2013, inaprubahan ang Republic Act No. 10420, na nag-charter sa dating Munisipalidad ng San Pedro bilang component city ng Laguna.'
                : 'On March 27, 2013, Republic Act No. 10420 was approved, chartering the former Municipality of San Pedro as a component city of Laguna.'}
            </p>
            <a
              href={SENATE_RA_10420}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 font-bold text-primary-700 hover:underline"
            >
              {isFil
                ? 'Basahin ang Republic Act No. 10420'
                : 'Read Republic Act No. 10420'}{' '}
              <ExternalLink className="h-4 w-4" />
            </a>
          </article>
          <p className="mt-8 leading-relaxed text-gray-600">
            {isFil
              ? 'Patuloy naming sinusuri ang mas mahabang kasaysayan ng San Pedro gamit ang primary at archival sources bago maglathala ng mga karagdagang claim.'
              : "We are continuing to verify San Pedro's longer history through primary and archival sources before publishing additional claims."}
          </p>
          <a
            href="https://cityofsanpedrolaguna.gov.ph/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1 font-bold text-primary-700 hover:underline"
          >
            {isFil
              ? 'Buksan ang opisyal na website ng lungsod'
              : 'Open the official city website'}{' '}
            <ExternalLink className="h-4 w-4" />
          </a>
          <Link
            to="/tourism"
            className="ml-5 text-sm font-bold text-primary-700 hover:underline"
          >
            {isFil ? 'Turismo' : 'Tourism'}
          </Link>
        </section>
      </main>
    </>
  );
}
