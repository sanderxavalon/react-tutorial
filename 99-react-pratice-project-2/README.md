# React 計算機教學專案

這是一個使用 React、TypeScript 和 Vite 構建的簡單計算機專案，主要用於教學目的。

## 功能特點

- 基本的加減乘除運算
- 清除功能
- 簡潔美觀的使用者界面
- 完整的 TypeScript 類型支持
- 使用 useState Hook 管理狀態

## 技術棧

- React 18
- TypeScript
- Vite
- SWC (編譯器)

## 如何運行

1. 安裝依賴：
```bash
npm install
```

2. 啟動開發服務器：
```bash
npm run dev
```

3. 在瀏覽器中訪問：
```
http://localhost:5173
```

## 專案結構

```
src/
  ├── App.tsx      # 主要的計算機組件
  ├── App.css      # 計算機樣式
  └── main.tsx     # 應用程序入口點
```

## 學習重點

1. React 組件的基本結構
2. 使用 useState Hook 管理狀態
3. 事件處理
4. TypeScript 類型定義
5. CSS Grid 和 Flexbox 佈局
6. 組件樣式設計

## 注意事項

- 這是一個教學專案，主要關注基礎概念的實現
- 代碼中包含詳細的中文註解，幫助理解每個部分的功能
- 沒有使用複雜的狀態管理工具，只使用了 useState Hook 

## 解答說明

### 狀態管理

計算機使用四個狀態來管理運算過程：

```typescript
const [display, setDisplay] = useState<string>('0')        // 顯示在螢幕上的數字
const [firstNumber, setFirstNumber] = useState<string>('') // 儲存第一個輸入的數字
const [operator, setOperator] = useState<string>('')       // 儲存運算符號
const [waitingForSecondNumber, setWaitingForSecondNumber] = useState<boolean>(false) // 是否等待輸入第二個數字
```

### 核心功能實現

#### 1. 數字輸入處理 (handleNumberClick)
```typescript
const handleNumberClick = (number: string) => {
  if (waitingForSecondNumber) {
    setDisplay(number)
    setWaitingForSecondNumber(false)
  } else {
    setDisplay(display === '0' ? number : display + number)
  }
}
```
- 如果正在等待第二個數字，直接顯示新輸入的數字
- 否則，將新數字追加到現有數字後面
- 如果當前顯示為 "0"，則直接替換為新數字

#### 2. 運算符號處理 (handleOperatorClick)
```typescript
const handleOperatorClick = (op: string) => {
  setFirstNumber(display)
  setOperator(op)
  setWaitingForSecondNumber(true)
}
```
- 儲存當前顯示的數字作為第一個運算數
- 記錄選擇的運算符號
- 設定等待輸入第二個數字的狀態

#### 3. 等號運算處理 (handleEqualsClick)
```typescript
const handleEqualsClick = () => {
  const num1 = parseFloat(firstNumber)
  const num2 = parseFloat(display)
  let result = 0

  switch (operator) {
    case '+': result = num1 + num2; break
    case '-': result = num1 - num2; break
    case '*': result = num1 * num2; break
    case '/': result = num1 / num2; break
    default: return
  }

  setDisplay(result.toString())
  setFirstNumber('')
  setOperator('')
  setWaitingForSecondNumber(false)
}
```
- 將儲存的數字轉換為浮點數
- 根據運算符號執行相應的計算
- 顯示計算結果
- 重置所有狀態

#### 4. 清除功能 (handleClearClick)
```typescript
const handleClearClick = () => {
  setDisplay('0')
  setFirstNumber('')
  setOperator('')
  setWaitingForSecondNumber(false)
}
```
- 重置顯示為 "0"
- 清空所有儲存的狀態

### 使用說明

1. 輸入第一個數字
2. 點擊運算符號（+、-、*、/）
3. 輸入第二個數字
4. 點擊等號（=）查看結果
5. 點擊清除（C）重新開始

### 學習要點

1. **狀態管理**：使用 useState Hook 管理計算機的各種狀態
2. **事件處理**：處理按鈕點擊事件並更新狀態
3. **條件渲染**：根據不同狀態顯示不同的數字
4. **類型安全**：使用 TypeScript 確保類型安全
5. **狀態重置**：在適當的時候重置所有狀態 