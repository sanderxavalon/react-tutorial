import { useState, useEffect } from 'react'
import './App.css'

// 錯誤的範例：在 useEffect 中進行初始化邏輯
function BadExample() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ❌ 錯誤：在 useEffect 中進行初始化邏輯
    // 這會導致組件在每次渲染時都重新初始化
    console.log('BadExample: useEffect 執行中...')
    
    // 模擬 API 調用
    setTimeout(() => {
      setUser({ name: '張三', email: 'zhang@example.com' })
      setIsLoading(false)
    }, 1000)
  }, []) // 空依賴數組，但仍然會在每次組件掛載時執行

  return (
    <div className="example">
      <h3>❌ 錯誤範例：在 useEffect 中初始化</h3>
      {isLoading ? (
        <p>載入中...</p>
      ) : (
        <div>
          <p>姓名: {user?.name}</p>
          <p>信箱: {user?.email}</p>
        </div>
      )}
    </div>
  )
}

// 正確的範例：在組件外部或使用 useMemo 進行初始化
function GoodExample() {
  // ✅ 正確：在組件外部定義初始數據
  const initialUser = { name: '李四', email: 'li@example.com' }
  
  const [user, setUser] = useState(initialUser) // 直接使用初始值
  const [isLoading, setIsLoading] = useState(false) // 不需要載入狀態

  // 只有在需要同步外部狀態時才使用 useEffect
  useEffect(() => {
    console.log('GoodExample: 只有在需要同步外部狀態時才執行')
    // 這裡可以放置真正需要同步的邏輯，比如訂閱事件
  }, [])

  return (
    <div className="example">
      <h3>✅ 正確範例：正確的初始化方式</h3>
      <div>
        <p>姓名: {user.name}</p>
        <p>信箱: {user.email}</p>
      </div>
    </div>
  )
}

// 需要動態初始化的正確範例
function DynamicGoodExample() {
  const [user, setUser] = useState(() => {
    // ✅ 正確：使用函數形式的初始狀態來進行複雜初始化
    console.log('DynamicGoodExample: 只在組件首次渲染時執行一次')
    return { name: '王五', email: 'wang@example.com', id: Math.random() }
  })

  const [count, setCount] = useState(0)

  return (
    <div className="example">
      <h3>✅ 動態初始化範例：使用函數形式初始狀態</h3>
      <div>
        <p>姓名: {user.name}</p>
        <p>信箱: {user.email}</p>
        <p>ID: {user.id}</p>
        <button onClick={() => setCount(count + 1)}>
          點擊次數: {count}
        </button>
        <p><small>注意：ID 不會因為重新渲染而改變</small></p>
      </div>
    </div>
  )
}

function App() {
  const [showExamples, setShowExamples] = useState(false)

  return (
    <div className="app">
      <h1>React useEffect 初始化邏輯教學</h1>
      <p>這個範例展示了為什麼不應該在 useEffect 中進行初始化邏輯</p>
      
      <button 
        onClick={() => setShowExamples(!showExamples)}
        className="toggle-button"
      >
        {showExamples ? '隱藏範例' : '顯示範例'}
      </button>

      {showExamples && (
        <div className="examples">
          <BadExample />
          <GoodExample />
          <DynamicGoodExample />
        </div>
      )}

      <div className="explanation">
        <h2>重點說明：</h2>
        <ul>
          <li>❌ <strong>不要</strong>在 useEffect 中進行初始化邏輯</li>
          <li>✅ <strong>應該</strong>在 useState 中直接提供初始值</li>
          <li>✅ 對於複雜初始化，使用函數形式的初始狀態</li>
          <li>✅ useEffect 應該只用於同步外部狀態或副作用</li>
        </ul>
      </div>
    </div>
  )
}

export default App
