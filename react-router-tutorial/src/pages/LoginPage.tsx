// ============================================================
// 🔑 登入頁 (Login Page)
// ============================================================
// 核心概念：action + redirect（程式化重新導向）
//   - action 是處理「資料修改」的函式（新增、登入、刪除等）
//   - 當 <Form method="post"> 送出時觸發 action
//   - redirect() 函式：讓使用者導向到另一個頁面
//     在 loader 或 action 中都可以使用
//   - 這裡的使用場景：登入成功後，redirect 到首頁
//
// 注意：redirect 是 throw 出去的（擲出），不是 return
//       這樣 React Router 才知道要「跳轉」而不是「渲染錯誤」
// ============================================================

import { Form, useActionData, Link } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { login } from "../data/auth";

// -------- action 函式 --------
export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  // 呼叫登入函式
  const success = login(username, password);

  if (!success) {
    // 登入失敗：返回錯誤訊息（元件用 useActionData() 取得）
    return { error: "帳號或密碼錯誤，請嘗試 admin / 1234" };
  }

  // ==========================================
  // redirect()：登入成功後跳轉到首頁
  // ==========================================
  // redirect 是 React Router 提供的函式，用在 loader 和 action 中
  // 它會產生一個特殊的 Response，告訴瀏覽器現在要導向到指定 URL
  // 用法：return redirect('/path')
  return redirect("/");
}

// -------- 元件 --------
export default function LoginPage() {
  // useActionData：取得 action 的返回值
  // 初始是 undefined，表單送出後才有值
  const actionData = useActionData() as { error?: string } | undefined;

  return (
    <div className="auth-page">
      <h2>登入帳號</h2>
      <p className="auth-hint">
        💡 提示：帳號 <code>admin</code>，密碼 <code>1234</code>
      </p>

      {/* 顯示登入錯誤訊息 */}
      {actionData?.error && (
        <p className="error-message">⚠️ {actionData.error}</p>
      )}

      {/*
        <Form method="post">：
        - 送出後觸發同路由的 action 函式（loginAction）
        - 不需要 onSubmit，React Router 處理表單送出
      */}
      <Form method="post" className="auth-form">
        <div className="form-group">
          <label htmlFor="username">帳號</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="請輸入帳號"
            className="form-input"
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">密碼</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="請輸入密碼"
            className="form-input"
            autoComplete="current-password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          登入
        </button>
      </Form>

      <p className="auth-link">
        還沒有帳號？<Link to="/register">立即註冊</Link>
      </p>
    </div>
  );
}
