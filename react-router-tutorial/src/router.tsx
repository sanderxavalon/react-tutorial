// ============================================================
// 🗺️ 路由設定 (Router Configuration)
// ============================================================
// 這是整個應用的路由地圖，所有 React Router 的核心概念都在這裡。
//
// 使用 createBrowserRouter 建立路由：
//   - 使用 HTML5 History API（URL 不帶 # 號）
//   - 接收一個路由物件陣列（Route Objects）
//   - 支援 loader、action 等資料功能
//
// 完整路由結構：
//   /                          → 首頁 (Index Route)
//   /books                     → 書單列表 (loader)
//   /books/:bookId             → 書籍詳情 (動態路由 + loader + action)
//   /genres                    → 類型列表 (Prefix Route, loader)
//   /genres/:genreId           → 類型詳情 (動態路由 + loader)
//   /login                     → 登入 (Layout Route, action + redirect)
//   /register                  → 註冊 (Layout Route, action)
//   /admin                     → 管理後台 (受保護路由 + lazy)
//   /*                         → 404 頁面 (Splat Route)
// ============================================================

import { createBrowserRouter } from "react-router";

// 佈局元件
import RootLayout from "./pages/RootLayout";
import AuthLayout from "./pages/AuthLayout";

// 頁面元件
import HomePage from "./pages/HomePage";
import BooksPage, { booksLoader } from "./pages/BooksPage";
import BookDetailPage, {
  bookDetailLoader,
  bookDetailAction,
} from "./pages/BookDetailPage";
import GenresPage, { genresLoader } from "./pages/GenresPage";
import GenreDetailPage, { genreDetailLoader } from "./pages/GenreDetailPage";
import LoginPage, { loginAction } from "./pages/LoginPage";
import RegisterPage, { registerAction } from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// ============================================================
// createBrowserRouter：建立路由器
// ============================================================
export const router = createBrowserRouter([
  // ==========================================================
  // 🏠 根路由（Root Route）
  // ==========================================================
  // - path: "/"：所有子路由的 URL 都以 "/" 為根
  // - Component: RootLayout：所有子頁面都在 RootLayout 的 <Outlet> 中渲染
  // - 這是「巢狀路由（Nested Routes）」的起點
  // ==========================================================
  {
    path: "/",
    Component: RootLayout,
    children: [
      // ========================================================
      // 📌 Index Route（索引路由）
      // ========================================================
      // index: true → 當 URL 完全符合父路由（"/"）時渲染
      // 不需要 path，因為它使用父路由的路徑
      // 類似「預設子頁面」的概念
      // ========================================================
      {
        index: true,
        Component: HomePage,
      },

      // ========================================================
      // 📚 書單路由群組
      // ========================================================
      // path: "books" → 完整路徑是 "/books"
      // 這個物件本身有 Component，子路由渲染在其 <Outlet> 中
      // 但這裡我們把書單和詳情設為獨立路由（不共用佈局）
      // ========================================================
      {
        path: "books",
        // loader：在頁面渲染前執行，準備資料
        // booksLoader 支援 ?q= 搜尋參數
        loader: booksLoader,
        Component: BooksPage,
      },
      {
        // 動態路由(Dynamic Segment)：:bookId 是參數
        // URL /books/1 → params.bookId = "1"
        // URL /books/abc → params.bookId = "abc"
        path: "books/:bookId",
        loader: bookDetailLoader, // 用 bookId 載入書籍資料
        action: bookDetailAction, // 處理新增書評的 POST 請求
        Component: BookDetailPage,
      },

      // ========================================================
      // 🏷️ Prefix Route（前綴路由）
      // ========================================================
      // 只有 path，沒有 Component！
      // 這個路由不渲染任何元件，只是給子路由加上 "genres/" 前綴
      // 子路由：/genres（index）和 /genres/:genreId（詳情）
      // 完全獨立渲染，不共用任何外框（這點和 Layout Route 不同）
      // ========================================================
      {
        path: "genres",
        children: [
          {
            // /genres 的 Index Route
            index: true,
            loader: genresLoader,
            Component: GenresPage,
          },
          {
            // /genres/:genreId（動態路由）
            path: ":genreId",
            loader: genreDetailLoader,
            Component: GenreDetailPage,
          },
        ],
      },

      // ========================================================
      // 🔐 Layout Route（佈局路由）— 認證頁面群組
      // ========================================================
      // 注意：這個物件「沒有 path」，只有 Component！
      // 效果：子路由使用自己的路徑（/login、/register），
      //       但都會渲染在 AuthLayout 的 <Outlet> 中
      // 這就是 Layout Route：共用 UI 外框，但不增加 URL 前綴
      // ========================================================
      {
        // ← 沒有 path！這就是 Layout Route 的關鍵
        Component: AuthLayout,
        children: [
          {
            path: "login",
            action: loginAction, // 處理登入表單送出
            Component: LoginPage,
          },
          {
            path: "register",
            action: registerAction, // 處理註冊表單送出
            Component: RegisterPage,
          },
        ],
      },

      // ========================================================
      // 🛡️ 受保護路由 + lazy（懶加載）
      // ========================================================
      // lazy 屬性：讓路由的元件和 loader 在「需要時」才載入
      //
      // 沒有 lazy 的問題：
      //   - 首次載入時，所有頁面的程式碼都一起下載
      //   - 對很少訪問的頁面（如後台）很浪費
      //
      // 有 lazy 的好處：
      //   - AdminPage 的程式碼只有在使用者「第一次」訪問 /admin 時才下載
      //   - 首次頁面載入更快
      //   - 使用 dynamic import()（ES Module 語法）
      // ========================================================
      {
        path: "admin",
        // lazy 是一個 async 函式，返回路由的屬性（Component、loader 等）
        // 第一次訪問這個路由時，React Router 才會執行這個函式
        lazy: async () => {
          // 用 dynamic import 動態載入模組
          // Vite/Webpack 會把 AdminPage 打包成獨立的 chunk 檔案
          const { default: Component, adminLoader: loader } =
            await import("./pages/AdminPage");
          // 返回 Component 和 loader，React Router 會自動使用它們
          return { Component, loader };
        },
      },

      // ========================================================
      // 🚫 Splat Route（萬用路由）— 404 頁面
      // ========================================================
      // path: "*"：匹配所有未被上方路由處理的 URL
      // 必須放在最後面，避免攔截到正常路由
      // 用 useParams() 的 ["*"] 可以取得使用者輸入的路徑
      // ========================================================
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);
