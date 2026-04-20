// ============================================================
// 🛡️ 管理後台首頁 (Admin Page)
// ============================================================
// 核心概念 1：loader 中的 redirect（驗證權限）
//   - 在 loader 中檢查是否已登入
//   - 未登入則 redirect 到 /login
//   - 這是 React Router 中實作「受保護路由」的標準做法
//   - 使用者在 URL 輸入 /admin，loader 立刻檢查並轉向，
//     頁面元件完全不會被渲染
//
// 核心概念 2：lazy（懶加載）
//   - lazy 屬性讓路由的元件和 loader 在「需要時」才載入
//   - 減少初始載入的 bundle 大小
//   - 當使用者第一次訪問 /admin 時，才下載這份程式碼
//   - 在 router.tsx 中展示 lazy 的設定方式
// ============================================================

import { useLoaderData, Link, useNavigate } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { isLoggedIn, getUsername, logout } from "../data/auth";
import { getAllBooks } from "../data/books";
import type { Book } from "../data/books";
import { useEffect } from "react";

// -------- loader 函式（含權限驗證）--------
export async function adminLoader({ request: _request }: LoaderFunctionArgs) {
  // =====================================================
  // 🔐 在 loader 中用 redirect 保護路由
  // =====================================================
  // 如果未登入，立即 redirect 到登入頁面
  // 元件的渲染在 loader 完成前不會開始
  // 所以這個 redirect 會在任何 UI 顯示前就生效
  if (!isLoggedIn()) {
    return redirect("/login");
  }

  const books = await getAllBooks();
  const username = getUsername();

  return { books, username };
}

// -------- 元件 --------
export default function AdminPage() {
  const { books, username } = useLoaderData() as {
    books: Book[];
    username: string;
  };

  // =====================================================
  // 🕐 useNavigate：程式化導覽（不需使用者互動）
  // =====================================================
  // useNavigate 範例：閒置超時後自動登出
  // 真實應用可能是偵測 lastActivity 時間戳，
  // 這裡用 30 秒自動登出作為示範
  const navigate = useNavigate();

  useEffect(() => {
    // 設定 30 秒後自動登出（教學示範用，實際場景可調整）
    const timer = setTimeout(() => {
      const shouldLogout = window.confirm("⏰ 您已閒置一段時間，是否要登出？");
      if (shouldLogout) {
        logout();
        // useNavigate：程式化導向到首頁
        // 這是不需要使用者點擊連結就能導覽的方式
        navigate("/");
      }
    }, 30_000); // 30 秒

    return () => clearTimeout(timer);
  }, [navigate]);

  // 統計資料
  const totalBooks = books.length;
  const totalReviews = books.reduce((sum, b) => sum + b.reviews.length, 0);
  const avgPrice = Math.round(
    books.reduce((sum, b) => sum + b.price, 0) / totalBooks,
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>🛡️ 管理後台</h1>
        <p>歡迎回來，{username}！</p>
      </div>

      {/* 統計卡片 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalBooks}</div>
          <div className="stat-label">書籍總數</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalReviews}</div>
          <div className="stat-label">書評總數</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">NT$ {avgPrice}</div>
          <div className="stat-label">平均書價</div>
        </div>
      </div>

      {/* lazy 說明卡片 */}
      <div className="info-card highlight">
        <h3>💡 這個頁面使用了 lazy 懶加載</h3>
        <p>
          在 <code>router.tsx</code> 中，<code>/admin</code> 路由使用了{" "}
          <code>lazy</code> 屬性。 這表示這個元件的程式碼（包括
          loader）只有在使用者第一次訪問 <code>/admin</code> 時才會下載。
          對於大型應用，這可以顯著減少首次載入時間。
        </p>
      </div>

      {/* useNavigate 說明卡片 */}
      <div className="info-card">
        <h3>⏰ useNavigate 示範：自動登出</h3>
        <p>
          此頁面在 30 秒後會彈出確認對話框，模擬閒置超時自動登出的場景。 這是{" "}
          <code>useNavigate</code> 的典型使用案例：不需要使用者點擊，
          程式主動引導使用者導覽到其他頁面。
        </p>
      </div>

      {/* 書籍管理列表 */}
      <section>
        <div className="section-header">
          <h2>📚 書籍管理</h2>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>書名</th>
                <th>作者</th>
                <th>類型</th>
                <th>價格</th>
                <th>書評數</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.cover} {book.title}
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className="genre-badge">{book.genre}</span>
                  </td>
                  <td>NT$ {book.price}</td>
                  <td>💬 {book.reviews.length}</td>
                  <td>
                    <Link to={`/books/${book.id}`} className="btn btn-sm">
                      查看
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
