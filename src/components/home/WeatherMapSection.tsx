import { useState, useEffect } from 'react';
import {
  Wind,
  Thermometer,
  Cloud,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useScrollReveal } from '../../hooks/useScrollReveal';

interface WeatherData {
  temp: number;
  windspeed: number;
  weathercode: number;
}

function getWeatherLabel(code: number, t: (k: string) => string): string {
  if (code === 0) return t('weatherMap.clear') || 'Clear sky';
  if (code <= 3) return t('weatherMap.partlyCloudy') || 'Partly cloudy';
  if (code <= 48) return t('weatherMap.foggy') || 'Foggy';
  if (code <= 67) return t('weatherMap.rainy') || 'Rainy';
  if (code <= 82) return t('weatherMap.showers') || 'Showers';
  if (code <= 99) return t('weatherMap.thunderstorm') || 'Thunderstorm';
  return t('weatherMap.defaultCondition');
}

export default function WeatherMapSection() {
  const { t } = useTranslation('common');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const ref = useScrollReveal<HTMLElement>();

  useEffect(() => {
    const cached = localStorage.getItem('bi_weather_full');
    const cachedTime = localStorage.getItem('bi_weather_full_time');
    const THIRTY_MIN = 1_800_000;

    if (
      cached &&
      cachedTime &&
      Date.now() - parseInt(cachedTime) < THIRTY_MIN
    ) {
      setWeather(JSON.parse(cached));
      return;
    }

    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=14.35&longitude=121.05&current_weather=true&timezone=Asia%2FManila'
    )
      .then(r => r.json())
      .then(data => {
        if (data?.current_weather) {
          const w: WeatherData = {
            temp: Math.round(data.current_weather.temperature),
            windspeed: Math.round(data.current_weather.windspeed),
            weathercode: data.current_weather.weathercode,
          };
          localStorage.setItem('bi_weather_full', JSON.stringify(w));
          localStorage.setItem('bi_weather_full_time', String(Date.now()));
          setWeather(w);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      ref={ref}
      className="reveal bg-white py-12 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Navigation className="h-4 w-4 text-primary-600" />
              <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">
                Plan Your Visit
              </span>
            </div>
            <h2 className="text-xl font-black text-gray-900">
              Getting to San Pedro
            </h2>
          </div>
          <a
            href="https://maps.google.com/?q=San+Pedro+City+Hall+Laguna"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors shrink-0"
          >
            Open in Google Maps
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="bg-primary-700 rounded-2xl p-5 text-white">
              <p className="text-blue-200 text-xs font-semibold mb-1 uppercase tracking-wide">
                Current conditions · San Pedro, Laguna
              </p>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-black leading-none">
                  {weather ? `${weather.temp}°` : '27°'}
                </span>
                <span className="text-xl font-semibold text-blue-200 pb-1">
                  C
                </span>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-4">
                {weather
                  ? getWeatherLabel(weather.weathercode, t)
                  : t('weatherMap.defaultCondition')}
              </p>
              <div className="flex gap-5 pt-3 border-t border-white/20">
                <span className="flex items-center gap-1.5 text-xs text-blue-100">
                  <Wind className="h-3.5 w-3.5 opacity-70" />
                  {weather ? `${weather.windspeed} km/h wind` : '-- km/h wind'}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-blue-100">
                  <Thermometer className="h-3.5 w-3.5 opacity-70" />
                  Tropical climate
                </span>
              </div>
              {!weather && (
                <div className="mt-2 flex items-center gap-1.5 text-blue-200 text-xs">
                  <Cloud className="h-3 w-3 animate-pulse" />
                  Fetching live data…
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                City Hall location
              </p>
              <p className="text-sm font-bold text-gray-900">
                New City Hall Building
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Brgy. Poblacion, City of San Pedro, Laguna
              </p>
              <a
                href="https://cityofsanpedrolaguna.gov.ph/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-primary-700 hover:text-primary-900"
              >
                Verify on the official city website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm min-h-[300px]">
            <iframe
              title="Map of San Pedro, Laguna"
              src="https://www.openstreetmap.org/export/embed.html?bbox=120.99%2C14.30%2C121.11%2C14.39&layer=mapnik&marker=14.35%2C121.05"
              className="w-full h-full min-h-[300px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
