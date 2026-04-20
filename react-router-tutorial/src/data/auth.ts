// ============================================================
// 🔐 使用者假資料與認證模擬
// ============================================================
// 真實應用應使用 JWT、session 或 OAuth 等認證機制。
// 這裡用 localStorage 模擬「已登入 / 未登入」狀態，
// 讓同學理解 redirect 在 loader 中的應用場景。

// 模擬：檢查是否已登入（從 localStorage 讀取）
export function isLoggedIn(): boolean {
  return localStorage.getItem("isLoggedIn") === "true";
}

// 模擬：登入（寫入 localStorage）
export function login(username: string, password: string): boolean {
  // 假設只有一組帳密：admin / 1234
  if (username === "admin" && password === "1234") {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    return true;
  }
  return false;
}

// 模擬：登出（清除 localStorage）
export function logout(): void {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
}

// 取得目前登入的使用者名稱
export function getUsername(): string | null {
  return localStorage.getItem("username");
}
