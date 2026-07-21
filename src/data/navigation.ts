import type { NavigationItem } from '../types';
import { serviceCategories as servicesData } from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  { label: 'Home', labelKey: 'navbar.home', href: '/' },
  {
    label: 'Services',
    labelKey: 'navbar.services',
    href: '/services',
    children: [
      ...(servicesData.categories as Category[]).map(category => ({
        label: category.category,
        labelKey: `services.categories.${category.slug}.name`,
        href: `/services/${category.slug}`,
      })),
      { label: 'Tourism', labelKey: 'navbar.tourism', href: '/tourism' },
    ],
  },
  {
    label: 'Government',
    labelKey: 'navbar.government',
    href: '/government',
    children: [
      {
        label: 'Departments & Officials',
        labelKey: 'navbar.departments',
        href: '/government/departments',
      },
      {
        label: 'Legislative (City Council)',
        labelKey: 'navbar.legislative',
        href: '/government/legislative',
      },
      {
        label: 'Local Officials Directory',
        labelKey: 'navbar.officials',
        href: '/government/departments/officials',
      },
    ],
  },
  {
    label: 'Transparency',
    labelKey: 'navbar.transparency',
    href: '/transparency',
    children: [
      {
        label: 'Full Disclosure Policy',
        labelKey: 'navbar.fullDisclosure',
        href: '/transparency',
      },
      {
        label: 'Transparency Documents',
        labelKey: 'navbar.transparencyDocs',
        href: '/government/transparency-documents',
      },
      {
        label: 'Reports & Statistics',
        labelKey: 'navbar.reportsStats',
        href: '/government/reports-and-statistics',
      },
      {
        label: 'Annual Budget',
        labelKey: 'navbar.budget',
        href: '/government/transparency-documents',
      },
      {
        label: 'Freedom of Information',
        labelKey: 'navbar.foi',
        href: 'https://www.foi.gov.ph',
      },
    ],
  },
  {
    label: 'Statistics',
    labelKey: 'navbar.statistics',
    href: '/statistics',
    children: [
      {
        label: 'City Profile',
        labelKey: 'navbar.profile',
        href: '/statistics',
      },
      {
        label: 'DTI CMCI Profile',
        labelKey: 'navbar.dtiProfile',
        href: 'https://cmci.dti.gov.ph/lgu-profile.php?lgu=San%20Pedro%20(Laguna)',
      },
      {
        label: 'Barangay Data',
        labelKey: 'navbar.barangayData',
        href: '/statistics',
      },
      {
        label: 'Open Data PH',
        labelKey: 'navbar.openData',
        href: 'https://data.gov.ph',
      },
    ],
  },
  { label: 'Contact', labelKey: 'navbar.contact', href: '/#contact' },
];

export const footerNavigation = {
  mainSections: [
    {
      title: 'About',
      links: [
        { label: 'About the Portal', href: '/about' },
        // { label: 'Privacy Policy', href: '/privacy' },
        // { label: 'Terms of Use', href: '/terms' },
        { label: 'Accessibility', href: '/accessibility' },
        { label: 'Contact Us', href: '/about' },
        { label: 'Community Discord', href: '/discord' },
      ],
    },
    {
      title: 'Services',
      links: [
        {
          label: 'All Services',
          labelKey: 'services.viewAll',
          href: '/services',
        },
        ...(servicesData.categories as Category[])
          .slice(0, 6)
          .map(category => ({
            label: category.category,
            labelKey: `services.categories.${category.slug}.name`,
            href: `/services/${category.slug}`,
          })),
        {
          label: 'Hotlines',
          labelKey: 'navbar.hotlines',
          href: '/philippines/hotlines',
        },
        {
          label: 'Holidays',
          labelKey: 'navbar.holidays',
          href: '/philippines/holidays',
        },
      ],
    },
    {
      title: 'Government',
      links: [
        {
          label: 'Departments & Officials',
          labelKey: 'navbar.departments',
          href: '/government/departments',
        },
        {
          label: 'Legislative (City Council)',
          labelKey: 'navbar.legislative',
          href: '/government/legislative',
        },
        {
          label: 'Local Officials Directory',
          labelKey: 'navbar.officials',
          href: '/government/departments/officials',
        },
        {
          label: 'Transparency Documents',
          labelKey: 'navbar.transparencyDocs',
          href: '/government/transparency-documents',
        },
        {
          label: 'Freedom of Information',
          labelKey: 'navbar.foi',
          href: 'https://www.foi.gov.ph',
        },
      ],
    },
  ],
  socialLinks: [],
};
