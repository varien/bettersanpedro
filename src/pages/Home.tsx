import Hero from '../components/sections/Hero';
import YakapPromoBanner from '../components/home/YakapPromoBanner';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import StatsSection from '../components/home/StatsSection';
import WeatherMapSection from '../components/home/WeatherMapSection';
import TourismSection from '../components/home/TourismSection';
import HistorySection from '../components/home/HistorySection';
import ContactSection from '../components/home/ContactSection';
import ContentStatusSection from '../components/home/ContentStatusSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Community-run civic information portal for San Pedro, Laguna. Find local services, offices, public resources, and community information."
        keywords="San Pedro, Laguna, BetterSanPedro.ph, local government, services, civic information"
      />
      <main className="flex-grow">
        <Hero />
        <StatsSection />
        <YakapPromoBanner />
        <ServicesSection />
        <TourismSection />
        <HistorySection />
        <WeatherMapSection />
        <GovernmentActivitySection />
        <ContentStatusSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
