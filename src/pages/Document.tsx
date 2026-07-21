import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Banner } from '@bettergov/kapwa/banner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTranslation } from '../hooks/useTranslation';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { Card, CardContent, CardHeader } from '@bettergov/kapwa/card';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import SEO from '../components/SEO';

const CITY_URL = 'https://cityofsanpedrolaguna.gov.ph/';
const CHARTER_URL =
  'https://cityofsanpedrolaguna.gov.ph/wp-content/uploads/2025/05/San-Pedro-Citizens-Charter-2025-1st-EditionApr30_2025.pdf';

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType,
}: DocumentProps) {
  const { documentSlug, category } = useParams();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sourceGuide, setSourceGuide] = useState(false);
  const { currentLanguage, t } = useTranslation();
  const isFil = currentLanguage === 'fil';

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme(initialTheme)
  );

  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: isFil ? 'Tahanan' : 'Home', href: '/' },
  ]);

  useEffect(() => {
    if (!documentSlug || !category || !categoryType) {
      setError(isFil ? 'Walang tinukoy na dokumento' : 'No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        setSourceGuide(false);

        const isGovernment = categoryType === 'government';
        const categories = isGovernment
          ? governmentCategories.categories
          : serviceCategories.categories;
        const sectionLabel = isGovernment
          ? isFil
            ? 'Pamahalaan'
            : 'Government'
          : isFil
            ? 'Mga Serbisyo'
            : 'Services';
        const sectionHref = isGovernment ? '/government' : '/services';
        const categoryData = categories.find(c => c.slug === category);
        const categoryName = categoryData
          ? isGovernment
            ? t(
                `government.categories.${categoryData.slug}.name`,
                categoryData.category
              )
            : t(
                `services.categories.${categoryData.slug}.name`,
                categoryData.category
              )
          : category;

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          setBreadcrumbs([
            { label: isFil ? 'Tahanan' : 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryName ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.name`,
                    documentSlug
                  )
                : t(
                    `services.subcategories.${documentSlug}.name`,
                    documentSlug
                  ),
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        if (categoryType === 'service') {
          setSourceGuide(true);
          setBreadcrumbs([
            { label: isFil ? 'Tahanan' : 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryName ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: isFil ? 'Opisyal na sanggunian' : 'Official source guide',
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          category,
          categoryType,
          currentLanguage
        );
        setMarkdownContent(content);
        setBreadcrumbs([
          { label: isFil ? 'Tahanan' : 'Home', href: '/' },
          { label: sectionLabel, href: sectionHref },
          {
            label: categoryName ?? category,
            href: `${sectionHref}/${category}`,
          },
          {
            label: content.title ?? documentSlug,
            href: `${sectionHref}/${category}/${documentSlug}`,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : isFil
              ? 'Bigo sa pag-load ng dokumento'
              : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, categoryType, currentLanguage, isFil, t]);

  if (loading) {
    return (
      <Section className="p-3 mb-12">
        <Banner
          type="info"
          description={
            isFil ? 'Kinukuha ang dokumento...' : 'Loading document...'
          }
        />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Banner
          type="error"
          title={isFil ? 'Hindi Nahanap ang Dokumento' : 'Document Not Found'}
          description={error}
          icon
        />
      </Section>
    );
  }

  if (sourceGuide) {
    const title = isFil
      ? 'Opisyal na sanggunian ng serbisyo'
      : 'Official service source guide';
    return (
      <>
        <SEO
          title={title}
          description="Official San Pedro service sources."
          keywords={`${documentSlug}, San Pedro services, Citizen's Charter`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />
          <Card className="mb-8">
            <CardHeader>
              <Heading>{title}</Heading>
              <Text className="mt-3 text-gray-600">
                {isFil
                  ? 'Ang pahinang ito ay nag-uugnay sa kasalukuyang opisyal na source. Suriin ang charter para sa eksaktong kinakailangan, bayarin, oras, at responsible office bago makipagtransaksyon.'
                  : 'This page points to the current official source. Check the charter for exact requirements, fees, processing times, and responsible office before transacting.'}
              </Text>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={CHARTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-primary-700 px-4 py-2 text-sm font-bold text-white hover:bg-primary-800"
                >
                  {isFil
                    ? 'Buksan ang Citizen’s Charter 2025'
                    : 'Open Citizen’s Charter 2025'}
                </a>
                <a
                  href={CITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  {isFil ? 'Buksan ang city website' : 'Open city website'}
                </a>
              </div>
            </CardHeader>
          </Card>
        </Section>
      </>
    );
  }

  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages;
    const isGovernment = categoryType === 'government';
    return (
      <>
        <SEO
          title={documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" items={breadcrumbs} />
          {nestedIndex.title && (
            <Heading level={2}>
              {isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.name`,
                    nestedIndex.title
                  )
                : t(
                    `services.subcategories.${documentSlug}.name`,
                    nestedIndex.title
                  )}
            </Heading>
          )}
          {nestedIndex.description && (
            <Text className="text-gray-600 mb-4">
              {isGovernment
                ? t(
                    `government.subcategories.${documentSlug}.description`,
                    nestedIndex.description
                  )
                : t(
                    `services.subcategories.${documentSlug}.description`,
                    nestedIndex.description
                  )}
            </Text>
          )}
          {nestedIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nestedPages.map((page, i) => (
                <Card hoverable key={page.slug ?? i} className="h-full">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {isGovernment
                        ? t(
                            `government.subcategories.${page.slug}.name`,
                            page.name
                          )
                        : t(
                            `services.subcategories.${page.slug}.name`,
                            page.name
                          )}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {isGovernment
                          ? t(
                              `government.subcategories.${page.slug}.description`,
                              page.description
                            )
                          : t(
                              `services.subcategories.${page.slug}.description`,
                              page.description
                            )}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nestedPages.map((page, i) => (
                <Card key={page.slug ?? i} className="mb-4">
                  <CardContent>
                    <h4 className="text-lg font-medium text-gray-900">
                      {isGovernment
                        ? t(
                            `government.subcategories.${page.slug}.name`,
                            page.name
                          )
                        : t(
                            `services.subcategories.${page.slug}.name`,
                            page.name
                          )}
                    </h4>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {isGovernment
                          ? t(
                              `government.subcategories.${page.slug}.description`,
                              page.description
                            )
                          : t(
                              `services.subcategories.${page.slug}.description`,
                              page.description
                            )}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Card className="mb-8 markdown-content">
          <CardHeader>
            {markdownContent.description && (
              <CardContent>{markdownContent.description}</CardContent>
            )}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent.content}
            </ReactMarkdown>
          </CardHeader>
        </Card>
      </Section>
    </>
  );
}
