import { Link } from 'react-router-dom';

// Internal paths use the router (so the mock cart survives navigation); everything else is a plain <a>.
export default function SiteLink({ href = '#', children, ...rest }) {
  if (href.startsWith('/')) return <Link to={href} {...rest}>{children}</Link>;
  return <a href={href} {...rest}>{children}</a>;
}
