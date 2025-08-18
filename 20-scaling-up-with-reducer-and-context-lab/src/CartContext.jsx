import { createContext, useContext, useReducer } from 'react';

// 填空 1: 定義購物車的初始狀態
// 包含商品陣列、總商品數量和總價格
const initialState = {
  items: [],        // 購物車中的商品陣列
  totalItems: 0,    // 商品總數量
  totalPrice: 0     // 商品總價格
};

// 填空 2: 定義 Action Types
// 這些是描述購物車操作類型的常數
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',           // 添加商品到購物車
  REMOVE_ITEM: 'REMOVE_ITEM',     // 從購物車移除商品
  CLEAR_CART: 'CLEAR_CART',       // 清空整個購物車
  UPDATE_QUANTITY: 'UPDATE_QUANTITY'  // 更新商品數量
};

// 填空 3-6: 實現 Reducer 函數
// Reducer 函數負責根據不同的 action 來更新購物車狀態
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      // 填空 3: 處理添加商品的邏輯
      // 檢查商品是否已經在購物車中
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // 如果商品已存在，增加數量
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }  // 數量加1
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,           // 總數量加1
          totalPrice: state.totalPrice + action.payload.price  // 總價格加上商品價格
        };
      } else {
        // 如果商品不存在，新增商品並設定數量為1
        const newItem = { ...action.payload, quantity: 1 };
        return {
          ...state,
          items: [...state.items, newItem],           // 將新商品加入陣列
          totalItems: state.totalItems + 1,           // 總數量加1
          totalPrice: state.totalPrice + action.payload.price  // 總價格加上商品價格
        };
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      // 填空 4: 處理移除商品的邏輯
      // 找到要移除的商品，計算其總價值
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,                           // 過濾掉要移除的商品
        totalItems: state.totalItems - itemToRemove.quantity,  // 總數量減去商品數量
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)  // 總價格減去商品總價值
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      // 填空 5: 處理更新商品數量的邏輯
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      const quantityDiff = quantity - item.quantity;  // 計算數量差異
      
      // 更新商品數量
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,   // 總數量加上數量差異
        totalPrice: state.totalPrice + (item.price * quantityDiff)  // 總價格加上價格差異
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      // 填空 6: 處理清空購物車的邏輯
      // 直接返回初始狀態，清空所有購物車內容
      return initialState;
    
    default:
      // 如果 action type 不匹配，返回當前狀態
      return state;
  }
}

// 創建 Context 對象
// Context 用於在組件樹中共享購物車狀態和方法
const CartContext = createContext();

// 填空 7-12: 實現 Context Provider 組件
// Provider 組件提供購物車狀態和方法給所有子組件
export function CartProvider({ children }) {
  // 填空 7: 使用 useReducer 管理購物車狀態
  // useReducer 用於管理複雜的狀態邏輯，比 useState 更適合處理複雜狀態
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 填空 8: 實現 addToCart 方法
  // 將商品加入購物車，發送 ADD_ITEM action
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  // 填空 9: 實現 removeFromCart 方法
  // 從購物車移除指定商品，發送 REMOVE_ITEM action
  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  // 填空 10: 實現 updateQuantity 方法
  // 更新商品數量，如果數量小於等於0則移除商品
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      // 如果數量小於等於0，直接移除商品
      removeFromCart(productId);
    } else {
      // 否則更新數量，發送 UPDATE_QUANTITY action
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  // 填空 11: 實現 clearCart 方法
  // 清空整個購物車，發送 CLEAR_CART action
  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // 填空 12: 組合 Context 值
  // 將狀態和方法組合在一起，提供給子組件使用
  const value = {
    ...state,           // 展開狀態（items, totalItems, totalPrice）
    addToCart,          // 加入購物車方法
    removeFromCart,     // 移除商品方法
    updateQuantity,     // 更新數量方法
    clearCart           // 清空購物車方法
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 直接導出 Context，讓組件可以直接使用 useContext
export { CartContext }; 