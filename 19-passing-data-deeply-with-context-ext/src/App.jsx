import React, { createContext, useContext } from "react";
import './App.css'

// 1️⃣ 建立 context 並指定預設值
const ThemeContext = createContext("light");

// 2️⃣ 在 App 中提供 context 值
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3️⃣ 中間元件不需要處理 props
function Toolbar() {
  return (
    <div className="toolbar">
      <ThemedButton />
    </div>
  );
}

// 4️⃣ 直接在深層元件使用 useContext 取得主題
function ThemedButton() {
  const theme = useContext(ThemeContext);
  console.log("🔁 ThemedButton render");

  return (
    <button className={`button ${theme}`}>
      我是 {theme} 主題按鈕
    </button>
  );
}
export default App
