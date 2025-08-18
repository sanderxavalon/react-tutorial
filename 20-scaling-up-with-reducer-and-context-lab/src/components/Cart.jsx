import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function Cart({ onClose }) {
  // 填空 1: 從 CartContext 中獲取購物車狀態和方法
  // 使用 useContext Hook 來獲取購物車的所有狀態和操作方法
  // 包括商品列表、總數量、總價格，以及各種操作方法
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useContext(CartContext);

  // 填空 2: 當購物車為空時顯示提示訊息
  // 檢查購物車是否為空，如果為空則顯示友好的提示訊息
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
          {/* 當用戶點擊清空購物車按鈕時，調用 clearCart 方法清空所有商品 */}
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
        {/* 遍歷購物車中的每個商品，為每個商品創建一個購物車項目 */}
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
                {/* 當用戶點擊減號按鈕時，將商品數量減1 */}
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                {/* 填空 6: 添加增加數量的點擊事件 */}
                {/* 當用戶點擊加號按鈕時，將商品數量加1 */}
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
              {/* 當用戶點擊移除按鈕時，調用 removeFromCart 方法移除該商品 */}
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
        {/* 顯示購物車中所有商品的總數量 */}
        <div className="summary-item">
          <span>商品總數:</span>
          <span>{totalItems} 件</span>
        </div>
        {/* 填空 9: 顯示總價 */}
        {/* 顯示購物車中所有商品的總價格，使用 toFixed(2) 保留兩位小數 */}
        <div className="summary-item">
          <span>總價:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
} 