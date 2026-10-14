// snippets/waves.liquid: decorative wave divider above/below sections that enable top_waves / bottom_waves.
const PATH = 'M73.6677 10.5832C59.2917 17.0477 47.9595 19.4642 38.3536 19.4642C24.6496 19.4642 14.4507 14.5522 3.90915 9.4692C3.34514 9.19819 2.77775 8.92129 2.20736 8.64291C1.47625 8.2861 0.740205 7.92688 0 7.57458V36V44.4057V84H277V36H276.785V7.57897C258.768 -0.604741 247.642 -5.41585 212.06 10.5832C197.684 17.0477 186.352 19.4642 176.746 19.4642C163.042 19.4642 152.843 14.5522 142.302 9.4692C141.738 9.19822 141.17 8.92134 140.6 8.64299L140.6 8.64294C139.869 8.28612 139.133 7.92689 138.393 7.57458V7.57897C120.375 -0.604741 109.25 -5.41585 73.6677 10.5832Z';

export default function Waves({ position = 'top', color, containerBackground }) {
  const style = position === 'top'
    ? { display: 'flex', width: '100%', paddingTop: 15, background: containerBackground, zIndex: -1, marginBottom: -1 }
    : { display: 'flex', width: '100%', paddingTop: 15, background: containerBackground, transform: 'rotate(180deg)', zIndex: -1, marginTop: -1, position: 'relative' };
  return (
    <div className="waves" style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" width="100%" viewBox="0 0 277 22">
        <path fillRule="evenodd" clipRule="evenodd" d={PATH} fill={color} />
      </svg>
    </div>
  );
}
