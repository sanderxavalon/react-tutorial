// ============================================================
// 📝 註冊頁 (Register Page)
// ============================================================
// 這個頁面展示：
//   - AuthLayout 的共用外框（Layout Route 概念）
//   - action 函式處理表單送出
//   - 送出後 redirect 到登入頁
// ============================================================

import { Form, useActionData, Link } from "react-router";
import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";

// -------- action 函式 --------
export async function registerAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirm = formData.get("confirm") as string;

  if (!username || !password) {
    return { error: "請填寫所有欄位" };
  }

  if (password !== confirm) {
    return { error: "兩次輸入的密碼不一致" };
  }

  if (password.length < 4) {
    return { error: "密碼至少需要 4 個字元" };
  }

  // 模擬：真實應用會在這裡呼叫 API 建立帳號
  // 這裡只是示範，直接 redirect 到登入頁
  return redirect("/login");
}

// -------- 元件 --------
export default function RegisterPage() {
  const actionData = useActionData() as { error?: string } | undefined;

  return (
    <div className="auth-page">
      <h2>建立帳號</h2>

      {actionData?.error && (
        <p className="error-message">⚠️ {actionData.error}</p>
      )}

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
            placeholder="請輸入密碼（至少 4 字元）"
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm">確認密碼</label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            placeholder="再次輸入密碼"
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-full">
          建立帳號
        </button>
      </Form>

      <p className="auth-link">
        已有帳號？<Link to="/login">立即登入</Link>
      </p>
    </div>
  );
}
