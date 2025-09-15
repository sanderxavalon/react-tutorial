# React useEffect 初始化邏輯教學

## 專案說明

這個專案是為了教學 React 中 `useEffect` 的正確使用方式，特別強調**不要在 useEffect 中進行初始化邏輯**的重要性。

## 問題背景

許多 React 開發者（特別是初學者）會錯誤地在 `useEffect` 中進行組件的初始化邏輯，這會導致以下問題：

1. **不必要的重新渲染**：每次組件掛載時都會執行初始化邏輯
2. **性能問題**：增加了不必要的副作用執行
3. **邏輯混亂**：將初始化邏輯和副作用邏輯混在一起
4. **違反 React 設計原則**：useEffect 應該用於同步外部狀態，而不是初始化內部狀態

## 教學內容

### ❌ 錯誤的範例

```jsx
function BadExample() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ❌ 錯誤：在 useEffect 中進行初始化邏輯
    setTimeout(() => {
      setUser({ name: '張三', email: 'zhang@example.com' })
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {isLoading ? <p>載入中...</p> : <p>姓名: {user?.name}</p>}
    </div>
  )
}
```

**問題：**
- 每次組件掛載都會執行 API 調用
- 增加了不必要的載入狀態
- 違反了 React 的設計原則

### ✅ 正確的範例

#### 1. 靜態初始化

```jsx
function GoodExample() {
  // ✅ 正確：在組件外部定義初始數據
  const initialUser = { name: '李四', email: 'li@example.com' }
  
  const [user, setUser] = useState(initialUser)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <p>姓名: {user.name}</p>
      <p>信箱: {user.email}</p>
    </div>
  )
}
```

#### 2. 動態初始化

```jsx
function DynamicGoodExample() {
  const [user, setUser] = useState(() => {
    // ✅ 正確：使用函數形式的初始狀態
    console.log('只在組件首次渲染時執行一次')
    return { 
      name: '王五', 
      email: 'wang@example.com', 
      id: Math.random() 
    }
  })

  return (
    <div>
      <p>姓名: {user.name}</p>
      <p>信箱: {user.email}</p>
      <p>ID: {user.id}</p>
    </div>
  )
}
```

## 核心原則

### 1. useState 的初始值應該包含所有必要的初始狀態

```jsx
// ❌ 錯誤
const [user, setUser] = useState(null)
useEffect(() => {
  setUser({ name: 'John' })
}, [])

// ✅ 正確
const [user, setUser] = useState({ name: 'John' })
```

### 2. 對於複雜的初始化，使用函數形式的初始狀態

```jsx
// ✅ 正確：複雜初始化
const [data, setData] = useState(() => {
  const expensiveCalculation = performExpensiveCalculation()
  return expensiveCalculation
})
```

### 3. useEffect 應該只用於同步外部狀態

```jsx
// ✅ 正確：同步外部狀態
useEffect(() => {
  const subscription = externalAPI.subscribe(handleUpdate)
  return () => subscription.unsubscribe()
}, [])
```

## 何時使用 useEffect

`useEffect` 應該用於以下情況：

1. **訂閱外部數據源**：如 WebSocket 連接、事件監聽器
2. **手動操作 DOM**：如聚焦輸入框、滾動到特定位置
3. **清理副作用**：如取消訂閱、清除定時器
4. **同步外部狀態**：如與非 React 庫集成

## 何時不使用 useEffect

**不要**在以下情況使用 `useEffect`：

1. **初始化組件狀態**：應該在 `useState` 中完成
2. **計算衍生狀態**：應該使用 `useMemo` 或 `useCallback`
3. **重置狀態**：應該在事件處理器中完成
4. **獲取初始數據**：應該在組件外部或使用適當的數據獲取庫

## 運行專案

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建生產版本
npm run build
```

## 學習重點

1. **理解 React 的渲染週期**：組件掛載 → 渲染 → 更新 → 卸載
2. **區分初始化和副作用**：初始化是組件內部狀態的設置，副作用是與外部世界的交互
3. **遵循 React 的最佳實踐**：讓組件更可預測、更高效
4. **培養正確的思維模式**：思考何時需要 useEffect，何時不需要

## 總結

記住這個簡單的規則：**如果邏輯可以在組件渲染時執行，就不要放在 useEffect 中**。useEffect 是為副作用設計的，不是為初始化設計的。

通過這個教學專案，學生可以：
- 看到錯誤做法的問題
- 學習正確的替代方案
- 理解 React 的設計原則
- 培養更好的編程習慣