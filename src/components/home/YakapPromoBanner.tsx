import { ArrowRight, ExternalLink, FlaskConical, Pill, ShieldCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const YAKAP_URL = 'https://www.philhealth.gov.ph/yakap/';

export default function YakapPromoBanner() {
  const { currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';

  return (
    <section className="mx-auto my-12 max-w-7xl px-4 sm:px-6">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center p-8 text-white shadow-2xl md:p-12"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,48,135,0.95) 40%, rgba(0,48,135,0.45) 100%), url("https://www.philhealth.gov.ph/yakap/images/YAKAPSubpage_WebsiteHero_v002.jpg")',
        }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-2xl text-center lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white/90 sm:text-xs">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              {isFil ? 'Pangangalagang Pangkalusugan para sa Lahat' : 'Health Care for All'}
            </div>
            <h2 className="mb-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              PhilHealth <span className="text-emerald-300">YAKAP</span>
            </h2>
            <p className="mb-6 text-sm font-medium leading-relaxed text-white/80 sm:text-base">
              {isFil
                ? 'Alamin ang tungkol sa PhilHealth YAKAP at kumpirmahin ang mga available na serbisyo sa inyong napiling primary care facility.'
                : 'Learn about PhilHealth YAKAP and confirm available services with your chosen primary care facility.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:gap-6 sm:text-sm lg:justify-start">
              <span className="flex items-center gap-2 font-semibold text-blue-100"><Stethoscope className="h-4 w-4 shrink-0 text-emerald-300" />{isFil ? 'Primary care' : 'Primary care'}</span>
              <span className="flex items-center gap-2 font-semibold text-blue-100"><FlaskConical className="h-4 w-4 shrink-0 text-emerald-300" />{isFil ? 'Mga serbisyong pangkalusugan' : 'Health services'}</span>
              <span className="flex items-center gap-2 font-semibold text-blue-100"><Pill className="h-4 w-4 shrink-0 text-emerald-300" />{isFil ? 'Mga benepisyo ng PhilHealth' : 'PhilHealth benefits'}</span>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto lg:flex-col">
            <Link to="/services/health-services/access-free-check-ups-labs-and-medicines-through-philhealth-yakap" className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-sm font-extrabold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:from-emerald-400 hover:to-emerald-500">
              {isFil ? 'Tingnan ang Impormasyon sa YAKAP' : 'View YAKAP Information'}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={YAKAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:border-white/40 hover:bg-white/10">
              {isFil ? 'Buksan ang PhilHealth YAKAP' : 'Open PhilHealth YAKAP'} <ExternalLink className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
