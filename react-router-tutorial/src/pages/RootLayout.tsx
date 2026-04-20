// ============================================================
// 🏠 根佈局元件 (Root Layout)
// ============================================================
// 這是整個應用的最外層佈局，所有頁面都會在這個框架內渲染。
//
// 核心概念：
//   - <NavLink>：有「active 狀態」感知的導覽連結
//   - <Outlet>：子路由的渲染位置（類似插槽）
//   - 當 URL 變更時，<Outlet> 的內容會切換，但導覽列保持不變
// ============================================================

import { NavLink, Outlet, useNavigate } from "react-router";
import { isLoggedIn, logout, getUsername } from "../data/auth";

export default function RootLayout() {
  // useNavigate 用於程式化導覽（不需要使用者點擊）
  // 這裡用來實作「登出後跳轉到首頁」
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    // 登出後程式化導覽到首頁
    navigate("/");
  }

  const loggedIn = isLoggedIn();
  const username = getUsername();

  return (
    <div className="app">
      {/* ====================================================
          導覽列：使用 <NavLink> 而非 <Link>
          ====================================================
          NavLink 的特點：
          - 當連結指向「目前 URL」時，會自動加上 class="active"
          - 可用 CSS 的 a.active 設定高亮樣式
          - end prop：只有「完全符合」時才算 active
            （避免 "/" 在所有頁面都是 active）
      ==================================================== */}
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink to="/" end className="brand-link">
            📚 書香書店
          </NavLink>
        </div>

        <div className="navbar-links">
          {/* end prop：只有 path 完全是 "/" 時才 active */}
          <NavLink to="/" end>
            首頁
          </NavLink>

          {/* 沒有 end：只要 URL 以 /books 開頭就會是 active */}
          <NavLink to="/books">書單</NavLink>

          <NavLink to="/genres">類型</NavLink>

          {/*
            NavLink 的 className callback 寫法：
            可以根據 isActive / isPending 動態設定 class
          */}
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            搜尋
          </NavLink>
        </div>

        <div className="navbar-auth">
          {loggedIn ? (
            <>
              <span className="username">👤 {username}</span>
              <NavLink to="/admin" className="btn btn-outline">
                後台管理
              </NavLink>
              <button onClick={handleLogout} className="btn btn-outline">
                登出
              </button>
            </>
          ) : (
            <NavLink to="/login">登入</NavLink>
          )}
        </div>
      </nav>

      {/* ====================================================
          <Outlet>：子路由渲染的位置
          ====================================================
          當 URL 是 /books 時，<Outlet> 會渲染 BooksPage 元件。
          當 URL 是 /books/1 時，<Outlet> 會渲染 BookDetailPage 元件。
          導覽列始終顯示，只有 <Outlet> 的內容會改變。
      ==================================================== */}
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <p>📚 書香書店教學專案 — React Router 示範</p>
      </footer>
    </div>
  );
}
