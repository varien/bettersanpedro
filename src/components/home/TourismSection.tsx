import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function TourismSection() {
  const sectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <section className="border-b border-gray-100 bg-white py-12">
      <div ref={sectionRef} className="reveal mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-5 rounded-2xl border border-primary-100 bg-primary-50 p-7 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-primary-700">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Tourism</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900">Discover San Pedro</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              The San Pedro tourism directory is being prepared. Places, events, and local recommendations will appear here after their sources are verified.
            </p>
          </div>
          <Link to="/tourism" className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-800">
            Explore Tourism <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
