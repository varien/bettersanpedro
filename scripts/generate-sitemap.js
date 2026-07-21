// Generates public/sitemap.xml from YAML/JSON content sources.
// Run via `npm run generate-sitemap` or automatically as part of `npm run build`.

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SITE_URL =
  process.env.VITE_WEBSITE_URL?.replace(/\/$/, '') ||
  'https://bettersanpedro.ph';

function readYaml(path) {
  return yaml.load(readFileSync(path, 'utf8'));
}

function url(path, priority, changefreq = 'weekly') {
  return { loc: `${SITE_URL}${path}`, priority, changefreq };
}

const urls = [];

// Static routes
urls.push(url('/', '1.0', 'weekly'));
urls.push(url('/services', '0.9', 'weekly'));
urls.push(url('/government', '0.9', 'weekly'));
urls.push(url('/tourism', '0.9', 'weekly'));
urls.push(url('/statistics', '0.7', 'monthly'));
urls.push(url('/transparency', '0.7', 'monthly'));
urls.push(url('/sitemap', '0.5', 'monthly'));

// Services
const servicesData = readYaml(join(ROOT, 'src/data/services.yaml'));
for (const cat of servicesData.categories) {
  urls.push(url(`/services/${cat.slug}`, '0.8', 'weekly'));
  const indexPath = join(ROOT, `content/services/${cat.slug}/index.yaml`);
  if (existsSync(indexPath)) {
    const index = readYaml(indexPath);
    for (const page of index.pages ?? []) {
      urls.push(url(`/services/${cat.slug}/${page.slug}`, '0.7', 'monthly'));
    }
  }
}

// Government
const govData = readYaml(join(ROOT, 'src/data/government.yaml'));
for (const cat of govData.categories) {
  urls.push(url(`/government/${cat.slug}`, '0.8', 'weekly'));
  const indexPath = join(ROOT, `content/government/${cat.slug}/index.yaml`);
  if (existsSync(indexPath)) {
    const index = readYaml(indexPath);
    for (const page of index.pages ?? []) {
      if (page.slug) {
        urls.push(
          url(`/government/${cat.slug}/${page.slug}`, '0.7', 'monthly')
        );
      }
    }
  }
}
// Dedicated government routes
urls.push(url('/government/departments/executive', '0.8', 'monthly'));
urls.push(url('/government/departments/officials', '0.8', 'monthly'));
urls.push(url('/government/legislative', '0.7', 'monthly'));

// Tourism categories are intentionally excluded until the San Pedro directory
// has verified local data.

// Deduplicate
const seen = new Set();
const unique = urls.filter(u => {
  if (seen.has(u.loc)) return false;
  seen.add(u.loc);
  return true;
});

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = join(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`sitemap.xml written — ${unique.length} URLs`);
