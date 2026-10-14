import { useEffect } from 'react';

// Production puts the template name on <body> (e.g. "template-product unified-default").
// Theme CSS relies on it, so every page declares the same classes.
export default function usePageClass(classes) {
  useEffect(() => {
    const list = classes.split(' ').filter(Boolean);
    document.body.classList.add(...list);
    return () => document.body.classList.remove(...list);
  }, [classes]);
}
