import React, { createContext, useContext, useState } from "react";
import "./App.css";

// 1️⃣ 建立 context，初始值可以是任意 placeholder（不會真的用到）
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// 2️⃣ App 負責提供 theme 狀態與操作方法
function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3️⃣ Toolbar 是中介元件，不需傳 props
function Toolbar() {
  return (
    <div className="toolbar">
      <ThemedButton />
    </div>
  );
}

// 4️⃣ 子元件可以讀資料也可以寫資料（改變主題）
function ThemedButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("🔁 ThemedButton render");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <button className={`button ${theme}`}>
        我是 {theme} 主題按鈕
      </button>
      <button className="toggle" onClick={toggleTheme}>
        切換主題
      </button>
    </>
  );
}

export default App