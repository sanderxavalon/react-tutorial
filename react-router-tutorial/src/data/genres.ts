// ============================================================
// 📚 書籍類型假資料 (Genre Mock Data)
// ============================================================

export type Genre = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const genres: Genre[] = [
  {
    id: "literary",
    name: "文學小說",
    description: "探索人性深度的文學作品，以細膩的文字描繪情感與人生。",
    icon: "✍️",
  },
  {
    id: "scifi",
    name: "科幻小說",
    description: "以科學與想像力為基礎，描繪未來世界與宇宙探索的故事。",
    icon: "🚀",
  },
  {
    id: "history",
    name: "歷史",
    description: "重現過去的歷史事件，幫助我們理解人類文明的演進軌跡。",
    icon: "🏛️",
  },
  {
    id: "fantasy",
    name: "奇幻小說",
    description: "充滿魔法、神話與奇異世界的冒險故事。",
    icon: "🐉",
  },
  {
    id: "self-help",
    name: "自我成長",
    description: "幫助讀者建立良好習慣、提升思維與實現個人目標的實用書籍。",
    icon: "💡",
  },
];

export async function getAllGenres(): Promise<Genre[]> {
  return genres;
}

export async function getGenreById(id: string): Promise<Genre | undefined> {
  return genres.find((g) => g.id === id);
}
