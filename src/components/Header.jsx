import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
const links = [
  ["/", "Home"],
  ["/ram-prices", "RAM Prices"],
  ["/ram-prices/ddr4", "DDR4"],
  ["/ram-prices/ddr5", "DDR5"],
  ["/laptop-ram", "Laptop RAM"],
  ["/ram-guide", "RAM Guide"],
  ["/about", "About"],
];
export default function Header() {
  const [open, setOpen] = useState(false),
    [q, setQ] = useState("");
  const nav = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    if (q.trim()) nav(`/ram-prices?q=${encodeURIComponent(q)}`);
    setOpen(false);
  };
  return (
    <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
      <div className="container flex min-h-16 items-center gap-5">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          RAMCompare <small>India</small>
        </Link>
        <nav className="desktop-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <form onSubmit={submit} className="top-search">
          <label className="sr-only" htmlFor="site-search">
            Search RAM products
          </label>
          <input
            id="site-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search RAM"
          />
          <button aria-label="Search RAM">⌕</button>
        </form>
        <button
          className="menu"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="mobile-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </NavLink>
          ))}
          <form onSubmit={submit}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search RAM"
            />
            <button>Search</button>
          </form>
        </div>
      )}
    </header>
  );
}
