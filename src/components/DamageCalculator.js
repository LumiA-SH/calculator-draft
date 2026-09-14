import { useState } from "react";
import { calculateDamage, CRITICAL_MULTIPLIER, CRITICAL_RATE } from "../utils/damage";
import DamageResult from "./DamageResult";
import DamageHistory from "./DamageHistory";

export default function DamageCalculator({ character, onSaveResult }) {
  const [type, setType] = useState("physical");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const next = calculateDamage({
      type,
      stats: character.stats,
    });

    setResult(next);
    onSaveResult(next);
  };

  const formula =
    type === "magic"
      ? "(지능 + 마력) × 2 ~ 3.5"
      : "(힘 + 민첩) × 2 ~ 3.5";

  return (
    <aside className="right-column">
      <section className="card damage-card">
        <div className="panel-title-row">
          <h2>데미지 계산</h2>
          <button
            type="button"
            className="secondary-button small"
            onClick={() => setResult(null)}
          >
            초기화
          </button>
        </div>

        <div className="tab-row">
          <button
            type="button"
            className={type === "physical" ? "active" : ""}
            onClick={() => setType("physical")}
          >
            물리 공격
          </button>
          <button
            type="button"
            className={type === "magic" ? "active" : ""}
            onClick={() => setType("magic")}
          >
            마법 공격
          </button>
        </div>

        <div className="formula-box">{formula}</div>

        <div className="damage-info-grid">
          <div>
            <span>기본 스탯 합</span>
            <strong>
              {type === "magic"
                ? character.stats.int + character.stats.mag
                : character.stats.str + character.stats.dex}
            </strong>
          </div>
          <div>
            <span>크리티컬</span>
            <strong>{CRITICAL_RATE * 100}%</strong>
          </div>
          <div>
            <span>크리 배율</span>
            <strong>{CRITICAL_MULTIPLIER}배</strong>
          </div>
        </div>

        <button
          type="button"
          className="primary-button full big"
          onClick={handleCalculate}
        >
          데미지 계산하기
        </button>

        <DamageResult result={result} />
      </section>

      <DamageHistory history={character.damageHistory} />
    </aside>
  );
}
