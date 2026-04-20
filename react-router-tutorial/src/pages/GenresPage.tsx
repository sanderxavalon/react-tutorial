// ============================================================
// 🏷️ 類型列表頁 (Genres Page) — Prefix Route 的 Index
// ============================================================
// 核心概念：Prefix Route（前綴路由）
//   - 路由設定中只有 path，沒有 Component
//   - 目的是讓一群子路由共用相同的路徑前綴
//   - 不會引入任何佈局元件（不像 Layout Route 有共用外框）
//
// 路由結構：
//   { path: "genres", children: [
//     { index: true, Component: GenresPage },   ← 這個頁面（/genres）
//     { path: ":genreId", Component: GenreDetailPage },  ← /genres/scifi 等
//   ]}
//
// /genres 和 /genres/:genreId 完全獨立渲染，不共用任何外框元件
// ============================================================

import { useLoaderData, Link } from "react-router";
import { getAllGenres } from "../data/genres";
import type { Genre } from "../data/genres";

// -------- loader 函式 --------
export async function genresLoader() {
  const genres = await getAllGenres();
  return { genres };
}

// -------- 元件 --------
export default function GenresPage() {
  const { genres } = useLoaderData() as { genres: Genre[] };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🏷️ 書籍類型</h1>
        <p>選擇你感興趣的類型，探索相關書籍</p>
      </div>

      <div className="genres-grid">
        {genres.map((genre) => (
          <div key={genre.id} className="genre-card">
            <div className="genre-icon">{genre.icon}</div>
            <h2>{genre.name}</h2>
            <p>{genre.description}</p>
            {/*
              /genres/literary
              /genres/scifi
              /genres/history
              等等...
            */}
            <Link to={`/genres/${genre.id}`} className="btn btn-outline">
              瀏覽 {genre.name} 書籍 →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
