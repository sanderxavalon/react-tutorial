import { useState, useEffect, useRef } from 'react'

/**
 * 🔍 Strict Mode 比較示範
 * 
 * 這個組件展示了在 React Strict Mode 下，
 * 正確和錯誤的 API 請求處理方式的差異。
 * 
 * Strict Mode 會：
 * 1. 故意雙重調用 Effect 來幫助發現副作用
 * 2. 故意雙重調用 State 更新函數
 * 3. 故意雙重調用組件函數
 * 
 * 這有助於發現潛在的問題，如：
 * - 競態條件（Race Conditions）
 * - 記憶體洩漏
 * - 不純的函數
 */
function StrictModeDemo() {
  const [requestCount, setRequestCount] = useState(0)
  const [responseCount, setResponseCount] = useState(0)
  const [badExampleResponses, setBadExampleResponses] = useState([])
  const [goodExampleResponses, setGoodExampleResponses] = useState([])
  const [isRunning, setIsRunning] = useState(false)

  // 追蹤請求的 ID
  const requestIdRef = useRef(0)

  // 錯誤範例：沒有 cleanup 函數
  useEffect(() => {
    if (!isRunning) return

    const currentRequestId = ++requestIdRef.current
    console.log('🚨 Strict Mode 錯誤範例：開始請求', currentRequestId)
    
    setRequestCount(prev => prev + 1)
    
    const fetchData = async () => {
      try {
        // 模擬網路延遲
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        console.log('🚨 Strict Mode 錯誤範例：收到回應', currentRequestId)
        setResponseCount(prev => prev + 1)
        setBadExampleResponses(prev => [...prev, {
          id: currentRequestId,
          timestamp: new Date().toLocaleTimeString(),
          message: `錯誤範例回應 ${currentRequestId}`
        }])
      } catch (err) {
        console.error('🚨 Strict Mode 錯誤範例：請求失敗', currentRequestId, err)
      }
    }

    fetchData()
    
    // ❌ 沒有 cleanup 函數
  }, [isRunning])

  // 正確範例：有 cleanup 函數
  useEffect(() => {
    if (!isRunning) return

    const currentRequestId = ++requestIdRef.current
    console.log('✅ Strict Mode 正確範例：開始請求', currentRequestId)
    
    const abortController = new AbortController()
    
    const fetchData = async () => {
      try {
        // 模擬網路延遲
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 檢查請求是否已被取消
        if (abortController.signal.aborted) {
          console.log('✅ Strict Mode 正確範例：請求被取消', currentRequestId)
          return
        }
        
        console.log('✅ Strict Mode 正確範例：收到回應', currentRequestId)
        setGoodExampleResponses(prev => [...prev, {
          id: currentRequestId,
          timestamp: new Date().toLocaleTimeString(),
          message: `正確範例回應 ${currentRequestId}`
        }])
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('✅ Strict Mode 正確範例：請求被取消', currentRequestId)
          return
        }
        console.error('✅ Strict Mode 正確範例：請求失敗', currentRequestId, err)
      }
    }

    fetchData()
    
    // ✅ 正確的 cleanup 函數
    return () => {
      console.log('✅ Strict Mode 正確範例：執行 cleanup，取消請求', currentRequestId)
      abortController.abort()
    }
  }, [isRunning])

  const startDemo = () => {
    setRequestCount(0)
    setResponseCount(0)
    setBadExampleResponses([])
    setGoodExampleResponses([])
    setIsRunning(true)
  }

  const stopDemo = () => {
    setIsRunning(false)
  }

  return (
    <div className="example-container">
      <h2>🔍 Strict Mode 比較示範</h2>
      
      <div className="info-box">
        <h3>關於 React Strict Mode：</h3>
        <p>
          React Strict Mode 會故意雙重調用 Effect 來幫助發現副作用問題。
          這意味著在 Strict Mode 下，每個 useEffect 都會被執行兩次。
        </p>
        <p>
          觀察下面的示範，看看沒有 cleanup 函數的錯誤範例會產生多少個請求，
          而正確範例如何通過 cleanup 函數來避免這個問題。
        </p>
      </div>

      <div className="demo-controls">
        <button 
          onClick={startDemo}
          disabled={isRunning}
          className="start-button"
        >
          開始示範
        </button>
        <button 
          onClick={stopDemo}
          disabled={!isRunning}
          className="stop-button"
        >
          停止示範
        </button>
      </div>

      <div className="comparison-grid">
        <div className="comparison-item">
          <h3>❌ 錯誤範例（無 Cleanup）</h3>
          <div className="stats">
            <p><strong>請求計數:</strong> {requestCount}</p>
            <p><strong>回應計數:</strong> {responseCount}</p>
            <p><strong>多餘請求:</strong> {requestCount - responseCount}</p>
          </div>
          <div className="responses">
            <h4>收到的回應：</h4>
            {badExampleResponses.length === 0 ? (
              <p className="no-responses">尚未收到回應</p>
            ) : (
              <ul>
                {badExampleResponses.map((response, index) => (
                  <li key={index} className="response-item">
                    <span className="response-id">#{response.id}</span>
                    <span className="response-time">{response.timestamp}</span>
                    <span className="response-message">{response.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="comparison-item">
          <h3>✅ 正確範例（有 Cleanup）</h3>
          <div className="stats">
            <p><strong>請求計數:</strong> {requestCount}</p>
            <p><strong>回應計數:</strong> {goodExampleResponses.length}</p>
            <p><strong>多餘請求:</strong> {requestCount - goodExampleResponses.length}</p>
          </div>
          <div className="responses">
            <h4>收到的回應：</h4>
            {goodExampleResponses.length === 0 ? (
              <p className="no-responses">尚未收到回應</p>
            ) : (
              <ul>
                {goodExampleResponses.map((response, index) => (
                  <li key={index} className="response-item">
                    <span className="response-id">#{response.id}</span>
                    <span className="response-time">{response.timestamp}</span>
                    <span className="response-message">{response.message}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="analysis-box">
        <h3>📊 分析結果：</h3>
        <div className="analysis-grid">
          <div className="analysis-item">
            <h4>錯誤範例問題：</h4>
            <ul>
              <li>在 Strict Mode 下會產生多個請求</li>
              <li>可能導致競態條件</li>
              <li>浪費網路資源</li>
              <li>可能出現狀態更新錯誤</li>
            </ul>
          </div>
          <div className="analysis-item">
            <h4>正確範例優勢：</h4>
            <ul>
              <li>Cleanup 函數會取消多餘的請求</li>
              <li>避免競態條件</li>
              <li>節省網路資源</li>
              <li>確保狀態更新的一致性</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="code-comparison">
        <h3>代碼比較：</h3>
        <div className="code-grid">
          <div className="code-item">
            <h4>❌ 錯誤範例：</h4>
            <pre>{`useEffect(() => {
  const fetchData = async () => {
    // API 請求邏輯
  }
  
  fetchData()
  
  // ❌ 沒有 cleanup 函數
}, [dependency])`}</pre>
          </div>
          <div className="code-item">
            <h4>✅ 正確範例：</h4>
            <pre>{`useEffect(() => {
  const abortController = new AbortController()
  
  const fetchData = async () => {
    // API 請求邏輯
  }
  
  fetchData()
  
  // ✅ 正確的 cleanup 函數
  return () => {
    abortController.abort()
  }
}, [dependency])`}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StrictModeDemo
