import { useState } from 'react';
import usePageClass from '../../lib/usePageClass.js';
import { useCart } from '../../layout/CartContext.jsx';
import { getDemo, DEMOS } from '../../data/allInOneBundle.js';
import { whyFourProps, fourJobsProps, scienceProps, timelineProps, faqProps, trustProps, closingProps } from '../../data/allInOneStory.js';
import { heroProps, dayHeadingProps, dayChapters, plateProps } from '../../data/allInOneStoryTop.js';
import TempHero from '../../sections/TempHero.jsx';
import TempReploHero from '../../sections/TempReploHero.jsx';
import FrontrowBrandBand from '../../sections/FrontrowBrandBand.jsx';
import AccordionBlock from '../../sections/AccordionBlock.jsx';
import PdpV2TwoUp from '../../sections/PdpV2TwoUp.jsx';
import FdBrandNarrative from '../../sections/FdBrandNarrative.jsx';
import TempScienceModule from '../../sections/TempScienceModule.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import CollapsibleContent from '../../sections/CollapsibleContent.jsx';
import BundleMainProduct from '../../sections/explorations/allInOneBundle/BundleMainProduct.jsx';
import BundleCompare from '../../sections/explorations/allInOneBundle/BundleCompare.jsx';
import '../../sections/explorations/allInOneBundle/bundle.css';

// EXPLORATION (not a production page): /explorations/all-in-1-bundle
// A landing page for the 4 hero products in one bundle (concept: picky eaters). Task requirements:
//  1. shoppers can add individual items to the cart, at a higher price than the complete bundle ("What's Inside" rows)
//  2. shoppers can easily switch between demos (Kids / Teens, Toddlers later): tabs in the buy box
// Layout: [0] emotional storytelling above the buy box (new)  [A] buy box (new PDP buy box, reused)  [B] storytelling (existing sections, new content in src/data/allInOneStory.js)  [C] proof + FAQ.
export default function AllInOneBundle() {
  usePageClass('template-product all-in-1-bundle');
  const { addLine, openCart, lines, changeQty, removeLine } = useCart();
  const initial = new URLSearchParams(window.location.search).get('demo');
  const [demoId, setDemoId] = useState(DEMOS.some((d) => d.id === initial) ? initial : 'kids');
  const [frequency, setFrequency] = useState('monthly');
  const demo = getDemo(demoId);
  const monthly = frequency === 'monthly';
  const cents = (n) => Math.round(n * 100);

  const changeDemo = (id) => {
    setDemoId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('demo', id);
    window.history.replaceState(null, '', url); // no reload: the demo switch is instant
    window.scrollTo({ top: 0, behavior: 'auto' }); // a different audience is a different story: start it from the top
  };
  const addBundle = () => {
    const price = cents(monthly ? demo.totals.monthly : demo.totals.oneTime);
    addLine(
      { handle: `all-in-1-${demo.id}`, title: `${demo.possessive} ${demo.bundleName}`, image: demo.items[0].image, price },
      monthly,
      { key: `aio-${demo.id}-${frequency}`, title: `${demo.possessive} ${demo.bundleName} (${demo.items.length} products)`, price, compare: cents(demo.totals.base), delivery: monthly ? 'Delivered Monthly' : '' },
    );
    openCart();
  };
  // one product on its own: individual price (30% off), higher than its price inside the bundle. Each line has its own cart key so the
  // "Add +" / stepper next to the item reads and changes exactly that line (no cart drawer pop up on every click: the header cart shows the count).
  const itemKey = (it) => `aio-one-${it.handle}:${monthly ? 'sub' : 'otp'}`;
  const itemQty = (it) => lines.find((l) => l.key === itemKey(it))?.qty || 0;
  const addItem = (it) => {
    addLine({ handle: it.handle, title: it.title, image: it.image, price: cents(it.individual) }, monthly, { key: itemKey(it), price: cents(it.individual), compare: cents(it.base) });
  };
  const decItem = (it) => (itemQty(it) > 1 ? changeQty(itemKey(it), -1) : removeLine(itemKey(it)));

  return (
    <div className="aio-page">
      {/* [0] emotional storytelling above the buy box (data: src/data/allInOneStoryTop.js, keyed by demo) */}
      <TempReploHero key={`sh-${demoId}`} {...heroProps(demo)} />
      <FrontrowBrandBand id="aio_story_clinicians" />
      <TimelineSection key={`sd-${demoId}`} {...dayHeadingProps(demo)} />
      {dayChapters(demo).map((c) => <PdpV2TwoUp key={`${c.id}`} {...c} />)}
      <AccordionBlock key={`sp-${demoId}`} {...plateProps(demo)} />
      <BundleMainProduct demo={demo} demoId={demoId} onDemoChange={changeDemo} frequency={frequency} onFrequencyChange={setFrequency} onAddBundle={addBundle} onAddItem={addItem} onDecItem={decItem} itemQty={itemQty} />
      <FdBrandNarrative key={`j-${demoId}`} {...fourJobsProps(demo)} />
      <BundleCompare demo={demo} onAddBundle={addBundle} onAddItem={addItem} onDecItem={decItem} itemQty={itemQty} />
      <PdpV2TwoUp key={`w-${demoId}`} {...whyFourProps(demoId)} />
      <TempScienceModule key={`s-${demoId}`} {...scienceProps(demo)} />
      <TimelineSection key={`t-${demoId}`} {...timelineProps(demo)} />
      <div id="reviews"><HomepageTrustSection key={`tr-${demoId}`} {...trustProps(demoId)} /></div>
      <CollapsibleContent key={`f-${demoId}`} {...faqProps(demo)} />
      <TempHero key={`c-${demoId}`} {...closingProps(demo)} />
    </div>
  );
}
