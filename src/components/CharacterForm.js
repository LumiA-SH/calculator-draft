import { useEffect, useState } from "react";

const EMPTY_FORM = {
  name: "",
  image: "",
  description: "",
  level: 1,
  exp: 0,
  str: 10,
  dex: 10,
  int: 10,
  mag: 10,
};

export default function CharacterForm({
  mode = "add",
  character = null,
  onSubmit,
  onClose,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (mode === "edit" && character) {
      setForm({
        name: character.name || "",
        image: character.image || "",
        description: character.description || "",
        level: character.level ?? 1,
        exp: character.exp ?? 0,
        str: character.stats?.str ?? 0,
        dex: character.stats?.dex ?? 0,
        int: character.stats?.int ?? 0,
        mag: character.stats?.mag ?? 0,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [mode, character]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;

    onSubmit({
      name: form.name.trim(),
      image: form.image.trim(),
      description: form.description.trim(),
      level: Math.max(1, Number(form.level) || 1),
      exp: Math.max(0, Number(form.exp) || 0),
      stats: {
        str: Math.max(0, Number(form.str) || 0),
        dex: Math.max(0, Number(form.dex) || 0),
        int: Math.max(0, Number(form.int) || 0),
        mag: Math.max(0, Number(form.mag) || 0),
      },
    });
  };

  const isEdit = mode === "edit";

  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={handleSubmit}>
        <div className="panel-title-row">
          <h2>{isEdit ? "캐릭터 수정" : "캐릭터 추가"}</h2>
          <button className="icon-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        <label>
          캐릭터 이름
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="이름"
          />
        </label>

        <label>
          이미지 URL (선택)
          <input value={form.image} onChange={(e) => update("image", e.target.value)} placeholde />
        </label>

        <label>
          캐릭터 설명 (선택)
          <input value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="캐릭터 설명을 입력해주세요." />
        </label>

        <div className="form-grid">
          <label>
            레벨
            <input type="number" min="1" value={form.level} onChange={(e) => update("level", e.target.value)} />
          </label>

          <label>
            현재 EXP
            <input type="number" min="0" value={form.exp} onChange={(e) => update("exp", e.target.value)} />
          </label>
        </div>

        <div className="form-grid">
          {[
            ["str", "힘"],
            ["dex", "민첩"],
            ["int", "지능"],
            ["mag", "마력"],
          ].map(([key, label]) => (
            <label key={key}>
              {label}
              <input type="number" min="0" value={form[key]} onChange={(e) => update(key, e.target.value)} />
            </label>
          ))}
        </div>

        {isEdit && (
          <p className="helper-text">
            수동 수정은 현재 상태를 보정하는 기능이며, 레벨 변경 시 랜덤 스탯은 자동 배분되지 않습니다.
          </p>
        )}

        <div className="modal-actions">
          <button className="secondary-button" type="button" onClick={onClose}>
            취소
          </button>
          <button className="primary-button" type="submit">
            {isEdit ? "저장" : "추가"}
          </button>
        </div>
      </form>
    </div>
  );
}
