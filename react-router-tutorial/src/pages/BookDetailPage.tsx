// ============================================================
// 📖 書籍詳情頁 (Book Detail Page)
// ============================================================
// 核心概念 1：動態路由參數 (Dynamic Segments)
//   - 路徑設定為 "books/:bookId"，":bookId" 是動態參數
//   - URL 是 /books/1 → params.bookId = "1"
//   - URL 是 /books/abc → params.bookId = "abc"
//   - loader 的參數 { params } 可以取得這個值
//
// 核心概念 2：action（路由動作函式）
//   - 處理表單的 POST 送出（新增/修改/刪除操作）
//   - 由 <Form method="post"> 觸發
//   - action 執行完畢後，React Router 會自動重新執行 loader，
//     讓畫面資料保持最新（不需要手動 refresh）
//
// 核心概念 3：useActionData
//   - 取得 action 函式的返回值（例如錯誤訊息或成功狀態）
// ============================================================

import { useLoaderData, useActionData, Form, Link } from "react-router";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";
import { getBookById, addReview } from "../data/books";
import type { Book } from "../data/books";

// -------- loader 函式 --------
export async function bookDetailLoader({ params }: LoaderFunctionArgs) {
  // params 包含 URL 中的動態參數
  // 路徑是 "books/:bookId" → params.bookId 就是 URL 中 :bookId 的值
  const bookId = params.bookId as string;

  const book = await getBookById(bookId);

  // 如果找不到書籍，拋出 Response 物件
  // React Router 會渲染錯誤邊界，而不是讓畫面崩潰
  if (!book) {
    throw new Response("找不到這本書", { status: 404 });
  }

  return { book };
}

// -------- action 函式 --------
// action 在路由設定中和 loader 並列，處理 POST 請求（表單送出）
export async function bookDetailAction({
  request,
  params,
}: ActionFunctionArgs) {
  // 從 request 取得表單資料（FormData）
  const formData = await request.formData();
  const author = formData.get("author") as string;
  const content = formData.get("content") as string;
  const rating = Number(formData.get("rating"));

  // 簡單驗證
  if (!author || !content) {
    // 返回錯誤訊息，元件可用 useActionData() 取得
    return { error: "請填寫暱稱和書評內容" };
  }

  // 呼叫資料層函式新增書評
  await addReview(params.bookId as string, { author, content, rating });

  // action 執行成功後，返回成功訊息
  // React Router 會自動重新執行 loader，畫面資料自動更新
  return { success: true };
}

// -------- 元件 --------
export default function BookDetailPage() {
  // 取得 loader 的返回值
  const { book } = useLoaderData() as { book: Book };

  // 取得 action 的返回值（送出表單後才有值，初始是 undefined）
  const actionData = useActionData() as
    | { error?: string; success?: boolean }
    | undefined;

  return (
    <div className="page">
      {/* 麵包屑導覽 */}
      <nav className="breadcrumb">
        <Link to="/">首頁</Link>
        {" > "}
        <Link to="/books">書單</Link>
        {" > "}
        <span>{book.title}</span>
      </nav>

      {/* 書籍主要資訊 */}
      <div className="book-detail">
        <div className="book-detail-cover">{book.cover}</div>
        <div className="book-detail-info">
          <h1>{book.title}</h1>
          <p className="author-large">✍️ {book.author}</p>
          <div className="book-detail-meta">
            <span className="genre-badge">{book.genre}</span>
            <span>📅 {book.year} 年出版</span>
            <span className="price-large">NT$ {book.price}</span>
          </div>
          <p className="description">{book.description}</p>
          <div className="book-detail-actions">
            <button className="btn btn-primary">🛒 加入購物車</button>
            {/*
              Link 的其他用法：相對路徑
              ".." 代表往上一層（回到 /books）
            */}
            <Link to=".." relative="path" className="btn btn-outline">
              ← 回到書單
            </Link>
          </div>
        </div>
      </div>

      {/* ================================================
          書評區塊
      ================================================ */}
      <section className="reviews-section">
        <h2>💬 讀者書評（{book.reviews.length} 則）</h2>

        {/* 顯示現有書評 */}
        <div className="reviews-list">
          {book.reviews.length === 0 ? (
            <p className="empty-state">還沒有書評，來留下第一則吧！</p>
          ) : (
            book.reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <strong>{review.author}</strong>
                  <span className="rating">{"⭐".repeat(review.rating)}</span>
                </div>
                <p>{review.content}</p>
              </div>
            ))
          )}
        </div>

        {/* ================================================
            新增書評表單
            ================================================
            <Form method="post"> 的行為：
            - method="post" 表示這是一個資料修改操作
            - 送出後會觸發同路由的 action 函式
            - action 執行完後，loader 會「自動重新執行」
            - 所以書評列表會自動更新，不需要手動 reload 頁面

            注意：不需要 onSubmit、不需要 useState 管理表單狀態
                  React Router 全部幫你處理好了
        ================================================ */}
        <div className="add-review">
          <h3>📝 撰寫書評</h3>

          {/* 顯示 action 返回的錯誤訊息 */}
          {actionData?.error && (
            <p className="error-message">⚠️ {actionData.error}</p>
          )}

          {/* 顯示送出成功訊息 */}
          {actionData?.success && (
            <p className="success-message">✅ 書評已成功送出！</p>
          )}

          <Form method="post" className="review-form">
            <div className="form-group">
              <label htmlFor="author">您的暱稱</label>
              <input
                id="author"
                type="text"
                name="author"
                placeholder="請輸入暱稱"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">評分</label>
              <select id="rating" name="rating" className="form-select">
                <option value="5">⭐⭐⭐⭐⭐ 5 星 — 極力推薦</option>
                <option value="4">⭐⭐⭐⭐ 4 星 — 值得一讀</option>
                <option value="3">⭐⭐⭐ 3 星 — 普通</option>
                <option value="2">⭐⭐ 2 星 — 有些失望</option>
                <option value="1">⭐ 1 星 — 不推薦</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="content">書評內容</label>
              <textarea
                id="content"
                name="content"
                rows={4}
                placeholder="分享你對這本書的看法..."
                className="form-textarea"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              送出書評
            </button>
          </Form>
        </div>
      </section>
    </div>
  );
}
