# React useEffect 初始化邏輯練習題

## 練習題：不要在 useEffect 裡面進行 init 邏輯

### 問題描述

在這個練習中，你將學習為什麼不應該在 `useEffect` 中進行初始化邏輯，以及如何正確地處理組件的初始化。

### 當前代碼問題

查看 `src/App.jsx` 文件，你會發現以下問題：

```javascript
// ❌ 錯誤的初始化方式
useEffect(() => {
  const initializeUserConfig = async () => {
    // 在 useEffect 中進行初始化邏輯
    const localConfig = loadUserConfig()
    setUserConfig(localConfig)
    // ...
  }
  initializeUserConfig()
}, [])
```

### 問題分析

1. **不必要的重新渲染**：組件會先渲染一次（userConfig 為 null），然後在 useEffect 執行後再次渲染
2. **閃爍效果**：用戶會看到 loading 狀態，即使數據已經在 localStorage 中
3. **違反 React 原則**：useEffect 應該用於同步外部狀態，而不是初始化內部狀態

### 練習目標

請重構 `src/App.jsx` 文件，解決以下問題：

1. 將初始化邏輯從 `useEffect` 移到 `useState` 的初始化函數中
2. 確保組件在首次渲染時就有正確的初始狀態
3. 只在真正需要同步外部狀態時使用 `useEffect`
4. 改善用戶體驗，避免不必要的 loading 狀態

### 提示

- 使用 `useState(() => { ... })` 的函數形式來進行初始化
- 將 API 同步邏輯移到用戶觸發的事件中（如按鈕點擊）
- 考慮將同步功能作為可選功能，而不是必需的初始化步驟

### 預期結果

重構後的代碼應該：
- 組件首次渲染時就顯示正確的配置數據
- 沒有不必要的 loading 狀態
- 提供手動同步功能
- 代碼更清晰、更符合 React 最佳實踐

---

## 解答

### 正確的實現方式

```javascript
import { useState, useEffect } from 'react'
import './App.css'

// 模擬從 localStorage 讀取用戶配置
function loadUserConfig() {
  const saved = localStorage.getItem('userConfig')
  if (saved) {
    return JSON.parse(saved)
  }
  return {
    theme: 'light',
    language: 'zh-TW',
    notifications: true
  }
}

// 模擬從 API 獲取用戶偏好
async function fetchUserPreferences() {
  // 模擬 API 延遲
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    theme: 'dark',
    language: 'en-US',
    notifications: false
  }
}

function App() {
  // ✅ 正確的初始化方式 - 在 useState 中進行初始化
  const [userConfig, setUserConfig] = useState(() => {
    // 在組件初始化時直接從 localStorage 讀取配置
    return loadUserConfig()
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ✅ 只在需要同步外部狀態時使用 useEffect
  useEffect(() => {
    // 這裡可以放置真正需要同步的邏輯
    // 例如：監聽外部事件、訂閱數據源等
  }, [])

  const updateConfig = (key, value) => {
    const newConfig = { ...userConfig, [key]: value }
    setUserConfig(newConfig)
    localStorage.setItem('userConfig', JSON.stringify(newConfig))
  }

  const syncWithServer = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const apiConfig = await fetchUserPreferences()
      setUserConfig(apiConfig)
      localStorage.setItem('userConfig', JSON.stringify(apiConfig))
    } catch (err) {
      setError('與伺服器同步失敗')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <h1>用戶配置管理器</h1>
      <div className="config-section">
        <h2>當前配置</h2>
        <div className="config-item">
          <label>主題：</label>
          <select 
            value={userConfig?.theme} 
            onChange={(e) => updateConfig('theme', e.target.value)}
          >
            <option value="light">淺色</option>
            <option value="dark">深色</option>
          </select>
        </div>
        <div className="config-item">
          <label>語言：</label>
          <select 
            value={userConfig?.language} 
            onChange={(e) => updateConfig('language', e.target.value)}
          >
            <option value="zh-TW">繁體中文</option>
            <option value="en-US">English</option>
          </select>
        </div>
        <div className="config-item">
          <label>通知：</label>
          <input 
            type="checkbox" 
            checked={userConfig?.notifications} 
            onChange={(e) => updateConfig('notifications', e.target.checked)}
          />
        </div>
        <div className="config-item">
          <button onClick={syncWithServer} disabled={loading}>
            {loading ? '同步中...' : '與伺服器同步'}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  )
}

export default App
```

### 主要改進

1. **初始化邏輯移到 useState**：
   ```javascript
   const [userConfig, setUserConfig] = useState(() => loadUserConfig())
   ```

2. **移除不必要的 loading 狀態**：
   - 因為初始化是同步的，不需要 loading 狀態
   - 只在真正需要等待 API 時才顯示 loading

3. **將 API 同步改為手動觸發**：
   ```javascript
   const syncWithServer = async () => {
     // 同步邏輯
   }
   ```

4. **改善用戶體驗**：
   - 立即顯示配置數據
   - 提供手動同步選項
   - 減少不必要的重新渲染

### 為什麼這樣更好？

1. **性能更好**：減少不必要的重新渲染
2. **用戶體驗更好**：沒有閃爍效果
3. **代碼更清晰**：職責分離更明確
4. **符合 React 原則**：useEffect 用於副作用，useState 用於狀態初始化

### 何時使用 useEffect？

useEffect 應該用於：
- 訂閱外部數據源
- 設置事件監聽器
- 手動操作 DOM
- 清理副作用

不應該用於：
- 初始化狀態（除非是從外部數據源）
- 計算派生狀態
- 事件處理邏輯

---

## 運行項目

```bash
npm install
npm run dev
```

打開瀏覽器訪問 `http://localhost:5173` 來查看效果。
