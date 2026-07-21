import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Compass,
  ExternalLink,
  Filter,
  Landmark,
  MapPin,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

type TourismStatus = 'official' | 'archive' | 'candidate';

type TourismSource = {
  label: string;
  url: string;
};

type TourismAttraction = {
  id: string;
  name: string;
  category: string;
  location: string;
  status: TourismStatus;
  featured?: boolean;
  description: string;
  filipinoDescription: string;
  sources: TourismSource[];
  mapQuery?: string;
};

const ATTRACTIONS: TourismAttraction[] = [
  {
    id: 'sampaguita-festival',
    name: 'Sampaguita Festival',
    category: 'Festivals and events',
    location: 'Citywide; venues vary by edition',
    status: 'archive',
    featured: true,
    description:
      "San Pedro's signature citywide celebration connects sampaguita, community, culture, trade fairs, parades, and the Hiyas ng San Pedro program. Current dates are published only when a new official schedule is available.",
    filipinoDescription:
      'Ang pangunahing pagdiriwang ng San Pedro ay nag-uugnay sa sampaguita, komunidad, kultura, trade fair, parada, at Hiyas ng San Pedro. Ilalathala lamang ang bagong petsa kapag may kasalukuyang opisyal na schedule.',
    sources: [
      {
        label: 'Senate festival records',
        url: 'https://issuances-library.senate.gov.ph/subject/sampaguita-festival',
      },
      {
        label: 'DTI-Laguna festival coverage',
        url: 'https://www.dti.gov.ph/tag/dti-laguna/page/2/',
      },
      {
        label: 'BLGF Region IV-A festival list',
        url: 'https://blgf.gov.ph/regional-offices/region-4a/',
      },
    ],
    mapQuery: 'San Pedro City Plaza Laguna',
  },
  {
    id: 'lolo-uweng',
    name: 'Lolo Uweng Shrine',
    category: 'Heritage and faith',
    location: 'Brgy. Landayan',
    status: 'candidate',
    featured: true,
    description:
      'The Diocesan Shrine of Jesus in the Holy Sepulchre, known locally as Lolo Uweng, is identified in a national infrastructure reference as a major religious and cultural draw. Shrine access, hours, and visitor guidance need confirmation from the parish.',
    filipinoDescription:
      'Ang Diocesan Shrine of Jesus in the Holy Sepulchre, na kilala bilang Lolo Uweng, ay tinukoy sa pambansang reference bilang mahalagang religious at cultural destination. Kailangan pa ng kumpirmasyon ng parokya para sa oras at gabay sa pagbisita.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
      {
        label: 'Secondary visitor reference',
        url: 'https://en.wikivoyage.org/wiki/San_Pedro_%28Laguna%29',
      },
    ],
    mapQuery: 'Lolo Uweng Shrine Landayan San Pedro Laguna',
  },
  {
    id: 'san-pedro-apostol',
    name: 'San Pedro Apostol Parish Church',
    category: 'Heritage and faith',
    location: 'Brgy. Poblacion',
    status: 'candidate',
    featured: true,
    description:
      'The parish church near the city center is a potential heritage and civic-life stop. Current visiting information and any heritage designation should be confirmed with the parish or diocese before publication as a formal attraction.',
    filipinoDescription:
      'Ang parokya malapit sa sentro ng lungsod ay maaaring maging heritage at civic-life stop. Kailangang kumpirmahin sa parokya o diyosesis ang kasalukuyang visiting information at heritage designation.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
      {
        label: 'Secondary visitor reference',
        url: 'https://en.wikivoyage.org/wiki/San_Pedro_%28Laguna%29',
      },
    ],
    mapQuery: 'San Pedro Apostol Parish Church Laguna',
  },
  {
    id: 'laurel-museum',
    name: 'Laurel Museum and Garden',
    category: 'Heritage and culture',
    location: 'San Pedro, Laguna; exact visitor details to confirm',
    status: 'candidate',
    featured: true,
    description:
      'A museum and garden connected with the Laurel family and local historical memory. Published visitor information is limited, so opening status, ownership, and access must be confirmed before a visitor itinerary is promoted.',
    filipinoDescription:
      'Isang museo at hardin na konektado sa pamilyang Laurel at lokal na memoryang pangkasaysayan. Limitado ang kasalukuyang visitor information kaya kailangang kumpirmahin muna ang access at opening status.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
      {
        label: 'Secondary museum reference',
        url: 'https://www.celerhinaaubrey.com/2016/07/a-visit-at-laurels-garden-and-museum.html',
      },
    ],
    mapQuery: "Laurel's Garden and Museum San Pedro Laguna",
  },
  {
    id: 'risen-christ-statue',
    name: 'Risen Christ Statue',
    category: 'Landmarks and public spaces',
    location: 'San Pedro / Laguna Lake area; exact location to confirm',
    status: 'candidate',
    featured: true,
    description:
      'A landmark identified in the DPWH tourism and development reference. The portal will publish exact location, access, and maintenance information only after a current city or site-owner confirmation.',
    filipinoDescription:
      'Isang landmark na tinukoy sa DPWH tourism at development reference. Ilalathala lamang ang eksaktong lokasyon, access, at maintenance information kapag may kasalukuyang kumpirmasyon.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
    ],
    mapQuery: 'Risen Christ Statue San Pedro Laguna',
  },
  {
    id: 'st-peter-statue',
    name: 'St. Peter the Apostle Statue',
    category: 'Landmarks and public spaces',
    location: 'Laguna Lake area; exact location to confirm',
    status: 'candidate',
    description:
      "A San Pedro landmark listed in the DPWH reference as part of the city's potential tourism circuit. Location, public access, and current condition require local verification.",
    filipinoDescription:
      'Isang San Pedro landmark na nakalista sa DPWH reference bilang bahagi ng maaaring tourism circuit ng lungsod. Kailangan pa ng lokal na verification para sa lokasyon, access, at kondisyon.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
    ],
    mapQuery: 'St Peter the Apostle Statue San Pedro Laguna',
  },
  {
    id: 'kc-filipinas',
    name: 'KC Filipinas Golf Club',
    category: 'Recreation',
    location: 'Brgy. San Antonio',
    status: 'candidate',
    featured: true,
    description:
      'A golf and recreation venue identified in tourism references. Current membership, visitor policies, fees, and operating details must come from the venue before the portal presents it as bookable.',
    filipinoDescription:
      'Isang golf at recreation venue na binanggit sa tourism references. Kailangan munang kunin sa venue ang kasalukuyang membership, visitor policy, bayad, at operating details.',
    sources: [
      {
        label: 'DPWH Laguna Lakeshore reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
      {
        label: 'Secondary visitor reference',
        url: 'https://en.wikivoyage.org/wiki/San_Pedro_%28Laguna%29',
      },
    ],
    mapQuery: 'KC Filipinas Golf Club San Pedro Laguna',
  },
  {
    id: 'laguna-lakeside-boat-club',
    name: 'Laguna Lakeside Boat Club',
    category: 'Recreation and sports',
    location: 'San Pedro lakeside area',
    status: 'official',
    featured: true,
    description:
      'A San Pedro-based dragon boat team and lakeside community whose 2025 national competition results were recognized by the City Government. This is a community and sports story, not a promise of public boat tours.',
    filipinoDescription:
      'Isang dragon boat team at lakeside community sa San Pedro na kinilala ng City Government dahil sa resulta nito sa 2025 national competition. Community at sports story ito, hindi pangako ng public boat tours.',
    sources: [
      {
        label: 'City Government recognition',
        url: 'https://cityofsanpedrolaguna.gov.ph/congratulations-laguna-lakeside-boat-club/',
      },
    ],
    mapQuery: 'Laguna Lakeside Boat Club San Pedro Laguna',
  },
  {
    id: 'sampaguita-local-life',
    name: 'Sampaguita and local products',
    category: 'Culture and local life',
    location: 'Citywide; producers and venues vary',
    status: 'candidate',
    featured: true,
    description:
      "Sampaguita growing, lei-making, native food, and older local industries are part of San Pedro's tourism story. The portal will add producer profiles only after direct confirmation and consent.",
    filipinoDescription:
      'Bahagi ng tourism story ng San Pedro ang sampaguita, paggawa ng garland, pagkaing lokal, at mga dating industriya. Magdadagdag lamang ng producer profile kapag may direktang kumpirmasyon at pahintulot.',
    sources: [
      {
        label: 'DPWH tourism and development reference',
        url: 'https://www.dpwh.gov.ph/dpwh/sites/default/files/references/part_iii.pdf',
      },
      {
        label: 'DTI-Laguna festival coverage',
        url: 'https://www.dti.gov.ph/tag/dti-laguna/page/2/',
      },
    ],
    mapQuery: 'Sampaguita San Pedro Laguna',
  },
  {
    id: 'tcao',
    name: 'Tourism, Culture and Arts Office',
    category: 'Official tourism information',
    location: 'City Hall Building, Brgy. Poblacion',
    status: 'official',
    description:
      "The official city office responsible for tourism, culture, and arts programs. Its Citizen's Charter is the first place to verify city-led activities and transactions.",
    filipinoDescription:
      "Ang opisyal na tanggapan ng lungsod para sa turismo, kultura, at sining. Ang Citizen's Charter nito ang unang sanggunian para sa city-led activities at transactions.",
    sources: [
      {
        label: "TCAO Citizen's Charter 2025",
        url: 'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_tcao25.pdf',
      },
    ],
    mapQuery: 'San Pedro City Hall Laguna',
  },
  {
    id: 'cultural-mapping',
    name: 'San Pedro Cultural Mapping Project',
    category: 'Culture and local life',
    location: 'Barangays across San Pedro',
    status: 'archive',
    description:
      'An official city cultural-mapping reference that can help grow this directory beyond landmark listings and toward barangay stories, practices, and heritage assets.',
    filipinoDescription:
      'Isang opisyal na cultural-mapping reference ng lungsod na maaaring maging batayan para sa mga kuwento, gawain, at heritage asset ng bawat barangay.',
    sources: [
      {
        label: 'City cultural mapping update',
        url: 'https://cityofsanpedrolaguna.gov.ph/category/news-and-releases/page/102/',
      },
    ],
  },
];

const FILTERS = [
  'All highlights',
  'Festivals and events',
  'Heritage and faith',
  'Heritage and culture',
  'Landmarks and public spaces',
  'Recreation',
  'Recreation and sports',
  'Culture and local life',
  'Official tourism information',
];

const STATUS_LABELS: Record<
  TourismStatus,
  { en: string; fil: string; className: string }
> = {
  official: {
    en: 'Official source',
    fil: 'Opisyal na source',
    className: 'bg-green-50 text-green-800 ring-green-200',
  },
  archive: {
    en: 'Historical / archived',
    fil: 'Pangkasaysayan / archive',
    className: 'bg-amber-50 text-amber-800 ring-amber-200',
  },
  candidate: {
    en: 'Research lead - verify',
    fil: 'Research lead - beripikahin',
    className: 'bg-blue-50 text-blue-800 ring-blue-200',
  },
};

function AttractionCard({
  attraction,
  isFil,
}: {
  attraction: TourismAttraction;
  isFil: boolean;
}) {
  const status = STATUS_LABELS[attraction.status];
  const description = isFil
    ? attraction.filipinoDescription
    : attraction.description;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative flex min-h-32 items-end bg-gradient-to-br from-primary-800 via-primary-700 to-cyan-700 p-5 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:18px_18px]" />
        <MapPin className="absolute right-5 top-5 h-8 w-8 text-cyan-100" />
        <div className="relative">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-100">
            {attraction.category}
          </span>
          <h3 className="mt-2 text-xl font-black">{attraction.name}</h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${status.className}`}
        >
          {isFil ? status.fil : status.en}
        </span>
        <p className="mt-3 flex items-start gap-1.5 text-xs font-semibold text-gray-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {attraction.location}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
          {description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {attraction.sources.map(source => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary-700 hover:underline"
            >
              {source.label} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ))}
          {attraction.mapQuery && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-gray-600 hover:underline"
            >
              {isFil ? 'Hanapin sa mapa' : 'Find on map'}{' '}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Tourism() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const [activeFilter, setActiveFilter] = useState('All highlights');
  const [query, setQuery] = useState('');

  const filteredAttractions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return ATTRACTIONS.filter(attraction => {
      const matchesFilter =
        activeFilter === 'All highlights' ||
        attraction.category === activeFilter;
      const searchable =
        `${attraction.name} ${attraction.category} ${attraction.location} ${attraction.description}`.toLowerCase();
      return (
        matchesFilter &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [activeFilter, query]);

  const featuredAttractions = ATTRACTIONS.filter(
    attraction => attraction.featured
  );

  return (
    <>
      <SEO
        title={isFil ? 'Turismo' : 'Tourism'}
        description="A source-backed guide to attractions, festivals, heritage, and local culture in San Pedro, Laguna."
        keywords="San Pedro Laguna tourism, Sampaguita Festival, Lolo Uweng, heritage, culture, attractions"
      />
      <main className="flex-grow">
        <section
          className="relative overflow-hidden bg-[#003087] py-16 text-white"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-2 flex items-center gap-3 text-blue-200">
              <Compass className="h-7 w-7" />
              <span className="text-sm font-medium uppercase tracking-widest">
                San Pedro, Laguna
              </span>
            </div>
            <h1 className="text-4xl font-black sm:text-5xl">
              {isFil ? 'Mga Lugar, Kultura at Kaganapan' : 'Discover San Pedro'}
            </h1>
            <p className="mt-3 max-w-3xl text-lg text-blue-100">
              {isFil
                ? 'Tunay na panimulang guide sa mga landmark, festival, heritage, recreation, at lokal na buhay ng San Pedro.'
                : 'A real starting guide to San Pedro landmarks, festivals, heritage, recreation, and local life.'}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6 sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary-700">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {isFil ? 'May laman na ang guide' : 'Content-first guide'}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl font-black text-gray-900">
                  {isFil
                    ? 'Mga source-backed na highlight at research lead'
                    : 'Source-backed highlights and research leads'}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
                  {isFil
                    ? 'Hindi namin itinatago ang mga posibleng destinasyon. Makikita rito ang opisyal, archival, at candidate records na may malinaw na status para malaman kung ano ang kumpirmado at ano ang kailangan pang beripikahin.'
                    : 'Potential destinations are not hidden. This page shows official, archival, and candidate records with clear status labels so readers can see what is confirmed and what still needs verification.'}
                </p>
              </div>
              <a
                href="https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/cc_tcao25.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary-700 px-5 py-3 text-sm font-bold text-white hover:bg-primary-800"
              >
                {isFil ? 'TCAO Charter' : 'Open TCAO Charter'}{' '}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary-700">
                {isFil ? 'Mga tampok' : 'Featured'}
              </p>
              <h2 className="mt-1 text-3xl font-black text-gray-900">
                {isFil
                  ? 'Mga Highlight ng San Pedro'
                  : 'Featured City Highlights'}
              </h2>
            </div>
            <p className="max-w-md text-sm text-gray-600">
              {isFil
                ? 'May source link ang bawat card; ang candidate ay hindi nangangahulugang kumpirmado na ang access o schedule.'
                : 'Every card has a source link; a candidate record does not mean access or schedules are confirmed.'}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredAttractions.map(attraction => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                isFil={isFil}
              />
            ))}
          </div>
        </section>

        <section className="border-y border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
              <div>
                <div className="flex items-center gap-2 text-primary-700">
                  <Filter className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {isFil ? 'Direktoryo' : 'Directory'}
                  </span>
                </div>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  {isFil
                    ? 'Hanapin ang gusto mong makita'
                    : 'Explore the directory'}
                </h2>
              </div>
              <label className="relative block w-full lg:max-w-sm">
                <span className="sr-only">
                  {isFil ? 'Maghanap ng attraction' : 'Search attractions'}
                </span>
                <Search className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder={isFil ? 'Maghanap...' : 'Search highlights...'}
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-primary-500 focus:ring-2"
                />
              </label>
            </div>
            <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
              {FILTERS.map(filter => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors ${activeFilter === filter ? 'bg-primary-700 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-primary-50'}`}
                >
                  {filter === 'All highlights' && isFil ? 'Lahat' : filter}
                </button>
              ))}
            </div>
            {filteredAttractions.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredAttractions.map(attraction => (
                  <AttractionCard
                    key={attraction.id}
                    attraction={attraction}
                    isFil={isFil}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <p className="font-bold text-gray-900">
                  {isFil
                    ? 'Walang nahanap na highlight.'
                    : 'No highlights found.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setActiveFilter('All highlights');
                  }}
                  className="mt-3 text-sm font-bold text-primary-700 hover:underline"
                >
                  {isFil ? 'I-clear ang filter' : 'Clear filters'}
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-2xl bg-[#003087] p-7 text-white sm:p-9">
              <div className="flex items-center gap-2 text-blue-200">
                <CalendarDays className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {isFil ? 'Festival spotlight' : 'Festival Spotlight'}
                </span>
              </div>
              <h2 className="mt-3 text-3xl font-black">Sampaguita Festival</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-blue-100">
                {isFil
                  ? 'Ang festival ay may cultural, sports, trade fair, parade, exhibit, social, at religious activities. Ang kasalukuyang schedule ay dapat kunin sa TCAO o City Government bago ibahagi.'
                  : 'Festival references describe cultural, sports, trade-fair, parade, exhibit, social, and religious activities. A current schedule should come from TCAO or the City Government before it is shared.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://issuances-library.senate.gov.ph/subject/sampaguita-festival"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-primary-800 hover:bg-blue-50"
                >
                  {isFil ? 'Senate record' : 'Senate record'}{' '}
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://www.dti.gov.ph/tag/dti-laguna/page/2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-blue-300 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-800"
                >
                  DTI-Laguna <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </article>
            <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
              <div className="flex items-center gap-2 text-primary-700">
                <Landmark className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  {isFil ? 'Paano ito binuo' : 'How this guide grows'}
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-black text-gray-900">
                {isFil ? 'Source, verify, publish' : 'Source, verify, publish'}
              </h2>
              <ol className="mt-4 space-y-4 text-sm leading-relaxed text-gray-700">
                <li className="flex gap-3">
                  <span className="font-black text-primary-700">01</span>
                  <span>
                    {isFil
                      ? 'Maghanap sa opisyal at responsible-owner sources.'
                      : 'Start with official and responsible-owner sources.'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-primary-700">02</span>
                  <span>
                    {isFil
                      ? 'I-label kung archive, official, o candidate.'
                      : 'Label each record as archived, official, or a candidate.'}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-black text-primary-700">03</span>
                  <span>
                    {isFil
                      ? 'Magdagdag ng hours, fees, at contact kapag kumpirmado na.'
                      : 'Add hours, fees, and contacts only after confirmation.'}
                  </span>
                </li>
              </ol>
            </article>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-gray-500">
            {isFil
              ? 'Huling sinuri: Hulyo 21, 2026. Ang mga candidate at archival record ay hindi garantiya ng kasalukuyang bukas, presyo, schedule, o accessibility. Beripikahin bago bumiyahe.'
              : 'Last researched: July 21, 2026. Candidate and archived records do not guarantee current opening hours, prices, schedules, or accessibility. Verify before travelling.'}
          </p>
        </section>
      </main>
    </>
  );
}
