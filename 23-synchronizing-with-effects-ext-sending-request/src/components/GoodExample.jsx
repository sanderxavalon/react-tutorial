import { useState, useEffect, useRef } from 'react'

/**
 * ✅ 正確範例：使用 cleanup 函數
 * 
 * 這個組件展示了在 useEffect 中執行 API 請求時，
 * 如何正確使用 cleanup 函數來避免競態條件和記憶體洩漏。
 * 
 * 解決方案：
 * 1. 使用 AbortController 來取消進行中的請求
 * 2. 在 cleanup 函數中取消請求並重置狀態
 */
function GoodExample() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(1)


  // ✅ 正確的 useEffect：有 cleanup 函數
  useEffect(() => {
    console.log('✅ 正確範例：開始請求用戶資料，userId:', userId)
    
    // 重置狀態
    setLoading(true)
    setError(null)
    
    // 創建 AbortController 來控制請求
    const abortController = new AbortController()
    
    // 模擬 API 請求
    const fetchUser = async () => {
      try {
        // 模擬網路延遲
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 檢查請求是否已被取消
        if (abortController.signal.aborted) {
          console.log('✅ 正確範例：請求已被取消，userId:', userId)
          return
        }
        
        // 模擬 API 回應
        const userData = {
          id: userId,
          name: `用戶 ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
        }
        
        console.log('✅ 正確範例：收到用戶資料', userData)
        setUser(userData)
        setLoading(false)
      } catch (err) {
        // 如果是因為請求被取消而拋出錯誤，則忽略
        if (err.name === 'AbortError') {
          console.log('✅ 正確範例：請求被取消，userId:', userId)
          return
        }
        
        console.error('✅ 正確範例：請求失敗', err)
        setError('請求失敗')
        setLoading(false)
      }
    }

    fetchUser()
    
    // ✅ 正確的 cleanup 函數
    return () => {
      console.log('✅ 正確範例：執行 cleanup，取消請求，userId:', userId)
      // 取消進行中的請求
      abortController.abort()
    }
  }, [userId])

  return (
    <div className="example-container">
      <h2>✅ 正確範例：使用 Cleanup 函數</h2>
      
      <div className="code-block">
        <h3>正確代碼：</h3>
        <pre>{`useEffect(() => {
  const abortController = new AbortController()
  
  const fetchUser = async () => {
    try {
      // 檢查請求是否已被取消
      if (abortController.signal.aborted) return
      
      // API 請求邏輯
      const response = await fetch(url, {
        signal: abortController.signal
      })
      
      // 更新狀態...
    } catch (err) {
      if (err.name === 'AbortError') return
      // 處理錯誤...
    }
  }
  
  fetchUser()
  
  // ✅ 正確的 cleanup 函數
  return () => {
    abortController.abort()
  }
}, [userId])`}</pre>
      </div>

      <div className="demo-section">
        <h3>實際演示：</h3>
        <div className="controls">
          <button 
            onClick={() => setUserId(prev => prev + 1)}
            disabled={loading}
          >
            切換到下一個用戶 (ID: {userId + 1})
          </button>
          <button 
            onClick={() => setUserId(1)}
            disabled={loading}
          >
            重置為用戶 1
          </button>
        </div>

        <div className="status">
          <p><strong>當前用戶 ID:</strong> {userId}</p>
          <p><strong>載入狀態:</strong> {loading ? '載入中...' : '完成'}</p>
          {error && <p className="error"><strong>錯誤:</strong> {error}</p>}
        </div>

        {user && (
          <div className="user-card">
            <h4>用戶資料：</h4>
            <div className="user-info">
              <img src={user.avatar} alt={user.name} className="avatar" />
              <div>
                <p><strong>姓名:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="success-box">
        <h4>✅ 解決方案說明：</h4>
        <ul>
          <li><strong>AbortController:</strong> 用於取消進行中的 fetch 請求</li>
          <li><strong>Cleanup 函數:</strong> 在依賴項改變或組件卸載時執行清理</li>
          <li><strong>錯誤處理:</strong> 正確處理 AbortError，避免不必要的錯誤訊息</li>
          <li>快速切換用戶 ID 時，舊的請求會被正確取消</li>
          <li>在 Strict Mode 下也能正常工作，不會出現競態條件</li>
        </ul>
      </div>
    </div>
  )
}

export default GoodExample
