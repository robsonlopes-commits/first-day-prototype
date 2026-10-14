import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './layout/CartContext.jsx';
import Shell from './layout/Shell.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const ProductLegacy = lazy(() => import('./pages/ProductLegacy.jsx'));
const ProductNew = lazy(() => import('./pages/ProductNew.jsx'));
const LandingBTS = lazy(() => import('./pages/LandingBTS.jsx'));
const BundleBuilderV2 = lazy(() => import('./pages/BundleBuilderV2.jsx'));
const BundleQuiz = lazy(() => import('./pages/BundleQuiz.jsx'));
const AllInOneBundle = lazy(() => import('./pages/explorations/AllInOneBundle.jsx'));
const ProductRedirect = lazy(() => import('./pages/ProductRedirect.jsx'));
const Sale = lazy(() => import('./pages/Sale.jsx'));
const SharedPreview = lazy(() => import('./pages/SharedPreview.jsx'));
const PrototypeIndex = lazy(() => import('./pages/PrototypeIndex.jsx'));

export default function App() {
  return (
    <Routes>
      <Route path="/__shared" element={<Suspense fallback={null}><SharedPreview /></Suspense>} />
      <Route path="/__prototype" element={<Suspense fallback={null}><PrototypeIndex /></Suspense>} />
      <Route
        path="*"
        element={
          <CartProvider>
            <Shell>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products/kids-calming-magnesium" element={<ProductLegacy />} />
                  <Route path="/products/kids-enrichment-vitamin" element={<ProductNew />} />
                  <Route path="/products/:handle" element={<ProductRedirect />} />
                  <Route path="/pages/kde-behind-the-science-lp" element={<LandingBTS audience="kde" />} />
                  <Route path="/pages/tdk-behind-the-science-lp" element={<LandingBTS audience="tdk" />} />
                  <Route path="/pages/bundle-builder-v2" element={<BundleBuilderV2 />} />
                  <Route path="/pages/bundle-quiz" element={<BundleQuiz />} />
                  <Route path="/explorations/all-in-1-bundle" element={<AllInOneBundle />} />
                  <Route path="/pages/sale" element={<Sale />} />
                </Routes>
              </Suspense>
            </Shell>
          </CartProvider>
        }
      />
    </Routes>
  );
}
