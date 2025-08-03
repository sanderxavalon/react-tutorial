import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "light" });

function ThemedComponent() {
  const { theme } = useContext(ThemeContext);
  console.log("🔁 ThemedComponent re-render");
  return <p>目前主題：{theme}</p>;
}

export default function App() {
  const [count, setCount] = useState(0);

  // 👇 這邊每次 render 都產生新的物件（即使值一樣）
  const contextValue = { theme: "light" };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemedComponent />
      <button onClick={() => setCount(count + 1)}>+1（外部計數器）</button>
      <p>count: {count}</p>
    </ThemeContext.Provider>
  );
}