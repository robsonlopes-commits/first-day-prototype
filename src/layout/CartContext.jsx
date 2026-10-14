import { createContext, useContext, useMemo, useState } from 'react';
import { SCENARIOS, GIFT } from '../data/cart.js';

// Visual-only cart state: drawer open/close + mock line items (see src/data/cart.js).
// `scenario` is a prototype-only switch (progress / unlocked / empty) used by the drawer's corner toggle.
const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [scenario, setScenarioState] = useState('progress');
  const [lines, setLines] = useState(SCENARIOS.progress);

  const value = useMemo(() => {
    const total = lines.reduce((sum, l) => sum + l.price * l.qty, 0);
    const compareTotal = lines.reduce((sum, l) => sum + l.compare * l.qty, 0);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const giftUnlocked = total >= GIFT.threshold;
    return {
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      lines,
      count: count + (giftUnlocked ? 1 : 0), // cart.item_count includes the free gift line
      total,
      compareTotal,
      giftUnlocked,
      scenario,
      setScenario: (name) => {
        setScenarioState(name);
        setLines(SCENARIOS[name]());
      },
      changeQty: (key, delta) =>
        setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: Math.max(1, l.qty + delta) } : l))),
      removeLine: (key) => setLines((ls) => ls.filter((l) => l.key !== key)),
      // opts (optional) overrides the line: { key, title, image, price, compare, delivery } (prices in cents), used by bundles
      addLine: (product, subscribed, opts = {}) =>
        setLines((ls) => {
          const key = opts.key || `${product.handle}:${subscribed ? 'sub' : 'otp'}`;
          if (ls.some((l) => l.key === key)) return ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
          const price = opts.price ?? Math.round(product.price * 0.7);
          return [
            ...ls,
            { key, handle: product.handle, title: opts.title || product.title, image: opts.image || product.image, qty: 1, compare: opts.compare ?? product.price, price, delivery: opts.delivery ?? (subscribed ? 'Delivered Monthly' : '') },
          ];
        }),
    };
  }, [open, lines, scenario]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
