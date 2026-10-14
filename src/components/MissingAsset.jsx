import { useState } from 'react';

// Placeholder for an image that could not be retrieved. Click to pick a local
// image; it only lives for the current browser session.
export default function MissingAsset({ label = 'Missing asset - upload image', style, className = '' }) {
  const [src, setSrc] = useState(null);
  if (src) return <img src={src} alt="" className={className} style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }} />;
  return (
    <label className={`proto-missing-asset ${className}`} style={style}>
      {label}
      <input type="file" accept="image/*" hidden onChange={(e) => e.target.files[0] && setSrc(URL.createObjectURL(e.target.files[0]))} />
    </label>
  );
}
