import React from 'react';
import { ExternalLink, Box, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

const QUICK_LINKS = [
  { label: 'About the Portal', labelKey: 'footer.about', href: '/about' },
  { label: 'Sitemap', labelKey: 'footer.sitemap', href: '/sitemap' },
  {
    label: 'Accessibility',
    labelKey: 'footer.accessibility',
    href: '/accessibility',
  },
  {
    label: 'Community Discord',
    labelKey: 'footer.discord',
    href: 'https://discord.gg/',
    external: true,
  },
  { label: 'Contact Us', labelKey: 'footer.contactUs', href: '/about' },
];

const RESOURCE_LINKS = [
  {
    label: 'Official San Pedro City Website',
    labelKey: 'footer.officialWebsite',
    href: 'https://cityofsanpedrolaguna.gov.ph/',
    external: true,
  },
  {
    label: 'Open Data',
    labelKey: 'footer.openData',
    href: 'https://data.gov.ph',
    external: true,
  },
  {
    label: 'Freedom of Information',
    labelKey: 'footer.foi',
    href: 'https://www.foi.gov.ph',
    external: true,
  },
  {
    label: 'Sangguniang Panlungsod',
    labelKey: 'footer.sangguniangBayan',
    href: '/legislative',
  },
  {
    label: 'DILG Full Disclosure',
    labelKey: 'footer.dilgDisclosure',
    href: 'https://fdp.dilg.gov.ph',
    external: true,
  },
  {
    label: 'DTI CMCI',
    labelKey: 'footer.dtiCmci',
    href: 'https://cmci.dti.gov.ph',
    external: true,
  },
  {
    label: 'BLGF',
    labelKey: 'footer.blgf',
    href: 'https://blgf.gov.ph',
    external: true,
  },
];

const Footer: React.FC = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div>
            <Link to="/" className="inline-flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-black tracking-tight text-white">
                Better
              </span>
              <span className="text-2xl font-black tracking-tight text-cyan-300">
                SanPedro
              </span>
              <span className="text-sm font-bold text-amber-300">.ph</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              {t(
                'hero.subtitle',
                'A community-run civic portal for San Pedro, Laguna.'
              )}
            </p>
            <p className="text-gray-500 text-xs">
              Community links will be added after verification.
            </p>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
              {t('footer.quickLinks', 'Quick Links')}
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(link =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey, link.label)}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey, link.label)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 3 — Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-300 mb-4">
              {t('footer.resources', 'Resources')}
            </h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map(link =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey, link.label)}
                      <ExternalLink className="h-3 w-3 opacity-50" />
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {t(link.labelKey, link.label)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 4 — Cost / Contribute */}
          <div>
            <div
              className="inline-flex items-baseline gap-2 bg-green-900/40 border border-green-700/50 rounded-xl px-4 py-3 mb-5"
              role="status"
              aria-label={t(
                'footer.costTitle',
                'Cost to the People of San Pedro'
              )}
            >
              <span className="text-sm text-green-300 font-medium">
                {t('footer.costTitle', 'Cost to the People of San Pedro')}
              </span>
              <span className="text-2xl font-black text-green-400">₱0</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <a
                href="https://lgu.bettergov.ph/GUIDE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 hover:bg-primary-700 hover:text-white text-sm font-semibold transition-colors"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                {t('footer.volunteer', 'Volunteer with Us')}
              </a>
              <a
                href="https://cityofsanpedrolaguna.gov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white text-sm font-semibold transition-colors"
              >
                <ExternalLink className="h-4 w-4 shrink-0" />
                {t('footer.contribute', 'Contribute at GitHub')}
              </a>
            </div>
            <a
              href="https://websitecarbon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex text-xs text-gray-500 hover:text-gray-300"
            >
              Learn about website sustainability
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-500">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href="https://bettergov.ph"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/bettergov-footer.svg"
                  alt="BetterGov.ph"
                  className="h-8 w-auto object-contain"
                />
              </a>
              <span>&copy; {currentYear} BetterSanPedro.ph</span>
              <span className="hidden sm:inline text-gray-700">·</span>
              {/* <span className="bg-gray-800 text-gray-400 px-2 py-0.5 rounded font-mono">
                <a
                  href="https://creativecommons.org/publicdomain/zero/1.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  CC0 1.0 Universal License{' '}
                </a>
              </span>
              <span className="hidden sm:inline text-gray-700">·</span> */}
              <span className="text-gray-600">
                {t('footer.notOfficial', 'Not an official government website.')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-gray-600">
              <Heart className="h-3.5 w-3.5" />
              <span className="font-mono">
                {t('footer.builtByCommunity', 'Built by the community')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-gray-600">
              <Box className="h-3.5 w-3.5" />
              <span className="font-mono">v0.1.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
