export default function Filters({ filters, setFilters, products }) {
  const upd = (k, v) => setFilters({ ...filters, [k]: v });
  const brands = [...new Set(products.map((p) => p.brand))];
  return (
    <section className="filters" aria-label="Product filters">
      {[
        ["type", ["All", "DDR4", "DDR5"]],
        ["capacity", ["All", "8GB", "16GB", "32GB", "64GB"]],
        ["formFactor", ["All", "Laptop", "Desktop"]],
      ].map(([key, items]) => (
        <label key={key}>
          {key === "type"
            ? "RAM generation"
            : key === "formFactor"
              ? "Device"
              : "Capacity"}
          <select
            value={filters[key]}
            onChange={(e) => upd(key, e.target.value)}
          >
            {items.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      ))}
      <label>
        Brand
        <select
          value={filters.brand}
          onChange={(e) => upd("brand", e.target.value)}
        >
          <option>All</option>
          {brands.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </label>
      <label>
        Price range
        <select
          value={filters.range}
          onChange={(e) => upd("range", e.target.value)}
        >
          <option value="All">All prices</option>
          <option value="3000">Under ₹3,000</option>
          <option value="6000">Under ₹6,000</option>
          <option value="10000">Under ₹10,000</option>
        </select>
      </label>
    </section>
  );
}
