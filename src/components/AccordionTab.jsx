import { useRef } from 'react';

// The theme's <accordion-tab> custom element (assets/global.js AccordionTab): a <details> whose open/close height is animated
// (250ms ease on close, 400ms ease-out on open). `bodySelector` is the element measured when expanding.
// Props: className/id (on <accordion-tab>), defaultOpen, summaryClassName + summary (children of <summary>), children (the body), bodySelector.
export default function AccordionTab({ className, id, defaultOpen = false, open, summaryClassName, summary, children, bodySelector = '.accordion-block__body, .accordion__content', onToggle }) {
  const ref = useRef(null);
  const anim = useRef(null);
  const state = useRef({ closing: false, expanding: false });

  const finish = (details, isOpen) => {
    details.open = isOpen;
    anim.current = null;
    state.current = { closing: false, expanding: false };
    details.style.height = '';
    details.style.overflow = '';
    if (onToggle) onToggle(isOpen);
  };
  const click = (e) => {
    e.preventDefault();
    const tab = ref.current;
    const details = tab.querySelector('details');
    const sum = details.querySelector('summary');
    const content = tab.querySelector(bodySelector);
    details.style.overflow = 'hidden';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (state.current.closing || !details.open) {
      details.style.height = `${details.offsetHeight}px`;
      details.open = true;
      requestAnimationFrame(() => {
        state.current.expanding = true;
        const mt = parseInt(getComputedStyle(sum).marginTop, 10) || 0;
        const start = `${details.offsetHeight}px`;
        const end = `${sum.offsetHeight + mt + (content ? content.offsetHeight : 0)}px`;
        if (anim.current) anim.current.cancel();
        if (reduce) { finish(details, true); return; }
        anim.current = details.animate({ height: [start, end] }, { duration: 400, easing: 'ease-out' });
        anim.current.onfinish = () => finish(details, true);
        anim.current.oncancel = () => { state.current.expanding = false; };
      });
    } else {
      state.current.closing = true;
      const mt = parseInt(getComputedStyle(sum).marginTop, 10) || 0;
      const start = `${details.offsetHeight}px`;
      const end = `${sum.offsetHeight + mt}px`;
      if (anim.current) anim.current.cancel();
      if (reduce) { finish(details, false); return; }
      anim.current = details.animate({ height: [start, end] }, { duration: 250, easing: 'ease' });
      anim.current.onfinish = () => finish(details, false);
      anim.current.oncancel = () => { state.current.closing = false; };
    }
  };

  return (
    // eslint-disable-next-line react/no-unknown-property
    <accordion-tab ref={ref} class={className} id={id}>
      <details open={(open ?? defaultOpen) || undefined}>
        <summary className={summaryClassName} onClick={click}>{summary}</summary>
        {children}
      </details>
    </accordion-tab>
  );
}
