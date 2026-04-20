// ============================================================
// 🚫 404 找不到頁面 (Not Found Page) — Splat Route
// ============================================================
// 核心概念：Splat（萬用路由）
//   - 路徑設定為 "*"（星號）
//   - 當 URL 不符合任何已定義的路由時，就會渲染這個元件
//   - 也稱為 "catch-all" 或 "wildcard" 路由
//   - 用 useParams() 可以取得 "*" 參數，知道使用者輸入了什麼路徑
//
// 在路由設定中要放在最後面，避免攔截到正常路由
// ============================================================

import { Link, useParams } from "react-router";

export default function NotFoundPage() {
  // 取得萬用符號匹配到的路徑片段
  // 如果使用者輸入 /abc/def，params["*"] 就是 "abc/def"
  const params = useParams();
  const attemptedPath = params["*"];

  return (
    <div className="page not-found-page">
      <div className="not-found-content">
        <div className="not-found-emoji">🔍</div>
        <h1>404 — 找不到頁面</h1>
        <p>
          您嘗試訪問的路徑 <code>/{attemptedPath}</code> 不存在。
        </p>

        <div className="not-found-hint">
          <h3>可能的原因：</h3>
          <ul>
            <li>網址輸入錯誤</li>
            <li>該頁面已被移除</li>
            <li>連結已失效</li>
          </ul>
        </div>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            回到首頁
          </Link>
          <Link to="/books" className="btn btn-outline">
            瀏覽書單
          </Link>
        </div>
      </div>
    </div>
  );
}
