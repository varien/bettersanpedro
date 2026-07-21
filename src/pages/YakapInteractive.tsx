import { ExternalLink, HeartPulse, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import { useTranslation } from '../hooks/useTranslation';

const YAKAP_URL = 'https://www.philhealth.gov.ph/yakap/';
const CITY_URL = 'https://cityofsanpedrolaguna.gov.ph/';

export default function YakapInteractive() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <>
      <SEO title="PhilHealth YAKAP" description="Information and official links for PhilHealth YAKAP in San Pedro, Laguna." keywords="PhilHealth YAKAP, San Pedro Laguna, primary care" />
      <main className="flex-grow">
        <section className="relative overflow-hidden bg-[#003087] py-16 text-white" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6"><HeartPulse className="mb-4 h-10 w-10 text-emerald-300" /><p className="text-sm font-bold uppercase tracking-widest text-blue-200">PhilHealth</p><h1 className="mt-2 text-4xl font-black sm:text-5xl">YAKAP</h1><p className="mt-3 max-w-2xl text-lg text-blue-100">{isFil ? 'Gabay sa pagtingin ng opisyal na impormasyon at pagkumpirma ng serbisyo sa inyong primary care facility.' : 'A guide to official information and confirming services with your primary care facility.'}</p></div>
        </section>
        <section className="mx-auto grid max-w-5xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"><h2 className="text-xl font-black text-gray-900">{isFil ? 'Kumpirmahin muna ang serbisyo' : 'Confirm services first'}</h2><p className="mt-3 leading-relaxed text-gray-600">{isFil ? 'Ang availability ng primary care, laboratoryo, gamot, at referral ay maaaring magbago ayon sa pasilidad at inyong membership. Gumamit ng opisyal na PhilHealth source at makipag-ugnayan sa napili ninyong pasilidad bago bumisita.' : 'Availability of primary care, laboratory services, medicines, and referrals can vary by facility and membership. Use the official PhilHealth source and contact your chosen facility before visiting.'}</p><a href={YAKAP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 font-bold text-primary-700 hover:underline">{isFil ? 'Buksan ang PhilHealth YAKAP' : 'Open PhilHealth YAKAP'} <ExternalLink className="h-4 w-4" /></a></article>
          <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm"><MapPin className="h-8 w-8 text-primary-700" /><h2 className="mt-3 text-xl font-black text-gray-900">{isFil ? 'Impormasyon para sa San Pedro' : 'San Pedro information'}</h2><p className="mt-3 leading-relaxed text-gray-600">{isFil ? 'Sinusuri pa ang mga lokal na YAKAP provider at contact point para sa San Pedro. Hindi maglalathala ang portal ng hindi beripikadong facility o numero.' : 'Local YAKAP providers and contact points for San Pedro are still under verification. The portal will not publish an unverified facility or phone number.'}</p><a href={CITY_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 font-bold text-primary-700 hover:underline">{isFil ? 'Buksan ang opisyal na website ng lungsod' : 'Open the official city website'} <ExternalLink className="h-4 w-4" /></a></article>
        </section>
      </main>
    </>
  );
}
