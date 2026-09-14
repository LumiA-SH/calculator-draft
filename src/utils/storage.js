const STORAGE_KEY = "partyCalculator";

export const loadData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("저장 데이터를 불러오지 못했습니다.", error);
    return null;
  }
};

export const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("저장 데이터를 기록하지 못했습니다.", error);
  }
};
