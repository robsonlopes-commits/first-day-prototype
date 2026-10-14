import { useState } from 'react';
import MissingAsset from './MissingAsset.jsx';

// <img> that falls back to the MissingAsset placeholder if the file fails to load.
export default function Img({ src, alt = '', className, style, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) return <MissingAsset className={className} style={style} />;
  return <img src={src} alt={alt} className={className} style={style} onError={() => setFailed(true)} {...rest} />;
}
