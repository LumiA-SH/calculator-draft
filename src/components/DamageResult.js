export default function DamageResult({ result }) {
  if (!result) {
    return (
      <div className="damage-result empty-result">
        <span>계산 결과가 여기에 표시됩니다.</span>
      </div>
    );
  }

  return (
    <div className={`damage-result ${result.critical ? "critical" : ""}`}>
      <span>{result.critical ? "CRITICAL!" : "최종 데미지"}</span>
      <strong>{result.damage}</strong>
      <small>
        {result.baseStat} × {result.multiplier}
        {result.critical ? " × 1.5" : ""}
      </small>
    </div>
  );
}
