// ============================================================
// 🔐 認證佈局 (Auth Layout) — Layout Route（無 path）
// ============================================================
// 核心概念：Layout Route（佈局路由）
//   - 路由物件「沒有 path」，只有 Component
//   - 子路由的 URL 路徑不受影響（不會多出前綴）
//   - 作用：讓一群子路由共用相同的外層佈局
//
// 例如：
//   /login   → 渲染 AuthLayout，內部 <Outlet> 渲染 LoginPage
//   /register → 渲染 AuthLayout，內部 <Outlet> 渲染 RegisterPage
//
// 這樣 login 和 register 頁面共用了 AuthLayout 的白色卡片框架，
// 但 URL 不會變成 /auth/login，還是保持 /login。
// ============================================================

import { Outlet, Link } from "react-router";

export default function AuthLayout() {
  return (
    <div className="auth-wrapper">
      {/* 共用的認證頁面外框 */}
      <div className="auth-container">
        {/* 品牌 Logo */}
        <div className="auth-brand">
          <Link to="/">📚 書香書店</Link>
        </div>

        {/*
          <Outlet>：LoginPage 或 RegisterPage 會渲染在這裡
          URL 是 /login → 渲染 LoginPage
          URL 是 /register → 渲染 RegisterPage
        */}
        <Outlet />

        {/* 共用的切換連結 */}
        <div className="auth-switch">
          <Link to="/login">登入</Link>
          {" | "}
          <Link to="/register">註冊</Link>
        </div>
      </div>
    </div>
  );
}
