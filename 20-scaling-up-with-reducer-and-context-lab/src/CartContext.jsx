import { createContext, useContext, useReducer } from 'react';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

// TODO: 定義 Action Types
const CART_ACTIONS = {

};

// TODO: 實現 Reducer 函數
// 提示：使用 switch 語句處理不同的 action.type
function cartReducer(state, action) {
  switch (action.type) {

    // 填空 : 處理添加商品的邏輯
    // 提示：檢查商品是否已存在，如果存在則增加數量，否則新增商品
    
    // 填空 : 處理移除商品的邏輯
    // 提示：找到要移除的商品，從陣列中過濾掉，並更新總數和總價
    
    // 填空 : 處理更新商品數量的邏輯
    // 提示：計算數量差異，更新商品數量，並相應調整總數和總價
    
    // 填空 : 處理清空購物車的邏輯
    // 提示：返回初始狀態
    
    default:
      return state;
  }
}

const CartContext = createContext();

// TODO: 實現 Context Provider 組件
export function CartProvider({ children }) {
  // 填空 7: 使用 useReducer
  // 請在這裡使用 useReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // TODO: 實現購物車操作方法
  // 填空: 實現 addToCart 方法
  const addToCart = (product) => {
    // 請在這裡實現邏輯
  };

  // 填空: 實現 removeFromCart 方法
  const removeFromCart = (productId) => {
    // 請在這裡實現邏輯
  };

  // 填空: 實現 updateQuantity 方法
  const updateQuantity = (productId, quantity) => {
    // 請在這裡實現邏輯
  };

  // 填空: 實現 clearCart 方法
  const clearCart = () => {
    // 請在這裡實現邏輯
  };

  // TODO: 準備 Context 值
  // 填空: 組合狀態和方法
  const value = {
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// 直接導出 Context，讓組件可以直接使用 useContext
export { CartContext }; 