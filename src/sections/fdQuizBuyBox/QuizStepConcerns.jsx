// STEP 1 of the quiz: "Which of these sounds like your kid?" (data-qbb-step="1").
// States: nothing ticked (hint visible, CTA disabled + aria-disabled) / 1+ ticked (hint hidden, CTA enabled). Multi-select checkboxes.
// Props: s = section settings, concerns = [{ handle, label, emphasis, emoji }], selected = [handles], onToggle(handle), onContinue().
function ConcernLabel({ label, emphasis }) {
  const em = (emphasis || '').trim() ? emphasis : '';
  const i = em ? label.indexOf(em) : -1;
  if (i === -1) return <>{label}</>;
  return <>{label.slice(0, i)}<strong>{em}</strong>{label.slice(i + em.length)}</>; // replace_first(emphasis, <strong>emphasis</strong>)
}

export default function QuizStepConcerns({ s, sectionId, concerns, selected, onToggle, onContinue }) {
  const canContinue = selected.length > 0;
  return (
    <div data-qbb-step="1">
      {s.question && <h3 className="fd-qbb__question">{s.question}</h3>}
      {s.question_lede && <p className="fd-qbb__lede">{s.question_lede}</p>}
      <ul className="fd-qbb__concerns">
        {concerns.map((c) => {
          const checked = selected.includes(c.handle);
          return (
            <li className="fd-qbb__concern" key={c.handle}>
              <label className={`fd-qbb__concern-label${checked ? ' is-checked' : ''}`}>
                <input className="fd-qbb__concern-input" id={`fd-qbb-${sectionId}-${c.handle}`} type="checkbox" name={`fd-qbb-concern-${sectionId}`} value={c.handle} autoComplete="off"
                  checked={checked} onChange={() => onToggle(c.handle)} />
                <span className="fd-qbb__concern-copy">
                  {c.emoji && <span className="fd-qbb__concern-emoji" aria-hidden="true">{c.emoji}</span>}
                  <span className="fd-qbb__concern-text"><ConcernLabel label={c.label} emphasis={c.emphasis} /></span>
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <p className="fd-qbb__hint" hidden={canContinue}>{s.empty_hint}</p>
      <button type="button" className="fd-qbb__cta" disabled={!canContinue} aria-disabled={!canContinue} onClick={onContinue}>
        <span>{s.continue_label}</span>
      </button>
    </div>
  );
}
