import CharacterCard from "./CharacterCard";

export default function CharacterList({
  characters,
  selectedId,
  onSelect,
  onAdd,
  onDelete,
}) {
  return (
    <aside className="panel sidebar">
      <div className="panel-title-row">
        <h2>캐릭터 목록</h2>
      </div>

      <button className="primary-button full" onClick={onAdd} type="button">
        + 캐릭터 추가
      </button>

      <div className="character-list">
        {characters.map((character) => (
          <div className="character-list-row" key={character.id}>
            <CharacterCard character={character} active={character.id === selectedId} onSelect={() => onSelect(character.id)} />
            <button className="delete-button" type="button" onClick={() => onDelete(character.id)} aria-label={`${character.name} 삭제`} >
              ×
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}
