import { Link } from "react-router-dom";
export default function ArticleCard({ title, text, to }) {
  return (
    <article className="article-card">
      <p className="eyebrow">RAM BUYING GUIDE</p>
      <h3>
        <Link to={to}>{title}</Link>
      </h3>
      <p>{text}</p>
      <Link to={to}>Read guide →</Link>
    </article>
  );
}
