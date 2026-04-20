// ============================================================
// 📚 書籍假資料 (Mock Data)
// ============================================================
// 在真實應用中，這些資料會從後端 API 取得。
// 教學目的使用 hardcoded 假資料，讓同學專注在路由邏輯，
// 不需要架設後端伺服器。

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  genreId: string;
  year: number;
  price: number;
  description: string;
  cover: string; // emoji 代替圖片
  reviews: Review[];
};

export type Review = {
  id: string;
  author: string;
  content: string;
  rating: number;
};

// 模擬延遲的工具函式 — 讓 loader 效果更明顯
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// 書籍清單假資料
const books: Book[] = [
  {
    id: "1",
    title: "追風箏的孩子",
    author: "卡勒德·胡賽尼",
    genre: "文學小說",
    genreId: "literary",
    year: 2003,
    price: 320,
    description:
      "一個關於友誼、背叛與救贖的故事，背景設於阿富汗。主角阿米爾與僕人哈山之間的羈絆，跨越時代與戰火，最終尋求心靈的和解。",
    cover: "📖",
    reviews: [
      {
        id: "r1",
        author: "小明",
        content: "非常感人，看到後半段淚流不止。",
        rating: 5,
      },
      {
        id: "r2",
        author: "小華",
        content: "文字流暢，故事結構扎實。",
        rating: 4,
      },
    ],
  },
  {
    id: "2",
    title: "1984",
    author: "喬治·歐威爾",
    genre: "科幻小說",
    genreId: "scifi",
    year: 1949,
    price: 280,
    description:
      "反烏托邦經典之作。在老大哥的監視下，溫斯頓試圖抵抗極權統治。這本書對自由、真相與權力的探討至今仍震撼人心。",
    cover: "👁️",
    reviews: [
      {
        id: "r3",
        author: "阿美",
        content: "讀完讓我重新思考現代社會的意義。",
        rating: 5,
      },
    ],
  },
  {
    id: "3",
    title: "人類大歷史",
    author: "哈拉瑞",
    genre: "歷史",
    genreId: "history",
    year: 2011,
    price: 450,
    description:
      "從石器時代到21世紀，用宏觀的視角重新解讀人類的發展歷程。哈拉瑞以生動的敘述解答：我們是誰？我們從哪裡來？",
    cover: "🌍",
    reviews: [
      { id: "r4", author: "大雄", content: "觀點獨到，開拓視野。", rating: 5 },
      {
        id: "r5",
        author: "靜香",
        content: "某些觀點過於大膽，但整體精彩。",
        rating: 4,
      },
    ],
  },
  {
    id: "4",
    title: "哈利波特：神秘的魔法石",
    author: "J.K. 羅琳",
    genre: "奇幻小說",
    genreId: "fantasy",
    year: 1997,
    price: 360,
    description:
      "年幼的哈利波特發現自己是巫師，踏入霍格華茲魔法學校。與佛地魔的對抗從此開始，一個跨越七部的傳奇故事序章。",
    cover: "🧙",
    reviews: [
      { id: "r6", author: "小新", content: "永遠的童年經典！", rating: 5 },
    ],
  },
  {
    id: "5",
    title: "原子習慣",
    author: "詹姆斯·克利爾",
    genre: "自我成長",
    genreId: "self-help",
    year: 2018,
    price: 380,
    description:
      "用 1% 的進步累積巨大改變。書中提供了一套科學化的習慣養成系統，幫助你建立好習慣、打破壞習慣，實現長遠目標。",
    cover: "⚛️",
    reviews: [
      {
        id: "r7",
        author: "阿志",
        content: "立刻改變了我的日常作息！",
        rating: 5,
      },
      { id: "r8", author: "小芬", content: "觀念簡單但很實用。", rating: 4 },
    ],
  },
  {
    id: "6",
    title: "三體",
    author: "劉慈欣",
    genre: "科幻小說",
    genreId: "scifi",
    year: 2008,
    price: 420,
    description:
      "中國科幻的里程碑。地球文明與三體文明的首次接觸，引發宇宙尺度的黑暗森林理論。宏大的宇宙觀令人歎為觀止。",
    cover: "🌌",
    reviews: [
      { id: "r9", author: "老王", content: "亞洲科幻的巔峰之作。", rating: 5 },
    ],
  },
];

// -------- 模擬 API 函式 --------

// 取得所有書籍
export async function getAllBooks(): Promise<Book[]> {
  await delay(300); // 模擬網路延遲
  return books;
}

// 用 ID 取得單本書籍
export async function getBookById(id: string): Promise<Book | undefined> {
  await delay(200);
  return books.find((b) => b.id === id);
}

// 用類型 ID 篩選書籍
export async function getBooksByGenre(genreId: string): Promise<Book[]> {
  await delay(200);
  return books.filter((b) => b.genreId === genreId);
}

// 搜尋書籍（書名或作者）
export async function searchBooks(query: string): Promise<Book[]> {
  await delay(200);
  const q = query.toLowerCase();
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q),
  );
}

// 新增書評（模擬：直接修改記憶體中的資料）
export async function addReview(
  bookId: string,
  review: Omit<Review, "id">,
): Promise<Book | undefined> {
  await delay(300);
  const book = books.find((b) => b.id === bookId);
  if (!book) return undefined;
  const newReview: Review = {
    ...review,
    id: `r${Date.now()}`,
  };
  book.reviews.push(newReview);
  return book;
}
