import usePageClass from '../lib/usePageClass.js';
import HomepageHeroNew from '../sections/HomepageHeroNew.jsx';
import TempDtopCatSlider from '../sections/TempDtopCatSlider.jsx';
import PbfcmProductCarousel from '../sections/PbfcmProductCarousel.jsx';
import HomepageProblemSection from '../sections/HomepageProblemSection.jsx';
import FdCategoriesModule from '../sections/FdCategoriesModule.jsx';
import PbfcmCouponBanner from '../sections/PbfcmCouponBanner.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import HomepageVideoSection from '../sections/HomepageVideoSection.jsx';
import PbfcmComparisonTable from '../sections/PbfcmComparisonTable.jsx';
import TempHero from '../sections/TempHero.jsx';
import Benefits from '../sections/Benefits.jsx';
import { TRUST_HOME, COMPARISON_HOME, BENEFITS_HOME, TEMP_HERO_HOME } from '../data/sharedSections.js';
import { HOME_PRODUCT_CAROUSEL } from '../data/carouselConfigs.js';

// templates/index.hp01-v2.json: active sections in order (disabled ones are not rendered).
export default function Home() {
  usePageClass('template-index hp01-v2');
  return (
    <>
      <HomepageHeroNew />
      <TempDtopCatSlider />
      <PbfcmProductCarousel {...HOME_PRODUCT_CAROUSEL} />
      <HomepageProblemSection />
      <FdCategoriesModule />
      <PbfcmCouponBanner />
      <HomepageTrustSection {...TRUST_HOME} />
      <HomepageVideoSection />
      <PbfcmComparisonTable {...COMPARISON_HOME} />
      <TempHero {...TEMP_HERO_HOME} />
      <Benefits {...BENEFITS_HOME} />
    </>
  );
}
