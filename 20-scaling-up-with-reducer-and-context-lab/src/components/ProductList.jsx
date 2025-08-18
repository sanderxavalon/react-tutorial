import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';
import { products } from '../data/products.js';

export function ProductList() {
  // 填空 1: 從 CartContext 中獲取 addToCart 方法
  // 使用 useContext Hook 來獲取購物車的 addToCart 方法
  // 這樣就可以在商品列表中使用購物車功能
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
              {/* 當用戶點擊按鈕時，調用 addToCart 方法將商品加入購物車 */}
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