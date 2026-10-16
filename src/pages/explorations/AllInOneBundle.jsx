import { useState } from 'react';
import usePageClass from '../../lib/usePageClass.js';
import { useCart } from '../../layout/CartContext.jsx';
import { getDemo, DEMOS } from '../../data/allInOneBundle.js';
import { problemProps, whyFourProps, fourJobsProps, scienceProps, timelineProps, faqProps, closingProps, trustProps } from '../../data/allInOneStory.js';
import { heroProps, dayHeadingProps, dayChapters, plateProps } from '../../data/allInOneStoryTop.js';
import TempReploHero from '../../sections/TempReploHero.jsx';
import FrontrowBrandBand from '../../sections/FrontrowBrandBand.jsx';
import AccordionBlock from '../../sections/AccordionBlock.jsx';
import FdProblemSigns from '../../sections/FdProblemSigns.jsx';
import PdpV2TwoUp from '../../sections/PdpV2TwoUp.jsx';
import FdBrandNarrative from '../../sections/FdBrandNarrative.jsx';
import TempScienceModule from '../../sections/TempScienceModule.jsx';
import TimelineSection from '../../sections/TimelineSection.jsx';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import CollapsibleContent from '../../sections/CollapsibleContent.jsx';
import BundleMainProduct, { DemoTabs } from '../../sections/explorations/allInOneBundle/BundleMainProduct.jsx';
import BundleCompare from '../../sections/explorations/allInOneBundle/BundleCompare.jsx';
import '../../sections/explorations/allInOneBundle/bundle.css';

// EXPLORATION (not a production page): /explorations/all-in-1-bundle
// A landing page for the 4 hero products in one bundle (concept: picky eaters). Task requirements:
//  1. shoppers can add individual items to the cart, at a higher price than the complete bundle ("What's Inside" rows)
//  2. shoppers can easily switch between demos (Kids / Teens, Toddlers later): tabs in the buy box and again before the closing band
// Layout: [0] emotional storytelling above the buy box (new)  [A] buy box (new PDP buy box, reused)  [B] storytelling (existing sections, new content in src/data/allInOneStory.js)  [C] proof + closing.
export default function AllInOneBundle() {
  usePageClass('template-product all-in-1-bundle');
  const { addLine, openCart } = useCart();
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
  };
  // switching from the bottom of the page brings the shopper back to the buy box
  const changeDemoFromBottom = (id) => {
    changeDemo(id);
    document.getElementById('shopify-section-all-in-1-bundle-main')?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBundle = () => {
    const price = cents(monthly ? demo.totals.monthly : demo.totals.oneTime);
    addLine(
      { handle: `all-in-1-${demo.id}`, title: `${demo.possessive} All-in-1 Bundle`, image: demo.items[0].image, price },
      monthly,
      { key: `aio-${demo.id}-${frequency}`, title: `${demo.possessive} All-in-1 Bundle (4 products)`, price, compare: cents(demo.totals.base), delivery: monthly ? 'Delivered Monthly' : '' },
    );
    openCart();
  };
  // one product on its own: individual price (30% off), higher than its price inside the bundle
  const addItem = (it) => {
    addLine({ handle: it.handle, title: it.title, image: it.image, price: cents(it.individual) }, monthly, { price: cents(it.individual), compare: cents(it.base) });
    openCart();
  };

  return (
    <div className="aio-page">
      {/* [0] emotional storytelling above the buy box (data: src/data/allInOneStoryTop.js, keyed by demo) */}
      <TempReploHero key={`sh-${demoId}`} {...heroProps(demo)} />
      <FrontrowBrandBand id="aio_story_clinicians" />
      <TimelineSection key={`sd-${demoId}`} {...dayHeadingProps(demo)} />
      {dayChapters(demo).map((c) => <PdpV2TwoUp key={`${c.id}`} {...c} />)}
      <AccordionBlock key={`sp-${demoId}`} {...plateProps(demo)} />
      <BundleMainProduct demo={demo} demoId={demoId} onDemoChange={changeDemo} frequency={frequency} onFrequencyChange={setFrequency} onAddBundle={addBundle} onAddItem={addItem} />
      <FdBrandNarrative key={`j-${demoId}`} {...fourJobsProps(demo)} />
      <FdProblemSigns key={`p-${demoId}`} {...problemProps(demoId)} />
      <PdpV2TwoUp key={`w-${demoId}`} {...whyFourProps(demoId)} />
      <TempScienceModule key={`s-${demoId}`} {...scienceProps(demo)} />
      <TimelineSection key={`t-${demoId}`} {...timelineProps(demo)} />
      <BundleCompare demo={demo} onAddBundle={addBundle} />
      <div id="reviews"><HomepageTrustSection key={`tr-${demoId}`} {...trustProps(demoId)} /></div>
      <CollapsibleContent {...faqProps()} />
      <section className="aio-switch" aria-labelledby="aio-switch-title">
        <div className="aio-switch__inner">
          <h2 className="aio-switch__title" id="aio-switch-title">Shopping For <strong>Someone Else?</strong></h2>
          <p className="aio-switch__sub">Pick another group to see its bundle.</p>
          <DemoTabs demoId={demoId} onChange={changeDemoFromBottom} />
        </div>
      </section>
      <PdpV2TwoUp key={`c-${demoId}`} {...closingProps(demo)} />
    </div>
  );
}
