import usePageClass from '../lib/usePageClass.js';
import TempSubnav from '../sections/TempSubnav.jsx';
import PbfcmGiftProgress from '../sections/PbfcmGiftProgress.jsx';
import PbfcmProductCarousel from '../sections/PbfcmProductCarousel.jsx';
import HomepageTrustSection from '../sections/HomepageTrustSection.jsx';
import PbfcmComparisonTable from '../sections/PbfcmComparisonTable.jsx';
import PbfcmFeatureSplit from '../sections/PbfcmFeatureSplit.jsx';
import { TRUST_HOME, COMPARISON_SALE, FEATURE_SPLIT_SALE_BOTTOM } from '../data/sharedSections.js';
import { SALE_PRODUCT_CAROUSELS } from '../data/carouselConfigs.js';
import { SALE_SUBNAV } from '../data/sale.js';

// templates/page.bfcm-categories.json, live section order (disabled sections omitted).
// pbfcm-gift-progress renders nothing live (no active gift) -> show={false}.
export default function Sale() {
  usePageClass('template-page bfcm-categories');
  return (
    <>
      <TempSubnav {...SALE_SUBNAV} />
      <PbfcmGiftProgress show={false} />
      {SALE_PRODUCT_CAROUSELS.map((c) => <PbfcmProductCarousel key={c.id} {...c} />)}
      <HomepageTrustSection {...TRUST_HOME} />
      <PbfcmComparisonTable {...COMPARISON_SALE} />
      <PbfcmFeatureSplit {...FEATURE_SPLIT_SALE_BOTTOM} />
    </>
  );
}
