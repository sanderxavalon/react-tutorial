# useEffect API 請求與 Cleanup 函數示範專案

這是一個使用 Vite + React SWC 創建的示範專案，專門用於教學如何在 `useEffect` 中正確處理 API 請求的 cleanup 函數，避免在 React Strict Mode 下出現問題。

## 🎯 專案目標

- 展示在 `useEffect` 中執行 API 請求時常見的錯誤
- 演示如何正確使用 cleanup 函數來避免競態條件
- 比較在 Strict Mode 下正確和錯誤的處理方式
- 提供完整的中文註解和說明

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

### 建置專案

```bash
npm run build
```

## 📚 學習重點

### 1. 錯誤範例 ❌

**問題：**
- 沒有使用 cleanup 函數
- 當組件卸載或依賴項改變時，之前的請求仍在進行
- 可能導致 "Can't perform a React state update on an unmounted component" 警告
- 在 Strict Mode 下會出現競態條件

**錯誤代碼：**
```javascript
useEffect(() => {
  const fetchUser = async () => {
    // API 請求邏輯
  }
  
  fetchUser()
  
  // ❌ 沒有 cleanup 函數！
}, [userId])
```

### 2. 正確範例 ✅

**解決方案：**
- 使用 `AbortController` 來取消進行中的請求
- 使用 `useRef` 來追蹤組件是否已卸載
- 在 cleanup 函數中取消請求並重置狀態
- 正確處理 `AbortError`

**正確代碼：**
```javascript
useEffect(() => {
  const abortController = new AbortController()
  
  const fetchUser = async () => {
    try {
      // 檢查請求是否已被取消
      if (abortController.signal.aborted) return
      
      // 檢查組件是否仍然掛載
      if (!isMountedRef.current) return
      
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
}, [userId])
```

### 3. Strict Mode 比較 🔍

**React Strict Mode 會：**
- 故意雙重調用 Effect 來幫助發現副作用
- 故意雙重調用 State 更新函數
- 故意雙重調用組件函數

**這有助於發現：**
- 競態條件（Race Conditions）
- 記憶體洩漏
- 不純的函數


## 📁 專案結構

```
src/
├── components/
│   ├── BadExample.jsx      # 錯誤範例組件
│   ├── GoodExample.jsx     # 正確範例組件
│   └── StrictModeDemo.jsx  # Strict Mode 比較組件
├── App.jsx                 # 主應用程式組件
├── App.css                 # 主樣式檔案
├── index.css               # 全域樣式
└── main.jsx                # 應用程式入口點
```

## 🔧 開發說明

### 主要組件

1. **BadExample** - 展示沒有 cleanup 函數的問題
2. **GoodExample** - 展示正確使用 cleanup 函數的解決方案
3. **StrictModeDemo** - 比較在 Strict Mode 下的行為差異

### 關鍵概念

- **AbortController** - 用於取消 fetch 請求
- **useRef** - 追蹤組件掛載狀態
- **Cleanup 函數** - 在 Effect 中返回的清理函數
- **競態條件** - 多個異步操作之間的競爭狀態
