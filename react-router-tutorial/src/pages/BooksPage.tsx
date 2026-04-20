// ============================================================
// 📋 書單列表頁 (Books Page)
// ============================================================
// 核心概念 1：loader（資料載入函式）
//   - loader 是一個 async 函式，在頁面渲染「之前」執行
//   - 它的返回值可以在元件中用 useLoaderData() 取得
//   - 使用者在 URL 間切換時，React Router 會先呼叫 loader，
//     等 loader 完成後才渲染元件（確保資料已備妥）
//
// 核心概念 2：useLoaderData
//   - 元件不需要自己 useEffect + fetch 資料
//   - 直接呼叫 useLoaderData() 就能拿到 loader 返回的資料
//
// 注意：loader 函式「不是」React 元件，不能用 hooks。
//       它在路由設定中被定義，和 Component 並列。
// ============================================================

import { useLoaderData, Link, Form } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getAllBooks, searchBooks } from "../data/books";
import type { Book } from "../data/books";

// -------- loader 函式 --------
// 這個函式會被放在路由設定的 loader 屬性中。
// 參數 { request } 包含目前請求的資訊，例如 URL、headers 等。
export async function booksLoader({ request }: LoaderFunctionArgs) {
  // 從 URL 取得搜尋參數（例如 /books?q=三體 → q = "三體"）
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";

  // 根據有無搜尋關鍵字決定要呼叫哪個函式
  const books = query ? await searchBooks(query) : await getAllBooks();

  // loader 的返回值可以是任何值，這裡回傳物件
  // 元件中用 useLoaderData() 就能拿到 { books, query }
  return { books, query };
}

// -------- 元件 --------
export default function BooksPage() {
  // useLoaderData() 自動取得 loader 函式的返回值
  // 不需要 useState + useEffect，資料已由 React Router 準備好了
  const { books, query } = useLoaderData() as { books: Book[]; query: string };

  return (
    <div className="page">
      <div className="page-header">
        <h1>📚 所有書籍</h1>
        <p>共 {books.length} 本書</p>
      </div>

      {/* ================================================
          <Form> 搜尋（GET 方式）
          ================================================
          React Router 的 <Form> 元件：
          - 沒有指定 method（預設是 GET）時，
            表單送出會把欄位值加到 URL 的 query string
          - 例如輸入「三體」後送出 → URL 變成 /books?q=三體
          - URL 變更會觸發 loader 重新執行，自動載入搜尋結果
          - 不需要 onSubmit handler！React Router 全部處理好了

          action prop：表單要送往的路徑（預設是目前頁面）
      ================================================ */}
      <Form action="/books" className="search-form">
        <input
          type="text"
          name="q"
          placeholder="搜尋書名或作者..."
          defaultValue={query}
          className="search-input"
        />
        <button type="submit" className="btn btn-primary">
          搜尋
        </button>
        {query && (
          <Link to="/books" className="btn btn-outline">
            清除搜尋
          </Link>
        )}
      </Form>

      {/* 搜尋結果提示 */}
      {query && (
        <p className="search-hint">
          搜尋「<strong>{query}</strong>」的結果：找到 {books.length} 筆
        </p>
      )}

      {/* 書籍列表 */}
      {books.length === 0 ? (
        <div className="empty-state">
          <p>😔 找不到相關書籍</p>
          <Link to="/books" className="btn btn-outline">
            查看全部書籍
          </Link>
        </div>
      ) : (
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-cover">{book.cover}</div>
              <div className="book-info">
                <h3>{book.title}</h3>
                <p className="author">✍️ {book.author}</p>
                <p className="book-year">📅 {book.year} 年</p>
                <span className="genre-badge">{book.genre}</span>
              </div>
              <div className="book-meta">
                <span className="price">NT$ {book.price}</span>
                <span className="reviews-count">
                  💬 {book.reviews.length} 則書評
                </span>
              </div>
              <div className="book-actions">
                {/*
                  動態路由連結 /books/:bookId
                  to={`/books/${book.id}`} 會導向到書籍詳情頁
                */}
                <Link
                  to={`/books/${book.id}`}
                  className="btn btn-sm btn-primary"
                >
                  查看詳情 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
