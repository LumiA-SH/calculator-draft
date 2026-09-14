export default function LevelHistory({ history }) {
  return (
    <section className="card">
      <h3>레벨업 기록</h3>

      {history.length === 0 ? (
        <p className="empty-text">아직 레벨업 기록이 없습니다.</p>
      ) : (
        <div className="history-list">
          {history.slice(0, 8).map((item, index) => (
            <div className="history-item" key={`${item.date}-${index}`}>
              <div>
                <strong>Lv. {item.level} 달성</strong>
                <span>{new Date(item.date).toLocaleString("ko-KR")}</span>
              </div>
              <p>
                힘 +{item.statGain.str} / 민첩 +{item.statGain.dex} / 지능 +
                {item.statGain.int} / 마력 +{item.statGain.mag}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
