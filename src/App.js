import { useEffect, useMemo, useState } from "react";
import CharacterList from "./components/CharacterList";
import CharacterForm from "./components/CharacterForm";
import CharacterProfile from "./components/CharacterProfile";
import DamageCalculator from "./components/DamageCalculator";
import { getRequiredExp } from "./utils/exp";
import { addStatGain, distributeStats } from "./utils/levelUp";
import { loadData, saveData } from "./utils/storage";

const createCharacter = ({
                           name, image = "", description = "", level = 1, exp = 0, stats, }) => ({
  id:
      typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
  name,
  image,
  description,
  level,
  exp,
  stats,
  levelHistory: [],
  damageHistory: [],
});

const DEFAULT_CHARACTER = createCharacter({
  name: "테스트 캐릭터",
  image: "",
  description: "",
  level: 1,
  exp: 0,
  stats: { str: 10, dex: 10, int: 10, mag: 10 },
});

export default function App() {
  const saved = useMemo(() => loadData(), []);

  const [characters, setCharacters] = useState(
    saved?.characters?.length ? saved.characters : [DEFAULT_CHARACTER]
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState(
    saved?.selectedCharacterId ||
      saved?.characters?.[0]?.id ||
      DEFAULT_CHARACTER.id
  );

  const [formMode, setFormMode] = useState(null);

  const selectedCharacter =
    characters.find((character) => character.id === selectedCharacterId) ||
    characters[0];

  useEffect(() => {
    saveData({ characters, selectedCharacterId });
  }, [characters, selectedCharacterId]);

  const updateCharacter = (id, updater) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? updater(character) : character
      )
    );
  };

  const handleAddCharacter = (payload) => {
    const character = createCharacter(payload);
    setCharacters((prev) => [...prev, character]);
    setSelectedCharacterId(character.id);
    setFormMode(null);
  };

  const handleEditCharacter = (payload) => {
    if (!selectedCharacter) return;

    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      name: payload.name,
      image: payload.image,
      description: payload.description,
      level: payload.level,
      exp: payload.exp,
      stats: payload.stats,
    }));

    setFormMode(null);
  };

  const handleDeleteCharacter = (id) => {
    if (characters.length === 1) {
      alert("최소 1명의 캐릭터는 남겨두어야 합니다.");
      return;
    }

    const target = characters.find((character) => character.id === id);
    const ok = window.confirm(`${target?.name || "캐릭터"}를 삭제할까요?`);
    if (!ok) return;

    const nextCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(nextCharacters);

    if (selectedCharacterId === id) {
      setSelectedCharacterId(nextCharacters[0].id);
    }
  };

  const handleAddExp = (amount) => {
    if (!selectedCharacter) return;

    updateCharacter(selectedCharacter.id, (character) => {
      let level = character.level;
      let exp = character.exp + amount;
      let stats = { ...character.stats };
      const levelHistory = [...character.levelHistory];

      while (exp >= getRequiredExp(level)) {
        exp -= getRequiredExp(level);
        level += 1;

        const statGain = distributeStats(10);
        stats = addStatGain(stats, statGain);
        levelHistory.unshift({
          level,
          statGain,
          date: new Date().toISOString(),
        });
      }

      return {
        ...character,
        level,
        exp,
        stats,
        levelHistory,
      };
    });
  };

  const handleSaveDamage = (result) => {
    if (!selectedCharacter) return;

    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      damageHistory: [result, ...character.damageHistory].slice(0, 30),
    }));
  };

  if (!selectedCharacter) return null;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <span className="brand-mark">✦</span>
          <div>
            <strong>Party Calculator</strong>
            <small>우리의 이야기를, 더 재미있게.</small>
          </div>
        </div>

        <div className="topbar-note">로컬 자동 저장</div>
      </header>

      <div className="page-grid">
        <CharacterList
          characters={characters}
          selectedId={selectedCharacter.id}
          onSelect={setSelectedCharacterId}
          onAdd={() => setFormMode("add")}
          onDelete={handleDeleteCharacter}
        />

        <CharacterProfile
          character={selectedCharacter}
          onAddExp={handleAddExp}
          onEdit={() => setFormMode("edit")}
        />

        <DamageCalculator
          character={selectedCharacter}
          onSaveResult={handleSaveDamage}
        />
      </div>

      {formMode && (
        <CharacterForm
          mode={formMode}
          character={formMode === "edit" ? selectedCharacter : null}
          onSubmit={
            formMode === "edit"
              ? handleEditCharacter
              : handleAddCharacter
          }
          onClose={() => setFormMode(null)}
        />
      )}
    </div>
  );
}
