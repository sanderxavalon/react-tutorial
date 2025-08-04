import { useContext } from 'react';
import { CartContext } from '../CartContext.jsx';
import { products } from '../data/products.js';

export function ProductList() {
  // TODO: 使用 useContext 獲取購物車狀態

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
              {/* TODO: 實現加入購物車功能 */}
              <button 
                className="add-to-cart-btn"
                onClick={() => {
                  // 請在這裡實現加入購物車的邏輯
                }}
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