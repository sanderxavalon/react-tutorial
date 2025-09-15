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
  const [userConfig, setUserConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ❌ 錯誤的初始化方式 - 在 useEffect 中進行初始化
  useEffect(() => {
    const initializeUserConfig = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // 先從 localStorage 讀取
        const localConfig = loadUserConfig()
        setUserConfig(localConfig)
        
        // 然後從 API 獲取最新配置
        const apiConfig = await fetchUserPreferences()
        setUserConfig(apiConfig)
        
        // 保存到 localStorage
        localStorage.setItem('userConfig', JSON.stringify(apiConfig))
      } catch (err) {
        setError('載入用戶配置失敗')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    initializeUserConfig()
  }, [])

  const updateConfig = (key, value) => {
    const newConfig = { ...userConfig, [key]: value }
    setUserConfig(newConfig)
    localStorage.setItem('userConfig', JSON.stringify(newConfig))
  }

  if (loading) {
    return <div className="loading">載入用戶配置中...</div>
  }

  if (error) {
    return <div className="error">錯誤：{error}</div>
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
      </div>
    </div>
  )
}

export default App
