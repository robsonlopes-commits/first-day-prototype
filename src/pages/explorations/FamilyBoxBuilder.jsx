import usePageClass from '../../lib/usePageClass.js';
import { familyHeroProps, familyWhyProps, familyScienceProps, familyTimelineProps, familyTrustProps, familyFaqProps, familyClosingProps } from '../../data/familyStory.js';
import TempReploHero from '../../sections/TempReploHero.jsx';
import FamilyBox from '../../sections/explorations/familyBox/FamilyBox.jsx';
import TempHero from '../../sections/TempHero.jsx';
import PdpV2TwoUp from '../../sections/PdpV2TwoUp.jsx';
import TempScienceModule from '../../sections/TempScienceModule.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import CollapsibleContent from '../../sections/CollapsibleContent.jsx';
import '../../sections/explorations/allInOneBundle/bundle.css';

// EXPLORATION (not a production page): /explorations/family-box-builder  ("Family Box Builder")
// Starts as a DUPLICATE of the All-in-1 Bundle exploration (AllInOneBundle.jsx, /explorations/all-in-1-bundle), with these taken out:
//  1. the buy box (BundleMainProduct): a new one will be made for this exploration, so for now the page has none,
//  2. the demo switches (Kids / Teens / Toddlers): the page is for the whole family, so there is no audience to switch,
//  3. the storytelling of the four moments at the top (the day timeline heading, the four chapters and the plate section),
//  4. the Four Jobs section and the price comparison (each product on its own versus the bundle, with the add buttons) with the cart code they used.
// New block under the hero (the clinicians band was taken out too): the family box builder (src/sections/explorations/familyBox).
// What is left, in order: hero, the family box builder, why one product is not enough, science (a tab per person), timeline, trust, FAQ and the closing hero.
// The copy and images of all of them are written for a family: src/data/familyStory.js (it takes the Kids props of src/data/allInOneStory.js and overrides them).
export default function FamilyBoxBuilder() {
  usePageClass('template-product all-in-1-bundle family-box-builder');

  return (
    <div className="aio-page">
      {/* the hero stays: it is the first section of the page (family copy and photo: src/data/familyStory.js) */}
      <TempReploHero {...familyHeroProps()} />
      {/* the family box builder: add the family, a box per person with a carousel of products, summary fixed at the bottom */}
      <FamilyBox />
      <PdpV2TwoUp {...familyWhyProps()} />
      <TempScienceModule {...familyScienceProps()} />
      <TimelineSection {...familyTimelineProps()} />
      <div id="reviews"><HomepageTrustSection {...familyTrustProps()} /></div>
      <CollapsibleContent {...familyFaqProps()} />
      <TempHero {...familyClosingProps()} />
    </div>
  );
}
