import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <p className="logo">
            RAMCompare <small>India</small>
          </p>
          <p>Compare RAM prices across India before you visit a retailer.</p>
        </div>
        <div>
          <strong>Compare</strong>
          <Link to="/ram-prices">RAM Prices</Link>
          <Link to="/ram-prices/ddr4">DDR4 RAM</Link>
          <Link to="/ram-prices/ddr5">DDR5 RAM</Link>
        </div>
        <div>
          <strong>Learn</strong>
          <Link to="/laptop-ram">Laptop RAM</Link>
          <Link to="/ram-guide">RAM Guide</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
      <div className="container footer-note">
        Prices may change. Always verify the final price on the retailer
        website. <span>© 2026 RAMCompare India · Privacy placeholder</span>
      </div>
    </footer>
  );
}
