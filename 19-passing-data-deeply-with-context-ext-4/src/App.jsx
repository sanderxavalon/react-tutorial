import React, { createContext, useContext, useState } from "react";
import "./App.css";

// 建立 context，提供初始值
const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
});

// 切換主題的按鈕元件
function ThemeToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log("🔁 ThemeToggleButton render");

  return (
    <button
      className="toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      切換主題（目前：{theme}）
    </button>
  );
}

// 顯示主題的標題元件
function ThemedTitle() {
  const { theme } = useContext(ThemeContext);
  console.log("🔁 ThemedTitle render");

  return <h1 className="title">目前主題：{theme}</h1>;
}

// 無關 context 的元件
function UnrelatedComponent() {
  console.log("🔁 UnrelatedComponent render");
  return <p className="unrelated">我是與主題無關的元件</p>;
}

// App 主畫面
export default function App() {
  const [theme, setTheme] = useState("light");
  const [counter, setCounter] = useState(0);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`app ${theme}`}>
        <ThemeToggleButton />
        <ThemedTitle />
        <UnrelatedComponent />
        <hr />
        <button
          className="external"
          onClick={() => setCounter((c) => c + 1)}
        >
          增加外部 counter
        </button>
        <p>外部 counter: {counter}</p>
      </div>
    </ThemeContext.Provider>
  );
}
