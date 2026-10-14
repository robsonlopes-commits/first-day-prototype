import { DEMOS } from '../../../data/allInOneBundle.js';

// Kids / Teens / Women / Men switcher. Each tab carries its segment color (fd-ui-kit) as a dot.
export default function DemoTabs({ demoId, onChange }) {
  return (
    <div className="aio-demo-tabs fd-tabs-v3 fd-tabs-v3--medium" role="tablist" aria-label="Choose who the bundle is for">
      {DEMOS.map((d) => (
        <button
          key={d.id}
          type="button"
          role="tab"
          aria-selected={demoId === d.id}
          className={`fd-tabs-v3__item${demoId === d.id ? ' fd-tabs-v3__item--active' : ''}`}
          style={{ '--aio-demo-color': d.color }}
          onClick={() => onChange(d.id)}
        >
          <span className="aio-demo-tabs__dot" aria-hidden="true" />
          {d.label}
        </button>
      ))}
    </div>
  );
}
