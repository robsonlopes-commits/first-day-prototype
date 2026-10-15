import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/fonts.css';
import './styles/theme-variables.css';
import './styles/ui-kit.css';
import './styles/base.css';
import './styles/custom.css';
import './styles/new_custom.css';
import './styles/fd-global.css';
import './styles/prototype.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Like Shopify, every page change is a full page load. Theme CSS is global, so
// keeping two templates' styles alive in one SPA session would mix them (e.g. both PDPs).
document.addEventListener(
  'click',
  (e) => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0 || (a.target && a.target !== '_self')) return;
    const url = new URL(a.href, location.href);
    if (url.origin === location.origin && url.pathname !== location.pathname) {
      e.preventDefault();
      e.stopPropagation();
      location.assign(url.href);
    }
  },
  true
);
