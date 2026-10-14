import { useSearchParams } from 'react-router-dom';
import usePageClass from '../lib/usePageClass.js';
import PbfcmProductCarousel from '../sections/PbfcmProductCarousel.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import PbfcmComparisonTable from '../sections/PbfcmComparisonTable.jsx';
import PbfcmFeatureSplit from '../sections/PbfcmFeatureSplit.jsx';
import PbfcmGiftProgress from '../sections/PbfcmGiftProgress.jsx';
import Benefits from '../sections/Benefits.jsx';
import TempHero from '../sections/TempHero.jsx';
import { TRUST_HOME, COMPARISON_HOME, COMPARISON_SALE, COMPARISON_LP, FEATURE_SPLIT_SALE_BOTTOM, FEATURE_SPLIT_SALE_TOP, GIFT_PROGRESS_SALE, BENEFITS_HOME, TEMP_HERO_HOME, TEMP_HERO_PDP_NEW } from '../data/sharedSections.js';
import { HOME_PRODUCT_CAROUSEL, SALE_PRODUCT_CAROUSELS } from '../data/carouselConfigs.js';

// Private preview of the shared sections (not part of the storefront). ?only=home-carousel|sale-carousels|...
export default function SharedPreview() {
  usePageClass('template-index');
  const [q] = useSearchParams();
  const only = q.get('only');
  const show = (k) => !only || only === k;
  return (
    <>
      {show('home-carousel') && <PbfcmProductCarousel {...HOME_PRODUCT_CAROUSEL} />}
      {show('sale-carousels') && <div className="page-width">{SALE_PRODUCT_CAROUSELS.map((c) => <PbfcmProductCarousel key={c.id} {...c} />)}</div>}
      {show('trust') && <HomepageTrustSection {...TRUST_HOME} />}
      {show('comparison-home') && <PbfcmComparisonTable {...COMPARISON_HOME} />}
      {show('comparison-sale') && <PbfcmComparisonTable {...COMPARISON_SALE} />}
      {show('comparison-lp') && <PbfcmComparisonTable {...COMPARISON_LP} />}
      {show('feature-split') && <PbfcmFeatureSplit {...FEATURE_SPLIT_SALE_BOTTOM} />}
      {show('feature-split-top') && <PbfcmFeatureSplit {...FEATURE_SPLIT_SALE_TOP} />}
      {show('gift') && <PbfcmGiftProgress {...GIFT_PROGRESS_SALE} />}
      {show('benefits') && <Benefits {...BENEFITS_HOME} />}
      {show('hero') && <TempHero {...TEMP_HERO_HOME} />}
      {show('hero-pdp') && <TempHero {...TEMP_HERO_PDP_NEW} />}
    </>
  );
}
