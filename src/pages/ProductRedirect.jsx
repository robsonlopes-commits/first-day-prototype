import { Navigate, useParams } from 'react-router-dom';
import { pdpPathForHandle } from '../lib/productRoutes.js';

// /products/<any other handle>: only two PDP designs exist, so route by product type (see lib/productRoutes.js).
export default function ProductRedirect() {
  const { handle } = useParams();
  return <Navigate to={pdpPathForHandle(handle)} replace />;
}
