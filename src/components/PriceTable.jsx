import { Link } from "react-router-dom";
import { lowest, money } from "../utils/priceUtils";
export default function PriceTable({ products, compact = false }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Brand</th>
            <th>{compact ? "Lowest price" : "Store"}</th>
            <th>{compact ? "Stores" : "Price"}</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) =>
            compact ? (
              <tr key={p.id}>
                <td>
                  <Link to={`/compare/${p.id}`}>{p.name}</Link>
                </td>
                <td>{p.type}</td>
                <td>{p.capacity}</td>
                <td>{p.brand}</td>
                <td className="lowest">{money(lowest(p))}</td>
                <td>{p.prices.length}</td>
                <td>
                  <Link to={`/compare/${p.id}`}>Compare →</Link>
                </td>
              </tr>
            ) : (
              p.prices.map((price, i) => (
                <tr key={`${p.id}-${price.store}`}>
                  <td>
                    {i === 0 ? (
                      <Link to={`/compare/${p.id}`}>{p.name}</Link>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{i === 0 ? p.type : ""}</td>
                  <td>{i === 0 ? p.capacity : ""}</td>
                  <td>{i === 0 ? p.brand : ""}</td>
                  <td>{price.store}</td>
                  <td className={price.price === lowest(p) ? "lowest" : ""}>
                    {money(price.price)}
                  </td>
                  <td>
                    <a
                      href={price.url}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                    >
                      View ↗
                    </a>
                  </td>
                </tr>
              ))
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
