export default function CharacterCard({ character, active, onSelect }) {
  return (
    <button
      type="button"
      className={`character-card ${active ? "active" : ""}`}
      onClick={onSelect}
    >
      <div className="avatar">
        {character.image ? (
          <img src={character.image} alt="" />
        ) : (
          <span>{character.name?.slice(0, 1) || "?"}</span>
        )}
      </div>
      <div className="character-card-text">
        <strong>{character.name}</strong>
        <span>Lv. {character.level}</span>
      </div>
    </button>
  );
}
