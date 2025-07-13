# 19-passing-data-deeply-with-context-lab-2

## 專案說明

這是一個 React 明暗主題切換部落格練習專案。你可以切換部落格的明亮/深色主題，並閱讀多篇中文文章。

## 練習目標

目前主題切換功能是用 `useState` 實作，僅在 `App` 組件中管理。請將主題切換邏輯重構為 `useContext`，讓主題狀態可以在多個元件間共享，實現全域主題切換。

### 步驟建議
1. 建立一個 ThemeContext，並提供主題狀態與切換方法。
2. 用 Context Provider 包裹 App。
3. 將原本 useState 的主題邏輯移到 Context。
4. 在需要的元件中用 useContext 取得主題狀態與切換方法。

## 啟動方式

```bash
npm install
npm run dev
```

# 解答：useContext 簡化版本 (不使用 Custom Hook)

## 重構步驟說明

### 1. 建立 ThemeContext (`src/ThemeContext.jsx`)

```jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 直接匯出 Context，不使用 custom hook
export { ThemeContext };
```

**重點說明：**
- 直接匯出 `ThemeContext`，不使用 custom hook
- 其他組件可以直接使用 `useContext(ThemeContext)`

### 2. 建立主題切換組件 (`src/ThemeToggle.jsx`)

```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      切換到{theme === 'light' ? '深色' : '淺色'}主題
    </button>
  );
}
```

**重點說明：**
- 直接使用 `useContext(ThemeContext)` 取得主題狀態
- 不需要額外的 custom hook

### 3. 建立文章組件 (`src/BlogArticle.jsx`)

```jsx
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export function BlogArticle({ article }) {
  const { theme } = useContext(ThemeContext);

  return (
    <article className={`blog-article ${theme}`}>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </article>
  );
}
```

**重點說明：**
- 同樣直接使用 `useContext(ThemeContext)`
- 每篇文章都能取得當前主題狀態

### 4. 重構主應用組件 (`src/App.jsx`)

```jsx
import { useContext } from 'react';
import { ThemeProvider, ThemeContext } from './ThemeContext';

function BlogApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`blog-app ${theme}`}>
      <header>
        <h1>部落格明暗主題切換器 (useContext 簡化版)</h1>
        <ThemeToggle />
      </header>
      <main>
        {articles.map(article => (
          <BlogArticle key={article.id} article={article} />
        ))}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BlogApp />
    </ThemeProvider>
  );
}
```

**重點說明：**
- 所有組件都直接使用 `useContext(ThemeContext)`
- 程式碼更直接，不需要額外的抽象層