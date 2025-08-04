import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function Cart({ onClose }) {
  // TODO: 使用 useContext 獲取購物車狀態和方法
  const { 
    items, 
    totalItems, 
    totalPrice
  } = useContext(CartContext);

  if (items !== undefined && items.length === 0) {
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
          {/* TODO: 實現清空購物車功能 */}
          <button className="clear-cart-btn" onClick={() => {
            // 請在這裡實現清空購物車的邏輯
          }}>
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
        {items?.map(item => (
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
                {/* TODO: 實現減少商品數量功能 */}
                <button 
                  className="quantity-btn"
                  onClick={() => {
                    // 請在這裡實現減少數量的邏輯
                  }}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                {/* TODO: 實現增加商品數量功能 */}
                <button 
                  className="quantity-btn"
                  onClick={() => {
                    // 請在這裡實現增加數量的邏輯
                  }}
                >
                  +
                </button>
              </div>
              
              <div className="item-total">
                小計: ${(item.price * item.quantity).toFixed(2)}
              </div>
              
              {/* TODO: 實現移除商品功能 */}
              <button 
                className="remove-btn"
                onClick={() => {
                  // 請在這裡實現移除商品的邏輯
                }}
              >
                移除
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="summary-item">
          <span>商品總數:</span>
          <span>{totalItems} 件</span>
        </div>
        <div className="summary-item">
          <span>總價:</span>
          <span>${totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
} 