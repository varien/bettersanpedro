import Section from '../components/ui/Section';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { useTranslation } from '../hooks/useTranslation';
import {
  serviceCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Services: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const governmentName =
    import.meta.env.VITE_GOVERNMENT_NAME || 'City of San Pedro';
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);

  const [allServices, setAllServices] = useState<
    {
      name: string;
      slug: string;
      description?: string;
      categorySlug: string;
      categoryName: string;
    }[]
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return serviceCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = categoryData
    ? (LucideIcons[
        categoryData.icon as keyof typeof LucideIcons
      ] as React.ComponentType<{ className?: string }>)
    : null;

  // Effect for fetching all services for search parameter
  useEffect(() => {
    if (query.trim()) {
      setSearchLoading(true);
      const serviceCats = serviceCategories.categories;
      Promise.allSettled(
        serviceCats.map(cat =>
          getCategorySubcategories(cat.slug).then(idx => ({
            cat,
            pages: idx.pages,
          }))
        )
      )
        .then(results => {
          const items = [];
          for (const result of results) {
            if (result.status !== 'fulfilled') continue;
            const { cat, pages } = result.value;
            for (const page of pages) {
              items.push({
                name: page.name,
                slug: page.slug,
                description: page.description,
                categorySlug: cat.slug,
                categoryName: cat.category,
              });
            }
          }
          setAllServices(items);
        })

        .catch(console.error)
        .finally(() => setSearchLoading(false));
    }
  }, [query]);

  // Effect for fetching specific category subcategories
  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  const filteredServices = allServices.filter(service => {
    const q = query.toLowerCase().trim();
    const transName = t(
      `services.subcategories.${service.slug}.name`,
      service.name
    ).toLowerCase();
    const transDesc = (
      t(
        `services.subcategories.${service.slug}.description`,
        service.description || ''
      ) || ''
    ).toLowerCase();
    const transCatName = t(
      `services.categories.${service.categorySlug}.name`,
      service.categoryName
    ).toLowerCase();
    return (
      service.name.toLowerCase().includes(q) ||
      (service.description && service.description.toLowerCase().includes(q)) ||
      service.categoryName.toLowerCase().includes(q) ||
      transName.includes(q) ||
      transDesc.includes(q) ||
      transCatName.includes(q)
    );
  });

  if (query.trim()) {
    return (
      <>
        <SEO
          title={
            isFil
              ? `Mga Resulta ng Paghahanap para sa "${query}"`
              : `Search Results for "${query}"`
          }
          description={
            isFil
              ? `Maghanap ng mga serbisyong may kaugnayan sa "${query}" sa portal ng San Pedro.`
              : `Find services related to "${query}" in the San Pedro portal.`
          }
          keywords={`${query}, search results, services`}
        />
        <Section className="p-3 mb-12">
          <Breadcrumbs className="mb-8" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary-600 mb-2">
                <LucideIcons.Search className="h-5 w-5" />
                <span className="text-xs font-bold tracking-wider uppercase">
                  {isFil ? 'Paghahanap sa Portal' : 'Portal Search'}
                </span>
              </div>
              <Heading level={1}>
                {isFil
                  ? `Mga Resulta para sa "${query}"`
                  : `Results for "${query}"`}
              </Heading>
              <Text className="text-gray-600 mt-1">
                {isFil
                  ? `Nakakita ng ${filteredServices.length} na serbisyo na tumutugma sa iyong paghahanap.`
                  : `Found ${filteredServices.length} ${filteredServices.length === 1 ? 'service' : 'services'} matching your search.`}
              </Text>
            </div>
            <div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm bg-white cursor-pointer"
              >
                <LucideIcons.X className="h-4 w-4 text-gray-500" />
                {isFil ? 'I-clear ang Paghahanap' : 'Clear Search'}
              </Link>
            </div>
          </div>

          {searchLoading ? (
            <div className="flex justify-center items-center py-20 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mr-3"></div>
              <Text className="text-gray-500 font-medium animate-pulse">
                {isFil
                  ? 'Hinahanap sa database ng portal...'
                  : 'Searching portal database...'}
              </Text>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="space-y-12">
              <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-6 text-amber-900 max-w-3xl">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-lg text-amber-700 shrink-0">
                    <LucideIcons.AlertCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-amber-950 mb-1">
                      {isFil
                        ? 'Walang nahanap na serbisyo'
                        : 'No services found'}
                    </h3>
                    <p className="text-sm text-amber-800 leading-relaxed mb-4">
                      {isFil ? (
                        <>
                          Hindi kami nakakita ng anumang serbisyo na tumutugma
                          sa{' '}
                          <strong className="font-semibold text-amber-950">
                            "{query}"
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          We couldn't find any services matching{' '}
                          <strong className="font-semibold text-amber-950">
                            "{query}"
                          </strong>
                          .
                        </>
                      )}
                    </p>
                    <div className="text-xs space-y-1.5 text-amber-700">
                      <p className="font-semibold text-amber-800 uppercase tracking-wider">
                        {isFil ? 'Mga Mungkahi:' : 'Suggestions:'}
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          {isFil
                            ? 'Suriin ang baybay ng salita'
                            : 'Double-check your spelling'}
                        </li>
                        <li>
                          {isFil
                            ? 'Subukan ang mas pangkalahatang salita (hal. "kalusugan", "permit", "buwis", "bakuna")'
                            : 'Try a broader term (e.g. "health", "permit", "tax", "vaccine")'}
                        </li>
                        <li>
                          {isFil
                            ? 'Tingnan ang lahat ng serbisyo ng munisipyo sa ibaba ayon sa kategorya'
                            : 'Browse all local services by category below'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <Heading level={2} className="mb-6">
                  {isFil
                    ? 'Tingnan ang mga Serbisyo ayon sa Kategorya'
                    : 'Browse Services by Category'}
                </Heading>
                <ServicesSection />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <Link
                  key={`${service.categorySlug}-${service.slug}`}
                  to={`/services/${service.categorySlug}/${service.slug}`}
                  className="block group"
                >
                  <Card
                    hoverable
                    className="h-full border-t-4 border-primary-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col bg-white"
                  >
                    <CardContent className="flex flex-col h-full justify-between p-6 flex-grow">
                      <div>
                        <h4 className="text-lg font-extrabold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {t(
                            `services.subcategories.${service.slug}.name`,
                            service.name
                          )}
                        </h4>
                        {service.description && (
                          <p className="mt-2 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                            {t(
                              `services.subcategories.${service.slug}.description`,
                              service.description
                            )}
                          </p>
                        )}
                      </div>
                      <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-primary-50 text-primary-700">
                          {t(
                            `services.categories.${service.categorySlug}.name`,
                            service.categoryName
                          )}
                        </span>
                        <span className="text-primary-600 text-sm font-bold group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1">
                          {isFil ? 'Tingnan ang Gabay' : 'View Guide'}{' '}
                          <LucideIcons.ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!category) {
    return (
      <>
        <SEO
          title={isFil ? 'Mga Serbisyo' : 'Services'}
          description={
            isFil
              ? `Lahat ng mga serbisyong inihahatid ng pamahalaan ng ${governmentName}. Hanapin ang kailangan mo para sa pagkamamamayan, negosyo, edukasyon, at iba pa.`
              : `All services provided by the ${governmentName} government. Find what you need for citizenship, business, education, and more.`
          }
          keywords="government services, public services, local government, civic services"
        />
        <ServicesSection
          title={
            isFil
              ? 'Lahat ng Serbisyong Pambayan'
              : `All local government services`
          }
          description={
            isFil
              ? `Lahat ng mga serbisyong inihahatid ng pamahalaan ng ${governmentName}. Hanapin ang kailangan mo para sa pagkamamamayan, negosyo, edukasyon, at iba pa.`
              : `All services provided by the ${governmentName} government. Find what you need for citizenship, business, education, and more.`
          }
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title={isFil ? 'Hindi nahanap ang kategorya' : 'Category not found'}
          description={
            isFil
              ? 'Ang kategoryang hinahanap mo ay hindi umiiral.'
              : 'The category you are looking for does not exist.'
          }
          icon
        />
      </Section>
    );
  }

  const translatedCategoryName = t(
    `services.categories.${categoryData.slug}.name`,
    categoryData.category
  );
  const translatedCategoryDesc = t(
    `services.categories.${categoryData.slug}.description`,
    categoryData.description
  );

  return (
    <>
      <SEO
        title={translatedCategoryName}
        description={translatedCategoryDesc}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" />
        {Icon && <Icon className="h-8 w-8 mb-4 text-primary-600 rounded-md" />}
        <Heading>{translatedCategoryName}</Heading>
        <Text className="text-gray-600 mb-6">{translatedCategoryDesc}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>
              {isFil ? 'Kinukuha ang mga serbisyo...' : 'Loading services...'}
            </Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={3}>
                {t(
                  `services.subcategories.${category}.name`,
                  categoryIndex.title
                )}
              </Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {t(
                  `services.subcategories.${category}.description`,
                  categoryIndex.description
                )}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                  >
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500 animate-fade-in"
                    >
                      <CardContent>
                        <h4 className="text-lg font-medium text-gray-900">
                          {t(
                            `services.subcategories.${subcategory.slug}.name`,
                            subcategory.name
                          )}
                        </h4>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {t(
                              `services.subcategories.${subcategory.slug}.description`,
                              subcategory.description
                            )}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {translatedCategoryName}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/services/${category}/${subcategory.slug}`}
                  >
                    <Card hoverable className="mb-4">
                      <CardContent>
                        <h4 className="text-lg font-medium text-gray-900">
                          {t(
                            `services.subcategories.${subcategory.slug}.name`,
                            subcategory.name
                          )}
                        </h4>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {t(
                              `services.subcategories.${subcategory.slug}.description`,
                              subcategory.description
                            )}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {translatedCategoryName}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Services;
