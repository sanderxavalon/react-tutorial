# 19-passing-data-deeply-with-context-lab-2

## 專案說明

這是一個 React 明暗主題切換部落格練習專案。你可以切換部落格的明亮/深色主題，並閱讀多篇中文文章。

## 練習目標

目前主題切換功能是用 `useState` 實作，僅在 `App` 組件中管理。請將主題切換邏輯重構為 `useContext`，讓主題狀態可以在多個元件間共享，實現全域主題切換。

### 步驟建議
1. 建立一個 ThemeContext，並提供主題狀態與切換方法。
2. 用 Context Provider 包裹 App。
3. 將原本 useState 的主題邏輯移到 Context。
4. 在需要的元件中用 useContext 取得主題狀態與切換方法。

## 啟動方式

```bash
npm install
npm run dev
```

## 額外挑戰
- 嘗試將主題切換按鈕獨立成一個元件。
- 嘗試讓每篇文章也能取得主題狀態，根據主題調整細部樣式。
