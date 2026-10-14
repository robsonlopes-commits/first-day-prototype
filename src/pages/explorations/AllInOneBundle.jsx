import { useEffect, useRef, useState } from 'react';
import usePageClass from '../../lib/usePageClass.js';
import { useCart } from '../../layout/CartContext.jsx';
import { getDemo, DEMOS } from '../../data/allInOneBundle.js';
import { TRUST_PDP_NEW } from '../../data/sharedSections.js';
import HomepageTrustSection from '../../sections/HomepageTrustSection.jsx';
import BundleGallery from '../../sections/explorations/allInOneBundle/BundleGallery.jsx';
import BundleBuyBox from '../../sections/explorations/allInOneBundle/BundleBuyBox.jsx';
import StickyBundleBar from '../../sections/explorations/allInOneBundle/StickyBundleBar.jsx';
import PickyEaterBenefits from '../../sections/explorations/allInOneBundle/PickyEaterBenefits.jsx';
import BundleVsIndividual from '../../sections/explorations/allInOneBundle/BundleVsIndividual.jsx';
import BundleFaq from '../../sections/explorations/allInOneBundle/BundleFaq.jsx';
import FinalCta from '../../sections/explorations/allInOneBundle/FinalCta.jsx';
import '../../styles/theme/fd-button.css';
import '../../styles/theme/fd-badge.css';
import '../../styles/theme/fd-tabs-v3.css';
import '../../sections/explorations/allInOneBundle/allInOneBundle.css';

// EXPLORATION (not a production page): /explorations/all-in-1-bundle
// The 4 hero products in one bundle (concept: picky eaters). Requirements from the task:
//  1. shoppers can add individual items to the cart, at a higher price than the complete bundle
//  2. shoppers can easily switch between demos (Kids / Teens / Women / Men) to buy other options
export default function AllInOneBundle() {
  usePageClass('template-product all-in-1-bundle');
  const { addLine, openCart } = useCart();
  const initial = new URLSearchParams(window.location.search).get('demo');
  const [demoId, setDemoId] = useState(DEMOS.some((d) => d.id === initial) ? initial : 'kids');
  const [frequency, setFrequency] = useState('monthly');
  const [stickyVisible, setStickyVisible] = useState(false);
  const ctaRef = useRef(null);
  const demo = getDemo(demoId);
  const price = frequency === 'monthly' ? demo.totals.monthly : demo.totals.oneTime;

  const changeDemo = (id) => {
    setDemoId(id);
    const url = new URL(window.location.href);
    url.searchParams.set('demo', id);
    window.history.replaceState(null, '', url); // no reload: the demo switch is instant
  };

  const addBundle = () => {
    const cents = (n) => Math.round(n * 100);
    addLine(
      { handle: `all-in-1-${demo.id}`, title: `${demo.possessive} All-in-1 Bundle`, image: demo.items[0].image, price: cents(price) },
      frequency === 'monthly',
      {
        key: `aio-${demo.id}-${frequency}`,
        title: `${demo.possessive} All-in-1 Bundle (4 products)`,
        price: cents(price),
        compare: cents(demo.totals.base),
        delivery: frequency === 'monthly' ? 'Delivered Monthly' : '',
      }
    );
    openCart();
  };
  const addItem = (it) => {
    addLine({ handle: it.handle, title: it.title, image: it.image, price: Math.round(it.base * 100) }, true);
    openCart();
  };

  useEffect(() => {
    const el = ctaRef.current;
    if (!el || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(([e]) => setStickyVisible(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="aio-page">
      <section className="aio-hero">
        <div className="aio-container aio-hero__grid">
          <BundleGallery demo={demo} />
          <BundleBuyBox ref={ctaRef} demo={demo} demoId={demoId} onDemoChange={changeDemo} frequency={frequency} onFrequencyChange={setFrequency} onAddBundle={addBundle} onAddItem={addItem} />
        </div>
      </section>
      <PickyEaterBenefits demo={demo} onAddItem={addItem} />
      <BundleVsIndividual demo={demo} onAddBundle={addBundle} />
      <HomepageTrustSection {...TRUST_PDP_NEW} />
      <BundleFaq />
      <FinalCta demo={demo} demoId={demoId} onDemoChange={(id) => { changeDemo(id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} price={price} onAddBundle={addBundle} />
      <StickyBundleBar visible={stickyVisible} demo={demo} price={price} onAdd={addBundle} />
    </div>
  );
}
