import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEO from "./components/SEO";
import Breadcrumbs from "./components/Breadcrumbs";
import ProductCard from "./components/ProductCard";
import Filters from "./components/Filters";
import PriceTable from "./components/PriceTable";
import FAQ from "./components/FAQ";
import ArticleCard from "./components/ArticleCard";
import { products } from "./data/products";
import { lowest, highest, average, money } from "./utils/priceUtils";

const faqs = [
  {
    q: "How much does DDR5 RAM cost?",
    a: "DDR5 pricing varies by capacity, speed, brand and availability. This prototype intentionally shows demo comparison values; check the retailer for a current final price.",
  },
  {
    q: "Is DDR4 still worth buying?",
    a: "DDR4 can be a sensible upgrade when your existing laptop or desktop motherboard supports it. Match the generation, form factor and supported speed.",
  },
  {
    q: "Is 8GB RAM good for a laptop?",
    a: "8GB can suit browsing, documents and light study work. More demanding multitasking, creative work or gaming often benefits from 16GB or more.",
  },
];
const categories = [
  ["DDR4 RAM", "/ram-prices/ddr4"],
  ["DDR5 RAM", "/ram-prices/ddr5"],
  ["8GB RAM", "/ram-prices/8gb"],
  ["16GB RAM", "/ram-prices/16gb"],
  ["32GB RAM", "/ram-prices/32gb"],
  ["64GB RAM", "/ram-prices/64gb"],
  ["Laptop RAM", "/laptop-ram"],
  ["Desktop RAM", "/ram-prices?device=Desktop"],
];
function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
function Home() {
  const nav = useNavigate(),
    [q, setQ] = useState("");
  return (
    <>
      <SEO
        title="RAM Price in India – Compare DDR4 & DDR5 RAM Prices"
        description="Compare sample DDR4 and DDR5 RAM prices across Indian stores. Filter by capacity, brand and laptop or desktop form factor."
        path="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "RAMCompare India",
          url: import.meta.env.VITE_SITE_URL || "http://localhost:5173",
        }}
      />
      <section className="hero">
        <div className="container">
          <p className="kicker">RAM PRICE RESEARCH FOR INDIA</p>
          <h1>RAM Price in India – Compare DDR4 & DDR5 RAM Prices</h1>
          <p>
            Compare RAM prices across popular Indian shopping websites. Find
            DDR4 and DDR5 memory by capacity, brand, device type and price.
          </p>
          <form
            className="hero-search"
            onSubmit={(e) => {
              e.preventDefault();
              nav(`/ram-prices?q=${q}`);
            }}
          >
            <label className="sr-only" htmlFor="hero-query">
              Search RAM
            </label>
            <input
              id="hero-query"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={"Search RAM, e.g. “16GB DDR5”"}
            />
            <button>Compare RAM Prices</button>
          </form>
          <small>
            Sample comparison data · prices are illustrative, not live.
          </small>
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <p className="kicker">BROWSE BY NEED</p>
            <h2>Find the right RAM category</h2>
          </div>
        </div>
        <div className="category-grid">
          {categories.map(([name, to]) => (
            <Link className="category" key={name} to={to}>
              <span>▦</span>
              {name}
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-head">
          <div>
            <p className="kicker">SAMPLE COMPARISON DATA</p>
            <h2>Popular RAM price comparisons</h2>
            <p>Illustrative prices for local demonstration only.</p>
          </div>
          <Link to="/ram-prices">View all RAM prices →</Link>
        </div>
        <div className="card-stack">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="soft-section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">RAM BUYING GUIDES</p>
              <h2>Understand your upgrade</h2>
            </div>
            <Link to="/ram-guide">Explore guides →</Link>
          </div>
          <div className="article-grid">
            <ArticleCard
              title="How Much Does RAM Cost in India?"
              text="A practical guide to comparing RAM without relying on unverified market claims."
              to="/ram-guide/how-much-does-ram-cost-in-india"
            />
            <ArticleCard
              title="DDR4 vs DDR5 RAM"
              text="Learn the compatibility and price considerations before choosing a memory generation."
              to="/ram-prices/ddr5"
            />
            <ArticleCard
              title="Is 8GB RAM Enough for a Laptop?"
              text="Match everyday workloads with the capacity your laptop can actually use."
              to="/laptop-ram"
            />
          </div>
        </div>
      </section>
      <section className="container section prose">
        <h2>Why compare RAM prices?</h2>
        <p>
          Retailer pages are useful for buying, but comparing listings, memory
          generation and form factors can take time. RAMCompare India is
          designed as a comparison-first research tool: review structured demo
          records, understand the technical basics, then visit a retailer to
          verify availability and price.
        </p>
      </section>
    </>
  );
}
function filtered(list, filters, q = "") {
  return list.filter(
    (p) =>
      Object.entries(filters).every(([k, v]) =>
        v === "All" || k === "range" ? true : p[k] === v,
      ) &&
      (!filters.range ||
        filters.range === "All" ||
        lowest(p) <= +filters.range) &&
      `${p.name} ${p.brand} ${p.type} ${p.capacity} ${p.formFactor}`
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
}
function RamPrices() {
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const [filters, setFilters] = useState({
    type: "All",
    capacity: "All",
    formFactor: params.get("device") || "All",
    brand: "All",
    range: "All",
  });
  const q = params.get("q") || "";
  const list = useMemo(() => filtered(products, filters, q), [filters, q]);
  return (
    <PageWrap
      title="RAM Prices in India – Compare RAM Prices"
      description="Browse sample RAM comparison records for India by DDR generation, capacity, brand, form factor and price."
      crumb="RAM Prices"
    >
      <h1>RAM Prices in India</h1>
      <p className="lead">
        Filter the sample dataset to research desktop and laptop RAM. Every
        displayed value is demo data, not a live retailer price.
      </p>
      <Filters filters={filters} setFilters={setFilters} products={products} />
      {list.length ? (
        <PriceTable products={list} />
      ) : (
        <div className="empty">
          <h2>No RAM products found.</h2>
          <p>Try another search or filter combination.</p>
        </div>
      )}
    </PageWrap>
  );
}
function Category() {
  const { kind } = useParams();
  const norm = kind.toUpperCase();
  const isDdr = ["DDR4", "DDR5"].includes(norm);
  const list = products.filter((p) =>
    isDdr ? p.type === norm : p.capacity === norm,
  );
  const keyword = isDdr
    ? `${norm.toLowerCase()} ram price`
    : `${kind} RAM price in India`;
  return (
    <PageWrap
      title={`${norm} RAM Price in India – Compare ${norm} RAM`}
      description={`Compare demo ${norm} RAM records by capacity, form factor and Indian retailer listings.`}
      crumb={`${norm} RAM`}
    >
      <h1>{norm} RAM Price in India</h1>
      <p className="lead">
        Explore sample {norm} memory comparisons. Confirm compatibility and
        final pricing on the retailer website before buying.
      </p>
      <div className="info-callout">
        <strong>Demo data notice:</strong> Values below are illustrative
        placeholders, structured to be replaced by a future prices API.
      </div>
      <PriceTable products={list} />
      <section className="prose section-tight">
        <h2>Choosing {norm} RAM</h2>
        <p>
          {isDdr
            ? `${norm} modules must match the memory generation supported by your device. Compare capacity, speed and desktop DIMM versus laptop SO-DIMM form factor before shopping.`
            : `A ${norm} module may be suitable depending on workload and motherboard or laptop limits. Compare single modules and kits carefully.`}
        </p>
        <h2>{keyword}</h2>
        <p>
          Use comparison pages as a starting point, then verify exact stock,
          warranty and final checkout price directly with the retailer.
        </p>
      </section>
      <FAQ items={faqs} />
    </PageWrap>
  );
}
function Laptop() {
  const list = products.filter((p) => p.formFactor === "Laptop");
  return (
    <PageWrap
      title="Laptop RAM Price in India – 8GB, 16GB & More"
      description="Compare sample laptop RAM listings and learn how DDR4 and DDR5 SO-DIMM memory differs."
      crumb="Laptop RAM"
    >
      <h1>Laptop RAM Price in India</h1>
      <p className="lead">
        Laptop memory uses compact SO-DIMM modules. Check your laptop manual for
        the supported generation, capacity and number of slots.
      </p>
      <PriceTable products={list} />
      <section className="prose section-tight">
        <h2>DDR4 and DDR5 laptop RAM</h2>
        <p>
          DDR4 and DDR5 laptop memory are physically and electrically different.
          They are not interchangeable, so identify the supported generation
          before comparing laptop RAM price options.
        </p>
        <h2>Choosing capacity</h2>
        <p>
          8GB is a starting point for everyday work; 16GB is a common
          multitasking target. Choose based on your applications and hardware
          limits, rather than price alone.
        </p>
      </section>
      <FAQ items={faqs} />
    </PageWrap>
  );
}
function Compare() {
  const { productSlug } = useParams();
  const p = products.find((x) => x.id === productSlug);
  if (!p) return <NotFound />;
  return (
    <PageWrap
      title={`${p.name} RAM Price Comparison`}
      description={`Compare illustrative retailer listings for ${p.name}.`}
      crumb="Comparison"
      last={p.name}
    >
      <h1>{p.name} RAM Price Comparison</h1>
      <p className="demo-badge">SAMPLE COMPARISON DATA · NOT LIVE PRICES</p>
      <section className="compare-hero">
        <div className="ram-art" aria-label={`${p.name} image placeholder`}>
          ▦
        </div>
        <div>
          <dl>
            <div>
              <dt>Brand</dt>
              <dd>{p.brand}</dd>
            </div>
            <div>
              <dt>Generation</dt>
              <dd>{p.type}</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{p.capacity}</dd>
            </div>
            <div>
              <dt>Speed</dt>
              <dd>{p.speed}</dd>
            </div>
            <div>
              <dt>Form factor</dt>
              <dd>{p.formFactor}</dd>
            </div>
          </dl>
        </div>
        <div className="stats">
          <span>
            Lowest price<strong>{money(lowest(p))}</strong>
          </span>
          <span>
            Highest price<strong>{money(highest(p))}</strong>
          </span>
          <span>
            Average price<strong>{money(average(p))}</strong>
          </span>
        </div>
      </section>
      <section className="section-tight">
        <h2>Price comparison</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Store</th>
                <th>Listed demo price</th>
                <th>Updated</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {p.prices.map((x) => (
                <tr key={x.store}>
                  <td>{x.store}</td>
                  <td className={x.price === lowest(p) ? "lowest" : ""}>
                    {money(x.price)}{" "}
                    {x.price === lowest(p) && <small>Lowest</small>}
                  </td>
                  <td>{p.lastUpdated}</td>
                  <td>
                    <a
                      href={x.url}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                    >
                      View product ↗
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageWrap>
  );
}
function Guide() {
  return (
    <PageWrap
      title="RAM Guide – Buying Advice and Price Research"
      description="Useful RAM buying information for Indian laptop and desktop upgrades."
      crumb="RAM Guide"
    >
      <h1>RAM buying guides</h1>
      <p className="lead">
        Short, practical guides for choosing compatible memory and researching
        prices responsibly.
      </p>
      <div className="article-grid guide-grid">
        <ArticleCard
          title="How Much Does RAM Cost in India?"
          text="A detailed DDR4 and DDR5 price research guide with no fabricated market claims."
          to="/ram-guide/how-much-does-ram-cost-in-india"
        />
        <ArticleCard
          title="DDR4 vs DDR5 RAM: Which Should You Buy?"
          text="Compare generation compatibility, performance needs and budget considerations."
          to="/ram-prices/ddr5"
        />
        <ArticleCard
          title="Is 8GB RAM Enough for a Laptop?"
          text="Capacity guidance for study, work and everyday laptop tasks."
          to="/laptop-ram"
        />
        <ArticleCard
          title="How Much Does 32GB RAM Cost?"
          text="Understand why capacity, speed and kits affect the final listing price."
          to="/ram-prices/32gb"
        />
        <ArticleCard
          title="Why Is DDR5 RAM More Expensive?"
          text="Look at platform compatibility and product positioning before comparing offers."
          to="/ram-prices/ddr5"
        />
      </div>
    </PageWrap>
  );
}
function Article() {
  return (
    <PageWrap
      title="How Much Does RAM Cost in India? DDR4 & DDR5 Price Guide"
      description="A practical, non-speculative guide to researching DDR4 and DDR5 RAM prices in India."
      crumb="RAM Guide"
      last="How Much Does RAM Cost in India?"
    >
      <article className="prose article">
        <p className="kicker">RAM PRICE GUIDE INDIA</p>
        <h1>How Much Does RAM Cost in India?</h1>
        <p className="lead">
          RAM cost depends on capacity, DDR generation, speed, form factor,
          brand, retailer inventory and whether you are comparing a single
          module or a kit. This guide helps you research options without
          presenting unverified market statistics as fact.
        </p>
        <h2>DDR4 pricing</h2>
        <p>
          DDR4 remains common in established laptops and desktop platforms.
          Compare the same capacity and form factor across retailers, then check
          whether the module is compatible with your device.
        </p>
        <h2>DDR5 pricing</h2>
        <p>
          DDR5 is used by newer platforms. Listings may vary based on speed,
          capacity, heat spreaders and availability. A lower price only matters
          if the module works with your motherboard or laptop.
        </p>
        <h2>8GB, 16GB, 32GB and 64GB RAM</h2>
        <p>
          8GB suits light everyday use; 16GB is a popular general-purpose step
          up; 32GB can help heavier multitasking and creation workflows; 64GB is
          generally chosen for demanding specialist work. Needs vary by device
          and software.
        </p>
        <h2>Laptop and desktop memory</h2>
        <p>
          Laptops usually require SO-DIMM memory, while desktops commonly use
          full-sized DIMMs. These form factors cannot be swapped. Confirm your
          manufacturer documentation before ordering.
        </p>
        <h2>What affects RAM price?</h2>
        <p>
          Capacity, generation, memory speed, kit configuration, brand support,
          supply, retailer discounts and warranty terms all affect a listed
          price. Always compare like-for-like specifications.
        </p>
        <h2>How to compare RAM prices</h2>
        <ol>
          <li>Identify DDR4 or DDR5 support.</li>
          <li>Confirm the correct laptop or desktop form factor.</li>
          <li>Choose a capacity suited to your use.</li>
          <li>
            Compare matching specifications, then check final retailer price and
            policy.
          </li>
        </ol>
        <p>
          See the <Link to="/ram-prices/ddr4">DDR4 RAM comparison</Link>,{" "}
          <Link to="/ram-prices/ddr5">DDR5 RAM comparison</Link> and{" "}
          <Link to="/laptop-ram">laptop RAM guide</Link> for structured sample
          records.
        </p>
      </article>
      <FAQ items={faqs} />
    </PageWrap>
  );
}
function About() {
  return (
    <PageWrap
      title="About RAMCompare India"
      description="Learn how RAMCompare India helps visitors research memory upgrades and retailer listings."
      crumb="About"
    >
      <article className="prose">
        <h1>About RAMCompare India</h1>
        <p>
          RAMCompare India is an SEO-focused student prototype for researching
          RAM prices and memory upgrades in the Indian market. It is a price
          comparison and shopping discovery platform, not an online store.
        </p>
        <h2>How it helps</h2>
        <p>
          Visitors can browse memory by generation, capacity and device type,
          then compare structured retailer records before leaving for an
          external shopping website.
        </p>
        <h2>Price information</h2>
        <p>
          This version uses clearly labelled demo data. In a future version, a
          verified source or API can replace it. Always verify stock,
          compatibility, final price and seller terms at the retailer before
          purchase.
        </p>
      </article>
    </PageWrap>
  );
}
function PageWrap({ title, description, crumb, last, children }) {
  return (
    <>
      <SEO title={title} description={description} />
      <div className="container page">
        <Breadcrumbs
          items={[
            { label: crumb, to: last ? undefined : undefined },
            ...(last ? [{ label: last }] : []),
          ]}
        />
        {children}
      </div>
    </>
  );
}
function NotFound() {
  return (
    <PageWrap
      title="Page Not Found"
      description="The requested page could not be found."
    >
      <div className="empty">
        <h1>Page not found</h1>
        <p>The page you requested does not exist.</p>
        <Link className="button" to="/">
          Go home
        </Link>
      </div>
    </PageWrap>
  );
}
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ram-prices" element={<RamPrices />} />
        <Route path="/ram-prices/:kind" element={<Category />} />
        <Route path="/laptop-ram" element={<Laptop />} />
        <Route path="/compare/:productSlug" element={<Compare />} />
        <Route path="/ram-guide" element={<Guide />} />
        <Route
          path="/ram-guide/how-much-does-ram-cost-in-india"
          element={<Article />}
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
