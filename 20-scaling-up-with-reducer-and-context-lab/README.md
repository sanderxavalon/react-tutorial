# React useContext + useReducer 購物車 Lab - 完整解答

## 🎯 Lab 概述

這是一個使用 React Context 和 useReducer 實現的購物車應用 Lab。學生需要完成 30 個填空來實現完整的購物車功能。

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

## 🛠️ 完整解答

### 1. CartContext.jsx 解答

```javascript
import { createContext, useContext, useReducer } from 'react';

// 填空 1: 定義購物車的初始狀態
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// 填空 2: 定義 Action Types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY'
};

// 填空 3-6: 實現 Reducer 函數
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      // 填空 3: 處理添加商品的邏輯
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      } else {
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      // 填空 4: 處理移除商品的邏輯
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      // 填空 5: 處理更新商品數量的邏輯
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      const quantityDiff = quantity - item.quantity;
      
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (item.price * quantityDiff)
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      // 填空 6: 處理清空購物車的邏輯
      return initialState;
    
    default:
      return state;
  }
}

// 創建 Context
const CartContext = createContext();

// 填空 7-12: 實現 Context Provider 組件
export function CartProvider({ children }) {
  // 填空 7: 使用 useReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 填空 8: 實現 addToCart 方法
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  // 填空 9: 實現 removeFromCart 方法
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  // 填空 10: 實現 updateQuantity 方法
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  // 填空 11: 實現 clearCart 方法
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // 填空 12: 組合 Context 值
  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
```

### 2. ProductList.jsx 解答

```javascript
import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';
import { products } from '../data/products.js';

export function ProductList() {
  // 填空 1: 從 CartContext 中獲取 addToCart 方法
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-list">
      <h2>商品列表</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-price">${product.price}</div>
              {/* 填空 2: 添加點擊事件處理器 */}
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                加入購物車
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3. Cart.jsx 解答

```javascript
import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function Cart({ onClose }) {
  // 填空 1: 從 CartContext 中獲取購物車狀態和方法
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useContext(CartContext);

  // 填空 2: 當購物車為空時顯示提示訊息
  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>購物車</h2>
        <div className="cart-empty">
          <p>購物車是空的</p>
          <p>請選擇一些商品加入購物車</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>購物車</h2>
        <div className="cart-header-buttons">
          {/* 填空 3: 添加清空購物車的點擊事件 */}
          <button className="clear-cart-btn" onClick={clearCart}>
            清空購物車
          </button>
          {onClose && (
            <button className="close-cart-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>
      
      <div className="cart-items">
        {/* 填空 4: 使用 map 渲染購物車中的商品 */}
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <div className="item-image">{item.image}</div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>單價: ${item.price}</p>
              </div>
            </div>
            
            <div className="item-controls">
              <div className="quantity-controls">
                {/* 填空 5: 添加減少數量的點擊事件 */}
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                {/* 填空 6: 添加增加數量的點擊事件 */}
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                小計: ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              {/* 填空 7: 添加移除商品的點擊事件 */}
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                移除
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        {/* 填空 8: 顯示商品總數 */}
        <div className="summary-item">
          <span>商品總數:</span>
          <span>{totalItems} 件</span>
        </div>
        {/* 填空 9: 顯示總價 */}
        <div className="summary-item">
          <span>總價:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
```

### 4. CartIcon.jsx 解答

```javascript
import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function CartIcon() {
  // 填空 1: 從 CartContext 中獲取 totalItems
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <span className="cart-emoji">🛒</span>
      {/* 填空 2: 當商品數量大於 0 時顯示數量徽章 */}
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </div>
  );
}
```

### 5. App.jsx 解答

```javascript
import { useState } from 'react';
import { CartProvider } from './CartContext.jsx';
import { ProductList } from './components/ProductList.jsx';
import { Cart } from './components/Cart.jsx';
import { CartIcon } from './components/CartIcon.jsx';
import './style.css';

function App() {
  // 填空 1: 創建 showCart 狀態和 setShowCart 方法
  const [showCart, setShowCart] = useState(false);

  return (
    // 填空 2: 用 CartProvider 包裝應用
    <CartProvider>
      <div className="app">
        <header className="app-header">
          <h1>🛍️ React 購物車 Lab</h1>
          <div className="header-controls">
            {/* 填空 3: 添加切換購物車顯示的點擊事件 */}
            <button 
              className="toggle-cart-btn"
              onClick={() => setShowCart(!showCart)}
            >
              <CartIcon />
              {showCart ? '隱藏購物車' : '顯示購物車'}
            </button>
          </div>
        </header>

        <main className="app-main">
          <div className="content-container">
            <ProductList />
          </div>
          
          {/* 填空 4: 添加遮罩層，點擊時關閉購物車 */}
          <div 
            className={`cart-overlay ${showCart ? 'show' : ''}`}
            onClick={() => setShowCart(false)}
          ></div>
          
          {/* 填空 5: 添加購物車組件，並傳遞關閉函數 */}
          <div className={`cart-container ${showCart ? 'show' : ''}`}>
            <Cart onClose={() => setShowCart(false)} />
          </div>
        </main>

        <footer className="app-footer">
          <p>🎓 React useContext + useReducer 購物車 Lab</p>
          <p>學習 Context 和 Reducer 的實際應用</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
```

## 🎯 核心概念解釋

### Context API
- **createContext()**: 創建一個 Context 對象
- **useContext()**: 在組件中使用 Context 值
- **Provider**: 提供 Context 值給子組件樹

### useReducer
- **useReducer(reducer, initialState)**: 管理複雜狀態
- **dispatch(action)**: 發送 action 到 reducer
- **reducer(state, action)**: 根據 action 更新狀態

### 狀態管理流程
1. 定義初始狀態和 action types
2. 實現 reducer 函數處理不同 action
3. 使用 useReducer 管理狀態
4. 創建操作方法調用 dispatch
5. 通過 Context 提供狀態和方法
6. 在組件中使用 useContext 獲取狀態

## 🚀 運行專案

1. 安裝依賴：
   ```bash
   npm install
   ```

2. 啟動開發服務器：
   ```bash
   npm run dev
   ```

3. 在瀏覽器中打開 `http://localhost:5173`

## 📚 學習資源

- [React Context API 文檔](https://react.dev/reference/react/createContext)
- [React useReducer 文檔](https://react.dev/reference/react/useReducer)
- [React 狀態管理指南](https://react.dev/learn/managing-state)

---

**這個 Lab 完美展示了 useContext 和 useReducer 的實際應用，是學習 React 狀態管理的優秀案例！** 🎉 