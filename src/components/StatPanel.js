const items = [
  ["str", "힘"],
  ["dex", "민첩"],
  ["int", "지능"],
  ["mag", "마력"],
];

export default function StatPanel({ stats }) {
  return (
    <section className="card">
      <h3>현재 스탯</h3>
      <div className="stat-grid">
        {items.map(([key, label]) => (
          <div className={`stat-box stat-${key}`} key={key}>
            <span>{label}</span>
            <strong>{stats[key]}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
