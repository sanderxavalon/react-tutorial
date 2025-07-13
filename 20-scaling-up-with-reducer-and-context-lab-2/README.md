# 20-scaling-up-with-reducer-and-context-lab-2

## 📝 專案簡介

這是一個留言板系統，專門設計用來練習 React 狀態管理的重構。目前的實作使用了大量的 `useState` 和 prop drilling，這正是練習 `useContext` 和 `useReducer` 的完美案例！

## 🎯 學習目標

- 理解 prop drilling 的問題
- 學習如何使用 `useContext` 來避免 prop drilling
- 學習如何使用 `useReducer` 來管理複雜狀態
- 實踐狀態管理的重構技巧

## 🚀 功能特色

### 基本功能
- ✅ 顯示文章列表
- ✅ 每篇文章下可以有留言串
- ✅ 可以新增留言
- ✅ 可以編輯/刪除留言

### 進階功能
- ✅ 文章搜尋和篩選
- ✅ 文章排序（按時間、讚數、瀏覽數等）
- ✅ 留言回覆功能
- ✅ 讚功能
- ✅ 標籤系統
- ✅ 響應式設計

## 🏗️ 專案結構

```
src/
├── components/
│   ├── PostList.jsx          # 文章列表組件
│   ├── PostItem.jsx          # 文章項目組件
│   ├── PostDetail.jsx        # 文章詳情組件
│   ├── CommentList.jsx       # 留言列表組件
│   ├── CommentItem.jsx       # 留言項目組件
│   ├── NewPostForm.jsx       # 新增文章表單
│   ├── NewCommentForm.jsx    # 新增留言表單
│   └── *.css                 # 各組件的樣式檔案
├── data/
│   └── mockData.js           # 模擬資料
├── App.jsx                   # 主應用程式
└── main.jsx                  # 入口檔案
```

## 🔧 技術棧

- **React 18** - 前端框架
- **Vite** - 建構工具
- **SWC** - 快速編譯器
- **CSS3** - 樣式設計

## 📦 安裝與執行

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發伺服器：
```bash
npm run dev
```

3. 開啟瀏覽器訪問 `http://localhost:5173`

## 🎓 重構練習

### 目前的狀態管理問題

1. **Prop Drilling**：狀態需要透過多層組件傳遞
2. **複雜的 useState**：App.jsx 中有多個 useState
3. **狀態分散**：相關的狀態分散在不同地方

### 重構目標

將目前的 `useState` 重構為 `useContext` + `useReducer`：

1. **創建 Context**：
   - `PostContext` - 管理文章相關狀態
   - `CommentContext` - 管理留言相關狀態
   - `UIContext` - 管理 UI 相關狀態

2. **創建 Reducer**：
   - `postReducer` - 處理文章相關操作
   - `commentReducer` - 處理留言相關操作
   - `uiReducer` - 處理 UI 相關操作

3. **重構組件**：
   - 移除 prop drilling
   - 使用 `useContext` 和 `useReducer`
   - 簡化組件邏輯

## 📚 學習資源

- [React Context API](https://react.dev/reference/react/createContext)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [State Management Patterns](https://react.dev/learn/managing-state)

## 🤝 貢獻

這是一個學習專案，歡迎提出建議和改進意見！

## 📄 授權

MIT License
