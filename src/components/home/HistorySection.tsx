import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const TEASER_KEYS = ['precolonial', 'revolution', 'present'] as const;

function TimelineItem({
  eventKey,
  index,
  isLast,
}: {
  eventKey: string;
  index: number;
  isLast: boolean;
}) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const year = t(`history.events.${eventKey}.year`);
  const title = t(`history.events.${eventKey}.title`);
  const text = t(`history.events.${eventKey}.text`);
  const truncated =
    text.length > 110 ? text.substring(0, 110).trimEnd() + '…' : text;

  return (
    <div
      ref={ref}
      className="relative flex gap-5"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 rounded-full bg-primary-700 border-2 border-white ring-2 ring-primary-200 mt-1.5 shrink-0 z-10" />
        {!isLast && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-300 to-primary-100 mt-1" />
        )}
      </div>
      <div className="pb-5 flex-1">
        <span className="inline-block text-xs font-black text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full mb-1.5 border border-primary-100">
          {year}
        </span>
        <h3 className="font-bold text-gray-900 text-sm mb-0.5">{title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{truncated}</p>
      </div>
    </div>
  );
}

export default function HistorySection() {
  const { t } = useTranslation('common');
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal bg-gray-50 py-12 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">
                {t('history.title')}
              </h2>
              <Link
                to="/tourism/history"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors"
              >
                Full history
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="pl-1">
              {TEASER_KEYS.map((key, i) => (
                <TimelineItem
                  key={key}
                  eventKey={key}
                  index={i}
                  isLast={i === TEASER_KEYS.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col justify-center gap-4">
            <div className="bg-primary-700 rounded-2xl p-6 text-white">
              <div className="text-4xl font-black mb-2">1906</div>
              <div className="text-blue-100 font-semibold text-lg mb-2">
                {t('history.charteredYear')}
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                {t('history.charteredDesc')}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-4xl font-black text-primary-700 mb-2">
                ~60m
              </div>
              <div className="text-gray-800 font-semibold text-lg mb-2">
                {t('history.elevationLabel')}
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('history.elevationDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
