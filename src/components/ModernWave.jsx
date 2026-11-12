// The flat wave divider of the modern pages (the same path as the homepage "Our Food Is Not What It Used to Be" band and the All-in-1 plate band): 1512 x 99,
// 99px tall on desktop and 52px on phones. It replaces the tall theme waves (components/Waves.jsx) when a section opts in with `modern_waves`.
// `position="top"` is flipped. `color` is the color of the section the wave belongs to, `containerBackground` the color of the neighbor (or transparent).
const WAVE_PATH = 'M402.114 82.2445C323.643 72.3612 261.786 68.6667 209.353 68.6667C134.549 68.6667 78.8789 76.1765 21.338 83.9477C18.2594 84.362 15.1623 84.7854 12.0488 85.211C8.05809 85.7565 4.0404 86.3057 0 86.8443V43.3857V30.5345V0.000160217H1512V43.3857V86.5C1413.65 99.0118 1351.75 106.705 1157.53 82.2445C1079.05 72.3612 1017.2 68.6667 964.765 68.6667C889.962 68.6667 834.291 76.1765 776.753 83.9477C773.675 84.362 770.574 84.7853 767.463 85.2108C763.473 85.7564 759.455 86.3057 755.416 86.8443V86.8376C657.065 99.3494 596.339 106.705 402.114 82.2445Z';

export default function ModernWave({ position = 'top', color, containerBackground }) {
  return (
    <div className={`fd-modern-wave fd-modern-wave--${position}`} style={{ background: containerBackground, lineHeight: 0, width: '100%', [position === 'top' ? 'marginBottom' : 'marginTop']: -1 }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1512 99" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d={WAVE_PATH} fill={color} />
      </svg>
    </div>
  );
}
