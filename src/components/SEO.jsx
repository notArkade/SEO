import { useEffect } from "react";
const site = import.meta.env.VITE_SITE_URL || "http://localhost:5173";
export default function SEO({ title, description, path = "", schema }) {
  useEffect(() => {
    document.title = `${title} | RAMCompare India`;
    const set = (name, content) => {
      let el =
        document.querySelector(`meta[name="${name}"]`) ||
        document.querySelector(`meta[property="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(name.startsWith("og:") ? "property" : "name", name);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    set("description", description);
    set("og:title", title);
    set("og:description", description);
    let c = document.querySelector('link[rel="canonical"]');
    if (!c) {
      c = document.createElement("link");
      c.rel = "canonical";
      document.head.appendChild(c);
    }
    c.href = `${site}${path}`;
  }, [title, description, path]);
  return schema ? (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  ) : null;
}
