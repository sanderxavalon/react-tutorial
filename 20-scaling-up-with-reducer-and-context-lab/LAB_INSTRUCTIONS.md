# React useContext + useReducer 購物車 Lab

## 🎯 Lab 目標

通過實作這個購物車應用，學習並掌握：
- **useContext** 的使用方法
- **useReducer** 的使用方法
- **Context API** 的實際應用
- **狀態管理** 的最佳實踐

## 📋 Lab 要求

### 必備知識
- React 基礎概念
- useState 和 useEffect 的使用
- 組件和 props 的概念
- JavaScript 陣列方法（map, filter, find）

### 學習目標
1. 理解 Context API 的作用和使用場景
2. 掌握 useReducer 的狀態管理模式
3. 學會將 Context 和 Reducer 結合使用
4. 實現完整的購物車功能

## 🛠️ Lab 步驟

### 第一步：理解專案結構
```
src/
├── CartContext.jsx          # Context 和 Reducer 定義（需要填空）
├── App.jsx                  # 主應用組件（需要填空）
├── main.jsx                 # 應用入口
├── style.css                # 樣式文件（已完成）
├── data/
│   └── products.js          # 商品數據（已完成）
└── components/
    ├── ProductList.jsx      # 商品列表組件（需要填空）
    ├── Cart.jsx             # 購物車組件（需要填空）
    └── CartIcon.jsx         # 購物車圖標組件（需要填空）
```

### 第二步：完成填空實作

#### 1. CartContext.jsx（12 個填空）
- 填空 1: 定義購物車初始狀態
- 填空 2: 定義 Action Types
- 填空 3-6: 實現 Reducer 函數的各個 case
- 填空 7: 使用 useReducer
- 填空 8-11: 實現購物車操作方法
- 填空 12: 組合 Context 值

#### 2. ProductList.jsx（2 個填空）
- 填空 1: 使用 useContext 獲取 addToCart 方法
- 填空 2: 添加加入購物車的點擊事件

#### 3. Cart.jsx（9 個填空）
- 填空 1: 使用 useContext 獲取購物車狀態和方法
- 填空 2: 處理購物車為空的情況
- 填空 3: 實現清空購物車功能
- 填空 4: 渲染購物車商品列表
- 填空 5-6: 實現商品數量調整功能
- 填空 7: 實現移除商品功能
- 填空 8-9: 顯示購物車摘要

#### 4. CartIcon.jsx（2 個填空）
- 填空 1: 使用 useContext 獲取 totalItems
- 填空 2: 條件渲染數量徽章

#### 5. App.jsx（5 個填空）
- 填空 1: 使用 useState 管理購物車顯示狀態
- 填空 2: 用 CartProvider 包裝應用
- 填空 3: 實現購物車切換功能
- 填空 4: 實現遮罩層
- 填空 5: 實現購物車組件

### 第三步：測試功能

完成所有填空後，測試以下功能：
- ✅ 加入商品到購物車
- ✅ 從購物車中移除商品
- ✅ 調整商品數量
- ✅ 清空購物車
- ✅ 顯示購物車總數和總價
- ✅ 購物車圖標顯示數量徽章
- ✅ 購物車懸浮顯示和關閉

## 💡 提示和技巧

### Context API 提示
- 使用 `createContext()` 創建 Context
- 使用 `useContext()` 在組件中獲取 Context 值
- 使用 `Provider` 包裝組件樹

### useReducer 提示
- Reducer 函數接收 `state` 和 `action` 參數
- 使用 `switch` 語句處理不同的 action.type
- 總是返回新的狀態對象，不要直接修改原狀態

### 狀態管理提示
- 將相關的狀態和方法組合在一起
- 使用有意義的 action type 名稱
- 在 action payload 中傳遞必要的數據

## 🔍 檢查清單

完成 Lab 後，檢查以下項目：

### 功能檢查
- [ ] 可以加入商品到購物車
- [ ] 可以從購物車移除商品
- [ ] 可以調整商品數量
- [ ] 可以清空購物車
- [ ] 購物車總數和總價正確顯示
- [ ] 購物車圖標顯示正確的數量

### 代碼檢查
- [ ] 所有填空都已完成
- [ ] 沒有語法錯誤
- [ ] 代碼結構清晰
- [ ] 變數命名有意義

### 理解檢查
- [ ] 理解 Context 的作用
- [ ] 理解 useReducer 的使用
- [ ] 理解狀態管理的流程
- [ ] 理解組件間的數據傳遞
