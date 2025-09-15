import { useState } from 'react'
import './App.css'
import BadExample from './components/BadExample'
import GoodExample from './components/GoodExample'
import StrictModeDemo from './components/StrictModeDemo'

function App() {
  const [activeTab, setActiveTab] = useState('bad')

  return (
    <div className="app">
      <header className="app-header">
        <h1>useEffect API 請求與 Cleanup 函數示範</h1>
        <p>學習如何在 useEffect 中正確處理 API 請求的 cleanup 函數，避免在 Strict Mode 下出現問題</p>
      </header>

      <nav className="tab-navigation">
        <button 
          className={activeTab === 'bad' ? 'active' : ''}
          onClick={() => setActiveTab('bad')}
        >
          ❌ 錯誤範例
        </button>
        <button 
          className={activeTab === 'good' ? 'active' : ''}
          onClick={() => setActiveTab('good')}
        >
          ✅ 正確範例
        </button>
        <button 
          className={activeTab === 'strict' ? 'active' : ''}
          onClick={() => setActiveTab('strict')}
        >
          🔍 Strict Mode 比較
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'bad' && <BadExample />}
        {activeTab === 'good' && <GoodExample />}
        {activeTab === 'strict' && <StrictModeDemo />}
      </main>
    </div>
  )
}

export default App