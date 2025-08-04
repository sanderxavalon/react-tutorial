import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function Cart({ onClose }) {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useContext(CartContext);

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
                <button 
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
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
        <div className="summary-item">
          <span>商品總數:</span>
          <span>{totalItems} 件</span>
        </div>
        <div className="summary-item">
          <span>總價:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
} 