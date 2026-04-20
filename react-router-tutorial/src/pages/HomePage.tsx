// ============================================================
// 🏡 首頁 (Home Page) — Index Route
// ============================================================
// 這是一個 Index Route（索引路由）。
//
// 核心概念：Index Route
//   - 設定 index: true，沒有 path
//   - 當父路由的 URL「完全符合」時，這個元件會渲染到父路由的 <Outlet>
//   - 類似「預設子頁面」的概念
//   - 例如：URL 是 "/" 時，RootLayout 的 <Outlet> 會渲染 HomePage
// ============================================================

import { Link } from "react-router";

export default function HomePage() {
  // 精選書籍（假資料，直接 hardcoded 在元件內）
  const featured = [
    {
      id: "1",
      title: "追風箏的孩子",
      author: "卡勒德·胡賽尼",
      cover: "📖",
      genre: "文學小說",
    },
    {
      id: "3",
      title: "人類大歷史",
      author: "哈拉瑞",
      cover: "🌍",
      genre: "歷史",
    },
    {
      id: "5",
      title: "原子習慣",
      author: "詹姆斯·克利爾",
      cover: "⚛️",
      genre: "自我成長",
    },
  ];

  return (
    <div className="page home-page">
      {/* 英雄區塊 */}
      <section className="hero">
        <h1>歡迎來到書香書店</h1>
        <p>探索知識的海洋，找到你的下一本好書</p>
        <div className="hero-actions">
          {/*
            <Link> vs <NavLink>：
            - 這裡不需要 active 狀態，只是一個普通連結，所以用 <Link>
            - <Link> 不會加上 active class
            - to prop 接受相對或絕對路徑
          */}
          <Link to="/books" className="btn btn-primary">
            瀏覽所有書籍
          </Link>
          <Link to="/genres" className="btn btn-outline">
            按類型瀏覽
          </Link>
        </div>
      </section>

      {/* 精選書籍 */}
      <section className="section">
        <h2>📌 精選書籍</h2>
        <div className="book-grid">
          {featured.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">{book.cover}</div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <span className="genre-badge">{book.genre}</span>
              </div>
              <div className="book-actions">
                {/*
                  動態路徑：/books/1, /books/3, /books/5
                  對應路由設定中的 path: "books/:bookId"
                  (:bookId 是動態參數，會從 URL 中解析出來)
                */}
                <Link to={`/books/${book.id}`} className="btn btn-sm">
                  查看詳情
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 功能介紹 */}
      <section className="section features">
        <h2>📚 本專案涵蓋的 React Router 概念</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🗺️ 路由設定</h3>
            <p>巢狀路由、Index Route、Layout Route、Prefix Route</p>
          </div>
          <div className="feature-card">
            <h3>📦 Route Object</h3>
            <p>loader、action、lazy 懶加載</p>
          </div>
          <div className="feature-card">
            <h3>🔄 資料載入</h3>
            <p>loader 函式搭配 useLoaderData</p>
          </div>
          <div className="feature-card">
            <h3>🧭 導覽方式</h3>
            <p>Link、NavLink、Form、redirect、useNavigate</p>
          </div>
        </div>
      </section>
    </div>
  );
}
