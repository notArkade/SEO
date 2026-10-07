import { Link } from "react-router-dom";
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((x) => (
        <span key={x.label}>
          / {x.to ? <Link to={x.to}>{x.label}</Link> : x.label}
        </span>
      ))}
    </nav>
  );
}
