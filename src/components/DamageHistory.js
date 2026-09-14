export default function DamageHistory({ history }) {
  return (
    <section className="card">
      <h3>최근 계산 기록</h3>

      {history.length === 0 ? (
        <p className="empty-text">아직 계산 기록이 없습니다.</p>
      ) : (
        <div className="damage-history">
          {history.slice(0, 10).map((item, index) => (
            <div className="damage-history-row" key={`${item.date}-${index}`}>
              <span>{item.type === "magic" ? "마법 공격" : "물리 공격"}</span>
              <strong className={item.critical ? "critical-text" : ""}>
                {item.damage}
                {item.critical ? " (CRIT)" : ""}
              </strong>
              <small>{new Date(item.date).toLocaleTimeString("ko-KR")}</small>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
