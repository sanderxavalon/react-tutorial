import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';

export function CartIcon() {
  // 填空 1: 從 CartContext 中獲取 totalItems
  // 使用 useContext Hook 來獲取購物車中的商品總數量
  // 這樣購物車圖標就能顯示正確的商品數量
  const { totalItems } = useContext(CartContext);

  return (
    <div className="cart-icon">
      <span className="cart-emoji">🛒</span>
      {/* 填空 2: 當商品數量大於 0 時顯示數量徽章 */}
      {/* 使用條件渲染，只有當購物車中有商品時才顯示數量徽章 */}
      {/* 這樣用戶就能一眼看到購物車中有多少商品 */}
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </div>
  );
} 