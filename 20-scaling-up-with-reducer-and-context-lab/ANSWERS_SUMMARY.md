# React useContext + useReducer 購物車 Lab - 填空完成總結

## 🎯 已完成所有 30 個填空！

### 📋 填空完成清單

#### 1. CartContext.jsx (12 個填空)
- ✅ **填空 1**: 定義購物車初始狀態 - 包含 `items`、`totalItems`、`totalPrice`
- ✅ **填空 2**: 定義 Action Types - `ADD_ITEM`、`REMOVE_ITEM`、`CLEAR_CART`、`UPDATE_QUANTITY`
- ✅ **填空 3**: 實現添加商品的 Reducer 邏輯 - 檢查商品是否存在，更新數量或新增商品
- ✅ **填空 4**: 實現移除商品的 Reducer 邏輯 - 過濾商品並更新總數和總價
- ✅ **填空 5**: 實現更新數量的 Reducer 邏輯 - 計算數量差異並更新狀態
- ✅ **填空 6**: 實現清空購物車的 Reducer 邏輯 - 返回初始狀態
- ✅ **填空 7**: 使用 useReducer 管理狀態 - 結合 reducer 函數和初始狀態
- ✅ **填空 8**: 實現 addToCart 方法 - 發送 ADD_ITEM action
- ✅ **填空 9**: 實現 removeFromCart 方法 - 發送 REMOVE_ITEM action
- ✅ **填空 10**: 實現 updateQuantity 方法 - 發送 UPDATE_QUANTITY action 或移除商品
- ✅ **填空 11**: 實現 clearCart 方法 - 發送 CLEAR_CART action
- ✅ **填空 12**: 組合 Context 值 - 將狀態和方法組合提供給子組件

#### 2. ProductList.jsx (2 個填空)
- ✅ **填空 1**: 使用 useContext 獲取 addToCart 方法 - 從 CartContext 中解構獲取
- ✅ **填空 2**: 添加點擊事件處理器 - 點擊按鈕時調用 addToCart 方法

#### 3. Cart.jsx (9 個填空)
- ✅ **填空 1**: 使用 useContext 獲取購物車狀態和方法 - 解構獲取所有需要的狀態和方法
- ✅ **填空 2**: 處理購物車為空的情況 - 顯示友好的空購物車提示
- ✅ **填空 3**: 實現清空購物車功能 - 點擊按鈕調用 clearCart 方法
- ✅ **填空 4**: 渲染購物車商品列表 - 使用 map 遍歷並渲染每個商品項目
- ✅ **填空 5**: 實現減少商品數量功能 - 點擊減號按鈕減少數量
- ✅ **填空 6**: 實現增加商品數量功能 - 點擊加號按鈕增加數量
- ✅ **填空 7**: 實現移除商品功能 - 點擊移除按鈕調用 removeFromCart 方法
- ✅ **填空 8**: 顯示商品總數 - 顯示購物車中所有商品的總數量
- ✅ **填空 9**: 顯示總價 - 顯示購物車中所有商品的總價格

#### 4. CartIcon.jsx (2 個填空)
- ✅ **填空 1**: 使用 useContext 獲取 totalItems - 從 CartContext 中獲取商品總數
- ✅ **填空 2**: 條件渲染數量徽章 - 只有當商品數量大於 0 時才顯示徽章

#### 5. App.jsx (5 個填空)
- ✅ **填空 1**: 使用 useState 管理購物車顯示狀態 - 創建 showCart 狀態和 setShowCart 方法
- ✅ **填空 2**: 用 CartProvider 包裝應用 - 提供購物車 Context 給所有子組件
- ✅ **填空 3**: 實現購物車切換功能 - 點擊按鈕切換購物車的顯示/隱藏狀態
- ✅ **填空 4**: 實現遮罩層 - 點擊遮罩層時關閉購物車
- ✅ **填空 5**: 實現購物車組件 - 根據狀態顯示/隱藏購物車並傳遞關閉函數

## 🚀 功能特點

### 完整的購物車功能
- ✅ 加入商品到購物車
- ✅ 從購物車中移除商品
- ✅ 調整商品數量（增加/減少）
- ✅ 清空整個購物車
- ✅ 顯示購物車總數和總價
- ✅ 購物車圖標顯示數量徽章
- ✅ 購物車懸浮顯示和關閉

### 技術實現亮點
- 🔧 使用 **useReducer** 管理複雜的購物車狀態邏輯
- 🔧 使用 **useContext** 在組件樹中共享購物車狀態和方法
- 🔧 實現完整的 **Reducer 模式**，包含所有必要的 action types
- 🔧 使用 **條件渲染** 處理空購物車狀態
- 🔧 實現 **響應式 UI**，包含遮罩層和動畫效果

## 📚 學習重點

### Context API 的使用
- `createContext()` 創建 Context 對象
- `useContext()` 在組件中獲取 Context 值
- `Provider` 包裝組件樹提供 Context 值

### useReducer 的使用
- `useReducer(reducer, initialState)` 管理複雜狀態
- `dispatch(action)` 發送 action 到 reducer
- `reducer(state, action)` 根據 action 更新狀態

### 狀態管理流程
1. 定義初始狀態和 action types
2. 實現 reducer 函數處理不同 action
3. 使用 useReducer 管理狀態
4. 創建操作方法調用 dispatch
5. 通過 Context 提供狀態和方法
6. 在組件中使用 useContext 獲取狀態

## 🎉 恭喜！

您已經成功完成了 React useContext + useReducer 購物車 Lab 的所有填空！

這個 Lab 完美展示了：
- Context API 的實際應用
- useReducer 的狀態管理模式
- 組件間數據傳遞的最佳實踐
- 完整的購物車功能實現

現在您可以運行專案來測試所有功能：
```bash
npm install
npm run dev
```

然後在瀏覽器中打開 `http://localhost:5173` 來體驗完整的購物車應用！

---

**學習提示**: 嘗試理解每個填空背後的設計思路，這樣您就能在實際項目中靈活運用這些概念！ 