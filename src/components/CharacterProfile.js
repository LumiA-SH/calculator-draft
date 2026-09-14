import StatPanel from "./StatPanel";
import ExpPanel from "./ExpPanel";
import LevelHistory from "./LevelHistory";

export default function CharacterProfile({ character, onAddExp, onEdit }) {
  return (
    <main className="center-column">
      <section className="card profile-card">
        <div className="profile-avatar">
          {character.image ? (
            <img src={character.image} alt="" />
          ) : (
            <span>{character.name?.slice(0, 1) || "?"}</span>
          )}
        </div>

        <div className="profile-main">
          <span className="eyebrow">현재 캐릭터</span>
          <h1>{character.name}</h1>
            <p>
                {character.description || "캐릭터 설명이 없습니다."}
            </p>
        </div>

        <button type="button" className="secondary-button profile-edit-button" onClick={onEdit}>
          수정
        </button>
      </section>

      <StatPanel stats={character.stats} />
      <ExpPanel character={character} onAddExp={onAddExp} />
      <LevelHistory history={character.levelHistory} />
    </main>
  );
}
