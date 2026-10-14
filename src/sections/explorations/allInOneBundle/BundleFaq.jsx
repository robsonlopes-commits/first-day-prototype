import AccordionTab from '../../../components/AccordionTab.jsx';
import { FAQ } from '../../../data/allInOneBundle.js';

export default function BundleFaq() {
  return (
    <section className="aio-section aio-faq">
      <div className="aio-container aio-container--narrow">
        <h2 className="aio-heading">Questions about the bundle</h2>
        {FAQ.map(([q, a], i) => (
          <AccordionTab key={q} className="aio-faq__item" defaultOpen={i === 0} summaryClassName="aio-faq__q" summary={<>{q}<span className="aio-faq__icon" aria-hidden="true" /></>}>
            <div className="accordion__content aio-faq__a"><p>{a}</p></div>
          </AccordionTab>
        ))}
      </div>
    </section>
  );
}
