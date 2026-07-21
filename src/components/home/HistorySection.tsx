import { ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const SENATE_RA_10420 = 'https://senate.gov.ph/republic_acts/ra%2010420.pdf';

export default function HistorySection() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const ref = useScrollReveal<HTMLElement>();
  const copy = isFil
    ? {
        eyebrow: 'Kasaysayan ng San Pedro',
        title: 'Isang na-verify na modernong milestone',
        body: 'Noong Marso 27, 2013, inaprubahan ang Republic Act No. 10420, na nag-charter sa dating Munisipalidad ng San Pedro bilang component city ng Laguna.',
        note: 'Patuloy naming sinusuri ang mas mahabang kasaysayan ng San Pedro gamit ang primary at archival sources bago maglathala ng mga claim.',
        source: 'Basahin ang Republic Act No. 10420',
        more: 'Pahina ng kasaysayan',
      }
    : {
        eyebrow: 'History of San Pedro',
        title: 'A verified modern civic milestone',
        body: 'On March 27, 2013, Republic Act No. 10420 was approved, chartering the former Municipality of San Pedro as a component city of Laguna.',
        note: "We are continuing to verify San Pedro's longer history through primary and archival sources before publishing additional claims.",
        source: 'Read Republic Act No. 10420',
        more: 'History page',
      };

  return (
    <section
      ref={ref}
      className="reveal border-b border-gray-100 bg-gray-50 py-12"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2 text-primary-700">
              <BookOpen className="h-5 w-5" />
              <p className="text-sm font-bold uppercase tracking-wider">
                {copy.eyebrow}
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-black text-gray-900 sm:text-3xl">
              {copy.title}
            </h2>
            <Link
              to="/tourism/history"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:underline"
            >
              {copy.more} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <article className="rounded-2xl border border-primary-100 bg-white p-6 shadow-sm">
            <p className="text-3xl font-black text-primary-700">2013</p>
            <p className="mt-2 leading-relaxed text-gray-700">{copy.body}</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              {copy.note}
            </p>
            <a
              href={SENATE_RA_10420}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary-700 hover:underline"
            >
              {copy.source} <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
