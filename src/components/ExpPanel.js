import { useState } from "react";
import { getExpProgress } from "../utils/exp";

export default function ExpPanel({ character, onAddExp }) {
  const [value, setValue] = useState("");
  const progress = getExpProgress(character.level, character.exp);

  const submit = (event) => {
    event.preventDefault();
    const amount = Number(value);
    if (!amount || amount <= 0) return;
    onAddExp(amount);
    setValue("");
  };

  return (
    <section className="card">
      <h3>경험치 관리</h3>

      <div className="level-line">
        <strong>Lv. {character.level}</strong>
        <span>
          {character.exp.toLocaleString()} / {progress.required.toLocaleString()} EXP
        </span>
      </div>

      <div className="progress-track">
        <div className="progress-bar" style={{ width: `${progress.percent}%` }} />
      </div>

      <div className="progress-meta">
        <span>다음 레벨까지 {progress.remaining.toLocaleString()} EXP</span>
        <span>{progress.percent}%</span>
      </div>

      <form className="exp-form" onSubmit={submit}>
        <input type="number" min="1" value={value} onChange={(e) => setValue(e.target.value)} placeholder="획득 경험치 입력" />
        <button className="primary-button" type="submit">
          추가
        </button>
      </form>

      <p className="helper-text">
        레벨업 시 힘 / 민첩 / 지능 / 마력에 총 10포인트가 랜덤 분배됩니다.
      </p>
    </section>
  );
}
