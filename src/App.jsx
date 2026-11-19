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
const BundleAddOn = lazy(() => import('./pages/explorations/BundleAddOn.jsx'));
const MixedBundleBuilderQuizV1 = lazy(() => import('./pages/explorations/MixedBundleBuilderQuizV1.jsx'));
const MixedBundleBuilderQuizV13 = lazy(() => import('./pages/explorations/MixedBundleBuilderQuizV13.jsx'));
const MixedBundleBuilderQuizV12 = lazy(() => import('./pages/explorations/MixedBundleBuilderQuizV12.jsx'));
const MixedBundleBuilderQuizV2 = lazy(() => import('./pages/explorations/MixedBundleBuilderQuizV2.jsx'));
const SesameToddlersProbiotic = lazy(() => import('./pages/explorations/SesameToddlersProbiotic.jsx'));
const SesameToddlersMulti = lazy(() => import('./pages/explorations/SesameToddlersMulti.jsx'));
const SesameToddlersBundle = lazy(() => import('./pages/explorations/SesameToddlersBundle.jsx'));
const SesameToddlersBts = lazy(() => import('./pages/explorations/SesameToddlersBts.jsx'));
const FamilyBoxBuilder = lazy(() => import('./pages/explorations/FamilyBoxBuilder.jsx'));
const ProductToddlersMultivitamin = lazy(() => import('./pages/pdp/ProductToddlersMultivitamin.jsx'));
const ProductToddlersProbiotic = lazy(() => import('./pages/pdp/ProductToddlersProbiotic.jsx'));
const ProductToddlerTlcStarterPack = lazy(() => import('./pages/pdp/ProductToddlerTlcStarterPack.jsx'));
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
                  <Route path="/products/the-no-junk-toddlers-multivitamin" element={<ProductToddlersMultivitamin />} />
                  <Route path="/products/toddlers-3-in-1-probiotic" element={<ProductToddlersProbiotic />} />
                  <Route path="/products/toddler-tlc-starter-pack" element={<ProductToddlerTlcStarterPack />} />
                  <Route path="/products/:handle" element={<ProductRedirect />} />
                  <Route path="/pages/kde-behind-the-science-lp" element={<LandingBTS audience="kde" />} />
                  <Route path="/pages/tdk-behind-the-science-lp" element={<LandingBTS audience="tdk" />} />
                  <Route path="/pages/trmv-behind-the-science-lp" element={<LandingBTS audience="trmv" />} />
                  <Route path="/pages/bundle-builder-v2" element={<BundleBuilderV2 />} />
                  <Route path="/pages/bundle-quiz" element={<BundleQuiz />} />
                  <Route path="/explorations/all-in-1-bundle" element={<AllInOneBundle />} />
                  <Route path="/explorations/bundle-add-on" element={<BundleAddOn />} />
                  <Route path="/explorations/mixed-bundle-builder-quiz-v1" element={<MixedBundleBuilderQuizV1 />} />
                  <Route path="/explorations/mixed-bundle-builder-quiz-v1-3" element={<MixedBundleBuilderQuizV13 />} />
                  <Route path="/explorations/mixed-bundle-builder-quiz-v1-2" element={<MixedBundleBuilderQuizV12 />} />
                  <Route path="/explorations/mixed-bundle-builder-quiz-v2" element={<MixedBundleBuilderQuizV2 />} />
                  <Route path="/explorations/sesame-toddlers-probiotic" element={<SesameToddlersProbiotic />} />
                  <Route path="/explorations/sesame-toddlers-multi" element={<SesameToddlersMulti />} />
                  <Route path="/explorations/sesame-toddlers-bts" element={<SesameToddlersBts />} />
                  <Route path="/explorations/sesame-toddlers-bundle" element={<SesameToddlersBundle />} />
                  <Route path="/explorations/family-box-builder" element={<FamilyBoxBuilder />} />
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