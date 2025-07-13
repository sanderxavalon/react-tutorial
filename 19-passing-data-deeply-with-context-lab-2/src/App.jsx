import { useState } from 'react'
import './App.css'

const articles = [
  {
    id: 1,
    title: 'React 教學：明暗主題切換',
    content: '這是一篇介紹如何在 React 中實作明暗主題切換的文章。你可以使用 useState 來管理主題狀態，並根據主題切換不同的樣式。'
  },
  {
    id: 2,
    title: '用 useContext 重構主題邏輯',
    content: '當你的主題狀態需要在多個元件間共享時，可以考慮用 useContext 來集中管理，讓程式碼更乾淨。'
  },
  {
    id: 3,
    title: '部落格練習題',
    content: '請將本專案的 useState 主題切換邏輯，重構為 useContext 實現全域主題切換。'
  }
];

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`blog-app ${theme}`}>
      <header>
        <h1>部落格明暗主題切換器</h1>
        <button onClick={toggleTheme}>
          切換到{theme === 'light' ? '深色' : '淺色'}主題
        </button>
      </header>
      <main>
        {articles.map(article => (
          <article key={article.id} className="blog-article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

export default App
