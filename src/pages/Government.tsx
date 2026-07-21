import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { useTranslation } from '../hooks/useTranslation';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import * as LucideIcons from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';

const Government: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const isFil = currentLanguage === 'fil';
  const governmentName =
    import.meta.env.VITE_GOVERNMENT_NAME || 'City of San Pedro';
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = categoryData
    ? (LucideIcons[
        categoryData.icon as keyof typeof LucideIcons
      ] as React.ComponentType<{ className?: string }>)
    : null;

  useEffect(() => {
    if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData]);

  if (!category) {
    return (
      <>
        <SEO
          title={isFil ? 'Pamahalaan' : 'Government'}
          description={
            isFil
              ? `Lahat ng mga serbisyong inihahatid ng pamahalaan ng ${governmentName}. Hanapin ang kailangan mo para sa pagkamamamayan, negosyo, edukasyon, at iba pa.`
              : `All services provided by the ${governmentName} government. Find what you need for citizenship, business, education, and more.`
          }
          keywords="government services, public services, local government, civic services"
        />
        <GovernmentActivitySection
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
    `government.categories.${categoryData.slug}.name`,
    categoryData.category
  );
  const translatedCategoryDesc = t(
    `government.categories.${categoryData.slug}.description`,
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
              {isFil
                ? 'Kinukuha ang mga serbisyo ng pamahalaan...'
                : 'Loading services...'}
            </Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={3}>
                {t(
                  `government.subcategories.${category}.name`,
                  categoryIndex.title
                )}
              </Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {t(
                  `government.subcategories.${category}.description`,
                  categoryIndex.description
                )}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                  >
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500 animate-fade-in"
                    >
                      <CardContent>
                        <h4 className="text-lg font-medium text-gray-900">
                          {t(
                            `government.subcategories.${subcategory.slug}.name`,
                            subcategory.name
                          )}
                        </h4>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {t(
                              `government.subcategories.${subcategory.slug}.description`,
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
                    to={`/government/${category}/${subcategory.slug}`}
                  >
                    <Card hoverable className="mb-4">
                      <CardContent>
                        <h4 className="text-lg font-medium text-gray-900">
                          {t(
                            `government.subcategories.${subcategory.slug}.name`,
                            subcategory.name
                          )}
                        </h4>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {t(
                              `government.subcategories.${subcategory.slug}.description`,
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

export default Government;
