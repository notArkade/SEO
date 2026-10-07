export default function FAQ({ items }) {
  return (
    <section className="faq">
      <h2>Frequently asked questions</h2>
      {items.map((x) => (
        <details key={x.q}>
          <summary>{x.q}</summary>
          <p>{x.a}</p>
        </details>
      ))}
    </section>
  );
}
