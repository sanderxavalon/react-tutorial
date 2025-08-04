import React, { createContext, useContext, useState } from "react";

// 1️⃣ 建立 AuthContext，包含 user, login, logout
const AuthContext = createContext(/* TODO: 請提供初始值 */);

// 2️⃣ App 組件：提供 login / logout 功能
function App() {
  const [user, setUser] = useState(null);

  // TODO: 實作 login 函式 → 設定一個假帳號（如 { name: 'Sander' }）
  const login = () => {
    // ...
  };

  // TODO: 實作 logout 函式 → 清空使用者
  const logout = () => {
    // ...
  };

  return (
    // TODO: 將 { user, login, logout } 提供給 context
    <AuthContext.Provider
      value={
        {
          /* TODO */
        }
      }
    >
      <Header />
      <Main />
    </AuthContext.Provider>
  );
}

// 3️⃣ Header 組件：顯示歡迎文字與登出按鈕
function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="header">
      {user ? (
        <>
          <span>歡迎，{/* TODO: 顯示使用者名稱 */}</span>
          <button onClick={logout}>登出</button>
        </>
      ) : (
        <span>尚未登入</span>
      )}
    </div>
  );
}

// 4️⃣ Main 組件：尚未登入時顯示登入按鈕；登入後顯示秘密內容
function Main() {
  const { user, login } = useContext(AuthContext);

  return (
    <div className="main">
      {user ? (
        <p>這是私人內容，只有登入後才能看到！</p>
      ) : (
        <button onClick={login}>登入</button>
      )}
    </div>
  );
}

export default App;
