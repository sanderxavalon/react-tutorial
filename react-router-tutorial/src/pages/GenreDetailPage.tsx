// ============================================================
// 🏷️ 類型詳情頁 (Genre Detail Page)
// ============================================================
// 核心概念：動態路由 + loader 搭配 params
//   - 路徑：genres/:genreId
//   - params.genreId 會是 URL 中的類型 ID（如 "scifi"）
//   - loader 用 genreId 同時載入類型資訊與該類型的書籍
//   - 展示如何在一個 loader 中做「多個資料來源」的平行載入
// ============================================================

import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { getGenreById } from "../data/genres";
import { getBooksByGenre } from "../data/books";
import type { Genre } from "../data/genres";
import type { Book } from "../data/books";

// -------- loader 函式 --------
export async function genreDetailLoader({ params }: LoaderFunctionArgs) {
  const genreId = params.genreId as string;

  // Promise.all：同時發出兩個請求，不需要等第一個完成才發第二個
  // 這是效能優化的最佳實踐
  const [genre, books] = await Promise.all([
    getGenreById(genreId),
    getBooksByGenre(genreId),
  ]);

  if (!genre) {
    throw new Response("找不到這個類型", { status: 404 });
  }

  return { genre, books };
}

// -------- 元件 --------
export default function GenreDetailPage() {
  const { genre, books } = useLoaderData() as { genre: Genre; books: Book[] };

  return (
    <div className="page">
      {/* 麵包屑 */}
      <nav className="breadcrumb">
        <Link to="/">首頁</Link>
        {" > "}
        <Link to="/genres">類型</Link>
        {" > "}
        <span>{genre.name}</span>
      </nav>

      {/* 類型標題 */}
      <div className="genre-header">
        <div className="genre-icon-large">{genre.icon}</div>
        <div>
          <h1>{genre.name}</h1>
          <p>{genre.description}</p>
          <p className="genre-count">共 {books.length} 本書</p>
        </div>
      </div>

      {/* 該類型的書籍列表 */}
      {books.length === 0 ? (
        <div className="empty-state">
          <p>😔 這個類型目前沒有書籍</p>
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
              </div>
              <div className="book-meta">
                <span className="price">NT$ {book.price}</span>
              </div>
              <div className="book-actions">
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

      <div style={{ marginTop: "2rem" }}>
        <Link to="/genres" className="btn btn-outline">
          ← 回到類型列表
        </Link>
      </div>
    </div>
  );
}
