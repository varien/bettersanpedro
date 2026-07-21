import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Menu, ChevronDown, Phone, Thermometer, Clock } from 'lucide-react';
import { mainNavigation } from '../../data/navigation';
import type { LanguageType } from '../../types/index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';

function formatDatetime(): string {
  const now = new Date();
  const date = now.toLocaleDateString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Asia/Manila',
  });
  const time = now.toLocaleTimeString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Manila',
  });
  return `${date} · ${time} PHT`;
}

const HOTLINES: Array<{
  labelKey: string;
  number: string;
  tel: string;
}> = [];

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const location = useLocation();

  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const scrollYRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // ── Info bar state ─────────────────────────────────────────────
  const CURRENCIES = ['USD', 'EUR', 'JPY', 'GBP', 'SGD'] as const;
  const CURRENCY_SYMBOLS: Record<string, string> = {
    USD: '$',
    EUR: '€',
    JPY: '¥',
    GBP: '£',
    SGD: 'S$',
  };
  const [rates, setRates] = useState<Record<string, string>>({});
  const [currencyIdx, setCurrencyIdx] = useState(0);
  const [forexVisible, setForexVisible] = useState(true);
  const [temp, setTemp] = useState('--');
  const [datetime, setDatetime] = useState(formatDatetime());

  const activeCurrency = CURRENCIES[currencyIdx];
  const forexDisplay = rates[activeCurrency]
    ? `${CURRENCY_SYMBOLS[activeCurrency]}1 ${activeCurrency} = ₱${rates[activeCurrency]}`
    : `1 ${activeCurrency} = ₱--`;

  useEffect(() => {
    const timer = setInterval(() => setDatetime(formatDatetime()), 60_000);

    const cached = localStorage.getItem('bi_rates');
    const cachedTime = localStorage.getItem('bi_rates_time');
    if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3_600_000) {
      setRates(JSON.parse(cached));
    } else {
      fetch('https://open.er-api.com/v6/latest/PHP')
        .then(r => r.json())
        .then(data => {
          if (data?.rates) {
            const phpRates = data.rates as Record<string, number>;
            const computed: Record<string, string> = {};
            for (const cur of ['USD', 'EUR', 'JPY', 'GBP', 'SGD']) {
              if (phpRates[cur]) {
                computed[cur] = (1 / phpRates[cur]).toFixed(2);
              }
            }
            localStorage.setItem('bi_rates', JSON.stringify(computed));
            localStorage.setItem('bi_rates_time', String(Date.now()));
            setRates(computed);
          }
        })
        .catch(() => {});
    }

    const currencyTimer = setInterval(() => {
      setForexVisible(false);
      setTimeout(() => {
        setCurrencyIdx(i => (i + 1) % CURRENCIES.length);
        setForexVisible(true);
      }, 300);
    }, 3_000);

    const cachedTemp = localStorage.getItem('bi_temp');
    const cachedTempTime = localStorage.getItem('bi_temp_time');
    if (
      cachedTemp &&
      cachedTempTime &&
      Date.now() - parseInt(cachedTempTime) < 1_800_000
    ) {
      setTemp(cachedTemp);
    } else {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=14.35&longitude=121.05&current_weather=true'
      )
        .then(r => r.json())
        .then(data => {
          if (data?.current_weather?.temperature !== undefined) {
            const t = `${Math.round(data.current_weather.temperature)}°C`;
            localStorage.setItem('bi_temp', t);
            localStorage.setItem('bi_temp_time', String(Date.now()));
            setTemp(t);
          }
        })
        .catch(() => {});
    }

    return () => {
      clearInterval(timer);
      clearInterval(currencyTimer);
    };
  }, []);

  // ── Body scroll lock (BetterSolano pattern) ────────────────────
  const lockBodyScroll = useCallback(() => {
    scrollYRef.current = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = '100%';
  }, []);

  const unlockBodyScroll = useCallback(() => {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollYRef.current);
  }, []);

  const closeMenu = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    unlockBodyScroll();
    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 320);
  }, [unlockBodyScroll]);

  // Close on route change
  useEffect(() => {
    isAnimatingRef.current = false;
    closeMenu();
  }, [location.pathname, closeMenu]);

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        navRef.current &&
        !navRef.current.contains(target) &&
        toggleRef.current &&
        !toggleRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileMenuOpen, closeMenu]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [mobileMenuOpen, closeMenu]);

  // Close on resize to desktop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (window.innerWidth >= 1024 && mobileMenuOpen) {
          isAnimatingRef.current = false;
          closeMenu();
        }
      }, 150);
    };
    window.addEventListener('resize', handler);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handler);
    };
  }, [mobileMenuOpen, closeMenu]);

  const changeLanguage = (lang: LanguageType) => {
    i18n.changeLanguage(lang);
  };

  const isActive = (href: string) =>
    href === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(href);

  const handleContactClick = (e: React.MouseEvent, href: string) => {
    if (href === '/#contact') {
      e.preventDefault();
      if (location.pathname === '/') {
        document
          .getElementById('contact')
          ?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(
          () =>
            document
              .getElementById('contact')
              ?.scrollIntoView({ behavior: 'smooth' }),
          300
        );
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* ── Emergency Hotlines Bar ─────────────────────────── */}
      <div className="bg-red-600 text-white overflow-x-auto whitespace-nowrap">
        <div className="flex items-center px-6 py-2.5 min-w-max mx-auto gap-1">
          <Phone className="h-3.5 w-3.5 mr-3 shrink-0 opacity-90" />
          <span className="text-xs font-bold uppercase tracking-wide opacity-80 mr-3">
            {t('navbar.emergencyHotlines', 'Emergency Hotlines')}
          </span>
          {HOTLINES.length > 0 ? (
            HOTLINES.map((h, i) => (
              <React.Fragment key={h.labelKey}>
                <a
                  href={`tel:${h.tel}`}
                  className="hover:underline transition-opacity hover:opacity-80 px-4 py-1 text-xs"
                >
                  <span className="font-bold">{t(h.labelKey)}:</span>{' '}
                  <span className="opacity-90">{h.number}</span>
                </a>
                {i < HOTLINES.length - 1 && (
                  <span className="opacity-30 select-none mx-0.5">|</span>
                )}
              </React.Fragment>
            ))
          ) : (
            <span className="text-xs opacity-90">
              Emergency contacts pending verification
            </span>
          )}
        </div>
      </div>

      {/* ── Info Bar ──────────────────────────────────────── */}
      <div className="bg-primary-900 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-end gap-6">
          <span className="flex items-center gap-1.5 opacity-90">
            <span
              className="font-semibold transition-opacity duration-300"
              style={{ opacity: forexVisible ? 1 : 0 }}
            >
              {forexDisplay}
            </span>
          </span>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <span className="hidden sm:flex items-center gap-1.5 opacity-90">
            <Thermometer className="h-3 w-3 opacity-70" />
            <span className="text-gray-300">San Pedro</span>
            <span className="font-semibold">{temp}</span>
          </span>
          <span className="text-gray-600 hidden sm:inline">|</span>
          <span className="hidden md:flex items-center gap-1.5 opacity-90">
            <Clock className="h-3 w-3 opacity-70" />
            <span className="font-semibold">{datetime}</span>
          </span>
        </div>
      </div>

      {/* ── Main Navbar ───────────────────────────────────── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="shrink-0" aria-label="BetterSanPedro.ph home">
              <img
                src="/branding/better-san-pedro-arch-key-sampaguita-concept-v3.png"
                alt="Better San Pedro"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNavigation.map(item => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(item.href)
                            ? 'text-primary-700 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                        }`}
                        aria-haspopup="true"
                        aria-expanded={false}
                      >
                        {t(
                          item.labelKey || `navbar.${item.label.toLowerCase()}`,
                          item.label
                        )}
                        <ChevronDown className="h-3.5 w-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                      </button>
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                        <div className="py-1">
                          {item.children.map(child =>
                            child.href.startsWith('http') ? (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              >
                                {t(
                                  child.labelKey ||
                                    `navbar.${child.label.toLowerCase()}`,
                                  child.label
                                )}
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                              >
                                {t(
                                  child.labelKey ||
                                    `navbar.${child.label.toLowerCase()}`,
                                  child.label
                                )}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={e => handleContactClick(e, item.href)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50'
                      }`}
                    >
                      {t(
                        item.labelKey || `navbar.${item.label.toLowerCase()}`,
                        item.label
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Right: Language + hamburger */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center border border-gray-200 rounded-md overflow-hidden">
                {(['en', 'fil'] as LanguageType[]).map((lang, idx) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-label={`Switch to ${lang === 'en' ? 'English' : 'Filipino'}`}
                    className={`px-3 py-1.5 text-xs font-bold uppercase transition-colors ${
                      i18n.language === lang
                        ? 'bg-primary-700 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    } ${idx === 0 ? '' : 'border-l border-gray-200'}`}
                  >
                    {lang === 'en' ? 'EN' : 'FIL'}
                  </button>
                ))}
              </div>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => {
                  if (isAnimatingRef.current) return;
                  if (mobileMenuOpen) {
                    closeMenu();
                  } else {
                    isAnimatingRef.current = true;
                    setMobileMenuOpen(true);
                    lockBodyScroll();
                    setTimeout(() => {
                      isAnimatingRef.current = false;
                    }, 320);
                  }
                }}
                className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Toggle navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={navRef}
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {mainNavigation.map(item => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenDropdown(prev =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className="w-full flex justify-between items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                        aria-haspopup="true"
                        aria-expanded={openDropdown === item.label}
                      >
                        {t(
                          item.labelKey || `navbar.${item.label.toLowerCase()}`,
                          item.label
                        )}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openDropdown === item.label && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.children.map(child =>
                            child.href.startsWith('http') ? (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-md"
                              >
                                {t(
                                  child.labelKey ||
                                    `navbar.${child.label.toLowerCase()}`,
                                  child.label
                                )}
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-md"
                              >
                                {t(
                                  child.labelKey ||
                                    `navbar.${child.label.toLowerCase()}`,
                                  child.label
                                )}
                              </Link>
                            )
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={e => handleContactClick(e, item.href)}
                      className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {t(
                        item.labelKey || `navbar.${item.label.toLowerCase()}`,
                        item.label
                      )}
                    </Link>
                  )}
                </div>
              ))}

              {/* Language toggle in mobile menu */}
              <div className="pt-2 border-t border-gray-100 flex gap-2">
                {(['en', 'fil'] as LanguageType[]).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => changeLanguage(lang)}
                    aria-label={`Switch to ${lang === 'en' ? 'English' : 'Filipino'}`}
                    className={`px-4 py-1.5 text-xs font-bold uppercase rounded border transition-colors ${
                      i18n.language === lang
                        ? 'bg-primary-700 text-white border-primary-700'
                        : 'bg-white text-gray-600 border-gray-300'
                    }`}
                  >
                    {lang === 'en' ? 'EN' : 'FIL'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
