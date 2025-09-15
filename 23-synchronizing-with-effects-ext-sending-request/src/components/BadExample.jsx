import { useState, useEffect } from 'react'

/**
 * ❌ 錯誤範例：沒有使用 cleanup 函數
 * 
 * 這個組件展示了在 useEffect 中執行 API 請求時，
 * 沒有正確處理 cleanup 函數會導致的問題。
 * 
 * 問題：
 * 1. 當組件卸載或依賴項改變時，之前的請求仍在進行
 * 2. 可能導致 "Can't perform a React state update on an unmounted component" 警告
 * 3. 在 Strict Mode 下會出現競態條件（Race Condition）
 */
function BadExample() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(1)

  // ❌ 錯誤的 useEffect：沒有 cleanup 函數
  useEffect(() => {
    console.log('🚨 錯誤範例：開始請求用戶資料，userId:', userId)
    
    setLoading(true)
    setError(null)
    
    // 模擬 API 請求
    const fetchUser = async () => {
      try {
        // 模擬網路延遲
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 模擬 API 回應
        const userData = {
          id: userId,
          name: `用戶 ${userId}`,
          email: `user${userId}@example.com`,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
        }
        
        console.log('🚨 錯誤範例：收到用戶資料', userData)
        setUser(userData)
        setLoading(false)
      } catch (err) {
        console.error('🚨 錯誤範例：請求失敗', err)
        setError('請求失敗')
        setLoading(false)
      }
    }

    fetchUser()
    
    // ❌ 沒有 cleanup 函數！
    // 當組件卸載或 userId 改變時，之前的請求仍會繼續執行
  }, [userId])

  return (
    <div className="example-container">
      <h2>❌ 錯誤範例：沒有 Cleanup 函數</h2>
      
      <div className="code-block">
        <h3>問題代碼：</h3>
        <pre>{`useEffect(() => {
  const fetchUser = async () => {
    // API 請求邏輯
  }
  
  fetchUser()
  
  // ❌ 沒有 cleanup 函數！
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

      <div className="warning-box">
        <h4>⚠️ 問題說明：</h4>
        <ul>
          <li>快速切換用戶 ID 時，會看到控制台中的警告訊息</li>
          <li>舊的請求仍在執行，可能會覆蓋新的狀態</li>
          <li>在 Strict Mode 下，組件會被重複渲染，導致多個請求同時進行</li>
          <li>可能出現 "Can't perform a React state update on an unmounted component" 錯誤</li>
        </ul>
      </div>
    </div>
  )
}

export default BadExample
