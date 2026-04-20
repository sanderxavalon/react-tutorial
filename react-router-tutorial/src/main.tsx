// ============================================================
// 🚀 應用程式入口點 (Entry Point)
// ============================================================
// React Router 的使用方式：
//   1. 建立 router 物件（在 router.tsx 中定義）
//   2. 用 <RouterProvider> 把 router 傳入，取代原本的 <App>
//
// RouterProvider 會接管整個頁面的導覽邏輯，
// 讓 React Router 知道「現在在哪個 URL」並渲染對應的元件。
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./router";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/*
      RouterProvider 是整個 React Router 應用的根元件。
      - router prop 接受由 createBrowserRouter 建立的路由設定
      - 所有路由、loader、action 都在 router 物件中定義
    */}
    <RouterProvider router={router} />
  </StrictMode>,
);
