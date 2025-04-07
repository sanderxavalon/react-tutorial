# React Todo List 練習專案

這是一個使用 React 19、TypeScript、Vite 和 SWC 的待辦事項清單練習專案。專案主要用於練習 React 的基本概念和狀態管理。

## 專案功能

- 新增待辦事項
- 標記待辦事項為完成/未完成
- 編輯待辦事項內容
- 刪除待辦事項

## React 概念說明

### 1. 狀態管理 (State Management)
- 使用 `useState` Hook 管理組件狀態
- 狀態包括：
  - `todos`: 待辦事項列表
  - `newTodo`: 新增待辦事項的輸入內容
  - `nextId`: 用於生成唯一 ID
  - `isEditing`: 控制編輯模式
  - `editText`: 編輯時的臨時內容

### 2. 組件通信 (Component Communication)
- 父組件 (App) 向子組件 (TodoItem) 傳遞 props
- 子組件通過回調函數向父組件傳遞數據
- 使用 TypeScript 接口定義 props 類型

### 3. 條件渲染 (Conditional Rendering)
- 使用三元運算符 `? :` 根據狀態顯示不同內容
- 編輯模式和非編輯模式的切換

### 4. 事件處理 (Event Handling)
- 處理表單提交
- 處理按鈕點擊
- 處理鍵盤事件

## 方法實現解答

### 1. handleAddTodo (新增待辦事項)
```typescript
const handleAddTodo = () => {
  if (!newTodo.trim()) return

  const todo: Todo = {
    id: nextId,
    text: newTodo.trim(),
    completed: false
  }

  setTodos([...todos, todo])
  setNewTodo('')
  setNextId(nextId + 1)
}
```

### 2. handleToggle (切換完成狀態)
```typescript
const handleToggle = (id: number) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
}
```

### 3. handleDelete (刪除待辦事項)
```typescript
const handleDelete = (id: number) => {
  setTodos(todos.filter(todo => todo.id !== id))
}
```

### 4. handleEdit (編輯待辦事項)
```typescript
const handleEdit = (id: number, newText: string) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, text: newText } : todo
  ))
}
```

### 5. TodoItem 組件中的 handleEdit
```typescript
const handleEdit = () => {
  if (editText.trim()) {
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  }
};
```

## 重要概念說明

### 1. 不可變性 (Immutability)
- 在 React 中，我們不直接修改狀態，而是創建新的狀態
- 使用展開運算符 `...` 複製對象
- 使用 `map` 和 `filter` 創建新的陣列

### 2. 狀態提升 (State Lifting)
- 將共享狀態提升到最近的共同祖先組件
- 通過 props 向下傳遞數據
- 通過回調函數向上傳遞數據

### 3. 受控組件 (Controlled Components)
- 表單元素的值由 React 狀態控制
- 通過 `value` 和 `onChange` 實現雙向綁定

### 4. 條件渲染模式
```typescript
{isEditing ? (
  // 編輯模式下的內容
) : (
  // 非編輯模式下的內容
)}
```

## 練習建議

1. 先理解每個方法的註解
2. 根據註解步驟逐步實現功能
3. 參考解答檢查自己的實現
4. 嘗試添加新功能，如：
   - 待辦事項排序
   - 篩選已完成/未完成事項
