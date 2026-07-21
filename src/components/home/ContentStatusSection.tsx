import { CheckCircle2, Clock3, ExternalLink, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const OFFICIAL_CITY_SITE = 'https://cityofsanpedrolaguna.gov.ph/';
const PSA_PROFILE = 'https://psa.gov.ph/classification/psgc/barangays/0403425000';

const STATUS_ITEMS = [
  {
    icon: CheckCircle2,
    tone: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    title: 'City profile verified',
    description:
      'Population, barangay count, and income class are based on the PSA PSGC profile for the City of San Pedro.',
    href: PSA_PROFILE,
    linkLabel: 'View PSA profile',
  },
  {
    icon: ShieldCheck,
    tone: 'text-primary-700 bg-primary-50 border-primary-100',
    title: 'Official contact points',
    description:
      'City Hall contact details are taken from the City Government of San Pedro website and Citizen’s Charter materials.',
    href: OFFICIAL_CITY_SITE,
    linkLabel: 'Open city website',
  },
  {
    icon: Clock3,
    tone: 'text-amber-700 bg-amber-50 border-amber-100',
    title: 'Local content in review',
    description:
      'Tourism, history, leadership, and program pages are being re-sourced for San Pedro before publication.',
    href: OFFICIAL_CITY_SITE,
    linkLabel: 'Check official updates',
  },
];

export default function ContentStatusSection() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal bg-gray-50 py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-6">
          <p className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1">
            BetterSanPedro.ph build status
          </p>
          <h2 className="text-xl font-black text-gray-900">
            A transparent, source-first launch
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            We publish what can be verified and clearly label what still needs local review.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUS_ITEMS.map(({ icon: Icon, tone, title, description, href, linkLabel }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-4 ${tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-gray-900 text-sm mb-2">{title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">{description}</p>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-700 hover:text-primary-900"
              >
                {linkLabel}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
